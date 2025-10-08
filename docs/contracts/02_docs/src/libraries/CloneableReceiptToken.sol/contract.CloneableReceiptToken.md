# CloneableReceiptToken

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/libraries/CloneableReceiptToken.sol)

**Inherits:**
[CloneERC20](/main/contracts/docs/src/external/clones/CloneERC20.sol/abstract.CloneERC20), [IERC20BurnableMintable](/main/contracts/docs/src/interfaces/IERC20BurnableMintable.sol/interface.IERC20BurnableMintable), [IDepositReceiptToken](/main/contracts/docs/src/interfaces/IDepositReceiptToken.sol/interface.IDepositReceiptToken)

ERC20 implementation that is deployed as a clone
with immutable arguments for each supported input token.

## Functions

### owner

The owner of the clone

```solidity
function owner() public pure returns (address _owner);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The owner address stored in immutable args|

### asset

The underlying asset

```solidity
function asset() public pure returns (IERC20 _asset);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`IERC20`|The asset address stored in immutable args|

### depositPeriod

The deposit period (in months)

```solidity
function depositPeriod() public pure returns (uint8 _depositPeriod);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_depositPeriod`|`uint8`|The deposit period stored in immutable args|

### operator

The operator that issued the receipt token

```solidity
function operator() public pure returns (address _operator);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_operator`|`address`|The operator address stored in immutable args|

### onlyOwner

Only the owner can call this function

```solidity
modifier onlyOwner();
```

### mintFor

Mint tokens to the specified address

*This is owner-only, as the underlying token is custodied by the owner.
Minting should be performed through the owner contract.*

```solidity
function mintFor(address to_, uint256 amount_) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to_`|`address`|The address to mint tokens to|
|`amount_`|`uint256`|The amount of tokens to mint|

### burnFrom

Burn tokens from the specified address

*This is gated to the owner, as burning is controlled.
Burning should be performed through the owner contract.*

*This function reverts if:

- The amount is greater than the allowance*

```solidity
function burnFrom(address from_, uint256 amount_) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from_`|`address`|The address to burn tokens from|
|`amount_`|`uint256`|The amount of tokens to burn|

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId_) public pure returns (bool);
```
