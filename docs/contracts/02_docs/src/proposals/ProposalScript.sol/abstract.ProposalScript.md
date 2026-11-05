# ProposalScript

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/ProposalScript.sol)

**Inherits:** ScriptSuite

Allows submission and testing of OCG proposals

<i>

Inheriting contracts must implement the constructor

</i>

See the scripts in `src/scripts/proposals/`

## Constants

### ADDRESSES_PATH

```solidity
string public constant ADDRESSES_PATH = "./src/proposals/addresses.json";
```

## Functions

<a id="constructor-iproposal"></a>

### constructor

```solidity
constructor(IProposal _proposal) ScriptSuite(ADDRESSES_PATH, _proposal);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _proposal | `IProposal` |  |

<a id="run"></a>

### run

```solidity
function run() public override;
```

<a id="printproposalinputs"></a>

### printProposalInputs

```solidity
function printProposalInputs() public;
```

<a id="executeontenderly"></a>

### executeOnTenderly

```solidity
function executeOnTenderly() public;
```

<a id="executeonanvilfork"></a>

### executeOnAnvilFork

```solidity
function executeOnAnvilFork() public;
```
