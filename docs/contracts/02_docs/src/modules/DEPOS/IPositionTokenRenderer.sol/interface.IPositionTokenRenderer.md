# IPositionTokenRenderer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/modules/DEPOS/IPositionTokenRenderer.sol)

Interface for a contract that can render token URIs for deposit positions

## Functions

### tokenURI

Renders the token URI for a given position

*This function should return a valid JSON metadata string that follows the ERC721 metadata standard*

```solidity
function tokenURI(address positionManager_, uint256 positionId_) external view returns (string memory uri);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionManager_`|`address`|The address of the position manager contract|
|`positionId_`|`uint256`|     The ID of the position to render|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`uri`|`string`|             The token URI as a string|

## Errors

### PositionTokenRenderer_InvalidAddress

```solidity
error PositionTokenRenderer_InvalidAddress();
```
