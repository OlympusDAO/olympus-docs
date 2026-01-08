# CompoundedInterest

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/libraries/CompoundedInterest.sol)

## State Variables

### ONE_YEAR

```solidity
uint96 internal constant ONE_YEAR = 365 days
```

## Functions

### continuouslyCompounded

Calculate the continuously compounded interest
given by: Pₜ = P₀eʳᵗ

```solidity
function continuouslyCompounded(uint256 principal, uint256 elapsedSecs, uint96 interestRatePerYear)
    internal
    pure
    returns (uint256 result);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`principal`|`uint256`|The principal amount, in 18 decimal places|
|`elapsedSecs`|`uint256`|The elapsed seconds|
|`interestRatePerYear`|`uint96`|The interest rate per year, in 18 decimal places|
