---
name: mega-datasets
description: Find, inspect, create, update, download, upload, version, and process datasets on MEGA Hub. Use for dataset search, dataset cards, schema or file discovery, bounded text reads, dataset repository creation, local or bulk transfer, and reproducible dataset workflows.
license: MIT
---

# MEGA datasets

## Discover

1. Use `dataset_search` with query, author, exact tags, sort, limit, and cursor.
2. Compare canonical ID, description, license, tags, update time, file count, size, match score, and source.
3. Use `dataset_details` with only the card, files, refs, or commits needed for the question.
4. Use `hub_repo_details` when comparing up to ten repositories or when the task needs the supported `dataset_structure` (configs, splits, sizes, and Parquet metadata) or `dataset_preview` operations.
5. Use `mega_fs` for bounded `mega://datasets/OWNER/NAME/PATH` listing, stat, or UTF-8 reads.

Do not claim a dataset has a schema, split, license, format, or preview row unless returned metadata, the selected dataset card, or a Dataset Viewer operation supports it.

## Create or update

- Use `create_repo` with `repo_type: dataset` for an empty or server-side duplicated dataset repository.
- Use `mega_fs_write` for one small verified text file such as a dataset card or configuration file.
- Use `$mega-cli` for local preparation, directories, binary data, large shards, bulk/resumable upload or download, Git versioning, and processing pipelines.

## Reproducibility

Pin a revision when results must be repeatable. Record the canonical dataset ID, revision, filters or split selection, local transformation steps, and output destination. Preserve licensing and provenance metadata when deriving or republishing data.
