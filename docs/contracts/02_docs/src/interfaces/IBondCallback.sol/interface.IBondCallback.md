# IBondCallback

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/interfaces/IBondCallback.sol)

## Functions

### callback

Send payout tokens to Teller while allowing market owners to perform custom logic on received or paid out tokens

Market ID on Teller must be whitelisted

*Must transfer the output amount of payout tokens back to the Teller*

*Should check that the quote tokens have been transferred to the contract in the _callback function*

```solidity
function callback(uint256 id_, uint256 inputAmount_, uint256 outputAmount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|             ID of the market|
|`inputAmount_`|`uint256`|    Amount of quote tokens bonded to the market|
|`outputAmount_`|`uint256`|   Amount of payout tokens to be paid out to the market|

### amountsForMarket

Returns the number of quote tokens received and payout tokens paid out for a market

```solidity
function amountsForMarket(uint256 id_) external view returns (uint256 in_, uint256 out_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|     ID of the market|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`in_`|`uint256`|    Amount of quote tokens bonded to the market|
|`out_`|`uint256`|   Amount of payout tokens paid out to the market|

### whitelist

Whitelist a teller and market ID combination

Must be callback owner

```solidity
function whitelist(address teller_, uint256 id_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`teller_`|`address`| Address of the Teller contract which serves the market|
|`id_`|`uint256`|     ID of the market|

### blacklist

Remove a market ID on a teller from the whitelist

*Shutdown function in case there's an issue with the teller*

```solidity
function blacklist(address teller_, uint256 id_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`teller_`|`address`|Address of the Teller contract which serves the market|
|`id_`|`uint256`|    ID of the market to remove from whitelist|
