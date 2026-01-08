# CDAuctioneerLimitOrders

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/policies/deposits/LimitOrders.sol)

**Inherits:**
[ILimitOrders](/main/contracts/docs/src/policies/interfaces/deposits/ILimitOrders.sol/interface.ILimitOrders), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned), IERC721Receiver, ReentrancyGuardTransient, Ownable, [PeripheryEnabler](/main/contracts/docs/src/periphery/PeripheryEnabler.sol/abstract.PeripheryEnabler)

**Title:**
CDAuctioneer Limit Orders

**Author:**
Zeus

forge-lint: disable-start(mixed-case-function)

Enables limit order functionality for the Convertible Deposit Auctioneer

Users create orders specifying max price, MEV bots fill when price is favorable.
User deposits are held in sUSDS to generate yield, which accrues to a configurable recipient.

## State Variables

### OHM_SCALE

```solidity
uint256 internal constant OHM_SCALE = 1e9
```

### DEPOSIT_MANAGER

The Deposit Manager contract

This variable is immutable

```solidity
address public immutable DEPOSIT_MANAGER
```

### CD_AUCTIONEER

The Convertible Deposit Auctioneer contract

This variable is immutable

```solidity
IConvertibleDepositAuctioneer public immutable CD_AUCTIONEER
```

### USDS

The USDS contract

This variable is immutable

```solidity
ERC20 public immutable USDS
```

### SUSDS

The sUSDS contract

This variable is immutable

```solidity
ERC4626 public immutable SUSDS
```

### POSITION_NFT

The Position NFT contract

This variable is immutable

```solidity
ERC721 public immutable POSITION_NFT
```

### yieldRecipient

Recipient of accrued yield

```solidity
address public yieldRecipient
```

### receiptTokens

Receipt token address for each deposit period

```solidity
mapping(uint8 depositPeriod => ERC20 receiptToken) public receiptTokens
```

### _orders

Limit orders by ID

```solidity
mapping(uint256 orderId => LimitOrder order) internal _orders
```

### _ordersForUser

Limit order IDs by user

```solidity
mapping(address => uint256[]) internal _ordersForUser
```

### nextOrderId

Next order ID to be assigned

```solidity
uint256 public nextOrderId
```

### totalUsdsOwed

Total USDS owed to all order owners (principal tracking)

```solidity
uint256 public totalUsdsOwed
```

## Functions

### constructor

```solidity
constructor(
    address owner_,
    address depositManager_,
    address cdAuctioneer_,
    address usds_,
    address sUsds_,
    address positionNft_,
    address yieldRecipient_,
    uint8[] memory depositPeriods_,
    address[] memory receiptTokens_
) Ownable(owner_);
```

### VERSION

Returns the version of the contract

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|- Major version upgrade indicates breaking change to the interface.|
|`minor`|`uint8`|- Minor version change retains backward-compatible interface.|

### setYieldRecipient

Update the yield recipient address

```solidity
function setYieldRecipient(address newRecipient_) external onlyOwner onlyEnabled;
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
function addDepositPeriod(uint8 depositPeriod_, address receiptToken_) external onlyOwner onlyEnabled;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`|  The deposit period to add|
|`receiptToken_`|`address`|  The receipt token address for the deposit period|

### _addDepositPeriod

Internal function to add a deposit period and associated receipt token

This function will revert if:

- The deposit period is 0
- The receipt token address is 0
- The deposit period is already configured
- The deposit period is not enabled in the auctioneer

```solidity
function _addDepositPeriod(uint8 depositPeriod_, address receiptToken_) internal;
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
function removeDepositPeriod(uint8 depositPeriod_) external onlyOwner onlyEnabled;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`|  The deposit period to remove|

### _deposit

Internal function to deposit USDS into sUSDS and adjust the deposit and incentive budgets

```solidity
function _deposit(uint256 depositBudget_, uint256 incentiveBudget_)
    internal
    returns (uint256 actualDepositBudget, uint256 actualIncentiveBudget);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositBudget_`|`uint256`|         USDS budget for bids|
|`incentiveBudget_`|`uint256`|       USDS budget for filler incentives (paid proportionally)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`actualDepositBudget`|`uint256`|    The actual deposit budget (may be less than the input)|
|`actualIncentiveBudget`|`uint256`|  The actual incentive budget (may be less than the input)|

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
) external nonReentrant onlyEnabled returns (uint256 orderId);
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

### _calculateFillAndIncentive

Calculate capped fill amount and incentive for an order

```solidity
function _calculateFillAndIncentive(LimitOrder storage order_, uint256 fillAmount_)
    internal
    view
    returns (uint256 cappedFill, uint256 incentive, uint256 remainingDeposit);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`order_`|`LimitOrder`|          The limit order|
|`fillAmount_`|`uint256`|     The requested fill amount|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`cappedFill`|`uint256`|      The fill amount capped to remaining deposit|
|`incentive`|`uint256`|       The incentive amount (with final fill handling)|
|`remainingDeposit`|`uint256`|The remaining deposit budget|

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
function fillOrder(uint256 orderId_, uint256 fillAmount_)
    external
    nonReentrant
    onlyEnabled
    returns (uint256, uint256, uint256);
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
function cancelOrder(uint256 orderId_) external nonReentrant;
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
function getAccruedYieldShares() public view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The current accrued yield in sUSDS terms|

### sweepYield

Sweep all accrued yield to the yield recipient as sUSDS

```solidity
function sweepYield() external nonReentrant onlyEnabled returns (uint256 shares);
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
    public
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
    public
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

### _getFillableOrders

Find fillable orders for a deposit period between given order IDs

For use if getFillableOrders(uint8 depositPeriod_) exceeds limit

WARNING: Gas-intensive. Intended for off-chain use only.

```solidity
function _getFillableOrders(uint8 depositPeriod_, uint256 index0, uint256 index1)
    internal
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

### _isOrderFillable

Check if an order is fillable

```solidity
function _isOrderFillable(uint256 orderId_, uint8 depositPeriod_) internal view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`orderId_`|`uint256`|       The ID of the order|
|`depositPeriod_`|`uint8`| The deposit period|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool            Whether the order is fillable|

### _requireEnabledDepositPeriod

```solidity
function _requireEnabledDepositPeriod(uint8 depositPeriod_) private view;
```

### _onlyOwner

Implementation-specific validation of ownership

Calls Ownable's _checkOwner()

```solidity
function _onlyOwner() internal view override;
```

### _enable

Implementation-specific enable function

No-op

```solidity
function _enable(bytes calldata enableData_) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`enableData_`|`bytes`|Custom data that can be used by the implementation. The format of this data is left to the discretion of the implementation.|

### _disable

Implementation-specific disable function

No-op

```solidity
function _disable(bytes calldata disableData_) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`disableData_`|`bytes`|Custom data that can be used by the implementation. The format of this data is left to the discretion of the implementation.|

### onERC721Received

ERC721 receiver function

```solidity
function onERC721Received(address, address, uint256, bytes calldata) external pure override returns (bytes4);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4  The selector of the function|

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```
