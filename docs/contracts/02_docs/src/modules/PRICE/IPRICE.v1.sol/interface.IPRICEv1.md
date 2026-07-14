# IPRICEv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/modules/PRICE/IPRICE.v1.sol)

Price oracle interface for PRICEv1

Minimal interface extracted from PRICEv1 abstract contract

## Functions

### observationFrequency

Frequency (in seconds) that observations should be stored.

```solidity
function observationFrequency() external view returns (uint48);
```

### lastObservationTime

Unix timestamp of last observation (in seconds).

```solidity
function lastObservationTime() external view returns (uint48);
```

### decimals

Number of decimals in the price values provided by the contract.

```solidity
function decimals() external view returns (uint8);
```

### minimumTargetPrice

Minimum target price for RBS system. Set manually to correspond to the liquid backing of OHM.

```solidity
function minimumTargetPrice() external view returns (uint256);
```

### updateMovingAverage

Trigger an update of the moving average. Permissioned.

```solidity
function updateMovingAverage() external;
```

### initialize

Initialize the price module

```solidity
function initialize(uint256[] memory startObservations_, uint48 lastObservationTime_) external;
```

### changeMovingAverageDuration

Change the moving average window (duration)

```solidity
function changeMovingAverageDuration(uint48 movingAverageDuration_) external;
```

### changeObservationFrequency

Change the observation frequency of the moving average (i.e. how often a new observation is taken)

```solidity
function changeObservationFrequency(uint48 observationFrequency_) external;
```

### changeUpdateThresholds

Change the update thresholds for the price feeds

```solidity
function changeUpdateThresholds(uint48 ohmEthUpdateThreshold_, uint48 reserveEthUpdateThreshold_) external;
```

### changeMinimumTargetPrice

Change the minimum target price

```solidity
function changeMinimumTargetPrice(uint256 minimumTargetPrice_) external;
```

### getCurrentPrice

Get the current price of OHM in the Reserve asset from the price feeds

```solidity
function getCurrentPrice() external view returns (uint256);
```

### getLastPrice

Get the last stored price observation of OHM in the Reserve asset

```solidity
function getLastPrice() external view returns (uint256);
```

### getMovingAverage

Get the stored moving average of OHM in the Reserve asset over the defined window (see movingAverageDuration and observationFrequency).

This accessor may return a stale value.

```solidity
function getMovingAverage() external view returns (uint256);
```

### getTargetPrice

Get target price of OHM in the Reserve asset for the RBS system

Reverts when the OHM moving average is stale.

```solidity
function getTargetPrice() external view returns (uint256);
```

## Events

### MinimumTargetPriceChanged

```solidity
event MinimumTargetPriceChanged(uint256 minimumTargetPrice_);
```
