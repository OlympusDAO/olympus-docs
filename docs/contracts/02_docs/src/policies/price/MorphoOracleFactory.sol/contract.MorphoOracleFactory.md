# MorphoOracleFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/policies/price/MorphoOracleFactory.sol)

**Inherits:**
[BaseOracleFactory](/main/contracts/docs/src/policies/price/BaseOracleFactory.sol/abstract.BaseOracleFactory)

**Title:**
MorphoOracleFactory

**Author:**
OlympusDAO

forge-lint: disable-start(mixed-case-function,mixed-case-variable)

Factory contract for deploying MorphoOracle clones for collateral/loan token pairs

Uses ClonesWithImmutableArgs for gas-efficient oracle deployment

## State Variables

### ORACLE_IMPLEMENTATION

Reference implementation for cloning

```solidity
MorphoOracleCloneable public immutable ORACLE_IMPLEMENTATION
```

### MORPHO_DECIMALS

The Morpho scale factor decimals

```solidity
uint8 internal constant MORPHO_DECIMALS = 36
```

## Functions

### constructor

Constructs a new MorphoOracleFactory

Reverts if `priceCache_` is not a valid IPriceCache policy for this Kernel.

```solidity
constructor(Kernel kernel_, address priceCache_) BaseOracleFactory(kernel_, priceCache_);
```

**Parameters**

| Name          | Type      | Description                    |
| ------------- | --------- | ------------------------------ |
| `kernel_`     | `Kernel`  | The Kernel address             |
| `priceCache_` | `address` | The price cache policy address |

### \_getOracleImplementation

Returns the Morpho oracle implementation address for cloning

```solidity
function _getOracleImplementation() internal view override returns (address);
```

**Returns**

| Name     | Type      | Description                                             |
| -------- | --------- | ------------------------------------------------------- |
| `<none>` | `address` | The address of the MorphoOracleCloneable implementation |

### \_encodeOracleData

Encodes Morpho-specific oracle data for cloning

Performs Morpho-specific validation (decimals bounds check),
generates oracle name, and encodes immutable args.
Note: baseToken*is used as collateralToken, quoteToken* is used as loanToken.
If either token is a non-contract asset, decimals are PriceCache metadata rather
than token metadata. The clone recalculates from `PriceCache.assetDecimals()` on
reads, so later NCA decimal updates can change the live Morpho scale factor.

```solidity
function _encodeOracleData(address collateralToken_, address loanToken_, uint48 maxAge_, bytes calldata)
    internal
    view
    override
    returns (bytes memory);
```

**Parameters**

| Name               | Type      | Description                                                      |
| ------------------ | --------- | ---------------------------------------------------------------- |
| `collateralToken_` | `address` |                                                                  |
| `loanToken_`       | `address` |                                                                  |
| `maxAge_`          | `uint48`  | The maximum age (in seconds) of cached prices used by the oracle |
| `<none>`           | `bytes`   |                                                                  |

**Returns**

| Name     | Type    | Description                         |
| -------- | ------- | ----------------------------------- |
| `<none>` | `bytes` | bytes The encoded bytes for cloning |

## Errors

### MorphoOracleFactory_TokenDecimalsOutOfBounds

Thrown when token decimals result in invalid scale factor (overflow or negative)

```solidity
error MorphoOracleFactory_TokenDecimalsOutOfBounds(address collateralToken, address loanToken);
```

**Parameters**

| Name              | Type      | Description                  |
| ----------------- | --------- | ---------------------------- |
| `collateralToken` | `address` | The collateral token address |
| `loanToken`       | `address` | The loan token address       |
