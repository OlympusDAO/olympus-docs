# ERC4626Price

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/modules/PRICE/submodules/feeds/ERC4626Price.sol)

**Inherits:**
[PriceSubmodule](/main/contracts/docs/src/modules/PRICE/PRICE.v2.sol/abstract.PriceSubmodule)

**Title:**
ERC4626Price

**Author:**
0xJem

forge-lint: disable-start(mixed-case-function)

A PRICE submodule that provides the price for ERC4626 assets

## State Variables

### BASE_10_MAX_EXPONENT

Any token or pool with a decimal scale greater than this would result in an overflow

```solidity
uint8 internal constant BASE_10_MAX_EXPONENT = 38
```

## Functions

### constructor

```solidity
constructor(Module parent_) Submodule(parent_);
```

### SUBKEYCODE

20 byte identifier for the submodule. First 5 bytes must match PARENT().

```solidity
function SUBKEYCODE() public pure override returns (SubKeycode);
```

### VERSION

```solidity
function VERSION() public pure override returns (uint8 major, uint8 minor);
```

### getPriceFromUnderlying

Determines the price of `asset_` in USD

This function performs the following:

- Performs basic checks

- Determines the underlying assets per share of `asset_`

- Determines the price of the underlying asset

- Returns the product

This function will revert if:

- The output decimals are more than the maximum decimals allowed

- The asset decimals are more than the maximum decimals allowed

- The underlying decimals are more than the maximum decimals allowed

- The underlying asset is not set

- The price of the underlying asset cannot be determined using PRICE

Limitations:

- This adapter trusts the raw ERC4626 `convertToAssets()` share rate. It does not

smooth, bound, or otherwise sanity-check vault accounting changes, so it should

only be configured for vaults whose share conversion is already trusted on oracle

timescales.

- This adapter reports the ERC4626 idealized average-user conversion. It does not

account for withdrawal fees, redemption gates, slippage, or other execution

conditions that may make actual exits worse than `convertToAssets()`.

```solidity
function getPriceFromUnderlying(address asset_, uint8 outputDecimals_, bytes calldata)
    external
    view
    returns (uint256);
```

**Parameters**

| Name              | Type      | Description                                                              |
| ----------------- | --------- | ------------------------------------------------------------------------ |
| `asset_`          | `address` | The address of the ERC4626 asset                                         |
| `outputDecimals_` | `uint8`   | The number of output decimals (assumed to be the same as PRICE decimals) |
| `<none>`          | `bytes`   |                                                                          |

**Returns**

| Name     | Type      | Description                                                              |
| -------- | --------- | ------------------------------------------------------------------------ |
| `<none>` | `uint256` | uint256 The price of `asset_` in USD (in the scale of `outputDecimals_`) |

## Errors

### ERC4626_OutputDecimalsOutOfBounds

The value for output decimals is more than the maximum decimals allowed

```solidity
error ERC4626_OutputDecimalsOutOfBounds(uint8 outputDecimals_, uint8 maxDecimals_);
```

**Parameters**

| Name              | Type    | Description                                 |
| ----------------- | ------- | ------------------------------------------- |
| `outputDecimals_` | `uint8` | The output decimals provided as a parameter |
| `maxDecimals_`    | `uint8` | The maximum decimals allowed                |

### ERC4626_AssetDecimalsOutOfBounds

The value for the ERC4626 decimals is more than the maximum decimals allowed

```solidity
error ERC4626_AssetDecimalsOutOfBounds(uint8 assetDecimals_, uint8 maxDecimals_);
```

**Parameters**

| Name             | Type    | Description                  |
| ---------------- | ------- | ---------------------------- |
| `assetDecimals_` | `uint8` | The asset decimals           |
| `maxDecimals_`   | `uint8` | The maximum decimals allowed |

### ERC4626_UnderlyingDecimalsOutOfBounds

The value for the ERC4626 underlying decimals is more than the maximum decimals allowed

```solidity
error ERC4626_UnderlyingDecimalsOutOfBounds(uint8 underlyingDecimals_, uint8 maxDecimals_);
```

**Parameters**

| Name                  | Type    | Description                   |
| --------------------- | ------- | ----------------------------- |
| `underlyingDecimals_` | `uint8` | The underlying asset decimals |
| `maxDecimals_`        | `uint8` | The maximum decimals allowed  |

### ERC4626_UnderlyingNotSet

The underlying asset is not set

```solidity
error ERC4626_UnderlyingNotSet(address asset_);
```

**Parameters**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `asset_` | `address` | The address of the ERC4626 asset |
