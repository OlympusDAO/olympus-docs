# UniswapV3OracleHelper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/UniswapV3/Oracle.sol)

**Title:** UniswapV3OracleHelper

**Author:** 0xJem

Helper functions for Uniswap V3 oracles

## Constants

### TWAP_MIN_OBSERVATION_WINDOW

The minimum length of the TWAP observation window in seconds
From testing, a value under 19 seconds is rejected by `OracleLibrary.getQuoteAtTick()`
A value of 600 seconds is used to ensure the observation window is long enough to mitigate manipulation

```solidity
uint32 internal constant TWAP_MIN_OBSERVATION_WINDOW = 600;
```

## Functions

<a id="gettimeweightedtick-address-uint32"></a>

### getTimeWeightedTick

Determines the time-weighted tick

<i>

This is calculated as the difference between the tick at the end of the period and the tick at the beginning of the period, divided by the period

</i>

<i>

This function will revert if:

- The observation window is too short
- The observation window is longer than the oldest observation in the pool
- The time-weighted tick is outside the bounds of permissible ticks

</i>

```solidity
function getTimeWeightedTick(address pool_, uint32 period_) internal view returns (int56);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The address of the Uniswap V3 pool |
| period_ | `uint32` | The period (in seconds) over which to calculate the time-weighted tick |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `int56` | int56      The time-weighted tick |

<a id="gettwapratio-address-uint32"></a>

### getTWAPRatio

Returns the ratio of token1 to token0 based on the TWAP

```solidity
function getTWAPRatio(address pool_, uint32 period_) internal view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The Uniswap V3 pool |
| period_ | `uint32` | The period of the TWAP in seconds |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256         The ratio of token1 to token0 in the scale of token1 decimals |

<a id="gettwapratio-address-uint32-address-address-uint8"></a>

### getTWAPRatio

Returns the ratio of the quote token to the base token based on the TWAP

```solidity
function getTWAPRatio(
        address pool_,
        uint32 period_,
        address baseToken_,
        address quoteToken_,
        uint8 baseTokenDecimals_
    ) internal view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The Uniswap V3 pool |
| period_ | `uint32` | The period of the TWAP in seconds |
| baseToken_ | `address` | The base token |
| quoteToken_ | `address` | The quote token |
| baseTokenDecimals_ | `uint8` | The decimals of `baseToken_` |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256             The ratio of the quote token to the base token in the scale of the quote token decimals |

## Errors

### UniswapV3OracleHelper_ObservationTooShort

The observation window for `pool_` is too short

```solidity
error UniswapV3OracleHelper_ObservationTooShort(
        address pool_,
        uint32 observationWindow_,
        uint32 minObservationWindow_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The address of the pool |
| observationWindow_ | `uint32` | The observation window |
| minObservationWindow_ | `uint32` | The minimum observation window |

### UniswapV3OracleHelper_InvalidObservation

The observation window for `pool_` is invalid

```solidity
error UniswapV3OracleHelper_InvalidObservation(address pool_, uint32 observationWindow_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The address of the pool |
| observationWindow_ | `uint32` | The observation window |

### UniswapV3OracleHelper_TickOutOfBounds

The time-weighted tick is out of bounds

```solidity
error UniswapV3OracleHelper_TickOutOfBounds(
        address pool_,
        int56 timeWeightedTick_,
        int24 minTick_,
        int24 maxTick_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The address of the pool |
| timeWeightedTick_ | `int56` | The time-weighted tick |
| minTick_ | `int24` | The minimum tick |
| maxTick_ | `int24` | The maximum tick |
