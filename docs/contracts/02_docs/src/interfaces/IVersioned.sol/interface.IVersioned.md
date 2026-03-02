# IVersioned

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/interfaces/IVersioned.sol)

**Title:**
IVersioned

forge-lint: disable-start(mixed-case-function)

Interface for contracts that have a version

## Functions

### VERSION

Returns the version of the contract

```solidity
function VERSION() external view returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|- Major version upgrade indicates breaking change to the interface.|
|`minor`|`uint8`|- Minor version change retains backward-compatible interface.|
