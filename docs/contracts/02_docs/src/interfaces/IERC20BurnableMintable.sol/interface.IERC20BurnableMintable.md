# IERC20BurnableMintable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/interfaces/IERC20BurnableMintable.sol)

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
