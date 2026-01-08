# ContractUtils

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/external/governance/lib/ContractUtils.sol)

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
