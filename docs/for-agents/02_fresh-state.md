---
sidebar_position: 2
---

# Finding Fresh Protocol State

After an agent has the right contracts, it still needs the right state source. This page gives a routing guide for common Olympus questions.

## Source Selection

| Question                                  | Preferred source                                             | Notes                                                       |
| ----------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| Which contracts make up Olympus V3?       | Protocol Visualizer Indexer                                  | Filter `isEnabled: true` for active Kernel state.           |
| What does a contract do?                  | Contract docs, verified source, ABI                          | Use generated docs and source code for behavior.            |
| What are current balances?                | Direct contract calls or official indexed balances           | Do not rely on old docs for balances.                       |
| What is the current OHM price or backing? | Official protocol metrics or contract-backed source          | Fetch live and cite the source.                             |
| What are current APYs or yields?          | Venue contract/API plus verification                         | APYs move frequently; never quote cached values as current. |
| Which roles or permissions exist?         | Kernel, ROLES module, policy permission functions            | Verify role and permission state onchain.                   |
| What is the status of governance?         | Official governance forum, Snapshot, or governance contracts | Verify proposal IDs and lifecycle state before citing.      |

## Contract Classes

### Kernel

The Kernel is the root registry and permissioning layer. Use it to understand what has been installed, upgraded, activated, or deactivated.

### Modules

Modules hold shared protocol state. Examples include treasury, minter, price, range, registry, and roles modules. Agents should generally avoid assuming users interact with modules directly. Policies usually expose the external workflows.

### Policies

Policies implement user-facing or operator-facing workflows and request permissions from modules. Examples include Cooler, Heart, EmissionManager, YieldRepurchaseFacility, RolesAdmin, TreasuryCustodian, and bridge-related policies.

### Dependencies and Venues

Dependencies include DEX pools, lending venues, bridge infrastructure, oracle feeds, and external strategy contracts. They may be critical to Olympus operations, but they should not be grouped with Kernel-installed protocol contracts unless the Kernel registry shows them as installed and enabled.

## Freshness Checklist

Before an agent produces an answer that includes live protocol facts, it should be able to state:

- Which chain ID was queried.
- Which source was used for contract discovery.
- Whether inactive contracts were excluded or intentionally included.
- What block height or timestamp the source reported, if available.
- Which source was used for balances, prices, APYs, roles, or governance status.
- Any known gaps, fallback sources, or source disagreements.

## Common Failure Modes

Avoid these patterns:

- Copying an address table without checking whether the contract is still enabled.
- Treating a multisig address as a protocol module or policy.
- Treating a historical deployment as active because it appears in old docs.
- Computing treasury, backing, APY, or supply values from stale cached data.
- Mixing dependency contracts with Kernel-installed contracts without labeling the distinction.
- Citing governance proposal numbers or status without checking the live governance source.
