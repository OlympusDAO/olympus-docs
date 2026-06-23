---
sidebar_position: 1
---

# Claude Code

[Claude Code](https://docs.claude.com/en/docs/claude-code) is Anthropic's agentic command-line tool. Add the Olympus MCP server with a single command.

## Add the server

```bash
claude mcp add --transport http olympus https://mcp.olympusdao.finance/mcp
```

To make the server available across all of your projects, add it at user scope:

```bash
claude mcp add --transport http olympus https://mcp.olympusdao.finance/mcp --scope user
```

## Verify

Run `/mcp` inside a Claude Code session to confirm the `olympus` server is connected and its tools are available.
