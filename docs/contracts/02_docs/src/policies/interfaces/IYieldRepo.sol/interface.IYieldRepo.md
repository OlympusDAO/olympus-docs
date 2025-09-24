# IYieldRepo

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/interfaces/IYieldRepo.sol)

## Functions

### endEpoch

Triggers the yield repurchase facility functionality
Access controlled to the "heart" role

*Increments the epoch and triggers various actions depending on the new epoch number
When epoch == epochLength (21), withdraws the last week's yield and interest from the treasury
When epoch % 3 == 0 (once a day), triggers the creation of a bond market with the currently bid amount
Otherwise, does nothing.
The contract can be shutdown and this function will still work, but executes no logic.*

```solidity
function endEpoch() external;
```

### epoch

========== VIEWS ========== //

Returns the current epoch

```solidity
function epoch() external view returns (uint48);
```

### getReserveBalance

Returns the current balance of yield generating reserves in the treasury and clearinghouse

```solidity
function getReserveBalance() external view returns (uint256);
```

### getNextYield

Returns the next yield amount which is converted to the bid budget

*This value uses the current sDAI balance, but always assumes a week's worth of interest for the clearinghouse
Therefore, it's only accurate when called close to the end of the epoch*

```solidity
function getNextYield() external view returns (uint256);
```

### getOhmBalanceAndBacking

Returns the contract's OHM balance and the DAI balance to be returned for burning the OHM

*This computes a DAI amount using contract ohm balance and backing of 11.33 DAI*

```solidity
function getOhmBalanceAndBacking() external view returns (uint256, uint256);
```

## Events

### RepoMarket

```solidity
event RepoMarket(uint256 marketId, uint256 bidAmount);
```

### NextYieldSet

```solidity
event NextYieldSet(uint256 nextYield);
```

## Errors

### TooMuchIncrease

```solidity
error TooMuchIncrease();
```

### InvalidParam

```solidity
error InvalidParam(string param);
```

## Structs

### EnableParams

```solidity
struct EnableParams {
    uint256 initialReserveBalance;
    uint256 initialConversionRate;
    uint256 initialYield;
}
```
