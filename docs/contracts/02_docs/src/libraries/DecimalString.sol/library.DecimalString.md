# DecimalString

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/DecimalString.sol)

## Functions

<a id="todecimalstring-uint256-uint8-uint8"></a>

### toDecimalString

Converts a uint256 value to a string with a specified number of decimal places.
The value is adjusted by the scale factor and then formatted to the specified number of decimal places.
The decimal places are not zero-padded, so the result is not always the same length.

<i>

This is inspired by code in [FixedStrikeOptionTeller](https://github.com/Bond-Protocol/option-contracts/blob/b8ce2ca2bae3bd06f0e7665c3aa8d827e4d8ca2c/src/fixed-strike/FixedStrikeOptionTeller.sol#L722).

</i>

```solidity
function toDecimalString(
        uint256 value_,
        uint8 valueDecimals_,
        uint8 decimalPlaces_
    ) internal pure returns (string memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| value_ | `uint256` | The uint256 value to convert to a string. |
| valueDecimals_ | `uint8` | The scale factor of the value. |
| decimalPlaces_ | `uint8` | The number of decimal places to format the value to. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` | result            A string representation of the value with the specified number of decimal places. |
