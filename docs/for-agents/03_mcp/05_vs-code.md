---
sidebar_position: 5
---

# VS Code

VS Code agent mode (GitHub Copilot) connects to remote MCP servers over Streamable HTTP.

## Add the server

Create `.vscode/mcp.json` in your workspace (or add the entry to your user `mcp.json`):

```json
{
  "servers": {
    "olympus": {
      "type": "http",
      "url": "https://mcp.olympusdao.finance/mcp"
    }
  }
}
```

The root key in VS Code is `servers` (not `mcpServers`), and the remote transport type is `http`.

## Enable

Open the Chat view in **agent mode**, start the `olympus` server, and confirm its tools appear in the tools picker.
