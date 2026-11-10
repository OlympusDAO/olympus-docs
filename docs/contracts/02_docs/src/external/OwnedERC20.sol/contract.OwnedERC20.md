# OwnedERC20

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/OwnedERC20.sol)

**Inherits:** ERC20Burnable, Ownable

ERC20 token with owner-only mint, and a burn function

## Functions

<a id="constructor-string-string-address"></a>

### constructor

```solidity
constructor(
        string memory name_,
        string memory symbol_,
        address initialOwner_
    ) ERC20(name_, symbol_) Ownable(initialOwner_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `string` |  |
| symbol_ | `string` |  |
| initialOwner_ | `address` |  |

<a id="mint-address-uint256"></a>

### mint

Mint tokens to the specified address

<i>

Only the owner can mint tokens

</i>

```solidity
function mint(address to, uint256 amount) public virtual onlyOwner;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | `address` |  |
| amount | `uint256` |  |
