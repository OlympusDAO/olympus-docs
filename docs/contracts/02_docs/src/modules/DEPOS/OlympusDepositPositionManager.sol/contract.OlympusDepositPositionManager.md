# OlympusDepositPositionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/modules/DEPOS/OlympusDepositPositionManager.sol)

**Inherits:**
[DEPOSv1](/main/contracts/docs/src/modules/DEPOS/DEPOS.v1.sol/abstract.DEPOSv1)

**Title:**
Olympus Deposit Position Manager

forge-lint: disable-start(mixed-case-function, mixed-case-variable)

Implementation of the {DEPOSv1} interface
This contract is used to create, manage, and wrap/unwrap deposit positions. Positions are optionally convertible.

## State Variables

### _tokenRenderer

The address of the token renderer contract

If set, tokenURI() will delegate to this contract. If not set, tokenURI() returns an empty string.

```solidity
address internal _tokenRenderer
```

### _OHM_SCALE

```solidity
uint256 internal constant _OHM_SCALE = 1e9
```

## Functions

### constructor

```solidity
constructor(address kernel_, address tokenRenderer_)
    Module(Kernel(kernel_))
    ERC721("Olympus Deposit Position", "ODP");
```

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() public pure override returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|- Major version upgrade indicates breaking change to the interface.|
|`minor`|`uint8`|- Minor version change retains backward-compatible interface.|

### wrap

Wraps a position into an ERC721 token
This is useful if the position owner wants a tokenized representation of their position. It is functionally equivalent to the position itself.

This function reverts if:

- The position ID is invalid
- The caller is not the owner of the position
- The position is already wrapped
This is a public function that can be called by any address holding a position

```solidity
function wrap(uint256 positionId_)
    external
    virtual
    override
    onlyValidPosition(positionId_)
    onlyPositionOwner(positionId_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position to wrap|

### unwrap

Unwraps/burns an ERC721 position token
This is useful if the position owner wants to unwrap their token back into the position.

This function reverts if:

- The position ID is invalid
- The caller is not the owner of the position
- The position is not wrapped
This is a public function that can be called by any address holding a position

```solidity
function unwrap(uint256 positionId_)
    external
    virtual
    override
    onlyValidPosition(positionId_)
    onlyPositionOwner(positionId_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position to unwrap|

### _create

```solidity
function _create(address operator_, IDepositPositionManager.MintParams memory params_)
    internal
    returns (uint256 positionId);
```

### mint

This function reverts if:

- The caller is not permissioned
- The owner is the zero address
- The convertible deposit token is the zero address
- The remaining deposit is 0
- The conversion price is 0
- The conversion expiry is in the past
This is a permissioned function that can only be called by approved policies

```solidity
function mint(IDepositPositionManager.MintParams calldata params_)
    external
    virtual
    override
    permissioned
    returns (uint256 positionId);
```

### setRemainingDeposit

Updates the remaining deposit of a position

This function reverts if:

- The caller is not permissioned
- The position ID is invalid
- The caller is not the operator that created the position
This is a permissioned function that can only be called by approved policies

```solidity
function setRemainingDeposit(uint256 positionId_, uint256 amount_)
    external
    virtual
    override
    permissioned
    onlyValidPosition(positionId_)
    onlyPositionOperator(positionId_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position to update|
|`amount_`|`uint256`|    The new amount of the position|

### setAdditionalData

Updates the additional data of a position

This function reverts if:

- The caller is not permissioned
- The position ID is invalid
- The caller is not the operator that created the position
This is a permissioned function that can only be called by approved policies

```solidity
function setAdditionalData(uint256 positionId_, bytes calldata additionalData_)
    external
    virtual
    override
    permissioned
    onlyValidPosition(positionId_)
    onlyPositionOperator(positionId_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|        The ID of the position to update|
|`additionalData_`|`bytes`|    The new additional data of the position|

### split

Splits the specified amount of the position into a new position
This is useful if the position owner wants to split their position into multiple smaller positions.

This function reverts if:

- The caller is not permissioned
- The caller is not the operator that created the position
- The amount is 0
- The amount is greater than the remaining deposit
- `to_` is the zero address
This is a permissioned function that can only be called by approved policies

```solidity
function split(uint256 positionId_, uint256 amount_, address to_, bool wrap_)
    external
    virtual
    override
    permissioned
    onlyValidPosition(positionId_)
    onlyPositionOperator(positionId_)
    returns (uint256 newPositionId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|    The ID of the position to split|
|`amount_`|`uint256`|        The amount of the position to split|
|`to_`|`address`|            The address to split the position to|
|`wrap_`|`bool`|          Whether the new position should be wrapped|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newPositionId`|`uint256`|  The ID of the new position|

### tokenURI

See {IERC721Metadata-tokenURI}.

```solidity
function tokenURI(uint256 id_) public view virtual override returns (string memory);
```

### transferFrom

This function performs the following:

- Updates the owner of the position
- Calls `transferFrom` on the parent contract

```solidity
function transferFrom(address from_, address to_, uint256 tokenId_) public override;
```

### getPositionCount

Get the total number of positions

```solidity
function getPositionCount() external view virtual override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_count The total number of positions|

### _getPosition

```solidity
function _getPosition(uint256 positionId_) internal view returns (Position memory);
```

### getUserPositionIds

Get the IDs of all positions for a given user

```solidity
function getUserPositionIds(address user_) external view virtual override returns (uint256[] memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|          The address of the user|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256[]`|_positionIds    An array of position IDs|

### getPosition

Get the position for a given ID

This function reverts if:

- The position ID is invalid

```solidity
function getPosition(uint256 positionId_) external view virtual override returns (Position memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Position`|_position   The position for the given ID|

### isExpired

Check if a position is expired

This function reverts if:

- The position ID is invalid

```solidity
function isExpired(uint256 positionId_) external view virtual override returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|isExpired_  Returns true if the conversion expiry timestamp is now or in the past|

### _isConvertible

```solidity
function _isConvertible(Position memory position_) internal pure returns (bool);
```

### isConvertible

Check if a position is convertible

This function reverts if:

- The position ID is invalid

```solidity
function isConvertible(uint256 positionId_) external view virtual override returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|    The ID of the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|isConvertible_  Returns true if the conversion price is not the maximum value|

### _previewConvert

```solidity
function _previewConvert(uint256 amount_, uint256 conversionPrice_) internal pure returns (uint256);
```

### previewConvert

Preview the amount of OHM that would be received for a given amount of convertible deposit tokens

```solidity
function previewConvert(uint256 positionId_, uint256 amount_)
    public
    view
    virtual
    override
    onlyValidPosition(positionId_)
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position|
|`amount_`|`uint256`|    The amount of convertible deposit tokens to convert|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_ohmOut     The amount of OHM that would be received|

### _setTokenRenderer

```solidity
function _setTokenRenderer(address renderer_) internal;
```

### setTokenRenderer

Set the token renderer contract

This function reverts if:

- The caller is not permissioned
- The renderer contract does not implement the required interface

```solidity
function setTokenRenderer(address renderer_) external virtual override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`renderer_`|`address`|The address of the renderer contract|

### getTokenRenderer

Get the current token renderer contract

```solidity
function getTokenRenderer() external view virtual override returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_renderer The address of the current renderer contract (or zero address if not set)|

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId_) public view virtual override returns (bool);
```

### _onlyValidPosition

```solidity
function _onlyValidPosition(uint256 positionId_) internal view;
```

### onlyValidPosition

```solidity
modifier onlyValidPosition(uint256 positionId_) ;
```

### _onlyPositionOperator

```solidity
function _onlyPositionOperator(uint256 positionId_) internal view;
```

### onlyPositionOperator

```solidity
modifier onlyPositionOperator(uint256 positionId_) ;
```

### _onlyPositionOwner

```solidity
function _onlyPositionOwner(uint256 positionId_) internal view;
```

### onlyPositionOwner

```solidity
modifier onlyPositionOwner(uint256 positionId_) ;
```
