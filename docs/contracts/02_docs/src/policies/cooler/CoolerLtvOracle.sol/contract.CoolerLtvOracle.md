# CoolerLtvOracle

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/policies/cooler/CoolerLtvOracle.sol)

**Inherits:**
[ICoolerLtvOracle](/main/contracts/docs/src/policies/interfaces/cooler/ICoolerLtvOracle.sol/interface.ICoolerLtvOracle), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyAdmin](/main/contracts/docs/src/policies/utils/PolicyAdmin.sol/abstract.PolicyAdmin)

**Title:**
Cooler LTV Oracle

It is a custom oracle (not dependant on external markets/AMMs/dependencies) to give the
serve both the Origination LTV and Liquidation LTV

- They are both quoted in [debtToken / collateralToken] units
- It is a fixed 18dp price
- Origination LTV updates on a per second basis according to a policy set rate of change (and is up only or flat)
- Liquidation LTV is a policy set percentage above the Origination LTV

## State Variables

### _DEBT_TOKEN

The debt token

```solidity
ERC20 private immutable _DEBT_TOKEN
```

### _COLLATERAL_TOKEN

The collateral token

```solidity
ERC20 private immutable _COLLATERAL_TOKEN
```

### originationLtvData

The current Origination LTV state data

```solidity
OriginationLtvData public override originationLtvData
```

### maxOriginationLtvDelta

The maximum allowed Origination LTV change on any single `setOriginationLtvAt()`, in absolute terms
between the Origination LTV as of now and the targetOriginationLtv

18 decimal places, 0.20e18 == $0.20.
Used as a bound to avoid unintended/fat fingering when updating Origination LTV

```solidity
uint96 public override maxOriginationLtvDelta
```

### minOriginationLtvTargetTimeDelta

The minimum time delta required for Origination LTV to reach it's target value when
`setOriginationLtvAt()` is called.

In seconds.
Used as a bound to avoid unintended/fat fingering when updating Origination LTV

```solidity
uint32 public override minOriginationLtvTargetTimeDelta
```

### maxOriginationLtvRateOfChange

The maximum (positive) rate of change of Origination LTV allowed, when
`setOriginationLtvAt()` is called.

Units: [Origination LTV / second]

```solidity
uint96 public override maxOriginationLtvRateOfChange
```

### maxLiquidationLtvPremiumBps

The maximum Liquidation LTV premium (in basis points) which is allowed to be set when calling
`setLiquidationLtvPremiumBps()`

```solidity
uint16 public override maxLiquidationLtvPremiumBps
```

### liquidationLtvPremiumBps

The premium (in basis points) of the Liquidation LTV above the Origination LTV

```solidity
uint16 public override liquidationLtvPremiumBps
```

### DECIMALS

The decimal precision of both the Origination LTV and Liquidation LTV

```solidity
uint8 public constant override DECIMALS = 18
```

### BASIS_POINTS_DIVISOR

```solidity
uint96 public constant BASIS_POINTS_DIVISOR = 10_000
```

## Functions

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

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`dependencies`|`Keycode[]`|- Keycode array of module dependencies.|

### setMaxOriginationLtvDelta

Set the maximum allowed Origination LTV change on any single `setOriginationLtvAt()`, in absolute terms
between the Origination LTV as of now and the targetOriginationLtv

18 decimal places, 0.20e18 == $0.20

```solidity
function setMaxOriginationLtvDelta(uint96 maxDelta) external override onlyAdminRole;
```

### setMinOriginationLtvTargetTimeDelta

Set the minimum time delta required for Origination LTV to reach it's target value when
`setOriginationLtvAt()` is called.

In seconds.

```solidity
function setMinOriginationLtvTargetTimeDelta(uint32 minTargetTimeDelta) external override onlyAdminRole;
```

### setMaxOriginationLtvRateOfChange

Set the maximum (positive) rate of change of Origination LTV allowed, when
`setOriginationLtvAt()` is called.

Units: [Origination LTV / second]

```solidity
function setMaxOriginationLtvRateOfChange(uint96 originationLtvDelta, uint32 timeDelta)
    external
    override
    onlyAdminRole;
```

### setOriginationLtvAt

Set the target Origination LTV which will incrementally increase from it's current value to `targetOriginationLtv`
between now and `targetTime`.

targetTime is unixtime, targetOriginationLtv is 18 decimal places, 1.05e18 == $1.05

```solidity
function setOriginationLtvAt(uint96 targetValue, uint40 targetTime) external override onlyAdminRole;
```

### setMaxLiquidationLtvPremiumBps

Set Liquidation LTV premium (in basis points) of the Liquidation LTV above the Origination LTV

```solidity
function setMaxLiquidationLtvPremiumBps(uint16 maxPremiumBps) external override onlyAdminRole;
```

### setLiquidationLtvPremiumBps

Set maximum Liquidation LTV premium (in basis points) which is allowed to be set when calling
`setLiquidationLtvPremiumBps()`.

```solidity
function setLiquidationLtvPremiumBps(uint16 premiumBps) external override onlyAdminRole;
```

### collateralToken

The collateral asset of the LTV [debtToken / collateralToken]

```solidity
function collateralToken() external view override returns (IERC20);
```

### debtToken

The debt asset of the LTV [debtToken / collateralToken]

```solidity
function debtToken() external view override returns (IERC20);
```

### currentLtvs

```solidity
function currentLtvs() public view override returns (uint96 originationLtv, uint96 liquidationLtv);
```

### currentLiquidationLtv

The current Liquidation LTV

```solidity
function currentLiquidationLtv() external view override returns (uint96);
```

### currentOriginationLtv

The current Origination LTV

```solidity
function currentOriginationLtv() public view override returns (uint96);
```

### _currentLiquidationLtv

```solidity
function _currentLiquidationLtv(uint96 oltv) private view returns (uint96);
```

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
