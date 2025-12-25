# ILimitOrders

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/policies/interfaces/deposits/ILimitOrders.sol)

**Title:**
ILimitOrders

Interface for limit order functionality for the Convertible Deposit Auctioneer

Users create orders specifying max price, MEV bots fill when price is favorable.
User deposits are held in sUSDS to generate yield, which accrues to a configurable recipient.

## Functions

### yieldRecipient

Recipient of accrued yield

```solidity
function yieldRecipient() external view returns (address);
```

### nextOrderId

Next order ID to be assigned

```solidity
function nextOrderId() external view returns (uint256);
```

### totalUsdsOwed

Total USDS owed to all order owners (principal tracking)

```solidity
function totalUsdsOwed() external view returns (uint256);
```

### setYieldRecipient

Update the yield recipient address

```solidity
function setYieldRecipient(address newRecipient_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newRecipient_`|`address`|  The new yield recipient|

### addDepositPeriod

Add a new deposit period and associated receipt token

This function will revert if:

- The contract is not enabled
- The caller is not the owner
- The deposit period is 0
- The receipt token address is 0
- The deposit period is already configured
- The deposit period is not enabled in the auctioneer

```solidity
function addDepositPeriod(uint8 depositPeriod_, address receiptToken_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`|  The deposit period to add|
|`receiptToken_`|`address`|  The receipt token address for the deposit period|

### removeDepositPeriod

Remove a deposit period and associated receipt token

This function will revert if:

- The contract is not enabled
- The caller is not the owner
- The deposit period is not configured
Note: Active orders for this deposit period will fail to fill until the deposit period
is re-added. Users can cancel their orders if needed.

```solidity
function removeDepositPeriod(uint8 depositPeriod_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`|  The deposit period to remove|

### createOrder

Create a new limit order

This function will revert if:

- The contract is not enabled
- The deposit budget, max price, or min fill size is invalid
- The receipt token is not configured in this contract
- The deposit period is not enabled in the auctioneer
- The caller cannot receive ERC721 tokens
- The min fill size is below the auctioneer minimum bid

```solidity
function createOrder(
    uint8 depositPeriod_,
    uint256 depositBudget_,
    uint256 incentiveBudget_,
    uint256 maxPrice_,
    uint256 minFillSize_
) external returns (uint256 orderId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`|  The deposit period for the CD position|
|`depositBudget_`|`uint256`|  USDS budget for bids|
|`incentiveBudget_`|`uint256`|USDS budget for filler incentives (paid proportionally)|
|`maxPrice_`|`uint256`|       Maximum execution price (USDS per OHM)|
|`minFillSize_`|`uint256`|    Minimum USDS per fill (except final fill)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`orderId`|`uint256`|         The ID of the created order|

### fillOrder

Fill a limit order

This function will revert if:

- The contract is not enabled
- The order is not active
- The order budget has been fully spent
- The fill amount is below the minimum fill size (unless this is the final fill)
- The deposit period is not enabled
- The receipt token is not configured
- The execution price is above the maximum price
- The previewBid function returns zero OHM output

```solidity
function fillOrder(uint256 orderId_, uint256 fillAmount_) external returns (uint256, uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`orderId_`|`uint256`|   The ID of the order to fill|
|`fillAmount_`|`uint256`|The amount of USDS to use for the bid|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256     The actual fill amount (may be capped to remaining deposit)|
|`<none>`|`uint256`|uint256     The incentive amount paid to the filler|
|`<none>`|`uint256`|uint256     The remaining deposit budget after the fill|

### cancelOrder

Cancel an active order and return remaining funds

This function will revert if:

- The caller is not the order owner
- The order is not active
- The order is fully spent
Note that if the contract is disabled, this function will still operate in order to allow users to withdraw their deposited funds.

```solidity
function cancelOrder(uint256 orderId_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`orderId_`|`uint256`|The ID of the order to cancel|

### getAccruedYield

Calculate current accrued yield in USDS terms

```solidity
function getAccruedYield() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The current accrued yield in USDS terms|

### getAccruedYieldShares

Calculate accrued yield in sUSDS shares

Uses previewWithdraw to safely account for rounding

```solidity
function getAccruedYieldShares() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The current accrued yield in sUSDS terms|

### sweepYield

Sweep all accrued yield to the yield recipient as sUSDS

```solidity
function sweepYield() external returns (uint256 shares);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of sUSDS swept to the yield recipient|

### getOrder

Get a limit order by ID

```solidity
function getOrder(uint256 orderId_) external view returns (LimitOrder memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`orderId_`|`uint256`|   The ID of the order|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LimitOrder`|LimitOrder  The limit order|

### getOrdersForUser

Get limit order IDs by user

```solidity
function getOrdersForUser(address user_) external view returns (uint256[] memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|      The address of the user|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256[]`|uint256[]   The IDs of the user's orders|

### previewFillOrder

Preview a fill order

```solidity
function previewFillOrder(uint256 orderId_, uint256 fillAmount_)
    external
    view
    returns (bool canFill, string memory reason, uint256 effectivePrice, uint256 incentive);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`orderId_`|`uint256`|       The ID of the order|
|`fillAmount_`|`uint256`|    The amount of USDS to use for the bid|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`canFill`|`bool`|        Whether the order can be filled|
|`reason`|`string`|         The reason the order cannot be filled|
|`effectivePrice`|`uint256`| The effective price of the fill|
|`incentive`|`uint256`|      The incentive amount for the fill|

### calculateIncentive

Calculate incentive and incentive rate for a given fill amount

```solidity
function calculateIncentive(uint256 orderId_, uint256 fillAmount_)
    external
    view
    returns (uint256 incentive, uint256 incentiveRate);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`orderId_`|`uint256`|       The ID of the order|
|`fillAmount_`|`uint256`|    The amount of USDS to use for the bid|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`incentive`|`uint256`|      The incentive amount for the fill|
|`incentiveRate`|`uint256`|  The incentive rate for the fill|

### canFillOrder

Check if an order can be filled at a given size

```solidity
function canFillOrder(uint256 orderId_, uint256 fillAmount_)
    external
    view
    returns (bool canFill, string memory reason, uint256 effectivePrice);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`orderId_`|`uint256`|       The ID of the order|
|`fillAmount_`|`uint256`|    The amount of USDS to use for the bid|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`canFill`|`bool`|        Whether the order can be filled|
|`reason`|`string`|         The reason the order cannot be filled|
|`effectivePrice`|`uint256`| The effective price of the fill|

### getRemaining

Get remaining deposit and incentive budgets for order

```solidity
function getRemaining(uint256 orderId_) external view returns (uint256 deposit, uint256 incentive);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`orderId_`|`uint256`|   The ID of the order|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`deposit`|`uint256`|    The remaining deposit budget|
|`incentive`|`uint256`|  The remaining incentive budget|

### getExecutionPrice

Get current execution price for a fill amount

```solidity
function getExecutionPrice(uint8 depositPeriod_, uint256 fillAmount_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period|
|`fillAmount_`|`uint256`|    The amount of USDS to use for the bid|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|effectivePrice  The effective price of the fill|

### getFillableOrders

Find fillable orders for a deposit period

WARNING: Gas-intensive. Intended for off-chain use only.

```solidity
function getFillableOrders(uint8 depositPeriod_) external view returns (uint256[] memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256[]`|uint256[]       The IDs of the fillable orders|

### getFillableOrders

Find fillable orders for a deposit period between given order IDs

For use if getFillableOrders(uint8 depositPeriod_) exceeds limit

WARNING: Gas-intensive. Intended for off-chain use only.

```solidity
function getFillableOrders(uint8 depositPeriod_, uint256 index0, uint256 index1)
    external
    view
    returns (uint256[] memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period|
|`index0`|`uint256`|         The starting order ID|
|`index1`|`uint256`|         The ending order ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256[]`|uint256[]       The IDs of the fillable orders|

## Events

### OrderCreated

Emitted when a new order is created

```solidity
event OrderCreated(
    uint256 indexed orderId,
    address indexed owner,
    uint8 depositPeriod,
    uint256 depositBudget,
    uint256 incentiveBudget,
    uint256 maxPrice,
    uint256 minFillSize
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`orderId`|`uint256`|        The ID of the created order|
|`owner`|`address`|          The owner of the order|
|`depositPeriod`|`uint8`|  The deposit period for the CD position|
|`depositBudget`|`uint256`|  The USDS budget for bids|
|`incentiveBudget`|`uint256`|The USDS budget for filler incentives (paid proportionally)|
|`maxPrice`|`uint256`|       The maximum execution price (USDS per OHM)|
|`minFillSize`|`uint256`|    The minimum USDS per fill (except final fill)|

### OrderFilled

Emitted when an order is filled

```solidity
event OrderFilled(
    uint256 indexed orderId,
    address indexed filler,
    uint256 fillAmount,
    uint256 incentivePaid,
    uint256 ohmOut,
    uint256 positionId
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`orderId`|`uint256`|        The ID of the filled order|
|`filler`|`address`|         The address of the filler|
|`fillAmount`|`uint256`|     The amount of USDS used for the bid|
|`incentivePaid`|`uint256`|  The amount of USDS paid as incentive|
|`ohmOut`|`uint256`|         The amount of OHM output|
|`positionId`|`uint256`|     The ID of the filled position|

### OrderCancelled

Emitted when an order is cancelled

```solidity
event OrderCancelled(uint256 indexed orderId, uint256 usdsReturned);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`orderId`|`uint256`|        The ID of the cancelled order|
|`usdsReturned`|`uint256`|   The amount of USDS returned to the order owner|

### YieldSwept

Emitted when yield is swept

```solidity
event YieldSwept(address indexed recipient, uint256 sUsdsAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|      The address of the recipient|
|`sUsdsAmount`|`uint256`|    The amount of sUSDS swept|

### YieldRecipientUpdated

Emitted when the yield recipient is updated

```solidity
event YieldRecipientUpdated(address indexed newRecipient);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newRecipient`|`address`|   The new address of the recipient|

### DepositPeriodAdded

Emitted when a deposit period and receipt token are added

```solidity
event DepositPeriodAdded(uint8 indexed depositPeriod, address indexed receiptToken);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod`|`uint8`|  The deposit period that was added|
|`receiptToken`|`address`|   The receipt token address for the deposit period|

### DepositPeriodRemoved

Emitted when a deposit period and receipt token are removed

```solidity
event DepositPeriodRemoved(uint8 indexed depositPeriod);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod`|`uint8`|  The deposit period that was removed|

## Errors

### InvalidParam

Used when a function parameter is invalid

```solidity
error InvalidParam(string param);
```

### OrderNotActive

Used when an order is not active

```solidity
error OrderNotActive();
```

### OrderFullySpent

Used when an order is fully spent

```solidity
error OrderFullySpent();
```

### FillBelowMinimum

Used when a fill amount is below the minimum fill size

```solidity
error FillBelowMinimum();
```

### PriceAboveMax

Used when a fill amount is above the maximum price

```solidity
error PriceAboveMax();
```

### NotOrderOwner

Used when the caller is not the order owner

```solidity
error NotOrderOwner();
```

### DepositPeriodNotEnabled

Used when a deposit period is not enabled

```solidity
error DepositPeriodNotEnabled();
```

### ReceiptTokenNotConfigured

Used when a receipt token is not configured

```solidity
error ReceiptTokenNotConfigured();
```

### ArrayLengthMismatch

Used when an array length mismatch is detected

```solidity
error ArrayLengthMismatch();
```

### ZeroOhmOut

Used when the previewBid function returns zero OHM output

```solidity
error ZeroOhmOut();
```

## Structs

### LimitOrder

Limit order struct

This struct is used to store limit order information

```solidity
struct LimitOrder {
    address owner;
    uint8 depositPeriod;
    bool active;
    uint256 depositBudget;
    uint256 incentiveBudget;
    uint256 depositSpent;
    uint256 incentiveSpent;
    uint256 maxPrice;
    uint256 minFillSize;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|          The owner of the order|
|`depositPeriod`|`uint8`|  The deposit period for the CD position|
|`active`|`bool`|         Whether the order is active|
|`depositBudget`|`uint256`|  The USDS budget for bids|
|`incentiveBudget`|`uint256`|The USDS budget for filler incentives (paid proportionally)|
|`depositSpent`|`uint256`|   The amount of USDS spent on the deposit|
|`incentiveSpent`|`uint256`| The amount of USDS spent on the incentive|
|`maxPrice`|`uint256`|       The maximum execution price (USDS per OHM)|
|`minFillSize`|`uint256`|    The minimum USDS per fill (except final fill)|
