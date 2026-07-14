# SimplePriceFeedStrategy

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/modules/PRICE/submodules/strategies/SimplePriceFeedStrategy.sol)

**Inherits:**
[PriceSubmodule](/main/contracts/docs/src/modules/PRICE/PRICE.v2.sol/abstract.PriceSubmodule), [ISimplePriceFeedStrategy](/main/contracts/docs/src/modules/PRICE/submodules/strategies/ISimplePriceFeedStrategy.sol/interface.ISimplePriceFeedStrategy)

**Title:**
SimplePriceFeedStrategy

**Author:**
0xJem

SPDX-License-Identifier: AGPL-3.0
forge-lint: disable-start(mixed-case-function)

The functions in this contract provide PRICEv2 strategies that can be used to handle

the results from multiple price feeds

## State Variables

### DEVIATION_PARAMS_LENGTH

This is the expected length of bytes for the parameters to the deviation strategies

```solidity
uint8 internal constant DEVIATION_PARAMS_LENGTH = 64
```

### DEVIATION_MIN

Represents a 0% deviation, which is invalid

```solidity
uint256 internal constant DEVIATION_MIN = 0
```

### DEVIATION_MAX

Represents a 100% deviation, which is invalid

```solidity
uint256 internal constant DEVIATION_MAX = 10_000
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

### \_getNonZeroArray

Returns a new array with only the non-zero elements of the input array

```solidity
function _getNonZeroArray(uint256[] memory array_) internal pure returns (uint256[] memory);
```

**Parameters**

| Name     | Type        | Description             |
| -------- | ----------- | ----------------------- |
| `array_` | `uint256[]` | Array of uint256 values |

**Returns**

| Name     | Type        | Description                                |
| -------- | ----------- | ------------------------------------------ |
| `<none>` | `uint256[]` | uint256[] Array of non-zero uint256 values |

### \_getAveragePrice

Returns the average of the prices in the array

This function will calculate the average of all values in the array.

If non-zero values should not be included in the average, filter them prior.

```solidity
function _getAveragePrice(uint256[] memory prices_) internal pure returns (uint256);
```

**Parameters**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `prices_` | `uint256[]` | Array of prices |

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `<none>` | `uint256` | uint256 The average price or 0 |

### \_getMedianPrice

Returns the median of the prices in the array

This function will calculate the median of all values in the array.

It assumes that the price array is sorted in ascending order.

The function assumes there are at least 3 prices in the array.

If there are only two prices, the average of the two will be returned.

If non-zero values should not be included in the median, filter them prior.

```solidity
function _getMedianPrice(uint256[] memory prices_) internal pure returns (uint256);
```

**Parameters**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `prices_` | `uint256[]` | Array of prices |

**Returns**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `<none>` | `uint256` | uint256 The median price |

### getFirstNonZeroPrice

Returns the first non-zero price in the array.

Reverts if:

- The length of prices\_ array is 0, which would represent a mis-configuration.

If a non-zero price cannot be found, 0 will be returned.

```solidity
function getFirstNonZeroPrice(uint256[] memory prices_, bytes memory) public pure returns (uint256);
```

**Parameters**

| Name      | Type        | Description     |
| --------- | ----------- | --------------- |
| `prices_` | `uint256[]` | Array of prices |
| `<none>`  | `bytes`     |                 |

**Returns**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `<none>` | `uint256` | price The resolved price |

### getAveragePriceIfDeviation

Returns the average if min/max prices deviate from benchmark, otherwise returns the first price

Uses average as benchmark for deviation calculation.

If no deviation detected, returns the first non-zero price.

```solidity
function getAveragePriceIfDeviation(uint256[] memory prices_, bytes memory params_) public pure returns (uint256);
```

**Parameters**

| Name      | Type        | Description                                              |
| --------- | ----------- | -------------------------------------------------------- |
| `prices_` | `uint256[]` | Array of prices from multiple feeds (minimum 2 elements) |
| `params_` | `bytes`     | Encoded DeviationParams struct (64 bytes)                |

**Returns**

| Name     | Type      | Description                                                                     |
| -------- | --------- | ------------------------------------------------------------------------------- |
| `<none>` | `uint256` | price The resolved price (average if deviation detected, first price otherwise) |

### getMedianPriceIfDeviation

Returns the first non-zero price, or the median if prices deviate from the average

Uses median as benchmark for deviation calculation.

Falls back to getAveragePriceIfDeviation if fewer than 3 non-zero prices.

```solidity
function getMedianPriceIfDeviation(uint256[] memory prices_, bytes memory params_) public pure returns (uint256);
```

**Parameters**

| Name      | Type        | Description                                              |
| --------- | ----------- | -------------------------------------------------------- |
| `prices_` | `uint256[]` | Array of prices from multiple feeds (minimum 3 elements) |
| `params_` | `bytes`     | Encoded DeviationParams struct (64 bytes)                |

**Returns**

| Name     | Type      | Description                                                                    |
| -------- | --------- | ------------------------------------------------------------------------------ |
| `<none>` | `uint256` | price The resolved price (median if deviation detected, first price otherwise) |

### getAveragePrice

Returns the average of non-zero prices in the array

Zero prices are ignored to handle failing price feeds gracefully.

In strict mode, reverts if fewer than 2 non-zero prices exist.

```solidity
function getAveragePrice(uint256[] memory prices_, bytes memory params_) public pure returns (uint256);
```

**Parameters**

| Name      | Type        | Description                                              |
| --------- | ----------- | -------------------------------------------------------- |
| `prices_` | `uint256[]` | Array of prices from multiple feeds (minimum 2 elements) |
| `params_` | `bytes`     | Bool encoded as bytes - must be exactly 32 bytes         |

**Returns**

| Name     | Type      | Description                                           |
| -------- | --------- | ----------------------------------------------------- |
| `<none>` | `uint256` | price The resolved price (average of non-zero prices) |

### getMedianPrice

Returns the median of non-zero prices in the array

If even number of prices, returns average of two middle values.

Zero prices are ignored to handle failing price feeds gracefully.

In strict mode, reverts if fewer than 3 non-zero prices exist.

```solidity
function getMedianPrice(uint256[] memory prices_, bytes memory params_) public pure returns (uint256);
```

**Parameters**

| Name      | Type        | Description                                              |
| --------- | ----------- | -------------------------------------------------------- |
| `prices_` | `uint256[]` | Array of prices from multiple feeds (minimum 3 elements) |
| `params_` | `bytes`     | Bool encoded as bytes - must be exactly 32 bytes         |

**Returns**

| Name     | Type      | Description                                          |
| -------- | --------- | ---------------------------------------------------- |
| `<none>` | `uint256` | price The resolved price (median of non-zero prices) |

### getAveragePriceExcludingDeviations

Returns the average of prices, excluding those deviating from the average benchmark

Validates input parameters and filters outliers before computing average.

Reverts if fewer than 2 prices are provided (configuration error).

Reverts if no valid prices remain after filtering (no data error).

```solidity
function getAveragePriceExcludingDeviations(uint256[] memory prices_, bytes memory params_)
    public
    pure
    returns (uint256);
```

**Parameters**

| Name      | Type        | Description                                              |
| --------- | ----------- | -------------------------------------------------------- |
| `prices_` | `uint256[]` | Array of prices from multiple feeds (minimum 2 elements) |
| `params_` | `bytes`     | Encoded DeviationParams struct (64 bytes)                |

**Returns**

| Name     | Type      | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `<none>` | `uint256` | price The resolved price (average of non-deviating prices) |

### getMedianPriceExcludingDeviations

Returns the median of prices, excluding those deviating from the benchmark

Validates input parameters and filters outliers before computing median.

Reverts if fewer than 3 prices are provided (configuration error).

Reverts if no valid prices remain after filtering (no data error).

```solidity
function getMedianPriceExcludingDeviations(uint256[] memory prices_, bytes memory params_)
    public
    pure
    returns (uint256);
```

**Parameters**

| Name      | Type        | Description                                              |
| --------- | ----------- | -------------------------------------------------------- |
| `prices_` | `uint256[]` | Array of prices from multiple feeds (minimum 3 elements) |
| `params_` | `bytes`     | Encoded DeviationParams struct (64 bytes)                |

**Returns**

| Name     | Type      | Description                                               |
| -------- | --------- | --------------------------------------------------------- |
| `<none>` | `uint256` | price The resolved price (median of non-deviating prices) |

### \_decodeDeviationParams

Decodes and validates DeviationParams from calldata

Reverts if params length is invalid or deviationBps is out of bounds

```solidity
function _decodeDeviationParams(bytes memory params_)
    internal
    pure
    returns (ISimplePriceFeedStrategy.DeviationParams memory);
```

**Parameters**

| Name      | Type    | Description                   |
| --------- | ------- | ----------------------------- |
| `params_` | `bytes` | Encoded DeviationParams bytes |

**Returns**

| Name     | Type                                       | Description                                    |
| -------- | ------------------------------------------ | ---------------------------------------------- |
| `<none>` | `ISimplePriceFeedStrategy.DeviationParams` | DeviationParams Decoded DeviationParams struct |

### \_filterByMedianDeviationUntilStable

Filters prices iteratively using a median benchmark until the set is stable

Stops when no additional prices are removed or when fewer than 3 prices remain

```solidity
function _filterByMedianDeviationUntilStable(
    uint256[] memory prices_,
    uint16 deviationBps_,
    uint256 minExpectedCount_
) internal pure returns (uint256[] memory validPrices_);
```

**Parameters**

| Name                | Type        | Description                                             |
| ------------------- | ----------- | ------------------------------------------------------- |
| `prices_`           | `uint256[]` | Sorted array of prices to filter                        |
| `deviationBps_`     | `uint16`    | The accepted deviation in basis points                  |
| `minExpectedCount_` | `uint256`   | Minimum number of prices required (for error reporting) |

**Returns**

| Name           | Type        | Description                                      |
| -------------- | ----------- | ------------------------------------------------ |
| `validPrices_` | `uint256[]` | Sorted array of prices after iterative filtering |

### \_filterByDeviation

Filters prices by deviation from a benchmark value

Returns a sorted array of non-deviating prices and the count

```solidity
function _filterByDeviation(
    uint256[] memory prices_,
    uint256 benchmark_,
    uint16 deviationBps_,
    uint256 minExpectedCount_
) internal pure returns (uint256[] memory validPrices_, uint256 validCount_);
```

**Parameters**

| Name                | Type        | Description                                             |
| ------------------- | ----------- | ------------------------------------------------------- |
| `prices_`           | `uint256[]` | Sorted array of prices to filter                        |
| `benchmark_`        | `uint256`   | The benchmark value to check deviation against          |
| `deviationBps_`     | `uint16`    | The accepted deviation in basis points                  |
| `minExpectedCount_` | `uint256`   | Minimum number of prices required (for error reporting) |

**Returns**

| Name           | Type        | Description                          |
| -------------- | ----------- | ------------------------------------ |
| `validPrices_` | `uint256[]` | Sorted array of non-deviating prices |
| `validCount_`  | `uint256`   | Number of non-deviating prices found |
