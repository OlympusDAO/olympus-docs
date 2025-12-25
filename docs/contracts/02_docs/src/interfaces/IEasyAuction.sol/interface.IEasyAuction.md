# IEasyAuction

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/interfaces/IEasyAuction.sol)

## Functions

### initiateAuction

Initiates an auction through Gnosis Auctions

```solidity
function initiateAuction(
    ERC20 tokenToSell,
    ERC20 biddingToken,
    uint256 lastCancellation,
    uint256 auctionEnd,
    uint96 auctionAmount,
    uint96 minimumTotalPurchased,
    uint256 minimumPurchaseAmount,
    uint256 minFundingThreshold,
    bool isAtomicClosureAllowed,
    address accessManager,
    bytes calldata accessManagerData
) external returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenToSell`|`ERC20`|             The token being sold|
|`biddingToken`|`ERC20`|            The token used to bid on the sale token and set its price|
|`lastCancellation`|`uint256`|        The last timestamp a user can cancel their bid at|
|`auctionEnd`|`uint256`|              The timestamp the auction ends at|
|`auctionAmount`|`uint96`|           The number of sale tokens to sell|
|`minimumTotalPurchased`|`uint96`|   The minimum number of sale tokens that need to be sold for the auction to finalize|
|`minimumPurchaseAmount`|`uint256`|   The minimum purchase size in bidding tokens|
|`minFundingThreshold`|`uint256`|     The minimal funding thresholding for finalizing settlement|
|`isAtomicClosureAllowed`|`bool`|  Can users call settleAuctionAtomically when end date has been reached|
|`accessManager`|`address`|           The contract to manage an allowlist|
|`accessManagerData`|`bytes`|       The data for managing an allowlist|

### settleAuction

Settles the auction and determines the clearing orders

```solidity
function settleAuction(uint256 auctionId) external returns (bytes32);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`auctionId`|`uint256`|               The auction to settle|
