---
sidebar_position: 8
---

# Bring your own keys

The Olympus MCP server is authless: you never need a key to use it. But a few tools read upstream APIs that are themselves key-gated, and this deployment's keys are shared by every caller. When a shared key is exhausted, rate-limited, or unavailable, you can send your own on the request instead.

Client keys apply to **that request only**. The server does not store them, does not log them, and does not write them into the response. How the key rests on your side is your client's business — see [Where your key lives locally](#where-your-key-lives-locally).

## Supported headers

Each header overrides one upstream credential:

| Header                    | Upstream  | Used by                                                                                                                                                         |
| ------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-Olympus-Key-Graph`     | The Graph | Every The Graph-hosted subgraph: protocol metrics and treasury history, POL on Base, Arbitrum and Berachain, Cooler V1 history, `get_yrf_state`, bond markets, emissions, Governor Bravo history, and `query_indexer` against those subgraphs |
| `X-Olympus-Key-Infura`    | Infura    | Direct RPC reads on Ethereum and Base: `read_contract`, `get_cooler_state`, `get_credit_terms`, `get_liquidation_scenario`                                       |
| `X-Olympus-Key-Etherscan` | Etherscan | Token transfers, contract verification and deployment history, gOHM delegation events                                                                           |
| `X-Olympus-Key-0x`        | 0x        | Routed quotes in `get_executable_slippage`                                                                                                                      |

These four headers are the complete list. The header-to-credential mapping is an explicit whitelist on the server, not a naming convention, so no other server-side secret is reachable this way.

Not every source is key-gated. The Envio indexer, the Convertible Deposits indexer, the visualizer snapshot API, Snapshot, DeFiLlama and CoinGecko need no key at all, and RPC reads fall back to a public endpoint when no Infura key is present — so an Infura header buys reliability and rate limit, not access.

To see which sources need a key and whether this deployment currently has one, call `list_data_sources` — it reports `requiresSecret` and `available` for every source. Treat that output as authoritative if it ever disagrees with this page.

## Configure your client

Add the header wherever your MCP client sets custom HTTP headers. You only need the headers for the upstreams you care about.

### Claude Code

```bash
claude mcp add --transport http olympus https://mcp.olympusdao.finance/mcp \
  --header "X-Olympus-Key-Graph: <your gateway key>"
```

Repeat `--header` for each key you want to supply.

### Claude Desktop

Pass the header through the `mcp-remote` bridge in `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "olympus": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.olympusdao.finance/mcp",
        "--header",
        "X-Olympus-Key-Graph:<your gateway key>"
      ]
    }
  }
}
```

The space after the colon is omitted on purpose: some clients split arguments that contain spaces, which would break the header.

### Cursor

```json
{
  "mcpServers": {
    "olympus": {
      "url": "https://mcp.olympusdao.finance/mcp",
      "headers": {
        "X-Olympus-Key-Graph": "${env:GRAPH_API_KEY}"
      }
    }
  }
}
```

Cursor interpolates `${env:...}`, so the key can stay in your environment rather than in the config file.

### VS Code

```json
{
  "servers": {
    "olympus": {
      "type": "http",
      "url": "https://mcp.olympusdao.finance/mcp",
      "headers": {
        "X-Olympus-Key-Graph": "${input:graph-key}"
      }
    }
  },
  "inputs": [
    {
      "type": "promptString",
      "id": "graph-key",
      "description": "The Graph gateway key",
      "password": true
    }
  ]
}
```

VS Code prompts for an `input` the first time the server starts and stores the value securely, so the key never lands in `mcp.json`.

An `${input:...}` placeholder needs an interactive prompt. A headless or forwarded agent session cannot answer that prompt, and the server then starts without the header — or does not start at all. For those sessions, write the header value directly in your user-level MCP configuration, which stays out of source control:

```json
{
  "servers": {
    "olympus": {
      "type": "http",
      "url": "https://mcp.olympusdao.finance/mcp",
      "headers": {
        "X-Olympus-Key-Graph": "<your gateway key>"
      }
    }
  }
}
```

### Codex CLI

Headers go in a sub-table of the server entry in `~/.codex/config.toml`:

```toml
[mcp_servers.olympus]
url = "https://mcp.olympusdao.finance/mcp"

[mcp_servers.olympus.http_headers]
X-Olympus-Key-Graph = "<your gateway key>"
```

To read the value from the environment instead of hardcoding it, use `env_http_headers`, whose values are environment variable names:

```toml
[mcp_servers.olympus.env_http_headers]
X-Olympus-Key-Graph = "GRAPH_API_KEY"
```

### Gemini CLI

```json
{
  "mcpServers": {
    "olympus": {
      "httpUrl": "https://mcp.olympusdao.finance/mcp",
      "headers": {
        "X-Olympus-Key-Graph": "<your gateway key>"
      }
    }
  }
}
```

### Other clients

Any client that can attach custom headers to a Streamable HTTP MCP server works the same way. For stdio-only clients, pass the header through the bridge:

```bash
npx -y mcp-remote https://mcp.olympusdao.finance/mcp \
  --header "X-Olympus-Key-Graph:<your gateway key>"
```

## Where your key lives locally

The no-retention guarantee above covers the server. Your client is a separate matter, and the examples on this page differ in how they hold the key:

- A literal value in `claude_desktop_config.json`, `mcp.json`, `config.toml` or a `claude mcp add` command rests in plaintext on disk. Keep those files out of source control.
- `${env:...}` in Cursor and `env_http_headers` in Codex CLI read the key from your environment, so the config file holds only a variable name.
- A VS Code `promptString` input goes to the editor's secret storage, so the key never lands in `mcp.json`.
- A key passed on a command line can also reach your shell history and your process list.

Pick whichever of these your threat model allows. The server sees the header, uses it for one request, and forgets it.

## How your key is used

- **Your key wins outright.** When the header is present, the server uses your key.
- **Failures tell you whose key was rejected.** If an upstream returns `401`, `402`, `403`, or `429`, the error payload includes `key_source: "client"` or `key_source: "server"`, so you can tell a problem with your key from a problem with ours.
- **Responses stay shared.** Every source behind these keys returns public, account-independent data, so results are cached and shared across callers whether or not a key was supplied. A keyed request warms the cache for everyone, and a cached hit costs you nothing against your own quota.
- **Higher rate limits.** Requests carrying your own keys get a higher per-tool rate limit, since they do not spend this deployment's upstream quota.
- **Malformed headers are ignored, not rejected.** A header the server cannot use is dropped and the request proceeds on the shared key, so a bad key never turns a serviceable request into an error.
