# Timestamp

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/libraries/Timestamp.sol)

## Functions

### toPaddedString

Convert a timestamp to a padded string of the form "YYYY-MM-DD"

This has only been tested up to year 2345.

```solidity
function toPaddedString(uint48 timestamp) internal pure returns (string memory, string memory, string memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`timestamp`|`uint48`|   The timestamp to convert|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|year        Year as a zero-padded string|
|`<none>`|`string`|month       Month as a zero-padded string|
|`<none>`|`string`|day         Day as a zero-padded string|
