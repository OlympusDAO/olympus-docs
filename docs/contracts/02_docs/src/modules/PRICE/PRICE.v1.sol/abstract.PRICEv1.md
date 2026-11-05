# PRICEv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/PRICE/PRICE.v1.sol)

**Inherits:** [Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

Price oracle data storage

<i>

The Olympus Price Oracle contract provides a standard interface for OHM price data against a reserve asset.
It also implements a moving average price calculation (same as a TWAP) on the price feed data over a configured
duration and observation frequency. The data provided by this contract is used by the Olympus Range Operator to
perform market operations. The Olympus Price Oracle is updated each epoch by the Olympus Heart contract.

</i>

## Constants

### decimals

Number of decimals in the price values provided by the contract.

```solidity
uint8 public constant decimals = 18;
```

## State Variables

### ohmEthPriceFeed

<i>

Price feeds. Chainlink typically provides price feeds for an asset in ETH. Therefore, we use two price feeds against ETH, one for OHM and one for the Reserve asset, to calculate the relative price of OHM in the Reserve asset.

</i>

<i>

Update thresholds are the maximum amount of time that can pass between price feed updates before the price oracle is considered stale. These should be set based on the parameters of the price feed.

</i>

OHM/ETH price feed

```solidity
AggregatorV2V3Interface public ohmEthPriceFeed;
```

### ohmEthUpdateThreshold

Maximum expected time between OHM/ETH price feed updates

```solidity
uint48 public ohmEthUpdateThreshold;
```

### reserveEthPriceFeed

Reserve/ETH price feed

```solidity
AggregatorV2V3Interface public reserveEthPriceFeed;
```

### reserveEthUpdateThreshold

Maximum expected time between OHM/ETH price feed updates

```solidity
uint48 public reserveEthUpdateThreshold;
```

### cumulativeObs

Running sum of observations to calculate the moving average price from

<i>

See getMovingAverage()

</i>

```solidity
uint256 public cumulativeObs;
```

### observations

Array of price observations. Check nextObsIndex to determine latest data point.

<i>

Observations are stored in a ring buffer where the moving average is the sum of all observations divided by the number of observations.
Observations can be cleared by changing the movingAverageDuration or observationFrequency and must be re-initialized.

</i>

```solidity
uint256[] public observations;
```

### nextObsIndex

Index of the next observation to make. The current value at this index is the oldest observation.

```solidity
uint32 public nextObsIndex;
```

### numObservations

Number of observations used in the moving average calculation. Computed from movingAverageDuration / observationFrequency.

```solidity
uint32 public numObservations;
```

### observationFrequency

Frequency (in seconds) that observations should be stored.

```solidity
uint48 public observationFrequency;
```

### movingAverageDuration

Duration (in seconds) over which the moving average is calculated.

```solidity
uint48 public movingAverageDuration;
```

### lastObservationTime

Unix timestamp of last observation (in seconds).

```solidity
uint48 public lastObservationTime;
```

### initialized

Whether the price module is initialized (and therefore active).

```solidity
bool public initialized;
```

### minimumTargetPrice

Minimum target price for RBS system. Set manually to correspond to the liquid backing of OHM.

```solidity
uint256 public minimumTargetPrice;
```

## Functions

<a id="updatemovingaverage"></a>

### updateMovingAverage

Trigger an update of the moving average. Permissioned.

<i>

This function does not have a time-gating on the observationFrequency on this contract. It is set on the Heart policy contract.
The Heart beat frequency should be set to the same value as the observationFrequency.

</i>

```solidity
function updateMovingAverage() external virtual;
```

<a id="initialize-uint256-uint48"></a>

### initialize

Initialize the price module

Access restricted to activated policies

<i>

This function must be called after the Price module is deployed to activate it and after updating the observationFrequency
or movingAverageDuration (in certain cases) in order for the Price module to function properly.

</i>

```solidity
function initialize(
        uint256[] memory startObservations_,
        uint48 lastObservationTime_
    ) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| startObservations_ | `uint256[]` | - Array of observations to initialize the moving average with. Must be of length numObservations. |
| lastObservationTime_ | `uint48` | - Unix timestamp of last observation being provided (in seconds). |

<a id="changemovingaverageduration-uint48"></a>

### changeMovingAverageDuration

Change the moving average window (duration)

<i>

Changing the moving average duration will erase the current observations array
and require the initialize function to be called again. Ensure that you have saved
the existing data and can re-populate before calling this function.

</i>

```solidity
function changeMovingAverageDuration(uint48 movingAverageDuration_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| movingAverageDuration_ | `uint48` | - Moving average duration in seconds, must be a multiple of observation frequency |

<a id="changeobservationfrequency-uint48"></a>

### changeObservationFrequency

Change the observation frequency of the moving average (i.e. how often a new observation is taken)

<i>

Changing the observation frequency clears existing observation data since it will not be taken at the right time intervals.
Ensure that you have saved the existing data and/or can re-populate before calling this function.

</i>

```solidity
function changeObservationFrequency(uint48 observationFrequency_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| observationFrequency_ | `uint48` | - Observation frequency in seconds, must be a divisor of the moving average duration |

<a id="changeupdatethresholds-uint48-uint48"></a>

### changeUpdateThresholds

Change the update thresholds for the price feeds

<i>

The update thresholds should be set based on the update threshold of the chainlink oracles.

</i>

```solidity
function changeUpdateThresholds(
        uint48 ohmEthUpdateThreshold_,
        uint48 reserveEthUpdateThreshold_
    ) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| ohmEthUpdateThreshold_ | `uint48` | - Maximum allowed time between OHM/ETH price feed updates |
| reserveEthUpdateThreshold_ | `uint48` | - Maximum allowed time between Reserve/ETH price feed updates |

<a id="changeminimumtargetprice-uint256"></a>

### changeMinimumTargetPrice

Change the minimum target price

<i>

The minimum target price should be set based on the liquid backing of OHM.

</i>

```solidity
function changeMinimumTargetPrice(uint256 minimumTargetPrice_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| minimumTargetPrice_ | `uint256` | - Minimum target price for RBS system with 18 decimals, expressed as number of Reserve per OHM |

<a id="getcurrentprice"></a>

### getCurrentPrice

Get the current price of OHM in the Reserve asset from the price feeds

```solidity
function getCurrentPrice() external view virtual returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="getlastprice"></a>

### getLastPrice

Get the last stored price observation of OHM in the Reserve asset

```solidity
function getLastPrice() external view virtual returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="getmovingaverage"></a>

### getMovingAverage

Get the moving average of OHM in the Reserve asset over the defined window (see movingAverageDuration and observationFrequency).

```solidity
function getMovingAverage() external view virtual returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="gettargetprice"></a>

### getTargetPrice

Get target price of OHM in the Reserve asset for the RBS system

<i>

Returns the maximum of the moving average and the minimum target price

</i>

```solidity
function getTargetPrice() external view virtual returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

## Events

### NewObservation

```solidity
event NewObservation(uint256 timestamp_, uint256 price_, uint256 movingAverage_);
```

**Parameters**

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| timestamp_     | `uint256` |             |
| price_         | `uint256` |             |
| movingAverage_ | `uint256` |             |

### MovingAverageDurationChanged

```solidity
event MovingAverageDurationChanged(uint48 movingAverageDuration_);
```

**Parameters**

| Name                   | Type     | Description |
| ---------------------- | -------- | ----------- |
| movingAverageDuration_ | `uint48` |             |

### ObservationFrequencyChanged

```solidity
event ObservationFrequencyChanged(uint48 observationFrequency_);
```

**Parameters**

| Name                  | Type     | Description |
| --------------------- | -------- | ----------- |
| observationFrequency_ | `uint48` |             |

### UpdateThresholdsChanged

```solidity
event UpdateThresholdsChanged(uint48 ohmEthUpdateThreshold_, uint48 reserveEthUpdateThreshold_);
```

**Parameters**

| Name                       | Type     | Description |
| -------------------------- | -------- | ----------- |
| ohmEthUpdateThreshold_     | `uint48` |             |
| reserveEthUpdateThreshold_ | `uint48` |             |

### MinimumTargetPriceChanged

```solidity
event MinimumTargetPriceChanged(uint256 minimumTargetPrice_);
```

**Parameters**

| Name                | Type      | Description |
| ------------------- | --------- | ----------- |
| minimumTargetPrice_ | `uint256` |             |

## Errors

### Price_InvalidParams

```solidity
error Price_InvalidParams();
```

### Price_NotInitialized

```solidity
error Price_NotInitialized();
```

### Price_AlreadyInitialized

```solidity
error Price_AlreadyInitialized();
```

### Price_BadFeed

```solidity
error Price_BadFeed(address priceFeed);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| priceFeed | `address` |             |
