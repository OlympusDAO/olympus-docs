# IDepositPositionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/DEPOS/IDepositPositionManager.sol)

**Title:** IDepositPositionManager

This interface defines the functions for the DEPOS module.
The objective of this module is to track the terms of a deposit position.

## Functions

<a id="wrap-uint256"></a>

### wrap

Wraps a position into an ERC721 token
This is useful if the position owner wants a tokenized representation of their position. It is functionally equivalent to the position itself.

<i>

The implementing function should do the following:

- Validate that the caller is the owner of the position
- Validate that the position is not already wrapped
- Mint an ERC721 token to the position owner

</i>

```solidity
function wrap(uint256 positionId_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to wrap |

<a id="unwrap-uint256"></a>

### unwrap

Unwraps/burns an ERC721 position token
This is useful if the position owner wants to unwrap their token back into the position.

<i>

The implementing function should do the following:

- Validate that the caller is the owner of the position
- Validate that the position is already wrapped
- Burn the ERC721 token

</i>

```solidity
function unwrap(uint256 positionId_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to unwrap |

<a id="mint-mint256params"></a>

### mint

Creates a new deposit position

<i>

The implementing function should do the following:

- Validate that the caller is permissioned
- Validate that the owner is not the zero address
- Validate that the convertible deposit token is not the zero address
- Validate that the remaining deposit is greater than 0
- Validate that the conversion price is greater than 0
- Validate that the expiry is in the future
- Create the position record
- Wrap the position if requested

</i>

```solidity
function mint(MintParams calldata params_) external returns (uint256 _positionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| params_ | `MintParams` | The parameters for the position creation |

**Returns**

| Name        | Type      | Description                |
| ----------- | --------- | -------------------------- |
| _positionId | `uint256` | The ID of the new position |

<a id="setremainingdeposit-uint256-uint256"></a>

### setRemainingDeposit

Updates the remaining deposit of a position

<i>

The implementing function should do the following:

- Validate that the caller is permissioned
- Validate that the position ID is valid
- Update the remaining deposit of the position

</i>

```solidity
function setRemainingDeposit(uint256 positionId_, uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to update |
| amount_ | `uint256` | The new amount of the position |

<a id="setadditionaldata-uint256-bytes"></a>

### setAdditionalData

Updates the additional data of a position

<i>

The implementing function should do the following:

- Validate that the caller is permissioned
- Validate that the position ID is valid
- Update the additional data of the position

</i>

```solidity
function setAdditionalData(uint256 positionId_, bytes calldata additionalData_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to update |
| additionalData_ | `bytes` | The new additional data of the position |

<a id="split-uint256-uint256-address-bool"></a>

### split

Splits the specified amount of the position into a new position
This is useful if the position owner wants to split their position into multiple smaller positions.

<i>

The implementing function should do the following:

- Validate that the caller is the owner of the position
- Validate that the amount is greater than 0
- Validate that the amount is less than or equal to the remaining deposit
- Validate that `to_` is not the zero address
- Update the remaining deposit of the original position
- Create the new position record
- Wrap the new position if requested

</i>

```solidity
function split(
        uint256 positionId_,
        uint256 amount_,
        address to_,
        bool wrap_
    ) external returns (uint256 newPositionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to split |
| amount_ | `uint256` | The amount of the position to split |
| to_ | `address` | The address to split the position to |
| wrap_ | `bool` | Whether the new position should be wrapped |

**Returns**

| Name          | Type      | Description                |
| ------------- | --------- | -------------------------- |
| newPositionId | `uint256` | The ID of the new position |

<a id="getpositioncount"></a>

### getPositionCount

Get the total number of positions

```solidity
function getPositionCount() external view returns (uint256 _count);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _count | `uint256` | The total number of positions |

<a id="getuserpositionids-address"></a>

### getUserPositionIds

Get the IDs of all positions for a given user

```solidity
function getUserPositionIds(
        address user_
    ) external view returns (uint256[] memory _positionIds);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The address of the user |

**Returns**

| Name         | Type        | Description              |
| ------------ | ----------- | ------------------------ |
| _positionIds | `uint256[]` | An array of position IDs |

<a id="getposition-uint256"></a>

### getPosition

Get the position for a given ID

```solidity
function getPosition(uint256 positionId_) external view returns (Position memory _position);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position |

**Returns**

| Name      | Type       | Description                   |
| --------- | ---------- | ----------------------------- |
| _position | `Position` | The position for the given ID |

<a id="isexpired-uint256"></a>

### isExpired

Check if a position is expired

```solidity
function isExpired(uint256 positionId_) external view returns (bool _expired);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position |

**Returns**

| Name     | Type   | Description                     |
| -------- | ------ | ------------------------------- |
| _expired | `bool` | Whether the position is expired |

<a id="isconvertible-uint256"></a>

### isConvertible

Check if a position is convertible

```solidity
function isConvertible(uint256 positionId_) external view returns (bool _convertible);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position |

**Returns**

| Name         | Type   | Description                         |
| ------------ | ------ | ----------------------------------- |
| _convertible | `bool` | Whether the position is convertible |

<a id="previewconvert-uint256-uint256"></a>

### previewConvert

Preview the amount of OHM that would be received for a given amount of convertible deposit tokens

```solidity
function previewConvert(
        uint256 positionId_,
        uint256 amount_
    ) external view returns (uint256 _ohmOut);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position |
| amount_ | `uint256` | The amount of convertible deposit tokens to convert |

**Returns**

| Name    | Type      | Description                              |
| ------- | --------- | ---------------------------------------- |
| _ohmOut | `uint256` | The amount of OHM that would be received |

<a id="settokenrenderer-address"></a>

### setTokenRenderer

Set the token renderer contract

<i>

The implementing function should do the following:

- Validate that the caller is permissioned
- Validate that the renderer contract implements the required interface
- Set the renderer contract
- Emit an event

</i>

```solidity
function setTokenRenderer(address renderer_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| renderer_ | `address` | The address of the renderer contract |

<a id="gettokenrenderer"></a>

### getTokenRenderer

Get the current token renderer contract

```solidity
function getTokenRenderer() external view returns (address _renderer);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _renderer | `address` | The address of the current renderer contract (or zero address if not set) |

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

**Parameters**

| Name             | Type      | Description |
| ---------------- | --------- | ----------- |
| positionId       | `uint256` |             |
| owner            | `address` |             |
| asset            | `address` |             |
| periodMonths     | `uint8`   |             |
| remainingDeposit | `uint256` |             |
| conversionPrice  | `uint256` |             |
| expiry           | `uint48`  |             |
| wrapped          | `bool`    |             |

### PositionRemainingDepositUpdated

Emitted when a position's remaining deposit is updated

```solidity
event PositionRemainingDepositUpdated(uint256 indexed positionId, uint256 remainingDeposit);
```

**Parameters**

| Name             | Type      | Description |
| ---------------- | --------- | ----------- |
| positionId       | `uint256` |             |
| remainingDeposit | `uint256` |             |

### PositionAdditionalDataUpdated

Emitted when a position's additional data is updated

```solidity
event PositionAdditionalDataUpdated(uint256 indexed positionId, bytes additionalData);
```

**Parameters**

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| positionId     | `uint256` |             |
| additionalData | `bytes`   |             |

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

**Parameters**

| Name          | Type      | Description |
| ------------- | --------- | ----------- |
| positionId    | `uint256` |             |
| newPositionId | `uint256` |             |
| asset         | `address` |             |
| periodMonths  | `uint8`   |             |
| amount        | `uint256` |             |
| to            | `address` |             |
| wrap          | `bool`    |             |

### PositionWrapped

Emitted when a position is wrapped

```solidity
event PositionWrapped(uint256 indexed positionId);
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| positionId | `uint256` |             |

### PositionUnwrapped

Emitted when a position is unwrapped

```solidity
event PositionUnwrapped(uint256 indexed positionId);
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| positionId | `uint256` |             |

### TokenRendererSet

Emitted when the token renderer is set

```solidity
event TokenRendererSet(address indexed renderer);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| renderer | `address` |             |

## Errors

### DEPOS_NotOwner

Error thrown when the caller is not the owner of the position

```solidity
error DEPOS_NotOwner(uint256 positionId_);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| positionId_ | `uint256` |             |

### DEPOS_NotOperator

Error thrown when the caller is not the operator of the position

```solidity
error DEPOS_NotOperator(uint256 positionId_);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| positionId_ | `uint256` |             |

### DEPOS_InvalidPositionId

Error thrown when an invalid position ID is provided

```solidity
error DEPOS_InvalidPositionId(uint256 id_);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| id_  | `uint256` |             |

### DEPOS_AlreadyWrapped

Error thrown when a position has already been wrapped

```solidity
error DEPOS_AlreadyWrapped(uint256 positionId_);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| positionId_ | `uint256` |             |

### DEPOS_NotWrapped

Error thrown when a position has not been wrapped

```solidity
error DEPOS_NotWrapped(uint256 positionId_);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| positionId_ | `uint256` |             |

### DEPOS_InvalidParams

Error thrown when an invalid parameter is provided

```solidity
error DEPOS_InvalidParams(string reason_);
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| reason_ | `string` |             |

### DEPOS_NotConvertible

Error thrown when a position does not support conversion

```solidity
error DEPOS_NotConvertible(uint256 positionId_);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| positionId_ | `uint256` |             |

### DEPOS_InvalidRenderer

Error thrown when the renderer contract does not implement the required interface

```solidity
error DEPOS_InvalidRenderer(address renderer_);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| renderer_ | `address` |             |

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator | `address` | Address of the operator/creator of the position |
| owner | `address` | Address of the owner of the position |
| asset | `address` | Address of the asset |
| periodMonths | `uint8` | The period of the deposit |
| remainingDeposit | `uint256` | Amount of reserve tokens remaining to be converted |
| conversionPrice | `uint256` | The amount of asset tokens required to receive 1 OHM (scale: asset token decimals) |
| expiry | `uint48` | Timestamp of the position expiry |
| wrapped | `bool` | Whether the term is wrapped |
| additionalData | `bytes` | Additional data for the position |

### MintParams

Parameters for the [mint](#mint) function

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | `address` | Address of the owner of the position |
| asset | `address` | Address of the asset |
| periodMonths | `uint8` | The period of the deposit |
| remainingDeposit | `uint256` | Amount of reserve tokens remaining to be converted |
| conversionPrice | `uint256` | The amount of asset tokens required to receive 1 OHM (scale: asset token decimals) |
| expiry | `uint48` | Timestamp of the position expiry |
| wrapPosition | `bool` | Whether the position should be wrapped |
| additionalData | `bytes` | Additional data for the position |
