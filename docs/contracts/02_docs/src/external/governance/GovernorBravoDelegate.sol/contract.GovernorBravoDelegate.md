# GovernorBravoDelegate

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/external/governance/GovernorBravoDelegate.sol)

**Inherits:**
[GovernorBravoDelegateStorageV2](/main/contracts/docs/src/external/governance/abstracts/GovernorBravoStorage.sol/abstract.GovernorBravoDelegateStorageV2), [IGovernorBravoEventsAndErrors](/main/contracts/docs/src/external/governance/interfaces/IGovernorBravoEvents.sol/interface.IGovernorBravoEventsAndErrors)

## State Variables

### name

The name of this contract

```solidity
string public constant name = "Olympus Governor Bravo"
```

### MIN_PROPOSAL_THRESHOLD_PCT

The minimum setable proposal threshold

```solidity
uint256 public constant MIN_PROPOSAL_THRESHOLD_PCT = 15_000
```

### MAX_PROPOSAL_THRESHOLD_PCT

The maximum setable proposal threshold

```solidity
uint256 public constant MAX_PROPOSAL_THRESHOLD_PCT = 1_000_000
```

### MIN_VOTING_PERIOD

The minimum setable voting period

```solidity
uint256 public constant MIN_VOTING_PERIOD = 21600
```

### MAX_VOTING_PERIOD

The max setable voting period

```solidity
uint256 public constant MAX_VOTING_PERIOD = 100800
```

### MIN_VOTING_DELAY

The min setable voting delay

```solidity
uint256 public constant MIN_VOTING_DELAY = 7200
```

### MAX_VOTING_DELAY

The max setable voting delay

```solidity
uint256 public constant MAX_VOTING_DELAY = 50400
```

### MIN_GOHM_SUPPLY

The minimum level of gOHM supply acceptable for OCG operations

```solidity
uint256 public constant MIN_GOHM_SUPPLY = 1_000e18
```

### quorumPct

The percentage of total supply in support of a proposal required in order for a quorum to be reached and for a vote to succeed

Olympus has a variable supply system, that actively fluctuates fairly significantly, so it is better to use
a percentage of total supply, rather than a fixed number of tokens.

```solidity
uint256 public constant quorumPct = 20_000_000
```

### highRiskQuorum

The percentage of total supply in support of a proposal related to a high risk module in the Default system required
in order for a quorum to be reached and for a vote to succeed

Olympus has a variable supply system, that actively fluctuates fairly significantly, so it is better to use
a percentage of total supply, rather than a fixed number of tokens.

```solidity
uint256 public constant highRiskQuorum = 20_000_000
```

### approvalThresholdPct

The percentage of votes that must be in favor of a proposal for it to succeed

```solidity
uint256 public constant approvalThresholdPct = 60_000_000
```

### proposalMaxOperations

The maximum number of actions that can be included in a proposal

```solidity
uint256 public constant proposalMaxOperations = 15
```

### DOMAIN_TYPEHASH

The EIP-712 typehash for the contract's domain

```solidity
bytes32 public constant DOMAIN_TYPEHASH =
    keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract)")
```

### BALLOT_TYPEHASH

The EIP-712 typehash for the ballot struct used by the contract

```solidity
bytes32 public constant BALLOT_TYPEHASH = keccak256("Ballot(uint256 proposalId,uint8 support)")
```

## Functions

### initialize

Used to initialize the contract during delegator constructor

```solidity
function initialize(
    address timelock_,
    address gohm_,
    address kernel_,
    address vetoGuardian_,
    uint256 votingPeriod_,
    uint256 votingDelay_,
    uint256 activationGracePeriod_,
    uint256 proposalThreshold_
) public virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`timelock_`|`address`|The address of the Timelock|
|`gohm_`|`address`|The address of the gOHM token|
|`kernel_`|`address`|The address of the kernel|
|`vetoGuardian_`|`address`|The address of the veto guardian|
|`votingPeriod_`|`uint256`|The initial voting period|
|`votingDelay_`|`uint256`|The initial voting delay|
|`activationGracePeriod_`|`uint256`||
|`proposalThreshold_`|`uint256`|The initial proposal threshold (percentage of total supply. out of 1000)|

### propose

Function used to propose a new proposal. Sender must have delegates above the proposal threshold

```solidity
function propose(
    address[] memory targets,
    uint256[] memory values,
    string[] memory signatures,
    bytes[] memory calldatas,
    string memory description
) public returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`targets`|`address[]`|Target addresses for proposal calls|
|`values`|`uint256[]`|Eth values for proposal calls|
|`signatures`|`string[]`|Function signatures for proposal calls|
|`calldatas`|`bytes[]`|Calldatas for proposal calls|
|`description`|`string`|String description of the proposal|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Proposal id of new proposal|

### emergencyPropose

Create proposal in case of emergency

Can only be called by the veto guardian in the event of an emergency

```solidity
function emergencyPropose(
    address[] memory targets,
    uint256[] memory values,
    string[] memory signatures,
    bytes[] memory calldatas
) external returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`targets`|`address[]`|Target addresses for proposal calls|
|`values`|`uint256[]`|Eth values for proposal calls|
|`signatures`|`string[]`|Function signatures for proposal calls|
|`calldatas`|`bytes[]`|Calldatas for proposal calls|

### activate

Activates voting for a proposal

This also captures quorum based on total supply to ensure it's as close as possible to the proposal start time

```solidity
function activate(uint256 proposalId) external;
```

### queue

Queues a successful proposal

```solidity
function queue(uint256 proposalId) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The id of the proposal to queue|

### _queueOrRevertInternal

```solidity
function _queueOrRevertInternal(
    uint256 proposalId,
    address target,
    uint256 value,
    string memory signature,
    bytes memory data,
    uint256 eta
) internal;
```

### execute

Executes a queued proposal if eta has passed

```solidity
function execute(uint256 proposalId) external payable;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The id of the proposal to execute|

### cancel

Cancels a proposal only if sender is the proposer, or proposer delegates dropped below proposal threshold

```solidity
function cancel(uint256 proposalId) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The id of the proposal to cancel|

### veto

Vetoes a proposal only if sender is the veto guardian

```solidity
function veto(uint256 proposalId) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The id of the proposal to veto|

### castVote

Cast a vote for a proposal

```solidity
function castVote(uint256 proposalId, uint8 support) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The id of the proposal to vote on|
|`support`|`uint8`|The support value for the vote. 0=against, 1=for, 2=abstain|

### castVoteWithReason

Cast a vote for a proposal with a reason

```solidity
function castVoteWithReason(uint256 proposalId, uint8 support, string calldata reason) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The id of the proposal to vote on|
|`support`|`uint8`|The support value for the vote. 0=against, 1=for, 2=abstain|
|`reason`|`string`|The reason given for the vote by the voter|

### castVoteBySig

Cast a vote for a proposal by signature

External function that accepts EIP-712 signatures for voting on proposals.

```solidity
function castVoteBySig(uint256 proposalId, uint8 support, uint8 v, bytes32 r, bytes32 s) external;
```

### castVoteInternal

Internal function that caries out voting logic

```solidity
function castVoteInternal(address voter, uint256 proposalId, uint8 support) internal returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`voter`|`address`|The voter that is casting their vote|
|`proposalId`|`uint256`|The id of the proposal to vote on|
|`support`|`uint8`|The support value for the vote. 0=against, 1=for, 2=abstain|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of votes cast|

### _setVotingDelay

Admin function for setting the voting delay

```solidity
function _setVotingDelay(uint256 newVotingDelay) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newVotingDelay`|`uint256`|new voting delay, in blocks|

### _setVotingPeriod

Admin function for setting the voting period

```solidity
function _setVotingPeriod(uint256 newVotingPeriod) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newVotingPeriod`|`uint256`|new voting period, in blocks|

### _setProposalThreshold

Admin function for setting the proposal threshold

newProposalThreshold must be greater than the hardcoded min

```solidity
function _setProposalThreshold(uint256 newProposalThreshold) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newProposalThreshold`|`uint256`|new proposal threshold|

### _setVetoGuardian

Admin function for setting the vetoGuardian. vetoGuardian can veto any proposal

```solidity
function _setVetoGuardian(address account) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|Account to set vetoGuardian to (0x0 to remove vetoGuardian)|

### _setPendingAdmin

Begins transfer of admin rights. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.

Admin function to begin change of admin. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.

```solidity
function _setPendingAdmin(address newPendingAdmin) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newPendingAdmin`|`address`|New pending admin.|

### _acceptAdmin

Accepts transfer of admin rights. msg.sender must be pendingAdmin

Admin function for pending admin to accept role and update admin

```solidity
function _acceptAdmin() external;
```

### _setModuleRiskLevel

Sets whether a module is considered high risk

Admin function to set whether a module in the Default Framework is considered high risk

```solidity
function _setModuleRiskLevel(bytes5 module_, bool isHighRisk_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`module_`|`bytes5`|The module to set the risk of|
|`isHighRisk_`|`bool`|If the module is high risk|

### _isEmergency

Checks if the system should be set to an emergency state due to a collapsing supply of gOHM

```solidity
function _isEmergency() internal view returns (bool);
```

### _isHighRiskProposal

Checks if a proposal is high risk by identifying actions where the Default Framework kernel
is the target, if so, checking if it's installing or deactivating a policy, and if so,
checking if the policy is touching a high risk module. This makes external calls, so when
for future updates to the Governor, make sure that functions where it is used cannot be re-entered.

```solidity
function _isHighRiskProposal(address[] memory targets, string[] memory signatures, bytes[] memory calldatas)
    internal
    returns (bool);
```

### getChainIdInternal

View function that gets the chain ID of the current network

```solidity
function getChainIdInternal() internal view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The chain ID|

### getProposalThresholdVotes

View function that gets the proposal threshold in number of gOHM based on current supply

```solidity
function getProposalThresholdVotes() public view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The proposal threshold in number of gOHM|

### getQuorumVotes

View function that gets the quorum in number of gOHM based on current supply

```solidity
function getQuorumVotes() public view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The quorum in number of gOHM|

### getHighRiskQuorumVotes

View function that gets the high risk quorum in number of gOHM based on current supply

```solidity
function getHighRiskQuorumVotes() public view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The high risk quorum in number of gOHM|

### getProposalQuorum

Gets the quorum required for a given proposal

```solidity
function getProposalQuorum(uint256 proposalId) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|the id of the proposal|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The quorum required for the given proposal|

### getProposalThreshold

Gets the proposer votes threshold required for a given proposal

```solidity
function getProposalThreshold(uint256 proposalId) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|the id of the proposal|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The proposer votes threshold required for the given proposal|

### getProposalEta

Gets the eta value for a given proposal

```solidity
function getProposalEta(uint256 proposalId) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|the id of the proposal|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The eta value for the given proposal|

### getProposalVotes

Gets the against, for, and abstain votes for a given proposal

```solidity
function getProposalVotes(uint256 proposalId) external view returns (uint256, uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|the id of the proposal|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The against, for, and abstain votes for the given proposal|
|`<none>`|`uint256`||
|`<none>`|`uint256`||

### getActions

Gets actions of a proposal

```solidity
function getActions(uint256 proposalId)
    external
    view
    returns (
        address[] memory targets,
        uint256[] memory values,
        string[] memory signatures,
        bytes[] memory calldatas
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|the id of the proposal|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`targets`|`address[]`|of the proposal actions|
|`values`|`uint256[]`|of the proposal actions|
|`signatures`|`string[]`|of the proposal actions|
|`calldatas`|`bytes[]`|of the proposal actions|

### getReceipt

Gets the receipt for a voter on a given proposal

```solidity
function getReceipt(uint256 proposalId, address voter) external view returns (Receipt memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|the id of proposal|
|`voter`|`address`|The address of the voter|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Receipt`|The voting receipt|

### getVoteOutcome

Gets the voting outcome of the proposal

```solidity
function getVoteOutcome(uint256 proposalId) public view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|the id of proposal|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|The voting outcome|

### state

Gets the state of a proposal

```solidity
function state(uint256 proposalId) public view returns (ProposalState);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The id of the proposal|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`ProposalState`|Proposal state|
