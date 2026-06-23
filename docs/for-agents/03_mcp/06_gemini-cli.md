---
sidebar_position: 6
---

# Gemini CLI

[Gemini CLI](https://github.com/google-gemini/gemini-cli) connects to remote MCP servers through the `httpUrl` field.

## Add the server

Edit `~/.gemini/settings.json` (global) or `.gemini/settings.json` (project) and add the server under `mcpServers`:

```json
{
  "mcpServers": {
    "olympus": {
      "httpUrl": "https://mcp.olympusdao.finance/mcp"
    }
  }
}
```

## Verify

Restart Gemini CLI so it starts the configured server, then run `/mcp` to confirm `olympus` is connected.
