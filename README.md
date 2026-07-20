<p align="center"><a href="https://mega.tensorplay.cn/"><img src="https://mega.tensorplay.cn/assets/logo-D1t6EjrA.webp" alt="MEGA" width="420" /></a></p>
<p align="center"><i>Repositories, data, compute, and community workflows inside Codex.</i></p>
<p align="center">
  <img alt="Codex plugin" src="https://img.shields.io/badge/Codex-plugin-111827">
  <img alt="MCP" src="https://img.shields.io/badge/MCP-OAuth-6D5AE6">
  <a href="https://github.com/ohtensorplay/mega-codex-plugin/blob/main/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/ohtensorplay/mega-codex-plugin"></a>
</p>

# MEGA for Codex

Bring [MEGA](https://mega.tensorplay.cn/) into Codex with a focused set of workflow Skills and the official OAuth MCP server. The plugin helps Codex select the safest route for repository work, datasets, Spaces, inference, Jobs, and community tasks.

## Install

```bash
codex plugin marketplace add ohtensorplay/mega-codex-plugin
codex plugin add mega@tensorplay
```

Restart Codex after installation. OAuth starts the first time a MEGA MCP operation needs your account.

## What you get

| Included | What it does |
| --- | --- |
| **8 workflow Skills** | Route repository, dataset, Space, Job, inference, community, and local CLI work. |
| **MEGA MCP v1.1** | Connect to 29 typed tools, two resources, and four workflow prompts at `https://mega.tensorplay.cn/mcp`. |
| **OAuth scopes** | Authorize Read, Write, Full, or custom least-privilege access from MEGA. |
| **CLI guidance** | Route local files, Git, bulk transfer, streaming, scripts, secrets, and long waits to the `mega` CLI. |

## Use it in a task

After installation, ask Codex naturally or name a Skill directly:

- “Find public text-generation models on MEGA and compare the best matches.”
- “Use `mega-datasets` to inspect this dataset before downloading it.”
- “Check this Space runtime, explain the issue, and do not change anything.”
- “Plan a MEGA Job with its expected cost, but wait for my approval before submitting it.”

The plugin keeps MCP interactions bounded and explicit. It does not use MCP for arbitrary HTTP requests, bulk artifacts, provider secret values, or local filesystem work.

## How the surfaces fit together

| Surface | Best for |
| --- | --- |
| **Skills** | Giving Codex a repeatable procedure and selecting the right tool boundary. |
| **MCP** | Live search, inspection, bounded files, explicit mutations, Space operations, Jobs, community, and current MEGA documentation. |
| **CLI** | Local and bulk workflows that need the machine running Codex. |

## Repository contents

- `plugins/mega` — the installable Codex plugin and MCP connection
- `plugins/mega/skills` — release-pinned copies of the workflow Skills
- `.agents/plugins/marketplace.json` — the Codex marketplace manifest

The canonical standalone Skills live in [mega-skills](https://github.com/ohtensorplay/mega-skills), and the Worker implementation lives in [mega-mcp-server](https://github.com/ohtensorplay/mega-mcp-server).

## Related projects

- [MEGA Hub](https://github.com/ohtensorplay/mega-hub)
- [MEGA Agent Skills](https://github.com/ohtensorplay/mega-skills)
- [MEGA MCP server](https://github.com/ohtensorplay/mega-mcp-server)

## License

MIT
