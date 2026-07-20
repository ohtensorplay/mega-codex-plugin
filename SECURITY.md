# Security policy

Do not report suspected vulnerabilities in a public issue. Use the repository's
private GitHub security advisory flow or email `feedback@tensorplay.cn`.

Never commit OAuth tokens, reviewer credentials, provider keys, Space secrets,
or a generated OpenAI domain-verification token. The plugin uses the official
remote OAuth endpoint and does not accept embedded bearer-token configuration.
