# ProposalScript

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/proposals/ProposalScript.sol)

**Inherits:**
ScriptSuite

Allows submission and testing of OCG proposals

Inheriting contracts must implement the constructor
See the scripts in `src/scripts/proposals/`

## State Variables

### ADDRESSES_PATH

```solidity
string public constant ADDRESSES_PATH = "./src/proposals/addresses.json"
```

## Functions

### constructor

```solidity
constructor(IProposal _proposal) ScriptSuite(ADDRESSES_PATH, _proposal);
```

### run

```solidity
function run() public override;
```

### printProposalInputs

```solidity
function printProposalInputs() public;
```

### executeOnTenderly

```solidity
function executeOnTenderly() public;
```

### executeOnAnvilFork

```solidity
function executeOnAnvilFork() public;
```
