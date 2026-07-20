---
name: mega-community
description: Work with MEGA papers and community content. Use for paper discovery, arXiv details, linked Hub resources, collections, posts, comments, discussions, pull requests, reporting, or deciding whether a bounded MCP action or the mega CLI/web workflow is required.
license: MIT
---

# MEGA community and papers

## Papers

1. Use `paper_search` with a bounded query, limit, and cursor.
2. Select by arXiv ID, title, authors, and relevance rather than title alone.
3. Use `paper_details` for the selected arXiv ID and inspect linked MEGA resources.
4. Use type-specific repository search/details tools for linked models, datasets, or Spaces.

Separate claims from the paper page, repository cards, and your own inference. Preserve canonical paper and resource links.

## Community tools

- Use `mega_collections` to list, inspect, create, update, organize, vote on, or delete collections. Collection mutations require `community:write`.
- Use `mega_content` for the home feed, blog articles, comments, reactions, subscriptions, and reports. Read or inspect the article and existing thread before changing it.
- Use `repository_discussions` to list and inspect discussions or pull requests, then create, reply, update, react, report, merge, close, or delete only after confirming the exact repository and number. A merge also needs repository write access.

Before publishing or mutating community content, confirm the target, visibility,
authorship, exact externally visible change, and required scope. Route webhooks,
bulk moderation, attachments, or any operation outside these tools to current
MEGA documentation and the CLI or web workflow; do not invent unsupported tools.
