# ReceiptTokenManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/deposits/ReceiptTokenManager.sol)

**Inherits:**
[ERC6909Wrappable](/main/contracts/docs/src/libraries/ERC6909Wrappable.sol/abstract.ERC6909Wrappable), [IReceiptTokenManager](/main/contracts/docs/src/policies/interfaces/deposits/IReceiptTokenManager.sol/interface.IReceiptTokenManager)

Manager contract for creating and managing ERC6909 receipt tokens for deposits

*Extracted from DepositManager to reduce contract size.
Key Features:

- Creator-only minting/burning: Only the contract that creates a token can mint/burn it
- ERC6909 compatibility with optional ERC20 wrapping via CloneableReceiptToken clones
- Deterministic token ID generation based on owner, asset, deposit period, and operator
- Automatic wrapped token creation for seamless DeFi integration
Security Model:
- Token ownership is immutable and set to msg.sender during creation
- All mint/burn operations are gated by onlyTokenOwner modifier
- Token IDs include owner address to prevent collision attacks*

## State Variables

### _tokenOwners

Maps token ID to the authorized owner (for mint/burn operations)

```solidity
mapping(uint256 tokenId => address authorizedOwner) internal _tokenOwners;
```

## Functions

### constructor

```solidity
constructor() ERC6909Wrappable(address(new CloneableReceiptToken()));
```

### createToken

Creates a new receipt token

*This function reverts if:

- The asset is the zero address
- The deposit period is 0
- The operator is the zero address
- A token with the same parameters already exists*

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

### _onlyTokenOwner

```solidity
function _onlyTokenOwner(uint256 tokenId_) internal view;
```

### onlyTokenOwner

```solidity
modifier onlyTokenOwner(uint256 tokenId_);
```

### mint

Mints tokens to a recipient

*This function reverts if:

- The token ID is invalid (not created)
- The caller is not the token owner
- The recipient is the zero address
- The amount is 0*

```solidity
function mint(address to_, uint256 tokenId_, uint256 amount_, bool shouldWrap_)
    external
    onlyValidTokenId(tokenId_)
    onlyTokenOwner(tokenId_);
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

*This function reverts if:

- The token ID is invalid (not created)
- The caller is not the token owner
- The account is the zero address
- The amount is 0
- For wrapped tokens: account has not approved ReceiptTokenManager to spend the wrapped ERC20 token
- For unwrapped tokens: account has not approved the caller to spend ERC6909 tokens
- The account has insufficient token balance*

```solidity
function burn(address from_, uint256 tokenId_, uint256 amount_, bool isWrapped_)
    external
    onlyValidTokenId(tokenId_)
    onlyTokenOwner(tokenId_);
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
    public
    pure
    override
    returns (uint256);
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
|`<none>`|`uint256`|tokenId         The generated token ID|

### getTokenName

Returns the name of a receipt token

```solidity
function getTokenName(uint256 tokenId_) public view override returns (string memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The ID of the receipt token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|name        The name of the receipt token|

### getTokenSymbol

Returns the symbol of a receipt token

```solidity
function getTokenSymbol(uint256 tokenId_) public view override returns (string memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The ID of the receipt token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|symbol      The symbol of the receipt token|

### getTokenDecimals

Returns the decimals of a receipt token

```solidity
function getTokenDecimals(uint256 tokenId_) public view override returns (uint8);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The ID of the receipt token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|decimals    The decimals of the receipt token|

### getTokenOwner

Gets the owner of a token

```solidity
function getTokenOwner(uint256 tokenId_) public view override returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The token ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|owner       The token owner|

### getTokenAsset

Gets the asset of a token

```solidity
function getTokenAsset(uint256 tokenId_) external view override returns (IERC20);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The token ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IERC20`|asset       The underlying asset|

### getTokenDepositPeriod

Gets the deposit period of a token

```solidity
function getTokenDepositPeriod(uint256 tokenId_) external view override returns (uint8);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|       The token ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|depositPeriod   The deposit period|

### getTokenOperator

Gets the operator of a token

```solidity
function getTokenOperator(uint256 tokenId_) external view override returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The token ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|operator    The operator address|

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override(ERC6909Wrappable, IERC165) returns (bool);
```
