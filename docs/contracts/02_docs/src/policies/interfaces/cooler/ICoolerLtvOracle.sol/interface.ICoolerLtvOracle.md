# ICoolerLtvOracle

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/interfaces/cooler/ICoolerLtvOracle.sol)

It is a custom oracle (not dependant on external markets/AMMs/dependencies) to give the
serve both the Origination LTV and Liquidation LTV

- They are both quoted in [debtToken / collateralToken] units
- It is a fixed 18dp price
- Origination LTV updates on a per second basis according to a policy set rate of change (and is up only or flat)
- Liquidation LTV is a policy set percentage above the Origination LTV

## Functions

### collateralToken

The collateral asset of the LTV [debtToken / collateralToken]

```solidity
function collateralToken() external view returns (IERC20);
```

### debtToken

The debt asset of the LTV [debtToken / collateralToken]

```solidity
function debtToken() external view returns (IERC20);
```

### currentLtvs

The current Origination LTV and Liquidation LTV

```solidity
function currentLtvs() external view returns (uint96 originationLtv, uint96 liquidationLtv);
```

### currentOriginationLtv

The current Origination LTV

```solidity
function currentOriginationLtv() external view returns (uint96);
```

### currentLiquidationLtv

The current Liquidation LTV

```solidity
function currentLiquidationLtv() external view returns (uint96);
```

### maxOriginationLtvDelta

The maximum allowed Origination LTV change on any single `setOriginationLtvAt()`, in absolute terms
between the Origination LTV as of now and the targetOriginationLtv

*18 decimal places, 0.20e18 == $0.20.
Used as a bound to avoid unintended/fat fingering when updating Origination LTV*

```solidity
function maxOriginationLtvDelta() external view returns (uint96);
```

### minOriginationLtvTargetTimeDelta

The minimum time delta required for Origination LTV to reach it's target value when
`setOriginationLtvAt()` is called.

*In seconds.
Used as a bound to avoid unintended/fat fingering when updating Origination LTV*

```solidity
function minOriginationLtvTargetTimeDelta() external view returns (uint32);
```

### maxOriginationLtvRateOfChange

The maximum (positive) rate of change of Origination LTV allowed, when
`setOriginationLtvAt()` is called.

*Units: [Origination LTV / second]*

```solidity
function maxOriginationLtvRateOfChange() external view returns (uint96);
```

### originationLtvData

The current Origination LTV state data

```solidity
function originationLtvData()
    external
    view
    returns (uint96 startingValue, uint40 startTime, uint96 targetValue, uint40 targetTime, uint96 slope);
```

### maxLiquidationLtvPremiumBps

The maximum Liquidation LTV premium (in basis points) which is allowed to be set when calling
`setLiquidationLtvPremiumBps()`

```solidity
function maxLiquidationLtvPremiumBps() external view returns (uint16);
```

### liquidationLtvPremiumBps

The premium (in basis points) of the Liquidation LTV above the Origination LTV

```solidity
function liquidationLtvPremiumBps() external view returns (uint16);
```

### setLiquidationLtvPremiumBps

Set maximum Liquidation LTV premium (in basis points) which is allowed to be set when calling
`setLiquidationLtvPremiumBps()`.

```solidity
function setLiquidationLtvPremiumBps(uint16 premiumBps) external;
```

### setMaxLiquidationLtvPremiumBps

Set Liquidation LTV premium (in basis points) of the Liquidation LTV above the Origination LTV

```solidity
function setMaxLiquidationLtvPremiumBps(uint16 premiumBps) external;
```

### setMaxOriginationLtvDelta

Set the maximum allowed Origination LTV change on any single `setOriginationLtvAt()`, in absolute terms
between the Origination LTV as of now and the targetOriginationLtv

*18 decimal places, 0.20e18 == $0.20*

```solidity
function setMaxOriginationLtvDelta(uint96 maxDelta) external;
```

### setMinOriginationLtvTargetTimeDelta

Set the minimum time delta required for Origination LTV to reach it's target value when
`setOriginationLtvAt()` is called.

*In seconds.*

```solidity
function setMinOriginationLtvTargetTimeDelta(uint32 minTargetTimeDelta) external;
```

### setMaxOriginationLtvRateOfChange

Set the maximum (positive) rate of change of Origination LTV allowed, when
`setOriginationLtvAt()` is called.

*Units: [Origination LTV / second]*

```solidity
function setMaxOriginationLtvRateOfChange(uint96 originationLtvDelta, uint32 timeDelta) external;
```

### setOriginationLtvAt

Set the target Origination LTV which will incrementally increase from it's current value to `targetOriginationLtv`
between now and `targetTime`.

*targetTime is unixtime, targetOriginationLtv is 18 decimal places, 1.05e18 == $1.05*

```solidity
function setOriginationLtvAt(uint96 targetOriginationLtv, uint40 targetTime) external;
```

### DECIMALS

The decimal precision of both the Origination LTV and Liquidation LTV

```solidity
function DECIMALS() external view returns (uint8);
```

## Events

### OriginationLtvSetAt

```solidity
event OriginationLtvSetAt(uint96 oldOriginationLtv, uint96 newOriginationLtvTarget, uint256 targetTime);
```

### MaxOriginationLtvDeltaSet

```solidity
event MaxOriginationLtvDeltaSet(uint256 maxDelta);
```

### MinOriginationLtvTargetTimeDeltaSet

```solidity
event MinOriginationLtvTargetTimeDeltaSet(uint32 maxTargetTimeDelta);
```

### MaxOriginationLtvRateOfChangeSet

```solidity
event MaxOriginationLtvRateOfChangeSet(uint96 maxRateOfChange);
```

### MaxLiquidationLtvPremiumBpsSet

```solidity
event MaxLiquidationLtvPremiumBpsSet(uint96 maxPremiumBps);
```

### LiquidationLtvPremiumBpsSet

```solidity
event LiquidationLtvPremiumBpsSet(uint96 premiumBps);
```

## Errors

### BreachedMaxOriginationLtvDelta

```solidity
error BreachedMaxOriginationLtvDelta(uint96 oldOriginationLtv, uint96 newOriginationLtv, uint256 maxDelta);
```

### BreachedMinDateDelta

```solidity
error BreachedMinDateDelta(uint40 targetTime, uint40 currentDate, uint32 maxTargetTimeDelta);
```

### BreachedMaxOriginationLtvRateOfChange

```solidity
error BreachedMaxOriginationLtvRateOfChange(uint96 targetRateOfChange, uint96 maxRateOfChange);
```

### CannotDecreaseLtv

```solidity
error CannotDecreaseLtv();
```

### InvalidParam

```solidity
error InvalidParam();
```
