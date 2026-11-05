# SimplePriceFeedStrategy

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/PRICE/submodules/strategies/SimplePriceFeedStrategy.sol)

**Inherits:** [PriceSubmodule](/main/contracts/docs/src/modules/PRICE/PRICE.v2.sol/abstract.PriceSubmodule), [ISimplePriceFeedStrategy](/main/contracts/docs/src/modules/PRICE/submodules/strategies/ISimplePriceFeedStrategy.sol/interface.ISimplePriceFeedStrategy)

**Title:** SimplePriceFeedStrategy

**Author:** 0xJem

The functions in this contract provide PRICEv2 strategies that can be used to handle

the results from multiple price feeds

## Constants

### DEVIATION_PARAMS_LENGTH

This is the expected length of bytes for the parameters to the deviation strategies

```solidity
uint8 internal constant DEVIATION_PARAMS_LENGTH = 64;
```

### DEVIATION_MIN

Represents a 0% deviation, which is invalid

```solidity
uint256 internal constant DEVIATION_MIN = 0;
```

### DEVIATION_MAX

Represents a 100% deviation, which is invalid

```solidity
uint256 internal constant DEVIATION_MAX = 10_000;
```

## Functions

<a id="constructor-module"></a>

### constructor

```solidity
constructor(Module parent_) Submodule(parent_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parent_ | `Module` |  |

<a id="subkeycode"></a>

### SUBKEYCODE

20 byte identifier for the submodule. First 5 bytes must match PARENT().

```solidity
function SUBKEYCODE() public pure override returns (SubKeycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `SubKeycode` |  |

<a id="version"></a>

### VERSION

Returns the version of the contract

```solidity
function VERSION() public pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="_getnonzeroarray-uint256"></a>

### _getNonZeroArray

Returns a new array with only the non-zero elements of the input array

```solidity
function _getNonZeroArray(uint256[] memory array_) internal pure returns (uint256[] memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| array_ | `uint256[]` | Array of uint256 values |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256[]` | uint256[]  Array of non-zero uint256 values |

<a id="_getaverageprice-uint256"></a>

### _getAveragePrice

Returns the average of the prices in the array

<i>

This function will calculate the average of all values in the array.

</i>

<i>

If non-zero values should not be included in the average, filter them prior.

</i>

```solidity
function _getAveragePrice(uint256[] memory prices_) internal pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256  The average price or 0 |

<a id="_getmedianprice-uint256"></a>

### _getMedianPrice

Returns the median of the prices in the array

<i>

This function will calculate the median of all values in the array.

</i>

<i>

It assumes that the price array is sorted in ascending order.

</i>

<i>

The function assumes there are at least 3 prices in the array.

</i>

<i>

If there are only two prices, the average of the two will be returned.

</i>

<i>

If non-zero values should not be included in the median, filter them prior.

</i>

```solidity
function _getMedianPrice(uint256[] memory prices_) internal pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256  The median price |

<a id="getfirstnonzeroprice-uint256-bytes"></a>

### getFirstNonZeroPrice

Returns the first non-zero price in the array.

<i>

Reverts if:

</i>

<i>

- The length of prices_ array is 0, which would represent a mis-configuration.

</i>

<i>

If a non-zero price cannot be found, 0 will be returned.

</i>

```solidity
function getFirstNonZeroPrice(
        uint256[] memory prices_,
        bytes memory
    ) public pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices |
| _ | `bytes` | Ignored |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The resolved price |

<a id="getaveragepriceifdeviation-uint256-bytes"></a>

### getAveragePriceIfDeviation

Returns the average if min/max prices deviate from benchmark, otherwise returns the first price

<i>

Uses average as benchmark for deviation calculation.

</i>

<i>

If no deviation detected, returns the first non-zero price.

</i>

```solidity
function getAveragePriceIfDeviation(
        uint256[] memory prices_,
        bytes memory params_
    ) public pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 2 elements) |
| params_ | `bytes` | Encoded DeviationParams struct (64 bytes) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The resolved price (average if deviation detected, first price otherwise) |

<a id="getmedianpriceifdeviation-uint256-bytes"></a>

### getMedianPriceIfDeviation

Returns the first non-zero price, or the median if prices deviate from the average

<i>

Uses median as benchmark for deviation calculation.

</i>

<i>

Falls back to getAveragePriceIfDeviation if fewer than 3 non-zero prices.

</i>

```solidity
function getMedianPriceIfDeviation(
        uint256[] memory prices_,
        bytes memory params_
    ) public pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 3 elements) |
| params_ | `bytes` | Encoded DeviationParams struct (64 bytes) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The resolved price (median if deviation detected, first price otherwise) |

<a id="getaverageprice-uint256-bytes"></a>

### getAveragePrice

Returns the average of non-zero prices in the array

<i>

Zero prices are ignored to handle failing price feeds gracefully.

</i>

<i>

In strict mode, reverts if fewer than 2 non-zero prices exist.

</i>

```solidity
function getAveragePrice(
        uint256[] memory prices_,
        bytes memory params_
    ) public pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 2 elements) |
| params_ | `bytes` | Bool encoded as bytes - must be exactly 32 bytes |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The resolved price (average of non-zero prices) |

<a id="getmedianprice-uint256-bytes"></a>

### getMedianPrice

Returns the median of non-zero prices in the array

<i>

If even number of prices, returns average of two middle values.

</i>

<i>

Zero prices are ignored to handle failing price feeds gracefully.

</i>

<i>

In strict mode, reverts if fewer than 3 non-zero prices exist.

</i>

```solidity
function getMedianPrice(
        uint256[] memory prices_,
        bytes memory params_
    ) public pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 3 elements) |
| params_ | `bytes` | Bool encoded as bytes - must be exactly 32 bytes |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The resolved price (median of non-zero prices) |

<a id="getaveragepriceexcludingdeviations-uint256-bytes"></a>

### getAveragePriceExcludingDeviations

Returns the average of prices, excluding those deviating from the average benchmark

<i>

Validates input parameters and filters outliers before computing average.

</i>

<i>

Reverts if fewer than 2 prices are provided (configuration error).

</i>

<i>

Reverts if no valid prices remain after filtering (no data error).

</i>

```solidity
function getAveragePriceExcludingDeviations(
        uint256[] memory prices_,
        bytes memory params_
    ) public pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 2 elements) |
| params_ | `bytes` | Encoded DeviationParams struct (64 bytes) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The resolved price (average of non-deviating prices) |

<a id="getmedianpriceexcludingdeviations-uint256-bytes"></a>

### getMedianPriceExcludingDeviations

Returns the median of prices, excluding those deviating from the benchmark

<i>

Validates input parameters and filters outliers before computing median.

</i>

<i>

Reverts if fewer than 3 prices are provided (configuration error).

</i>

<i>

Reverts if no valid prices remain after filtering (no data error).

</i>

```solidity
function getMedianPriceExcludingDeviations(
        uint256[] memory prices_,
        bytes memory params_
    ) public pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices from multiple feeds (minimum 3 elements) |
| params_ | `bytes` | Encoded DeviationParams struct (64 bytes) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The resolved price (median of non-deviating prices) |

<a id="_decodedeviationparams-bytes"></a>

### _decodeDeviationParams

Decodes and validates DeviationParams from calldata

<i>

Reverts if params length is invalid or deviationBps is out of bounds

</i>

```solidity
function _decodeDeviationParams(
        bytes memory params_
    ) internal pure returns (ISimplePriceFeedStrategy.DeviationParams memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| params_ | `bytes` | Encoded DeviationParams bytes |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `ISimplePriceFeedStrategy.DeviationParams` | DeviationParams  Decoded DeviationParams struct |

<a id="_filterbymediandeviationuntilstable-uint256-uint16-uint256"></a>

### _filterByMedianDeviationUntilStable

Filters prices iteratively using a median benchmark until the set is stable

<i>

Stops when no additional prices are removed or when fewer than 3 prices remain

</i>

```solidity
function _filterByMedianDeviationUntilStable(
        uint256[] memory prices_,
        uint16 deviationBps_,
        uint256 minExpectedCount_
    ) internal pure returns (uint256[] memory validPrices_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Sorted array of prices to filter |
| deviationBps_ | `uint16` | The accepted deviation in basis points |
| minExpectedCount_ | `uint256` | Minimum number of prices required (for error reporting) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| validPrices_ | `uint256[]` |       Sorted array of prices after iterative filtering |

<a id="_filterbydeviation-uint256-uint256-uint16-uint256"></a>

### _filterByDeviation

Filters prices by deviation from a benchmark value

<i>

Returns a sorted array of non-deviating prices and the count

</i>

```solidity
function _filterByDeviation(
        uint256[] memory prices_,
        uint256 benchmark_,
        uint16 deviationBps_,
        uint256 minExpectedCount_
    ) internal pure returns (uint256[] memory validPrices_, uint256 validCount_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Sorted array of prices to filter |
| benchmark_ | `uint256` | The benchmark value to check deviation against |
| deviationBps_ | `uint16` | The accepted deviation in basis points |
| minExpectedCount_ | `uint256` | Minimum number of prices required (for error reporting) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| validPrices_ | `uint256[]` |       Sorted array of non-deviating prices |
| validCount_ | `uint256` |        Number of non-deviating prices found |
