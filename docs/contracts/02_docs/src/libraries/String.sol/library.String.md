# String

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/String.sol)

## Functions

<a id="truncate32-string"></a>

### truncate32

Truncates a string to 32 bytes

```solidity
function truncate32(string memory str_) internal pure returns (string memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| str_ | `string` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="bytes32tostring-bytes32"></a>

### bytes32ToString

Converts a bytes32 value to a string

<i>

Extracts a null-terminated string from bytes32 (stops at the first null byte)

</i>

```solidity
function bytes32ToString(bytes32 value_) internal pure returns (string memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| value_ | `bytes32` | The bytes32 value to convert to a string |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` | string The string representation of the bytes32 value |

<a id="substring-string-uint256-uint256"></a>

### substring

Returns a substring of a string

```solidity
function substring(
        string memory str_,
        uint256 startIndex_,
        uint256 endIndex_
    ) internal pure returns (string memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| str_ | `string` | The string to get the substring of |
| startIndex_ | `uint256` | The index to start the substring at |
| endIndex_ | `uint256` | The index to end the substring at |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` | resultString    The substring |

<a id="substringfrom-string-uint256"></a>

### substringFrom

Returns a substring of a string from a given index

```solidity
function substringFrom(
        string memory str_,
        uint256 startIndex_
    ) internal pure returns (string memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| str_ | `string` | The string to get the substring of |
| startIndex_ | `uint256` | The index to start the substring at |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` | resultString The substring |

## Errors

### EndBeforeStartIndex

```solidity
error EndBeforeStartIndex(uint256 startIndex, uint256 endIndex);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| startIndex | `uint256` |  |
| endIndex | `uint256` |  |

### EndIndexOutOfBounds

```solidity
error EndIndexOutOfBounds(uint256 endIndex, uint256 length);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| endIndex | `uint256` |  |
| length | `uint256` |  |
