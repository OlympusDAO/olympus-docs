# IBondAuctioneer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/interfaces/IBondAuctioneer.sol)

## Functions

### createMarket

Creates a new bond market

*See specific auctioneer implementations for details on encoding the parameters.*

```solidity
function createMarket(bytes memory params_) external returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params_`|`bytes`|         Configuration data needed for market creation, encoded in a bytes array|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|id              ID of new bond market|

### closeMarket

Disable existing bond market

Must be market owner

```solidity
function closeMarket(uint256 id_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|             ID of market to close|

### purchaseBond

Exchange quote tokens for a bond in a specified market

Must be teller

```solidity
function purchaseBond(uint256 id_, uint256 amount_, uint256 minAmountOut_) external returns (uint256 payout);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|             ID of the Market the bond is being purchased from|
|`amount_`|`uint256`|         Amount to deposit in exchange for bond (after fee has been deducted)|
|`minAmountOut_`|`uint256`|   Minimum acceptable amount of bond to receive. Prevents frontrunning|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`payout`|`uint256`|         Amount of payout token to be received from the bond|

### setIntervals

Set market intervals to different values than the defaults

Must be market owner

*Changing the intervals could cause markets to behave in unexpected way
tuneInterval should be greater than tuneAdjustmentDelay*

```solidity
function setIntervals(uint256 id_, uint32[3] calldata intervals_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|                     Market ID|
|`intervals_`|`uint32[3]`|              Array of intervals (3) 1. Tune interval - Frequency of tuning 2. Tune adjustment delay - Time to implement downward tuning adjustments 3. Debt decay interval - Interval over which debt should decay completely|

### pushOwnership

Designate a new owner of a market

Must be market owner

*Doesn't change permissions until newOwner calls pullOwnership*

```solidity
function pushOwnership(uint256 id_, address newOwner_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|                  Market ID|
|`newOwner_`|`address`|            New address to give ownership to|

### pullOwnership

Accept ownership of a market

Must be market newOwner

*The existing owner must call pushOwnership prior to the newOwner calling this function*

```solidity
function pullOwnership(uint256 id_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|                  Market ID|

### setDefaults

Set the auctioneer defaults

Must be policy

*The defaults set here are important to avoid edge cases in market behavior, e.g. a very short market reacts doesn't tune well*

*Only applies to new markets that are created after the change*

```solidity
function setDefaults(uint32[6] memory defaults_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`defaults_`|`uint32[6]`|   Array of default values 1. Tune interval - amount of time between tuning adjustments 2. Tune adjustment delay - amount of time to apply downward tuning adjustments 3. Minimum debt decay interval - minimum amount of time to let debt decay to zero 4. Minimum deposit interval - minimum amount of time to wait between deposits 5. Minimum market duration - minimum amount of time a market can be created for 6. Minimum debt buffer - the minimum amount of debt over the initial debt to trigger a market shutdown|

### setAllowNewMarkets

Change the status of the auctioneer to allow creation of new markets

*Setting to false and allowing active markets to end will sunset the auctioneer*

```solidity
function setAllowNewMarkets(bool status_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`status_`|`bool`|     Allow market creation (true) : Disallow market creation (false)|

### setCallbackAuthStatus

Change whether a market creator is allowed to use a callback address in their markets or not

Must be guardian

*Callback is believed to be safe, but a whitelist is implemented to prevent abuse*

```solidity
function setCallbackAuthStatus(address creator_, bool status_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`creator_`|`address`|    Address of market creator|
|`status_`|`bool`|     Allow callback (true) : Disallow callback (false)|

### callbackAuthorized

Indicates whether the provided address is allowed to use a callback address in its markets

```solidity
function callbackAuthorized(address creator_) external view returns (bool isAuthorized);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`creator_`|`address`|       Address of market creator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`isAuthorized`|`bool`|   True if the creator can use a callback|

### getMarketInfoForPurchase

Provides information for the Teller to execute purchases on a Market

```solidity
function getMarketInfoForPurchase(uint256 id_)
    external
    view
    returns (
        address owner,
        address callbackAddr,
        ERC20 payoutToken,
        ERC20 quoteToken,
        uint48 vesting,
        uint256 maxPayout
    );
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|             Market ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|          Address of the market owner (tokens transferred from this address if no callback)|
|`callbackAddr`|`address`|   Address of the callback contract to get tokens for payouts|
|`payoutToken`|`ERC20`|    Payout Token (token paid out) for the Market|
|`quoteToken`|`ERC20`|     Quote Token (token received) for the Market|
|`vesting`|`uint48`|        Timestamp or duration for vesting, implementation-dependent|
|`maxPayout`|`uint256`|      Maximum amount of payout tokens you can purchase in one transaction|

### marketPrice

Calculate current market price of payout token in quote tokens

```solidity
function marketPrice(uint256 id_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|         ID of market|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Price for market in configured decimals|

### marketScale

Scale value to use when converting between quote token and payout token amounts with marketPrice()

```solidity
function marketScale(uint256 id_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|         ID of market|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Scaling factor for market in configured decimals|

### payoutFor

Payout due for amount of quote tokens

*Accounts for debt and control variable decay so it is up to date*

```solidity
function payoutFor(uint256 amount_, uint256 id_, address referrer_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|     Amount of quote tokens to spend|
|`id_`|`uint256`|         ID of market|
|`referrer_`|`address`|   Address of referrer, used to get fees to calculate accurate payout amount. Inputting the zero address will take into account just the protocol fee.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|amount of payout tokens to be paid|

### maxAmountAccepted

Returns maximum amount of quote token accepted by the market

```solidity
function maxAmountAccepted(uint256 id_, address referrer_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|         ID of market|
|`referrer_`|`address`|   Address of referrer, used to get fees to calculate accurate payout amount. Inputting the zero address will take into account just the protocol fee.|

### isInstantSwap

Does market send payout immediately

```solidity
function isInstantSwap(uint256 id_) external view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|         Market ID to search for|

### isLive

Is a given market accepting deposits

```solidity
function isLive(uint256 id_) external view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|         ID of market|

### ownerOf

Returns the address of the market owner

```solidity
function ownerOf(uint256 id_) external view returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|         ID of market|

### getTeller

Returns the Teller that services the Auctioneer

```solidity
function getTeller() external view returns (IBondTeller);
```

### getAggregator

Returns the Aggregator that services the Auctioneer

```solidity
function getAggregator() external view returns (IBondAggregator);
```

### currentCapacity

Returns current capacity of a market

```solidity
function currentCapacity(uint256 id_) external view returns (uint256);
```
