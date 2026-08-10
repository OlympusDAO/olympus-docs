---
sidebar_position: 4
---

# Codex CLI

[Codex CLI](https://developers.openai.com/codex/cli) supports remote MCP servers over Streamable HTTP.

## Add the server

```bash
codex mcp add olympus --url https://mcp.olympusdao.finance/mcp
```

Or add it directly to `~/.codex/config.toml`:

```toml
[mcp_servers.olympus]
url = "https://mcp.olympusdao.finance/mcp"
```

## Optional: your own upstream keys

Add an `[mcp_servers.olympus.http_headers]` sub-table to use your own upstream API keys. See [Bring your own keys](./08_bring-your-own-keys.md).
