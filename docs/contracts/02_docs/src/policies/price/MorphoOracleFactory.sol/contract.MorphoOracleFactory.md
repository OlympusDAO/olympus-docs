# MorphoOracleFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/price/MorphoOracleFactory.sol)

**Inherits:** [BaseOracleFactory](/main/contracts/docs/src/policies/price/BaseOracleFactory.sol/abstract.BaseOracleFactory)

**Title:** MorphoOracleFactory

**Author:** OlympusDAO

Factory contract for deploying MorphoOracle clones for collateral/loan token pairs

<i>

Uses ClonesWithImmutableArgs for gas-efficient oracle deployment

</i>

## Constants

### ORACLE_IMPLEMENTATION

Reference implementation for cloning

```solidity
MorphoOracleCloneable public immutable ORACLE_IMPLEMENTATION;
```

### MORPHO_DECIMALS

The Morpho scale factor decimals

```solidity
uint8 internal constant MORPHO_DECIMALS = 36;
```

## Functions

<a id="constructor-kernel-address"></a>

### constructor

Constructs a new MorphoOracleFactory

<i>

Reverts if `priceCache_` is not a valid IPriceCache policy for this Kernel.

</i>

```solidity
constructor(Kernel kernel_, address priceCache_) BaseOracleFactory(kernel_, priceCache_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` | The Kernel address |
| priceCache_ | `address` | The price cache policy address |

<a id="_getoracleimplementation"></a>

### _getOracleImplementation

Returns the Morpho oracle implementation address for cloning

```solidity
function _getOracleImplementation() internal view override returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | The address of the MorphoOracleCloneable implementation |

<a id="_encodeoracledata-address-address-uint48-bytes"></a>

### _encodeOracleData

Encodes Morpho-specific oracle data for cloning

<i>

Performs Morpho-specific validation (decimals bounds check),
generates oracle name, and encodes immutable args.
Note: baseToken<em> is used as collateralToken, quoteToken</em> is used as loanToken.
If either token is a non-contract asset, decimals are PriceCache metadata rather
than token metadata. The clone recalculates from `PriceCache.assetDecimals()` on
reads, so later NCA decimal updates can change the live Morpho scale factor.

</i>

```solidity
function _encodeOracleData(
        address collateralToken_,
        address loanToken_,
        uint48 maxAge_,
        bytes calldata
    ) internal view override returns (bytes memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| collateralToken_ | `address` | The base token address |
| loanToken_ | `address` | The quote token address |
| maxAge_ | `uint48` | The maximum age (in seconds) of cached prices used by the oracle |
| _ | `bytes` | Service-specific custom parameters (can be empty) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes` | bytes          The encoded bytes for cloning |

## Errors

### MorphoOracleFactory_TokenDecimalsOutOfBounds

Thrown when token decimals result in invalid scale factor (overflow or negative)

```solidity
error MorphoOracleFactory_TokenDecimalsOutOfBounds(address collateralToken, address loanToken);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| collateralToken | `address` | The collateral token address |
| loanToken | `address` | The loan token address |
