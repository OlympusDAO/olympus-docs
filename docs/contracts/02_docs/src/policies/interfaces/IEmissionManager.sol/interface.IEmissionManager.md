# IEmissionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/interfaces/IEmissionManager.sol)

## Functions

### execute

calculate and execute sale, if applicable, once per day (every 3 beats)

*this function is restricted to the heart role and is called on each heart beat*

*if the contract is not active, the function does nothing*

```solidity
function execute() external;
```

## Events

### SaleCreated

```solidity
event SaleCreated(uint256 marketID, uint256 saleAmount);
```

### BackingUpdated

```solidity
event BackingUpdated(uint256 newBacking, uint256 supplyAdded, uint256 reservesAdded);
```

### BaseRateChanged

Emitted when the base emission rate is changed

```solidity
event BaseRateChanged(uint256 changeBy, uint48 forNumBeats, bool add);
```

### MinimumPremiumChanged

Emitted when the minimum premium is changed

```solidity
event MinimumPremiumChanged(uint256 newMinimumPremium);
```

### VestingPeriodChanged

Emitted when the vesting period is changed

```solidity
event VestingPeriodChanged(uint48 newVestingPeriod);
```

### BackingChanged

Emitted when the backing is changed
This differs from `BackingUpdated` in that it is emitted when the backing is changed directly by governance

```solidity
event BackingChanged(uint256 newBacking);
```

### RestartTimeframeChanged

Emitted when the restart timeframe is changed

```solidity
event RestartTimeframeChanged(uint48 newRestartTimeframe);
```

### BondContractsSet

Emitted when the bond contracts are set

```solidity
event BondContractsSet(address auctioneer, address teller);
```

### Activated

Emitted when the contract is activated

```solidity
event Activated();
```

### Deactivated

Emitted when the contract is deactivated

```solidity
event Deactivated();
```

## Errors

### OnlyTeller

```solidity
error OnlyTeller();
```

### InvalidMarket

```solidity
error InvalidMarket();
```

### InvalidCallback

```solidity
error InvalidCallback();
```

### InvalidParam

```solidity
error InvalidParam(string parameter);
```

### CannotRestartYet

```solidity
error CannotRestartYet(uint48 availableAt);
```

### RestartTimeframePassed

```solidity
error RestartTimeframePassed();
```

### NotActive

```solidity
error NotActive();
```

### AlreadyActive

```solidity
error AlreadyActive();
```

## Structs

### BaseRateChange

```solidity
struct BaseRateChange {
    uint256 changeBy;
    uint48 daysLeft;
    bool addition;
}
```
