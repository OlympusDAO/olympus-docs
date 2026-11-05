# Operator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/Operator.sol)

**Inherits:** [IOperator](/main/contracts/docs/src/policies/interfaces/IOperator.sol/interface.IOperator), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer), ReentrancyGuard

**Title:** Olympus Range Operator

Olympus Range Operator (Policy) Contract

<i>

The Olympus Range Operator performs market operations to enforce OlympusDAO's OHM price range
guidance policies against a specific reserve asset. The Operator is maintained by a keeper-triggered
function on the Olympus Heart contract, which orchestrates state updates in the correct order to ensure
market operations use up to date information. When the price of OHM against the reserve asset exceeds
the cushion spread, the Operator deploys bond markets to support the price. The Operator also offers
zero slippage swaps at prices dictated by the wall spread from the moving average. These market operations
are performed up to a specific capacity before the market must stabilize to regenerate the capacity.

</i>

## Constants

### ohm

OHM token contract

```solidity
ERC20 public immutable ohm;
```

### _ohmDecimals

```solidity
uint8 internal immutable _ohmDecimals;
```

### reserve

Reserve token contract

```solidity
ERC20 public immutable reserve;
```

### _reserveDecimals

```solidity
uint8 internal immutable _reserveDecimals;
```

### sReserve

<i>

_sReserveDecimals == _reserveDecimals

</i>

```solidity
ERC4626 public immutable sReserve;
```

### oldReserve

```solidity
ERC20 public immutable oldReserve;
```

### ONE_HUNDRED_PERCENT

```solidity
uint32 internal constant ONE_HUNDRED_PERCENT = 100e2;
```

### OPERATOR_POLICY_ROLE

```solidity
bytes32 internal constant OPERATOR_POLICY_ROLE = "operator_policy";
```

### OPERATOR_ADMIN_ROLE

```solidity
bytes32 internal constant OPERATOR_ADMIN_ROLE = "operator_admin";
```

## State Variables

### _status

```solidity
Status internal _status;
```

### _config

```solidity
Config internal _config;
```

### initialized

Whether the Operator has been initialized

```solidity
bool public initialized;
```

### active

Whether the Operator is active

```solidity
bool public active;
```

### PRICE

```solidity
PRICEv1 internal PRICE;
```

### RANGE

```solidity
RANGEv2 internal RANGE;
```

### TRSRY

```solidity
TRSRYv1 internal TRSRY;
```

### MINTR

```solidity
MINTRv1 internal MINTR;
```

### auctioneer

Auctioneer contract used for cushion bond market deployments

```solidity
IBondSDA public auctioneer;
```

### callback

Callback contract used for cushion bond market payouts

```solidity
IBondCallback public callback;
```

### _oracleDecimals

```solidity
uint8 internal _oracleDecimals;
```

## Functions

<a id="constructor-kernel-ibondsda-ibondcallback-address-4-uint32-8"></a>

### constructor

```solidity
constructor(
        Kernel kernel_,
        IBondSDA auctioneer_,
        IBondCallback callback_,
        address[4] memory tokens_, // [ohm, reserve, sReserve, oldReserve]
        uint32[8] memory configParams // [cushionFactor, cushionDuration, cushionDebtBuffer, cushionDepositInterval, reserveFactor, regenWait, regenThreshold, regenObserve] ensure the following holds: regenWait / PRICE.observationFrequency() >= regenObserve - regenThreshold
    ) Policy(kernel_);
```

**Parameters**

| Name         | Type            | Description |
| ------------ | --------------- | ----------- |
| kernel_      | `Kernel`        |             |
| auctioneer_  | `IBondSDA`      |             |
| callback_    | `IBondCallback` |             |
| tokens_      | `address[4]`    |             |
| configParams | `uint32[8]`     |             |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="_onlywhileactive"></a>

### _onlyWhileActive

<i>

Checks to see if the policy is active and ensures the range data isn't stale before performing market operations.
This check is different from the price feed staleness checks in the PRICE module.
The PRICE module checks new price feed data for staleness when storing a new observations,
whereas this check ensures that the range data is using a recent observation.

</i>

```solidity
function _onlyWhileActive() internal view;
```

<a id="operate"></a>

### operate

Executes market operations logic.

Access restricted

<i>

This function is triggered by a keeper on the Heart contract.

</i>

```solidity
function operate() external override onlyRole("heart");
```

<a id="swap-erc20-uint256-uint256"></a>

### swap

Swap at the current wall prices

```solidity
function swap(
        ERC20 tokenIn_,
        uint256 amountIn_,
        uint256 minAmountOut_
    ) external override nonReentrant returns (uint256 amountOut);
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

<a id="bondpurchase-uint256-uint256"></a>

### bondPurchase

Records a bond purchase and updates capacity correctly

Access restricted (BondCallback)

```solidity
function bondPurchase(uint256 id_, uint256 amountOut_) external onlyRole("operator_reporter");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | `uint256` | ID of the bond market |
| amountOut_ | `uint256` | Amount of capacity expended |

<a id="_activate-bool"></a>

### _activate

Activate a cushion by deploying a bond market

```solidity
function _activate(bool high_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | Whether the cushion is for the high or low side of the range (true = high, false = low) |

<a id="_deactivate-bool"></a>

### _deactivate

Deactivate a cushion by closing a bond market (if it is active)

```solidity
function _deactivate(bool high_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | Whether the cushion is for the high or low side of the range (true = high, false = low) |

<a id="_getpricedecimals-uint256"></a>

### _getPriceDecimals

Helper function to calculate number of price decimals based on the value returned from the price feed.

```solidity
function _getPriceDecimals(uint256 price_) internal view returns (int8);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| price_ | `uint256` | The price to calculate the number of decimals for |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `int8` | The number of decimals |

<a id="_updatecapacity-bool-uint256"></a>

### _updateCapacity

Update the capacity on the RANGE module.

```solidity
function _updateCapacity(bool high_, uint256 reduceBy_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | Whether to update the high side or low side capacity (true = high, false = low). |
| reduceBy_ | `uint256` | The amount to reduce the capacity by (OHM tokens for high side, Reserve tokens for low side). |

<a id="_updaterangeprices"></a>

### _updateRangePrices

Update the prices on the RANGE module

```solidity
function _updateRangePrices() internal;
```

<a id="_addobservation"></a>

### _addObservation

Add an observation to the regeneration status variables for each side

```solidity
function _addObservation() internal;
```

<a id="_updateregenonobservation-regen-bool-uint32"></a>

### _updateRegenOnObservation

```solidity
function _updateRegenOnObservation(
        Regen storage regen_,
        bool positive_,
        uint32 observe_
    ) internal;
```

**Parameters**

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| regen_    | `Regen`  |             |
| positive_ | `bool`   |             |
| observe_  | `uint32` |             |

<a id="_regenerate-bool"></a>

### _regenerate

Regenerate the wall for a side

```solidity
function _regenerate(bool high_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | Whether to regenerate the high side or low side (true = high, false = low) |

<a id="_checkcushion-bool"></a>

### _checkCushion

Takes down cushions (if active) when a wall is taken down or if available capacity drops below cushion capacity

```solidity
function _checkCushion(bool high_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | Whether to check the high side or low side cushion (true = high, false = low) |

<a id="setspreads-bool-uint256-uint256"></a>

### setSpreads

Set the wall and cushion spreads

Access restricted

<i>

Interface for externally setting these values on the RANGE module

</i>

```solidity
function setSpreads(
        bool high_,
        uint256 cushionSpread_,
        uint256 wallSpread_
    ) external onlyRole(OPERATOR_POLICY_ROLE);
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
function setThresholdFactor(uint256 thresholdFactor_) external onlyRole(OPERATOR_POLICY_ROLE);
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
function setCushionFactor(uint32 cushionFactor_) external onlyRole(OPERATOR_POLICY_ROLE);
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
    ) external onlyRole(OPERATOR_POLICY_ROLE);
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
function setReserveFactor(uint32 reserveFactor_) external onlyRole(OPERATOR_POLICY_ROLE);
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
function setRegenParams(
        uint32 wait_,
        uint32 threshold_,
        uint32 observe_
    ) external onlyRole(OPERATOR_POLICY_ROLE);
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
function setBondContracts(
        IBondSDA auctioneer_,
        IBondCallback callback_
    ) external onlyRole(OPERATOR_POLICY_ROLE);
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
function initialize() external onlyRole(OPERATOR_ADMIN_ROLE);
```

<a id="regenerate-bool"></a>

### regenerate

Regenerate the wall for a side

Access restricted

<i>

This function is an escape hatch to trigger out of cycle regenerations and may be useful when doing migrations of Treasury funds

</i>

```solidity
function regenerate(bool high_) external onlyRole(OPERATOR_POLICY_ROLE);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | Whether to regenerate the high side or low side (true = high, false = low) |

<a id="activate"></a>

### activate

Activate the Operator

Access restricted

<i>

Restart function for the Operator after a pause.

</i>

```solidity
function activate() external onlyRole(OPERATOR_POLICY_ROLE);
```

<a id="deactivate"></a>

### deactivate

Deactivate the Operator

Access restricted

<i>

Emergency pause function for the Operator. Prevents market operations from occurring.

</i>

```solidity
function deactivate() external onlyRole(OPERATOR_POLICY_ROLE);
```

<a id="deactivatecushion-bool"></a>

### deactivateCushion

Manually close a cushion bond market

Access restricted

<i>

Emergency shutdown function for Cushions

</i>

```solidity
function deactivateCushion(bool high_) external onlyRole(OPERATOR_POLICY_ROLE);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| high_ | `bool` | Whether to deactivate the high or low side cushion (true = high, false = low) |

<a id="_checkfactor-uint32"></a>

### _checkFactor

```solidity
function _checkFactor(uint32 factor_) internal pure;
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| factor_ | `uint32` |             |

<a id="getamountout-erc20-uint256"></a>

### getAmountOut

Returns the amount to be received from a swap

```solidity
function getAmountOut(ERC20 tokenIn_, uint256 amountIn_) public view returns (uint256);
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

<a id="fullcapacity-bool"></a>

### fullCapacity

Returns the full capacity of the specified wall (if it was regenerated now)

<i>

Calculates the capacity to deploy for a wall based on the amount of reserves owned by the treasury and the reserve factor.

</i>

```solidity
function fullCapacity(bool high_) public view override returns (uint256);
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
function status() external view override returns (Status memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `Status` |             |

<a id="config"></a>

### config

Returns the config variable of the Operator as a Config struct

```solidity
function config() external view override returns (Config memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `Config` |             |
