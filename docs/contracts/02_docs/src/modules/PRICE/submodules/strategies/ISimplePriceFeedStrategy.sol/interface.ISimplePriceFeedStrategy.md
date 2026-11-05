# ISimplePriceFeedStrategy

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/PRICE/submodules/strategies/ISimplePriceFeedStrategy.sol)

**Title:** Interface for simple price aggregation strategies

## Functions

<a id="getfirstnonzeroprice-uint256-bytes"></a>

### getFirstNonZeroPrice

Returns the first non-zero price in the array.

```solidity
function getFirstNonZeroPrice(
        uint256[] memory prices_,
        bytes memory params_
    ) external pure returns (uint256 price);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices |
| params_ | `bytes` | Ignored |

**Returns**

| Name  | Type      | Description        |
| ----- | --------- | ------------------ |
| price | `uint256` | The resolved price |

<a id="getaverageprice-uint256-bytes"></a>

### getAveragePrice

Returns the average of non-zero prices in the array

```solidity
function getAveragePrice(
        uint256[] memory prices_,
        bytes memory params_
    ) external pure returns (uint256 price);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 2 elements) |
| params_ | `bytes` | Bool encoded as bytes - must be exactly 32 bytes |

**Returns**

| Name  | Type      | Description                                     |
| ----- | --------- | ----------------------------------------------- |
| price | `uint256` | The resolved price (average of non-zero prices) |

<a id="getmedianprice-uint256-bytes"></a>

### getMedianPrice

Returns the median of non-zero prices in the array

```solidity
function getMedianPrice(
        uint256[] memory prices_,
        bytes memory params_
    ) external pure returns (uint256 price);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 3 elements) |
| params_ | `bytes` | Bool encoded as bytes - must be exactly 32 bytes |

**Returns**

| Name  | Type      | Description                                    |
| ----- | --------- | ---------------------------------------------- |
| price | `uint256` | The resolved price (median of non-zero prices) |

<a id="getaveragepriceexcludingdeviations-uint256-bytes"></a>

### getAveragePriceExcludingDeviations

Returns the average of prices, excluding those deviating from the average benchmark

<i>

Iteratively filters out deviating prices and returns the average of remaining prices.

</i>

<i>

This is a "consensus" strategy - outliers are removed until all remaining prices agree.

</i>

```solidity
function getAveragePriceExcludingDeviations(
        uint256[] memory prices_,
        bytes memory params_
    ) external pure returns (uint256 price);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 2 elements) |
| params_ | `bytes` | Encoded DeviationParams struct (64 bytes) |

**Returns**

| Name  | Type      | Description                                          |
| ----- | --------- | ---------------------------------------------------- |
| price | `uint256` | The resolved price (average of non-deviating prices) |

<a id="getaveragepriceifdeviation-uint256-bytes"></a>

### getAveragePriceIfDeviation

Returns the average if min/max prices deviate from benchmark, otherwise returns the first price

<i>

Checks if min or max prices deviate from the average. Returns average if deviation detected, otherwise first price.

</i>

<i>

This is a "deviation check" strategy - single check to decide between two return values.

</i>

```solidity
function getAveragePriceIfDeviation(
        uint256[] memory prices_,
        bytes memory params_
    ) external pure returns (uint256 price);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 2 elements) |
| params_ | `bytes` | Encoded DeviationParams struct (64 bytes) |

**Returns**

| Name  | Type      | Description                                                               |
| ----- | --------- | ------------------------------------------------------------------------- |
| price | `uint256` | The resolved price (average if deviation detected, first price otherwise) |

<a id="getmedianpriceifdeviation-uint256-bytes"></a>

### getMedianPriceIfDeviation

Returns the first non-zero price, or the median if prices deviate from the average

<i>

Checks if min or max prices deviate from the average. Returns median if deviation detected, otherwise first price.

</i>

```solidity
function getMedianPriceIfDeviation(
        uint256[] memory prices_,
        bytes memory params_
    ) external pure returns (uint256 price);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 3 elements) |
| params_ | `bytes` | Encoded DeviationParams struct (64 bytes) |

**Returns**

| Name  | Type      | Description                                                              |
| ----- | --------- | ------------------------------------------------------------------------ |
| price | `uint256` | The resolved price (median if deviation detected, first price otherwise) |

<a id="getmedianpriceexcludingdeviations-uint256-bytes"></a>

### getMedianPriceExcludingDeviations

Returns the median of prices, excluding those deviating from the benchmark

<i>

Iteratively filters out deviating prices and returns the median of remaining prices.

</i>

<i>

This is a "consensus" strategy - outliers are removed until all remaining prices agree.

</i>

```solidity
function getMedianPriceExcludingDeviations(
        uint256[] memory prices_,
        bytes memory params_
    ) external pure returns (uint256 price);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 3 elements) |
| params_ | `bytes` | Encoded DeviationParams struct (64 bytes) |

**Returns**

| Name  | Type      | Description                                         |
| ----- | --------- | --------------------------------------------------- |
| price | `uint256` | The resolved price (median of non-deviating prices) |

## Errors

### SimpleStrategy_PriceCountInvalid

Indicates that the number of prices provided to the strategy is invalid

```solidity
error SimpleStrategy_PriceCountInvalid(uint256 priceCount_, uint256 minPriceCount_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| priceCount_ | `uint256` | The number of prices provided to the strategy |
| minPriceCount_ | `uint256` | The minimum number of prices required by the strategy |

### SimpleStrategy_ParamsInvalid

Indicates that the parameters provided to the strategy are invalid

```solidity
error SimpleStrategy_ParamsInvalid(bytes params_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| params_ | `bytes` | The parameters provided to the strategy |

## Structs

### DeviationParams

Parameters for deviation-based price aggregation strategies

```solidity
struct DeviationParams {
        uint16 deviationBps;
        bool revertOnInsufficientCount;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| deviationBps | `uint16` | Deviation threshold in basis points (100 = 1%, max 9999) |
| revertOnInsufficientCount | `bool` | If true, revert when there are an insufficient number of valid prices. Otherwise, a best effort is made to return a price. |
