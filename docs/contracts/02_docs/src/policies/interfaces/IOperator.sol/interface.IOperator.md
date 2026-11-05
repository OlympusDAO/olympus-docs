# IOperator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/IOperator.sol)

## Functions

<a id="operate"></a>

### operate

Executes market operations logic.

Access restricted

<i>

This function is triggered by a keeper on the Heart contract.

</i>

```solidity
function operate() external;
```

<a id="swap-erc20-uint256-uint256"></a>

### swap

Swap at the current wall prices

```solidity
function swap(
        ERC20 tokenIn_,
        uint256 amountIn_,
        uint256 minAmountOut_
    ) external returns (uint256 amountOut);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenIn_ | `ERC20` | - Token to swap into the wall<br/>- OHM: swap at the low wall price for Reserve<br/>- Reserve: swap at the high wall price for OHM |
| amountIn_ | `uint256` | - Amount of tokenIn to swap |
| minAmountOut_ | `uint256` | - Minimum amount of opposite token to receive |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | `uint256` | - Amount of opposite token received |

<a id="getamountout-erc20-uint256"></a>

### getAmountOut

Returns the amount to be received from a swap

```solidity
function getAmountOut(ERC20 tokenIn_, uint256 amountIn_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenIn_ | `ERC20` | - Token to swap into the wall<br/>- If OHM: swap at the low wall price for Reserve<br/>- If Reserve: swap at the high wall price for OHM |
| amountIn_ | `uint256` | - Amount of tokenIn to swap |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | Amount of opposite token received |

<a id="setspreads-bool-uint256-uint256"></a>

### setSpreads

Set the wall and cushion spreads

Access restricted

<i>

Interface for externally setting these values on the RANGE module

</i>

```solidity
function setSpreads(bool high_, uint256 cushionSpread_, uint256 wallSpread_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Whether to set the spreads for the high or low side (true = high, false = low) |
| cushionSpread_ | `uint256` | - Percent spread to set the cushions at above/below the moving average, assumes 2 decimals (i.e. 1000 = 10%) |
| wallSpread_ | `uint256` | - Percent spread to set the walls at above/below the moving average, assumes 2 decimals (i.e. 1000 = 10%) |

<a id="setthresholdfactor-uint256"></a>

### setThresholdFactor

Set the threshold factor for when a wall is considered "down"

Access restricted

<i>

Interface for externally setting this value on the RANGE module

</i>

```solidity
function setThresholdFactor(uint256 thresholdFactor_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| thresholdFactor_ | `uint256` | - Percent of capacity that the wall should close below, assumes 2 decimals (i.e. 1000 = 10%) |

<a id="setcushionfactor-uint32"></a>

### setCushionFactor

Set the cushion factor

Access restricted

```solidity
function setCushionFactor(uint32 cushionFactor_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| cushionFactor_ | `uint32` | - Percent of wall capacity that the operator will deploy in the cushion, assumes 2 decimals (i.e. 1000 = 10%) |

<a id="setcushionparams-uint32-uint32-uint32"></a>

### setCushionParams

Set the parameters used to deploy cushion bond markets

Access restricted

```solidity
function setCushionParams(
        uint32 duration_,
        uint32 debtBuffer_,
        uint32 depositInterval_
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| duration_ | `uint32` | - Duration of cushion bond markets in seconds |
| debtBuffer_ | `uint32` | - Percentage over the initial debt to allow the market to accumulate at any one time. Percent with 3 decimals, e.g. 1_000 = 1 %. See IBondSDA for more info. |
| depositInterval_ | `uint32` | - Target frequency of deposits in seconds. Determines max payout of the bond market. See IBondSDA for more info. |

<a id="setreservefactor-uint32"></a>

### setReserveFactor

Set the reserve factor

Access restricted

```solidity
function setReserveFactor(uint32 reserveFactor_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| reserveFactor_ | `uint32` | - Percent of treasury reserves to deploy as capacity for market operations, assumes 2 decimals (i.e. 1000 = 10%) |

<a id="setregenparams-uint32-uint32-uint32"></a>

### setRegenParams

Set the wall regeneration parameters

Access restricted

<i>

We must see Threshold number of price points that meet our criteria within the last Observe number of price points to regenerate a wall.

</i>

```solidity
function setRegenParams(uint32 wait_, uint32 threshold_, uint32 observe_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| wait_ | `uint32` | - Minimum duration to wait to reinstate a wall in seconds |
| threshold_ | `uint32` | - Number of price points on other side of moving average to reinstate a wall |
| observe_ | `uint32` | - Number of price points to observe to determine regeneration |

<a id="setbondcontracts-ibondsda-ibondcallback"></a>

### setBondContracts

Set the contracts that the Operator deploys bond markets with.

Access restricted

```solidity
function setBondContracts(IBondSDA auctioneer_, IBondCallback callback_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| auctioneer_ | `IBondSDA` | - Address of the bond auctioneer to use. |
| callback_ | `IBondCallback` | - Address of the callback to use. |

<a id="initialize"></a>

### initialize

Initialize the Operator to begin market operations

Access restricted

Can only be called once

<i>

This function executes actions required to start operations that cannot be done prior to the Operator policy being approved by the Kernel.

</i>

```solidity
function initialize() external;
```

<a id="regenerate-bool"></a>

### regenerate

Regenerate the wall for a side

Access restricted

<i>

This function is an escape hatch to trigger out of cycle regenerations and may be useful when doing migrations of Treasury funds

</i>

```solidity
function regenerate(bool high_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | Whether to regenerate the high side or low side (true = high, false = low) |

<a id="deactivate"></a>

### deactivate

Deactivate the Operator

Access restricted

<i>

Emergency pause function for the Operator. Prevents market operations from occurring.

</i>

```solidity
function deactivate() external;
```

<a id="activate"></a>

### activate

Activate the Operator

Access restricted

<i>

Restart function for the Operator after a pause.

</i>

```solidity
function activate() external;
```

<a id="deactivatecushion-bool"></a>

### deactivateCushion

Manually close a cushion bond market

Access restricted

<i>

Emergency shutdown function for Cushions

</i>

```solidity
function deactivateCushion(bool high_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | Whether to deactivate the high or low side cushion (true = high, false = low) |

<a id="fullcapacity-bool"></a>

### fullCapacity

Returns the full capacity of the specified wall (if it was regenerated now)

<i>

Calculates the capacity to deploy for a wall based on the amount of reserves owned by the treasury and the reserve factor.

</i>

```solidity
function fullCapacity(bool high_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | - Whether to return the full capacity for the high or low wall |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="status"></a>

### status

Returns the status variable of the Operator as a Status struct

```solidity
function status() external view returns (Status memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `Status` |             |

<a id="config"></a>

### config

Returns the config variable of the Operator as a Config struct

```solidity
function config() external view returns (Config memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `Config` |             |

## Events

### Swap

```solidity
event Swap(
        ERC20 indexed tokenIn_,
        ERC20 indexed tokenOut_,
        uint256 amountIn_,
        uint256 amountOut_
    );
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| tokenIn_   | `ERC20`   |             |
| tokenOut_  | `ERC20`   |             |
| amountIn_  | `uint256` |             |
| amountOut_ | `uint256` |             |

### CushionFactorChanged

```solidity
event CushionFactorChanged(uint32 cushionFactor_);
```

**Parameters**

| Name           | Type     | Description |
| -------------- | -------- | ----------- |
| cushionFactor_ | `uint32` |             |

### CushionParamsChanged

```solidity
event CushionParamsChanged(uint32 duration_, uint32 debtBuffer_, uint32 depositInterval_);
```

**Parameters**

| Name             | Type     | Description |
| ---------------- | -------- | ----------- |
| duration_        | `uint32` |             |
| debtBuffer_      | `uint32` |             |
| depositInterval_ | `uint32` |             |

### ReserveFactorChanged

```solidity
event ReserveFactorChanged(uint32 reserveFactor_);
```

**Parameters**

| Name           | Type     | Description |
| -------------- | -------- | ----------- |
| reserveFactor_ | `uint32` |             |

### RegenParamsChanged

```solidity
event RegenParamsChanged(uint32 wait_, uint32 threshold_, uint32 observe_);
```

**Parameters**

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| wait_      | `uint32` |             |
| threshold_ | `uint32` |             |
| observe_   | `uint32` |             |

## Errors

### Operator_InvalidParams

```solidity
error Operator_InvalidParams();
```

### Operator_InsufficientCapacity

```solidity
error Operator_InsufficientCapacity();
```

### Operator_AmountLessThanMinimum

```solidity
error Operator_AmountLessThanMinimum(uint256 amountOut, uint256 minAmountOut);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| amountOut    | `uint256` |             |
| minAmountOut | `uint256` |             |

### Operator_WallDown

```solidity
error Operator_WallDown();
```

### Operator_AlreadyInitialized

```solidity
error Operator_AlreadyInitialized();
```

### Operator_NotInitialized

```solidity
error Operator_NotInitialized();
```

### Operator_Inactive

```solidity
error Operator_Inactive();
```

## Structs

### Config

Configuration variables for the Operator

```solidity
struct Config {
        uint32 cushionFactor; // percent of capacity to be used for a single cushion deployment, assumes 2 decimals (i.e. 1000 = 10%)
        uint32 cushionDuration; // duration of a single cushion deployment in seconds
        uint32 cushionDebtBuffer; // Percentage over the initial debt to allow the market to accumulate at any one time. Percent with 3 decimals, e.g. 1_000 = 1 %. See IBondSDA for more info.
        uint32 cushionDepositInterval; // Target frequency of deposits. Determines max payout of the bond market. See IBondSDA for more info.
        uint32 reserveFactor; // percent of reserves in treasury to be used for a single wall, assumes 2 decimals (i.e. 1000 = 10%)
        uint32 regenWait; // minimum duration to wait to reinstate a wall in seconds
        uint32 regenThreshold; // number of price points on other side of moving average to reinstate a wall
        uint32 regenObserve; // number of price points to observe to determine regeneration
    }
```

**Properties**

| Name                   | Type     | Description |
| ---------------------- | -------- | ----------- |
| cushionFactor          | `uint32` |             |
| cushionDuration        | `uint32` |             |
| cushionDebtBuffer      | `uint32` |             |
| cushionDepositInterval | `uint32` |             |
| reserveFactor          | `uint32` |             |
| regenWait              | `uint32` |             |
| regenThreshold         | `uint32` |             |
| regenObserve           | `uint32` |             |

### Status

Combines regeneration status for low and high sides of the range

```solidity
struct Status {
        Regen low; // regeneration status for the low side of the range
        Regen high; // regeneration status for the high side of the range
    }
```

**Properties**

| Name | Type    | Description |
| ---- | ------- | ----------- |
| low  | `Regen` |             |
| high | `Regen` |             |

### Regen

Tracks status of when a specific side of the range can be regenerated by the Operator

```solidity
struct Regen {
        uint32 count; // current number of price points that count towards regeneration
        uint48 lastRegen; // timestamp of the last regeneration
        uint32 nextObservation; // index of the next observation in the observations array
        bool[] observations; // individual observations: true = price on other side of average, false = price on same side of average
    }
```

**Properties**

| Name            | Type     | Description |
| --------------- | -------- | ----------- |
| count           | `uint32` |             |
| lastRegen       | `uint48` |             |
| nextObservation | `uint32` |             |
| observations    | `bool[]` |             |
