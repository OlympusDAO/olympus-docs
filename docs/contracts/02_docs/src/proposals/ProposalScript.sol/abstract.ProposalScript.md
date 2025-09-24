# ProposalScript

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/proposals/ProposalScript.sol)

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
