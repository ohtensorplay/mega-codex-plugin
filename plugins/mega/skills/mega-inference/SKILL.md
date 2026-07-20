---
name: mega-inference
description: Discover MEGA models and choose a safe inference execution path for chat, responses, embeddings, or application-specific inference. Use for provider selection, model metadata, compatible Space invocation, direct inference API or CLI workflows, streaming, credentials, quotas, and output validation.
---

# MEGA inference

MEGA MCP v1 does not expose a generic arbitrary inference or HTTP execution tool. Do not invent one.

## Choose the path

- Use `model_search` and `model_details` to discover and inspect candidate models.
- Use `space_search` plus `dynamic_space` when a compatible running Gradio Space publishes the needed typed tool. Inspect parameters before invoking.
- Use the current MEGA inference SDK/API or `$mega-cli` for provider-native chat, Responses, embeddings, streaming, batch work, or secret-bearing credentials.
- Use `mega_doc_search`, then `mega_doc_fetch`, for current provider, model, pricing, quota, and API guidance.

## Validate

Confirm the model ID, task, provider, input limits, output format, streaming needs, expected cost, and data sensitivity before execution. Never print or commit API keys. Keep model output distinct from trusted metadata and verify structured outputs before using them in downstream mutations.
