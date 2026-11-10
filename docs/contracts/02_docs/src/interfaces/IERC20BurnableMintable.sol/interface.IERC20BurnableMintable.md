# IERC20BurnableMintable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IERC20BurnableMintable.sol)

**Inherits:** [IERC20](/main/contracts/docs/src/interfaces/IERC20.sol/interface.IERC20)

## Functions

<a id="mintfor-address-uint256"></a>

### mintFor

Mints tokens to the specified address

```solidity
function mintFor(address to_, uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` | The address to mint tokens to |
| amount_ | `uint256` | The amount of tokens to mint |

<a id="burnfrom-address-uint256"></a>

### burnFrom

Burns tokens from the specified address

```solidity
function burnFrom(address from_, uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from_ | `address` | The address to burn tokens from |
| amount_ | `uint256` | The amount of tokens to burn |
