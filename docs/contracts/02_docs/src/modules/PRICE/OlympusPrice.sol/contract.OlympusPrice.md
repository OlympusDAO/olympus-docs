# OlympusPrice

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/PRICE/OlympusPrice.sol)

**Inherits:** [PRICEv1](/main/contracts/docs/src/modules/PRICE/PRICE.v1.sol/abstract.PRICEv1)

Price oracle data storage contract.

## Constants

### _scaleFactor

```solidity
uint256 internal immutable _scaleFactor;
```

## Functions

<a id="constructor-kernel-aggregatorv2v3interface-uint48-aggregatorv2v3interface-uint48-uint48-uint48-uint256"></a>

### constructor

```solidity
constructor(
        Kernel kernel_,
        AggregatorV2V3Interface ohmEthPriceFeed_,
        uint48 ohmEthUpdateThreshold_,
        AggregatorV2V3Interface reserveEthPriceFeed_,
        uint48 reserveEthUpdateThreshold_,
        uint48 observationFrequency_,
        uint48 movingAverageDuration_,
        uint256 minimumTargetPrice_
    ) Module(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |
| ohmEthPriceFeed_ | `AggregatorV2V3Interface` |  |
| ohmEthUpdateThreshold_ | `uint48` |  |
| reserveEthPriceFeed_ | `AggregatorV2V3Interface` |  |
| reserveEthUpdateThreshold_ | `uint48` |  |
| observationFrequency_ | `uint48` |  |
| movingAverageDuration_ | `uint48` |  |
| minimumTargetPrice_ | `uint256` |  |

<a id="keycode"></a>

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Keycode` |  |

<a id="version"></a>

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="updatemovingaverage"></a>

### updateMovingAverage

Trigger an update of the moving average. Permissioned.

<i>

This function does not have a time-gating on the observationFrequency on this contract. It is set on the Heart policy contract.
The Heart beat frequency should be set to the same value as the observationFrequency.

</i>

```solidity
function updateMovingAverage() external override permissioned;
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
    ) external override permissioned;
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
function changeMovingAverageDuration(
        uint48 movingAverageDuration_
    ) external override permissioned;
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
function changeObservationFrequency(
        uint48 observationFrequency_
    ) external override permissioned;
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
    ) external override permissioned;
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
function changeMinimumTargetPrice(uint256 minimumTargetPrice_) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| minimumTargetPrice_ | `uint256` | - Minimum target price for RBS system with 18 decimals, expressed as number of Reserve per OHM |

<a id="getcurrentprice"></a>

### getCurrentPrice

Get the current price of OHM in the Reserve asset from the price feeds

```solidity
function getCurrentPrice() public view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="getlastprice"></a>

### getLastPrice

Get the last stored price observation of OHM in the Reserve asset

```solidity
function getLastPrice() external view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="getmovingaverage"></a>

### getMovingAverage

Get the moving average of OHM in the Reserve asset over the defined window (see movingAverageDuration and observationFrequency).

```solidity
function getMovingAverage() public view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="gettargetprice"></a>

### getTargetPrice

Get target price of OHM in the Reserve asset for the RBS system

<i>

Returns the maximum of the moving average and the minimum target price

</i>

```solidity
function getTargetPrice() external view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |
