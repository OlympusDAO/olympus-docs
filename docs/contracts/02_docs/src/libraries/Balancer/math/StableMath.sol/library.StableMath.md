# StableMath

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/libraries/Balancer/math/StableMath.sol)

## State Variables

### \_MIN_AMP

```solidity
uint256 internal constant _MIN_AMP = 1
```

### \_MAX_AMP

```solidity
uint256 internal constant _MAX_AMP = 5000
```

### \_AMP_PRECISION

```solidity
uint256 internal constant _AMP_PRECISION = 1e3
```

### \_MAX_STABLE_TOKENS

```solidity
uint256 internal constant _MAX_STABLE_TOKENS = 5
```

## Functions

### \_calculateInvariant

```solidity
function _calculateInvariant(uint256 amplificationParameter, uint256[] memory balances)
    internal
    pure
    returns (uint256);
```

### \_calcOutGivenIn

```solidity
function _calcOutGivenIn(
    uint256 amplificationParameter,
    uint256[] memory balances,
    uint256 tokenIndexIn,
    uint256 tokenIndexOut,
    uint256 tokenAmountIn,
    uint256 invariant
) internal pure returns (uint256);
```

### \_calcInGivenOut

```solidity
function _calcInGivenOut(
    uint256 amplificationParameter,
    uint256[] memory balances,
    uint256 tokenIndexIn,
    uint256 tokenIndexOut,
    uint256 tokenAmountOut,
    uint256 invariant
) internal pure returns (uint256);
```

### \_calcBptOutGivenExactTokensIn

```solidity
function _calcBptOutGivenExactTokensIn(
    uint256 amp,
    uint256[] memory balances,
    uint256[] memory amountsIn,
    uint256 bptTotalSupply,
    uint256 currentInvariant,
    uint256 swapFeePercentage
) internal pure returns (uint256);
```

### \_calcTokenInGivenExactBptOut

```solidity
function _calcTokenInGivenExactBptOut(
    uint256 amp,
    uint256[] memory balances,
    uint256 tokenIndex,
    uint256 bptAmountOut,
    uint256 bptTotalSupply,
    uint256 currentInvariant,
    uint256 swapFeePercentage
) internal pure returns (uint256);
```

### \_calcBptInGivenExactTokensOut

```solidity
function _calcBptInGivenExactTokensOut(
    uint256 amp,
    uint256[] memory balances,
    uint256[] memory amountsOut,
    uint256 bptTotalSupply,
    uint256 currentInvariant,
    uint256 swapFeePercentage
) internal pure returns (uint256);
```

### \_calcTokenOutGivenExactBptIn

```solidity
function _calcTokenOutGivenExactBptIn(
    uint256 amp,
    uint256[] memory balances,
    uint256 tokenIndex,
    uint256 bptAmountIn,
    uint256 bptTotalSupply,
    uint256 currentInvariant,
    uint256 swapFeePercentage
) internal pure returns (uint256);
```

### \_getTokenBalanceGivenInvariantAndAllOtherBalances

```solidity
function _getTokenBalanceGivenInvariantAndAllOtherBalances(
    uint256 amplificationParameter,
    uint256[] memory balances,
    uint256 invariant,
    uint256 tokenIndex
) internal pure returns (uint256);
```
