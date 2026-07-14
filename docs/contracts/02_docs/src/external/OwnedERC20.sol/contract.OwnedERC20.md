# OwnedERC20

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/external/OwnedERC20.sol)

**Inherits:**
ERC20Burnable, Ownable

ERC20 token with owner-only mint, and a burn function

## Functions

### constructor

```solidity
constructor(string memory name_, string memory symbol_, address initialOwner_)
    ERC20(name_, symbol_)
    Ownable(initialOwner_);
```

### mint

Mint tokens to the specified address

Only the owner can mint tokens

```solidity
function mint(address to, uint256 amount) public virtual onlyOwner;
```
