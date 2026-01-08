# IBondTeller

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/interfaces/IBondTeller.sol)

## Functions

### purchase

Exchange quote tokens for a bond in a specified market

```solidity
function purchase(address recipient_, address referrer_, uint256 id_, uint256 amount_, uint256 minAmountOut_)
    external
    returns (uint256, uint48);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient_`|`address`|      Address of recipient of bond. Allows deposits for other addresses|
|`referrer_`|`address`|       Address of referrer who will receive referral fee. For frontends to fill. Direct calls can use the zero address for no referrer fee.|
|`id_`|`uint256`|             ID of the Market the bond is being purchased from|
|`amount_`|`uint256`|         Amount to deposit in exchange for bond|
|`minAmountOut_`|`uint256`|   Minimum acceptable amount of bond to receive. Prevents frontrunning|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Amount of payout token to be received from the bond|
|`<none>`|`uint48`|Timestamp at which the bond token can be redeemed for the underlying token|

### getFee

Get current fee charged by the teller based on the combined protocol and referrer fee

```solidity
function getFee(address referrer_) external view returns (uint48);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`referrer_`|`address`|Address of the referrer|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint48`|Fee in basis points (3 decimal places)|

### setProtocolFee

Set protocol fee

Must be guardian

```solidity
function setProtocolFee(uint48 fee_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fee_`|`uint48`|    Protocol fee in basis points (3 decimal places)|

### setCreateFeeDiscount

Set the discount for creating bond tokens from the base protocol fee

The discount is subtracted from the protocol fee to determine the fee
when using create() to mint bond tokens without using an Auctioneer

```solidity
function setCreateFeeDiscount(uint48 discount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`discount_`|`uint48`|Create Fee Discount in basis points (3 decimal places)|

### setReferrerFee

Set your fee as a referrer to the protocol

Fee is set for sending address

```solidity
function setReferrerFee(uint48 fee_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fee_`|`uint48`|    Referrer fee in basis points (3 decimal places)|

### claimFees

Claim fees accrued by sender in the input tokens and sends them to the provided address

```solidity
function claimFees(ERC20[] memory tokens_, address to_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokens_`|`ERC20[]`| Array of tokens to claim fees for|
|`to_`|`address`|     Address to send fees to|
