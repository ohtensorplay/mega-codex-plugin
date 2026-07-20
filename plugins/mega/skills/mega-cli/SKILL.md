---
name: mega-cli
description: Use the MEGA Hub CLI for local authentication, repositories, local files, Git, uploads, downloads, bulk or resumable transfer, streaming logs, scripts, long-running waits, and secret-bearing workflows. Trigger when MCP is too bounded or when the task touches the local filesystem or terminal.
---

# MEGA CLI

Use the installed `mega` executable as the authority for CLI syntax. Do not guess flags from another Hub CLI.

## Workflow

1. Run `mega --help`, then the relevant command-group help, before composing an unfamiliar command.
2. Check authentication without printing tokens. If authentication is missing, provide the login command shown by current help and let the user complete it.
3. Resolve the canonical repository ID, resource type, revision, local path, and destination before transfer.
4. Use revision-pinned and resumable behavior for large or reproducibility-sensitive transfers when current help supports it.
5. Show the exact command and expected mutation before destructive, paid, or externally visible actions.
6. Verify the resulting revision, commit, Job ID, or runtime state after execution.

## Prefer the CLI for

- Uploading or downloading directories, binary artifacts, or large files.
- Git clone, branch, tag, commit, merge, and history workflows.
- Streaming logs and repeated status waits.
- Scripts, batch jobs, CI, and reproducible automation.
- Job or inference inputs containing secrets; use protected secret mechanisms and never command-line plaintext when a safer mechanism exists.

Never echo credentials, embed them in source, commit them, or return them in the final response. Use MCP for bounded discovery first when it reduces ambiguity.
