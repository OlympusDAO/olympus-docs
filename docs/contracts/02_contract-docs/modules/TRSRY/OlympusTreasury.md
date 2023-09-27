# OlympusTreasury





Treasury holds all other assets under the control of the protocol.



## Methods

### INIT

```solidity
function INIT() external nonpayable
```

Initialization function for the module

*This function is called when the module is installed or upgraded by the kernel.MUST BE GATED BY onlyKernel. Used to encompass any initialization or upgrade logic.*


### KEYCODE

```solidity
function KEYCODE() external pure returns (Keycode)
```

5 byte identifier for a module.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |

### VERSION

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor)
```

Returns which semantic version of a module is being implemented.




#### Returns

| Name | Type | Description |
|---|---|---|
| major | uint8 | - Major version upgrade indicates breaking change to the interface. |
| minor | uint8 | - Minor version change retains backward-compatible interface. |

### activate

```solidity
function activate() external nonpayable
```

Re-activate withdrawals after shutdown.




### active

```solidity
function active() external view returns (bool)
```

Status of the treasury. If false, no withdrawals or debt can be incurred.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### changeKernel

```solidity
function changeKernel(contract Kernel newKernel_) external nonpayable
```

Function used by kernel when migrating to a new kernel.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newKernel_ | contract Kernel | undefined |

### deactivate

```solidity
function deactivate() external nonpayable
```

Emergency shutdown of withdrawals.




### debtApproval

```solidity
function debtApproval(address, contract ERC20) external view returns (uint256)
```

Mapping of who is approved to incur debt.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |
| _1 | contract ERC20 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### decreaseDebtorApproval

```solidity
function decreaseDebtorApproval(address debtor_, contract ERC20 token_, uint256 amount_) external nonpayable
```

Decrease approval for someone to withdraw reserves as debt.



#### Parameters

| Name | Type | Description |
|---|---|---|
| debtor_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |

### decreaseWithdrawApproval

```solidity
function decreaseWithdrawApproval(address withdrawer_, contract ERC20 token_, uint256 amount_) external nonpayable
```

Decrease approval for specific withdrawer addresses



#### Parameters

| Name | Type | Description |
|---|---|---|
| withdrawer_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |

### getReserveBalance

```solidity
function getReserveBalance(contract ERC20 token_) external view returns (uint256)
```

Get total balance of assets inside the treasury + any debt taken out against those assets.



#### Parameters

| Name | Type | Description |
|---|---|---|
| token_ | contract ERC20 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### increaseDebtorApproval

```solidity
function increaseDebtorApproval(address debtor_, contract ERC20 token_, uint256 amount_) external nonpayable
```

Increase approval for someone to accrue debt in order to withdraw reserves.

*Debt will generally be taken by contracts to allocate treasury funds in yield sources.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| debtor_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |

### increaseWithdrawApproval

```solidity
function increaseWithdrawApproval(address withdrawer_, contract ERC20 token_, uint256 amount_) external nonpayable
```

Increase approval for specific withdrawer addresses



#### Parameters

| Name | Type | Description |
|---|---|---|
| withdrawer_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |

### incurDebt

```solidity
function incurDebt(contract ERC20 token_, uint256 amount_) external nonpayable
```

Pre-approved policies can get a loan to perform operations with treasury assets.



#### Parameters

| Name | Type | Description |
|---|---|---|
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |

### kernel

```solidity
function kernel() external view returns (contract Kernel)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Kernel | undefined |

### repayDebt

```solidity
function repayDebt(address debtor_, contract ERC20 token_, uint256 amount_) external nonpayable
```

Repay a debtor debt.

*Only confirmed to safely handle standard and non-standard ERC20s.Can have unforeseen consequences with ERC777. Be careful with ERC777 as reserve.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| debtor_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |

### reserveDebt

```solidity
function reserveDebt(contract ERC20, address) external view returns (uint256)
```

Debt for particular token and debtor address



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | contract ERC20 | undefined |
| _1 | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### setDebt

```solidity
function setDebt(address debtor_, contract ERC20 token_, uint256 amount_) external nonpayable
```

An escape hatch for setting debt in special cases, like swapping reserves to another token.



#### Parameters

| Name | Type | Description |
|---|---|---|
| debtor_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |

### totalDebt

```solidity
function totalDebt(contract ERC20) external view returns (uint256)
```

Total debt for token across all withdrawals.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | contract ERC20 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### withdrawApproval

```solidity
function withdrawApproval(address, contract ERC20) external view returns (uint256)
```

Mapping of who is approved for withdrawal.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |
| _1 | contract ERC20 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### withdrawReserves

```solidity
function withdrawReserves(address to_, contract ERC20 token_, uint256 amount_) external nonpayable
```

Allow withdrawal of reserve funds from pre-approved addresses.



#### Parameters

| Name | Type | Description |
|---|---|---|
| to_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |



## Events

### DebtIncurred

```solidity
event DebtIncurred(contract ERC20 indexed token_, address indexed policy_, uint256 amount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| token_ `indexed` | contract ERC20 | undefined |
| policy_ `indexed` | address | undefined |
| amount_  | uint256 | undefined |

### DebtRepaid

```solidity
event DebtRepaid(contract ERC20 indexed token_, address indexed policy_, uint256 amount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| token_ `indexed` | contract ERC20 | undefined |
| policy_ `indexed` | address | undefined |
| amount_  | uint256 | undefined |

### DebtSet

```solidity
event DebtSet(contract ERC20 indexed token_, address indexed policy_, uint256 amount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| token_ `indexed` | contract ERC20 | undefined |
| policy_ `indexed` | address | undefined |
| amount_  | uint256 | undefined |

### DecreaseDebtorApproval

```solidity
event DecreaseDebtorApproval(address indexed debtor_, contract ERC20 indexed token_, uint256 newAmount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| debtor_ `indexed` | address | undefined |
| token_ `indexed` | contract ERC20 | undefined |
| newAmount_  | uint256 | undefined |

### DecreaseWithdrawApproval

```solidity
event DecreaseWithdrawApproval(address indexed withdrawer_, contract ERC20 indexed token_, uint256 newAmount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| withdrawer_ `indexed` | address | undefined |
| token_ `indexed` | contract ERC20 | undefined |
| newAmount_  | uint256 | undefined |

### IncreaseDebtorApproval

```solidity
event IncreaseDebtorApproval(address indexed debtor_, contract ERC20 indexed token_, uint256 newAmount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| debtor_ `indexed` | address | undefined |
| token_ `indexed` | contract ERC20 | undefined |
| newAmount_  | uint256 | undefined |

### IncreaseWithdrawApproval

```solidity
event IncreaseWithdrawApproval(address indexed withdrawer_, contract ERC20 indexed token_, uint256 newAmount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| withdrawer_ `indexed` | address | undefined |
| token_ `indexed` | contract ERC20 | undefined |
| newAmount_  | uint256 | undefined |

### Withdrawal

```solidity
event Withdrawal(address indexed policy_, address indexed withdrawer_, contract ERC20 indexed token_, uint256 amount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ `indexed` | address | undefined |
| withdrawer_ `indexed` | address | undefined |
| token_ `indexed` | contract ERC20 | undefined |
| amount_  | uint256 | undefined |



## Errors

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### Module_PolicyNotPermitted

```solidity
error Module_PolicyNotPermitted(address policy_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ | address | undefined |

### TRSRY_NoDebtOutstanding

```solidity
error TRSRY_NoDebtOutstanding()
```






### TRSRY_NotActive

```solidity
error TRSRY_NotActive()
```







