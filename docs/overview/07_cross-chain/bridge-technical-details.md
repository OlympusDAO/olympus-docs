---
sidebar_label: Technical Details
---

# Cross-Chain Bridge: Technical Details

This page covers the technical design of both Olympus bridge lanes: the **LayerZero V2** lane for EVM chains and the **Chainlink CCIP** lane for Solana. For the overview, step-by-step bridging instructions, supported networks, and the lane summary, see the [Cross-Chain Bridge](./index.md) page.

## Supply model and the canonical chain

Olympus moves **native OHM** between chains rather than wrapping it. Two accounting models are used, depending on the lane:

- **Burn-and-mint** (EVM / LayerZero): OHM is burned on the source chain, and an equal amount of native OHM is minted on the destination chain.
- **Lock/release plus burn-and-mint** (Solana / CCIP): canonical OHM is locked or released on Ethereum, while native OHM is burned or minted on Solana.

In both models, every mint on a destination chain corresponds to OHM burned or locked somewhere else, so **bridging never changes the total amount of OHM in existence**.

Ethereum is the **canonical chain**: it is the only place where net-new protocol OHM can be minted. OHM created by either bridge lane on any other chain only ever *mirrors* OHM that was burned or locked elsewhere, and can never exceed what was genuinely bridged out.

## LayerZero V2 lane (EVM)

The EVM bridge was rebuilt with a security-hardened, multi-contract LayerZero V2 design. It connects Ethereum (canonical), Arbitrum, Optimism, Base, and Berachain, and Berachain now connects to **all** of the other EVM chains rather than just Ethereum.

### Why the EVM bridge was rebuilt

Cross-chain bridges are one of the most attacked parts of DeFi, historically accounting for roughly half of all funds lost to exploits. The usual cause is a **single point of failure**: one contract, one key, or one message verifier that, if compromised, lets an attacker move more than they should.

Cross-chain messages on LayerZero are confirmed by services called **DVNs** (Decentralized Verifier Networks) — independent parties that each check that a message is genuine before it is delivered. In April 2026, another protocol (rsETH / KelpDAO) suffered an incident in which roughly **$292M** was drained after a **single message verifier was compromised**. The exploit did not affect Olympus, but it highlighted exactly the single-point-of-failure risk that any LayerZero-based bridge must defend against.

As a precaution, Olympus paused EVM bridging while the team reviewed and rebuilt its bridge. The previous bridge had been audited and worked well, but it had limitations worth fixing before turning it back on:

- It relied on LayerZero's **default messaging configuration**, which can change over time and isn't pinned to a fixed, vetted set of verifiers.
- It had **no rate limits** — no cap on how much OHM could move in a given period.
- It had **no hard cap** on how much OHM could be brought *back* to Ethereum.
- It included a message **retry path** that didn't fully re-validate where a message came from.

Rather than patch these one at a time, Olympus rebuilt the bridge with a layered, defense-in-depth design.

### What changed

Two things changed under the hood:

1. **LayerZero V1 → V2.** The bridge now uses LayerZero's newer messaging stack, which allows the explicit, pinned security configuration described below.
2. **One contract → four specialized contracts.** The old bridge did everything in a single contract. The new design splits responsibilities so that each piece does one job and the impact of any single issue is contained:


| Contract                      | Plain-language role                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| **LZBridgeGateway**           | The engine room. Handles messaging, OHM mint/burn, rate limits, and supply tracking.                   |
| **LZCrossChainBridge**        | The user-facing contract you actually interact with when bridging. It has no minting power of its own. |
| **LZEndpointDelegate**        | Manages the low-level LayerZero connection settings, kept separate from the engine room.               |
| **LZBridgeAndDelegateConfig** | The timelock. Sensitive settings are managed through this contract, on a delay.                        |


### Security guardrails

This is the heart of the upgrade. The new bridge stacks several **independent** protections. An attacker would have to defeat all of them at once, which is what "defense in depth" means in practice.

#### 1. Four independent verifiers on every route

Every cross-chain message must now be independently confirmed by **four** separate DVNs before it can be delivered:

- **LayerZero Labs**
- **Canary**
- **Nethermind**
- **Google Cloud** (replaced by **Horizen** on routes that touch Berachain, where Google Cloud is unavailable)

All four must agree. Compromising one is not enough to push a fraudulent message through. The "optional verifier" slot is also explicitly **locked off**, so a future change to LayerZero's defaults cannot silently add or swap a verifier on Olympus messages.

#### 2. Rate limits on every lane

The bridge caps how much OHM can move on each route, in each direction, within a rolling 24-hour window. If the limit for a lane is reached, further transfers on that lane simply wait until capacity frees up.

Even in a worst-case scenario, the amount that could move before anyone noticed is **bounded**, and the delay gives the community and Olympus contributors time to react and pause the bridge if something looks wrong.


| Route                            | Per-route limit (rolling 24h) |
| -------------------------------- | ----------------------------- |
| Ethereum → any L2 (outbound)     | 100,000 OHM                   |
| Ethereum ← any L2 (inbound)      | 55,000 OHM                    |
| L2 → Ethereum                    | 50,000 OHM                    |
| L2 → another L2                  | 100,000 OHM                   |
| Any L2 (inbound, from any chain) | 110,000 OHM                   |


The limits are "offsetting": OHM moving one way frees up capacity for OHM moving the other way, so normal round-trip activity isn't unnecessarily constrained.

#### 3. A hard cap on OHM returning to Ethereum

Ethereum is the **canonical home** of OHM, the only chain where net-new OHM can ever be created. The bridge keeps a precise count of how much OHM has been sent *out* to other chains, and it will **never mint back more OHM on Ethereum than legitimately left it.**

This is the strongest backstop in the design. Even in the extreme hypothetical where someone could create fake OHM on an L2, they could not bring more OHM back to Ethereum than had genuinely been bridged out. That ceiling moves up only as real bridging activity happens.

#### 4. A timelock on sensitive changes

The bridge's most sensitive settings (rate limits, messaging configuration, and supply accounting) are gated behind the role granted to the timelock contract. Any such change must be **queued through a timelock** and wait out a delay (configurable between 1 and 30 days, set to **1 day** at launch) before it can take effect, with a limited execution window after that.

This does two things: it makes every sensitive change **publicly visible in advance**, and it gives an **emergency role the ability to cancel** a queued change before it executes if it looks malicious or mistaken.

#### 5. Hardened message handling

Several lower-level protections were added or fixed:

- **Pinned configuration.** The bridge uses an explicit, fixed messaging setup instead of inheriting LayerZero's mutable defaults — closing off "drag-along" risks where a default change could weaken security.
- **Safer delivery.** The old custom message-retry path (which didn't fully re-check a message's origin) was removed in favor of LayerZero V2's native delivery, which always re-validates the sender.
- **Receive-gating.** Pausing the bridge now stops **both** outbound and inbound transfers. Previously, a paused bridge could still receive.
- **Guaranteed gas.** Messages now enforce a minimum amount of destination-chain gas, so a transfer can't get stuck part-way through for lack of gas.

#### 6. Clear roles and emergency controls

Permissions are split into narrow, purpose-specific roles so no single actor holds broad power over the bridge:


| Role                            | What it can do                                                       |
| ------------------------------- | -------------------------------------------------------------------- |
| **Configurator** (the timelock) | Manages sensitive configuration changes on a delay.                  |
| **Admin**                       | Major operational actions (e.g. setting up routes).                  |
| **Rate limiter**                | A narrow role scoped only to adjusting rate limits.                  |
| **Facilitator**                 | The user-facing contract's permission to request a bridge transfer.  |
| **Emergency**                   | Can pause the bridge immediately and cancel queued timelock changes. |


The design also includes a fast **re-enable grace period** (so a precautionary pause can be quickly reversed without a full governance cycle if it was a false alarm, up to 3 days from the shutdown event) and an **asset-rescue** function to recover tokens accidentally sent to the bridge contracts.

### Mechanism

The two snippets below illustrate the core burn/mint accounting. When sending OHM from a source chain (e.g. mainnet) to a supported EVM chain, the bridge burns OHM on the source chain and sends a message payload over the LayerZero Endpoint:

```solidity
function sendOhm(uint16 dstChainId_, address to_, uint256 amount_) external payable {
  if (!bridgeActive) revert Bridge_Deactivated();
  if (ohm.balanceOf(msg.sender) < amount_) revert Bridge_InsufficientAmount();

  bytes memory payload = abi.encode(to_, amount_);

  MINTR.burnOhm(msg.sender, amount_);
  _sendMessage(dstChainId_, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);

  emit BridgeTransferred(msg.sender, amount_, dstChainId_);
}
```

On receipt, the destination bridge mints an equal amount of native OHM:

```solidity
function _receiveMessage(
    uint16 srcChainId_,
    bytes memory,
    uint64,
    bytes memory payload_
) internal {
  (address to, uint256 amount) = abi.decode(payload_, (address, uint256));

  MINTR.increaseMintApproval(address(this), amount);
  MINTR.mintOhm(to, amount);

  emit BridgeReceived(to, amount, srcChainId_);
}
```

### Before and after


| Before                              | After                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------- |
| LayerZero V1, default configuration | LayerZero V2, explicitly pinned configuration                          |
| Single contract                     | Four specialized contracts                                             |
| Default verifier set                | 4 required, independent verifiers per route (optional slot locked off) |
| No rate limits                      | Per-route, bidirectional 24-hour rate limits                           |
| No cap on OHM returning to Ethereum | Hard cap tied to OHM actually bridged out                              |
| Instant configuration changes       | Timelock-gated, cancellable changes                                    |
| Custom retry path                   | Native, sender-validated delivery                                      |


## Chainlink CCIP lane (Solana)

Bridging to and from Solana uses Chainlink CCIP instead of LayerZero. The two lanes are independent, and CCIP is unaffected by the LayerZero upgrade.

### CCIPCrossChainBridge

`CCIPCrossChainBridge` is the user-facing convenience contract that makes it easy to bridge from an EVM chain to another chain (including Solana). It provides:

- **Native-token fee calculation** — the bridging fee is computed in the chain's native token.
- **CCIP message construction** — it assembles the cross-chain message sent over Chainlink CCIP.
- **Failure handling and retry** — when receiving on an EVM chain, it handles delivery failures and lets a message be retried later.

### Token pools

Token accounting on this lane is handled by CCIP **token pools**, each owned and controlled by the protocol. The type of pool depends on whether the chain is canonical:

- **Canonical chain (Ethereum)** uses a `LockReleaseTokenPool` (`CCIPLockReleaseTokenPool`). It **custodies** the OHM that has been bridged out of Ethereum and releases it when OHM is bridged back. Because OHM can only be released up to what the pool holds, this pool **caps how much OHM can be bridged back** to Ethereum.
- **Non-canonical chains** use a burn/mint token pool: it **mints** native OHM when tokens enter the chain and **burns** OHM when tokens exit.

### Rate limiters

The CCIP token pools carry per-route, capacity-based **rate limiters**, providing the same kind of bound on throughput that the LayerZero lane enforces with its 24-hour limits.

### Ownership

After deployment and configuration, ownership of both the token pools and the `CCIPCrossChainBridge` is transferred to the **DAO multisig**, so sensitive control of the CCIP lane sits with the DAO.

### Emergency controls

Several independent shutdown options are available on the CCIP lane:

- **Disable the bridge.** The `CCIPCrossChainBridge` contract can be disabled. Messages received while it is disabled are marked as failed and can be retried later.
- **Rate-limit a pool to near-zero.** A token pool can be effectively shut down by enabling its rate limiter and setting the capacity very low (e.g. ~2 wei), for a single remote chain or for all chains.
- **Withdraw locked liquidity.** In a scenario such as an infinite-mint bug on another chain, withdrawing all OHM custodied in the canonical `LockReleaseTokenPool` prevents OHM from being bridged back to Ethereum at all.

### Why supply stays bounded

Minting OHM back to Ethereum on this lane is capped by the amount of canonical OHM locked in the `LockReleaseTokenPool`. Even if an attacker were able to mint OHM on a non-canonical chain, the amount that could be brought back to Ethereum is limited by what the lock/release pool actually holds.

## Security and audits

- The upgraded LayerZero (EVM) bridge was independently audited by **Guardian (June 2026)**. The report is available in the [Audits](../../security/02_audits.md#layerzero-bridge) section, or directly [here](https://storage.googleapis.com/olympusdao-landing-page-reports/audits/2026-06-Bridge.pdf).
- The CCIP contracts were audited by **Electisec**.

No design removes risk entirely. Both lanes still depend on their messaging layer — LayerZero on the EVM lane, Chainlink CCIP on the Solana lane — and a severe failure or compromise of that layer could affect bridge operation. The point of the layered guardrails above is to ensure that even in adverse conditions the **impact is bounded and contained** rather than catastrophic, and that the community has time and tools to respond.

---

For the overview, how-to-bridge steps, and the lane summary, see the [Cross-Chain Bridge](./index.md) page. Bridge contract addresses are listed in the [contract addresses table](../../contracts/01_addresses.md).