# BalancerPoolTokenPrice

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/PRICE/submodules/feeds/BalancerPoolTokenPrice.sol)

**Inherits:** [PriceSubmodule](/main/contracts/docs/src/modules/PRICE/PRICE.v2.sol/abstract.PriceSubmodule)

**Title:** BalancerPoolTokenPrice

**Author:** 0xJem

Provides prices related to Balancer pools

## Constants

### BASE_10_MAX_EXPONENT

Any token or pool with a decimal scale greater than this would result in an overflow

```solidity
uint8 internal constant BASE_10_MAX_EXPONENT = 50;
```

### WEIGHTED_POOL_POW_DECIMALS

Used when calculating the value of a token in a weighted pool

```solidity
uint8 internal constant WEIGHTED_POOL_POW_DECIMALS = 18;
```

### POOL_PARAMS_LENGTH

The expected length of the encoded pool parameters (1 address = 32 bytes)

```solidity
uint256 internal constant POOL_PARAMS_LENGTH = 32;
```

### balVault

Address of the Balancer vault

```solidity
IVault public immutable balVault;
```

## Functions

<a id="constructor-module-ivault"></a>

### constructor

```solidity
constructor(Module parent_, IVault balVault_) Submodule(parent_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parent_ | `Module` |  |
| balVault_ | `IVault` |  |

<a id="subkeycode"></a>

### SUBKEYCODE

20 byte identifier for the submodule. First 5 bytes must match PARENT().

```solidity
function SUBKEYCODE() public pure override returns (SubKeycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `SubKeycode` |  |

<a id="version"></a>

### VERSION

Returns the version of the contract

```solidity
function VERSION() public pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="_converterc20decimals-uint256-address-uint8"></a>

### _convertERC20Decimals

Converts `value_` from the ERC20 token's decimals to `outputDecimals_`

<i>

This function will revert if:

- Converting the token's decimals would result in an overflow.

</i>

```solidity
function _convertERC20Decimals(
        uint256 value_,
        address token_,
        uint8 outputDecimals_
    ) internal view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| value_ | `uint256` | Value in native ERC20 token decimals |
| token_ | `address` | The address of the ERC20 token |
| outputDecimals_ | `uint8` | The desired number of decimals |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256             Value in the scale of `outputDecimals_` |

<a id="_gettokenbalanceweighting-balancerweightedpoolcache-uint256-uint8"></a>

### _getTokenBalanceWeighting

Obtains the balance/weight ratio of the token at index `index_` in the pool

<i>

This function will revert if:

- Converting the pool's decimals would result in an overflow.

</i>

<i>

As this function is accessing the balances of the pool, ensure that VaultReentrancyLib

</i>

<i>

is called in order to prevent re-entrancy attacks.

</i>

```solidity
function _getTokenBalanceWeighting(
        BalancerWeightedPoolCache memory cache,
        uint256 index_,
        uint8 outputDecimals_
    ) internal view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| cache | `BalancerWeightedPoolCache` | Cached data related to the Balancer weighted pool |
| index_ | `uint256` | Index of the token in the Balancer pool |
| outputDecimals_ | `uint8` | The desired number of decimals |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256             Value in the scale of `outputDecimals_` |

<a id="_gettokenvalueinweightedpool-address-uint256-uint8-uint8-bytes32-uint256"></a>

### _getTokenValueInWeightedPool

Calculates the value of a token in a Balancer weighted pool

<i>

This function will revert if:

- The provided token is address(0)
- The provided weight is 0

</i>

```solidity
function _getTokenValueInWeightedPool(
        address token_,
        uint256 weight_,
        uint8 poolDecimals_,
        uint8 outputDecimals_,
        bytes32 poolId_,
        uint256 index_
    ) internal view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token_ | `address` | Address of the token |
| weight_ | `uint256` | Weight of the token in the Balancer pool |
| poolDecimals_ | `uint8` | The number of decimals of the Balancer pool |
| outputDecimals_ | `uint8` | The desired number of decimals |
| poolId_ | `bytes32` | id of the Balancer pool |
| index_ | `uint256` | Index of the token in the Balancer pool |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256             Value in the scale of `outputDecimals_` |

<a id="_getweightedpoolrawvalue-address-uint256-uint8-uint8-bytes32"></a>

### _getWeightedPoolRawValue

Calculates the value of a Balancer weighted pool

<i>

This function calculates the value of each token and returns the sum.

</i>

```solidity
function _getWeightedPoolRawValue(
        address[] memory tokens_,
        uint256[] memory weights_,
        uint8 poolDecimals_,
        uint8 outputDecimals_,
        bytes32 poolId_
    ) internal view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokens_ | `address[]` | Array of tokens in the Balancer pool |
| weights_ | `uint256[]` | Array of weights of the tokens in the Balancer pool |
| poolDecimals_ | `uint8` | The number of decimals of the Balancer pool |
| outputDecimals_ | `uint8` | The desired number of decimals |
| poolId_ | `bytes32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256             Value in the scale of `outputDecimals_` |

<a id="getweightedpooltokenprice-address-uint8-bytes"></a>

### getWeightedPoolTokenPrice

Determines the unit price of the pool token for the Balancer weighted pool specified in `params_`.

<i>

To avoid price manipulation, this function calculated the pool token price in the manner recommended by

</i>

<i>

Balancer at <https://docs.balancer.fi/concepts/advanced/valuing-bpt/valuing-bpt.html#on-chain-price-evaluation> :

- Obtains the prices of all tokens in the pool from PRICE (usually using price feeds)
- Applies a guard to protect against re-entrancy attacks on the Balancer pool

</i>

<i>

This function will revert if:

- The scale of `outputDecimals_` or the pool's decimals is too high
- The pool is mis-configured
- If the pool is not a weighted pool

</i>

```solidity
function getWeightedPoolTokenPrice(
        address,
        uint8 outputDecimals_,
        bytes calldata params_
    ) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `address` |  |
| outputDecimals_ | `uint8` | The number of output decimals (assumed to be the same as PRICE decimals) |
| params_ | `bytes` | Balancer pool parameters of type `BalancerWeightedPoolParams` |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256         Price in the scale of `outputDecimals_` |

<a id="getstablepooltokenprice-address-uint8-bytes"></a>

### getStablePoolTokenPrice

Determines the unit price of the pool token for the Balancer stable pool specified in `params_`.

<i>

To avoid price manipulation, this function calculated the pool token price in the following manner:

- Applies a guard to protect against re-entrancy attacks on the Balancer pool
- Utilises the formula suggested by Balancer: <https://docs.balancer.fi/concepts/advanced/valuing-bpt/valuing-bpt.html#on-chain-price-evaluation>

</i>

<i>

This function will revert if:

- The scale of `outputDecimals_` or the pool's decimals is too high
- The pool is mis-configured
- If the pool is not a stable pool or is a composable stable pool (determined by the absence of the `getLastInvariant()` function)

</i>

<i>

NOTE: If there is a significant de-peg between the prices of constituent assets, the token price will be inaccurate. See the now-deleted mention of this: <https://github.com/balancer/docs/pull/112/files>

</i>

```solidity
function getStablePoolTokenPrice(
        address,
        uint8 outputDecimals_,
        bytes calldata params_
    ) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `address` |  |
| outputDecimals_ | `uint8` | The number of output decimals (assumed to be the same as PRICE decimals) |
| params_ | `bytes` | Balancer pool parameters of type `BalancerStablePoolParams` |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256         Price in the scale of outputDecimals_ |

<a id="gettokenpricefromweightedpool-address-uint8-bytes"></a>

### getTokenPriceFromWeightedPool

Determines the spot price of the specified token from the Balancer pool specified in `params_`.

<i>

It does this by:

- Determining the price and reserves of the token paired with `lookupToken_`
- Determining the corresponding price of `lookupToken_`

</i>

<i>

Will revert upon the following:

- If `outputDecimals_` or the pool's decimals are too high
- If the transaction involves reentrancy on the Balancer pool
- If the pool is not a weighted pool

</i>

<i>

NOTE: as the reserves of Balancer pools can be manipulated using flash loans, the spot price

</i>

<i>

can also be manipulated. Price feeds are a preferred source of price data. Use this function with caution.

</i>

```solidity
function getTokenPriceFromWeightedPool(
        address lookupToken_,
        uint8 outputDecimals_,
        bytes calldata params_
    ) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lookupToken_ | `address` | The token to determine the price of |
| outputDecimals_ | `uint8` | The number of output decimals (assumed to be the same as PRICE decimals) |
| params_ | `bytes` | Balancer pool parameters of type `BalancerWeightedPoolParams` |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256         Price in the scale of `outputDecimals_` |

<a id="gettokenpricefromstablepool-address-uint8-bytes"></a>

### getTokenPriceFromStablePool

Determines the spot price of the specified token from the Balancer pool specified in `params_`.

<i>

It does this by:

- Using the Balancer StableMath library to determine the quantity of `lookupToken_` returned for 1 of

</i>

<i>

any token paired with `lookupToken_` for which a price is available

</i>

<i>

Will revert upon the following:

- If the transaction involves reentrancy on the Balancer pool
- If the pool is not a stable pool or is a composable stable pool (determined by the absence of the `getLastInvariant()` function)

</i>

<i>

NOTE: as the reserves of Balancer pools can be manipulated using flash loans, the spot price

</i>

<i>

can also be manipulated. Price feeds are a preferred source of price data. Use this function with caution.

</i>

```solidity
function getTokenPriceFromStablePool(
        address lookupToken_,
        uint8 outputDecimals_,
        bytes calldata params_
    ) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lookupToken_ | `address` | The token to determine the price of |
| outputDecimals_ | `uint8` | The number of output decimals (assumed to be the same as PRICE decimals) |
| params_ | `bytes` | Balancer pool parameters of type `BalancerStablePoolParams` |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256         Price in the scale of `outputDecimals_` |

## Errors

### Balancer_ParamsInvalid

The provided parameters are invalid

```solidity
error Balancer_ParamsInvalid(bytes params_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| params_ | `bytes` | The encoded parameters |

### Balancer_AssetDecimalsOutOfBounds

The number of decimals of the asset is greater than the maximum allowed

```solidity
error Balancer_AssetDecimalsOutOfBounds(address asset_, uint8 decimals_, uint8 maxDecimals_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |
| decimals_ | `uint8` | The number of decimals of the asset |
| maxDecimals_ | `uint8` | The maximum number of decimals allowed |

### Balancer_LookupTokenNotFound

The provided token was not found in the Balancer pool

```solidity
error Balancer_LookupTokenNotFound(bytes32 poolId_, address asset_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |
| asset_ | `address` | The address of the token |

### Balancer_OutputDecimalsOutOfBounds

The desired number of output decimals is greater than the maximum allowed

```solidity
error Balancer_OutputDecimalsOutOfBounds(uint8 outputDecimals_, uint8 maxDecimals_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| outputDecimals_ | `uint8` | The desired number of output decimals |
| maxDecimals_ | `uint8` | The maximum number of decimals allowed |

### Balancer_PoolDecimalsOutOfBounds

The number of decimals of the pool is greater than the maximum allowed

```solidity
error Balancer_PoolDecimalsOutOfBounds(
        bytes32 poolId_,
        uint8 poolDecimals_,
        uint8 maxDecimals_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |
| poolDecimals_ | `uint8` | The number of decimals of the pool |
| maxDecimals_ | `uint8` | The maximum number of decimals allowed |

### Balancer_PoolStableRateInvalid

The stable rate returned by the pool is invalid

<i>

This currently only occurs if the rate is 0

</i>

```solidity
error Balancer_PoolStableRateInvalid(bytes32 poolId_, uint256 rate_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |
| rate_ | `uint256` | The stable rate returned by the pool |

### Balancer_PoolSupplyInvalid

The total supply returned by the pool is invalid

<i>

This currently only occurs if the total supply is 0

</i>

```solidity
error Balancer_PoolSupplyInvalid(bytes32 poolId_, uint256 supply_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |
| supply_ | `uint256` | The total supply returned by the pool |

### Balancer_PoolTokenInvalid

A token in the pool is invalid

<i>

This currently only occurs if the token address is 0

</i>

```solidity
error Balancer_PoolTokenInvalid(bytes32 poolId_, uint256 index_, address token_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |
| index_ | `uint256` | The index of the token in the pool |
| token_ | `address` | The address of the token |

### Balancer_PoolValueZero

The value of the Balancer pool is zero

<i>

This currently only occurs if the number of tokens is 0

</i>

```solidity
error Balancer_PoolValueZero(bytes32 poolId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |

### Balancer_PoolTokenWeightMismatch

There is a mismatch between the number of tokens and weights

<i>

This is unlikely to occur, but is in place to be defensive

</i>

```solidity
error Balancer_PoolTokenWeightMismatch(
        bytes32 poolId_,
        uint256 tokenCount_,
        uint256 weightCount_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |
| tokenCount_ | `uint256` | The number of tokens in the Balancer pool |
| weightCount_ | `uint256` | The number of weights in the Balancer pool |

### Balancer_PoolTokenBalanceMismatch

There is a mismatch between the number of tokens and balances

<i>

This is unlikely to occur, but is in place to be defensive

</i>

```solidity
error Balancer_PoolTokenBalanceMismatch(
        bytes32 poolId_,
        uint256 tokenCount_,
        uint256 balanceCount_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |
| tokenCount_ | `uint256` | The number of tokens in the Balancer pool |
| balanceCount_ | `uint256` | The number of balances in the Balancer pool |

### Balancer_PoolTokenBalanceWeightMismatch

There is a mismatch between the number of tokens, balances and weights

<i>

This is unlikely to occur, but is in place to be defensive

</i>

```solidity
error Balancer_PoolTokenBalanceWeightMismatch(
        bytes32 poolId_,
        uint256 tokenCount_,
        uint256 balanceCount_,
        uint256 weightCount_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |
| tokenCount_ | `uint256` | The number of tokens in the Balancer pool |
| balanceCount_ | `uint256` | The number of balances in the Balancer pool |
| weightCount_ | `uint256` | The number of weights in the Balancer pool |

### Balancer_PoolTypeNotStable

The pool is not a stable pool

```solidity
error Balancer_PoolTypeNotStable(bytes32 poolId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |

### Balancer_PoolTypeNotWeighted

The pool is not a weighted pool

```solidity
error Balancer_PoolTypeNotWeighted(bytes32 poolId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |

### Balancer_PoolWeightInvalid

A weight in the pool is invalid

<i>

This currently only occurs if the weight is 0

</i>

```solidity
error Balancer_PoolWeightInvalid(bytes32 poolId_, uint256 index_, uint256 weight_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |
| index_ | `uint256` | The index of the weight in the pool |
| weight_ | `uint256` | The value of the weight |

### Balancer_PriceNotFound

The price of a corresponding token could not be found

<i>

This occurs if there are no asset definitions in PRICE

</i>

<i>

for the other tokens in the Balancer pool, and hence

</i>

<i>

the price of the lookup token cannot be determined

</i>

```solidity
error Balancer_PriceNotFound(bytes32 poolId_, address lookupToken_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId_ | `bytes32` | The id of the Balancer pool |
| lookupToken_ | `address` | The token to determine the price of |

## Structs

### BalancerWeightedPoolParams

Parameters for a Balancer weighted pool

```solidity
struct BalancerWeightedPoolParams {
        IWeightedPool pool;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | `IWeightedPool` | Address of the Balancer pool |

### BalancerStablePoolParams

Parameters for a Balancer stable pool

```solidity
struct BalancerStablePoolParams {
        IStablePool pool;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | `IStablePool` | Address of the Balancer pool |

### BalancerWeightedPoolCache

Struct to cache data related to a Balancer weighted pool

<i>

This is not persisted between calls, and is only used to reduce the number of parameters

</i>

```solidity
struct BalancerWeightedPoolCache {
        address[] tokens;
        uint256[] weights;
        uint256[] balances;
        uint8 decimals;
        bytes32 poolId;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokens | `address[]` |  |
| weights | `uint256[]` |  |
| balances | `uint256[]` |  |
| decimals | `uint8` |  |
| poolId | `bytes32` |  |
