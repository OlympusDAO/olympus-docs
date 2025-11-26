# OlympusRange

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/modules/RANGE/OlympusRange.sol)

**Inherits:**
[RANGEv2](/main/contracts/docs/src/modules/RANGE/RANGE.v2.sol/abstract.RANGEv2)

Olympus Range data storage module

The Olympus Range contract stores information about the Olympus Range market operations status.
It provides a standard interface for Range data, including range prices and capacities of each range side.
The data provided by this contract is used by the Olympus Range Operator to perform market operations.
The Olympus Range Data is updated each epoch by the Olympus Range Operator contract.

## State Variables

### ONE_HUNDRED_PERCENT

```solidity
uint256 public constant ONE_HUNDRED_PERCENT = 100e2
```

### ONE_PERCENT

```solidity
uint256 public constant ONE_PERCENT = 1e2
```

## Functions

### constructor

```solidity
constructor(
    Kernel kernel_,
    ERC20 ohm_,
    ERC20 reserve_,
    uint256 thresholdFactor_,
    uint256[2] memory lowSpreads_, // [cushion, wall]
    uint256[2] memory highSpreads_ // [cushion, wall]
) Module(kernel_);
```

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|- Major version upgrade indicates breaking change to the interface.|
|`minor`|`uint8`|- Minor version change retains backward-compatible interface.|

### updateCapacity

Update the capacity for a side of the range.

```solidity
function updateCapacity(bool high_, uint256 capacity_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`high_`|`bool`|- Specifies the side of the range to update capacity for (true = high side, false = low side).|
|`capacity_`|`uint256`|- Amount to set the capacity to (OHM tokens for high side, Reserve tokens for low side).|

### updatePrices

Update the prices for the low and high sides.

```solidity
function updatePrices(uint256 target_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`target_`|`uint256`|- Target price to set range prices from.|

### regenerate

Regenerate a side of the range to a specific capacity.

```solidity
function regenerate(bool high_, uint256 capacity_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`high_`|`bool`|- Specifies the side of the range to regenerate (true = high side, false = low side).|
|`capacity_`|`uint256`|- Amount to set the capacity to (OHM tokens for high side, Reserve tokens for low side).|

### updateMarket

Update the market ID (cushion) for a side of the range.

```solidity
function updateMarket(bool high_, uint256 market_, uint256 marketCapacity_) public override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`high_`|`bool`|- Specifies the side of the range to update market for (true = high side, false = low side).|
|`market_`|`uint256`|- Market ID to set for the side.|
|`marketCapacity_`|`uint256`|- Amount to set the last market capacity to (OHM tokens for high side, Reserve tokens for low side).|

### setSpreads

Set the wall and cushion spreads.

The new spreads will not go into effect until the next time updatePrices() is called.

```solidity
function setSpreads(bool high_, uint256 cushionSpread_, uint256 wallSpread_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`high_`|`bool`|- Specifies the side of the range to set spreads for (true = high side, false = low side).|
|`cushionSpread_`|`uint256`|- Percent spread to set the cushions at above/below the moving average, assumes 2 decimals (i.e. 1000 = 10%).|
|`wallSpread_`|`uint256`|- Percent spread to set the walls at above/below the moving average, assumes 2 decimals (i.e. 1000 = 10%).|

### setThresholdFactor

Set the threshold factor for when a wall is considered "down".

The new threshold factor will not go into effect until the next time regenerate() is called for each side of the wall.

```solidity
function setThresholdFactor(uint256 thresholdFactor_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`thresholdFactor_`|`uint256`|- Percent of capacity that the wall should close below, assumes 2 decimals (i.e. 1000 = 10%).|

### range

Get the full Range data in a struct.

```solidity
function range() external view override returns (Range memory);
```

### capacity

Get the capacity for a side of the range.

```solidity
function capacity(bool high_) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`high_`|`bool`|- Specifies the side of the range to get capacity for (true = high side, false = low side).|

### active

Get the status of a side of the range (whether it is active or not).

```solidity
function active(bool high_) external view override returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`high_`|`bool`|- Specifies the side of the range to get status for (true = high side, false = low side).|

### price

Get the price for the wall or cushion for a side of the range.

```solidity
function price(bool high_, bool wall_) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`high_`|`bool`|- Specifies the side of the range to get the price for (true = high side, false = low side).|
|`wall_`|`bool`|- Specifies the band to get the price for (true = wall, false = cushion).|

### spread

Get the spread for the wall or cushion band.

```solidity
function spread(bool high_, bool wall_) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`high_`|`bool`|- Specifies the side of the range to get the spread for (true = high side, false = low side).|
|`wall_`|`bool`|- Specifies the band to get the spread for (true = wall, false = cushion).|

### market

Get the market ID for a side of the range.

```solidity
function market(bool high_) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`high_`|`bool`|- Specifies the side of the range to get market for (true = high side, false = low side).|

### lastActive

Get the timestamp when the range was last active.

```solidity
function lastActive(bool high_) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`high_`|`bool`|- Specifies the side of the range to get timestamp for (true = high side, false = low side).|
