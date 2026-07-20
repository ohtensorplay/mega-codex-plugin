---
name: mega-repositories
description: Discover, inspect, create, duplicate, and make bounded file changes to MEGA model, dataset, and Space repositories. Use for repository search, metadata, cards, files, refs, commits, canonical mega:// URIs, small text commits, or choosing MCP versus CLI repository operations.
---

# MEGA repositories

## Discover and inspect

1. Use `model_search`, `dataset_search`, or `space_search` when the type is known. Use `hub_repo_search` for a genuinely cross-type query.
2. Pass the narrowest useful filters: query, author, tags, sort, limit, and cursor. Preserve `next_cursor` until pagination is complete or the user has enough results.
3. Select by canonical `owner/name`, type, URL, match score, and match reason. Do not infer type from a name alone.
4. Use `model_details`, `dataset_details`, or `hub_repo_details` for bounded metadata, card, files, refs, or commits. `hub_repo_details` can inspect up to ten repositories and supports supported Dataset Viewer structure and preview operations for datasets.

## Repository paths

Use these canonical URI families:

```text
mega://models/OWNER/NAME/PATH
mega://datasets/OWNER/NAME/PATH
mega://spaces/OWNER/NAME/PATH
```

Use `mega_fs` with `ls`, `stat`, or `cat`. Respect byte limits, `truncated`, and continuation offsets. Do not request binary or bulk content through MCP.

## Mutate

- Use `create_repo` to create a model, dataset, or Space. Supplying a same-type source performs server-side duplication.
- Use `mega_fs_write` only for one verified UTF-8 path. `put` can overwrite and `rm` removes through a commit, so confirm the exact URI and revision first.
- Use `duplicate_space` when the intent is explicitly to copy a Space.
- Route directories, binaries, large artifacts, Git history, branch operations, and bulk transfers to `$mega-cli`.

Before any write, inspect the target, state the effect, verify the required scope, and return the resulting canonical ID, URL, revision, or commit metadata.
