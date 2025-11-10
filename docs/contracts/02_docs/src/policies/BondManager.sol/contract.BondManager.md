# BondManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/BondManager.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

Olympus Bond Manager (Policy) Contract

## State Variables

### MINTR

```solidity
MINTRv1 public MINTR;
```

### TRSRY

```solidity
TRSRYv1 public TRSRY;
```

### bondCallback

```solidity
IBondCallback public bondCallback;
```

### fixedExpiryAuctioneer

```solidity
IBondAuctioneer public fixedExpiryAuctioneer;
```

### fixedExpiryTeller

```solidity
IBondFixedExpiryTeller public fixedExpiryTeller;
```

### gnosisEasyAuction

```solidity
IEasyAuction public gnosisEasyAuction;
```

### ohm

```solidity
OlympusERC20Token public ohm;
```

### fixedExpiryParameters

```solidity
FixedExpiryParameters public fixedExpiryParameters;
```

### batchAuctionParameters

```solidity
BatchAuctionParameters public batchAuctionParameters;
```

## Functions

### constructor

```solidity
constructor(
    Kernel kernel_,
    address fixedExpiryAuctioneer_,
    address fixedExpiryTeller_,
    address gnosisEasyAuction_,
    address ohm_
) Policy(kernel_);
```

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`dependencies`|`Keycode[]`|- Keycode array of module dependencies.|

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`requests`|`Permissions[]`|- Array of keycodes and function selectors for requested permissions.|

### createFixedExpiryBondMarket

Creates a market on the Bond Protocol contracts to auction off OHM bonds

```solidity
function createFixedExpiryBondMarket(uint256 capacity_, uint48 bondTerm_)
    external
    onlyRole("bondmanager_admin")
    returns (uint256 marketId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`capacity_`|`uint256`|       The budget of OHM to payout through OHM bonds|
|`bondTerm_`|`uint48`|       How long should the OHM be locked in the bond|

### createBatchAuction

Creates a bond token using Bond Protocol and creates a Gnosis Auction to sell it

```solidity
function createBatchAuction(uint96 capacity_, uint48 bondTerm_)
    external
    onlyRole("bondmanager_admin")
    returns (uint256 auctionId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`capacity_`|`uint96`|       The amount of OHM to use in the OHM bonds|
|`bondTerm_`|`uint48`|       How long should the OHM be locked in the bond|

### closeFixedExpiryBondMarket

Closes the specified bond protocol market to prevent future purchases

```solidity
function closeFixedExpiryBondMarket(uint256 marketId_) external onlyRole("bondmanager_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`marketId_`|`uint256`|       The ID of the Bond Protocol auction|

### settleBatchAuction

Settles the Gnosis Auction to find the clearing order and allow users to claim their bond tokens

```solidity
function settleBatchAuction(uint256 auctionId_) external onlyRole("bondmanager_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`auctionId_`|`uint256`|      The ID of the Gnosis auction|

### setFixedExpiryParameters

Sets the parameters that will likely be consistent across Bond Protocol market launches

```solidity
function setFixedExpiryParameters(
    uint256 initialPrice_,
    uint256 minPrice_,
    uint48 auctionTime_,
    uint32 debtBuffer_,
    uint32 depositInterval_,
    bool capacityInQuote_
) external onlyRole("bondmanager_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`initialPrice_`|`uint256`|       The initial ratio of OHM to OHM bonds that the bonds will sell for|
|`minPrice_`|`uint256`|           The minim ratio of OHM to OHM bonds that the bonds will sell for|
|`auctionTime_`|`uint48`|        How long should the auctioning of the bond tokens last (should be less than planned bond terms)|
|`debtBuffer_`|`uint32`|         Variable used to calculate maximum capacity (should generally be set to 100_000)|
|`depositInterval_`|`uint32`|    Desired frequency of purchases|
|`capacityInQuote_`|`bool`||

### setBatchAuctionParameters

Sets the parameters that will likely be consistent across Gnosis Auction launches

```solidity
function setBatchAuctionParameters(
    uint48 auctionCancelTime_,
    uint48 auctionTime_,
    uint96 minPctSold_,
    uint256 minBuyAmount_,
    uint256 minFundingThreshold_
) external onlyRole("bondmanager_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`auctionCancelTime_`|`uint48`|  How long should users have to cancel their bids (should be less than auctionTime_)|
|`auctionTime_`|`uint48`|        How long should the auctioning of the bond tokens last (should be less than planned bond terms)|
|`minPctSold_`|`uint96`|         What percent of capacity is the minimum acceptable level to sell (2 decimals, i.e. 50 = 50%)|
|`minBuyAmount_`|`uint256`|       Minimum purchase size (in OHM) from a user|
|`minFundingThreshold_`|`uint256`|Minimum funding threshold|

### setCallback

Sets the bond callback policy for use in minting upon Bond Protocol market purchases

```solidity
function setCallback(IBondCallback newCallback_) external onlyRole("bondmanager_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newCallback_`|`IBondCallback`|        The bond callback address to set|

### emergencyShutdownFixedExpiryMarket

Blacklists the specified market to prevent the bond callback from minting more OHM on purchases

```solidity
function emergencyShutdownFixedExpiryMarket(uint256 marketId_) external onlyRole("bondmanager_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`marketId_`|`uint256`|           The ID of the Bond Protocol auction to shutdown|

### emergencySetApproval

Increases a contract's allowance to spend the Bond Manager's OHM

*This shouldn't be needed but is a safegaurd in the event of accounting errors in the market creation functions*

```solidity
function emergencySetApproval(address contract_, uint256 amount_) external onlyRole("bondmanager_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`contract_`|`address`|           The contract to give spending permission to|
|`amount_`|`uint256`|             The amount to increase the OHM spending permission by|

### emergencyWithdraw

Sends OHM from the Bond Manager back to the treasury

```solidity
function emergencyWithdraw(uint256 amount_) external onlyRole("bondmanager_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|             The amount of OHM to send to the treasury|

## Events

### BondProtocolMarketLaunched

```solidity
event BondProtocolMarketLaunched(uint256 marketId, address bondToken, uint256 capacity, uint48 bondTerm);
```

### GnosisAuctionLaunched

```solidity
event GnosisAuctionLaunched(uint256 marketId, address bondToken, uint96 capacity, uint48 bondTerm);
```

## Errors

### BondManager_TermTooShort

```solidity
error BondManager_TermTooShort();
```

### BondManager_InitialPriceTooLow

```solidity
error BondManager_InitialPriceTooLow();
```

### BondManager_DebtBufferTooLow

```solidity
error BondManager_DebtBufferTooLow();
```

### BondManager_AuctionTimeTooShort

```solidity
error BondManager_AuctionTimeTooShort();
```

### BondManager_DepositIntervalTooShort

```solidity
error BondManager_DepositIntervalTooShort();
```

### BondManager_DepositIntervalTooLong

```solidity
error BondManager_DepositIntervalTooLong();
```

### BondManager_CancelTimeTooLong

```solidity
error BondManager_CancelTimeTooLong();
```

### BondManager_MinPctSoldTooLow

```solidity
error BondManager_MinPctSoldTooLow();
```

## Structs

### FixedExpiryParameters

```solidity
struct FixedExpiryParameters {
    uint256 initialPrice;
    uint256 minPrice;
    uint48 auctionTime;
    uint32 debtBuffer;
    uint32 depositInterval;
    bool capacityInQuote;
}
```

### BatchAuctionParameters

```solidity
struct BatchAuctionParameters {
    uint48 auctionCancelTime;
    uint48 auctionTime;
    uint96 minPctSold;
    uint256 minBuyAmount;
    uint256 minFundingThreshold;
}
```
