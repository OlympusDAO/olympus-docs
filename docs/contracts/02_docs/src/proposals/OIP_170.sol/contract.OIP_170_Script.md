# OIP_170_Script

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/proposals/OIP_170.sol)

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
