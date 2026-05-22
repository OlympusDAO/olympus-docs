# String

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/libraries/String.sol)

## Functions

### truncate32

Truncates a string to 32 bytes

```solidity
function truncate32(string memory str_) internal pure returns (string memory);
```

### bytes32ToString

Converts a bytes32 value to a string

Extracts a null-terminated string from bytes32 (stops at the first null byte)

```solidity
function bytes32ToString(bytes32 value_) internal pure returns (string memory);
```

**Parameters**

| Name     | Type      | Description                              |
| -------- | --------- | ---------------------------------------- |
| `value_` | `bytes32` | The bytes32 value to convert to a string |

**Returns**

| Name     | Type     | Description                                           |
| -------- | -------- | ----------------------------------------------------- |
| `<none>` | `string` | string The string representation of the bytes32 value |

### substring

Returns a substring of a string

```solidity
function substring(string memory str_, uint256 startIndex_, uint256 endIndex_)
    internal
    pure
    returns (string memory);
```

**Parameters**

| Name          | Type      | Description                         |
| ------------- | --------- | ----------------------------------- |
| `str_`        | `string`  | The string to get the substring of  |
| `startIndex_` | `uint256` | The index to start the substring at |
| `endIndex_`   | `uint256` | The index to end the substring at   |

**Returns**

| Name     | Type     | Description                |
| -------- | -------- | -------------------------- |
| `<none>` | `string` | resultString The substring |

### substringFrom

Returns a substring of a string from a given index

```solidity
function substringFrom(string memory str_, uint256 startIndex_) internal pure returns (string memory);
```

**Parameters**

| Name          | Type      | Description                         |
| ------------- | --------- | ----------------------------------- |
| `str_`        | `string`  | The string to get the substring of  |
| `startIndex_` | `uint256` | The index to start the substring at |

**Returns**

| Name     | Type     | Description                |
| -------- | -------- | -------------------------- |
| `<none>` | `string` | resultString The substring |

## Errors

### EndBeforeStartIndex

```solidity
error EndBeforeStartIndex(uint256 startIndex, uint256 endIndex);
```

### EndIndexOutOfBounds

```solidity
error EndIndexOutOfBounds(uint256 endIndex, uint256 length);
```
