# IPRICEv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/PRICE/IPRICE.v1.sol)

Price oracle interface for PRICEv1

<i>

Minimal interface extracted from PRICEv1 abstract contract

</i>

## Functions

<a id="observationfrequency"></a>

### observationFrequency

Frequency (in seconds) that observations should be stored.

```solidity
function observationFrequency() external view returns (uint48);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

<a id="lastobservationtime"></a>

### lastObservationTime

Unix timestamp of last observation (in seconds).

```solidity
function lastObservationTime() external view returns (uint48);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

<a id="decimals"></a>

### decimals

Number of decimals in the price values provided by the contract.

```solidity
function decimals() external view returns (uint8);
```

**Returns**

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| &lt;none&gt; | `uint8` |             |

<a id="minimumtargetprice"></a>

### minimumTargetPrice

Minimum target price for RBS system. Set manually to correspond to the liquid backing of OHM.

```solidity
function minimumTargetPrice() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="updatemovingaverage"></a>

### updateMovingAverage

Trigger an update of the moving average. Permissioned.

```solidity
function updateMovingAverage() external;
```

<a id="initialize-uint256-uint48"></a>

### initialize

Initialize the price module

```solidity
function initialize(uint256[] memory startObservations_, uint48 lastObservationTime_) external;
```

**Parameters**

| Name                 | Type        | Description |
| -------------------- | ----------- | ----------- |
| startObservations_   | `uint256[]` |             |
| lastObservationTime_ | `uint48`    |             |

<a id="changemovingaverageduration-uint48"></a>

### changeMovingAverageDuration

Change the moving average window (duration)

```solidity
function changeMovingAverageDuration(uint48 movingAverageDuration_) external;
```

**Parameters**

| Name                   | Type     | Description |
| ---------------------- | -------- | ----------- |
| movingAverageDuration_ | `uint48` |             |

<a id="changeobservationfrequency-uint48"></a>

### changeObservationFrequency

Change the observation frequency of the moving average (i.e. how often a new observation is taken)

```solidity
function changeObservationFrequency(uint48 observationFrequency_) external;
```

**Parameters**

| Name                  | Type     | Description |
| --------------------- | -------- | ----------- |
| observationFrequency_ | `uint48` |             |

<a id="changeupdatethresholds-uint48-uint48"></a>

### changeUpdateThresholds

Change the update thresholds for the price feeds

```solidity
function changeUpdateThresholds(
        uint48 ohmEthUpdateThreshold_,
        uint48 reserveEthUpdateThreshold_
    ) external;
```

**Parameters**

| Name                       | Type     | Description |
| -------------------------- | -------- | ----------- |
| ohmEthUpdateThreshold_     | `uint48` |             |
| reserveEthUpdateThreshold_ | `uint48` |             |

<a id="changeminimumtargetprice-uint256"></a>

### changeMinimumTargetPrice

Change the minimum target price

```solidity
function changeMinimumTargetPrice(uint256 minimumTargetPrice_) external;
```

**Parameters**

| Name                | Type      | Description |
| ------------------- | --------- | ----------- |
| minimumTargetPrice_ | `uint256` |             |

<a id="getcurrentprice"></a>

### getCurrentPrice

Get the current price of OHM in the Reserve asset from the price feeds

```solidity
function getCurrentPrice() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="getlastprice"></a>

### getLastPrice

Get the last stored price observation of OHM in the Reserve asset

```solidity
function getLastPrice() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="getmovingaverage"></a>

### getMovingAverage

Get the stored moving average of OHM in the Reserve asset over the defined window (see movingAverageDuration and observationFrequency).

<i>

This accessor may return a stale value.

</i>

```solidity
function getMovingAverage() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="gettargetprice"></a>

### getTargetPrice

Get target price of OHM in the Reserve asset for the RBS system

<i>

Reverts when the OHM moving average is stale.

</i>

```solidity
function getTargetPrice() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

## Events

### MinimumTargetPriceChanged

```solidity
event MinimumTargetPriceChanged(uint256 minimumTargetPrice_);
```

**Parameters**

| Name                | Type      | Description |
| ------------------- | --------- | ----------- |
| minimumTargetPrice_ | `uint256` |             |
