# IEmissionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/IEmissionManager.sol)

## Events

### SaleCreated

forge-lint: disable-next-line(mixed-case-variable)

```solidity
event SaleCreated(uint256 marketID, uint256 saleAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| marketID | `uint256` |  |
| saleAmount | `uint256` |  |

### BondMarketCreationFailed

```solidity
event BondMarketCreationFailed(uint256 saleAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| saleAmount | `uint256` |  |

### BackingUpdated

```solidity
event BackingUpdated(uint256 newBacking, uint256 supplyAdded, uint256 reservesAdded);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newBacking | `uint256` |  |
| supplyAdded | `uint256` |  |
| reservesAdded | `uint256` |  |

### BaseRateChanged

Emitted when the base emission rate is changed

```solidity
event BaseRateChanged(uint256 changeBy, uint48 forNumBeats, bool add);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| changeBy | `uint256` |  |
| forNumBeats | `uint48` |  |
| add | `bool` |  |

### MinimumPremiumChanged

Emitted when the minimum premium is changed

```solidity
event MinimumPremiumChanged(uint256 newMinimumPremium);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newMinimumPremium | `uint256` |  |

### VestingPeriodChanged

Emitted when the vesting period is changed

```solidity
event VestingPeriodChanged(uint48 newVestingPeriod);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newVestingPeriod | `uint48` |  |

### BackingChanged

Emitted when the backing is changed
This differs from `BackingUpdated` in that it is emitted when the backing is changed directly by governance

```solidity
event BackingChanged(uint256 newBacking);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newBacking | `uint256` |  |

### RestartTimeframeChanged

Emitted when the restart timeframe is changed

```solidity
event RestartTimeframeChanged(uint48 newRestartTimeframe);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newRestartTimeframe | `uint48` |  |

### BondContractsSet

Emitted when the bond contracts are set

```solidity
event BondContractsSet(address auctioneer, address teller);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| auctioneer | `address` |  |
| teller | `address` |  |

### ConvertibleDepositAuctioneerSet

Emitted when the CD auctionner contract is set

```solidity
event ConvertibleDepositAuctioneerSet(address auctioneer);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| auctioneer | `address` |  |

### TickSizeChanged

Emitted when the tick size is changed

```solidity
event TickSizeChanged(uint256 newTickSize);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTickSize | `uint256` |  |

### MinPriceScalarChanged

Emitted when the minimum price scalar is changed

```solidity
event MinPriceScalarChanged(uint256 newMinPriceScalar);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newMinPriceScalar | `uint256` |  |

### BondMarketCapacityScalarChanged

Emitted when the bond market capacity scalar is changed

```solidity
event BondMarketCapacityScalarChanged(uint256 newBondMarketCapacityScalar);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newBondMarketCapacityScalar | `uint256` |  |

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parameter | `string` |  |

### CannotRestartYet

```solidity
error CannotRestartYet(uint48 availableAt);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| availableAt | `uint48` |  |

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

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| changeBy | `uint256` |  |
| daysLeft | `uint48` |  |
| addition | `bool` |  |

### EnableParams

Parameters for the `enable` function

```solidity
struct EnableParams {
        uint256 baseEmissionsRate;
        uint256 minimumPremium;
        uint256 backing;
        uint256 tickSize;
        uint256 minPriceScalar;
        uint256 bondMarketCapacityScalar;
        uint48 restartTimeframe;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| baseEmissionsRate | `uint256` | percent of OHM supply to issue per day at the minimum premium, in OHM scale, i.e. 1e9 = 100% |
| minimumPremium | `uint256` | minimum premium at which to issue OHM, a percentage where 1e18 is 100% |
| backing | `uint256` | backing price of OHM in reserve token, in reserve scale |
| tickSize | `uint256` | fixed tick size in OHM decimals (9) |
| minPriceScalar | `uint256` | scalar for min price |
| bondMarketCapacityScalar | `uint256` | scalar for bond market capacity from auction remainders |
| restartTimeframe | `uint48` | time in seconds that the manager needs to be restarted after a shutdown, otherwise it must be re-initialized |
