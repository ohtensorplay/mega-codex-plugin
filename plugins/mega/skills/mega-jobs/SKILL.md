---
name: mega-jobs
description: Plan, submit, inspect, monitor, cancel, and schedule MEGA container Jobs or operate MEGA Sandboxes and warm pools. Use for Job images, commands, arguments, timeouts, labels, logs, schedules, isolated execution, compute cost, output persistence, or deciding whether bounded MCP or the mega CLI is appropriate.
---

# MEGA Jobs

Use `mega_jobs` for bounded operations that contain no secrets. It supports list, inspect, logs, run, cancel, scheduled list/inspect/create/delete/suspend/resume/trigger.

Use `mega_sandboxes` to list providers, pools, and Sandboxes; create or delete
warm pools; create or inspect an isolated Sandbox; collect metrics; run a
bounded command; or stop a Sandbox. Repository mounts are read-only. Sandbox
creation and execution can consume paid compute, and secret values are not an
MCP input.

## Plan before execution

Resolve:

- Docker image and immutable version when possible.
- Command, arguments, timeout, namespace, labels, and expected outputs.
- Compute and billing implications.
- Output persistence location and failure recovery.
- Schedule, concurrency, and suspension behavior for recurring work.

Keep credentials and private keys out of MCP arguments. Route secret-bearing submissions to `$mega-cli` or the platform's protected secret workflow.

## Execute safely

1. Use list or inspect before canceling, deleting, suspending, resuming, or triggering a selected Job or schedule.
2. Confirm the exact Job or schedule ID and explain the state change.
3. Treat run and scheduled trigger as potentially paid operations.
4. Bound log output with `tail`; use the CLI for streaming or long waits.
5. Return the Job or schedule ID, current stage, request ID, and next monitoring action.

Do not report completion until the terminal stage and persisted outputs have been verified.

## Sandbox safeguards

1. Inspect providers or the selected Sandbox/pool before a lifecycle action.
2. Confirm namespace, lifetime, egress choice, read-only mounts, command, working directory, timeout, and expected cost before creation or execution.
3. Keep credentials, tokens, and private keys out of command arguments, stdin, and environment values. Use the protected platform workflow or CLI where appropriate.
4. Use the CLI for interactive shells, streaming output, repeated waits, broad local mounts, and long-running automation.
