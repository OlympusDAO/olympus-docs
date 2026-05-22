# ChainlinkOracleFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/policies/price/ChainlinkOracleFactory.sol)

**Inherits:**
[BaseOracleFactory](/main/contracts/docs/src/policies/price/BaseOracleFactory.sol/abstract.BaseOracleFactory)

**Title:**
ChainlinkOracleFactory

**Author:**
OlympusDAO

forge-lint: disable-start(mixed-case-function,mixed-case-variable)

Factory contract for deploying ChainlinkOracle clones for base/quote token pairs

Uses ClonesWithImmutableArgs for gas-efficient oracle deployment

## State Variables

### ORACLE_IMPLEMENTATION

Reference implementation for cloning

```solidity
ChainlinkOracleCloneable public immutable ORACLE_IMPLEMENTATION
```

## Functions

### constructor

Constructs a new ChainlinkOracleFactory

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

Returns the Chainlink oracle implementation address for cloning

```solidity
function _getOracleImplementation() internal view override returns (address);
```

**Returns**

| Name     | Type      | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `<none>` | `address` | The address of the ChainlinkOracleCloneable implementation |

### \_encodeOracleData

Encodes oracle-specific data for cloning

Generates oracle name and encodes immutable args.

```solidity
function _encodeOracleData(address baseToken_, address quoteToken_, uint48 maxAge_, bytes calldata)
    internal
    view
    override
    returns (bytes memory);
```

**Parameters**

| Name          | Type      | Description                                                      |
| ------------- | --------- | ---------------------------------------------------------------- |
| `baseToken_`  | `address` | The base token address                                           |
| `quoteToken_` | `address` | The quote token address                                          |
| `maxAge_`     | `uint48`  | The maximum age (in seconds) of cached prices used by the oracle |
| `<none>`      | `bytes`   |                                                                  |

**Returns**

| Name     | Type    | Description                         |
| -------- | ------- | ----------------------------------- |
| `<none>` | `bytes` | bytes The encoded bytes for cloning |
