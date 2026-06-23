---
title: "Cross-Chain OHM: Native Bridging via LayerZero and CCIP"
description: "Olympus moves native OHM across chains rather than wrapping it: OHM is burned or locked on the source chain and minted or released natively on the destination. EVM chains use a LayerZero V2 burn-and-mint bridge; Solana uses Chainlink CCIP."
sidebar_label: "Cross-Chain Bridge"
---

# Cross-Chain Bridge

## Overview

The OHM token is available cross-chain. Olympus moves **native OHM** between supported chains rather than minting wrapped representations, so the OHM you receive on any chain is composable with every dApp there.

Two bridge lanes handle the movement:

- **EVM chains** use a [LayerZero](https://layerzero.network/) V2 bridge with **burn-and-mint** accounting. OHM is burned on the source chain and an equal amount of native OHM is minted on the destination chain.
- **Solana** uses Chainlink CCIP. Canonical OHM is **locked or released** on Ethereum, while native OHM is **minted or burned** on Solana.

Ethereum is the **canonical chain** for OHM: it is the only place where net-new protocol OHM can be minted. Bridge minting on any other chain only mirrors OHM that was burned or locked elsewhere, so **bridging never changes the total supply of OHM**. There are no wrapped tokens anywhere in the design.

The EVM bridge was rebuilt on a security-hardened LayerZero V2 design and independently audited. For the full per-lane architecture, guardrails, rate limits, and contract roles, see the [Cross-Chain Bridge: Technical Details](./bridge-technical-details.md) page.

## How to bridge

1. Navigate to [https://app.olympusdao.finance](https://app.olympusdao.finance)
2. Click Bridge in the sidebar
3. Select the source chain and the destination chain
4. Enter amounts, approve and click Bridge. Note that Olympus does not charge a fee for bridging. You only pay for gas and the message passing fee charged by the bridge infrastructure.
5. You can view the transaction under the Transactions list.

## Supported networks

Ethereum, Arbitrum, Optimism, Base, Berachain, and Solana.

## Bridge lanes

The available bridge lane determines both the messaging provider and the token accounting model:


| Lane                                                   | Bridge path | Mechanism                                                                                                                                                                                 |
| ------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum mainnet &rarr; Solana                         | CCIP        | Canonical OHM is locked in the Ethereum `CCIPLockReleaseTokenPool`; native OHM is minted on Solana through the CCIP token pool.                                                           |
| Solana &rarr; Ethereum mainnet                         | CCIP        | Native OHM is burned on Solana through the CCIP token pool; canonical OHM is released from the Ethereum `CCIPLockReleaseTokenPool`.                                                       |
| Ethereum mainnet &rarr; non-canonical EVM chain        | LayerZero   | OHM is burned on Ethereum mainnet and minted on the destination EVM chain. Applies to Arbitrum, Base, Berachain, and Optimism.                                                            |
| Non-canonical EVM chain &rarr; Ethereum mainnet        | LayerZero   | OHM is burned on the source EVM chain and minted on Ethereum mainnet. Applies to Arbitrum, Base, Berachain, and Optimism.                                                                 |
| Non-canonical EVM chain &rarr; non-canonical EVM chain | LayerZero   | OHM is burned on the source EVM chain and minted on the destination EVM chain. Berachain connects to all other EVM chains. See the [technical details](./bridge-technical-details.md). |


## Security

To weigh the trade-offs of Olympus' approach, it helps to understand the difference between native and non-native tokens. Native tokens are deployed and controlled by the protocol's own contracts on each chain; non-native tokens are wrapped representations held and managed by a third party.

Under the typical **non-native** bridge design, source tokens are locked in a bridge contract and wrapped representations are minted elsewhere. That contract becomes a single point of attack, which is why bridges account for roughly **half of all DeFi exploits**.

Bridge Exploits

Olympus' native bridge avoids this. Each lane mints, burns, locks, or releases real OHM according to the chain's accounting model, so OHM is a genuinely native asset everywhere it is deployed — there is no pool of wrapped tokens to drain.

### Comparing the two lanes

Both lanes are built around the same principle — bound and contain the impact of any single failure — but each uses the guardrails native to its messaging layer:


| Property                 | EVM lane — LayerZero V2                                                                        | Solana lane — Chainlink CCIP                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Message verification     | Four independent DVNs must agree on every route; the optional-verifier slot is locked off      | Chainlink's decentralized oracle network, with an independent Risk Management Network (RMN) |
| Token accounting         | Burn on source, mint on destination (native)                                                   | Canonical OHM locked/released on Ethereum; native OHM burned/minted on Solana               |
| Supply backstop          | Hard cap — never mints more OHM back to Ethereum than was genuinely bridged out                | Bounded by the canonical OHM locked in the `CCIPLockReleaseTokenPool`                       |
| Rate limits              | Per-route, bidirectional, rolling 24-hour limits                                               | Per-route rate limiters on the CCIP token pools                                             |
| Sensitive-config control | Timelock-gated, cancellable changes                                                            | Token pool and bridge ownership held by the DAO multisig                                    |
| Emergency controls       | Pause halts both inbound and outbound; queued changes cancellable; fast re-enable grace period | Disable bridge; rate-limit a pool to ~0; withdraw locked liquidity to cap what can return   |
| Independent audit        | Guardian (June 2026)                                                                           | Electisec                                                                                   |


On the EVM lane, these protections stack as **defense in depth**: several independent layers (four required verifiers, rate limits, the hard return cap, and a timelock) would all have to fail at once before OHM could be put at risk. The [technical details](./bridge-technical-details.md) page breaks down each guardrail.

No design removes risk entirely. Both lanes ultimately depend on their messaging layer, and a severe failure or compromise of that layer could affect bridge operation. The layered design is built to **bound and contain** that impact rather than eliminate the risk, giving the community time and tools to respond.

The upgraded EVM bridge was audited by Guardian (June 2026), and the CCIP contracts were audited by Electisec. Audit reports are available in the [Audits](../../security/02_audits.md) section.

## Contracts

Bridge contract addresses are listed in the [contract addresses table](../../contracts/01_addresses.md).

For the full architecture, guardrails, rate-limit tables, contract roles, and per-lane mechanics, see the [Cross-Chain Bridge: Technical Details](./bridge-technical-details.md) page.