# StableMath

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/Balancer/math/StableMath.sol)

## Constants

### _MIN_AMP

```solidity
uint256 internal constant _MIN_AMP = 1;
```

### _MAX_AMP

```solidity
uint256 internal constant _MAX_AMP = 5000;
```

### _AMP_PRECISION

```solidity
uint256 internal constant _AMP_PRECISION = 1e3;
```

### _MAX_STABLE_TOKENS

```solidity
uint256 internal constant _MAX_STABLE_TOKENS = 5;
```

## Functions

<a id="_calculateinvariant-uint256-uint256"></a>

### _calculateInvariant

```solidity
function _calculateInvariant(
        uint256 amplificationParameter,
        uint256[] memory balances
    ) internal pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amplificationParameter | `uint256` |  |
| balances | `uint256[]` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="_calcoutgivenin-uint256-uint256-uint256-uint256-uint256-uint256"></a>

### _calcOutGivenIn

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amplificationParameter | `uint256` |  |
| balances | `uint256[]` |  |
| tokenIndexIn | `uint256` |  |
| tokenIndexOut | `uint256` |  |
| tokenAmountIn | `uint256` |  |
| invariant | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="_calcingivenout-uint256-uint256-uint256-uint256-uint256-uint256"></a>

### _calcInGivenOut

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amplificationParameter | `uint256` |  |
| balances | `uint256[]` |  |
| tokenIndexIn | `uint256` |  |
| tokenIndexOut | `uint256` |  |
| tokenAmountOut | `uint256` |  |
| invariant | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="_calcbptoutgivenexacttokensin-uint256-uint256-uint256-uint256-uint256-uint256"></a>

### _calcBptOutGivenExactTokensIn

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amp | `uint256` |  |
| balances | `uint256[]` |  |
| amountsIn | `uint256[]` |  |
| bptTotalSupply | `uint256` |  |
| currentInvariant | `uint256` |  |
| swapFeePercentage | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="_calctokeningivenexactbptout-uint256-uint256-uint256-uint256-uint256-uint256-uint256"></a>

### _calcTokenInGivenExactBptOut

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amp | `uint256` |  |
| balances | `uint256[]` |  |
| tokenIndex | `uint256` |  |
| bptAmountOut | `uint256` |  |
| bptTotalSupply | `uint256` |  |
| currentInvariant | `uint256` |  |
| swapFeePercentage | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="_calcbptingivenexacttokensout-uint256-uint256-uint256-uint256-uint256-uint256"></a>

### _calcBptInGivenExactTokensOut

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amp | `uint256` |  |
| balances | `uint256[]` |  |
| amountsOut | `uint256[]` |  |
| bptTotalSupply | `uint256` |  |
| currentInvariant | `uint256` |  |
| swapFeePercentage | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="_calctokenoutgivenexactbptin-uint256-uint256-uint256-uint256-uint256-uint256-uint256"></a>

### _calcTokenOutGivenExactBptIn

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amp | `uint256` |  |
| balances | `uint256[]` |  |
| tokenIndex | `uint256` |  |
| bptAmountIn | `uint256` |  |
| bptTotalSupply | `uint256` |  |
| currentInvariant | `uint256` |  |
| swapFeePercentage | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="_gettokenbalancegiveninvariantandallotherbalances-uint256-uint256-uint256-uint256"></a>

### _getTokenBalanceGivenInvariantAndAllOtherBalances

```solidity
function _getTokenBalanceGivenInvariantAndAllOtherBalances(
        uint256 amplificationParameter,
        uint256[] memory balances,
        uint256 invariant,
        uint256 tokenIndex
    ) internal pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amplificationParameter | `uint256` |  |
| balances | `uint256[]` |  |
| invariant | `uint256` |  |
| tokenIndex | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |
