# ERC6909Wrappable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/libraries/ERC6909Wrappable.sol)

**Inherits:**
ERC6909Metadata, [IERC6909Wrappable](/main/contracts/docs/src/interfaces/IERC6909Wrappable.sol/interface.IERC6909Wrappable), IERC6909TokenSupply

This abstract contract extends ERC6909 to allow for wrapping and unwrapping of the token to an ERC20 token.
It extends the ERC6909Metadata contract, and additionally implements the IERC6909TokenSupply interface.

## State Variables

### _ERC20_IMPLEMENTATION

The address of the implementation of the ERC20 contract

```solidity
address private immutable _ERC20_IMPLEMENTATION;
```

### _wrappableTokenIds

The set of all token IDs

```solidity
EnumerableSet.UintSet internal _wrappableTokenIds;
```

### _totalSupplies

The total supply of each token

```solidity
mapping(uint256 tokenId => uint256) private _totalSupplies;
```

### _tokenMetadataAdditional

Additional metadata for each token

```solidity
mapping(uint256 tokenId => bytes) private _tokenMetadataAdditional;
```

### _wrappedTokens

The address of the wrapped ERC20 token for each token

```solidity
mapping(uint256 tokenId => address) internal _wrappedTokens;
```

## Functions

### constructor

```solidity
constructor(address erc20Implementation_);
```

### _getTokenData

Returns the clone initialisation data for a given token ID

```solidity
function _getTokenData(uint256 tokenId_) internal view returns (bytes memory tokenData);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|   The token ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenData`|`bytes`|  Packed bytes including the name, symbol, decimals and additional metadata|

### _getTokenAdditionalData

Returns the additional metadata for a token ID

```solidity
function _getTokenAdditionalData(uint256 tokenId_) internal view returns (bytes memory additionalData);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|       The token ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`additionalData`|`bytes`| The additional metadata bytes|

### _mint

Mints the ERC6909 or ERC20 wrapped token to the recipient

```solidity
function _mint(address onBehalfOf_, uint256 tokenId_, uint256 amount_, bool shouldWrap_)
    internal
    onlyValidTokenId(tokenId_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`onBehalfOf_`|`address`|  The address to mint the token to|
|`tokenId_`|`uint256`|     The ID of the ERC6909 token|
|`amount_`|`uint256`|      The amount of tokens to mint|
|`shouldWrap_`|`bool`|  Whether to wrap the token to an ERC20 token|

### _burn

Burns the ERC6909 or ERC20 wrapped token from the recipient

*This function reverts if:

- amount_ is 0
- onBehalfOf_ is 0
- wrapped_== true: onBehalfOf_ has not approved this contract to spend the wrapped ERC20 token
- wrapped_== false: onBehalfOf_ is not the caller and has not approved the caller to spend the ERC6909 tokens
- ERC6909 token handling reverts*

```solidity
function _burn(address onBehalfOf_, uint256 tokenId_, uint256 amount_, bool wrapped_)
    internal
    onlyValidTokenId(tokenId_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`onBehalfOf_`|`address`|  The address to burn the token from|
|`tokenId_`|`uint256`|     The ID of the ERC6909 token|
|`amount_`|`uint256`|      The amount of tokens to burn|
|`wrapped_`|`bool`|     Whether the token is wrapped|

### totalSupply

*Returns the total supply of the token of type `id`.*

```solidity
function totalSupply(uint256 tokenId_) public view virtual override returns (uint256);
```

### _update

*Copied from draft-ERC6909TokenSupply.sol*

```solidity
function _update(address from, address to, uint256 id, uint256 amount) internal virtual override;
```

### _getWrappedToken

*Returns the address of the wrapped ERC20 token for a given token ID, or creates a new one if it does not exist*

```solidity
function _getWrappedToken(uint256 tokenId_) internal returns (IERC20BurnableMintable wrappedToken);
```

### getWrappedToken

Returns the address of the wrapped ERC20 token for a given token ID

```solidity
function getWrappedToken(uint256 tokenId_) public view returns (address wrappedToken);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|       The ID of the ERC6909 token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`wrappedToken`|`address`|   The address of the wrapped ERC20 token (or zero address)|

### wrap

Wraps an ERC6909 token to an ERC20 token

*This function will burn the ERC6909 token from the caller and mint the wrapped ERC20 token to the same address.
This function reverts if:

- The token ID does not exist
- The amount is zero
- The caller has an insufficient balance of the token*

```solidity
function wrap(uint256 tokenId_, uint256 amount_) public returns (address wrappedToken);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|     The ID of the ERC6909 token|
|`amount_`|`uint256`|      The amount of tokens to wrap|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`wrappedToken`|`address`|The address of the wrapped ERC20 token|

### unwrap

Unwraps an ERC20 token to an ERC6909 token

*This function will burn the wrapped ERC20 token from the caller and mint the ERC6909 token to the same address.
This function reverts if:

- The token ID does not exist
- The amount is zero
- The caller has not approved this contract to spend the wrapped token
- The caller has an insufficient balance of the wrapped token*

```solidity
function unwrap(uint256 tokenId_, uint256 amount_) public;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|     The ID of the ERC6909 token|
|`amount_`|`uint256`|      The amount of tokens to unwrap|

### isValidTokenId

Returns whether a token ID is valid

```solidity
function isValidTokenId(uint256 tokenId_) public view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|       The ID of the ERC6909 token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|isValid         Whether the token ID is valid|

### onlyValidTokenId

```solidity
modifier onlyValidTokenId(uint256 tokenId_);
```

### _createWrappableToken

Creates a new wrappable token

*Reverts if the token ID already exists*

```solidity
function _createWrappableToken(
    uint256 tokenId_,
    string memory name_,
    string memory symbol_,
    uint8 decimals_,
    bytes memory additionalMetadata_,
    bool createWrappedToken_
) internal;
```

### getWrappableTokens

Returns the token IDs and wrapped token addresses of all tokens

```solidity
function getWrappableTokens()
    public
    view
    override
    returns (uint256[] memory tokenIds, address[] memory wrappedTokens);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenIds`|`uint256[]`|       The IDs of all tokens|
|`wrappedTokens`|`address[]`|  The wrapped token addresses of all tokens|

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId_) public view virtual override(ERC6909, IERC165) returns (bool);
```
