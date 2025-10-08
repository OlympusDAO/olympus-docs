# IEmissionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/policies/interfaces/IEmissionManager.sol)

## Events

### SaleCreated

```solidity
event SaleCreated(uint256 marketID, uint256 saleAmount);
```

### BondMarketCreationFailed

```solidity
event BondMarketCreationFailed(uint256 saleAmount);
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

### ConvertibleDepositAuctioneerSet

Emitted when the CD auctionner contract is set

```solidity
event ConvertibleDepositAuctioneerSet(address auctioneer);
```

### TickSizeChanged

Emitted when the tick size is changed

```solidity
event TickSizeChanged(uint256 newTickSize);
```

### MinPriceScalarChanged

Emitted when the minimum price scalar is changed

```solidity
event MinPriceScalarChanged(uint256 newMinPriceScalar);
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

## Structs

### BaseRateChange

```solidity
struct BaseRateChange {
    uint256 changeBy;
    uint48 daysLeft;
    bool addition;
}
```

### EnableParams

Parameters for the `enable` function

```solidity
struct EnableParams {
    uint256 baseEmissionsRate;
    uint256 minimumPremium;
    uint256 backing;
    uint256 tickSize;
    uint256 minPriceScalar;
    uint48 restartTimeframe;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`baseEmissionsRate`|`uint256`|   percent of OHM supply to issue per day at the minimum premium, in OHM scale, i.e. 1e9 = 100%|
|`minimumPremium`|`uint256`|      minimum premium at which to issue OHM, a percentage where 1e18 is 100%|
|`backing`|`uint256`|             backing price of OHM in reserve token, in reserve scale|
|`tickSize`|`uint256`|            fixed tick size in OHM decimals (9)|
|`minPriceScalar`|`uint256`|      scalar for min price|
|`restartTimeframe`|`uint48`|    time in seconds that the manager needs to be restarted after a shutdown, otherwise it must be re-initialized|
