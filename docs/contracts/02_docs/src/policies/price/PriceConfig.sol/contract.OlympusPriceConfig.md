# OlympusPriceConfig

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/price/PriceConfig.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## State Variables

### PRICE

```solidity
PRICEv1 internal PRICE;
```

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) Policy(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions()
        external
        view
        override
        returns (Permissions[] memory permissions);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| permissions | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="initialize-uint256-uint48"></a>

### initialize

Initialize the price module

Access restricted to approved policies

<i>

This function must be called after the Price module is deployed to activate it and after updating the observationFrequency
or movingAverageDuration (in certain cases) in order for the Price module to function properly.

</i>

```solidity
function initialize(
        uint256[] memory startObservations_,
        uint48 lastObservationTime_
    ) external onlyRole("price_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| startObservations_ | `uint256[]` | Array of observations to initialize the moving average with. Must be of length numObservations. |
| lastObservationTime_ | `uint48` | Unix timestamp of last observation being provided (in seconds). |

<a id="changemovingaverageduration-uint48"></a>

### changeMovingAverageDuration

Change the moving average window (duration)

<i>

Setting the window to a larger number of observations than the current window will clear
the data in the current window and require the initialize function to be called again.
Ensure that you have saved the existing data and can re-populate before calling this
function with a number of observations larger than have been recorded.

</i>

```solidity
function changeMovingAverageDuration(
        uint48 movingAverageDuration_
    ) external onlyRole("price_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| movingAverageDuration_ | `uint48` | Moving average duration in seconds, must be a multiple of observation frequency |

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
    ) external onlyRole("price_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| observationFrequency_ | `uint48` | Observation frequency in seconds, must be a divisor of the moving average duration |

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
    ) external onlyRole("price_admin");
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

The minimum target price should be set based on liquid backing of OHM.

</i>

```solidity
function changeMinimumTargetPrice(
        uint256 minimumTargetPrice_
    ) external onlyRole("price_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| minimumTargetPrice_ | `uint256` | - Minimum target price for the RBS system with 18 decimals, expressed as Reserves per OHM |
