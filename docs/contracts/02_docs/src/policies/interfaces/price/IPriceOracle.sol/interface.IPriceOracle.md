# IPriceOracle

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/price/IPriceOracle.sol)

**Title:** IPriceOracle

**Author:** Euler Labs ([https://www.eulerlabs.com/](https://www.eulerlabs.com/))

Common PriceOracle interface.

**Note:**

- **security-contact:** [security@euler.xyz](mailto:security@euler.xyz)

## Functions

<a id="name"></a>

### name

Get the name of the oracle.

```solidity
function name() external view returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` | The name of the oracle. |

<a id="getquote-uint256-address-address"></a>

### getQuote

One-sided price: How much quote token you would get for inAmount of base token, assuming no price spread.

```solidity
function getQuote(
        uint256 inAmount,
        address base,
        address quote
    ) external view returns (uint256 outAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inAmount | `uint256` | The amount of `base` to convert. |
| base | `address` | The token that is being priced. |
| quote | `address` | The token that is the unit of account. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| outAmount | `uint256` | The amount of `quote` that is equivalent to `inAmount` of `base`. |

<a id="getquotes-uint256-address-address"></a>

### getQuotes

Two-sided price: How much quote token you would get/spend for selling/buying inAmount of base token.

```solidity
function getQuotes(
        uint256 inAmount,
        address base,
        address quote
    ) external view returns (uint256 bidOutAmount, uint256 askOutAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inAmount | `uint256` | The amount of `base` to convert. |
| base | `address` | The token that is being priced. |
| quote | `address` | The token that is the unit of account. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bidOutAmount | `uint256` | The amount of `quote` you would get for selling `inAmount` of `base`. |
| askOutAmount | `uint256` | The amount of `quote` you would spend for buying `inAmount` of `base`. |
