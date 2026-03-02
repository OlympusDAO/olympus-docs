# ContractUtils

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/external/governance/lib/ContractUtils.sol)

## Functions

### getCodeHash

Gets the codehash for a given address

```solidity
function getCodeHash(address target_) internal view returns (bytes32);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`target_`|`address`|The address to get the codehash for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The codehash|
