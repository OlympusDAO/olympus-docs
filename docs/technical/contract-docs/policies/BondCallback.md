# BondCallback



> Olympus Bond Callback





## Methods

### MINTR

```solidity
function MINTR() external view returns (contract MINTRv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract MINTRv1 | undefined |

### ROLES

```solidity
function ROLES() external view returns (contract ROLESv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ROLESv1 | undefined |

### TRSRY

```solidity
function TRSRY() external view returns (contract TRSRYv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract TRSRYv1 | undefined |

### aggregator

```solidity
function aggregator() external view returns (contract IBondAggregator)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IBondAggregator | undefined |

### amountsForMarket

```solidity
function amountsForMarket(uint256 id_) external view returns (uint256 in_, uint256 out_)
```

Returns the number of quote tokens received and payout tokens paid out for a market



#### Parameters

| Name | Type | Description |
|---|---|---|
| id_ | uint256 | ID of the market |

#### Returns

| Name | Type | Description |
|---|---|---|
| in_ | uint256 |     Amount of quote tokens bonded to the market |
| out_ | uint256 |    Amount of payout tokens paid out to the market |

### approvedMarkets

```solidity
function approvedMarkets(address, uint256) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |
| _1 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### batchToTreasury

```solidity
function batchToTreasury(contract ERC20[] tokens_) external nonpayable
```

Send tokens to the TRSRY in a batch



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokens_ | contract ERC20[] | - Array of tokens to send |

### blacklist

```solidity
function blacklist(address teller_, uint256 id_) external nonpayable
```

Remove a market ID on a teller from the whitelist

*Shutdown function in case there&#39;s an issue with the teller*

#### Parameters

| Name | Type | Description |
|---|---|---|
| teller_ | address | Address of the Teller contract which serves the market |
| id_ | uint256 | ID of the market to remove from whitelist |

### callback

```solidity
function callback(uint256 id_, uint256 inputAmount_, uint256 outputAmount_) external nonpayable
```

Send payout tokens to Teller while allowing market owners to perform custom logic on received or paid out tokensMarket ID on Teller must be whitelisted

*Must transfer the output amount of payout tokens back to the TellerShould check that the quote tokens have been transferred to the contract in the _callback function*

#### Parameters

| Name | Type | Description |
|---|---|---|
| id_ | uint256 | ID of the market |
| inputAmount_ | uint256 | Amount of quote tokens bonded to the market |
| outputAmount_ | uint256 | Amount of payout tokens to be paid out to the market |

### changeKernel

```solidity
function changeKernel(contract Kernel newKernel_) external nonpayable
```

Function used by kernel when migrating to a new kernel.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newKernel_ | contract Kernel | undefined |

### configureDependencies

```solidity
function configureDependencies() external nonpayable returns (Keycode[] dependencies)
```

Define module dependencies for this policy.




#### Returns

| Name | Type | Description |
|---|---|---|
| dependencies | Keycode[] | - Keycode array of module dependencies. |

### isActive

```solidity
function isActive() external view returns (bool)
```

Easily accessible indicator for if a policy is activated or not.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### kernel

```solidity
function kernel() external view returns (contract Kernel)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Kernel | undefined |

### ohm

```solidity
function ohm() external view returns (contract ERC20)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ERC20 | undefined |

### operator

```solidity
function operator() external view returns (contract Operator)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Operator | undefined |

### priorBalances

```solidity
function priorBalances(contract ERC20) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | contract ERC20 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### requestPermissions

```solidity
function requestPermissions() external view returns (struct Permissions[] requests)
```

Function called by kernel to set module function permissions.




#### Returns

| Name | Type | Description |
|---|---|---|
| requests | Permissions[] | - Array of keycodes and function selectors for requested permissions. |

### setOperator

```solidity
function setOperator(contract Operator operator_) external nonpayable
```

Sets the operator contract for the callback to use to report bond purchasesMust be set before the callback is used



#### Parameters

| Name | Type | Description |
|---|---|---|
| operator_ | contract Operator | - Address of the Operator contract |

### whitelist

```solidity
function whitelist(address teller_, uint256 id_) external nonpayable
```

Whitelist a teller and market ID combinationMust be callback owner



#### Parameters

| Name | Type | Description |
|---|---|---|
| teller_ | address | Address of the Teller contract which serves the market |
| id_ | uint256 | ID of the market |




## Errors

### Callback_InvalidParams

```solidity
error Callback_InvalidParams()
```






### Callback_MarketNotSupported

```solidity
error Callback_MarketNotSupported(uint256 id)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| id | uint256 | undefined |

### Callback_TokensNotReceived

```solidity
error Callback_TokensNotReceived()
```






### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### Policy_ModuleDoesNotExist

```solidity
error Policy_ModuleDoesNotExist(Keycode keycode_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| keycode_ | Keycode | undefined |


