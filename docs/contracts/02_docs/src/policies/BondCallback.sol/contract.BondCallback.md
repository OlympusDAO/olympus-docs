# BondCallback

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/policies/BondCallback.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), ReentrancyGuard, [IBondCallback](/main/contracts/docs/src/interfaces/IBondCallback.sol/interface.IBondCallback), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

**Title:**
Olympus Bond Callback

## State Variables

### approvedMarkets

```solidity
mapping(address => mapping(uint256 => bool)) public approvedMarkets
```

### _amountsPerMarket

```solidity
mapping(uint256 => uint256[2]) internal _amountsPerMarket
```

### priorBalances

```solidity
mapping(ERC20 => uint256) public priorBalances
```

### wrapped

```solidity
mapping(address => address) public wrapped
```

### TRSRY

```solidity
TRSRYv1 public TRSRY
```

### MINTR

```solidity
MINTRv1 public MINTR
```

### operator

```solidity
Operator public operator
```

### aggregator

```solidity
IBondAggregator public aggregator
```

### ohm

```solidity
ERC20 public ohm
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_, IBondAggregator aggregator_, ERC20 ohm_) Policy(kernel_);
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

### whitelist

Whitelist a teller and market ID combination

```solidity
function whitelist(address teller_, uint256 id_) external override onlyRole("callback_whitelist");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`teller_`|`address`| Address of the Teller contract which serves the market|
|`id_`|`uint256`|     ID of the market|

### blacklist

Remove a market ID on a teller from the whitelist

Shutdown function in case there's an issue with the teller

```solidity
function blacklist(address teller_, uint256 id_) external override onlyRole("callback_whitelist");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`teller_`|`address`|Address of the Teller contract which serves the market|
|`id_`|`uint256`|    ID of the market to remove from whitelist|

### callback

Send payout tokens to Teller while allowing market owners to perform custom logic on received or paid out tokens

Must transfer the output amount of payout tokens back to the Teller

```solidity
function callback(uint256 id_, uint256 inputAmount_, uint256 outputAmount_) external override nonReentrant;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|             ID of the market|
|`inputAmount_`|`uint256`|    Amount of quote tokens bonded to the market|
|`outputAmount_`|`uint256`|   Amount of payout tokens to be paid out to the market|

### batchToTreasury

Send tokens to the TRSRY in a batch

```solidity
function batchToTreasury(ERC20[] memory tokens_) external onlyRole("callback_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokens_`|`ERC20[]`|- Array of tokens to send|

### setOperator

Sets the operator contract for the callback to use to report bond purchases

Must be set before the callback is used

```solidity
function setOperator(Operator operator_) external onlyRole("callback_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator_`|`Operator`|- Address of the Operator contract|

### useWrappedVersion

Inform whether the TRSRY holds the payout token in a naked or a wrapped version

Must be called before whitelisting to ensure a proper TRSRY withdraw approval

```solidity
function useWrappedVersion(address payoutToken_, address wrappedToken_) external onlyRole("callback_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`payoutToken_`|`address`|Address of the payout token|
|`wrappedToken_`|`address`|Address of the token wrapper held by the TRSRY. If the TRSRY moves back to the naked token, input address(0) as the wrapped version.|

### amountsForMarket

Returns the number of quote tokens received and payout tokens paid out for a market

```solidity
function amountsForMarket(uint256 id_) external view override returns (uint256 in_, uint256 out_);
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

## Errors

### Callback_MarketNotSupported

```solidity
error Callback_MarketNotSupported(uint256 id);
```

### Callback_TokensNotReceived

```solidity
error Callback_TokensNotReceived();
```

### Callback_InvalidParams

```solidity
error Callback_InvalidParams();
```
