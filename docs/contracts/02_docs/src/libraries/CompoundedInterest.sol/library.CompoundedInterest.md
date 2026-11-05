# CompoundedInterest

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/CompoundedInterest.sol)

## Constants

### ONE_YEAR

```solidity
uint96 internal constant ONE_YEAR = 365 days;
```

## Functions

<a id="continuouslycompounded-uint256-uint256-uint96"></a>

### continuouslyCompounded

Calculate the continuously compounded interest
given by: Pₜ = P₀eʳᵗ

```solidity
function continuouslyCompounded(
        uint256 principal,
        uint256 elapsedSecs,
        uint96 interestRatePerYear
    ) internal pure returns (uint256 result);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| principal | `uint256` | The principal amount, in 18 decimal places |
| elapsedSecs | `uint256` | The elapsed seconds |
| interestRatePerYear | `uint96` | The interest rate per year, in 18 decimal places |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| result | `uint256` |  |
