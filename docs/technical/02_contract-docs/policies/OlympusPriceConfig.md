# OlympusPriceConfig









## Methods

### ROLES

```solidity
function ROLES() external view returns (contract ROLESv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ROLESv1 | undefined |

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

*Setting the window to a larger number of observations than the current window will clear      the data in the current window and require the initialize function to be called again.      Ensure that you have saved the existing data and can re-populate before calling this      function with a number of observations larger than have been recorded.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| movingAverageDuration_ | uint48 | Moving average duration in seconds, must be a multiple of observation frequency |

### changeObservationFrequency

```solidity
function changeObservationFrequency(uint48 observationFrequency_) external nonpayable
```

Change the observation frequency of the moving average (i.e. how often a new observation is taken)

*Changing the observation frequency clears existing observation data since it will not be taken at the right time intervals.           Ensure that you have saved the existing data and/or can re-populate before calling this function.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| observationFrequency_ | uint48 | Observation frequency in seconds, must be a divisor of the moving average duration |

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

### configureDependencies

```solidity
function configureDependencies() external nonpayable returns (Keycode[] dependencies)
```

Define module dependencies for this policy.




#### Returns

| Name | Type | Description |
|---|---|---|
| dependencies | Keycode[] | - Keycode array of module dependencies. |

### initialize

```solidity
function initialize(uint256[] startObservations_, uint48 lastObservationTime_) external nonpayable
```

Initialize the price moduleAccess restricted to approved policies

*This function must be called after the Price module is deployed to activate it and after updating the observationFrequency      or movingAverageDuration (in certain cases) in order for the Price module to function properly.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| startObservations_ | uint256[] | Array of observations to initialize the moving average with. Must be of length numObservations. |
| lastObservationTime_ | uint48 | Unix timestamp of last observation being provided (in seconds). |

### isActive

```solidity
function isActive() external view returns (bool)
```

Easily accessible indicator for if a policy is activated or not.




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

### requestPermissions

```solidity
function requestPermissions() external view returns (struct Permissions[] permissions)
```

Function called by kernel to set module function permissions.




#### Returns

| Name | Type | Description |
|---|---|---|
| permissions | Permissions[] | - Array of keycodes and function selectors for requested permissions. |




## Errors

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### Policy_ModuleDoesNotExist

```solidity
error Policy_ModuleDoesNotExist(Keycode keycode_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| keycode_ | Keycode | undefined |


