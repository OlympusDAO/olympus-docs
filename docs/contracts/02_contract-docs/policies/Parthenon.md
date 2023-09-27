# Parthenon





Parthenon, OlympusDAO&#39;s on-chain governance system.

*The Parthenon policy is also the Kernel&#39;s Executor.*

## Methods

### ACTIVATION_DEADLINE

```solidity
function ACTIVATION_DEADLINE() external view returns (uint256)
```

Amount of time a submitted proposal can exist before activation can no longer be triggered.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### ACTIVATION_TIMELOCK

```solidity
function ACTIVATION_TIMELOCK() external view returns (uint256)
```

Amount of time a submitted proposal must exist before triggering activation.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### COLLATERAL_DURATION

```solidity
function COLLATERAL_DURATION() external view returns (uint256)
```

Amount of time a non-executed proposal must wait for the proposal to go through.

*This is inclusive of the voting period (so the deadline is really ~4 days, assuming a 3 day voting window).*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### COLLATERAL_MINIMUM

```solidity
function COLLATERAL_MINIMUM() external view returns (uint256)
```

The minimum amount of VOTES the proposer must post in collateral to submit




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### COLLATERAL_REQUIREMENT

```solidity
function COLLATERAL_REQUIREMENT() external view returns (uint256)
```

The amount of VOTES a proposer needs to post in collateral in order to submit a proposal

*This number is expressed as a percentage of total supply in basis points: 500 = 5% of the supply*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### EXECUTION_DEADLINE

```solidity
function EXECUTION_DEADLINE() external view returns (uint256)
```

Amount of time after the proposal is activated (NOT AFTER PASSED) when it can be activated (otherwise proposal will go stale).

*This is inclusive of the voting period (so the deadline is really ~4 days, assuming a 3 day voting window).*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### EXECUTION_THRESHOLD

```solidity
function EXECUTION_THRESHOLD() external view returns (uint256)
```

Net votes required to execute a proposal on chain as a percentage of total registered votes.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### EXECUTION_TIMELOCK

```solidity
function EXECUTION_TIMELOCK() external view returns (uint256)
```

Required time for a proposal before it can be activated.

*This amount should be greater than 0 to prevent flash loan attacks.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### INSTR

```solidity
function INSTR() external view returns (contract INSTRv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract INSTRv1 | undefined |

### VOTES

```solidity
function VOTES() external view returns (contract VOTESv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract VOTESv1 | undefined |

### VOTING_PERIOD

```solidity
function VOTING_PERIOD() external view returns (uint256)
```

The period of time a proposal has for voting




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### WARMUP_PERIOD

```solidity
function WARMUP_PERIOD() external view returns (uint256)
```

Amount of time a wallet must wait after depositing before they can vote.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### _max

```solidity
function _max(uint256 a, uint256 b) external pure returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| a | uint256 | undefined |
| b | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### activateProposal

```solidity
function activateProposal(uint256 proposalId_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId_ | uint256 | undefined |

### changeKernel

```solidity
function changeKernel(contract Kernel newKernel_) external nonpayable
```

Function used by kernel when migrating to a new kernel.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newKernel_ | contract Kernel | undefined |

### configureDependencies

```solidity
function configureDependencies() external nonpayable returns (Keycode[] dependencies)
```

Define module dependencies for this policy.




#### Returns

| Name | Type | Description |
|---|---|---|
| dependencies | Keycode[] | - Keycode array of module dependencies. |

### executeProposal

```solidity
function executeProposal(uint256 proposalId_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId_ | uint256 | undefined |

### getProposalMetadata

```solidity
function getProposalMetadata(uint256) external view returns (address submitter, uint256 submissionTimestamp, uint256 collateralAmt, uint256 activationTimestamp, uint256 totalRegisteredVotes, uint256 yesVotes, uint256 noVotes, bool isExecuted, bool isCollateralReturned)
```

Return a proposal metadata object for a given proposal id.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| submitter | address | undefined |
| submissionTimestamp | uint256 | undefined |
| collateralAmt | uint256 | undefined |
| activationTimestamp | uint256 | undefined |
| totalRegisteredVotes | uint256 | undefined |
| yesVotes | uint256 | undefined |
| noVotes | uint256 | undefined |
| isExecuted | bool | undefined |
| isCollateralReturned | bool | undefined |

### isActive

```solidity
function isActive() external view returns (bool)
```

Easily accessible indicator for if a policy is activated or not.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### kernel

```solidity
function kernel() external view returns (contract Kernel)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Kernel | undefined |

### reclaimCollateral

```solidity
function reclaimCollateral(uint256 proposalId_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId_ | uint256 | undefined |

### requestPermissions

```solidity
function requestPermissions() external view returns (struct Permissions[] requests)
```

Function called by kernel to set module function permissions.




#### Returns

| Name | Type | Description |
|---|---|---|
| requests | Permissions[] | - Array of keycodes and function selectors for requested permissions. |

### submitProposal

```solidity
function submitProposal(Instruction[] instructions_, string title_, string proposalURI_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| instructions_ | Instruction[] | undefined |
| title_ | string | undefined |
| proposalURI_ | string | undefined |

### vote

```solidity
function vote(uint256 proposalId_, bool approve_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId_ | uint256 | undefined |
| approve_ | bool | undefined |



## Events

### CollateralReclaimed

```solidity
event CollateralReclaimed(uint256 proposalId, uint256 tokensReclaimed_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId  | uint256 | undefined |
| tokensReclaimed_  | uint256 | undefined |

### ProposalActivated

```solidity
event ProposalActivated(uint256 proposalId, uint256 timestamp)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId  | uint256 | undefined |
| timestamp  | uint256 | undefined |

### ProposalExecuted

```solidity
event ProposalExecuted(uint256 proposalId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId  | uint256 | undefined |

### ProposalSubmitted

```solidity
event ProposalSubmitted(uint256 proposalId, string title, string proposalURI)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId  | uint256 | undefined |
| title  | string | undefined |
| proposalURI  | string | undefined |

### VotesCast

```solidity
event VotesCast(uint256 proposalId, address voter, bool approve, uint256 userVotes)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId  | uint256 | undefined |
| voter  | address | undefined |
| approve  | bool | undefined |
| userVotes  | uint256 | undefined |



## Errors

### CollateralAlreadyReturned

```solidity
error CollateralAlreadyReturned()
```






### DepositedAfterActivation

```solidity
error DepositedAfterActivation()
```






### ExecutionTimelockStillActive

```solidity
error ExecutionTimelockStillActive()
```






### ExecutionWindowExpired

```solidity
error ExecutionWindowExpired()
```






### ExecutorNotSubmitter

```solidity
error ExecutorNotSubmitter()
```






### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### NotAuthorized

```solidity
error NotAuthorized()
```






### NotEnoughVotesToExecute

```solidity
error NotEnoughVotesToExecute()
```






### PastVotingPeriod

```solidity
error PastVotingPeriod()
```






### Policy_ModuleDoesNotExist

```solidity
error Policy_ModuleDoesNotExist(Keycode keycode_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| keycode_ | Keycode | undefined |

### ProposalAlreadyActivated

```solidity
error ProposalAlreadyActivated()
```






### ProposalAlreadyExecuted

```solidity
error ProposalAlreadyExecuted()
```






### ProposalIsNotActive

```solidity
error ProposalIsNotActive()
```






### UnableToActivate

```solidity
error UnableToActivate()
```






### UnmetCollateralDuration

```solidity
error UnmetCollateralDuration()
```






### UserAlreadyVoted

```solidity
error UserAlreadyVoted()
```






### UserHasNoVotes

```solidity
error UserHasNoVotes()
```






### WarmupNotCompleted

```solidity
error WarmupNotCompleted()
```







