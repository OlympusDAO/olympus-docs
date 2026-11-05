# Timestamp

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/Timestamp.sol)

## Functions

<a id="topaddedstring-uint48"></a>

### toPaddedString

Convert a timestamp to a padded string of the form "YYYY-MM-DD"

<i>

This has only been tested up to year 2345.

</i>

```solidity
function toPaddedString(
        uint48 timestamp
    ) internal pure returns (string memory, string memory, string memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| timestamp | `uint48` | The timestamp to convert |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` | year        Year as a zero-padded string |
| &lt;none&gt; | `string` | month       Month as a zero-padded string |
| &lt;none&gt; | `string` | day         Day as a zero-padded string |
