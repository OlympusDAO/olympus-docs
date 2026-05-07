---
sidebar_position: 0
---

# For Agents: Start Here

This section is for AI agents, scripts, and integrators that need to understand Olympus from fresh sources instead of relying on stale address lists or cached summaries.

Olympus protocol state should be treated as live onchain state first. Documentation, dashboards, subgraphs, and third-party APIs are useful navigation layers, but they are not substitutes for contract state when accuracy matters.

## Agent Operating Rules

1. Start from the Kernel contract registry when identifying active Olympus V3 contracts.
2. Treat enabled Kernel modules and policies as the current protocol surface.
3. Separate protocol contracts from dependencies and periphery contracts.
4. Fetch prices, balances, APYs, supply, treasury values, and governance state live before quoting them.
5. Use subgraphs and APIs for discovery and aggregation, then verify important claims against the relevant contract or official source.
6. When data sources disagree, say which source you used and why.

## What Counts as Olympus

For Olympus V3, the protocol core is the Kernel plus the modules and policies installed in that Kernel.

- **Kernel**: the protocol registry and permissioning root.
- **Modules**: internal state/data contracts such as `TRSRY`, `MINTR`, `PRICE`, `RANGE`, and `ROLES`.
- **Policies**: external-facing logic contracts such as Cooler, Heart, EmissionManager, YieldRepurchaseFacility, and governance/admin policies.

These contracts make up the live operating system of Olympus.

## What Is Not the Protocol Core

Do not automatically treat every related address as an Olympus core contract.

- Multisigs and Safes are operators or administrators, not Kernel-installed modules or policies.
- DEX pools, lending markets, bridges, routers, and oracle feeds are dependencies or venues.
- Deployment helpers, migrators, and one-off utilities are periphery unless currently installed in the Kernel.
- Deprecated contracts should not be described as active unless current onchain state proves they are enabled.

## Recommended Agent Workflow

For most tasks, use this order:

1. **Find the active contracts** with the Protocol Visualizer Indexer GraphQL API.
2. **Classify each contract** by `type`: `kernel`, `module`, or `policy`.
3. **Filter for active state** with `isEnabled: true` when you want the current protocol surface.
4. **Use contract docs and ABIs** to understand what each contract does.
5. **Fetch live state** from contracts, official subgraphs, or official APIs depending on the metric.
6. **Verify externally visible claims** such as balances, APYs, prices, roles, and proposal status before citing them.

## Source Hierarchy

Use this hierarchy when choosing sources:

1. **Onchain contract state**: authoritative for installed contracts, permissions, balances, and parameters.
2. **Protocol Visualizer Indexer**: authoritative discovery layer for Kernel-installed contracts across supported chains.
3. **Official Olympus docs and generated contract docs**: human-readable explanations and ABI-level references.
4. **Official Olympus subgraphs/APIs**: useful for aggregation and historical queries.
5. **Block explorers and third-party aggregators**: helpful cross-checks, not primary sources for live protocol truth.
