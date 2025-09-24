# IERC6909Wrappable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/interfaces/IERC6909Wrappable.sol)

Declares interface for an ERC6909 implementation that allows for wrapping and unwrapping ERC6909 tokens to and from ERC20 tokens

## Functions

### wrap

Wraps an ERC6909 token to an ERC20 token

```solidity
function wrap(uint256 tokenId_, uint256 amount_) external returns (address wrappedToken);
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

```solidity
function unwrap(uint256 tokenId_, uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|     The ID of the ERC6909 token|
|`amount_`|`uint256`|      The amount of tokens to unwrap|

### getWrappedToken

Returns the address of the wrapped ERC20 token for a given token ID

```solidity
function getWrappedToken(uint256 tokenId_) external view returns (address wrappedToken);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|       The ID of the ERC6909 token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`wrappedToken`|`address`|   The address of the wrapped ERC20 token (or zero address)|

### isValidTokenId

Returns whether a token ID is valid

```solidity
function isValidTokenId(uint256 tokenId_) external view returns (bool isValid);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|       The ID of the ERC6909 token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`isValid`|`bool`|        Whether the token ID is valid|

### getWrappableTokens

Returns the token IDs and wrapped token addresses of all tokens

```solidity
function getWrappableTokens() external view returns (uint256[] memory tokenIds, address[] memory wrappedTokens);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenIds`|`uint256[]`|       The IDs of all tokens|
|`wrappedTokens`|`address[]`|  The wrapped token addresses of all tokens|

## Events

### Wrapped

```solidity
event Wrapped(uint256 indexed tokenId, address indexed wrappedToken, address indexed account, uint256 amount);
```

### Unwrapped

```solidity
event Unwrapped(uint256 indexed tokenId, address indexed wrappedToken, address indexed account, uint256 amount);
```

## Errors

### ERC6909Wrappable_TokenIdAlreadyExists

```solidity
error ERC6909Wrappable_TokenIdAlreadyExists(uint256 tokenId);
```

### ERC6909Wrappable_InvalidTokenId

```solidity
error ERC6909Wrappable_InvalidTokenId(uint256 tokenId);
```

### ERC6909Wrappable_InvalidERC20Implementation

```solidity
error ERC6909Wrappable_InvalidERC20Implementation(address erc20Implementation);
```

### ERC6909Wrappable_ZeroAmount

```solidity
error ERC6909Wrappable_ZeroAmount();
```
