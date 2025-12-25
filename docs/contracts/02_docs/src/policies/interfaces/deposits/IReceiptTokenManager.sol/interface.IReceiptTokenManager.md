# IReceiptTokenManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/policies/interfaces/deposits/IReceiptTokenManager.sol)

**Inherits:**
IERC6909, [IERC6909Wrappable](/main/contracts/docs/src/interfaces/IERC6909Wrappable.sol/interface.IERC6909Wrappable)

**Title:**
IReceiptTokenManager

Interface for the contract that creates and manages receipt tokens

## Functions

### createToken

Creates a new receipt token

The caller (msg.sender) becomes the owner of the token for security

```solidity
function createToken(IERC20 asset_, uint8 depositPeriod_, address operator_, string memory operatorName_)
    external
    returns (uint256 tokenId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The underlying asset|
|`depositPeriod_`|`uint8`| The deposit period|
|`operator_`|`address`|      The operator address|
|`operatorName_`|`string`|  The operator name for token metadata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|        The created token ID|

### mint

Mints tokens to a recipient

Gated to the owner (creator) of the token

```solidity
function mint(address to_, uint256 tokenId_, uint256 amount_, bool shouldWrap_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to_`|`address`|        The recipient|
|`tokenId_`|`uint256`|   The token ID|
|`amount_`|`uint256`|    The amount to mint|
|`shouldWrap_`|`bool`|Whether to wrap as ERC20|

### burn

Burns tokens from a holder

Gated to the owner (creator) of the token

```solidity
function burn(address from_, uint256 tokenId_, uint256 amount_, bool isWrapped_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from_`|`address`|      The holder|
|`tokenId_`|`uint256`|   The token ID|
|`amount_`|`uint256`|    The amount to burn|
|`isWrapped_`|`bool`| Whether the tokens are wrapped|

### getReceiptTokenId

Generates a receipt token ID

```solidity
function getReceiptTokenId(address owner_, IERC20 asset_, uint8 depositPeriod_, address operator_)
    external
    pure
    returns (uint256 tokenId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner_`|`address`|         The owner address|
|`asset_`|`IERC20`|         The asset|
|`depositPeriod_`|`uint8`| The deposit period|
|`operator_`|`address`|      The operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|        The generated token ID|

### getTokenName

Returns the name of a receipt token

```solidity
function getTokenName(uint256 tokenId_) external view returns (string memory name);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The ID of the receipt token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`name`|`string`|       The name of the receipt token|

### getTokenSymbol

Returns the symbol of a receipt token

```solidity
function getTokenSymbol(uint256 tokenId_) external view returns (string memory symbol);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The ID of the receipt token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`symbol`|`string`|     The symbol of the receipt token|

### getTokenDecimals

Returns the decimals of a receipt token

```solidity
function getTokenDecimals(uint256 tokenId_) external view returns (uint8 decimals);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The ID of the receipt token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`decimals`|`uint8`|   The decimals of the receipt token|

### getTokenOwner

Gets the owner of a token

```solidity
function getTokenOwner(uint256 tokenId_) external view returns (address owner);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The token ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|      The token owner|

### getTokenAsset

Gets the asset of a token

```solidity
function getTokenAsset(uint256 tokenId_) external view returns (IERC20 asset);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The token ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|      The underlying asset|

### getTokenDepositPeriod

Gets the deposit period of a token

```solidity
function getTokenDepositPeriod(uint256 tokenId_) external view returns (uint8 depositPeriod);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|       The token ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod`|`uint8`|  The deposit period|

### getTokenOperator

Gets the operator of a token

```solidity
function getTokenOperator(uint256 tokenId_) external view returns (address operator);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The token ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`operator`|`address`|   The operator address|

## Events

### TokenCreated

```solidity
event TokenCreated(
    uint256 indexed tokenId, address indexed owner, address indexed asset, uint8 depositPeriod, address operator
);
```

## Errors

### ReceiptTokenManager_TokenExists

```solidity
error ReceiptTokenManager_TokenExists(uint256 tokenId);
```

### ReceiptTokenManager_NotOwner

```solidity
error ReceiptTokenManager_NotOwner(address caller, address owner);
```

### ReceiptTokenManager_InvalidParams

```solidity
error ReceiptTokenManager_InvalidParams(string reason);
```
