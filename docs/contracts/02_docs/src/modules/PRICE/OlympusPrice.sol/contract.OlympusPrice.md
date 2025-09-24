# OlympusPrice

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/modules/PRICE/OlympusPrice.sol)

**Inherits:**
[PRICEv1](/main/contracts/docs/src/modules/PRICE/PRICE.v1.sol/abstract.PRICEv1)

Price oracle data storage contract.

## State Variables

### _scaleFactor

```solidity
uint256 internal immutable _scaleFactor;
```

## Functions

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

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|- Major version upgrade indicates breaking change to the interface.|
|`minor`|`uint8`|- Minor version change retains backward-compatible interface.|

### updateMovingAverage

Trigger an update of the moving average. Permissioned.

*This function does not have a time-gating on the observationFrequency on this contract. It is set on the Heart policy contract.
The Heart beat frequency should be set to the same value as the observationFrequency.*

```solidity
function updateMovingAverage() external override permissioned;
```

### initialize

Initialize the price module

*This function must be called after the Price module is deployed to activate it and after updating the observationFrequency
or movingAverageDuration (in certain cases) in order for the Price module to function properly.*

```solidity
function initialize(uint256[] memory startObservations_, uint48 lastObservationTime_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`startObservations_`|`uint256[]`|- Array of observations to initialize the moving average with. Must be of length numObservations.|
|`lastObservationTime_`|`uint48`|- Unix timestamp of last observation being provided (in seconds).|

### changeMovingAverageDuration

Change the moving average window (duration)

*Changing the moving average duration will erase the current observations array
and require the initialize function to be called again. Ensure that you have saved
the existing data and can re-populate before calling this function.*

```solidity
function changeMovingAverageDuration(uint48 movingAverageDuration_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`movingAverageDuration_`|`uint48`|- Moving average duration in seconds, must be a multiple of observation frequency|

### changeObservationFrequency

Change the observation frequency of the moving average (i.e. how often a new observation is taken)

*Changing the observation frequency clears existing observation data since it will not be taken at the right time intervals.
Ensure that you have saved the existing data and/or can re-populate before calling this function.*

```solidity
function changeObservationFrequency(uint48 observationFrequency_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`observationFrequency_`|`uint48`|- Observation frequency in seconds, must be a divisor of the moving average duration|

### changeUpdateThresholds

```solidity
function changeUpdateThresholds(uint48 ohmEthUpdateThreshold_, uint48 reserveEthUpdateThreshold_)
    external
    override
    permissioned;
```

### changeMinimumTargetPrice

```solidity
function changeMinimumTargetPrice(uint256 minimumTargetPrice_) external override permissioned;
```

### getCurrentPrice

Get the current price of OHM in the Reserve asset from the price feeds

```solidity
function getCurrentPrice() public view override returns (uint256);
```

### getLastPrice

Get the last stored price observation of OHM in the Reserve asset

```solidity
function getLastPrice() external view override returns (uint256);
```

### getMovingAverage

Get the moving average of OHM in the Reserve asset over the defined window (see movingAverageDuration and observationFrequency).

```solidity
function getMovingAverage() public view override returns (uint256);
```

### getTargetPrice

Get target price of OHM in the Reserve asset for the RBS system

*Returns the maximum of the moving average and the minimum target price*

```solidity
function getTargetPrice() external view override returns (uint256);
```
