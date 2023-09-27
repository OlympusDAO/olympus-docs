# IOperator









## Methods

### activate

```solidity
function activate() external nonpayable
```

Activate the OperatorAccess restricted

*Restart function for the Operator after a pause.*


### config

```solidity
function config() external view returns (struct IOperator.Config)
```

Returns the config variable of the Operator as a Config struct




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | IOperator.Config | undefined |

### deactivate

```solidity
function deactivate() external nonpayable
```

Deactivate the OperatorAccess restricted

*Emergency pause function for the Operator. Prevents market operations from occurring.*


### deactivateCushion

```solidity
function deactivateCushion(bool high_) external nonpayable
```

Manually close a cushion bond marketAccess restricted

*Emergency shutdown function for Cushions*

#### Parameters

| Name | Type | Description |
|---|---|---|
| high_ | bool | Whether to deactivate the high or low side cushion (true = high, false = low) |

### fullCapacity

```solidity
function fullCapacity(bool high_) external view returns (uint256)
```

Returns the full capacity of the specified wall (if it was regenerated now)

*Calculates the capacity to deploy for a wall based on the amount of reserves owned by the treasury and the reserve factor.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| high_ | bool | - Whether to return the full capacity for the high or low wall |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getAmountOut

```solidity
function getAmountOut(contract ERC20 tokenIn_, uint256 amountIn_) external view returns (uint256)
```

Returns the amount to be received from a swap



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenIn_ | contract ERC20 | - Token to swap into the wall         - If OHM: swap at the low wall price for Reserve         - If Reserve: swap at the high wall price for OHM |
| amountIn_ | uint256 | - Amount of tokenIn to swap |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Amount of opposite token received |

### initialize

```solidity
function initialize() external nonpayable
```

Initialize the Operator to begin market operationsAccess restrictedCan only be called once

*This function executes actions required to start operations that cannot be done prior to the Operator policy being approved by the Kernel.*


### operate

```solidity
function operate() external nonpayable
```

Executes market operations logic.Access restricted

*This function is triggered by a keeper on the Heart contract.*


### regenerate

```solidity
function regenerate(bool high_) external nonpayable
```

Regenerate the wall for a sideAccess restricted

*This function is an escape hatch to trigger out of cycle regenerations and may be useful when doing migrations of Treasury funds*

#### Parameters

| Name | Type | Description |
|---|---|---|
| high_ | bool | Whether to regenerate the high side or low side (true = high, false = low) |

### setBondContracts

```solidity
function setBondContracts(contract IBondSDA auctioneer_, contract IBondCallback callback_) external nonpayable
```

Set the contracts that the Operator deploys bond markets with.Access restricted



#### Parameters

| Name | Type | Description |
|---|---|---|
| auctioneer_ | contract IBondSDA | - Address of the bond auctioneer to use. |
| callback_ | contract IBondCallback | - Address of the callback to use. |

### setCushionFactor

```solidity
function setCushionFactor(uint32 cushionFactor_) external nonpayable
```

Set the cushion factorAccess restricted



#### Parameters

| Name | Type | Description |
|---|---|---|
| cushionFactor_ | uint32 | - Percent of wall capacity that the operator will deploy in the cushion, assumes 2 decimals (i.e. 1000 = 10%) |

### setCushionParams

```solidity
function setCushionParams(uint32 duration_, uint32 debtBuffer_, uint32 depositInterval_) external nonpayable
```

Set the parameters used to deploy cushion bond marketsAccess restricted



#### Parameters

| Name | Type | Description |
|---|---|---|
| duration_ | uint32 | - Duration of cushion bond markets in seconds |
| debtBuffer_ | uint32 | - Percentage over the initial debt to allow the market to accumulate at any one time. Percent with 3 decimals, e.g. 1_000 = 1 %. See IBondSDA for more info. |
| depositInterval_ | uint32 | - Target frequency of deposits in seconds. Determines max payout of the bond market. See IBondSDA for more info. |

### setRegenParams

```solidity
function setRegenParams(uint32 wait_, uint32 threshold_, uint32 observe_) external nonpayable
```

Set the wall regeneration parametersAccess restricted

*We must see Threshold number of price points that meet our criteria within the last Observe number of price points to regenerate a wall.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| wait_ | uint32 | - Minimum duration to wait to reinstate a wall in seconds |
| threshold_ | uint32 | - Number of price points on other side of moving average to reinstate a wall |
| observe_ | uint32 | - Number of price points to observe to determine regeneration |

### setReserveFactor

```solidity
function setReserveFactor(uint32 reserveFactor_) external nonpayable
```

Set the reserve factorAccess restricted



#### Parameters

| Name | Type | Description |
|---|---|---|
| reserveFactor_ | uint32 | - Percent of treasury reserves to deploy as capacity for market operations, assumes 2 decimals (i.e. 1000 = 10%) |

### setSpreads

```solidity
function setSpreads(uint256 cushionSpread_, uint256 wallSpread_) external nonpayable
```

Set the wall and cushion spreadsAccess restricted

*Interface for externally setting these values on the RANGE module*

#### Parameters

| Name | Type | Description |
|---|---|---|
| cushionSpread_ | uint256 | - Percent spread to set the cushions at above/below the moving average, assumes 2 decimals (i.e. 1000 = 10%) |
| wallSpread_ | uint256 | - Percent spread to set the walls at above/below the moving average, assumes 2 decimals (i.e. 1000 = 10%) |

### setThresholdFactor

```solidity
function setThresholdFactor(uint256 thresholdFactor_) external nonpayable
```

Set the threshold factor for when a wall is considered &quot;down&quot;Access restricted

*Interface for externally setting this value on the RANGE module*

#### Parameters

| Name | Type | Description |
|---|---|---|
| thresholdFactor_ | uint256 | - Percent of capacity that the wall should close below, assumes 2 decimals (i.e. 1000 = 10%) |

### status

```solidity
function status() external view returns (struct IOperator.Status)
```

Returns the status variable of the Operator as a Status struct




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | IOperator.Status | undefined |

### swap

```solidity
function swap(contract ERC20 tokenIn_, uint256 amountIn_, uint256 minAmountOut_) external nonpayable returns (uint256 amountOut)
```

Swap at the current wall prices



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenIn_ | contract ERC20 | - Token to swap into the wall         - OHM: swap at the low wall price for Reserve         - Reserve: swap at the high wall price for OHM |
| amountIn_ | uint256 | - Amount of tokenIn to swap |
| minAmountOut_ | uint256 | - Minimum amount of opposite token to receive |

#### Returns

| Name | Type | Description |
|---|---|---|
| amountOut | uint256 | - Amount of opposite token received |



## Events

### CushionFactorChanged

```solidity
event CushionFactorChanged(uint32 cushionFactor_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| cushionFactor_  | uint32 | undefined |

### CushionParamsChanged

```solidity
event CushionParamsChanged(uint32 duration_, uint32 debtBuffer_, uint32 depositInterval_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| duration_  | uint32 | undefined |
| debtBuffer_  | uint32 | undefined |
| depositInterval_  | uint32 | undefined |

### RegenParamsChanged

```solidity
event RegenParamsChanged(uint32 wait_, uint32 threshold_, uint32 observe_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| wait_  | uint32 | undefined |
| threshold_  | uint32 | undefined |
| observe_  | uint32 | undefined |

### ReserveFactorChanged

```solidity
event ReserveFactorChanged(uint32 reserveFactor_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| reserveFactor_  | uint32 | undefined |

### Swap

```solidity
event Swap(contract ERC20 indexed tokenIn_, contract ERC20 indexed tokenOut_, uint256 amountIn_, uint256 amountOut_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenIn_ `indexed` | contract ERC20 | undefined |
| tokenOut_ `indexed` | contract ERC20 | undefined |
| amountIn_  | uint256 | undefined |
| amountOut_  | uint256 | undefined |



## Errors

### Operator_AlreadyInitialized

```solidity
error Operator_AlreadyInitialized()
```






### Operator_AmountLessThanMinimum

```solidity
error Operator_AmountLessThanMinimum(uint256 amountOut, uint256 minAmountOut)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| amountOut | uint256 | undefined |
| minAmountOut | uint256 | undefined |

### Operator_Inactive

```solidity
error Operator_Inactive()
```






### Operator_InsufficientCapacity

```solidity
error Operator_InsufficientCapacity()
```






### Operator_InvalidParams

```solidity
error Operator_InvalidParams()
```






### Operator_NotInitialized

```solidity
error Operator_NotInitialized()
```






### Operator_WallDown

```solidity
error Operator_WallDown()
```







