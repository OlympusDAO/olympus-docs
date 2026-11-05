# IVersioned

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IVersioned.sol)

**Title:** IVersioned

Interface for contracts that have a version

## Functions

<a id="version"></a>

### VERSION

Returns the version of the contract

```solidity
function VERSION() external view returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |
