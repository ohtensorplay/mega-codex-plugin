# MEGA Codex plugin

The MEGA plugin combines focused workflow skills with the official remote
MEGA MCP server. The remote endpoint also works in other standards-compliant
AI clients.

- MCP: 29 HF-aligned identity, repository, file, paper, Space, Job, Sandbox, community, and documentation tools, plus resources and prompts.
- CLI: local files, bulk transfer, Git, streaming logs, scripts, and waits.
- Skills: route repository, dataset, Space, Job, inference, and community work.
- OAuth: Read, Write, Full, or a custom dependency-safe scope set.

The MCP endpoint is fixed at `https://mega.tensorplay.cn/mcp`. MCP v1.1 has a
stable, focused catalog: it supports bounded text files and explicit actions,
not arbitrary HTTP calls, bulk artifacts, or secret-value submission. OAuth-capable
clients use standard discovery, Dynamic Client Registration, and PKCE. The
endpoint has one stable tool catalog, and MEGA OAuth scopes authorize each
operation.

## Install in Codex

```bash
codex plugin marketplace add ohtensorplay/mega-codex-plugin
codex plugin add mega@tensorplay
```

Restart Codex after installation. OAuth starts the first time the remote MCP
server is used.

The public Codex plugin does not automatically create a ChatGPT workspace App
or publish an OpenAI Plugins Directory listing. See
[OFFICIAL-WEB-INTEGRATION.md](./OFFICIAL-WEB-INTEGRATION.md) for that separate
release path.

The bundled Skills are generated, release-pinned snapshots of the canonical
public [`ohtensorplay/mega-skills`](https://github.com/ohtensorplay/mega-skills)
repository. Their exact upstream release and commit are recorded in the
repository-root `skills.lock.json` file.
