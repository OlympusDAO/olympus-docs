---
sidebar_position: 3
---

# Cursor

Add the Olympus MCP server to [Cursor](https://cursor.com) globally or per project.

## Add the server

Edit `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project) and add:

```json
{
  "mcpServers": {
    "olympus": { "url": "https://mcp.olympusdao.finance/mcp" }
  }
}
```

## Enable

Open **Settings → Tools & MCP** and enable the `olympus` server. Once connected, Cursor lists the available Olympus tools.

## Optional: your own upstream keys

Add a `headers` object to the entry above to use your own upstream API keys. See [Bring your own keys](./08_bring-your-own-keys.md).
