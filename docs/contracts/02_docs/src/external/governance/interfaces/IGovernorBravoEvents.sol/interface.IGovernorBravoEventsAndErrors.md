# IGovernorBravoEventsAndErrors

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/governance/interfaces/IGovernorBravoEvents.sol)

## Events

### ProposalCreated

An event emitted when a new proposal is created

```solidity
event ProposalCreated(
        uint256 id,
        address proposer,
        address[] targets,
        uint256[] values,
        string[] signatures,
        bytes[] calldatas,
        uint256 startBlock,
        string description
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | `uint256` |  |
| proposer | `address` |  |
| targets | `address[]` |  |
| values | `uint256[]` |  |
| signatures | `string[]` |  |
| calldatas | `bytes[]` |  |
| startBlock | `uint256` |  |
| description | `string` |  |

### ProposalVotingStarted

Event emitted when a proposal's voting period is activated

```solidity
event ProposalVotingStarted(uint256 id);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | `uint256` |  |

### VoteCast

An event emitted when a vote has been cast on a proposal

```solidity
event VoteCast(
        address indexed voter,
        uint256 proposalId,
        uint8 support,
        uint256 votes,
        string reason
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| voter | `address` | The address which casted a vote |
| proposalId | `uint256` | The proposal id which was voted on |
| support | `uint8` | Support value for the vote. 0=against, 1=for, 2=abstain |
| votes | `uint256` | Number of votes which were cast by the voter |
| reason | `string` | The reason given for the vote by the voter |

### ProposalVetoed

An event emitted when a proposal has been vetoed

```solidity
event ProposalVetoed(uint256 id);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | `uint256` |  |

### ProposalCanceled

An event emitted when a proposal has been canceled

```solidity
event ProposalCanceled(uint256 id);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | `uint256` |  |

### ProposalQueued

An event emitted when a proposal has been queued in the Timelock

```solidity
event ProposalQueued(uint256 id, uint256 eta);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | `uint256` |  |
| eta | `uint256` |  |

### ProposalExecuted

An event emitted when a proposal has been executed in the Timelock

```solidity
event ProposalExecuted(uint256 id);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | `uint256` |  |

### VotingDelaySet

An event emitted when the voting delay is set

```solidity
event VotingDelaySet(uint256 oldVotingDelay, uint256 newVotingDelay);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldVotingDelay | `uint256` |  |
| newVotingDelay | `uint256` |  |

### VotingPeriodSet

An event emitted when the voting period is set

```solidity
event VotingPeriodSet(uint256 oldVotingPeriod, uint256 newVotingPeriod);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldVotingPeriod | `uint256` |  |
| newVotingPeriod | `uint256` |  |

### NewImplementation

Emitted when implementation is changed

```solidity
event NewImplementation(address oldImplementation, address newImplementation);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldImplementation | `address` |  |
| newImplementation | `address` |  |

### ProposalThresholdSet

Emitted when proposal threshold is set

```solidity
event ProposalThresholdSet(uint256 oldProposalThreshold, uint256 newProposalThreshold);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldProposalThreshold | `uint256` |  |
| newProposalThreshold | `uint256` |  |

### NewPendingAdmin

Emitted when pendingAdmin is changed

```solidity
event NewPendingAdmin(address oldPendingAdmin, address newPendingAdmin);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldPendingAdmin | `address` |  |
| newPendingAdmin | `address` |  |

### NewAdmin

Emitted when pendingAdmin is accepted, which means admin is updated

```solidity
event NewAdmin(address oldAdmin, address newAdmin);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldAdmin | `address` |  |
| newAdmin | `address` |  |

### WhitelistAccountExpirationSet

Emitted when whitelist account expiration is set

```solidity
event WhitelistAccountExpirationSet(address account, uint256 expiration);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | `address` |  |
| expiration | `uint256` |  |

### WhitelistGuardianSet

Emitted when the whitelistGuardian is set

```solidity
event WhitelistGuardianSet(address oldGuardian, address newGuardian);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldGuardian | `address` |  |
| newGuardian | `address` |  |

### VetoGuardianSet

Emitted when the vetoGuardian is set

```solidity
event VetoGuardianSet(address oldGuardian, address newGuardian);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldGuardian | `address` |  |
| newGuardian | `address` |  |

## Errors

### GovernorBravo_OnlyAdmin

```solidity
error GovernorBravo_OnlyAdmin();
```

### GovernorBravo_OnlyPendingAdmin

```solidity
error GovernorBravo_OnlyPendingAdmin();
```

### GovernorBravo_OnlyVetoGuardian

```solidity
error GovernorBravo_OnlyVetoGuardian();
```

### GovernorBravo_AlreadyInitialized

```solidity
error GovernorBravo_AlreadyInitialized();
```

### GovernorBravo_NotActive

```solidity
error GovernorBravo_NotActive();
```

### GovernorBravo_AddressZero

```solidity
error GovernorBravo_AddressZero();
```

### GovernorBravo_InvalidDelay

```solidity
error GovernorBravo_InvalidDelay();
```

### GovernorBravo_InvalidPeriod

```solidity
error GovernorBravo_InvalidPeriod();
```

### GovernorBravo_InvalidGracePeriod

```solidity
error GovernorBravo_InvalidGracePeriod();
```

### GovernorBravo_InvalidThreshold

```solidity
error GovernorBravo_InvalidThreshold();
```

### GovernorBravo_InvalidCalldata

```solidity
error GovernorBravo_InvalidCalldata();
```

### GovernorBravo_Emergency_SupplyTooLow

```solidity
error GovernorBravo_Emergency_SupplyTooLow();
```

### GovernorBravo_NotEmergency

```solidity
error GovernorBravo_NotEmergency();
```

### GovernorBravo_Proposal_ThresholdNotMet

```solidity
error GovernorBravo_Proposal_ThresholdNotMet();
```

### GovernorBravo_Proposal_LengthMismatch

```solidity
error GovernorBravo_Proposal_LengthMismatch();
```

### GovernorBravo_Proposal_NoActions

```solidity
error GovernorBravo_Proposal_NoActions();
```

### GovernorBravo_Proposal_TooManyActions

```solidity
error GovernorBravo_Proposal_TooManyActions();
```

### GovernorBravo_Proposal_AlreadyActive

```solidity
error GovernorBravo_Proposal_AlreadyActive();
```

### GovernorBravo_Proposal_AlreadyPending

```solidity
error GovernorBravo_Proposal_AlreadyPending();
```

### GovernorBravo_Proposal_IdCollision

```solidity
error GovernorBravo_Proposal_IdCollision();
```

### GovernorBravo_Proposal_IdInvalid

```solidity
error GovernorBravo_Proposal_IdInvalid();
```

### GovernorBravo_Proposal_TooEarly

```solidity
error GovernorBravo_Proposal_TooEarly();
```

### GovernorBravo_Proposal_AlreadyActivated

```solidity
error GovernorBravo_Proposal_AlreadyActivated();
```

### GovernorBravo_InvalidSignature

```solidity
error GovernorBravo_InvalidSignature();
```

### GovernorBravo_Vote_Closed

```solidity
error GovernorBravo_Vote_Closed();
```

### GovernorBravo_Vote_InvalidType

```solidity
error GovernorBravo_Vote_InvalidType();
```

### GovernorBravo_Vote_AlreadyCast

```solidity
error GovernorBravo_Vote_AlreadyCast();
```

### GovernorBravo_Queue_FailedProposal

```solidity
error GovernorBravo_Queue_FailedProposal();
```

### GovernorBravo_Queue_AlreadyQueued

```solidity
error GovernorBravo_Queue_AlreadyQueued();
```

### GovernorBravo_Queue_BelowThreshold

```solidity
error GovernorBravo_Queue_BelowThreshold();
```

### GovernorBravo_Queue_VetoedProposal

```solidity
error GovernorBravo_Queue_VetoedProposal();
```

### GovernorBravo_Execute_NotQueued

```solidity
error GovernorBravo_Execute_NotQueued();
```

### GovernorBravo_Execute_BelowThreshold

```solidity
error GovernorBravo_Execute_BelowThreshold();
```

### GovernorBravo_Execute_VetoedProposal

```solidity
error GovernorBravo_Execute_VetoedProposal();
```

### GovernorBravo_Cancel_AlreadyExecuted

```solidity
error GovernorBravo_Cancel_AlreadyExecuted();
```

### GovernorBravo_Cancel_WhitelistedProposer

```solidity
error GovernorBravo_Cancel_WhitelistedProposer();
```

### GovernorBravo_Cancel_AboveThreshold

```solidity
error GovernorBravo_Cancel_AboveThreshold();
```

### GovernorBravo_Veto_AlreadyExecuted

```solidity
error GovernorBravo_Veto_AlreadyExecuted();
```
