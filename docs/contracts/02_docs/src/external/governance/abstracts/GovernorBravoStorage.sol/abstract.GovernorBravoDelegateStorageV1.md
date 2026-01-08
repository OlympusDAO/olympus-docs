# GovernorBravoDelegateStorageV1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/external/governance/abstracts/GovernorBravoStorage.sol)

**Inherits:**
[GovernorBravoDelegatorStorage](/main/contracts/docs/src/external/governance/abstracts/GovernorBravoStorage.sol/abstract.GovernorBravoDelegatorStorage)

**Title:**
Storage for Governor Bravo Delegate

For future upgrades, do not change GovernorBravoDelegateStorageV1. Create a new
contract which implements GovernorBravoDelegateStorageV1 and following the naming convention
GovernorBravoDelegateStorageVX.

## State Variables

### votingDelay

The delay before voting on a proposal may take place, once proposed, in blocks

```solidity
uint256 public votingDelay
```

### votingPeriod

The duration of voting on a proposal, in blocks

```solidity
uint256 public votingPeriod
```

### activationGracePeriod

The grace period after the voting delay through which a proposal may be activated

```solidity
uint256 public activationGracePeriod
```

### proposalThreshold

The percentage of total supply required in order for a voter to become a proposer

Out of 1000

```solidity
uint256 public proposalThreshold
```

### proposalCount

The total number of proposals

```solidity
uint256 public proposalCount
```

### timelock

The address of the Olympus Protocol Timelock

```solidity
ITimelock public timelock
```

### gohm

The address of the Olympus governance token

```solidity
IgOHM public gohm
```

### proposals

The official record of all proposals ever proposed

```solidity
mapping(uint256 => Proposal) public proposals
```

### latestProposalIds

The latest proposal for each proposer

```solidity
mapping(address => uint256) public latestProposalIds
```

## Structs

### Proposal

```solidity
struct Proposal {
    /// @notice Unique id for looking up a proposal
    uint256 id;
    /// @notice Creator of the proposal
    address proposer;
    /// @notice The proposal balance threshold that the proposer must stay above to keep their proposal active
    uint256 proposalThreshold;
    /// @notice The quorum for this proposal based on gOHM total supply at the time of proposal creation
    uint256 quorumVotes;
    /// @notice The timestamp that the proposal will be available for execution, set once the vote succeeds
    uint256 eta;
    /// @notice the ordered list of target addresses for calls to be made
    address[] targets;
    /// @notice The ordered list of values (i.e. msg.value) to be passed to the calls to be made
    uint256[] values;
    /// @notice The ordered list of function signatures to be called
    string[] signatures;
    /// @notice The ordered list of calldata to be passed to each call
    bytes[] calldatas;
    /// @notice The codehash for each target contract
    bytes32[] codehashes;
    /// @notice The block at which voting begins: holders must delegate their votes prior to this block
    uint256 startBlock;
    /// @notice The block at which voting ends: votes must be cast prior to this block
    uint256 endBlock;
    /// @notice Current number of votes in favor of this proposal
    uint256 forVotes;
    /// @notice Current number of votes in opposition to this proposal
    uint256 againstVotes;
    /// @notice Current number of votes for abstaining for this proposal
    uint256 abstainVotes;
    /// @notice Flag marking whether the voting period for a proposal has been activated
    bool votingStarted;
    /// @notice Flag marking whether the proposal has been vetoed
    bool vetoed;
    /// @notice Flag marking whether the proposal has been canceled
    bool canceled;
    /// @notice Flag marking whether the proposal has been executed
    bool executed;
    /// @notice Receipts of ballots for the entire set of voters
    mapping(address => Receipt) receipts;
}
```

### Receipt

Ballot receipt record for a voter

```solidity
struct Receipt {
    /// @notice Whether or not a vote has been cast
    bool hasVoted;
    /// @notice Whether or not the voter supports the proposal or abstains
    uint8 support;
    /// @notice The number of votes the voter had, which were cast
    uint256 votes;
}
```

## Enums

### ProposalState

Possible states that a proposal may be in

```solidity
enum ProposalState {
    Pending,
    Active,
    Canceled,
    Defeated,
    Succeeded,
    Queued,
    Expired,
    Executed,
    Vetoed,
    Emergency
}
```
