# CoolerLtvOracle

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/cooler/CoolerLtvOracle.sol)

**Inherits:** [ICoolerLtvOracle](/main/contracts/docs/src/policies/interfaces/cooler/ICoolerLtvOracle.sol/interface.ICoolerLtvOracle), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyAdmin](/main/contracts/docs/src/policies/utils/PolicyAdmin.sol/abstract.PolicyAdmin)

**Title:** Cooler LTV Oracle

It is a custom oracle (not dependant on external markets/AMMs/dependencies) to give the
serve both the Origination LTV and Liquidation LTV

- They are both quoted in [debtToken / collateralToken] units
- It is a fixed 18dp price
- Origination LTV updates on a per second basis according to a policy set rate of change (and is up only or flat)
- Liquidation LTV is a policy set percentage above the Origination LTV

## Constants

### _DEBT_TOKEN

<i>

The debt token

</i>

```solidity
ERC20 private immutable _DEBT_TOKEN;
```

### _COLLATERAL_TOKEN

<i>

The collateral token

</i>

```solidity
ERC20 private immutable _COLLATERAL_TOKEN;
```

### DECIMALS

The decimal precision of both the Origination LTV and Liquidation LTV

```solidity
uint8 public constant override DECIMALS = 18;
```

**Returns**

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| &lt;none&gt; | `uint8` |             |

### BASIS_POINTS_DIVISOR

```solidity
uint96 public constant BASIS_POINTS_DIVISOR = 10_000;
```

## State Variables

### originationLtvData

The current Origination LTV state data

```solidity
OriginationLtvData public override originationLtvData;
```

**Returns**

| Name          | Type     | Description |
| ------------- | -------- | ----------- |
| startingValue | `uint96` |             |
| startTime     | `uint40` |             |
| targetValue   | `uint96` |             |
| targetTime    | `uint40` |             |
| slope         | `uint96` |             |

### maxOriginationLtvDelta

The maximum allowed Origination LTV change on any single `setOriginationLtvAt()`, in absolute terms
between the Origination LTV as of now and the targetOriginationLtv

<i>

18 decimal places, 0.20e18 == $0.20.
Used as a bound to avoid unintended/fat fingering when updating Origination LTV

</i>

```solidity
uint96 public override maxOriginationLtvDelta;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint96` |             |

### minOriginationLtvTargetTimeDelta

The minimum time delta required for Origination LTV to reach it's target value when
`setOriginationLtvAt()` is called.

<i>

In seconds.
Used as a bound to avoid unintended/fat fingering when updating Origination LTV

</i>

```solidity
uint32 public override minOriginationLtvTargetTimeDelta;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint32` |             |

### maxOriginationLtvRateOfChange

The maximum (positive) rate of change of Origination LTV allowed, when
`setOriginationLtvAt()` is called.

<i>

Units: [Origination LTV / second]

</i>

```solidity
uint96 public override maxOriginationLtvRateOfChange;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint96` |             |

### maxLiquidationLtvPremiumBps

The maximum Liquidation LTV premium (in basis points) which is allowed to be set when calling
`setLiquidationLtvPremiumBps()`

```solidity
uint16 public override maxLiquidationLtvPremiumBps;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint16` |             |

### liquidationLtvPremiumBps

The premium (in basis points) of the Liquidation LTV above the Origination LTV

```solidity
uint16 public override liquidationLtvPremiumBps;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint16` |             |

## Functions

<a id="constructor-address-address-address-uint96-uint96-uint32-uint96-uint16-uint16"></a>

### constructor

```solidity
constructor(
        address kernel_,
        address collateralToken_,
        address debtToken_,
        uint96 initialOriginationLtv_,
        uint96 maxOriginationLtvDelta_,
        uint32 minOriginationLtvTargetTimeDelta_,
        uint96 maxOriginationLtvRateOfChange_,
        uint16 maxLiquidationLtvPremiumBps_,
        uint16 liquidationLtvPremiumBps_
    ) Policy(Kernel(kernel_));
```

**Parameters**

| Name                              | Type      | Description |
| --------------------------------- | --------- | ----------- |
| kernel_                           | `address` |             |
| collateralToken_                  | `address` |             |
| debtToken_                        | `address` |             |
| initialOriginationLtv_            | `uint96`  |             |
| maxOriginationLtvDelta_           | `uint96`  |             |
| minOriginationLtvTargetTimeDelta_ | `uint32`  |             |
| maxOriginationLtvRateOfChange_    | `uint96`  |             |
| maxLiquidationLtvPremiumBps_      | `uint16`  |             |
| liquidationLtvPremiumBps_         | `uint16`  |             |

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

<a id="setmaxoriginationltvdelta-uint96"></a>

### setMaxOriginationLtvDelta

Set the maximum allowed Origination LTV change on any single `setOriginationLtvAt()`, in absolute terms
between the Origination LTV as of now and the targetOriginationLtv

<i>

18 decimal places, 0.20e18 == $0.20

</i>

```solidity
function setMaxOriginationLtvDelta(uint96 maxDelta) external override onlyAdminRole;
```

**Parameters**

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| maxDelta | `uint96` |             |

<a id="setminoriginationltvtargettimedelta-uint32"></a>

### setMinOriginationLtvTargetTimeDelta

Set the minimum time delta required for Origination LTV to reach it's target value when
`setOriginationLtvAt()` is called.

<i>

In seconds.

</i>

```solidity
function setMinOriginationLtvTargetTimeDelta(
        uint32 minTargetTimeDelta
    ) external override onlyAdminRole;
```

**Parameters**

| Name               | Type     | Description |
| ------------------ | -------- | ----------- |
| minTargetTimeDelta | `uint32` |             |

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
    ) external override onlyAdminRole;
```

**Parameters**

| Name                | Type     | Description |
| ------------------- | -------- | ----------- |
| originationLtvDelta | `uint96` |             |
| timeDelta           | `uint32` |             |

<a id="setoriginationltvat-uint96-uint40"></a>

### setOriginationLtvAt

Set the target Origination LTV which will incrementally increase from it's current value to `targetOriginationLtv`
between now and `targetTime`.

<i>

targetTime is unixtime, targetOriginationLtv is 18 decimal places, 1.05e18 == $1.05

</i>

```solidity
function setOriginationLtvAt(
        uint96 targetValue,
        uint40 targetTime
    ) external override onlyAdminRole;
```

**Parameters**

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| targetValue | `uint96` |             |
| targetTime  | `uint40` |             |

<a id="setmaxliquidationltvpremiumbps-uint16"></a>

### setMaxLiquidationLtvPremiumBps

Set Liquidation LTV premium (in basis points) of the Liquidation LTV above the Origination LTV

```solidity
function setMaxLiquidationLtvPremiumBps(uint16 maxPremiumBps) external override onlyAdminRole;
```

**Parameters**

| Name          | Type     | Description |
| ------------- | -------- | ----------- |
| maxPremiumBps | `uint16` |             |

<a id="setliquidationltvpremiumbps-uint16"></a>

### setLiquidationLtvPremiumBps

Set maximum Liquidation LTV premium (in basis points) which is allowed to be set when calling
`setLiquidationLtvPremiumBps()`.

```solidity
function setLiquidationLtvPremiumBps(uint16 premiumBps) external override onlyAdminRole;
```

**Parameters**

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| premiumBps | `uint16` |             |

<a id="collateraltoken"></a>

### collateralToken

The collateral asset of the LTV [debtToken / collateralToken]

```solidity
function collateralToken() external view override returns (IERC20);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `IERC20` |             |

<a id="debttoken"></a>

### debtToken

The debt asset of the LTV [debtToken / collateralToken]

```solidity
function debtToken() external view override returns (IERC20);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `IERC20` |             |

<a id="currentltvs"></a>

### currentLtvs

The current Origination LTV and Liquidation LTV

```solidity
function currentLtvs()
        public
        view
        override
        returns (uint96 originationLtv, uint96 liquidationLtv);
```

**Returns**

| Name           | Type     | Description |
| -------------- | -------- | ----------- |
| originationLtv | `uint96` |             |
| liquidationLtv | `uint96` |             |

<a id="currentliquidationltv"></a>

### currentLiquidationLtv

The current Liquidation LTV

```solidity
function currentLiquidationLtv() external view override returns (uint96);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint96` |             |

<a id="currentoriginationltv"></a>

### currentOriginationLtv

The current Origination LTV

```solidity
function currentOriginationLtv() public view override returns (uint96);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint96` |             |

<a id="_currentliquidationltv-uint96"></a>

### _currentLiquidationLtv

```solidity
function _currentLiquidationLtv(uint96 oltv) private view returns (uint96);
```

**Parameters**

| Name | Type     | Description |
| ---- | -------- | ----------- |
| oltv | `uint96` |             |

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint96` |             |

## Structs

### OriginationLtvData

```solidity
struct OriginationLtvData {
        /// @notice The Origination LTV at the time `setOriginationLtvAt()` was last called
        uint96 startingValue;
        /// @notice The time at which Origination LTV was last updated via `setOriginationLtvAt()`
        uint40 startTime;
        /// @notice The target Origination LTV at the `targetTime`
        uint96 targetValue;
        /// @notice The date which the `targetValue` will be reached.
        uint40 targetTime;
        /// @notice The rate at which the `startingValue` will change over time from `startTime` until `targetTime`.
        uint96 slope;
    }
```

**Properties**

| Name          | Type     | Description |
| ------------- | -------- | ----------- |
| startingValue | `uint96` |             |
| startTime     | `uint40` |             |
| targetValue   | `uint96` |             |
| targetTime    | `uint40` |             |
| slope         | `uint96` |             |
