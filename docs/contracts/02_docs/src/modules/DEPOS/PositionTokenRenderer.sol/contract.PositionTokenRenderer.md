# PositionTokenRenderer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/modules/DEPOS/PositionTokenRenderer.sol)

**Inherits:**
[IPositionTokenRenderer](/main/contracts/docs/src/modules/DEPOS/IPositionTokenRenderer.sol/interface.IPositionTokenRenderer)

forge-lint: disable-start(mixed-case-function)

Implementation of the IPositionTokenRenderer interface
This contract implements a custom token renderer
for the Olympus Deposit Position Manager

## State Variables

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

### tokenURI

Renders the token URI for a given position

*This function should return a valid JSON metadata string that follows the ERC721 metadata standard*

```solidity
function tokenURI(address positionManager_, uint256 positionId_) external view override returns (string memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionManager_`|`address`|The address of the position manager contract|
|`positionId_`|`uint256`|     The ID of the position to render|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|uri              The token URI as a string|

### _getTimeString

```solidity
function _getTimeString(uint48 time_) internal pure returns (string memory);
```

### _renderSVG

```solidity
function _renderSVG(
    IDepositPositionManager.Position memory position_,
    string memory cdSymbol_,
    bool positionIsConvertible_
) internal view returns (string memory);
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId_) external pure returns (bool);
```
