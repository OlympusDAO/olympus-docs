---
sidebar_position: 1
---

# Contract Registry

Use the Protocol Visualizer Indexer when an agent needs the current Olympus V3 contract set. The indexer reads the Kernel registry and exposes the installed contracts through GraphQL.

## Endpoint

```text
https://protocol-visualizer-indexer-production.up.railway.app/graphql
```

Status endpoint:

```text
https://protocol-visualizer-indexer-production.up.railway.app/status
```

Browser visualizer:

```text
https://olympus-protocol-visualizer.up.railway.app/
```

## Supported Chains

The status endpoint returns the indexed chains and latest indexed block. At time of writing, the indexer includes:

- Ethereum mainnet: `1`
- Optimism: `10`
- Base: `8453`
- Berachain: `80094`
- Sepolia: `11155111`

Agents should call `/status` before relying on chain coverage or freshness.

## Query Active Contracts

Use `isEnabled: true` for the current active protocol surface.

```bash
curl -s -X POST "https://protocol-visualizer-indexer-production.up.railway.app/graphql" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ contracts(where: { chainId: 1, isEnabled: true }, limit: 100) { items { chainId address name version type isEnabled } } }"
  }'
```

Typical fields:

- `chainId`: EVM chain ID.
- `address`: contract address.
- `name`: contract or module name.
- `version`: contract version when available.
- `type`: `kernel`, `module`, or `policy`.
- `isEnabled`: whether the contract is currently active in the Kernel.

## Query All Known Contracts on a Chain

Use this when you need active and deprecated contracts for migration or historical context.

```bash
curl -s -X POST "https://protocol-visualizer-indexer-production.up.railway.app/graphql" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ contracts(where: { chainId: 1 }, limit: 200) { items { chainId address name version type isEnabled } } }"
  }'
```

Do not describe disabled contracts as active. A disabled contract can still be useful for history, but it is not part of the current Kernel-installed surface.

## Minimal Agent Prompt

When handing this to an agent, a minimal safe prompt is:

```text
Fetch Olympus V3 contracts from the Protocol Visualizer Indexer. First call /status. Then query contracts for the requested chain with isEnabled: true. Classify the results by type: kernel, module, policy. Do not use cached addresses for active-state claims. If you need balances, prices, roles, permissions, or parameters, verify them with live contract calls or official indexed sources before answering.
```

## JavaScript Example

```js
const endpoint =
  "https://protocol-visualizer-indexer-production.up.railway.app/graphql";

const query = `
  query ActiveContracts($chainId: Int!) {
    contracts(where: { chainId: $chainId, isEnabled: true }, limit: 100) {
      items {
        chainId
        address
        name
        version
        type
        isEnabled
      }
    }
  }
`;

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query, variables: { chainId: 1 } }),
});

const { data } = await response.json();
console.log(data.contracts.items);
```
