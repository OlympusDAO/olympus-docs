# IERC20BurnableMintable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/interfaces/IERC20BurnableMintable.sol)

**Inherits:**
[IERC20](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20)

## Functions

### mintFor

Mints tokens to the specified address

```solidity
function mintFor(address to_, uint256 amount_) external;
```

**Parameters**

| Name      | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `to_`     | `address` | The address to mint tokens to |
| `amount_` | `uint256` | The amount of tokens to mint  |

### burnFrom

Burns tokens from the specified address

```solidity
function burnFrom(address from_, uint256 amount_) external;
```

**Parameters**

| Name      | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| `from_`   | `address` | The address to burn tokens from |
| `amount_` | `uint256` | The amount of tokens to burn    |
