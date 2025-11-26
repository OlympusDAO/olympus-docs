# IDepositPositionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/modules/DEPOS/IDepositPositionManager.sol)

**Title:**
IDepositPositionManager

This interface defines the functions for the DEPOS module.
The objective of this module is to track the terms of a deposit position.

## Functions

### wrap

Wraps a position into an ERC721 token
This is useful if the position owner wants a tokenized representation of their position. It is functionally equivalent to the position itself.

The implementing function should do the following:

- Validate that the caller is the owner of the position
- Validate that the position is not already wrapped
- Mint an ERC721 token to the position owner

```solidity
function wrap(uint256 positionId_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position to wrap|

### unwrap

Unwraps/burns an ERC721 position token
This is useful if the position owner wants to unwrap their token back into the position.

The implementing function should do the following:

- Validate that the caller is the owner of the position
- Validate that the position is already wrapped
- Burn the ERC721 token

```solidity
function unwrap(uint256 positionId_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position to unwrap|

### mint

Creates a new deposit position

The implementing function should do the following:

- Validate that the caller is permissioned
- Validate that the owner is not the zero address
- Validate that the convertible deposit token is not the zero address
- Validate that the remaining deposit is greater than 0
- Validate that the conversion price is greater than 0
- Validate that the expiry is in the future
- Create the position record
- Wrap the position if requested

```solidity
function mint(MintParams calldata params_) external returns (uint256 _positionId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params_`|`MintParams`|                    The parameters for the position creation|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_positionId`|`uint256`|                The ID of the new position|

### setRemainingDeposit

Updates the remaining deposit of a position

The implementing function should do the following:

- Validate that the caller is permissioned
- Validate that the position ID is valid
- Update the remaining deposit of the position

```solidity
function setRemainingDeposit(uint256 positionId_, uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position to update|
|`amount_`|`uint256`|    The new amount of the position|

### setAdditionalData

Updates the additional data of a position

The implementing function should do the following:

- Validate that the caller is permissioned
- Validate that the position ID is valid
- Update the additional data of the position

```solidity
function setAdditionalData(uint256 positionId_, bytes calldata additionalData_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|        The ID of the position to update|
|`additionalData_`|`bytes`|    The new additional data of the position|

### split

Splits the specified amount of the position into a new position
This is useful if the position owner wants to split their position into multiple smaller positions.

The implementing function should do the following:

- Validate that the caller is the owner of the position
- Validate that the amount is greater than 0
- Validate that the amount is less than or equal to the remaining deposit
- Validate that `to_` is not the zero address
- Update the remaining deposit of the original position
- Create the new position record
- Wrap the new position if requested

```solidity
function split(uint256 positionId_, uint256 amount_, address to_, bool wrap_)
    external
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

### getPositionCount

Get the total number of positions

```solidity
function getPositionCount() external view returns (uint256 _count);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_count`|`uint256`|The total number of positions|

### getUserPositionIds

Get the IDs of all positions for a given user

```solidity
function getUserPositionIds(address user_) external view returns (uint256[] memory _positionIds);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|          The address of the user|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_positionIds`|`uint256[]`|   An array of position IDs|

### getPosition

Get the position for a given ID

```solidity
function getPosition(uint256 positionId_) external view returns (Position memory _position);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_position`|`Position`|  The position for the given ID|

### isExpired

Check if a position is expired

```solidity
function isExpired(uint256 positionId_) external view returns (bool _expired);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_expired`|`bool`|   Whether the position is expired|

### isConvertible

Check if a position is convertible

```solidity
function isConvertible(uint256 positionId_) external view returns (bool _convertible);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|    The ID of the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_convertible`|`bool`|   Whether the position is convertible|

### previewConvert

Preview the amount of OHM that would be received for a given amount of convertible deposit tokens

```solidity
function previewConvert(uint256 positionId_, uint256 amount_) external view returns (uint256 _ohmOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|The ID of the position|
|`amount_`|`uint256`|    The amount of convertible deposit tokens to convert|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_ohmOut`|`uint256`|    The amount of OHM that would be received|

### setTokenRenderer

Set the token renderer contract

The implementing function should do the following:

- Validate that the caller is permissioned
- Validate that the renderer contract implements the required interface
- Set the renderer contract
- Emit an event

```solidity
function setTokenRenderer(address renderer_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`renderer_`|`address`|The address of the renderer contract|

### getTokenRenderer

Get the current token renderer contract

```solidity
function getTokenRenderer() external view returns (address _renderer);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_renderer`|`address`|The address of the current renderer contract (or zero address if not set)|

## Events

### PositionCreated

Emitted when a position is created

```solidity
event PositionCreated(
    uint256 indexed positionId,
    address indexed owner,
    address indexed asset,
    uint8 periodMonths,
    uint256 remainingDeposit,
    uint256 conversionPrice,
    uint48 expiry,
    bool wrapped
);
```

### PositionRemainingDepositUpdated

Emitted when a position's remaining deposit is updated

```solidity
event PositionRemainingDepositUpdated(uint256 indexed positionId, uint256 remainingDeposit);
```

### PositionAdditionalDataUpdated

Emitted when a position's additional data is updated

```solidity
event PositionAdditionalDataUpdated(uint256 indexed positionId, bytes additionalData);
```

### PositionSplit

Emitted when a position is split

```solidity
event PositionSplit(
    uint256 indexed positionId,
    uint256 indexed newPositionId,
    address indexed asset,
    uint8 periodMonths,
    uint256 amount,
    address to,
    bool wrap
);
```

### PositionWrapped

Emitted when a position is wrapped

```solidity
event PositionWrapped(uint256 indexed positionId);
```

### PositionUnwrapped

Emitted when a position is unwrapped

```solidity
event PositionUnwrapped(uint256 indexed positionId);
```

### TokenRendererSet

Emitted when the token renderer is set

```solidity
event TokenRendererSet(address indexed renderer);
```

## Errors

### DEPOS_NotOwner

Error thrown when the caller is not the owner of the position

```solidity
error DEPOS_NotOwner(uint256 positionId_);
```

### DEPOS_NotOperator

Error thrown when the caller is not the operator of the position

```solidity
error DEPOS_NotOperator(uint256 positionId_);
```

### DEPOS_InvalidPositionId

Error thrown when an invalid position ID is provided

```solidity
error DEPOS_InvalidPositionId(uint256 id_);
```

### DEPOS_AlreadyWrapped

Error thrown when a position has already been wrapped

```solidity
error DEPOS_AlreadyWrapped(uint256 positionId_);
```

### DEPOS_NotWrapped

Error thrown when a position has not been wrapped

```solidity
error DEPOS_NotWrapped(uint256 positionId_);
```

### DEPOS_InvalidParams

Error thrown when an invalid parameter is provided

```solidity
error DEPOS_InvalidParams(string reason_);
```

### DEPOS_NotConvertible

Error thrown when a position does not support conversion

```solidity
error DEPOS_NotConvertible(uint256 positionId_);
```

### DEPOS_InvalidRenderer

Error thrown when the renderer contract does not implement the required interface

```solidity
error DEPOS_InvalidRenderer(address renderer_);
```

## Structs

### Position

Data structure for the terms of a deposit position

```solidity
struct Position {
    address operator;
    address owner;
    address asset;
    uint8 periodMonths;
    uint256 remainingDeposit;
    uint256 conversionPrice;
    uint48 expiry;
    bool wrapped;
    bytes additionalData;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`operator`|`address`|               Address of the operator/creator of the position|
|`owner`|`address`|                  Address of the owner of the position|
|`asset`|`address`|                  Address of the asset|
|`periodMonths`|`uint8`|           The period of the deposit|
|`remainingDeposit`|`uint256`|       Amount of reserve tokens remaining to be converted|
|`conversionPrice`|`uint256`|        The amount of asset tokens required to receive 1 OHM (scale: asset token decimals)|
|`expiry`|`uint48`|                 Timestamp of the position expiry|
|`wrapped`|`bool`|                Whether the term is wrapped|
|`additionalData`|`bytes`|         Additional data for the position|

### MintParams

Parameters for the [mint](/main/contracts/docs/src/modules/DEPOS/IDepositPositionManager.sol/interface.IDepositPositionManager#mint) function

```solidity
struct MintParams {
    address owner;
    address asset;
    uint8 periodMonths;
    uint256 remainingDeposit;
    uint256 conversionPrice;
    uint48 expiry;
    bool wrapPosition;
    bytes additionalData;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|                  Address of the owner of the position|
|`asset`|`address`|                  Address of the asset|
|`periodMonths`|`uint8`|           The period of the deposit|
|`remainingDeposit`|`uint256`|       Amount of reserve tokens remaining to be converted|
|`conversionPrice`|`uint256`|        The amount of asset tokens required to receive 1 OHM (scale: asset token decimals)|
|`expiry`|`uint48`|                 Timestamp of the position expiry|
|`wrapPosition`|`bool`|           Whether the position should be wrapped|
|`additionalData`|`bytes`|         Additional data for the position|
