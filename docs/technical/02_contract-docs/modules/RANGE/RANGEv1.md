# RANGEv1









## Methods

### INIT

```solidity
function INIT() external nonpayable
```

Initialization function for the module

*This function is called when the module is installed or upgraded by the kernel.MUST BE GATED BY onlyKernel. Used to encompass any initialization or upgrade logic.*


### KEYCODE

```solidity
function KEYCODE() external pure returns (Keycode)
```

5 byte identifier for a module.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |

### VERSION

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor)
```

Returns which semantic version of a module is being implemented.




#### Returns

| Name | Type | Description |
|---|---|---|
| major | uint8 | - Major version upgrade indicates breaking change to the interface. |
| minor | uint8 | - Minor version change retains backward-compatible interface. |

### active

```solidity
function active(bool high_) external view returns (bool)
```

Get the status of a side of the range (whether it is active or not).



#### Parameters

| Name | Type | Description |
|---|---|---|
| high_ | bool | - Specifies the side of the range to get status for (true = high side, false = low side). |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### capacity

```solidity
function capacity(bool high_) external view returns (uint256)
```

Get the capacity for a side of the range.



#### Parameters

| Name | Type | Description |
|---|---|---|
| high_ | bool | - Specifies the side of the range to get capacity for (true = high side, false = low side). |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### changeKernel

```solidity
function changeKernel(contract Kernel newKernel_) external nonpayable
```

Function used by kernel when migrating to a new kernel.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newKernel_ | contract Kernel | undefined |

### kernel

```solidity
function kernel() external view returns (contract Kernel)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Kernel | undefined |

### lastActive

```solidity
function lastActive(bool high_) external view returns (uint256)
```

Get the timestamp when the range was last active.



#### Parameters

| Name | Type | Description |
|---|---|---|
| high_ | bool | - Specifies the side of the range to get timestamp for (true = high side, false = low side). |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### market

```solidity
function market(bool high_) external view returns (uint256)
```

Get the market ID for a side of the range.



#### Parameters

| Name | Type | Description |
|---|---|---|
| high_ | bool | - Specifies the side of the range to get market for (true = high side, false = low side). |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### ohm

```solidity
function ohm() external view returns (contract ERC20)
```

OHM token contract address




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ERC20 | undefined |

### price

```solidity
function price(bool wall_, bool high_) external view returns (uint256)
```

Get the price for the wall or cushion for a side of the range.



#### Parameters

| Name | Type | Description |
|---|---|---|
| wall_ | bool | - Specifies the band to get the price for (true = wall, false = cushion). |
| high_ | bool | - Specifies the side of the range to get the price for (true = high side, false = low side). |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### range

```solidity
function range() external view returns (struct RANGEv1.Range)
```

Get the full Range data in a struct.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | RANGEv1.Range | undefined |

### regenerate

```solidity
function regenerate(bool high_, uint256 capacity_) external nonpayable
```

Regenerate a side of the range to a specific capacity.Access restricted to activated policies.



#### Parameters

| Name | Type | Description |
|---|---|---|
| high_ | bool | - Specifies the side of the range to regenerate (true = high side, false = low side). |
| capacity_ | uint256 | - Amount to set the capacity to (OHM tokens for high side, Reserve tokens for low side). |

### reserve

```solidity
function reserve() external view returns (contract ERC20)
```

Reserve token contract address




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ERC20 | undefined |

### setSpreads

```solidity
function setSpreads(uint256 cushionSpread_, uint256 wallSpread_) external nonpayable
```

Set the wall and cushion spreads.Access restricted to activated policies.

*The new spreads will not go into effect until the next time updatePrices() is called.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| cushionSpread_ | uint256 | - Percent spread to set the cushions at above/below the moving average, assumes 2 decimals (i.e. 1000 = 10%). |
| wallSpread_ | uint256 | - Percent spread to set the walls at above/below the moving average, assumes 2 decimals (i.e. 1000 = 10%). |

### setThresholdFactor

```solidity
function setThresholdFactor(uint256 thresholdFactor_) external nonpayable
```

Set the threshold factor for when a wall is considered &quot;down&quot;.Access restricted to activated policies.

*The new threshold factor will not go into effect until the next time regenerate() is called for each side of the wall.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| thresholdFactor_ | uint256 | - Percent of capacity that the wall should close below, assumes 2 decimals (i.e. 1000 = 10%). |

### spread

```solidity
function spread(bool wall_) external view returns (uint256)
```

Get the spread for the wall or cushion band.



#### Parameters

| Name | Type | Description |
|---|---|---|
| wall_ | bool | - Specifies the band to get the spread for (true = wall, false = cushion). |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### thresholdFactor

```solidity
function thresholdFactor() external view returns (uint256)
```

Threshold factor for the change, a percent in 2 decimals (i.e. 1000 = 10%). Determines how much of the capacity must be spent before the side is taken down.

*A threshold is required so that a wall is not &quot;active&quot; with a capacity near zero, but unable to be depleted practically (dust).*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### updateCapacity

```solidity
function updateCapacity(bool high_, uint256 capacity_) external nonpayable
```

Update the capacity for a side of the range.Access restricted to activated policies.



#### Parameters

| Name | Type | Description |
|---|---|---|
| high_ | bool | - Specifies the side of the range to update capacity for (true = high side, false = low side). |
| capacity_ | uint256 | - Amount to set the capacity to (OHM tokens for high side, Reserve tokens for low side). |

### updateMarket

```solidity
function updateMarket(bool high_, uint256 market_, uint256 marketCapacity_) external nonpayable
```

Update the market ID (cushion) for a side of the range.Access restricted to activated policies.



#### Parameters

| Name | Type | Description |
|---|---|---|
| high_ | bool | - Specifies the side of the range to update market for (true = high side, false = low side). |
| market_ | uint256 | - Market ID to set for the side. |
| marketCapacity_ | uint256 | - Amount to set the last market capacity to (OHM tokens for high side, Reserve tokens for low side). |

### updatePrices

```solidity
function updatePrices(uint256 movingAverage_) external nonpayable
```

Update the prices for the low and high sides.Access restricted to activated policies.



#### Parameters

| Name | Type | Description |
|---|---|---|
| movingAverage_ | uint256 | - Current moving average price to set range prices from. |



## Events

### CushionDown

```solidity
event CushionDown(bool high_, uint256 timestamp_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| high_  | bool | undefined |
| timestamp_  | uint256 | undefined |

### CushionUp

```solidity
event CushionUp(bool high_, uint256 timestamp_, uint256 capacity_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| high_  | bool | undefined |
| timestamp_  | uint256 | undefined |
| capacity_  | uint256 | undefined |

### PricesChanged

```solidity
event PricesChanged(uint256 wallLowPrice_, uint256 cushionLowPrice_, uint256 cushionHighPrice_, uint256 wallHighPrice_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| wallLowPrice_  | uint256 | undefined |
| cushionLowPrice_  | uint256 | undefined |
| cushionHighPrice_  | uint256 | undefined |
| wallHighPrice_  | uint256 | undefined |

### SpreadsChanged

```solidity
event SpreadsChanged(uint256 cushionSpread_, uint256 wallSpread_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| cushionSpread_  | uint256 | undefined |
| wallSpread_  | uint256 | undefined |

### ThresholdFactorChanged

```solidity
event ThresholdFactorChanged(uint256 thresholdFactor_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| thresholdFactor_  | uint256 | undefined |

### WallDown

```solidity
event WallDown(bool high_, uint256 timestamp_, uint256 capacity_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| high_  | bool | undefined |
| timestamp_  | uint256 | undefined |
| capacity_  | uint256 | undefined |

### WallUp

```solidity
event WallUp(bool high_, uint256 timestamp_, uint256 capacity_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| high_  | bool | undefined |
| timestamp_  | uint256 | undefined |
| capacity_  | uint256 | undefined |



## Errors

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### Module_PolicyNotPermitted

```solidity
error Module_PolicyNotPermitted(address policy_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ | address | undefined |

### RANGE_InvalidParams

```solidity
error RANGE_InvalidParams()
```







