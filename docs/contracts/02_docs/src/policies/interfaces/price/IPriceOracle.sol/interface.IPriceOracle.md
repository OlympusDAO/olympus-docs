# IPriceOracle

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/policies/interfaces/price/IPriceOracle.sol)

**Title:**
IPriceOracle

**Author:**
Euler Labs (<https://www.eulerlabs.com/>)

Common PriceOracle interface.

**Note:**
security-contact: <security@euler.xyz>

## Functions

### name

Get the name of the oracle.

```solidity
function name() external view returns (string memory);
```

**Returns**

| Name     | Type     | Description             |
| -------- | -------- | ----------------------- |
| `<none>` | `string` | The name of the oracle. |

### getQuote

One-sided price: How much quote token you would get for inAmount of base token, assuming no price spread.

```solidity
function getQuote(uint256 inAmount, address base, address quote) external view returns (uint256 outAmount);
```

**Parameters**

| Name       | Type      | Description                            |
| ---------- | --------- | -------------------------------------- |
| `inAmount` | `uint256` | The amount of `base` to convert.       |
| `base`     | `address` | The token that is being priced.        |
| `quote`    | `address` | The token that is the unit of account. |

**Returns**

| Name        | Type      | Description                                                       |
| ----------- | --------- | ----------------------------------------------------------------- |
| `outAmount` | `uint256` | The amount of `quote` that is equivalent to `inAmount` of `base`. |

### getQuotes

Two-sided price: How much quote token you would get/spend for selling/buying inAmount of base token.

```solidity
function getQuotes(uint256 inAmount, address base, address quote)
    external
    view
    returns (uint256 bidOutAmount, uint256 askOutAmount);
```

**Parameters**

| Name       | Type      | Description                            |
| ---------- | --------- | -------------------------------------- |
| `inAmount` | `uint256` | The amount of `base` to convert.       |
| `base`     | `address` | The token that is being priced.        |
| `quote`    | `address` | The token that is the unit of account. |

**Returns**

| Name           | Type      | Description                                                            |
| -------------- | --------- | ---------------------------------------------------------------------- |
| `bidOutAmount` | `uint256` | The amount of `quote` you would get for selling `inAmount` of `base`.  |
| `askOutAmount` | `uint256` | The amount of `quote` you would spend for buying `inAmount` of `base`. |
