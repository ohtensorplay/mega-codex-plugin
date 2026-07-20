# Official ChatGPT web integration

MEGA connects to the official ChatGPT web experience as a remote MCP App.
The local Codex plugin and the ChatGPT App are complementary distribution
surfaces; installing one does not create or publish the other.

## Connection values

- App name: `MEGA`
- MCP server URL: `https://mega.tensorplay.cn/mcp`
- Authentication: `OAuth 2.1`
- Tools discovered by Scan Tools: `mega_whoami`, `mega_profile`, `model_search`, `dataset_search`, `space_search`, `hub_repo_search`, `model_details`, `dataset_details`, `hub_repo_details`, `mega_fs`, `mega_fs_write`, `create_repo`, `paper_search`, `paper_details`, `duplicate_space`, `space_info`, `space_runtime`, `space_files`, `manage_space`, `space_configuration`, `use_space`, `dynamic_space`, `mega_jobs`, `mega_sandboxes`, `mega_collections`, `mega_content`, `repository_discussions`, `mega_doc_search`, `mega_doc_fetch`
- MCP resources: `mega://catalog/mcp`, `mega://guides/workflows`
- MCP prompts: resource discovery, repository inspection, Space use, and paper summary
- Logo: `https://mega.tensorplay.cn/mega-icon.png`
- Privacy policy: `https://mega.tensorplay.cn/privacy`
- Terms of service: `https://mega.tensorplay.cn/terms-of-service`
- Website: `https://mega.tensorplay.cn/`
- Support: `feedback@tensorplay.cn`

MEGA advertises the OAuth authorization server and protected-resource metadata
through its `.well-known` endpoints. ChatGPT may use OAuth Dynamic Client
Registration, PKCE, and `offline_access` so that refresh tokens can keep the
connection active. No client secret or pasted bearer token is required.

## Private workspace rollout

1. An eligible ChatGPT Business or Enterprise/Edu admin enables Developer Mode.
2. Open **Workspace settings → Apps → Create** (or **Settings → Apps → Create**
   for an authorized developer).
3. Enter the values above and select OAuth authentication.
4. Select **Scan Tools**, finish MEGA login, and choose Read, Write, Full, or a
   custom MEGA permission set on the MEGA authorization page.
5. Confirm that exactly the domain tools above are discovered, then create the
   draft App.
6. Run read-only pilot prompts first. Review action controls and confirmations
   before allowing repository, Space, or Job mutations.
7. An admin publishes the draft and assigns role access. In Enterprise/Edu,
   review and enable actions explicitly.

After ChatGPT creates the App, copy its `plugin_asdk_app_...` ID from the
browser URL. Add a root `.app.json` using that real ID:

```json
{
  "apps": {
    "mega": {
      "id": "plugin_asdk_app_REPLACE_WITH_THE_CREATED_APP_ID",
      "category": "Developer Tools"
    }
  }
}
```

Then add `"apps": "./.app.json"` to `.codex-plugin/plugin.json`, validate the
plugin, refresh its marketplace version, and test it in a new ChatGPT Work
conversation. Do not commit a placeholder App ID: the App must first exist in
the target OpenAI account or workspace.

MEGA OAuth scopes limit every tool at the source. ChatGPT App action controls
independently decide which discovered actions ChatGPT may invoke and when it
must ask the user. Both layers apply.

## Plugin Directory release

A workspace App publication is not a public Plugin Directory publication. For
public distribution, submit the MEGA App for OpenAI review and create or import
a plugin listing that includes the MEGA App plus these skills. The submission
must include the public logo, website, privacy policy, terms, support contact,
tool behavior, authentication flow, and reviewer test instructions. Directory
submission and workspace publication require an authenticated OpenAI account
with the appropriate admin/developer role and cannot be completed by this local
repository alone.

When MEGA changes a tool definition, refresh the App's actions and review the
diff before publishing the update; ChatGPT does not silently enable new or
changed actions.
