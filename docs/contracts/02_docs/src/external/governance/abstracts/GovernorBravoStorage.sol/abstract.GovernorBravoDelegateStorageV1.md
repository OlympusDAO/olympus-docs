# GovernorBravoDelegateStorageV1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/external/governance/abstracts/GovernorBravoStorage.sol)

**Inherits:**
[GovernorBravoDelegatorStorage](/main/contracts/docs/src/external/governance/abstracts/GovernorBravoStorage.sol/abstract.GovernorBravoDelegatorStorage)

For future upgrades, do not change GovernorBravoDelegateStorageV1. Create a new
contract which implements GovernorBravoDelegateStorageV1 and following the naming convention
GovernorBravoDelegateStorageVX.

## State Variables

### votingDelay

The delay before voting on a proposal may take place, once proposed, in blocks

```solidity
uint256 public votingDelay;
```

### votingPeriod

The duration of voting on a proposal, in blocks

```solidity
uint256 public votingPeriod;
```

### activationGracePeriod

The grace period after the voting delay through which a proposal may be activated

```solidity
uint256 public activationGracePeriod;
```

### proposalThreshold

The percentage of total supply required in order for a voter to become a proposer

*Out of 1000*

```solidity
uint256 public proposalThreshold;
```

### proposalCount

The total number of proposals

```solidity
uint256 public proposalCount;
```

### timelock

The address of the Olympus Protocol Timelock

```solidity
ITimelock public timelock;
```

### gohm

The address of the Olympus governance token

```solidity
IgOHM public gohm;
```

### proposals

The official record of all proposals ever proposed

```solidity
mapping(uint256 => Proposal) public proposals;
```

### latestProposalIds

The latest proposal for each proposer

```solidity
mapping(address => uint256) public latestProposalIds;
```

## Structs

### Proposal

```solidity
struct Proposal {
    uint256 id;
    address proposer;
    uint256 proposalThreshold;
    uint256 quorumVotes;
    uint256 eta;
    address[] targets;
    uint256[] values;
    string[] signatures;
    bytes[] calldatas;
    bytes32[] codehashes;
    uint256 startBlock;
    uint256 endBlock;
    uint256 forVotes;
    uint256 againstVotes;
    uint256 abstainVotes;
    bool votingStarted;
    bool vetoed;
    bool canceled;
    bool executed;
    mapping(address => Receipt) receipts;
}
```

### Receipt

Ballot receipt record for a voter

```solidity
struct Receipt {
    bool hasVoted;
    uint8 support;
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
