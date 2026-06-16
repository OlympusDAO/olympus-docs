# LayerZero Bridge Security Upgrade

## Overview

Olympus has relaunched its EVM cross-chain bridge with a rebuilt, security-hardened design. The bridge lets you move native OHM between Ethereum and supported networks (Arbitrum, Optimism, Base, and Berachain), and it runs on [LayerZero](https://layerzero.network/) messaging.

EVM bridging had been paused as a precaution following an industry-wide bridge incident. Rather than simply switch the old bridge back on, Olympus rebuilt it from the ground up with several independent layers of protection, so that no single failure can put OHM at risk.

### What you need to know

- **Same experience, stronger protection.** Bridging works the same way; the upgrade adds guardrails underneath.
- **Defense in depth.** Multiple independent safety layers each have to fail before funds could be at risk — not just one.
- **No new OHM is created by bridging.** Bridging never changes the total supply of OHM. Net-new OHM can only ever be minted on Ethereum.
- **Independently audited.** The upgraded contracts were [audited by Guardian](https://storage.googleapis.com/olympusdao-landing-page-reports/audits/2026-06-Bridge.pdf) (June 2026).
- **The Solana bridge is unaffected.** Solana uses a separate Chainlink CCIP bridge and is not part of this upgrade.

## Why this upgrade is needed

Cross-chain bridges are one of the most attacked parts of DeFi. Historically they have accounted for roughly half of all funds lost to exploits. The reason is usually a **single point of failure**: one contract, one key, or one message verifier that, if compromised, lets an attacker move more than they should.

Cross-chain messages on LayerZero are confirmed by services called **DVNs** (Decentralized Verifier Networks), independent parties that each check that a message is genuine before it is delivered. In April 2026, another protocol (rsETH / KelpDAO) suffered an incident in which roughly **$292M** was drained after a **single message verifier was compromised**. The exploit did not affect Olympus, but it highlighted exactly the kind of single-point-of-failure risk that any LayerZero-based bridge needs to defend against.

As a precaution, Olympus paused EVM bridging while the team reviewed and rebuilt its bridge. The previous bridge had been audited and worked well, but it had limitations worth fixing before turning it back on:

- It relied on LayerZero's **default messaging configuration**, which can change over time and isn't pinned to a fixed, vetted set of verifiers.
- It had **no rate limits** — no cap on how much OHM could move in a given period.
- It had **no hard cap** on how much OHM could be brought *back* to Ethereum.
- It included a message **retry path** that didn't fully re-validate where a message came from.

Rather than patch these one at a time, Olympus rebuilt the bridge with a layered, defense-in-depth design.

## What's changed

Two things changed under the hood:

1. **LayerZero V1 → V2.** The bridge now uses LayerZero's newer messaging stack, which allows the explicit, pinned security configuration described below.
2. **One contract → four specialized contracts.** The old bridge did everything in a single contract. The new design splits responsibilities so that each piece does one job and the impact of any single issue is contained:


| Contract                      | Plain-language role                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| **LZBridgeGateway**           | The engine room. Handles messaging, OHM mint/burn, rate limits, and supply tracking.                   |
| **LZCrossChainBridge**        | The user-facing contract you actually interact with when bridging. It has no minting power of its own. |
| **LZEndpointDelegate**        | Manages the low-level LayerZero connection settings, kept separate from the engine room.               |
| **LZBridgeAndDelegateConfig** | The timelock. Sensitive settings are managed through this contract, on a delay.                        |


## The security guardrails

This is the heart of the upgrade. The new bridge stacks several **independent** protections. An attacker would have to defeat all of them at once, which is what "defense in depth" means in practice.

### 1. Four independent verifiers on every route

Every cross-chain message must now be independently confirmed by **four** separate DVNs before it can be delivered:

- **LayerZero Labs**
- **Canary**
- **Nethermind**
- **Google Cloud** (replaced by **Horizen** on routes that touch Berachain, where Google Cloud is unavailable)

All four must agree. Compromising one is not enough to push a fraudulent message through. The "optional verifier" slot is also explicitly **locked off**, so a future change to LayerZero's defaults cannot silently add or swap a verifier on Olympus messages.

### 2. Rate limits on every lane

The bridge now caps how much OHM can move on each route, in each direction, within a rolling 24-hour window. If the limit for a lane is reached, further transfers on that lane simply wait until capacity frees up.

Even in a worst-case scenario, the amount that could move before anyone noticed is **bounded** and the delay gives the community and Olympus contributors time to react and pause the bridge if something looks wrong.


| Route                            | Per-route limit (rolling 24h) |
| -------------------------------- | ----------------------------- |
| Ethereum → any L2 (outbound)     | 100,000 OHM                   |
| Ethereum ← any L2 (inbound)      | 55,000 OHM                    |
| L2 → Ethereum                    | 50,000 OHM                    |
| L2 → another L2                  | 100,000 OHM                   |
| Any L2 (inbound, from any chain) | 110,000 OHM                   |


The limits are "offsetting": OHM moving one way frees up capacity for OHM moving the other way, so normal round-trip activity isn't unnecessarily constrained.

### 3. A hard cap on OHM returning to Ethereum

Ethereum is the **canonical home** of OHM, the only chain where net-new OHM can ever be created. The new bridge keeps a precise count of how much OHM has been sent *out* to other chains, and it will **never mint back more OHM on Ethereum than legitimately left it.**

This is the strongest backstop in the design. Even in the extreme hypothetical where someone could create fake OHM on an L2, they could not bring more OHM back to Ethereum than had genuinely been bridged out. That ceiling moves up only as real bridging activity happens.

### 4. A timelock on sensitive changes

The bridge's most sensitive settings (rate limits, messaging configuration, and supply accounting) are gated behind the role granted to the timelock contract. Any such change must be **queued through a timelock** and wait out a delay (configurable between 1 and 30 days, set to **1 day** at launch) before it can take effect, with a limited execution window after that.

This does two things: it makes every sensitive change **publicly visible in advance**, and it gives an **emergency role the ability to cancel** a queued change before it executes if it looks malicious or mistaken.

### 5. Hardened message handling

Several lower-level protections were added or fixed:

- **Pinned configuration.** The bridge uses an explicit, fixed messaging setup instead of inheriting LayerZero's mutable defaults — closing off "drag-along" risks where a default change could weaken security.
- **Safer delivery.** The old custom message-retry path (which didn't fully re-check a message's origin) was removed in favor of LayerZero V2's native delivery, which always re-validates the sender.
- **Receive-gating.** Pausing the bridge now stops **both** outbound and inbound transfers. Previously, a paused bridge could still receive.
- **Guaranteed gas.** Messages now enforce a minimum amount of destination-chain gas, so a transfer can't get stuck part-way through for lack of gas.

### 6. Clear roles and emergency controls

Permissions are split into narrow, purpose-specific roles so no single actor holds broad power over the bridge:


| Role                            | What it can do                                                       |
| ------------------------------- | -------------------------------------------------------------------- |
| **Configurator** (the timelock) | Manages sensitive configuration changes on a delay.                  |
| **Admin**                       | Major operational actions (e.g. setting up routes).                  |
| **Rate limiter**                | A narrow role scoped only to adjusting rate limits.                  |
| **Facilitator**                 | The user-facing contract's permission to request a bridge transfer.  |
| **Emergency**                   | Can pause the bridge immediately and cancel queued timelock changes. |


The design also includes a fast **re-enable grace period** (so a precautionary pause can be quickly reversed without a full governance cycle if it was a false alarm, up to 3 days from the shutdown event) and an **asset-rescue** function to recover tokens accidentally sent to the bridge contracts.

## What is bridged, and how supply stays safe

The bridge moves **OHM**, Olympus's native token. Olympus uses a **burn-and-mint** model rather than wrapping:

- When you bridge OHM **off** a chain, that OHM is **burned** (destroyed) there.
- When it arrives on the destination chain, an equal amount of **native OHM is minted** for you.

Because every mint on a destination chain corresponds to a burn somewhere else, **bridging never changes the total amount of OHM in existence.** The OHM you receive is fully native to its chain, so it works directly with any app or protocol on that chain — no wrapped representation involved.

Ethereum is treated as the **canonical chain**: it is the only place where net-new protocol OHM can be minted. OHM minted by the bridge on other chains only ever *mirrors* OHM that was burned elsewhere, and can never exceed what was genuinely bridged out.

## Supported networks

The upgraded LayerZero bridge connects:

- **Ethereum** (canonical)
- **Arbitrum**
- **Optimism**
- **Base**
- **Berachain**

Berachain now connects to **all** of the other EVM chains, not just Ethereum.

Bridging to and from **Solana** continues to use the separate [Chainlink CCIP bridge](./07_cross-chain.md#solana-bridge) and is not affected by this upgrade.

## Security and audits

The upgraded bridge contracts were independently audited by **Guardian (June 2026)**. The report is available in the [Audits](../security/02_audits.md#layerzero-bridge) section.

No design removes risk entirely. The bridge still depends on the LayerZero messaging layer, and a severe failure or compromise of that layer could affect bridge operation. The point of the layered guardrails above is to ensure that even in adverse conditions, the **impact is contained and bounded** rather than catastrophic and that the community has time and tools to respond.

## Summary


| Before                              | After                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------- |
| LayerZero V1, default configuration | LayerZero V2, explicitly pinned configuration                          |
| Single contract                     | Four specialized contracts                                             |
| Default verifier set                | 4 required, independent verifiers per route (optional slot locked off) |
| No rate limits                      | Per-route, bidirectional 24-hour rate limits                           |
| No cap on OHM returning to Ethereum | Hard cap tied to OHM actually bridged out                              |
| Instant configuration changes       | Timelock-gated, cancellable changes                                    |
| Custom retry path                   | Native, sender-validated delivery                                      |




For step-by-step bridging instructions, supported routes, and contract addresses, see the [Cross-Chain Bridge](./07_cross-chain.md) page and the [contract addresses table](../contracts/01_addresses.md).