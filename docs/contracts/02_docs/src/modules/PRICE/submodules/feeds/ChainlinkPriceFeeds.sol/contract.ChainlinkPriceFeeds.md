# ChainlinkPriceFeeds

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/modules/PRICE/submodules/feeds/ChainlinkPriceFeeds.sol)

**Inherits:**
[PriceSubmodule](/main/contracts/docs/src/modules/PRICE/PRICE.v2.sol/abstract.PriceSubmodule)

**Title:**
ChainlinkPriceFeeds

**Author:**
0xJem

forge-lint: disable-start(mixed-case-function)

Provides prices derived from Chainlink price feed(s)

## State Variables

### BASE_10_MAX_EXPONENT

Any token or pool with a decimal scale greater than this would result in an overflow

```solidity
uint8 internal constant BASE_10_MAX_EXPONENT = 50
```

### ONE_FEED_PARAMS_LENGTH

The expected length of the encoded one feed parameters (address + uint48 = 64 bytes)

```solidity
uint256 internal constant ONE_FEED_PARAMS_LENGTH = 64
```

### TWO_FEED_PARAMS_LENGTH

The expected length of the encoded two feed parameters (2x address + 2x uint48 = 128 bytes)

```solidity
uint256 internal constant TWO_FEED_PARAMS_LENGTH = 128
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

- Answer <= 0

- Updated at timestamp before the update threshold from the current time

```solidity
function _validatePriceFeedResult(
    AggregatorV2V3Interface feed_,
    FeedRoundData memory roundData,
    uint256 blockTimestamp,
    uint256 paramsUpdateThreshold
) internal pure;
```

**Parameters**

| Name                    | Type                      | Description                                                            |
| ----------------------- | ------------------------- | ---------------------------------------------------------------------- |
| `feed_`                 | `AggregatorV2V3Interface` | Chainlink price feed                                                   |
| `roundData`             | `FeedRoundData`           | The round data returned by the price feed                              |
| `blockTimestamp`        | `uint256`                 | The current block timestamp                                            |
| `paramsUpdateThreshold` | `uint256`                 | The maximum number of seconds elapsed since the last price feed update |

### \_getFeedPrice

Retrieves the latest price returned by the specified Chainlink price feed.

The result is validated using `_validatePriceFeedResult`, and will revert if invalid

```solidity
function _getFeedPrice(
    AggregatorV2V3Interface feed_,
    uint256 updateThreshold_,
    uint8 feedDecimals_,
    uint8 outputDecimals_
) internal view returns (uint256);
```

**Parameters**

| Name               | Type                      | Description                                                            |
| ------------------ | ------------------------- | ---------------------------------------------------------------------- |
| `feed_`            | `AggregatorV2V3Interface` | Chainlink price feed                                                   |
| `updateThreshold_` | `uint256`                 | The maximum number of seconds elapsed since the last price feed update |
| `feedDecimals_`    | `uint8`                   | The number of decimals of the price feed                               |
| `outputDecimals_`  | `uint8`                   | The number of decimals to return the price in                          |

**Returns**

| Name     | Type      | Description                                                   |
| -------- | --------- | ------------------------------------------------------------- |
| `<none>` | `uint256` | uint256 The validated price in the scale of `outputDecimals_` |

### getOneFeedPrice

Returns the price from a single Chainlink feed, as specified in `params_`.

This function will revert if:

- PRICE's priceDecimals or the feed's decimals are out of bounds and would lead to an overflow

- The price feed's results are invalid

```solidity
function getOneFeedPrice(address, uint8 outputDecimals_, bytes calldata params_) external view returns (uint256);
```

**Parameters**

| Name              | Type      | Description                                                              |
| ----------------- | --------- | ------------------------------------------------------------------------ |
| `<none>`          | `address` |                                                                          |
| `outputDecimals_` | `uint8`   | The number of output decimals (assumed to be the same as PRICE decimals) |
| `params_`         | `bytes`   | Chainlink pool parameters of type `OneFeedParams`                        |

**Returns**

| Name     | Type      | Description                                     |
| -------- | --------- | ----------------------------------------------- |
| `<none>` | `uint256` | uint256 Price in the scale of `outputDecimals_` |

### getTwoFeedPriceDiv

Returns the result of dividing the price from the first Chainlink feed by the price from the second.

For example, passing in ETH-DAI and USD-DAI will return the ETH-USD price.

This function will revert if:

- PRICE's priceDecimals or any of the feed's decimals are out of bounds and would lead to an overflow

- Any of the price feeds' results are invalid

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
| `params_`         | `bytes`   | Chainlink pool parameters of type `TwoFeedParams`                        |

**Returns**

| Name     | Type      | Description                                     |
| -------- | --------- | ----------------------------------------------- |
| `<none>` | `uint256` | uint256 Price in the scale of `outputDecimals_` |

### getTwoFeedPriceMul

Returns the result of multiplying the price from the first Chainlink feed by the price from the second.

For example, passing in ETH-DAI and DAI-USD will return the ETH-USD price.

This function will revert if:

- PRICE's priceDecimals or any of the feed's decimals are out of bounds and would lead to an overflow

- Any of the price feeds' results are invalid

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
| `params_`         | `bytes`   | Chainlink pool parameters of type `TwoFeedParams`                        |

**Returns**

| Name     | Type      | Description                                     |
| -------- | --------- | ----------------------------------------------- |
| `<none>` | `uint256` | uint256 Price in the scale of `outputDecimals_` |

## Errors

### Chainlink_ParamsInvalid

The provided parameters are invalid

```solidity
error Chainlink_ParamsInvalid(bytes params_);
```

**Parameters**

| Name      | Type    | Description            |
| --------- | ------- | ---------------------- |
| `params_` | `bytes` | The encoded parameters |

### Chainlink_FeedDecimalsOutOfBounds

The number of decimals of the price feed is greater than the maximum allowed

```solidity
error Chainlink_FeedDecimalsOutOfBounds(address feed_, uint8 feedDecimals_, uint8 maxDecimals_);
```

**Parameters**

| Name            | Type      | Description                              |
| --------------- | --------- | ---------------------------------------- |
| `feed_`         | `address` | The address of the price feed            |
| `feedDecimals_` | `uint8`   | The number of decimals of the price feed |
| `maxDecimals_`  | `uint8`   | The maximum number of decimals allowed   |

### Chainlink_FeedPriceInvalid

The price returned by the price feed is invalid

This could be because:

- The price is <= 0

```solidity
error Chainlink_FeedPriceInvalid(address feed_, int256 price_);
```

**Parameters**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `feed_`  | `address` | The address of the price feed        |
| `price_` | `int256`  | The price returned by the price feed |

### Chainlink_FeedRoundStale

The data returned by the price feed is stale

This could be because:

- The price feed was last updated before the update threshold

```solidity
error Chainlink_FeedRoundStale(address feed_, uint256 roundTimestamp_, uint256 thresholdTimestamp_);
```

**Parameters**

| Name                  | Type      | Description                                           |
| --------------------- | --------- | ----------------------------------------------------- |
| `feed_`               | `address` | The address of the price feed                         |
| `roundTimestamp_`     | `uint256` | The timestamp of the round returned by the price feed |
| `thresholdTimestamp_` | `uint256` | The earliest acceptable timestamp                     |

### Chainlink_ParamsFeedInvalid

A price feed specified in the parameters is invalid

```solidity
error Chainlink_ParamsFeedInvalid(uint8 paramsIndex_, address feed_);
```

**Parameters**

| Name           | Type      | Description                   |
| -------------- | --------- | ----------------------------- |
| `paramsIndex_` | `uint8`   | The index of the parameter    |
| `feed_`        | `address` | The address of the price feed |

### Chainlink_ParamsUpdateThresholdInvalid

An update threshold specified in the parameters is invalid

This currently occurs if the update threshold is 0

```solidity
error Chainlink_ParamsUpdateThresholdInvalid(uint8 paramsIndex_, uint48 updateThreshold_);
```

**Parameters**

| Name               | Type     | Description                |
| ------------------ | -------- | -------------------------- |
| `paramsIndex_`     | `uint8`  | The index of the parameter |
| `updateThreshold_` | `uint48` | The update threshold       |

### Chainlink_FeedInvalid

The price feed is invalid

This is triggered if the price feed reverted when called,

and indicates that the feed address is not a Chainlink price feed.

```solidity
error Chainlink_FeedInvalid(address feed_);
```

**Parameters**

| Name    | Type      | Description                   |
| ------- | --------- | ----------------------------- |
| `feed_` | `address` | The address of the price feed |

### Chainlink_OutputDecimalsOutOfBounds

The number of decimals to return the price in is greater than the maximum allowed

```solidity
error Chainlink_OutputDecimalsOutOfBounds(uint8 outputDecimals_, uint8 maxDecimals_);
```

**Parameters**

| Name              | Type    | Description                                   |
| ----------------- | ------- | --------------------------------------------- |
| `outputDecimals_` | `uint8` | The number of decimals to return the price in |
| `maxDecimals_`    | `uint8` | The maximum number of decimals allowed        |

## Structs

### OneFeedParams

Parameters for a single Chainlink price feed

```solidity
struct OneFeedParams {
    AggregatorV2V3Interface feed;
    uint48 updateThreshold;
}
```

**Properties**

| Name              | Type                      | Description                                                            |
| ----------------- | ------------------------- | ---------------------------------------------------------------------- |
| `feed`            | `AggregatorV2V3Interface` | Address of the Chainlink price feed                                    |
| `updateThreshold` | `uint48`                  | The maximum number of seconds elapsed since the last price feed update |

### TwoFeedParams

Parameters for a two Chainlink price feeds

```solidity
struct TwoFeedParams {
    AggregatorV2V3Interface firstFeed;
    uint48 firstUpdateThreshold;
    AggregatorV2V3Interface secondFeed;
    uint48 secondUpdateThreshold;
}
```

**Properties**

| Name                    | Type                      | Description                                                                    |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------------ |
| `firstFeed`             | `AggregatorV2V3Interface` | First: Address of the Chainlink price feed                                     |
| `firstUpdateThreshold`  | `uint48`                  | First: The maximum number of seconds elapsed since the last price feed update  |
| `secondFeed`            | `AggregatorV2V3Interface` | Second: Address of the Chainlink price feed                                    |
| `secondUpdateThreshold` | `uint48`                  | Second: The maximum number of seconds elapsed since the last price feed update |

### FeedRoundData

Struct to represent data returned by the Chainlink price feed

```solidity
struct FeedRoundData {
    uint80 roundId;
    int256 priceInt;
    uint256 startedAt;
    uint256 updatedAt;
}
```
