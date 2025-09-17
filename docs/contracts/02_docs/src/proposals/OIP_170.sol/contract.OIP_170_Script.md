# OIP_170_Script

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/proposals/OIP_170.sol)

**Inherits:**
ScriptSuite

## State Variables

### ADDRESSES_PATH

```solidity
string public constant ADDRESSES_PATH = "./src/proposals/addresses.json";
```

## Functions

### constructor

```solidity
constructor() ScriptSuite(ADDRESSES_PATH, new OIP_170());
```

### run

```solidity
function run() public override;
```
