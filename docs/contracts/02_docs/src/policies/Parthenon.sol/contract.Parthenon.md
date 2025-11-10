# Parthenon

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/Parthenon.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy)

Parthenon, OlympusDAO's on-chain governance system.

*The Parthenon policy is also the Kernel's Executor.*

## State Variables

### getProposalMetadata

Return a proposal metadata object for a given proposal id.

```solidity
mapping(uint256 => ProposalMetadata) public getProposalMetadata;
```

### COLLATERAL_REQUIREMENT

The amount of VOTES a proposer needs to post in collateral in order to submit a proposal

*This number is expressed as a percentage of total supply in basis points: 500 = 5% of the supply*

```solidity
uint256 public constant COLLATERAL_REQUIREMENT = 500;
```

### COLLATERAL_MINIMUM

The minimum amount of VOTES the proposer must post in collateral to submit

```solidity
uint256 public constant COLLATERAL_MINIMUM = 10e18;
```

### WARMUP_PERIOD

Amount of time a wallet must wait after depositing before they can vote.

```solidity
uint256 public constant WARMUP_PERIOD = 1 minutes;
```

### ACTIVATION_TIMELOCK

Amount of time a submitted proposal must exist before triggering activation.

```solidity
uint256 public constant ACTIVATION_TIMELOCK = 1 minutes;
```

### ACTIVATION_DEADLINE

Amount of time a submitted proposal can exist before activation can no longer be triggered.

```solidity
uint256 public constant ACTIVATION_DEADLINE = 3 minutes;
```

### EXECUTION_THRESHOLD

Net votes required to execute a proposal on chain as a percentage of total registered votes.

```solidity
uint256 public constant EXECUTION_THRESHOLD = 33;
```

### VOTING_PERIOD

The period of time a proposal has for voting

```solidity
uint256 public constant VOTING_PERIOD = 3 minutes;
```

### EXECUTION_TIMELOCK

Required time for a proposal before it can be activated.

*This amount should be greater than 0 to prevent flash loan attacks.*

```solidity
uint256 public constant EXECUTION_TIMELOCK = VOTING_PERIOD + 1 minutes;
```

### EXECUTION_DEADLINE

Amount of time after the proposal is activated (NOT AFTER PASSED) when it can be activated (otherwise proposal will go stale).

*This is inclusive of the voting period (so the deadline is really ~4 days, assuming a 3 day voting window).*

```solidity
uint256 public constant EXECUTION_DEADLINE = VOTING_PERIOD + 1 weeks;
```

### COLLATERAL_DURATION

Amount of time a non-executed proposal must wait for the proposal to go through.

*This is inclusive of the voting period (so the deadline is really ~4 days, assuming a 3 day voting window).*

```solidity
uint256 public constant COLLATERAL_DURATION = 16 weeks;
```

### INSTR

```solidity
INSTRv1 public INSTR;
```

### VOTES

```solidity
VOTESv1 public VOTES;
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_) Policy(kernel_);
```

### configureDependencies

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

### requestPermissions

```solidity
function requestPermissions() external view override returns (Permissions[] memory requests);
```

### _max

```solidity
function _max(uint256 a, uint256 b) public pure returns (uint256);
```

### submitProposal

```solidity
function submitProposal(Instruction[] calldata instructions_, string calldata title_, string calldata proposalURI_)
    external;
```

### activateProposal

```solidity
function activateProposal(uint256 proposalId_) external;
```

### vote

```solidity
function vote(uint256 proposalId_, bool approve_) external;
```

### executeProposal

```solidity
function executeProposal(uint256 proposalId_) external;
```

### reclaimCollateral

```solidity
function reclaimCollateral(uint256 proposalId_) external;
```

## Events

### ProposalSubmitted

```solidity
event ProposalSubmitted(uint256 proposalId, string title, string proposalURI);
```

### ProposalActivated

```solidity
event ProposalActivated(uint256 proposalId, uint256 timestamp);
```

### VotesCast

```solidity
event VotesCast(uint256 proposalId, address voter, bool approve, uint256 userVotes);
```

### ProposalExecuted

```solidity
event ProposalExecuted(uint256 proposalId);
```

### CollateralReclaimed

```solidity
event CollateralReclaimed(uint256 proposalId, uint256 tokensReclaimed_);
```

## Errors

### NotAuthorized

```solidity
error NotAuthorized();
```

### UnableToActivate

```solidity
error UnableToActivate();
```

### ProposalAlreadyActivated

```solidity
error ProposalAlreadyActivated();
```

### WarmupNotCompleted

```solidity
error WarmupNotCompleted();
```

### UserAlreadyVoted

```solidity
error UserAlreadyVoted();
```

### UserHasNoVotes

```solidity
error UserHasNoVotes();
```

### ProposalIsNotActive

```solidity
error ProposalIsNotActive();
```

### DepositedAfterActivation

```solidity
error DepositedAfterActivation();
```

### PastVotingPeriod

```solidity
error PastVotingPeriod();
```

### ExecutorNotSubmitter

```solidity
error ExecutorNotSubmitter();
```

### NotEnoughVotesToExecute

```solidity
error NotEnoughVotesToExecute();
```

### ProposalAlreadyExecuted

```solidity
error ProposalAlreadyExecuted();
```

### ExecutionTimelockStillActive

```solidity
error ExecutionTimelockStillActive();
```

### ExecutionWindowExpired

```solidity
error ExecutionWindowExpired();
```

### UnmetCollateralDuration

```solidity
error UnmetCollateralDuration();
```

### CollateralAlreadyReturned

```solidity
error CollateralAlreadyReturned();
```

## Structs

### ProposalMetadata

```solidity
struct ProposalMetadata {
    address submitter;
    uint256 submissionTimestamp;
    uint256 collateralAmt;
    uint256 activationTimestamp;
    uint256 totalRegisteredVotes;
    uint256 yesVotes;
    uint256 noVotes;
    bool isExecuted;
    bool isCollateralReturned;
    mapping(address => uint256) votesCastByUser;
}
```
