# DecimalString

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/libraries/DecimalString.sol)

## Functions

### toDecimalString

Converts a uint256 value to a string with a specified number of decimal places.
The value is adjusted by the scale factor and then formatted to the specified number of decimal places.
The decimal places are not zero-padded, so the result is not always the same length.

This is inspired by code in [FixedStrikeOptionTeller](https://github.com/Bond-Protocol/option-contracts/blob/b8ce2ca2bae3bd06f0e7665c3aa8d827e4d8ca2c/src/fixed-strike/FixedStrikeOptionTeller.sol#L722).

```solidity
function toDecimalString(uint256 value_, uint8 valueDecimals_, uint8 decimalPlaces_)
    internal
    pure
    returns (string memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`value_`|`uint256`|           The uint256 value to convert to a string.|
|`valueDecimals_`|`uint8`|   The scale factor of the value.|
|`decimalPlaces_`|`uint8`|   The number of decimal places to format the value to.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|result            A string representation of the value with the specified number of decimal places.|
