# UniswapV3Price

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/modules/PRICE/submodules/feeds/UniswapV3Price.sol)

**Inherits:**
[PriceSubmodule](/main/contracts/docs/src/modules/PRICE/PRICE.v2.sol/abstract.PriceSubmodule)

**Title:**
UniswapV3Price

**Author:**
0xJem

forge-lint: disable-start(mixed-case-function)

Provides prices derived from the TWAP of a Uniswap V3 pool

## State Variables

### BASE_10_MAX_EXPONENT

The maximum number of decimals allowed for a token in order to prevent overflows

```solidity
uint8 internal constant BASE_10_MAX_EXPONENT = 30
```

### POOL_PARAMS_LENGTH

The expected length of the encoded pool parameters (address + uint32 = 64 bytes)

```solidity
uint256 internal constant POOL_PARAMS_LENGTH = 64
```

### POOL_ADDRESS_LENGTH

The expected length of the encoded pool address (32 bytes)

```solidity
uint256 internal constant POOL_ADDRESS_LENGTH = 32
```

### MIN_TICK

The minimum tick that can be used in a pool, as defined by UniswapV3 libraries

```solidity
int24 internal constant MIN_TICK = -887272
```

### MAX_TICK

The maximum tick that can be used in a pool, as defined by UniswapV3 libraries

```solidity
int24 internal constant MAX_TICK = -MIN_TICK
```

### AVERAGE_BLOCK_TIME_SECONDS

Assumed average block time used to estimate required observations for TWAP

```solidity
uint32 public immutable AVERAGE_BLOCK_TIME_SECONDS
```

### UNISWAP_V3_FACTORY

Canonical Uniswap V3 factory used for pool validation

```solidity
address public immutable UNISWAP_V3_FACTORY
```

## Functions

### constructor

Initializes the submodule and records the assumed block time for TWAP cardinality checks.

Calls the `Submodule(parent_)` constructor to bind this feed to the parent PRICE module.
This function will revert if:

- `averageBlockTimeSeconds_ == 0` (`UniswapV3_AverageBlockTimeInvalid`)
- `uniswapV3Factory_ == address(0)` (`UniswapV3_FactoryInvalid`)
  Stores `averageBlockTimeSeconds_` in `AVERAGE_BLOCK_TIME_SECONDS`, which is used by
  `_checkObservationCardinality` to compute minimum required pool cardinality.

```solidity
constructor(Module parent_, uint32 averageBlockTimeSeconds_, address uniswapV3Factory_) Submodule(parent_);
```

**Parameters**

| Name                       | Type      | Description                                        |
| -------------------------- | --------- | -------------------------------------------------- |
| `parent_`                  | `Module`  | The PRICE module                                   |
| `averageBlockTimeSeconds_` | `uint32`  | The average block time used for cardinality checks |
| `uniswapV3Factory_`        | `address` | The canonical Uniswap V3 factory                   |

### SUBKEYCODE

20 byte identifier for the submodule. First 5 bytes must match PARENT().

```solidity
function SUBKEYCODE() public pure override returns (SubKeycode);
```

### VERSION

```solidity
function VERSION() public pure override returns (uint8 major, uint8 minor);
```

### getTokenTWAP

Obtains the price of `lookupToken_` in USD, using the TWAP from the specified Uniswap V3 oracle.

This function will revert if:

- The value of `params.observationWindowSeconds` is less than `UniswapV3OracleHelper.TWAP_MIN_OBSERVATION_WINDOW`
- Any token decimals or `outputDecimals_` are high enough to cause an overflow
- Any tokens in the pool are not set
- `lookupToken_` is not in the pool
- The calculated time-weighted tick is outside the bounds of int24
  NOTE: as a UniswapV3 pool can be manipulated using multi-block MEV, the TWAP values
  can also be manipulated. Price feeds are a preferred source of price data. Use this function with caution.
  See <https://chainsecurity.com/oracle-manipulation-after-merge/>

```solidity
function getTokenTWAP(address lookupToken_, uint8 outputDecimals_, bytes calldata params_)
    external
    view
    returns (uint256);
```

**Parameters**

| Name              | Type      | Description                                                              |
| ----------------- | --------- | ------------------------------------------------------------------------ |
| `lookupToken_`    | `address` | The token to determine the price of.                                     |
| `outputDecimals_` | `uint8`   | The number of output decimals (assumed to be the same as PRICE decimals) |
| `params_`         | `bytes`   | Pool parameters of type `UniswapV3Params`                                |

**Returns**

| Name     | Type      | Description                                     |
| -------- | --------- | ----------------------------------------------- |
| `<none>` | `uint256` | uint256 Price in the scale of `outputDecimals_` |

### getTokenPrice

Obtains the price of `lookupToken_` in USD, using the current Slot0 price from the specified Uniswap V3 oracle.

This function will revert if:

- Any token decimals or `outputDecimals_` are high enough to cause an overflow
- Any tokens in the pool are not set
- `lookupToken_` is not in the pool
  NOTE: as a UniswapV3 pool can be manipulated using multi-block MEV, the TWAP values
  can also be manipulated. Price feeds are a preferred source of price data. Use this function with caution.
  See <https://chainsecurity.com/oracle-manipulation-after-merge/>

```solidity
function getTokenPrice(address lookupToken_, uint8 outputDecimals_, bytes calldata params_)
    external
    view
    returns (uint256);
```

**Parameters**

| Name              | Type      | Description                                                              |
| ----------------- | --------- | ------------------------------------------------------------------------ |
| `lookupToken_`    | `address` | The token to determine the price of.                                     |
| `outputDecimals_` | `uint8`   | The number of output decimals (assumed to be the same as PRICE decimals) |
| `params_`         | `bytes`   | Encoded Uniswap V3 pool address (32 bytes)                               |

**Returns**

| Name     | Type      | Description                                     |
| -------- | --------- | ----------------------------------------------- |
| `<none>` | `uint256` | uint256 Price in the scale of `outputDecimals_` |

### \_checkPoolAndTokenParams

Performs checks to ensure that the pool, the tokens, and the decimals are valid.

This function will revert if:

- Any token decimals or `outputDecimals_` are high enough to cause an overflow
- Any tokens in the pool are not set
- `lookupToken_` is not in the pool

```solidity
function _checkPoolAndTokenParams(address lookupToken_, uint8 outputDecimals_, IUniswapV3Pool pool_)
    internal
    view
    returns (address, uint8, uint8);
```

**Parameters**

| Name              | Type             | Description                         |
| ----------------- | ---------------- | ----------------------------------- |
| `lookupToken_`    | `address`        | The token to determine the price of |
| `outputDecimals_` | `uint8`          | The decimals of `baseToken`         |
| `pool_`           | `IUniswapV3Pool` | The Uniswap V3 pool to use          |

**Returns**

| Name     | Type      | Description                 |
| -------- | --------- | --------------------------- |
| `<none>` | `address` | address Quote token         |
| `<none>` | `uint8`   | uint8 Quote token decimals  |
| `<none>` | `uint8`   | uint8 Lookup token decimals |

### \_checkObservationCardinality

Validates the observation cardinality for a TWAP window.

Uses `AVERAGE_BLOCK_TIME_SECONDS` to derive the minimum cardinality required to
service the requested lookback window.
This function will revert if:

- Pool observation cardinality is below the minimum required cardinality
  (`UniswapV3_ObservationCardinalityInsufficient`)

```solidity
function _checkObservationCardinality(IUniswapV3Pool pool_, uint32 observationWindowSeconds_) internal view;
```

**Parameters**

| Name                        | Type             | Description                                 |
| --------------------------- | ---------------- | ------------------------------------------- |
| `pool_`                     | `IUniswapV3Pool` | The pool used for the TWAP lookup           |
| `observationWindowSeconds_` | `uint32`         | The requested observation window in seconds |

## Errors

### UniswapV3_ParamsInvalid

The provided parameters are invalid

```solidity
error UniswapV3_ParamsInvalid(bytes params_);
```

**Parameters**

| Name      | Type    | Description            |
| --------- | ------- | ---------------------- |
| `params_` | `bytes` | The encoded parameters |

### UniswapV3_AssetDecimalsOutOfBounds

The decimals of the asset are out of bounds

```solidity
error UniswapV3_AssetDecimalsOutOfBounds(address asset_, uint8 assetDecimals_, uint8 maxDecimals_);
```

**Parameters**

| Name             | Type      | Description                            |
| ---------------- | --------- | -------------------------------------- |
| `asset_`         | `address` | The address of the asset               |
| `assetDecimals_` | `uint8`   | The number of decimals of the asset    |
| `maxDecimals_`   | `uint8`   | The maximum number of decimals allowed |

### UniswapV3_LookupTokenNotFound

The lookup token was not found in the pool

```solidity
error UniswapV3_LookupTokenNotFound(address pool_, address asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `pool_`  | `address` | The address of the pool  |
| `asset_` | `address` | The address of the asset |

### UniswapV3_OutputDecimalsOutOfBounds

The output decimals are out of bounds

```solidity
error UniswapV3_OutputDecimalsOutOfBounds(uint8 outputDecimals_, uint8 maxDecimals_);
```

**Parameters**

| Name              | Type    | Description                            |
| ----------------- | ------- | -------------------------------------- |
| `outputDecimals_` | `uint8` | The number of decimals of the output   |
| `maxDecimals_`    | `uint8` | The maximum number of decimals allowed |

### UniswapV3_ParamsPoolInvalid

The pool specified in the parameters is invalid

```solidity
error UniswapV3_ParamsPoolInvalid(uint8 paramsIndex_, address pool_);
```

**Parameters**

| Name           | Type      | Description                |
| -------------- | --------- | -------------------------- |
| `paramsIndex_` | `uint8`   | The index of the parameter |
| `pool_`        | `address` | The address of the pool    |

### UniswapV3_PoolTokensInvalid

The pool tokens are invalid

```solidity
error UniswapV3_PoolTokensInvalid(address pool_, uint8 tokenIndex_, address token_);
```

**Parameters**

| Name          | Type      | Description              |
| ------------- | --------- | ------------------------ |
| `pool_`       | `address` | The address of the pool  |
| `tokenIndex_` | `uint8`   | The index of the token   |
| `token_`      | `address` | The address of the token |

### UniswapV3_PoolTypeInvalid

The pool is invalid

This is triggered if the pool reverted when called,
and indicates that the feed address is not a UniswapV3 pool.

```solidity
error UniswapV3_PoolTypeInvalid(address pool_);
```

**Parameters**

| Name    | Type      | Description             |
| ------- | --------- | ----------------------- |
| `pool_` | `address` | The address of the pool |

### UniswapV3_FactoryInvalid

The provided Uniswap V3 factory is invalid

```solidity
error UniswapV3_FactoryInvalid(address factory_);
```

**Parameters**

| Name       | Type      | Description                    |
| ---------- | --------- | ------------------------------ |
| `factory_` | `address` | The configured factory address |

### UniswapV3_PoolFactoryInvalid

The pool does not match the canonical Uniswap V3 factory's registered pool

```solidity
error UniswapV3_PoolFactoryInvalid(address pool_, address expectedPool_, address factory_);
```

**Parameters**

| Name            | Type      | Description                                           |
| --------------- | --------- | ----------------------------------------------------- |
| `pool_`         | `address` | The provided pool address                             |
| `expectedPool_` | `address` | The pool returned by the canonical Uniswap V3 factory |
| `factory_`      | `address` | The canonical Uniswap V3 factory                      |

### UniswapV3_ObservationCardinalityInsufficient

The pool has insufficient observation cardinality for the TWAP window

```solidity
error UniswapV3_ObservationCardinalityInsufficient(
    address pool_, uint16 observationCardinality_, uint32 observationWindow_, uint32 minimumCardinality_
);
```

**Parameters**

| Name                      | Type      | Description                                             |
| ------------------------- | --------- | ------------------------------------------------------- |
| `pool_`                   | `address` | The address of the pool                                 |
| `observationCardinality_` | `uint16`  | Current observation cardinality on the pool             |
| `observationWindow_`      | `uint32`  | Requested TWAP observation window in seconds            |
| `minimumCardinality_`     | `uint32`  | Minimum cardinality required for the observation window |

### UniswapV3_AverageBlockTimeInvalid

The configured average block time is invalid

```solidity
error UniswapV3_AverageBlockTimeInvalid(uint32 averageBlockTimeSeconds_);
```

**Parameters**

| Name                       | Type     | Description                                  |
| -------------------------- | -------- | -------------------------------------------- |
| `averageBlockTimeSeconds_` | `uint32` | The configured average block time in seconds |

### UniswapV3_PoolReentrancy

Triggered if `pool_` is locked, which indicates re-entrancy

```solidity
error UniswapV3_PoolReentrancy(address pool_);
```

**Parameters**

| Name    | Type      | Description                                 |
| ------- | --------- | ------------------------------------------- |
| `pool_` | `address` | The address of the affected Uniswap V3 pool |

## Structs

### UniswapV3Params

The parameters for a Uniswap V3 pool

```solidity
struct UniswapV3Params {
    IUniswapV3Pool pool;
    uint32 observationWindowSeconds;
}
```

**Properties**

| Name                       | Type             | Description                                          |
| -------------------------- | ---------------- | ---------------------------------------------------- |
| `pool`                     | `IUniswapV3Pool` | The address of the pool                              |
| `observationWindowSeconds` | `uint32`         | The length of the TWAP observation window in seconds |
