# IBondCallback

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IBondCallback.sol)

## Functions

<a id="callback-uint256-uint256-uint256"></a>

### callback

Send payout tokens to Teller while allowing market owners to perform custom logic on received or paid out tokens

Market ID on Teller must be whitelisted

<i>

Must transfer the output amount of payout tokens back to the Teller

</i>

<i>

Should check that the quote tokens have been transferred to the contract in the _callback function

</i>

```solidity
function callback(uint256 id_, uint256 inputAmount_, uint256 outputAmount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | `uint256` | ID of the market |
| inputAmount_ | `uint256` | Amount of quote tokens bonded to the market |
| outputAmount_ | `uint256` | Amount of payout tokens to be paid out to the market |

<a id="amountsformarket-uint256"></a>

### amountsForMarket

Returns the number of quote tokens received and payout tokens paid out for a market

```solidity
function amountsForMarket(uint256 id_) external view returns (uint256 in_, uint256 out_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | `uint256` | ID of the market |

**Returns**

| Name | Type      | Description                                    |
| ---- | --------- | ---------------------------------------------- |
| in_  | `uint256` | Amount of quote tokens bonded to the market    |
| out_ | `uint256` | Amount of payout tokens paid out to the market |

<a id="whitelist-address-uint256"></a>

### whitelist

Whitelist a teller and market ID combination

Must be callback owner

```solidity
function whitelist(address teller_, uint256 id_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| teller_ | `address` | Address of the Teller contract which serves the market |
| id_ | `uint256` | ID of the market |

<a id="blacklist-address-uint256"></a>

### blacklist

Remove a market ID on a teller from the whitelist

<i>

Shutdown function in case there's an issue with the teller

</i>

```solidity
function blacklist(address teller_, uint256 id_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| teller_ | `address` | Address of the Teller contract which serves the market |
| id_ | `uint256` | ID of the market to remove from whitelist |
