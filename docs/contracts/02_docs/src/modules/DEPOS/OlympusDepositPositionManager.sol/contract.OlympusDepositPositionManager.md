# OlympusDepositPositionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/DEPOS/OlympusDepositPositionManager.sol)

**Inherits:** [DEPOSv1](/main/contracts/docs/src/modules/DEPOS/DEPOS.v1.sol/abstract.DEPOSv1)

**Title:** Olympus Deposit Position Manager

Implementation of the [DEPOSv1](/main/contracts/docs/src/modules/DEPOS/DEPOS.v1.sol/abstract.DEPOSv1) interface
This contract is used to create, manage, and wrap/unwrap deposit positions. Positions are optionally convertible.

## Constants

### _OHM_SCALE

```solidity
uint256 internal constant _OHM_SCALE = 1e9;
```

## State Variables

### _tokenRenderer

The address of the token renderer contract

<i>

If set, tokenURI() will delegate to this contract. If not set, tokenURI() returns an empty string.

</i>

```solidity
address internal _tokenRenderer;
```

## Functions

<a id="constructor-address-address"></a>

### constructor

```solidity
constructor(
        address kernel_,
        address tokenRenderer_
    ) Module(Kernel(kernel_)) ERC721("Olympus Deposit Position", "ODP");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `address` |  |
| tokenRenderer_ | `address` |  |

<a id="keycode"></a>

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Keycode` |  |

<a id="version"></a>

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() public pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="wrap-uint256"></a>

### wrap

<i>

This function reverts if:

- The position ID is invalid
- The caller is not the owner of the position
- The position is already wrapped

</i>

This is a public function that can be called by any address holding a position

```solidity
function wrap(
        uint256 positionId_
    ) external virtual override onlyValidPosition(positionId_) onlyPositionOwner(positionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to wrap |

<a id="unwrap-uint256"></a>

### unwrap

<i>

This function reverts if:

- The position ID is invalid
- The caller is not the owner of the position
- The position is not wrapped

</i>

This is a public function that can be called by any address holding a position

```solidity
function unwrap(
        uint256 positionId_
    ) external virtual override onlyValidPosition(positionId_) onlyPositionOwner(positionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to unwrap |

<a id="_create-address-idepositpositionmanager-mint256params"></a>

### _create

```solidity
function _create(
        address operator_,
        IDepositPositionManager.MintParams memory params_
    ) internal returns (uint256 positionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator_ | `address` |  |
| params_ | `IDepositPositionManager.MintParams` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId | `uint256` |  |

<a id="mint-idepositpositionmanager-mint256params"></a>

### mint

<i>

This function reverts if:

- The caller is not permissioned
- The owner is the zero address
- The convertible deposit token is the zero address
- The remaining deposit is 0
- The conversion price is 0
- The conversion expiry is in the past

</i>

This is a permissioned function that can only be called by approved policies

```solidity
function mint(
        IDepositPositionManager.MintParams calldata params_
    ) external virtual override permissioned returns (uint256 positionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| params_ | `IDepositPositionManager.MintParams` | The parameters for the position creation |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId | `uint256` | The ID of the new position |

<a id="setremainingdeposit-uint256-uint256"></a>

### setRemainingDeposit

<i>

This function reverts if:

- The caller is not permissioned
- The position ID is invalid
- The caller is not the operator that created the position

</i>

This is a permissioned function that can only be called by approved policies

```solidity
function setRemainingDeposit(
        uint256 positionId_,
        uint256 amount_
    )
        external
        virtual
        override
        permissioned
        onlyValidPosition(positionId_)
        onlyPositionOperator(positionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to update |
| amount_ | `uint256` | The new amount of the position |

<a id="setadditionaldata-uint256-bytes"></a>

### setAdditionalData

<i>

This function reverts if:

- The caller is not permissioned
- The position ID is invalid
- The caller is not the operator that created the position

</i>

This is a permissioned function that can only be called by approved policies

```solidity
function setAdditionalData(
        uint256 positionId_,
        bytes calldata additionalData_
    )
        external
        virtual
        override
        permissioned
        onlyValidPosition(positionId_)
        onlyPositionOperator(positionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to update |
| additionalData_ | `bytes` | The new additional data of the position |

<a id="split-uint256-uint256-address-bool"></a>

### split

<i>

This function reverts if:

- The caller is not permissioned
- The caller is not the operator that created the position
- The amount is 0
- The amount is greater than the remaining deposit
- `to_` is the zero address

</i>

This is a permissioned function that can only be called by approved policies

```solidity
function split(
        uint256 positionId_,
        uint256 amount_,
        address to_,
        bool wrap_
    )
        external
        virtual
        override
        permissioned
        onlyValidPosition(positionId_)
        onlyPositionOperator(positionId_)
        returns (uint256 newPositionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to split |
| amount_ | `uint256` | The amount of the position to split |
| to_ | `address` | The address to split the position to |
| wrap_ | `bool` | Whether the new position should be wrapped |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newPositionId | `uint256` | The ID of the new position |

<a id="tokenuri-uint256"></a>

### tokenURI

```solidity
function tokenURI(uint256 id_) public view virtual override returns (string memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="transferfrom-address-address-uint256"></a>

### transferFrom

<i>

This function performs the following:

- Updates the owner of the position
- Calls `transferFrom` on the parent contract

</i>

```solidity
function transferFrom(address from_, address to_, uint256 tokenId_) public override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from_ | `address` |  |
| to_ | `address` |  |
| tokenId_ | `uint256` |  |

<a id="getpositioncount"></a>

### getPositionCount

Get the total number of positions

```solidity
function getPositionCount() external view virtual override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The total number of positions |

<a id="_getposition-uint256"></a>

### _getPosition

```solidity
function _getPosition(uint256 positionId_) internal view returns (Position memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Position` |  |

<a id="getuserpositionids-address"></a>

### getUserPositionIds

Get the IDs of all positions for a given user

```solidity
function getUserPositionIds(
        address user_
    ) external view virtual override returns (uint256[] memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The address of the user |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256[]` | An array of position IDs |

<a id="getposition-uint256"></a>

### getPosition

Get the position for a given ID

<i>

This function reverts if:

- The position ID is invalid

</i>

```solidity
function getPosition(
        uint256 positionId_
    ) external view virtual override returns (Position memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Position` | The position for the given ID |

<a id="isexpired-uint256"></a>

### isExpired

Check if a position is expired

<i>

This function reverts if:

- The position ID is invalid

</i>

```solidity
function isExpired(uint256 positionId_) external view virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | isExpired_  Returns true if the conversion expiry timestamp is now or in the past |

<a id="_isconvertible-position"></a>

### _isConvertible

```solidity
function _isConvertible(Position memory position_) internal pure returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| position_ | `Position` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="isconvertible-uint256"></a>

### isConvertible

Check if a position is convertible

<i>

This function reverts if:

- The position ID is invalid

</i>

```solidity
function isConvertible(uint256 positionId_) external view virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | isConvertible_  Returns true if the conversion price is not the maximum value |

<a id="_previewconvert-uint256-uint256"></a>

### _previewConvert

```solidity
function _previewConvert(
        uint256 amount_,
        uint256 conversionPrice_
    ) internal pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` |  |
| conversionPrice_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="previewconvert-uint256-uint256"></a>

### previewConvert

Preview the amount of OHM that would be received for a given amount of convertible deposit tokens

```solidity
function previewConvert(
        uint256 positionId_,
        uint256 amount_
    ) public view virtual override onlyValidPosition(positionId_) returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position |
| amount_ | `uint256` | The amount of convertible deposit tokens to convert |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The amount of OHM that would be received |

<a id="_settokenrenderer-address"></a>

### _setTokenRenderer

```solidity
function _setTokenRenderer(address renderer_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| renderer_ | `address` |  |

<a id="settokenrenderer-address"></a>

### setTokenRenderer

Set the token renderer contract

<i>

This function reverts if:

- The caller is not permissioned
- The renderer contract does not implement the required interface

</i>

```solidity
function setTokenRenderer(address renderer_) external virtual override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| renderer_ | `address` | The address of the renderer contract |

<a id="gettokenrenderer"></a>

### getTokenRenderer

Get the current token renderer contract

```solidity
function getTokenRenderer() external view virtual override returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | The address of the current renderer contract (or zero address if not set) |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId_) public view virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="_onlyvalidposition-uint256"></a>

### _onlyValidPosition

```solidity
function _onlyValidPosition(uint256 positionId_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` |  |

<a id="onlyvalidposition-uint256"></a>

### onlyValidPosition

```solidity
modifier onlyValidPosition(uint256 positionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` |  |

<a id="_onlypositionoperator-uint256"></a>

### _onlyPositionOperator

```solidity
function _onlyPositionOperator(uint256 positionId_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` |  |

<a id="onlypositionoperator-uint256"></a>

### onlyPositionOperator

```solidity
modifier onlyPositionOperator(uint256 positionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` |  |

<a id="_onlypositionowner-uint256"></a>

### _onlyPositionOwner

```solidity
function _onlyPositionOwner(uint256 positionId_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` |  |

<a id="onlypositionowner-uint256"></a>

### onlyPositionOwner

```solidity
modifier onlyPositionOwner(uint256 positionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` |  |
