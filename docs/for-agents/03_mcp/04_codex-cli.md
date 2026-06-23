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
