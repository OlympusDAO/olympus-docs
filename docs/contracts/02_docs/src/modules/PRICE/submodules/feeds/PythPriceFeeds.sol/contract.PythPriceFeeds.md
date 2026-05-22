# PythPriceFeeds

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/modules/PRICE/submodules/feeds/PythPriceFeeds.sol)

**Inherits:**
[PriceSubmodule](/main/contracts/docs/src/modules/PRICE/PRICE.v2.sol/abstract.PriceSubmodule)

**Title:**
PythPriceFeeds

**Author:**
0xJem

forge-lint: disable-start(mixed-case-function)

Provides prices derived from Pyth Network price feed(s)

## State Variables

### \_PRICE_DATA_SIZE

```solidity
uint256 internal constant _PRICE_DATA_SIZE = 128
```

### ONE_FEED_PARAMS_LENGTH

The expected length of the encoded one feed parameters (address + bytes32 + uint48 + uint256 = 128 bytes)

```solidity
uint256 internal constant ONE_FEED_PARAMS_LENGTH = 128
```

### TWO_FEED_PARAMS_LENGTH

The expected length of the encoded two feed parameters (2x address + 2x bytes32 + 2x uint48 + 3x uint256 = 288 bytes)

```solidity
uint256 internal constant TWO_FEED_PARAMS_LENGTH = 288
```

### MAX_NEGATIVE_EXPONENT

The maximum negative exponent allowed to prevent overflow in 10\*\*-expo calculation

```solidity
int32 private constant MAX_NEGATIVE_EXPONENT = -30
```

## Functions

### constructor

```solidity
constructor(Module parent_) Submodule(parent_);
```

### SUBKEYCODE

20 byte identifier for the submodule. First 5 bytes must match PARENT().

```solidity
function SUBKEYCODE() public pure override returns (SubKeycode);
```

### VERSION

```solidity
function VERSION() public pure override returns (uint8 major, uint8 minor);
```

### \_validatePriceFeedResult

Validates the result of the price feed

This function will revert if:

- Price <= 0

- Publish time is before the update threshold from the current time

- Confidence interval exceeds the maximum allowed

```solidity
function _validatePriceFeedResult(
    address pyth_,
    bytes32 priceFeedId_,
    IPyth.Price memory priceData,
    uint256 blockTimestamp,
    uint48 paramsUpdateThreshold,
    uint64 paramsMaxConfidence
) internal pure;
```

**Parameters**

| Name                    | Type          | Description                                                                 |
| ----------------------- | ------------- | --------------------------------------------------------------------------- |
| `pyth_`                 | `address`     | Pyth contract address                                                       |
| `priceFeedId_`          | `bytes32`     | The price feed ID                                                           |
| `priceData`             | `IPyth.Price` | The price data returned by the Pyth contract                                |
| `blockTimestamp`        | `uint256`     | The current block timestamp                                                 |
| `paramsUpdateThreshold` | `uint48`      | The maximum number of seconds elapsed since the last price feed update      |
| `paramsMaxConfidence`   | `uint64`      | The maximum confidence interval allowed (in Pyth feed scale, i.e., 10^expo) |

### \_getFeedPrice

Retrieves the latest price returned by the specified Pyth price feed.

The result is validated using `_validatePriceFeedResult`, and will revert if invalid

```solidity
function _getFeedPrice(
    address pyth_,
    bytes32 priceFeedId_,
    uint48 updateThreshold_,
    uint256 maxConfidence_,
    uint8 outputDecimals_
) internal view returns (FeedResult memory);
```

**Parameters**

| Name               | Type      | Description                                                            |
| ------------------ | --------- | ---------------------------------------------------------------------- |
| `pyth_`            | `address` | Pyth contract address                                                  |
| `priceFeedId_`     | `bytes32` | The Pyth price feed ID                                                 |
| `updateThreshold_` | `uint48`  | The maximum number of seconds elapsed since the last price feed update |
| `maxConfidence_`   | `uint256` | The maximum confidence interval allowed (in output decimals scale)     |
| `outputDecimals_`  | `uint8`   | The number of decimals to return the price in                          |

**Returns**

| Name     | Type         | Description                                                                     |
| -------- | ------------ | ------------------------------------------------------------------------------- |
| `<none>` | `FeedResult` | FeedResult The validated price and confidence in the scale of `outputDecimals_` |

### \_validateDerivedConfidence

Validates a derived confidence interval

```solidity
function _validateDerivedConfidence(uint256 confidence_, uint256 maxConfidence_) internal pure;
```

**Parameters**

| Name             | Type      | Description                                                        |
| ---------------- | --------- | ------------------------------------------------------------------ |
| `confidence_`    | `uint256` | The derived confidence interval (in output decimals scale)         |
| `maxConfidence_` | `uint256` | The maximum confidence interval allowed (in output decimals scale) |

### \_deriveMulConfidence

Derives the confidence interval for a multiplication result

```solidity
function _deriveMulConfidence(FeedResult memory first, FeedResult memory second, uint8 outputDecimals_)
    internal
    pure
    returns (uint256);
```

**Parameters**

| Name              | Type         | Description                                 |
| ----------------- | ------------ | ------------------------------------------- |
| `first`           | `FeedResult` | First feed result in output decimals scale  |
| `second`          | `FeedResult` | Second feed result in output decimals scale |
| `outputDecimals_` | `uint8`      | The number of output decimals               |

**Returns**

| Name     | Type      | Description                                                      |
| -------- | --------- | ---------------------------------------------------------------- |
| `<none>` | `uint256` | uint256 The derived confidence interval in output decimals scale |

### \_deriveDivConfidence

Derives the confidence interval for a division result

```solidity
function _deriveDivConfidence(
    FeedResult memory numerator,
    FeedResult memory denominator,
    uint8 outputDecimals_,
    uint256 priceResult_
) internal pure returns (uint256);
```

**Parameters**

| Name              | Type         | Description                                         |
| ----------------- | ------------ | --------------------------------------------------- |
| `numerator`       | `FeedResult` | Numerator feed result in output decimals scale      |
| `denominator`     | `FeedResult` | Denominator feed result in output decimals scale    |
| `outputDecimals_` | `uint8`      | The number of output decimals                       |
| `priceResult_`    | `uint256`    | The derived division price in output decimals scale |

**Returns**

| Name     | Type      | Description                                                      |
| -------- | --------- | ---------------------------------------------------------------- |
| `<none>` | `uint256` | uint256 The derived confidence interval in output decimals scale |

### getOneFeedPrice

Returns the price from a single Pyth feed, as specified in `params_`.

This function will revert if:

- Any parameter is invalid

- The exponent calculation would result in an overflow

- The price feed's results are invalid

```solidity
function getOneFeedPrice(address, uint8 outputDecimals_, bytes calldata params_) external view returns (uint256);
```

**Parameters**

| Name              | Type      | Description                                                              |
| ----------------- | --------- | ------------------------------------------------------------------------ |
| `<none>`          | `address` |                                                                          |
| `outputDecimals_` | `uint8`   | The number of output decimals (assumed to be the same as PRICE decimals) |
| `params_`         | `bytes`   | Pyth feed parameters of type `OneFeedParams`                             |

**Returns**

| Name     | Type      | Description                                     |
| -------- | --------- | ----------------------------------------------- |
| `<none>` | `uint256` | uint256 Price in the scale of `outputDecimals_` |

### getTwoFeedPriceDiv

Returns the result of dividing the price from the first Pyth feed by the price from the second.

For example, passing in ETH/USD and DAI/USD will return the ETH/DAI price.

This function will revert if:

- Any parameter is invalid

- The exponent calculation would result in an overflow

- Any of the price feeds' results are invalid

- The denominator confidence interval is greater than or equal to the denominator price

- The derived output confidence interval exceeds `outputMaxConfidence`

```solidity
function getTwoFeedPriceDiv(address, uint8 outputDecimals_, bytes calldata params_)
    external
    view
    returns (uint256);
```

**Parameters**

| Name              | Type      | Description                                                              |
| ----------------- | --------- | ------------------------------------------------------------------------ |
| `<none>`          | `address` |                                                                          |
| `outputDecimals_` | `uint8`   | The number of output decimals (assumed to be the same as PRICE decimals) |
| `params_`         | `bytes`   | Pyth feed parameters of type `TwoFeedParams`                             |

**Returns**

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| `<none>` | `uint256` | uint256 Price in the scale of `outputDecimals_`. |

### getTwoFeedPriceMul

Returns the result of multiplying the price from the first Pyth feed by the price from the second.

For example, passing in ETH/DAI and DAI/USD will return the ETH/USD price.

This function will revert if:

- Any parameter is invalid

- The exponent calculation would result in an overflow

- Any of the price feeds' results are invalid

- The derived output confidence interval exceeds `outputMaxConfidence`

```solidity
function getTwoFeedPriceMul(address, uint8 outputDecimals_, bytes calldata params_)
    external
    view
    returns (uint256);
```

**Parameters**

| Name              | Type      | Description                                                              |
| ----------------- | --------- | ------------------------------------------------------------------------ |
| `<none>`          | `address` |                                                                          |
| `outputDecimals_` | `uint8`   | The number of output decimals (assumed to be the same as PRICE decimals) |
| `params_`         | `bytes`   | Pyth feed parameters of type `TwoFeedParams`                             |

**Returns**

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| `<none>` | `uint256` | uint256 Price in the scale of `outputDecimals_`. |

## Errors

### Pyth_ParamsInvalid

The provided parameters are invalid

```solidity
error Pyth_ParamsInvalid(bytes params_);
```

**Parameters**

| Name      | Type    | Description            |
| --------- | ------- | ---------------------- |
| `params_` | `bytes` | The encoded parameters |

### Pyth_ParamsPythInvalid

A Pyth contract address specified in the parameters is invalid

```solidity
error Pyth_ParamsPythInvalid(uint8 paramsIndex_, address feed_);
```

**Parameters**

| Name           | Type      | Description                      |
| -------------- | --------- | -------------------------------- |
| `paramsIndex_` | `uint8`   | The index of the parameter       |
| `feed_`        | `address` | The address of the Pyth contract |

### Pyth_ParamsPriceFeedIdInvalid

A price feed ID specified in the parameters is invalid

```solidity
error Pyth_ParamsPriceFeedIdInvalid(uint8 paramsIndex_, bytes32 priceFeedId_);
```

**Parameters**

| Name           | Type      | Description                |
| -------------- | --------- | -------------------------- |
| `paramsIndex_` | `uint8`   | The index of the parameter |
| `priceFeedId_` | `bytes32` | The price feed ID          |

### Pyth_ParamsUpdateThresholdInvalid

An update threshold specified in the parameters is invalid

This currently occurs if the update threshold is 0

```solidity
error Pyth_ParamsUpdateThresholdInvalid(uint8 paramsIndex_, uint48 updateThreshold_);
```

**Parameters**

| Name               | Type     | Description                |
| ------------------ | -------- | -------------------------- |
| `paramsIndex_`     | `uint8`  | The index of the parameter |
| `updateThreshold_` | `uint48` | The update threshold       |

### Pyth_ParamsMaxConfidenceInvalid

A maximum confidence specified in the parameters is invalid

This currently occurs if the maximum confidence is 0

```solidity
error Pyth_ParamsMaxConfidenceInvalid(uint8 paramsIndex_, uint256 maxConfidence_);
```

**Parameters**

| Name             | Type      | Description                                       |
| ---------------- | --------- | ------------------------------------------------- |
| `paramsIndex_`   | `uint8`   | The index of the parameter                        |
| `maxConfidence_` | `uint256` | The maximum confidence (in output decimals scale) |

### Pyth_FeedInvalid

The price feed is invalid

This is triggered if the Pyth contract call reverts,

and indicates that the feed address is not a valid Pyth contract.

```solidity
error Pyth_FeedInvalid(address pyth_, bytes32 priceFeedId_);
```

**Parameters**

| Name           | Type      | Description                      |
| -------------- | --------- | -------------------------------- |
| `pyth_`        | `address` | The address of the Pyth contract |
| `priceFeedId_` | `bytes32` | The price feed ID                |

### Pyth_FeedPriceInvalid

The price returned by the price feed is invalid

This could be because:

- The price is <= 0

```solidity
error Pyth_FeedPriceInvalid(address pyth_, bytes32 priceFeedId_, int64 price_);
```

**Parameters**

| Name           | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| `pyth_`        | `address` | The address of the Pyth contract     |
| `priceFeedId_` | `bytes32` | The price feed ID                    |
| `price_`       | `int64`   | The price returned by the price feed |

### Pyth_FeedPublishTimeStale

The data returned by the price feed is stale

This could be because:

- The price feed was last updated before the update threshold

```solidity
error Pyth_FeedPublishTimeStale(
    address pyth_, bytes32 priceFeedId_, uint256 publishTime_, uint256 thresholdTimestamp_
);
```

**Parameters**

| Name                  | Type      | Description                        |
| --------------------- | --------- | ---------------------------------- |
| `pyth_`               | `address` | The address of the Pyth contract   |
| `priceFeedId_`        | `bytes32` | The price feed ID                  |
| `publishTime_`        | `uint256` | The publish time of the price feed |
| `thresholdTimestamp_` | `uint256` | The earliest acceptable timestamp  |

### Pyth_FeedConfidenceExcessive

The confidence interval exceeds the maximum allowed

```solidity
error Pyth_FeedConfidenceExcessive(address pyth_, bytes32 priceFeedId_, uint64 confidence_, uint64 maxConfidence_);
```

**Parameters**

| Name             | Type      | Description                                                                            |
| ---------------- | --------- | -------------------------------------------------------------------------------------- |
| `pyth_`          | `address` | The address of the Pyth contract                                                       |
| `priceFeedId_`   | `bytes32` | The price feed ID                                                                      |
| `confidence_`    | `uint64`  | The confidence interval returned by the price feed (in Pyth feed scale, i.e., 10^expo) |
| `maxConfidence_` | `uint64`  | The maximum confidence interval allowed (in Pyth feed scale, i.e., 10^expo)            |

### Pyth_DerivedFeedConfidenceExcessive

The derived confidence interval exceeds the maximum allowed

```solidity
error Pyth_DerivedFeedConfidenceExcessive(uint256 confidence_, uint256 maxConfidence_);
```

**Parameters**

| Name             | Type      | Description                                                                |
| ---------------- | --------- | -------------------------------------------------------------------------- |
| `confidence_`    | `uint256` | The derived confidence interval (in output decimals scale)                 |
| `maxConfidence_` | `uint256` | The maximum derived confidence interval allowed (in output decimals scale) |

### Pyth_DerivedFeedConfidenceInvalid

The derived confidence interval is invalid

This occurs if the denominator confidence interval reaches or exceeds the denominator price.

```solidity
error Pyth_DerivedFeedConfidenceInvalid(uint256 denominatorPrice_, uint256 denominatorConfidence_);
```

**Parameters**

| Name                     | Type      | Description                                                    |
| ------------------------ | --------- | -------------------------------------------------------------- |
| `denominatorPrice_`      | `uint256` | The denominator price (in output decimals scale)               |
| `denominatorConfidence_` | `uint256` | The denominator confidence interval (in output decimals scale) |

### Pyth_ExponentPositive

The exponent from the price feed is positive, which results in loss of precision

Positive expo values should not be accepted as they cause precision loss

```solidity
error Pyth_ExponentPositive(address pyth_, bytes32 priceFeedId_, int32 expo_);
```

**Parameters**

| Name           | Type      | Description                                     |
| -------------- | --------- | ----------------------------------------------- |
| `pyth_`        | `address` | The address of the Pyth contract                |
| `priceFeedId_` | `bytes32` | The price feed ID                               |
| `expo_`        | `int32`   | The exponent from the price feed (must be <= 0) |

### Pyth_ExponentTooLarge

The exponent from the price feed is too negative, which results in overflow

Exponents more negative than -30 would cause 10\*\*-expo to overflow uint256

```solidity
error Pyth_ExponentTooLarge(address pyth_, bytes32 priceFeedId_, int32 expo_);
```

**Parameters**

| Name           | Type      | Description                      |
| -------------- | --------- | -------------------------------- |
| `pyth_`        | `address` | The address of the Pyth contract |
| `priceFeedId_` | `bytes32` | The price feed ID                |
| `expo_`        | `int32`   | The exponent from the price feed |

## Structs

### OneFeedParams

Parameters for a single Pyth price feed

```solidity
struct OneFeedParams {
    address pyth;
    bytes32 priceFeedId;
    uint48 updateThreshold;
    uint256 maxConfidence;
}
```

**Properties**

| Name              | Type      | Description                                                            |
| ----------------- | --------- | ---------------------------------------------------------------------- |
| `pyth`            | `address` | Address of the Pyth contract                                           |
| `priceFeedId`     | `bytes32` | The Pyth price feed ID                                                 |
| `updateThreshold` | `uint48`  | The maximum number of seconds elapsed since the last price feed update |
| `maxConfidence`   | `uint256` | The maximum confidence interval allowed (in output decimals scale)     |

### TwoFeedParams

Parameters for two Pyth price feeds

```solidity
struct TwoFeedParams {
    address firstPyth;
    bytes32 firstPriceFeedId;
    uint48 firstUpdateThreshold;
    uint256 firstMaxConfidence;
    address secondPyth;
    bytes32 secondPriceFeedId;
    uint48 secondUpdateThreshold;
    uint256 secondMaxConfidence;
    uint256 outputMaxConfidence;
}
```

**Properties**

| Name                    | Type      | Description                                                                               |
| ----------------------- | --------- | ----------------------------------------------------------------------------------------- |
| `firstPyth`             | `address` | First: Address of the Pyth contract                                                       |
| `firstPriceFeedId`      | `bytes32` | First: The Pyth price feed ID                                                             |
| `firstUpdateThreshold`  | `uint48`  | First: The maximum number of seconds elapsed since the last price feed update             |
| `firstMaxConfidence`    | `uint256` | First: The maximum confidence interval allowed (in output decimals scale)                 |
| `secondPyth`            | `address` | Second: Address of the Pyth contract                                                      |
| `secondPriceFeedId`     | `bytes32` | Second: The Pyth price feed ID                                                            |
| `secondUpdateThreshold` | `uint48`  | Second: The maximum number of seconds elapsed since the last price feed update            |
| `secondMaxConfidence`   | `uint256` | Second: The maximum confidence interval allowed (in output decimals scale)                |
| `outputMaxConfidence`   | `uint256` | The maximum confidence interval allowed for the derived output (in output decimals scale) |

### FeedResult

Price feed result in output decimals scale

```solidity
struct FeedResult {
    uint256 price;
    uint256 confidence;
}
```

**Properties**

| Name         | Type      | Description                                  |
| ------------ | --------- | -------------------------------------------- |
| `price`      | `uint256` | The price returned by the feed               |
| `confidence` | `uint256` | The confidence interval returned by the feed |
