---
sidebar_position: 7
---

# Other MCP clients

The Olympus MCP server speaks the standard MCP **Streamable HTTP** transport, so it works with any compliant client. No API key, token, or login is required.

## Clients that accept a remote URL

If your client supports remote MCP servers, point it at the endpoint directly:

```text
https://mcp.olympusdao.finance/mcp
```

This covers most modern clients, including ChatGPT custom connectors, Windsurf, Cline, Zed, and others. Check your client's documentation for where MCP servers are configured.

## stdio-only clients

Some clients only support local stdio servers. Bridge the remote endpoint with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote), which requires Node.js:

```bash
npx -y mcp-remote https://mcp.olympusdao.finance/mcp
```

Most clients express this as a command-and-args entry:

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
