# PositionTokenRenderer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/DEPOS/PositionTokenRenderer.sol)

**Inherits:** [IPositionTokenRenderer](/main/contracts/docs/src/modules/DEPOS/IPositionTokenRenderer.sol/interface.IPositionTokenRenderer)

**Title:** Position Token Renderer

Implementation of the IPositionTokenRenderer interface
This contract implements a custom token renderer
for the Olympus Deposit Position Manager

## Constants

### DISPLAY_DECIMALS

The number of decimal places to display when rendering values as decimal strings

```solidity
uint8 public constant DISPLAY_DECIMALS = 2;
```

### OHM_DECIMALS

```solidity
uint8 public constant OHM_DECIMALS = 9;
```

## Functions

<a id="tokenuri-address-uint256"></a>

### tokenURI

Renders the token URI for a given position

<i>

This function should return a valid JSON metadata string that follows the ERC721 metadata standard

</i>

```solidity
function tokenURI(
        address positionManager_,
        uint256 positionId_
    ) external view override returns (string memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionManager_ | `address` | The address of the position manager contract |
| positionId_ | `uint256` | The ID of the position to render |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` | The token URI as a string |

<a id="_gettimestring-uint48"></a>

### _getTimeString

```solidity
function _getTimeString(uint48 time_) internal pure returns (string memory);
```

**Parameters**

| Name  | Type     | Description |
| ----- | -------- | ----------- |
| time_ | `uint48` |             |

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_rendersvg-idepositpositionmanager-position-string-bool"></a>

### _renderSVG

```solidity
function _renderSVG(
        IDepositPositionManager.Position memory position_,
        string memory cdSymbol_,
        bool positionIsConvertible_
    ) internal view returns (string memory);
```

**Parameters**

| Name                   | Type                               | Description |
| ---------------------- | ---------------------------------- | ----------- |
| position_              | `IDepositPositionManager.Position` |             |
| cdSymbol_              | `string`                           |             |
| positionIsConvertible_ | `bool`                             |             |

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId_) external pure returns (bool);
```

**Parameters**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| interfaceId_ | `bytes4` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |
