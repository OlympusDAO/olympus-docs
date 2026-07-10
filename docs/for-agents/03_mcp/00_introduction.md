---
sidebar_position: 0
---

# Introduction

The **Olympus MCP server** is a remote [Model Context Protocol](https://modelcontextprotocol.io) server that gives AI clients structured, read-only access to Olympus protocol data through a single tool surface.

It unifies on-chain state, indexers (Envio, The Graph, Ponder), market data, governance, and the Olympus documentation behind one endpoint, so a client does not need to know which upstream source is canonical for each question. Ask about backing, treasury, Cooler loans, supply, governance, or protocol architecture, and the server routes the question to the right source and returns a verifiable answer.

## Endpoint

```text
https://mcp.olympusdao.finance/mcp
```

The server is **live, read-only, and authless**. No API key, token, or login is required. It speaks the standard MCP **Streamable HTTP** transport, so any compliant client can connect by pointing at the URL above.

## Connect your client

Pick your client to get set up:

- [Claude Code](./01_claude-code.md)
- [Claude Desktop](./02_claude-desktop.md)
- [Cursor](./03_cursor.md)
- [Codex CLI](./04_codex-cli.md)
- [VS Code](./05_vs-code.md)
- [Gemini CLI](./06_gemini-cli.md)
- [Other MCP clients](./07_other-clients.md) — any client that speaks Streamable HTTP, or a stdio-only client bridged with `mcp-remote`

## What you can ask

The server exposes a curated set of read-only tools. You do not call these directly: your client selects the right tool for your question. They are grouped by workflow below.

### Solvency and overview

| Tool                    | Answers                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `verify_solvency`       | Is OHM solvent and how is it backed right now? Liquid backing, backed supply, backing per OHM, premium, and source freshness. |
| `get_protocol_overview` | One-call overview: OHM price, backing, and supply.                                                                            |
| `get_protocol_snapshot` | Compact across-the-board state for price, backing, supply, treasury, Cooler, and Kernel.                                      |

### Treasury, backing, and supply

| Tool                  | Answers                                                                          |
| --------------------- | -------------------------------------------------------------------------------- |
| `get_treasury`        | Treasury value, liquid backing, holdings by category and chain, and APY context. |
| `get_backing_sources` | Where the backing comes from, broken down by category, chain, and liquidity.     |
| `get_backing_history` | Does backing grow over time? Recent history and deltas.                          |
| `get_supply`          | OHM and gOHM supply breakdown by chain and category.                             |

### Borrowing and risk

| Tool                       | Answers                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| `get_credit_terms`         | What does it cost to borrow, and what are the terms (interest, LTV bounds, min debt, pause flags)? |
| `get_liquidation_scenario` | Can a position be liquidated, and what would it take?                                              |
| `get_cooler_state`         | Current Cooler loan state.                                                                         |
| `get_convertible_deposits` | Convertible Deposits state: facilities, auctioneers, and positions.                                |

### Control and governance

| Tool                   | Answers                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| `get_admin_controls`   | Who can touch this? Kernel-installed modules and enabled policies. |
| `get_kernel_registry`  | The raw live Kernel module, policy, and contract registry.         |
| `get_governance`       | Active, pending, and recent governance proposals.                  |
| `get_governance_state` | Focused view of whether the rules are about to change.             |
| `get_security_posture` | Audit and security posture.                                        |

### Liquidity, yield, and dependencies

| Tool                      | Answers                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| `get_pol_liquidity`       | Protocol-owned liquidity positions by chain and pool.                                               |
| `get_liquidity_routes`    | Where direct OHM liquidity sits: primary routes, Olympus-owned POL, third-party routes, and cross-chain references. |
| `get_executable_slippage` | Executable slippage for a sized OHM trade, using an Odos routed quote plus relevant POL route context. |
| `get_market_depth`        | Liquidity and depth as a slippage proxy.                                                            |
| `get_yrf_state`           | What the Yield Repurchase Facility is doing.                                                        |
| `get_dependency_map`      | External exposure: oracles, bridges, DEXs, and venues.                                             |

### Discovery and direct reads

| Tool                  | Answers                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------- |
| `list_data_sources`   | Which data sources this deployment can reach, with freshness and auth requirements.     |
| `search_olympus_docs` | Semantic search over the Olympus documentation for concepts and mechanisms.             |
| `query_indexer`       | Raw GraphQL escape hatch against whitelisted indexer sources only.                      |
| `read_contract`       | Controlled direct read against known Olympus contracts and allow-listed functions only. |

## How it works

- **Transport:** standard MCP Streamable HTTP at `/mcp`.
- **Access:** read-only and authless. The server never holds keys, signs, or sends transactions; it only reads and reports.
- **Source of truth:** on-chain state first, with indexers, market data, governance, and documentation as navigation layers. Tools report which source they used and how fresh it is, so you can verify any claim.

For deeper background on what counts as the Olympus protocol surface and how to reason about live state, see [For Agents: Start Here](../00_start-here.md).
