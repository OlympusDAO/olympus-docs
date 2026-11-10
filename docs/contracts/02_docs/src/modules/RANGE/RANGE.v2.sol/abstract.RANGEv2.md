# RANGEv2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/RANGE/RANGE.v2.sol)

**Inherits:** [Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

## State Variables

### _range

```solidity
Range internal _range;
```

### thresholdFactor

Threshold factor for the change, a percent in 2 decimals (i.e. 1000 = 10%). Determines how much of the capacity must be spent before the side is taken down.

<i>

A threshold is required so that a wall is not "active" with a capacity near zero, but unable to be depleted practically (dust).

</i>

```solidity
uint256 public thresholdFactor;
```

### ohm

OHM token contract address

```solidity
ERC20 public ohm;
```

### reserve

Reserve token contract address

```solidity
ERC20 public reserve;
```

## Functions

<a id="updatecapacity-bool-uint256"></a>

### updateCapacity

Update the capacity for a side of the range.

Access restricted to activated policies.

```solidity
function updateCapacity(bool high_, uint256 capacity_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Specifies the side of the range to update capacity for (true = high side, false = low side). |
| capacity_ | `uint256` | - Amount to set the capacity to (OHM tokens for high side, Reserve tokens for low side). |

<a id="updateprices-uint256"></a>

### updatePrices

Update the prices for the low and high sides.

Access restricted to activated policies.

```solidity
function updatePrices(uint256 target_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| target_ | `uint256` | - Target price to set range prices from. |

<a id="regenerate-bool-uint256"></a>

### regenerate

Regenerate a side of the range to a specific capacity.

Access restricted to activated policies.

```solidity
function regenerate(bool high_, uint256 capacity_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Specifies the side of the range to regenerate (true = high side, false = low side). |
| capacity_ | `uint256` | - Amount to set the capacity to (OHM tokens for high side, Reserve tokens for low side). |

<a id="updatemarket-bool-uint256-uint256"></a>

### updateMarket

Update the market ID (cushion) for a side of the range.

Access restricted to activated policies.

```solidity
function updateMarket(bool high_, uint256 market_, uint256 marketCapacity_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Specifies the side of the range to update market for (true = high side, false = low side). |
| market_ | `uint256` | - Market ID to set for the side. |
| marketCapacity_ | `uint256` | - Amount to set the last market capacity to (OHM tokens for high side, Reserve tokens for low side). |

<a id="setspreads-bool-uint256-uint256"></a>

### setSpreads

Set the wall and cushion spreads.

Access restricted to activated policies.

<i>

The new spreads will not go into effect until the next time updatePrices() is called.

</i>

```solidity
function setSpreads(bool high_, uint256 cushionSpread_, uint256 wallSpread_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Specifies the side of the range to set spreads for (true = high side, false = low side). |
| cushionSpread_ | `uint256` | - Percent spread to set the cushions at above/below the moving average, assumes 2 decimals (i.e. 1000 = 10%). |
| wallSpread_ | `uint256` | - Percent spread to set the walls at above/below the moving average, assumes 2 decimals (i.e. 1000 = 10%). |

<a id="setthresholdfactor-uint256"></a>

### setThresholdFactor

Set the threshold factor for when a wall is considered "down".

Access restricted to activated policies.

<i>

The new threshold factor will not go into effect until the next time regenerate() is called for each side of the wall.

</i>

```solidity
function setThresholdFactor(uint256 thresholdFactor_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| thresholdFactor_ | `uint256` | - Percent of capacity that the wall should close below, assumes 2 decimals (i.e. 1000 = 10%). |

<a id="range"></a>

### range

Get the full Range data in a struct.

```solidity
function range() external view virtual returns (Range memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Range` |  |

<a id="capacity-bool"></a>

### capacity

Get the capacity for a side of the range.

```solidity
function capacity(bool high_) external view virtual returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Specifies the side of the range to get capacity for (true = high side, false = low side). |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="active-bool"></a>

### active

Get the status of a side of the range (whether it is active or not).

```solidity
function active(bool high_) external view virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Specifies the side of the range to get status for (true = high side, false = low side). |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="price-bool-bool"></a>

### price

Get the price for the wall or cushion for a side of the range.

```solidity
function price(bool high_, bool wall_) external view virtual returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Specifies the side of the range to get the price for (true = high side, false = low side). |
| wall_ | `bool` | - Specifies the band to get the price for (true = wall, false = cushion). |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="spread-bool-bool"></a>

### spread

Get the spread for the wall or cushion band.

```solidity
function spread(bool high_, bool wall_) external view virtual returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Specifies the side of the range to get the spread for (true = high side, false = low side). |
| wall_ | `bool` | - Specifies the band to get the spread for (true = wall, false = cushion). |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="market-bool"></a>

### market

Get the market ID for a side of the range.

```solidity
function market(bool high_) external view virtual returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Specifies the side of the range to get market for (true = high side, false = low side). |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="lastactive-bool"></a>

### lastActive

Get the timestamp when the range was last active.

```solidity
function lastActive(bool high_) external view virtual returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Specifies the side of the range to get timestamp for (true = high side, false = low side). |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

## Events

### WallUp

```solidity
event WallUp(bool high_, uint256 timestamp_, uint256 capacity_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` |  |
| timestamp_ | `uint256` |  |
| capacity_ | `uint256` |  |

### WallDown

```solidity
event WallDown(bool high_, uint256 timestamp_, uint256 capacity_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` |  |
| timestamp_ | `uint256` |  |
| capacity_ | `uint256` |  |

### CushionUp

```solidity
event CushionUp(bool high_, uint256 timestamp_, uint256 capacity_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` |  |
| timestamp_ | `uint256` |  |
| capacity_ | `uint256` |  |

### CushionDown

```solidity
event CushionDown(bool high_, uint256 timestamp_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` |  |
| timestamp_ | `uint256` |  |

### PricesChanged

```solidity
event PricesChanged(
        uint256 wallLowPrice_,
        uint256 cushionLowPrice_,
        uint256 cushionHighPrice_,
        uint256 wallHighPrice_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| wallLowPrice_ | `uint256` |  |
| cushionLowPrice_ | `uint256` |  |
| cushionHighPrice_ | `uint256` |  |
| wallHighPrice_ | `uint256` |  |

### SpreadsChanged

```solidity
event SpreadsChanged(bool high_, uint256 cushionSpread_, uint256 wallSpread_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` |  |
| cushionSpread_ | `uint256` |  |
| wallSpread_ | `uint256` |  |

### ThresholdFactorChanged

```solidity
event ThresholdFactorChanged(uint256 thresholdFactor_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| thresholdFactor_ | `uint256` |  |

## Errors

### RANGE_InvalidParams

```solidity
error RANGE_InvalidParams();
```

## Structs

### Line

```solidity
struct Line {
        uint256 price; // Price for the specified level
        uint256 spread; // Spread of the level, percent with 2 decimal places (i.e. 1000 = 10% spread)
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| price | `uint256` |  |
| spread | `uint256` |  |

### Side

```solidity
struct Side {
        bool active; // Whether or not the side is active (i.e. the Operator is performing market operations on this side, true = active, false = inactive)
        uint48 lastActive; // Unix timestamp when the side was last active (in seconds)
        uint256 capacity; // Amount of tokens that can be used to defend the side of the range. Specified in OHM tokens on the high side and Reserve tokens on the low side.
        uint256 threshold; // Minimum number of tokens required in capacity to maintain an active side. Specified in OHM tokens on the high side and Reserve tokens on the low side.
        uint256 market; // Market ID of the cushion bond market for the side. If no market is active, the market ID is set to max uint256 value.
        Line cushion; // Cushion data for the side
        Line wall; // Wall data for the side
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| active | `bool` |  |
| lastActive | `uint48` |  |
| capacity | `uint256` |  |
| threshold | `uint256` |  |
| market | `uint256` |  |
| cushion | `Line` |  |
| wall | `Line` |  |

### Range

```solidity
struct Range {
        Side low; // Data specific to the low side of the range
        Side high; // Data specific to the high side of the range
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| low | `Side` |  |
| high | `Side` |  |
