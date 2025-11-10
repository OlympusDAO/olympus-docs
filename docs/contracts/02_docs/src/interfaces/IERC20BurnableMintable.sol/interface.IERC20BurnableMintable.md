# IERC20BurnableMintable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/interfaces/IERC20BurnableMintable.sol)

**Inherits:**
[IERC20](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20)

## Functions

### mintFor

Mints tokens to the specified address

```solidity
function mintFor(address to_, uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to_`|`address`|     The address to mint tokens to|
|`amount_`|`uint256`| The amount of tokens to mint|

### burnFrom

Burns tokens from the specified address

```solidity
function burnFrom(address from_, uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from_`|`address`|   The address to burn tokens from|
|`amount_`|`uint256`| The amount of tokens to burn|
