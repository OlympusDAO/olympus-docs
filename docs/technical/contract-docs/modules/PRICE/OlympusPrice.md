# OlympusPrice





Price oracle data storage contract.



## Methods

### INIT

```solidity
function INIT() external nonpayable
```

Initialization function for the module

*This function is called when the module is installed or upgraded by the kernel.MUST BE GATED BY onlyKernel. Used to encompass any initialization or upgrade logic.*


### KEYCODE

```solidity
function KEYCODE() external pure returns (Keycode)
```

5 byte identifier for a module.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |

### VERSION

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor)
```

Returns which semantic version of a module is being implemented.




#### Returns

| Name | Type | Description |
|---|---|---|
| major | uint8 | - Major version upgrade indicates breaking change to the interface. |
| minor | uint8 | - Minor version change retains backward-compatible interface. |

### changeKernel

```solidity
function changeKernel(contract Kernel newKernel_) external nonpayable
```

Function used by kernel when migrating to a new kernel.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newKernel_ | contract Kernel | undefined |

### changeMovingAverageDuration

```solidity
function changeMovingAverageDuration(uint48 movingAverageDuration_) external nonpayable
```

Change the moving average window (duration)

*Changing the moving average duration will erase the current observations array         and require the initialize function to be called again. Ensure that you have saved         the existing data and can re-populate before calling this function.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| movingAverageDuration_ | uint48 | - Moving average duration in seconds, must be a multiple of observation frequency |

### changeObservationFrequency

```solidity
function changeObservationFrequency(uint48 observationFrequency_) external nonpayable
```

Change the observation frequency of the moving average (i.e. how often a new observation is taken)

*Changing the observation frequency clears existing observation data since it will not be taken at the right time intervals.           Ensure that you have saved the existing data and/or can re-populate before calling this function.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| observationFrequency_ | uint48 | - Observation frequency in seconds, must be a divisor of the moving average duration |

### changeUpdateThresholds

```solidity
function changeUpdateThresholds(uint48 ohmEthUpdateThreshold_, uint48 reserveEthUpdateThreshold_) external nonpayable
```

Change the update thresholds for the price feeds

*The update thresholds should be set based on the update threshold of the chainlink oracles.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| ohmEthUpdateThreshold_ | uint48 | - Maximum allowed time between OHM/ETH price feed updates |
| reserveEthUpdateThreshold_ | uint48 | - Maximum allowed time between Reserve/ETH price feed updates |

### cumulativeObs

```solidity
function cumulativeObs() external view returns (uint256)
```

Running sum of observations to calculate the moving average price from




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### decimals

```solidity
function decimals() external view returns (uint8)
```

Number of decimals in the price values provided by the contract.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |

### getCurrentPrice

```solidity
function getCurrentPrice() external view returns (uint256)
```

Get the current price of OHM in the Reserve asset from the price feeds




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getLastPrice

```solidity
function getLastPrice() external view returns (uint256)
```

Get the last stored price observation of OHM in the Reserve asset




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getMovingAverage

```solidity
function getMovingAverage() external view returns (uint256)
```

Get the moving average of OHM in the Reserve asset over the defined window (see movingAverageDuration and observationFrequency).




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### initialize

```solidity
function initialize(uint256[] startObservations_, uint48 lastObservationTime_) external nonpayable
```

Initialize the price moduleAccess restricted to activated policies

*This function must be called after the Price module is deployed to activate it and after updating the observationFrequency         or movingAverageDuration (in certain cases) in order for the Price module to function properly.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| startObservations_ | uint256[] | - Array of observations to initialize the moving average with. Must be of length numObservations. |
| lastObservationTime_ | uint48 | - Unix timestamp of last observation being provided (in seconds). |

### initialized

```solidity
function initialized() external view returns (bool)
```

Whether the price module is initialized (and therefore active).




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### kernel

```solidity
function kernel() external view returns (contract Kernel)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Kernel | undefined |

### lastObservationTime

```solidity
function lastObservationTime() external view returns (uint48)
```

Unix timestamp of last observation (in seconds).




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint48 | undefined |

### movingAverageDuration

```solidity
function movingAverageDuration() external view returns (uint48)
```

Duration (in seconds) over which the moving average is calculated.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint48 | undefined |

### nextObsIndex

```solidity
function nextObsIndex() external view returns (uint32)
```

Index of the next observation to make. The current value at this index is the oldest observation.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint32 | undefined |

### numObservations

```solidity
function numObservations() external view returns (uint32)
```

Number of observations used in the moving average calculation. Computed from movingAverageDuration / observationFrequency.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint32 | undefined |

### observationFrequency

```solidity
function observationFrequency() external view returns (uint48)
```

Frequency (in seconds) that observations should be stored.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint48 | undefined |

### observations

```solidity
function observations(uint256) external view returns (uint256)
```

Array of price observations. Check nextObsIndex to determine latest data point.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### ohmEthPriceFeed

```solidity
function ohmEthPriceFeed() external view returns (contract AggregatorV2V3Interface)
```

OHM/ETH price feed




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract AggregatorV2V3Interface | undefined |

### ohmEthUpdateThreshold

```solidity
function ohmEthUpdateThreshold() external view returns (uint48)
```

Maximum expected time between OHM/ETH price feed updates




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint48 | undefined |

### reserveEthPriceFeed

```solidity
function reserveEthPriceFeed() external view returns (contract AggregatorV2V3Interface)
```

Reserve/ETH price feed




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract AggregatorV2V3Interface | undefined |

### reserveEthUpdateThreshold

```solidity
function reserveEthUpdateThreshold() external view returns (uint48)
```

Maximum expected time between OHM/ETH price feed updates




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint48 | undefined |

### updateMovingAverage

```solidity
function updateMovingAverage() external nonpayable
```

Trigger an update of the moving average. Permissioned.

*This function does not have a time-gating on the observationFrequency on this contract. It is set on the Heart policy contract.         The Heart beat frequency should be set to the same value as the observationFrequency.*




## Events

### MovingAverageDurationChanged

```solidity
event MovingAverageDurationChanged(uint48 movingAverageDuration_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| movingAverageDuration_  | uint48 | undefined |

### NewObservation

```solidity
event NewObservation(uint256 timestamp_, uint256 price_, uint256 movingAverage_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| timestamp_  | uint256 | undefined |
| price_  | uint256 | undefined |
| movingAverage_  | uint256 | undefined |

### ObservationFrequencyChanged

```solidity
event ObservationFrequencyChanged(uint48 observationFrequency_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| observationFrequency_  | uint48 | undefined |

### UpdateThresholdsChanged

```solidity
event UpdateThresholdsChanged(uint48 ohmEthUpdateThreshold_, uint48 reserveEthUpdateThreshold_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| ohmEthUpdateThreshold_  | uint48 | undefined |
| reserveEthUpdateThreshold_  | uint48 | undefined |



## Errors

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### Module_PolicyNotPermitted

```solidity
error Module_PolicyNotPermitted(address policy_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ | address | undefined |

### Price_AlreadyInitialized

```solidity
error Price_AlreadyInitialized()
```






### Price_BadFeed

```solidity
error Price_BadFeed(address priceFeed)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| priceFeed | address | undefined |

### Price_InvalidParams

```solidity
error Price_InvalidParams()
```






### Price_NotInitialized

```solidity
error Price_NotInitialized()
```







