---
sidebar_position: 2
---

# Claude Desktop

There are two ways to connect the Olympus MCP server to the Claude desktop app.

## Option 1 — Custom connector

1. Open **Settings → Connectors**.
2. Click **Add custom connector**.
3. Paste the endpoint URL:
   ```text
   https://mcp.olympusdao.finance/mcp
   ```
4. Save, then enable the connector.

## Option 2 — Config file

Available on any plan. Add an `mcp-remote` bridge to `claude_desktop_config.json`, then restart the app:

```json
{
  "mcpServers": {
    "olympus": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.olympusdao.finance/mcp"]
    }
  }
}
```

`mcp-remote` bridges the remote Streamable HTTP endpoint into Claude Desktop and requires Node.js (which provides `npx`).
