# ContractUtils

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/external/governance/lib/ContractUtils.sol)

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
