# ICoolerLtvOracle

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/cooler/ICoolerLtvOracle.sol)

**Title:** Cooler LTV Oracle

It is a custom oracle (not dependant on external markets/AMMs/dependencies) to give the
serve both the Origination LTV and Liquidation LTV

- They are both quoted in [debtToken / collateralToken] units
- It is a fixed 18dp price
- Origination LTV updates on a per second basis according to a policy set rate of change (and is up only or flat)
- Liquidation LTV is a policy set percentage above the Origination LTV

## Functions

<a id="collateraltoken"></a>

### collateralToken

The collateral asset of the LTV [debtToken / collateralToken]

```solidity
function collateralToken() external view returns (IERC20);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `IERC20` |  |

<a id="debttoken"></a>

### debtToken

The debt asset of the LTV [debtToken / collateralToken]

```solidity
function debtToken() external view returns (IERC20);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `IERC20` |  |

<a id="currentltvs"></a>

### currentLtvs

The current Origination LTV and Liquidation LTV

```solidity
function currentLtvs() external view returns (uint96 originationLtv, uint96 liquidationLtv);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| originationLtv | `uint96` |  |
| liquidationLtv | `uint96` |  |

<a id="currentoriginationltv"></a>

### currentOriginationLtv

The current Origination LTV

```solidity
function currentOriginationLtv() external view returns (uint96);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint96` |  |

<a id="currentliquidationltv"></a>

### currentLiquidationLtv

The current Liquidation LTV

```solidity
function currentLiquidationLtv() external view returns (uint96);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint96` |  |

<a id="maxoriginationltvdelta"></a>

### maxOriginationLtvDelta

The maximum allowed Origination LTV change on any single `setOriginationLtvAt()`, in absolute terms
between the Origination LTV as of now and the targetOriginationLtv

<i>

18 decimal places, 0.20e18 == $0.20.
Used as a bound to avoid unintended/fat fingering when updating Origination LTV

</i>

```solidity
function maxOriginationLtvDelta() external view returns (uint96);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint96` |  |

<a id="minoriginationltvtargettimedelta"></a>

### minOriginationLtvTargetTimeDelta

The minimum time delta required for Origination LTV to reach it's target value when
`setOriginationLtvAt()` is called.

<i>

In seconds.
Used as a bound to avoid unintended/fat fingering when updating Origination LTV

</i>

```solidity
function minOriginationLtvTargetTimeDelta() external view returns (uint32);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint32` |  |

<a id="maxoriginationltvrateofchange"></a>

### maxOriginationLtvRateOfChange

The maximum (positive) rate of change of Origination LTV allowed, when
`setOriginationLtvAt()` is called.

<i>

Units: [Origination LTV / second]

</i>

```solidity
function maxOriginationLtvRateOfChange() external view returns (uint96);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint96` |  |

<a id="originationltvdata"></a>

### originationLtvData

The current Origination LTV state data

```solidity
function originationLtvData()
        external
        view
        returns (
            uint96 startingValue,
            uint40 startTime,
            uint96 targetValue,
            uint40 targetTime,
            uint96 slope
        );
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| startingValue | `uint96` |  |
| startTime | `uint40` |  |
| targetValue | `uint96` |  |
| targetTime | `uint40` |  |
| slope | `uint96` |  |

<a id="maxliquidationltvpremiumbps"></a>

### maxLiquidationLtvPremiumBps

The maximum Liquidation LTV premium (in basis points) which is allowed to be set when calling
`setLiquidationLtvPremiumBps()`

```solidity
function maxLiquidationLtvPremiumBps() external view returns (uint16);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint16` |  |

<a id="liquidationltvpremiumbps"></a>

### liquidationLtvPremiumBps

The premium (in basis points) of the Liquidation LTV above the Origination LTV

```solidity
function liquidationLtvPremiumBps() external view returns (uint16);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint16` |  |

<a id="setliquidationltvpremiumbps-uint16"></a>

### setLiquidationLtvPremiumBps

Set maximum Liquidation LTV premium (in basis points) which is allowed to be set when calling
`setLiquidationLtvPremiumBps()`.

```solidity
function setLiquidationLtvPremiumBps(uint16 premiumBps) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| premiumBps | `uint16` |  |

<a id="setmaxliquidationltvpremiumbps-uint16"></a>

### setMaxLiquidationLtvPremiumBps

Set Liquidation LTV premium (in basis points) of the Liquidation LTV above the Origination LTV

```solidity
function setMaxLiquidationLtvPremiumBps(uint16 premiumBps) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| premiumBps | `uint16` |  |

<a id="setmaxoriginationltvdelta-uint96"></a>

### setMaxOriginationLtvDelta

Set the maximum allowed Origination LTV change on any single `setOriginationLtvAt()`, in absolute terms
between the Origination LTV as of now and the targetOriginationLtv

<i>

18 decimal places, 0.20e18 == $0.20

</i>

```solidity
function setMaxOriginationLtvDelta(uint96 maxDelta) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxDelta | `uint96` |  |

<a id="setminoriginationltvtargettimedelta-uint32"></a>

### setMinOriginationLtvTargetTimeDelta

Set the minimum time delta required for Origination LTV to reach it's target value when
`setOriginationLtvAt()` is called.

<i>

In seconds.

</i>

```solidity
function setMinOriginationLtvTargetTimeDelta(uint32 minTargetTimeDelta) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| minTargetTimeDelta | `uint32` |  |

<a id="setmaxoriginationltvrateofchange-uint96-uint32"></a>

### setMaxOriginationLtvRateOfChange

Set the maximum (positive) rate of change of Origination LTV allowed, when
`setOriginationLtvAt()` is called.

<i>

Units: [Origination LTV / second]

</i>

```solidity
function setMaxOriginationLtvRateOfChange(
        uint96 originationLtvDelta,
        uint32 timeDelta
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| originationLtvDelta | `uint96` |  |
| timeDelta | `uint32` |  |

<a id="setoriginationltvat-uint96-uint40"></a>

### setOriginationLtvAt

Set the target Origination LTV which will incrementally increase from it's current value to `targetOriginationLtv`
between now and `targetTime`.

<i>

targetTime is unixtime, targetOriginationLtv is 18 decimal places, 1.05e18 == $1.05

</i>

```solidity
function setOriginationLtvAt(uint96 targetOriginationLtv, uint40 targetTime) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| targetOriginationLtv | `uint96` |  |
| targetTime | `uint40` |  |

<a id="decimals"></a>

### DECIMALS

The decimal precision of both the Origination LTV and Liquidation LTV

```solidity
function DECIMALS() external view returns (uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` |  |

## Events

### OriginationLtvSetAt

```solidity
event OriginationLtvSetAt(
        uint96 oldOriginationLtv,
        uint96 newOriginationLtvTarget,
        uint256 targetTime
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldOriginationLtv | `uint96` |  |
| newOriginationLtvTarget | `uint96` |  |
| targetTime | `uint256` |  |

### MaxOriginationLtvDeltaSet

```solidity
event MaxOriginationLtvDeltaSet(uint256 maxDelta);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxDelta | `uint256` |  |

### MinOriginationLtvTargetTimeDeltaSet

```solidity
event MinOriginationLtvTargetTimeDeltaSet(uint32 maxTargetTimeDelta);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxTargetTimeDelta | `uint32` |  |

### MaxOriginationLtvRateOfChangeSet

```solidity
event MaxOriginationLtvRateOfChangeSet(uint96 maxRateOfChange);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxRateOfChange | `uint96` |  |

### MaxLiquidationLtvPremiumBpsSet

```solidity
event MaxLiquidationLtvPremiumBpsSet(uint96 maxPremiumBps);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxPremiumBps | `uint96` |  |

### LiquidationLtvPremiumBpsSet

```solidity
event LiquidationLtvPremiumBpsSet(uint96 premiumBps);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| premiumBps | `uint96` |  |

## Errors

### BreachedMaxOriginationLtvDelta

```solidity
error BreachedMaxOriginationLtvDelta(
        uint96 oldOriginationLtv,
        uint96 newOriginationLtv,
        uint256 maxDelta
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldOriginationLtv | `uint96` |  |
| newOriginationLtv | `uint96` |  |
| maxDelta | `uint256` |  |

### BreachedMinDateDelta

```solidity
error BreachedMinDateDelta(uint40 targetTime, uint40 currentDate, uint32 maxTargetTimeDelta);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| targetTime | `uint40` |  |
| currentDate | `uint40` |  |
| maxTargetTimeDelta | `uint32` |  |

### BreachedMaxOriginationLtvRateOfChange

```solidity
error BreachedMaxOriginationLtvRateOfChange(uint96 targetRateOfChange, uint96 maxRateOfChange);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| targetRateOfChange | `uint96` |  |
| maxRateOfChange | `uint96` |  |

### CannotDecreaseLtv

```solidity
error CannotDecreaseLtv();
```

### InvalidParam

```solidity
error InvalidParam();
```
