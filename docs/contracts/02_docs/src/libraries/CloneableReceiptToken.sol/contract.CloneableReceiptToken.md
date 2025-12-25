# CloneableReceiptToken

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/libraries/CloneableReceiptToken.sol)

**Inherits:**
[CloneERC20](/main/contracts/docs/src/external/clones/CloneERC20.sol/abstract.CloneERC20), [IERC20BurnableMintable](/main/contracts/docs/src/interfaces/IERC20BurnableMintable.sol/interface.IERC20BurnableMintable), [IDepositReceiptToken](/main/contracts/docs/src/interfaces/IDepositReceiptToken.sol/interface.IDepositReceiptToken)

**Title:**
CloneableReceiptToken

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

### _onlyOwner

```solidity
function _onlyOwner() internal view;
```

### onlyOwner

Only the owner can call this function

```solidity
modifier onlyOwner() ;
```

### mintFor

Mint tokens to the specified address

This is owner-only, as the underlying token is custodied by the owner.
Minting should be performed through the owner contract.

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

This is gated to the owner, as burning is controlled.
Burning should be performed through the owner contract.
The owner is expected to handle spending approval before calling this function.
This function does NOT check or update allowances.

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
