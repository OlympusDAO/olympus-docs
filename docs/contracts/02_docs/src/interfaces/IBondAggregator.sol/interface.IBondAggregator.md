# IBondAggregator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IBondAggregator.sol)

## Functions

<a id="registerauctioneer-ibondauctioneer"></a>

### registerAuctioneer

Register a auctioneer with the aggregator

Only Guardian

<i>

A auctioneer must be registered with an aggregator to create markets

</i>

```solidity
function registerAuctioneer(IBondAuctioneer auctioneer_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| auctioneer_ | `IBondAuctioneer` | Address of the Auctioneer to register |

<a id="registermarket-erc20-erc20"></a>

### registerMarket

Register a new market with the aggregator

Only registered depositories

```solidity
function registerMarket(
        ERC20 payoutToken_,
        ERC20 quoteToken_
    ) external returns (uint256 marketId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| payoutToken_ | `ERC20` | Token to be paid out by the market |
| quoteToken_ | `ERC20` | Token to be accepted by the market |

**Returns**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| marketId | `uint256` |             |

<a id="getauctioneer-uint256"></a>

### getAuctioneer

Get the auctioneer for the provided market ID

```solidity
function getAuctioneer(uint256 id_) external view returns (IBondAuctioneer);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | `uint256` | ID of Market |

**Returns**

| Name         | Type              | Description |
| ------------ | ----------------- | ----------- |
| &lt;none&gt; | `IBondAuctioneer` |             |

<a id="marketprice-uint256"></a>

### marketPrice

Calculate current market price of payout token in quote tokens

<i>

Accounts for debt and control variable decay since last deposit (vs _marketPrice())

</i>

```solidity
function marketPrice(uint256 id_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | `uint256` | ID of market |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | Price for market (see the specific auctioneer for units) |

<a id="marketscale-uint256"></a>

### marketScale

Scale value to use when converting between quote token and payout token amounts with marketPrice()

```solidity
function marketScale(uint256 id_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | `uint256` | ID of market |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | Scaling factor for market in configured decimals |

<a id="payoutfor-uint256-uint256-address"></a>

### payoutFor

Payout due for amount of quote tokens

<i>

Accounts for debt and control variable decay so it is up to date

</i>

```solidity
function payoutFor(
        uint256 amount_,
        uint256 id_,
        address referrer_
    ) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | Amount of quote tokens to spend |
| id_ | `uint256` | ID of market |
| referrer_ | `address` | Address of referrer, used to get fees to calculate accurate payout amount.<br/>Inputting the zero address will take into account just the protocol fee. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | amount of payout tokens to be paid |

<a id="maxamountaccepted-uint256-address"></a>

### maxAmountAccepted

Returns maximum amount of quote token accepted by the market

```solidity
function maxAmountAccepted(uint256 id_, address referrer_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | `uint256` | ID of market |
| referrer_ | `address` | Address of referrer, used to get fees to calculate accurate payout amount.<br/>Inputting the zero address will take into account just the protocol fee. |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="isinstantswap-uint256"></a>

### isInstantSwap

Does market send payout immediately

```solidity
function isInstantSwap(uint256 id_) external view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | `uint256` | Market ID to search for |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="islive-uint256"></a>

### isLive

Is a given market accepting deposits

```solidity
function isLive(uint256 id_) external view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | `uint256` | ID of market |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="livemarketsbetween-uint256-uint256"></a>

### liveMarketsBetween

Returns array of active market IDs within a range

<i>

Should be used if length exceeds max to query entire array

</i>

```solidity
function liveMarketsBetween(
        uint256 firstIndex_,
        uint256 lastIndex_
    ) external view returns (uint256[] memory);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| firstIndex_ | `uint256` |             |
| lastIndex_  | `uint256` |             |

**Returns**

| Name         | Type        | Description |
| ------------ | ----------- | ----------- |
| &lt;none&gt; | `uint256[]` |             |

<a id="livemarketsfor-address-bool"></a>

### liveMarketsFor

Returns an array of all active market IDs for a given quote token

```solidity
function liveMarketsFor(
        address token_,
        bool isPayout_
    ) external view returns (uint256[] memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token_ | `address` | Address of token to query by |
| isPayout_ | `bool` | If true, search by payout token, else search for quote token |

**Returns**

| Name         | Type        | Description |
| ------------ | ----------- | ----------- |
| &lt;none&gt; | `uint256[]` |             |

<a id="livemarketsby-address-uint256-uint256"></a>

### liveMarketsBy

Returns an array of all active market IDs for a given owner

```solidity
function liveMarketsBy(
        address owner_,
        uint256 firstIndex_,
        uint256 lastIndex_
    ) external view returns (uint256[] memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner_ | `address` | Address of owner to query by |
| firstIndex_ | `uint256` | Market ID to start at |
| lastIndex_ | `uint256` | Market ID to end at (non-inclusive) |

**Returns**

| Name         | Type        | Description |
| ------------ | ----------- | ----------- |
| &lt;none&gt; | `uint256[]` |             |

<a id="marketsfor-address-address"></a>

### marketsFor

Returns an array of all active market IDs for a given payout and quote token

```solidity
function marketsFor(address payout_, address quote_) external view returns (uint256[] memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| payout_ | `address` | Address of payout token |
| quote_ | `address` | Address of quote token |

**Returns**

| Name         | Type        | Description |
| ------------ | ----------- | ----------- |
| &lt;none&gt; | `uint256[]` |             |

<a id="findmarketfor-address-address-uint256-uint256-uint256"></a>

### findMarketFor

Returns the market ID with the highest current payoutToken payout for depositing quoteToken

```solidity
function findMarketFor(
        address payout_,
        address quote_,
        uint256 amountIn_,
        uint256 minAmountOut_,
        uint256 maxExpiry_
    ) external view returns (uint256 id);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| payout_ | `address` | Address of payout token |
| quote_ | `address` | Address of quote token |
| amountIn_ | `uint256` | Amount of quote tokens to deposit |
| minAmountOut_ | `uint256` | Minimum amount of payout tokens to receive as payout |
| maxExpiry_ | `uint256` | Latest acceptable vesting timestamp for bond<br/>Inputting the zero address will take into account just the protocol fee. |

**Returns**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| id   | `uint256` |             |

<a id="getteller-uint256"></a>

### getTeller

Returns the Teller that services the market ID

```solidity
function getTeller(uint256 id_) external view returns (IBondTeller);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| id_  | `uint256` |             |

**Returns**

| Name         | Type          | Description |
| ------------ | ------------- | ----------- |
| &lt;none&gt; | `IBondTeller` |             |

<a id="currentcapacity-uint256"></a>

### currentCapacity

Returns current capacity of a market

```solidity
function currentCapacity(uint256 id_) external view returns (uint256);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| id_  | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |
