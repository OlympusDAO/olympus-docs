# ERC6909Wrappable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/ERC6909Wrappable.sol)

**Inherits:** ERC6909Metadata, [IERC6909Wrappable](/main/contracts/docs/src/interfaces/IERC6909Wrappable.sol/interface.IERC6909Wrappable), IERC6909TokenSupply

**Title:** ERC6909Wrappable

This abstract contract extends ERC6909 to allow for wrapping and unwrapping of the token to an ERC20 token.
It extends the ERC6909Metadata contract, and additionally implements the IERC6909TokenSupply interface.

## Constants

### _ERC20_IMPLEMENTATION

The address of the implementation of the ERC20 contract

```solidity
address private immutable _ERC20_IMPLEMENTATION;
```

## State Variables

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

<a id="constructor-address"></a>

### constructor

```solidity
constructor(address erc20Implementation_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| erc20Implementation_ | `address` |  |

<a id="_gettokendata-uint256"></a>

### _getTokenData

Returns the clone initialisation data for a given token ID

```solidity
function _getTokenData(uint256 tokenId_) internal view returns (bytes memory tokenData);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The token ID |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenData | `bytes` |   Packed bytes including the name, symbol, decimals and additional metadata |

<a id="_gettokenadditionaldata-uint256"></a>

### _getTokenAdditionalData

Returns the additional metadata for a token ID

```solidity
function _getTokenAdditionalData(
        uint256 tokenId_
    ) internal view returns (bytes memory additionalData);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The token ID |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| additionalData | `bytes` |  The additional metadata bytes |

<a id="_mint-address-uint256-uint256-bool"></a>

### _mint

Mints the ERC6909 or ERC20 wrapped token to the recipient

```solidity
function _mint(
        address onBehalfOf_,
        uint256 tokenId_,
        uint256 amount_,
        bool shouldWrap_
    ) internal onlyValidTokenId(tokenId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| onBehalfOf_ | `address` | The address to mint the token to |
| tokenId_ | `uint256` | The ID of the ERC6909 token |
| amount_ | `uint256` | The amount of tokens to mint |
| shouldWrap_ | `bool` | Whether to wrap the token to an ERC20 token |

<a id="_burn-address-uint256-uint256-bool"></a>

### _burn

Burns the ERC6909 or ERC20 wrapped token from the recipient

<i>

This function reverts if:

- amount_ is 0
- onBehalfOf_ is 0
- onBehalfOf_ is not the caller and has not approved the caller to spend the ERC6909 tokens (note: ERC6909 allowances govern both wrapped and unwrapped token burns)
- ERC6909 token handling reverts

</i>

```solidity
function _burn(
        address onBehalfOf_,
        uint256 tokenId_,
        uint256 amount_,
        bool wrapped_
    ) internal onlyValidTokenId(tokenId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| onBehalfOf_ | `address` | The address to burn the token from |
| tokenId_ | `uint256` | The ID of the ERC6909 token |
| amount_ | `uint256` | The amount of tokens to burn |
| wrapped_ | `bool` | Whether the token is wrapped |

<a id="totalsupply-uint256"></a>

### totalSupply

<i>

Returns the total supply of the token of type `id`.

</i>

```solidity
function totalSupply(uint256 tokenId_) public view virtual override returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="_update-address-address-uint256-uint256"></a>

### _update

<i>

Copied from draft-ERC6909TokenSupply.sol

</i>

```solidity
function _update(
        address from,
        address to,
        uint256 id,
        uint256 amount
    ) internal virtual override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |
| id | `uint256` |  |
| amount | `uint256` |  |

<a id="_getwrappedtoken-uint256"></a>

### _getWrappedToken

<i>

Returns the address of the wrapped ERC20 token for a given token ID, or creates a new one if it does not exist

</i>

```solidity
function _getWrappedToken(
        uint256 tokenId_
    ) internal returns (IERC20BurnableMintable wrappedToken);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| wrappedToken | `IERC20BurnableMintable` |  |

<a id="getwrappedtoken-uint256"></a>

### getWrappedToken

Returns the address of the wrapped ERC20 token for a given token ID

```solidity
function getWrappedToken(uint256 tokenId_) public view returns (address wrappedToken);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The ID of the ERC6909 token |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| wrappedToken | `address` | The address of the wrapped ERC20 token (or zero address) |

<a id="wrap-uint256-uint256"></a>

### wrap

<i>

This function will burn the ERC6909 token from the caller and mint the wrapped ERC20 token to the same address.

</i>

This function reverts if:

- The token ID does not exist
- The amount is zero
- The caller has an insufficient balance of the token

```solidity
function wrap(uint256 tokenId_, uint256 amount_) public returns (address wrappedToken);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The ID of the ERC6909 token |
| amount_ | `uint256` | The amount of tokens to wrap |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| wrappedToken | `address` | The address of the wrapped ERC20 token |

<a id="unwrap-uint256-uint256"></a>

### unwrap

<i>

This function will burn the wrapped ERC20 token from the caller and mint the ERC6909 token to the same address.

</i>

This function reverts if:

- The token ID does not exist
- The amount is zero
- The caller has an insufficient balance of the wrapped token

```solidity
function unwrap(uint256 tokenId_, uint256 amount_) public;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The ID of the ERC6909 token |
| amount_ | `uint256` | The amount of tokens to unwrap |

<a id="isvalidtokenid-uint256"></a>

### isValidTokenId

Returns whether a token ID is valid

```solidity
function isValidTokenId(uint256 tokenId_) public view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The ID of the ERC6909 token |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | Whether the token ID is valid |

<a id="_onlyvalidtokenid-uint256"></a>

### _onlyValidTokenId

```solidity
function _onlyValidTokenId(uint256 tokenId_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` |  |

<a id="onlyvalidtokenid-uint256"></a>

### onlyValidTokenId

```solidity
modifier onlyValidTokenId(uint256 tokenId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` |  |

<a id="_createwrappabletoken-uint256-string-string-uint8-bytes-bool"></a>

### _createWrappableToken

Creates a new wrappable token

<i>

Reverts if the token ID already exists

</i>

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` |  |
| name_ | `string` |  |
| symbol_ | `string` |  |
| decimals_ | `uint8` |  |
| additionalMetadata_ | `bytes` |  |
| createWrappedToken_ | `bool` |  |

<a id="getwrappabletokens"></a>

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenIds | `uint256[]` | The IDs of all tokens |
| wrappedTokens | `address[]` | The wrapped token addresses of all tokens |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(
        bytes4 interfaceId_
    ) public view virtual override(ERC6909, IERC165) returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
