# ProposalScript

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/proposals/ProposalScript.sol)

**Inherits:**
ScriptSuite

Allows submission and testing of OCG proposals

*Inheriting contracts must implement the constructor
See the scripts in `src/scripts/proposals/`*

## State Variables

### ADDRESSES_PATH

```solidity
string public constant ADDRESSES_PATH = "./src/proposals/addresses.json";
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

### executeOnTestnet

```solidity
function executeOnTestnet() public;
```
