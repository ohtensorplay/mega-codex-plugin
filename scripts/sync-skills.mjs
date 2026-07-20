#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, relative, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const lockPath = join(repositoryRoot, "skills.lock.json");
const bundledSkillsPath = join(repositoryRoot, "plugins", "mega", "skills");
const allowedSource = "https://github.com/ohtensorplay/mega-skills.git";

function usage() {
  console.error("Usage: node scripts/sync-skills.mjs [--check | --write | --update <tag>]");
  process.exit(2);
}

function fail(message) {
  throw new Error(message);
}

function run(command, args, options = {}) {
  return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...options }).trim();
}

function readLock() {
  let lock;
  try {
    lock = JSON.parse(readFileSync(lockPath, "utf8"));
  } catch (error) {
    fail(`cannot parse skills.lock.json: ${error.message}`);
  }

  if (lock.source !== allowedSource) fail(`source must be ${allowedSource}`);
  if (typeof lock.ref !== "string" || !/^v\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(lock.ref)) {
    fail("ref must be an immutable release tag in vMAJOR.MINOR.PATCH form");
  }
  if (typeof lock.commit !== "string" || !/^[0-9a-f]{40}$/.test(lock.commit)) {
    fail("commit must be a full lowercase Git SHA");
  }
  if (lock.path !== "skills") fail('path must be "skills"');
  return lock;
}

function cloneSource(ref) {
  const checkout = mkdtempSync(join(tmpdir(), "mega-skills-"));
  try {
    run("git", ["clone", "--depth", "1", "--branch", ref, allowedSource, checkout]);
  } catch (error) {
    rmSync(checkout, { recursive: true, force: true });
    fail(`cannot clone ${allowedSource} at ${ref}: ${error.stderr?.trim() || error.message}`);
  }
  return checkout;
}

function digestTree(root) {
  const files = new Map();

  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))) {
      const path = join(directory, entry.name);
      const location = relative(root, path);
      const details = lstatSync(path);
      if (details.isSymbolicLink()) fail(`symbolic links are not allowed in managed Skills: ${location}`);
      if (details.isDirectory()) {
        visit(path);
      } else if (details.isFile()) {
        files.set(location, createHash("sha256").update(readFileSync(path)).digest("hex"));
      } else {
        fail(`unsupported filesystem entry in managed Skills: ${location}`);
      }
    }
  }

  visit(root);
  return files;
}

function compareTrees(expectedPath, actualPath) {
  if (!existsSync(actualPath)) return [`missing managed directory: ${relative(repositoryRoot, actualPath)}`];

  const expected = digestTree(expectedPath);
  const actual = digestTree(actualPath);
  const differences = [];

  for (const [path, digest] of expected) {
    if (!actual.has(path)) differences.push(`missing: ${path}`);
    else if (actual.get(path) !== digest) differences.push(`changed: ${path}`);
  }
  for (const path of actual.keys()) {
    if (!expected.has(path)) differences.push(`unexpected: ${path}`);
  }
  return differences;
}

function copyTree(sourcePath) {
  rmSync(bundledSkillsPath, { recursive: true, force: true });
  cpSync(sourcePath, bundledSkillsPath, { recursive: true, dereference: false, errorOnExist: true });
}

let mode = "check";
let requestedRef;
const args = process.argv.slice(2);
if (args.length === 1 && args[0] === "--write") mode = "write";
else if (args.length === 0 || (args.length === 1 && args[0] === "--check")) mode = "check";
else if (args.length === 2 && args[0] === "--update") {
  mode = "update";
  requestedRef = args[1];
  if (!/^v\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(requestedRef)) usage();
} else usage();

let checkout;
try {
  const lock = readLock();
  const ref = requestedRef ?? lock.ref;
  checkout = cloneSource(ref);
  const resolvedCommit = run("git", ["-C", checkout, "rev-parse", "HEAD"]);

  if (mode !== "update" && resolvedCommit !== lock.commit) {
    fail(`locked ref ${lock.ref} resolved to ${resolvedCommit}, expected ${lock.commit}; do not use a moved tag`);
  }

  const sourcePath = join(checkout, lock.path);
  if (!statSync(sourcePath).isDirectory()) fail(`canonical source is missing ${lock.path}/`);

  if (mode === "check") {
    const differences = compareTrees(sourcePath, bundledSkillsPath);
    if (differences.length) fail(`bundled Skills drift from ${lock.ref} (${lock.commit}):\n${differences.join("\n")}`);
    console.log(`bundled Skills match ${lock.ref} (${lock.commit})`);
  } else {
    copyTree(sourcePath);
    if (mode === "update") {
      writeFileSync(lockPath, `${JSON.stringify({ ...lock, ref, commit: resolvedCommit }, null, 2)}\n`);
      console.log(`updated bundled Skills to ${ref} (${resolvedCommit})`);
    } else {
      console.log(`restored bundled Skills from ${lock.ref} (${lock.commit})`);
    }
  }
} catch (error) {
  console.error(`skills synchronization failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (checkout) rmSync(checkout, { recursive: true, force: true });
}
