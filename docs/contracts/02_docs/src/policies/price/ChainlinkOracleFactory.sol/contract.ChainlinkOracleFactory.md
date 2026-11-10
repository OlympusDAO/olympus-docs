# ChainlinkOracleFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/price/ChainlinkOracleFactory.sol)

**Inherits:** [BaseOracleFactory](/main/contracts/docs/src/policies/price/BaseOracleFactory.sol/abstract.BaseOracleFactory)

**Title:** ChainlinkOracleFactory

**Author:** OlympusDAO

Factory contract for deploying ChainlinkOracle clones for base/quote token pairs

<i>

Uses ClonesWithImmutableArgs for gas-efficient oracle deployment

</i>

## Constants

### ORACLE_IMPLEMENTATION

Reference implementation for cloning

```solidity
ChainlinkOracleCloneable public immutable ORACLE_IMPLEMENTATION;
```

## Functions

<a id="constructor-kernel-address"></a>

### constructor

Constructs a new ChainlinkOracleFactory

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

Returns the Chainlink oracle implementation address for cloning

```solidity
function _getOracleImplementation() internal view override returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | The address of the ChainlinkOracleCloneable implementation |

<a id="_encodeoracledata-address-address-uint48-bytes"></a>

### _encodeOracleData

Encodes oracle-specific data for cloning

<i>

Generates oracle name and encodes immutable args.

</i>

```solidity
function _encodeOracleData(
        address baseToken_,
        address quoteToken_,
        uint48 maxAge_,
        bytes calldata
    ) internal view override returns (bytes memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| baseToken_ | `address` | The base token address |
| quoteToken_ | `address` | The quote token address |
| maxAge_ | `uint48` | The maximum age (in seconds) of cached prices used by the oracle |
| _ | `bytes` | Service-specific custom parameters (can be empty) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes` | bytes          The encoded bytes for cloning |
