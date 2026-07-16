# CompoundedInterest

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/libraries/CompoundedInterest.sol)

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

| Name                  | Type      | Description                                      |
| --------------------- | --------- | ------------------------------------------------ |
| `principal`           | `uint256` | The principal amount, in 18 decimal places       |
| `elapsedSecs`         | `uint256` | The elapsed seconds                              |
| `interestRatePerYear` | `uint96`  | The interest rate per year, in 18 decimal places |
