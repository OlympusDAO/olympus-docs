# Timestamp

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/libraries/Timestamp.sol)

## Functions

### toPaddedString

Convert a timestamp to a padded string of the form "YYYY-MM-DD"

This has only been tested up to year 2345.

```solidity
function toPaddedString(uint48 timestamp) internal pure returns (string memory, string memory, string memory);
```

**Parameters**

| Name        | Type     | Description              |
| ----------- | -------- | ------------------------ |
| `timestamp` | `uint48` | The timestamp to convert |

**Returns**

| Name     | Type     | Description                         |
| -------- | -------- | ----------------------------------- |
| `<none>` | `string` | year Year as a zero-padded string   |
| `<none>` | `string` | month Month as a zero-padded string |
| `<none>` | `string` | day Day as a zero-padded string     |
