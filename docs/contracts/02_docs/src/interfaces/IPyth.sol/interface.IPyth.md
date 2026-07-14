# IPyth

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/interfaces/IPyth.sol)

**Title:**
IPyth

Minimal interface for Pyth Network price feeds

Based on Pyth Network's IPyth interface

## Functions

### getPriceNoOlderThan

Get the price object with a published timestamp from before than `age` seconds in the past

Returns the latest price object for the requested price feed ID, if it has been updated sufficiently recently

```solidity
function getPriceNoOlderThan(bytes32 priceId, uint256 age) external view returns (Price memory price);
```

**Parameters**

| Name      | Type      | Description                                  |
| --------- | --------- | -------------------------------------------- |
| `priceId` | `bytes32` | The ID of the price feed                     |
| `age`     | `uint256` | Maximum age of the on-chain price in seconds |

**Returns**

| Name    | Type    | Description                                                                   |
| ------- | ------- | ----------------------------------------------------------------------------- |
| `price` | `Price` | Price struct containing price, confidence interval, exponent, and publishTime |

## Structs

### Price

Price struct returned by Pyth Network

```solidity
struct Price {
    int64 price;
    uint64 conf;
    int32 expo;
    uint256 publishTime;
}
```

**Properties**

| Name          | Type      | Description                                                                                                          |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| `price`       | `int64`   | Price value (multiply by 10^expo to get the decimal value)                                                           |
| `conf`        | `uint64`  | Confidence interval, indicating that the actual asset price is ± conf (multiply by 10^expo to get the decimal value) |
| `expo`        | `int32`   | Exponent                                                                                                             |
| `publishTime` | `uint256` | Timestamp when price was published                                                                                   |
