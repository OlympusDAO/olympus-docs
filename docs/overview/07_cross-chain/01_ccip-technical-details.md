---
title: "Cross-Chain Bridge: Technical Details"
description: "The architecture of the Olympus CCIP bridge: token pools, supply model, chain selectors, rate limits, access control, the configuration timelock, emergency controls, the rollout and message recovery."
sidebar_label: "Technical Details"
---

# Cross-Chain Bridge: Technical Details

This page describes the Olympus bridge on Chainlink CCIP. For a summary and the steps to bridge, refer to the [Cross-Chain Bridge](./index.md) overview.

In this page, "the other EVM chains" means Arbitrum, Optimism, Base, Berachain and Robinhood Chain.

## Supply model

Ethereum is the canonical chain. Only Ethereum can mint net-new protocol OHM.

| Chain                | Token pool                       | Outbound transfer         | Inbound transfer           |
| -------------------- | -------------------------------- | ------------------------- | -------------------------- |
| Ethereum             | Chainlink `LockReleaseTokenPool` | Locks OHM in the pool     | Releases OHM from the pool |
| The other EVM chains | Olympus `CCIPBurnMintTokenPool`  | Burns OHM through `MINTR` | Mints OHM through `MINTR`  |
| Solana               | CCIP burn/mint token pool        | Burns OHM                 | Mints OHM                  |

The Ethereum pool backs all of the OHM on the other chains. Before the OCG proposal, the DAO Multisig transferred OHM to the pool. A deposit does not need a role. The deposit backs the supply on Arbitrum, Optimism, Base and Berachain, approximately 130,721 OHM. The LayerZero bridge minted that supply against burns on Ethereum. The OCG proposal that opens the lanes checks the pool balance first. If the balance is less than the required backing, the proposal does not execute.

The OHM token on Robinhood Chain starts with a supply of zero. OHM arrives there only through CCIP: from Ethereum against OHM that is locked in the pool, or from Arbitrum or Base against OHM that is burned there. Thus, Robinhood Chain is not part of the deposit.

The burn/mint pools can mint only when OHM arrives through CCIP. Thus, OHM that moves between two burn/mint chains does not touch the Ethereum pool. The total OHM outside Ethereum stays backed by the Ethereum pool.

## Contracts

| Contract                             | Chains                         | Purpose                                                                                                                                                      |
| ------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `LockReleaseTokenPool`               | Ethereum                       | The Chainlink token pool that locks and releases OHM. Chainlink wrote and audited this contract. The addresses table lists it as `CCIPLockReleaseTokenPool`. |
| `CCIPBurnMintTokenPool`              | The other EVM chains           | An Olympus policy that burns and mints OHM through the `MINTR` module.                                                                                       |
| `CCIPTokenPoolConfig`                | Ethereum, the other EVM chains | An Olympus policy that owns the local token pool. It gives each role access to a limited set of pool functions. It does not forward arbitrary calls.         |
| `CCIPTokenPoolConfigTimelock`        | Ethereum, the other EVM chains | An Olympus policy that queues route and rate-limit changes and executes them after a delay.                                                                  |
| `CCIPCrossChainBridge`               | Ethereum, the other EVM chains | The bridge contract that the Olympus app uses. It is optional: any address can send OHM through the CCIP router directly.                                    |
| `CCIPTokenPoolConfigProposalChecker` | Ethereum                       | A read-only contract. The OCG proposal calls it first, to make sure that the live state is correct before the handover.                                      |
| `TokenAdminRegistry`                 | Each chain                     | The Chainlink registry that selects the token pool for OHM. On Ethereum, the OCG timelock is the OHM administrator.                                          |

The addresses of these contracts on each chain are in the [contract addresses table](../../contracts/01_addresses.md).

## Chain selectors

CCIP identifies each chain with a chain selector. The send and fee functions of `CCIPCrossChainBridge` use the selector of the destination chain.

| Chain           | CCIP chain selector    |
| --------------- | ---------------------- |
| Ethereum        | `5009297550715157269`  |
| Arbitrum        | `4949039107694359620`  |
| Optimism        | `3734403246176062136`  |
| Base            | `15971525489660198786` |
| Berachain       | `1294465214383781161`  |
| Robinhood Chain | `6180753054346818345`  |
| Solana          | `124615329519749607`   |

## Message flow

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant B as CCIPCrossChainBridge
    participant R as CCIP Router (source)
    participant SP as Source token pool
    participant D as Chainlink DON and RMN
    participant DP as Destination token pool
    participant DB as CCIPCrossChainBridge (destination)

    U->>B: sendToEVM / sendToSVM (OHM + CCIP fee)
    B->>R: ccipSend
    R->>SP: lockOrBurn (outbound rate limit)
    R-->>D: CCIP message
    D->>DP: releaseOrMint (inbound rate limit)
    DP->>DB: OHM
    DB->>U: OHM to the recipient
```

The diagram shows a transfer between two EVM chains through `CCIPCrossChainBridge`. In these cases, `CCIPCrossChainBridge` is not used on the destination chain, and the destination pool sends the OHM to the recipient directly:

- A transfer to Solana.
- A transfer from Solana. The user sends the transfer from Solana through CCIP.
- A transfer that a user sends through the CCIP router directly.

## Rate limits

Each route has two token buckets on each side: one for outbound transfers and one for inbound transfers. Each bucket has two parameters:

- The **capacity** is the maximum quantity of OHM in the bucket. A transfer removes its amount from the bucket.
- The **refill rate** is the quantity of OHM that the bucket gets back each second, up to the capacity.

If a transfer is larger than the OHM in the bucket, the transfer reverts on the source chain, or it fails on the destination chain.

The capacity is not a daily cap. The refill rate of each bucket on the EVM chains is its capacity divided by 86,400, the number of seconds in 24 hours. Thus, an empty bucket refills completely in 24 hours. A bucket that is full at the start of a 24-hour period can pass approximately two times its capacity in that period. The first part is the full capacity at the start. The second part is the refill. In a period of _T_ seconds, a bucket passes not more than its capacity plus _T_ times its refill rate.

The inbound bucket on the destination is larger than the outbound bucket on the source, and it refills faster. Thus, the source limit usually applies first, and transfers do not fail on arrival.

| Route                          | Bucket                      | Capacity               | Refill rate       | Maximum in 24 hours, from a full bucket |
| ------------------------------ | --------------------------- | ---------------------- | ----------------- | --------------------------------------- |
| Ethereum &rarr; each EVM chain | Outbound, on Ethereum       | 100,000 OHM            | 1.157407407 OHM/s | Approximately 200,000 OHM               |
|                                | Inbound, on the EVM chain   | 110,000 OHM            | 1.273148148 OHM/s | Approximately 220,000 OHM               |
| Each EVM chain &rarr; Ethereum | Outbound, on the EVM chain  | 50,000 OHM             | 0.578703703 OHM/s | Approximately 100,000 OHM               |
|                                | Inbound, on Ethereum        | 55,000 OHM             | 0.636574074 OHM/s | Approximately 110,000 OHM               |
| EVM chain &rarr; EVM chain     | Outbound, on the source     | 100,000 OHM            | 1.157407407 OHM/s | Approximately 200,000 OHM               |
|                                | Inbound, on the destination | 110,000 OHM            | 1.273148148 OHM/s | Approximately 220,000 OHM               |
| Ethereum &rarr; Solana         | Outbound, on Ethereum       | 10,000 OHM             | 0.115740740 OHM/s | Approximately 20,000 OHM                |
|                                | Inbound, on Solana          | Set on the Solana pool | -                 | -                                       |
| Solana &rarr; Ethereum         | Outbound, on Solana         | Set on the Solana pool | -                 | -                                       |
|                                | Inbound, on Ethereum        | 11,000 OHM             | 0.127314814 OHM/s | Approximately 22,000 OHM                |

"EVM chain" in this table means Arbitrum, Optimism, Base, Berachain or Robinhood Chain. The EVM chain &rarr; EVM chain limits apply only to the lanes that Chainlink supports. Refer to [Bridge lanes](./index.md#bridge-lanes). These values are the values at launch. The DAO Multisig can change them through the configuration timelock. The `admin` role can change them directly.

On-chain, OHM has 9 decimals. For example, a capacity of 100,000 OHM is `100000000000000`, and a refill rate of 1.157407407 OHM/s is `1157407407`. To read the live state of a bucket, call `getCurrentOutboundRateLimiterState` or `getCurrentInboundRateLimiterState` on the token pool, with the chain selector of the remote chain.

## Access control

### Holders

The table shows the holder of each authority after the rollout. The addresses of the multisigs are in the [Multisigs](../../contracts/01_addresses.md#multisigs) table. The address of the OCG timelock is the `Timelock` row of the [Dependencies](../../contracts/01_addresses.md#dependencies) table.

| Authority                                 | Ethereum                         | Arbitrum, Optimism, Base, Berachain, Robinhood Chain |
| ----------------------------------------- | -------------------------------- | ---------------------------------------------------- |
| Kernel executor                           | DAO Multisig                     | Local DAO Multisig                                   |
| `RolesAdmin.admin`                        | OCG timelock                     | Local DAO Multisig                                   |
| `admin` role                              | OCG timelock                     | Local DAO Multisig                                   |
| `bridge_admin` role                       | DAO Multisig, OCG timelock       | Local DAO Multisig                                   |
| `emergency` role                          | Emergency Multisig, OCG timelock | Emergency Multisig                                   |
| `bridge_rate_limiter` role                | Not assigned                     | Not assigned                                         |
| OHM administrator in `TokenAdminRegistry` | OCG timelock                     | Local DAO Multisig                                   |
| Token pool owner                          | `CCIPTokenPoolConfig`            | Local `CCIPTokenPoolConfig`                          |
| Config operator                           | `CCIPTokenPoolConfigTimelock`    | Local `CCIPTokenPoolConfigTimelock`                  |
| Token pool `rateLimitAdmin`               | Zero address                     | Zero address                                         |
| Lock/release pool rebalancer              | OCG timelock                     | Not applicable                                       |
| `CCIPCrossChainBridge` owner              | DAO Multisig                     | Local DAO Multisig                                   |

There is no OCG timelock on the other EVM chains. On these chains, the local DAO Multisig holds `RolesAdmin.admin`, `admin`, `bridge_admin` and the OHM administrator role. It is also the Kernel executor and the `CCIPCrossChainBridge` owner. Only the Emergency Multisig holds `emergency` on these chains.

On Ethereum, the OCG timelock also holds `bridge_admin` and `emergency` from earlier proposals. The DAO Multisig already holds `bridge_admin`. The CCIP proposal does not grant or remove a role.

The `bridge_rate_limiter` role is reserved for a future monitoring operator. No address holds it at launch.

The token pool has no direct role holders. `CCIPTokenPoolConfig` owns the pool, and the native `rateLimitAdmin` of the pool is the zero address. Thus, each change to a route or to a rate limit goes through `CCIPTokenPoolConfig`, where the roles apply.

The roles of each contract are also in [Security Roles](../../security/01_roles.md#ccip-bridge).

### Action matrix

The matrix shows which role can do each action on `CCIPTokenPoolConfig`, `CCIPTokenPoolConfigTimelock` and `CCIPBurnMintTokenPool`, and if the action goes through the configuration timelock:

- **Direct**: the holder of the role calls the function. The change applies immediately.
- **Timelock**: the holder of the role queues the change on `CCIPTokenPoolConfigTimelock`. Any address can execute the change after the delay (1 day at launch). Refer to [Configuration timelock](#configuration-timelock).
- **No**: the role cannot do the action.

On Ethereum, the OCG timelock holds `admin`. Thus, each `admin` action on Ethereum needs an OCG proposal, and the vote and the delay of the OCG timelock apply. On the other EVM chains, the local DAO Multisig holds `admin`, and an `admin` action has no delay.

| Action                                                                               | Function                                              | `admin` | `bridge_admin`   | `emergency` | `bridge_rate_limiter` |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------- | ------- | ---------------- | ----------- | --------------------- |
| Add or remove a route                                                                | `addChain`, `removeChain`                             | Direct  | Timelock         | No          | No                    |
| Change the remote token or the remote pools of a route                               | `setRemoteToken`, `addRemotePool`, `removeRemotePool` | Direct  | Timelock         | No          | No                    |
| Update the allowlist of the pool                                                     | `applyAllowListUpdates`                               | Direct  | Timelock         | No          | No                    |
| Change the rate limits of a route                                                    | `setChainRateLimits`                                  | Direct  | Timelock         | No          | Direct                |
| Contain one route or all routes                                                      | `disableChain`, `disableAllChains`                    | Direct  | Direct           | Direct      | Direct                |
| Cancel a queued change                                                               | `cancelQueuedAction`                                  | Direct  | Own changes only | Direct      | No                    |
| Disable `CCIPTokenPoolConfig` or `CCIPTokenPoolConfigTimelock`                       | `disable`                                             | Direct  | No               | Direct      | No                    |
| Re-enable `CCIPTokenPoolConfig` or `CCIPTokenPoolConfigTimelock` in the grace period | `reEnable`                                            | No      | Direct           | No          | No                    |
| Enable `CCIPTokenPoolConfig` or `CCIPTokenPoolConfigTimelock`                        | `enable`                                              | Direct  | No               | No          | No                    |
| Change the timelock delay or the grace period                                        | `setTimelockDelay`, `setGracePeriod`                  | Direct  | No               | No          | No                    |
| Transfer the ownership of the token pool                                             | `transferPoolOwnership`, `acceptPoolOwnership`        | Direct  | No               | No          | No                    |
| Change the config operator, the router or the `rateLimitAdmin` of the pool           | `setConfigOperator`, `setRouter`, `setRateLimitAdmin` | Direct  | No               | No          | No                    |
| Change the rebalancer, or move OHM from an older pool into the pool (Ethereum only)  | `setRebalancer`, `transferLiquidity`                  | Direct  | No               | No          | No                    |
| Enable `CCIPBurnMintTokenPool`                                                       | `enable`                                              | Direct  | No               | No          | No                    |
| Disable `CCIPBurnMintTokenPool`                                                      | `disable`                                             | Direct  | No               | Direct      | No                    |

- The `admin` role cannot queue a change, because it can make each change directly. On Ethereum, the OCG timelock can also queue a change, because it also holds `bridge_admin`.
- The containment functions and `cancelQueuedAction` also operate when the policy is disabled.
- The token pools have no allowlist. Thus, an allowlist update reverts with `AllowListNotEnabled`.
- To queue one change, the `bridge_admin` role calls `queueAddChain`, `queueRemoveChain`, `queueSetRemoteToken`, `queueAddRemotePool`, `queueRemoveRemotePool`, `queueApplyAllowListUpdates` or `queueSetChainRateLimits`. To queue more than one change as one action, it calls `queueBatch`.
- Any address can call `executeQueuedAction` to execute a queued change after the delay. Any address can also cancel a queued change that expired.

These actions use an owner or a registry authority, not a role:

| Action                                                | Function                                                                                                      | Authority                    | Ethereum               | Other EVM chains             |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------- | ---------------------------- |
| Activate or deactivate a policy                       | `Kernel.executeAction`                                                                                        | Kernel executor              | DAO Multisig, no delay | Local DAO Multisig, no delay |
| Grant or revoke a role                                | `RolesAdmin.grantRole`, `RolesAdmin.revokeRole`                                                               | `RolesAdmin.admin`           | OCG proposal           | Local DAO Multisig, no delay |
| Select or remove the OHM token pool                   | `TokenAdminRegistry.setPool`                                                                                  | OHM administrator            | OCG proposal           | Local DAO Multisig, no delay |
| Transfer the OHM administrator role                   | `TokenAdminRegistry.transferAdminRole`                                                                        | OHM administrator            | OCG proposal           | Local DAO Multisig, no delay |
| Withdraw OHM from the Ethereum pool                   | `withdrawLiquidity`                                                                                           | Rebalancer                   | OCG proposal           | Not applicable               |
| Set the trusted remotes and the gas limits            | `setTrustedRemoteEVM`, `unsetTrustedRemoteEVM`, `setTrustedRemoteSVM`, `unsetTrustedRemoteSVM`, `setGasLimit` | `CCIPCrossChainBridge` owner | DAO Multisig, no delay | Local DAO Multisig, no delay |
| Enable or disable `CCIPCrossChainBridge`              | `enable`, `disable`                                                                                           | `CCIPCrossChainBridge` owner | DAO Multisig, no delay | Local DAO Multisig, no delay |
| Withdraw the native token from `CCIPCrossChainBridge` | `withdraw`                                                                                                    | `CCIPCrossChainBridge` owner | DAO Multisig, no delay | Local DAO Multisig, no delay |
| Transfer the ownership of `CCIPCrossChainBridge`      | `transferOwnership`                                                                                           | `CCIPCrossChainBridge` owner | DAO Multisig, no delay | Local DAO Multisig, no delay |

- A deposit into the Ethereum pool does not need a role. A direct OHM transfer to the pool has the same effect as `provideLiquidity`, which only the rebalancer can call.
- Only the on-ramps and the off-ramps of the CCIP router can call `lockOrBurn` and `releaseOrMint` on the token pools.
- Any address can call `sendToEVM`, `sendToSVM` and `retryFailedMessage` on `CCIPCrossChainBridge`.

### Ethereum

The diagram shows the authority over the bridge on Ethereum after the rollout. A solid arrow is a direct call. A dashed arrow is a call through the configuration timelock, with the delay.

```mermaid
flowchart TB
    subgraph Holders
        OCG["OCG timelock<br/>(Governor Bravo)"]
        DAO["DAO Multisig"]
        EMG["Emergency Multisig"]
        ANY["Any address"]
    end

    subgraph Olympus["Olympus contracts"]
        K["Kernel"]
        CFG["CCIPTokenPoolConfig"]
        TL["CCIPTokenPoolConfigTimelock"]
        BR["CCIPCrossChainBridge"]
    end

    subgraph Chainlink["Chainlink contracts"]
        POOL["LockReleaseTokenPool"]
        REG["TokenAdminRegistry"]
    end

    OCG -- "admin: root settings,<br/>direct route changes, enable" --> CFG
    OCG -- "admin: delay, enable" --> TL
    OCG -- "OHM administrator: setPool" --> REG
    OCG -- "rebalancer: withdrawLiquidity" --> POOL
    DAO -- "executor: activate policies" --> K
    DAO -. "bridge_admin: queue changes" .-> TL
    DAO -- "bridge_admin: contain routes,<br/>reEnable in grace period" --> CFG
    DAO -- "owner: trusted remotes,<br/>gas limits, enable" --> BR
    EMG -- "emergency: contain routes, disable" --> CFG
    EMG -- "emergency: cancel, disable" --> TL
    ANY -. "execute after the delay" .-> TL
    TL -- "config operator" --> CFG
    CFG -- "owner" --> POOL
    REG -- "selects the pool for OHM" --> POOL
```

### The other EVM chains

On Arbitrum, Optimism, Base, Berachain and Robinhood Chain, the local DAO Multisig replaces the OCG timelock. It holds `admin` and `bridge_admin`, it is the Kernel executor, and it is the OHM administrator in the local `TokenAdminRegistry`. The `admin` role applies to all of the policies of the local Kernel.

```mermaid
flowchart TB
    DAO["Local DAO Multisig"]
    EMG["Emergency Multisig"]
    ANY["Any address"]
    K["Kernel"]
    CFG["CCIPTokenPoolConfig"]
    TL["CCIPTokenPoolConfigTimelock"]
    POOL["CCIPBurnMintTokenPool"]
    BR["CCIPCrossChainBridge"]
    MINTR["MINTR module"]
    REG["TokenAdminRegistry (Chainlink)"]

    DAO -- "executor: activate policies" --> K
    DAO -- "admin: root settings,<br/>direct route changes, enable" --> CFG
    DAO -- "admin: enable the pool" --> POOL
    DAO -. "bridge_admin: queue changes" .-> TL
    DAO -- "OHM administrator: setPool" --> REG
    DAO -- "owner" --> BR
    EMG -- "emergency: contain routes, disable" --> CFG
    EMG -- "emergency: cancel, disable" --> TL
    EMG -- "emergency: disable the pool" --> POOL
    ANY -. "execute after the delay" .-> TL
    TL -- "config operator" --> CFG
    CFG -- "owner" --> POOL
    POOL -- "mintOhm / burnOhm" --> MINTR
    REG -- "selects the pool for OHM" --> POOL
```

Because the local DAO Multisig holds `admin`, it can change a route directly, without the delay. The timelock is still available on these chains, and the Emergency Multisig can cancel a queued change.

## Configuration timelock

The `bridge_admin` role (the DAO Multisig) changes routes and rate limits through `CCIPTokenPoolConfigTimelock`:

1. The DAO Multisig queues a typed change, for example `queueAddChain` or `queueSetChainRateLimits`. The timelock validates the change when it is queued.
2. The change waits for the delay.
3. After the delay, any address can execute the change. The execution window is 3 days. After the window closes, the change expires.

```mermaid
sequenceDiagram
    autonumber
    participant DAO as DAO Multisig (bridge_admin)
    participant TL as CCIPTokenPoolConfigTimelock
    participant EMG as Emergency Multisig
    participant ANY as Any address
    participant CFG as CCIPTokenPoolConfig
    participant P as Token pool

    DAO->>TL: queueSetChainRateLimits(route, limits)
    TL->>CFG: validate the change
    TL-->>TL: record the state of the route, start the delay (1 day)
    alt The Emergency Multisig cancels
        EMG->>TL: cancelQueuedAction(id)
    else The delay ends
        ANY->>TL: executeQueuedAction(id)
        TL->>TL: check that the route did not change
        TL->>CFG: setChainRateLimits (config operator)
        CFG->>P: setChainRateLimiterConfig
    end
```

```mermaid
stateDiagram-v2
    [*] --> Queued: bridge_admin queues
    Queued --> Ready: delay ends (1 day)
    Ready --> Executed: any address executes
    Ready --> Expired: window closes (3 days)
    Queued --> Cancelled: admin, emergency or the proposer
    Ready --> Cancelled: admin, emergency or the proposer
    Expired --> Cancelled: any address
    Executed --> [*]
    Cancelled --> [*]
```

| Parameter                        | Value            |
| -------------------------------- | ---------------- |
| Delay                            | 1 day            |
| Delay bounds                     | 1 day to 30 days |
| Execution window                 | 3 days           |
| Re-enable grace period           | 3 days           |
| Maximum sub-actions in one batch | 15               |

The timelock records the state of each route that a change touches. If the route changes before execution, the queued change reverts. A route can have only one queued change at a time for each part of its configuration. An expired change keeps this reservation until an address cancels it.

The `admin` role, the `emergency` role and the proposer of a change can cancel a queued change. Any address can cancel a change that expired.

The `admin` role can also change a route directly, without the timelock. On Ethereum, `admin` is the OCG timelock, so a direct change needs an OCG proposal. On the other EVM chains, `admin` is the local DAO Multisig, so a direct change has no delay.

## Emergency controls

| Control                     | Effect                                                                                                    | Who can use it                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Contain one route           | Sets the rate limits of the route to almost zero. All transfers on that route fail.                       | Emergency Multisig, DAO Multisig, `admin`      |
| Contain all routes          | Contains every route of the chain.                                                                        | Emergency Multisig, DAO Multisig, `admin`      |
| Freeze the configuration    | Disables `CCIPTokenPoolConfig` and the timelock. No change can be queued or executed. Transfers continue. | Emergency Multisig, `admin`                    |
| Full halt                   | Contains every route and freezes the configuration in one transaction.                                    | Emergency Multisig, `admin`                    |
| Disable the token pool      | Disables `CCIPBurnMintTokenPool` on one of the other EVM chains. The pool cannot burn or mint.            | Emergency Multisig, local `admin`              |
| Disable the bridge contract | Stops `CCIPCrossChainBridge`. Transfers through the router continue.                                      | Owner of `CCIPCrossChainBridge` (DAO Multisig) |
| Withdraw the Ethereum pool  | Removes OHM from the Ethereum pool and limits the OHM that can return to Ethereum.                        | Rebalancer (OCG proposal)                      |

Containment can only decrease capacity. To restore a route after containment, the DAO Multisig queues the approved rate limits on the timelock. A restore through the timelock waits for the delay. The `admin` role can restore the rate limits directly: on Ethereum through an OCG proposal, and on the other EVM chains from the local DAO Multisig.

A contained route does not stop the timelock. A queued change can still execute. In an incident, use the full halt, or cancel the queued changes.

After a policy is disabled, the DAO Multisig can re-enable it within the 3-day grace period. After the grace period, only the `admin` role can enable it. `CCIPBurnMintTokenPool` has no grace period: only the local `admin` role can enable it again.

### Incident response and recovery

```mermaid
flowchart TD
    I["Incident"] --> H["Full halt (Emergency Multisig)<br/>All routes contained, configuration frozen"]
    I --> C["Contain one route<br/>(Emergency Multisig or DAO Multisig)"]
    H --> X["Cancel the queued changes<br/>that must not execute"]
    C --> X
    X --> G{"Configuration frozen?"}
    G -- "No" --> L
    G -- "Yes, in the 3-day grace period" --> RE["DAO Multisig: reEnable"]
    G -- "Yes, after the grace period" --> AE["admin: enable<br/>(OCG proposal on Ethereum)"]
    RE --> L["Queue the approved rate limits<br/>on the timelock"]
    AE --> L
    L --> W["Wait for the delay (1 day)<br/>Any address executes"]
    W --> M["Execute the failed CCIP messages manually<br/>from the CCIP Explorer"]
```

When a route is restored, its buckets do not refill immediately. The OHM in each bucket starts from almost zero and refills at the configured rate.

## Rollout

The rollout moves the Ethereum pool and the OHM registry authority from the DAO Multisig to the authority model above, and it opens the EVM lanes. The steps are in this order, because each authority can only do its own part:

1. Deploy the contracts on each chain. On Ethereum, deploy `CCIPTokenPoolConfig`, the timelock and the proposal checker.
2. On each of the other EVM chains, move the OHM administrator role in the local `TokenAdminRegistry` to the local DAO Multisig.
3. Chainlink sets the OHM gas budget (at least 175,000 gas) for each lane toward a burn/mint chain.
4. The DAO Multisig deposits the backing into the Ethereum pool.
5. The DAO Multisig activates the new policies on Ethereum and nominates the new owners (batch "Phase B").
6. The DAO submits the OCG proposal. During the vote, each of the other EVM chains configures its policies and routes. Its pool stays disabled and unregistered, so the chain cannot send or receive OHM.
7. The OCG proposal executes and opens the Ethereum side of the five routes.
8. Each of the other EVM chains enables its pool and registers it in the local `TokenAdminRegistry` (batch "finalize").
9. The DAO Multisig sets the trusted remotes of each `CCIPCrossChainBridge` and enables it.

If the OCG proposal fails, the pools on the other EVM chains stay disabled and unregistered, and no rollback is necessary. A message that is sent toward a chain between steps 7 and 8 fails on arrival. Any address can execute it manually after step 8.

### Ethereum

```mermaid
sequenceDiagram
    autonumber
    participant DAO as DAO Multisig
    participant OCG as OCG timelock
    participant CH as Proposal checker
    participant K as Kernel
    participant C as CCIPTokenPoolConfig
    participant T as Timelock
    participant P as LockReleaseTokenPool
    participant REG as TokenAdminRegistry

    Note over DAO,REG: Phase B: DAO Multisig batch
    DAO->>K: activate CCIPTokenPoolConfig and the timelock
    DAO->>P: transferOwnership(CCIPTokenPoolConfig)
    DAO->>REG: transferAdminRole(OHM, OCG timelock)

    Note over DAO,REG: Phase C: OCG proposal "CCIP Bridge Activation"
    OCG->>CH: check(expectations)
    OCG->>REG: acceptAdminRole(OHM)
    OCG->>C: enable
    OCG->>C: acceptPoolOwnership
    C->>P: acceptOwnership
    OCG->>C: setConfigOperator(timelock)
    OCG->>C: setRebalancer(OCG timelock)
    OCG->>T: enable
    OCG->>C: addChain (Arbitrum, Base, Berachain, Optimism, Robinhood Chain)
    C->>P: applyChainUpdates
```

The first action of the proposal calls `CCIPTokenPoolConfigProposalChecker`. The checker reads the live state: ownership, registry authority, roles, launch parameters, routes and the pool backing. If one value is not correct, the proposal reverts before the handover starts. The proposal includes only the actions that the live state still needs. Thus, proposal 19 has 12 actions. It does not grant `bridge_admin`, because the DAO Multisig already holds this role. It does not call `setRateLimitAdmin`, because the `rateLimitAdmin` of the pool is already the zero address.

### The other EVM chains

```mermaid
sequenceDiagram
    autonumber
    participant DEP as Deployer
    participant DAO as Local DAO Multisig
    participant K as Kernel
    participant C as CCIPTokenPoolConfig
    participant T as Timelock
    participant P as CCIPBurnMintTokenPool
    participant REG as TokenAdminRegistry

    Note over DEP,REG: Deployment and handover
    DEP->>DEP: deploy the pool, the policies and CCIPCrossChainBridge
    DEP->>REG: transferAdminRole(OHM, DAO Multisig)
    DAO->>REG: acceptAdminRole(OHM)
    Note over DEP,P: The pool owner nominates CCIPTokenPoolConfig as the new owner

    Note over DEP,REG: Batch "setup", during the vote on Ethereum
    DAO->>K: deactivate the LayerZero bridge, activate the CCIP policies
    DAO->>C: enable, acceptPoolOwnership
    C->>P: acceptOwnership
    DAO->>C: setConfigOperator(timelock)
    DAO->>T: enable
    DAO->>C: addChain for each route
    Note over P,REG: The pool is disabled and unregistered

    Note over DEP,REG: The OCG proposal executes on Ethereum

    Note over DEP,REG: Batch "finalize"
    DAO->>P: enable
    DAO->>REG: setPool(OHM, pool)
```

The pool is enabled before `setPool`, so a registered pool can always mint. Robinhood Chain has no LayerZero bridge, so its setup batch skips the deactivation. On Robinhood Chain, Chainlink proposes the local DAO Multisig as the OHM administrator, because the Robinhood OHM token has no owner function for the self-service path.

## Failed messages

A transfer can fail on the destination chain. For example, it fails if the inbound route is contained, or if the recipient on Solana has no OHM token account. There are two types of failure.

**The CCIP message failed.** The CCIP Explorer shows the message with the status `Failure`. Chainlink does not try the message again automatically. When the cause is corrected, any address can execute the message manually from the [CCIP Explorer](https://ccip.chain.link).

**The bridge contract stored the message.** If the token pool delivered the OHM but `CCIPCrossChainBridge` could not complete the transfer, the bridge contract keeps the OHM and emits `MessageFailed`. For example, this occurs if the bridge contract is disabled. When the cause is corrected, any address can call `retryFailedMessage(messageId)` on the destination `CCIPCrossChainBridge`.

## Fees

`CCIPCrossChainBridge` charges the CCIP fee in the native token of the source chain. Use `getFeeEVM` or `getFeeSVM` to get the fee before you send. If you send more native token than the fee, the bridge contract keeps the excess. Only the owner of the bridge contract can withdraw it. Olympus does not charge a bridge fee.

## Security and audits

The audits of the Olympus CCIP contracts are in the [Cross-Chain Bridge](./index.md#audits) overview. Chainlink wrote and audited the CCIP router, the on-ramps and off-ramps, `TokenAdminRegistry` and `LockReleaseTokenPool`.
