---
sidebar_position: 1
---

# Contract Registry

Use the [Protocol Visualizer](https://protocol-visualizer.olympusdao.finance/) to discover Olympus contracts. For Ethereum mainnet, its public API exposes a JSON snapshot of the Kernel registry. Discovery is not proof that a proposed call is authorized or that the indexer is caught up to the latest block; confirm transaction targets and permissions on-chain.

## Ethereum Mainnet API

```text
GET https://protocol-visualizer-api.olympusdao.finance/v1/chains/1/protocol
Accept: application/json
```

The response includes `schemaVersion`, `generatedAt`, `chainId` and `data.contracts`. Each contract includes its address, name, version, type and `isEnabled` state. Use only entries with `chainId: 1` and `isEnabled: true` when discovering currently installed Ethereum contracts. A disabled contract may still matter for historical or migration work.

```bash
curl --fail-with-body --silent --show-error \
  -H 'Accept: application/json' \
  'https://protocol-visualizer-api.olympusdao.finance/v1/chains/1/protocol' \
  | jq -e '
      select(.schemaVersion == "1.0.0" and .chainId == 1)
      | .data.contracts
      | map(select(.chainId == 1 and .isEnabled == true))
    '
```

Check that the request succeeds, the schema and chain match, `generatedAt` is plausible and each selected address is a valid 20-byte EVM address. A contract's `lastUpdatedBlockNumber` records that contract's update, **not** the indexer's current head. The API snapshot alone cannot prove current chain state. If the API is unavailable, stale or ambiguous, use the current `olympus-v3` deployment source and read-only on-chain calls; do not substitute a cached address or another chain's result.

The endpoint above is verified for Ethereum (`1`). Do not assume that changing the chain ID exposes another network: confirm an official API route and live response first.

## Agent Handoff

```text
Discover candidate Olympus contracts from the Ethereum Protocol Visualizer API. Require a successful response, schemaVersion 1.0.0, chainId 1 and enabled contracts with matching chain IDs. Record generatedAt and the retrieval time. Verify the selected address, active state and required permissions against current deployment source and read-only on-chain state before using it in proposal calldata. If discovery or verification fails, report the gap rather than guessing an address.
```
