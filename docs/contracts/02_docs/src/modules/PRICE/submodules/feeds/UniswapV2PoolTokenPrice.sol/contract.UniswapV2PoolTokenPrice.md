# UniswapV2PoolTokenPrice

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/PRICE/submodules/feeds/UniswapV2PoolTokenPrice.sol)

**Inherits:** [PriceSubmodule](/main/contracts/docs/src/modules/PRICE/PRICE.v2.sol/abstract.PriceSubmodule)

**Title:** UniswapV2PoolTokenPrice

**Author:** 0xJem

Provides prices derived from a Uniswap V2 pool

## Constants

### MAX_DECIMALS

Any token or pool with a decimal scale greater than this would result in an overflow

UniswapV2 uses uint112 to store token balances. Token decimals over this number will result in truncated balances.

```solidity
uint8 internal constant MAX_DECIMALS = 26;
```

### BALANCES_COUNT

The number of balances expected to be in the pool

```solidity
uint256 internal constant BALANCES_COUNT = 2;
```

### POOL_PARAMS_LENGTH

The expected length of the encoded pool parameters (1 address = 32 bytes)

```solidity
uint256 internal constant POOL_PARAMS_LENGTH = 32;
```

## Functions

<a id="constructor-module"></a>

### constructor

```solidity
constructor(Module parent_) Submodule(parent_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parent_ | `Module` |  |

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

<a id="_gettokens-iuniswapv2pair"></a>

### _getTokens

Returns the tokens of a UniswapV2 pool in an array

```solidity
function _getTokens(IUniswapV2Pair pool_) internal view returns (address[] memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `IUniswapV2Pair` | UniswapV2 pool |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address[]` | address[]   Array of length 2 containing token addresses |

<a id="_getreserves-iuniswapv2pair"></a>

### _getReserves

Returns the reserves of a UniswapV2 pool

<i>

This function reverts if the pool does not have the `getReserves()` function.

</i>

```solidity
function _getReserves(IUniswapV2Pair pool_) internal view returns (uint112[] memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `IUniswapV2Pair` | UniswapV2 pool |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint112[]` | uint112[]   Reserves of the pool in their native decimals |

<a id="_converterc20decimals-uint112-address-uint8"></a>

### _convertERC20Decimals

Converts the given value from the ERC20 token's decimals to `outputDecimals_`

<i>

This function will revert if:

- Converting the token's decimals would result in an overflow.

</i>

```solidity
function _convertERC20Decimals(
        uint112 value_,
        address token_,
        uint8 outputDecimals_
    ) internal view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| value_ | `uint112` | Value in native ERC20 token decimals |
| token_ | `address` | The address of the ERC20 token |
| outputDecimals_ | `uint8` | The resulting number of decimals |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256             Value in the scale of `outputDecimals_` |

<a id="getpooltokenprice-address-uint8-bytes"></a>

### getPoolTokenPrice

Determines the unit price of the pool token for the UniswapV2 pool specified in `params_`.

<i>

The pool token price is determined using the "fair LP pricing" described here: [https://cmichel.io/pricing-lp-tokens/](https://cmichel.io/pricing-lp-tokens/)

</i>

<i>

This approach is implemented in order to reduce the susceptibility to manipulation of the pool token price

</i>

<i>

through the pool's reserves.

</i>

```solidity
function getPoolTokenPrice(
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
| params_ | `bytes` | UniswapV2 pool parameters of type `UniswapV2PoolParams` |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256         Price in the scale of `outputDecimals_` |

<a id="gettokenprice-address-uint8-bytes"></a>

### getTokenPrice

Determines the spot price of the specified token from the UniswapV2 pool specified in `params_`

<i>

It does this by:

- Determining the price and reserves of the token paired with `lookupToken_`
- Determining the corresponding price of `lookupToken_`

</i>

<i>

NOTE: as the reserves of UniswapV2 pools can be manipulated using flash loans, the spot price

</i>

<i>

can also be manipulated. Price feeds are a preferred source of price data. Use this function with caution.

</i>

```solidity
function getTokenPrice(
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
| params_ | `bytes` | UniswapV2 pool parameters of type `UniswapV2PoolParams` |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256         Price in the scale of `outputDecimals_` |

## Errors

### UniswapV2_ParamsInvalid

The provided parameters are invalid

```solidity
error UniswapV2_ParamsInvalid(bytes params_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| params_ | `bytes` | The encoded parameters |

### UniswapV2_AssetDecimalsOutOfBounds

The decimals of the asset are out of bounds

```solidity
error UniswapV2_AssetDecimalsOutOfBounds(
        address asset_,
        uint8 assetDecimals_,
        uint8 maxDecimals_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |
| assetDecimals_ | `uint8` | The number of decimals of the asset |
| maxDecimals_ | `uint8` | The maximum number of decimals allowed |

### UniswapV2_LookupTokenNotFound

The lookup token was not found in the pool

```solidity
error UniswapV2_LookupTokenNotFound(address pool_, address asset_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The address of the pool |
| asset_ | `address` | The address of the asset |

### UniswapV2_OutputDecimalsOutOfBounds

The output decimals are out of bounds

```solidity
error UniswapV2_OutputDecimalsOutOfBounds(uint8 outputDecimals_, uint8 maxDecimals_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| outputDecimals_ | `uint8` | The number of decimals to return the price in |
| maxDecimals_ | `uint8` | The maximum number of decimals allowed |

### UniswapV2_PoolTokenBalanceInvalid

The token balance of a pool is invalid

```solidity
error UniswapV2_PoolTokenBalanceInvalid(address pool_, uint8 balanceIndex_, uint256 balance_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The address of the pool |
| balanceIndex_ | `uint8` | The index of the balance |
| balance_ | `uint256` | The balance of the token |

### UniswapV2_PoolBalancesInvalid

The pool balances are invalid

```solidity
error UniswapV2_PoolBalancesInvalid(
        address pool_,
        uint256 balanceCount_,
        uint256 expectedBalanceCount_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The address of the pool |
| balanceCount_ | `uint256` | The number of balances returned by the pool |
| expectedBalanceCount_ | `uint256` | The number of balances expected |

### UniswapV2_ParamsPoolInvalid

The pool specified in the parameters is invalid

```solidity
error UniswapV2_ParamsPoolInvalid(uint8 paramsIndex_, address pool_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| paramsIndex_ | `uint8` | The index of the parameter |
| pool_ | `address` | The address of the pool |

### UniswapV2_PoolSupplyInvalid

The total supply returned by the pool is invalid

<i>

This currently only occurs if the total supply is 0

</i>

```solidity
error UniswapV2_PoolSupplyInvalid(address pool_, uint256 supply_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The address of the pool |
| supply_ | `uint256` | The total supply returned by the pool |

### UniswapV2_PoolTokensInvalid

The pool tokens are invalid

```solidity
error UniswapV2_PoolTokensInvalid(address pool_, uint256 tokenIndex_, address token_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The address of the pool |
| tokenIndex_ | `uint256` | The index of the token |
| token_ | `address` | The address of the token |

### UniswapV2_PoolTypeInvalid

The pool is invalid

<i>

This is triggered if the pool reverted when called,

</i>

<i>

and indicates that the feed address is not a UniswapV2 pool.

</i>

```solidity
error UniswapV2_PoolTypeInvalid(address pool_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The address of the pool |

## Structs

### UniswapV2PoolParams

UniswapV2 pool parameters

```solidity
struct UniswapV2PoolParams {
        IUniswapV2Pair pool;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | `IUniswapV2Pair` | Address of the UniswapV2 pool |
