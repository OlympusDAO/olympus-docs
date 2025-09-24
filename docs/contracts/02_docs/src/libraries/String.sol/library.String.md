# String

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/libraries/String.sol)

## Functions

### truncate32

Truncates a string to 32 bytes

```solidity
function truncate32(string memory str_) internal pure returns (string memory);
```

### substring

Returns a substring of a string

```solidity
function substring(string memory str_, uint256 startIndex_, uint256 endIndex_) internal pure returns (string memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`str_`|`string`|           The string to get the substring of|
|`startIndex_`|`uint256`|    The index to start the substring at|
|`endIndex_`|`uint256`|      The index to end the substring at|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|resultString    The substring|

### substringFrom

Returns a substring of a string from a given index

```solidity
function substringFrom(string memory str_, uint256 startIndex_) internal pure returns (string memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`str_`|`string`|The string to get the substring of|
|`startIndex_`|`uint256`|The index to start the substring at|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|resultString The substring|

## Errors

### EndBeforeStartIndex

```solidity
error EndBeforeStartIndex(uint256 startIndex, uint256 endIndex);
```

### EndIndexOutOfBounds

```solidity
error EndIndexOutOfBounds(uint256 endIndex, uint256 length);
```
