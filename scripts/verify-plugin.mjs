#!/usr/bin/env node

import { readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = join(repositoryRoot, "plugins", "mega");
const manifestPath = join(pluginRoot, ".codex-plugin", "plugin.json");
const marketplacePath = join(repositoryRoot, ".agents", "plugins", "marketplace.json");

function fail(message) {
  console.error(`plugin validation failed: ${message}`);
  process.exitCode = 1;
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail(`cannot parse ${path}: ${error.message}`);
    return null;
  }
}

const manifest = readJson(manifestPath);
const marketplace = readJson(marketplacePath);

if (!manifest || !marketplace) process.exit(1);

if (manifest.name !== "mega") fail('plugin name must be "mega"');
if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(manifest.version ?? "")) {
  fail("plugin version must be valid semver");
}
if (manifest.skills !== "./skills/") fail('plugin must declare "skills": "./skills/"');
if (manifest.mcpServers !== "./.mcp.json") fail('plugin must declare the MEGA MCP configuration');

try {
  if (!statSync(join(pluginRoot, ".mcp.json")).isFile()) fail("plugin MCP configuration is missing");
  if (!statSync(join(pluginRoot, "skills")).isDirectory()) fail("bundled Skills directory is missing");
} catch {
  fail("plugin bundle is incomplete");
}

const entry = marketplace.plugins?.find((candidate) => candidate.name === "mega");
if (!entry) {
  fail("marketplace does not include the mega plugin");
} else {
  if (entry.source?.source !== "local" || entry.source?.path !== "./plugins/mega") {
    fail("marketplace must point to ./plugins/mega");
  }
  if (entry.policy?.installation !== "AVAILABLE" || entry.policy?.authentication !== "ON_INSTALL") {
    fail("marketplace availability or authentication policy is invalid");
  }
}

const releaseTag = process.env.GITHUB_REF_NAME;
if (process.argv.includes("--release") && releaseTag !== `v${manifest.version}`) {
  fail(`release tag must be v${manifest.version}, received ${releaseTag || "none"}`);
}

if (!process.exitCode) {
  console.log(`validated MEGA plugin ${manifest.version}`);
}
