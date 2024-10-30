---
sidebar_position: 1
sidebar_label: Intro
---
# Governance at Olympus

:::info
Olympus Governance is transitioning from multisig management to on-chain governanc, per [OIP-152](https://forum.olympusdao.finance/d/4088-oip-152-on-chain-governance). [OIP-166](https://forum.olympusdao.finance/d/4625-oip-166-activate-governor-timelock/2) was the first deployment of these changes. 
:::

The Olympus protocol is governed and upgraded by tokenholders using three components:

1. gOHM token (Governance OHM)
2. Governor Bravo
3. Multisig

Together, these components enable the community to propose, vote on, and implement changes to the Olympus V3 system. Proposals can modify system parameters, activate or deactivate policies, and install or upgrade modules, effectively allowing the addition of new features and the mutation of the protocol.

## gOHM
gOHM, or Governance OHM, is an ERC-20 token used for proposing upgrades to Olympus protocol. gOHM can be obtained by wrapping OHM, and vice versa. The only use cases of gOHM today is for voting and as Cooler Loans collateral.

### Delegation
gOHM allows the owner to delegate voting rights to any address, including their own. There's a few considerations to keep in mind when delegating:

* Users can delegate to only one address at a time
* The entire gOHM balance of the delegator is added to the delegatee’s vote count
* Changes to the delegator's token balance automatically adjust the voting rights of the delegatee
* Votes are delegated from the current block and onward, until the delegator delegates again or transfers all their gOHM
* gOHM sitting in Cooler Loans qualifies for delegation

Delegation can be achieved by calling the `delegate()` function or via a valid off-chain signature using `delegateBySig()`. Olympus provides a frontend for managing delegations [here](https://app.olympusdao.finance/#/governance).
 
:::info
You must delegate your gOHM in Cooler Loans to be eligible to vote in both Snapshot and Governor Bravo. Visit [Olympus Govern](https://app.olympusdao.finance/#/governance) page for more information.
:::


### Voting eligibility
The following table outlines what gOHM supply is eligible to vote in both Snapshot and Governor Bravo:

| gOHM type | Snapshot eligibility | Governor Bravo eligibility |
|-|-|-|
| [gOHM](https://etherscan.io/token/0x0ab87046fBb341D058F17CBC4c1133F25a20a52f) | ✅ | ❗ (requires delegation) |
| gOHM in Cooler Loans | ❗ (requires delegation) | ❗ (requires delegation) |
| [tokemak gOHM](https://etherscan.io/token/0x41f6a95Bacf9bC43704c4A4902BA5473A8B00263)  | ✅ | ❌ |
| [Arbitrum gOHM](https://arbiscan.io/token/0x8D9bA570D6cb60C7e3e0F31343Efe75AB8E65FB1) | ✅ | ❌ |
| [AVAX gOHM](https://snowtrace.io/token/0x321E7092a180BB43555132ec53AaA65a5bF84251?chainId=43114) | ✅ | ❌ |
| [Polygon gOHM](https://polygonscan.com/token/0xd8cA34fd379d9ca3C6Ee3b3905678320F5b45195) | ✅ | ❌ |
| [Fantom gOHM](https://ftmscan.com/token/0x91fa20244fb509e8289ca630e5db3e9166233fdc) | ✅ | ❌ |
| [Optimism gOHM](https://optimistic.etherscan.io/token/0x0b5740c6b4a97f90eF2F0220651Cca420B868FfB) | ✅ | ❌ |





## Governor Bravo
Olympus implements a modified version of Compound’s Governor Bravo with the following key changes:

1. **Percent-based submission threshold** - The minimum amount of votes required by the proposer to submit the proposal. Set to 0.017% of the total gOHM supply, at time of proposal submission. Checked again during proposal queueing and execution.
2. **Percent-based quorum threshold** - The minimum amount of FOR votes required for a proposal to qualify to pass. Set to 20% of the gOHM supply at time of proposal activation.
3. **Net votes approval threshold** - OCG introduces the concept of net votes, which is the margin of votes between FOR and NO in order for a proposal to qualify to pass. Specifically, the percentage of **voting supply** voting FOR must be 60%, or greater.

The decision to introduce these changes stem from elasticity in the gOHM supply. Percent-based thresholds ensure that requirements (in absolute gOHM terms) for proposing and executing proposals scale/shrink with the token supply.

Today, Governor Bravo's Timelock is responsible for the following roles: 

| Role | Responsibility | Systems affected |
|-------- | -------- | -------------- |
| `admin` | Single address permission: Assign roles to any policy | Kernal |

Per [OIP-152](https://forum.olympusdao.finance/d/4088-oip-152-on-chain-governance), additional roles will be transfered from multisig management to Governor Bravo's Timelock. [OIP-166](https://forum.olympusdao.finance/d/4625-oip-166-activate-governor-timelock/2) was the first deployment of these changes.

### Parameters
| Variable | Description | Value |
|-|-|-|
| proposalThreshold | % of total supply required in order for a voter to become a proposer |  0.017% of supply |
| quorumPct | minimum % of total supply voting FOR in order for a proposal to qualify to pass | 20% |
| highRiskQuorum | Same as quorumPct but specific to a high risk module in the Default system | 20% |
| approvalThresholdPct | minimum % of voting supply voting FOR in order for a proposal to qualify to pass | 60% |
| proposalMaxOperations | The maximum number of actions that can be included in a proposal | 15 actions |
| votingDelay | The delay before voting on a proposal may take place, once proposed, in blocks | 3 days |
| votingPeriod | The duration of voting on a proposal, in blocks | 7 days |
| activationGracePeriod |The amount of time once a proposal is eligible for activation that it can be activated before considered expired | 1 day |
| GRACE_PERIOD | How long after a proposal is eligible for execution it can still be executed before it is considered expired | 1 day |
| delay (execution delay) | The time a proposal must be queued for before it can be executed | 1 day |
| vetoGuardian | Address which has veto power over all proposals | Emergency MS |
| MIN_GOHM_SUPPLY   | The minimum level of gOHM supply acceptable for OCG operations | 1000 gOHM |


## Shared Roles
Multisigs may perform protocol upgrades for roles that are not yet fully under Governor Bravo's Timelock control. The multisigs may queue and execute on-chain actions that are approved by the community through [Snapshot](https://docs.snapshot.org/), an off-chain governance client. Today, the following roles are under shared Timelock and multisig control:

| Role | Responsibility | Systems affected | Multisig |
|-------- | -------- | -------------- | -------------- |
| `price_admin` | Calculates price metrics to use for RBS | RBS | DAO MS + Timelock |
| `operator_admin` | Initialize RBS operator | RBS | DAO MS + Timelock |
| `operator_policy` | Manages RBS ranges | RBS | DAO MS + Timelock |
| `callback_admin` | Callback to interface with Bond system | RBS | DAO MS + Timelock |
| `heart_admin` | Manages heartbeats | RBS and Staking | DAO MS + Timelock |
| `custodian` | Treasury custodian that can approve, remove assets from TRSY | TRSRY | DAO MS + Timelock |
| `bridge_admin` | Creates/manages bridges | Cross Chain | DAO MS + Timelock |
| `loop_daddy` | Administrative role for YRF | YRF | DAO MS + Timelock |
| `cooler_overseer` | Activats, reactivate, and defund Clearinghouse | Coolers | DAO MS + Timelock |
| `emergency_restart` | Restart MINTR, TRSRY | All systems | DAO MS + Timelock |
| `emergency_admin` | Emergency shutdown for BLV | All systems | Emergency MS + Timelock |
| `emergency_shutdown` | Shutdown MINTR, TRSRY | All systems | Emergency MS + Timelock |


## Multisig
Multisigs perform protocol upgrades for roles that are not yet under Governor Bravo's Timelock control. The multisigs queue and execute on-chain actions that are approved by the community through [Snapshot](https://docs.snapshot.org/), an off-chain governance client. Today, the following roles are under multisig control:


| Role | Responsibility | Systems affected | Multisig |
|-------- | -------- | -------------- | -------------- |
| `executor` | Single address permission: Ability to install modules and policies on Kernel | Kernel | DAO MS |
| `operator_operate` | Triggers heartbeat RBS updates | RBS | DAO MS |
| `operator_reporter` | Records a bond purchase and updates capacity accordingly. Limited to the `BondCallback` contract. | RBS | DAO MS
| `bondmanager_admin` | Create and manage new bond markets | OHM and other non-RBS managed bonds | DAO MS |


Per [OIP-152](https://forum.olympusdao.finance/d/4088-oip-152-on-chain-governance), additional roles will be transfered from multisig management to Governor Bravo's Timelock. [OIP-166](https://forum.olympusdao.finance/d/4625-oip-166-activate-governor-timelock/2) was the first deployment of these changes.
