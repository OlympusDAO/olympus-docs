# TRSRYv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/modules/TRSRY/TRSRY.v1.sol)

**Inherits:**
[Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

Treasury holds all other assets under the control of the protocol.

## State Variables

### active

Status of the treasury. If false, no withdrawals or debt can be incurred.

```solidity
bool public active;
```

### withdrawApproval

Mapping of who is approved for withdrawal.

*withdrawer -> token -> amount. Infinite approval is max(uint256).*

```solidity
mapping(address => mapping(ERC20 => uint256)) public withdrawApproval;
```

### debtApproval

Mapping of who is approved to incur debt.

*debtor -> token -> amount. Infinite approval is max(uint256).*

```solidity
mapping(address => mapping(ERC20 => uint256)) public debtApproval;
```

### totalDebt

Total debt for token across all withdrawals.

```solidity
mapping(ERC20 => uint256) public totalDebt;
```

### reserveDebt

Debt for particular token and debtor address

```solidity
mapping(ERC20 => mapping(address => uint256)) public reserveDebt;
```

## Functions

### onlyWhileActive

```solidity
modifier onlyWhileActive();
```

### increaseWithdrawApproval

Increase approval for specific withdrawer addresses

```solidity
function increaseWithdrawApproval(address withdrawer_, ERC20 token_, uint256 amount_) external virtual;
```

### decreaseWithdrawApproval

Decrease approval for specific withdrawer addresses

```solidity
function decreaseWithdrawApproval(address withdrawer_, ERC20 token_, uint256 amount_) external virtual;
```

### withdrawReserves

Allow withdrawal of reserve funds from pre-approved addresses.

```solidity
function withdrawReserves(address to_, ERC20 token_, uint256 amount_) external virtual;
```

### increaseDebtorApproval

Increase approval for someone to accrue debt in order to withdraw reserves.

*Debt will generally be taken by contracts to allocate treasury funds in yield sources.*

```solidity
function increaseDebtorApproval(address debtor_, ERC20 token_, uint256 amount_) external virtual;
```

### decreaseDebtorApproval

Decrease approval for someone to withdraw reserves as debt.

```solidity
function decreaseDebtorApproval(address debtor_, ERC20 token_, uint256 amount_) external virtual;
```

### incurDebt

Pre-approved policies can get a loan to perform operations with treasury assets.

```solidity
function incurDebt(ERC20 token_, uint256 amount_) external virtual;
```

### repayDebt

Repay a debtor debt.

*Only confirmed to safely handle standard and non-standard ERC20s.*

*Can have unforeseen consequences with ERC777. Be careful with ERC777 as reserve.*

```solidity
function repayDebt(address debtor_, ERC20 token_, uint256 amount_) external virtual;
```

### setDebt

An escape hatch for setting debt in special cases, like swapping reserves to another token.

```solidity
function setDebt(address debtor_, ERC20 token_, uint256 amount_) external virtual;
```

### getReserveBalance

Get total balance of assets inside the treasury + any debt taken out against those assets.

```solidity
function getReserveBalance(ERC20 token_) external view virtual returns (uint256);
```

### deactivate

Emergency shutdown of withdrawals.

```solidity
function deactivate() external virtual;
```

### activate

Re-activate withdrawals after shutdown.

```solidity
function activate() external virtual;
```

## Events

### IncreaseWithdrawApproval

```solidity
event IncreaseWithdrawApproval(address indexed withdrawer_, ERC20 indexed token_, uint256 newAmount_);
```

### DecreaseWithdrawApproval

```solidity
event DecreaseWithdrawApproval(address indexed withdrawer_, ERC20 indexed token_, uint256 newAmount_);
```

### Withdrawal

```solidity
event Withdrawal(address indexed policy_, address indexed withdrawer_, ERC20 indexed token_, uint256 amount_);
```

### IncreaseDebtorApproval

```solidity
event IncreaseDebtorApproval(address indexed debtor_, ERC20 indexed token_, uint256 newAmount_);
```

### DecreaseDebtorApproval

```solidity
event DecreaseDebtorApproval(address indexed debtor_, ERC20 indexed token_, uint256 newAmount_);
```

### DebtIncurred

```solidity
event DebtIncurred(ERC20 indexed token_, address indexed policy_, uint256 amount_);
```

### DebtRepaid

```solidity
event DebtRepaid(ERC20 indexed token_, address indexed policy_, uint256 amount_);
```

### DebtSet

```solidity
event DebtSet(ERC20 indexed token_, address indexed policy_, uint256 amount_);
```

## Errors

### TRSRY_NoDebtOutstanding

```solidity
error TRSRY_NoDebtOutstanding();
```

### TRSRY_NotActive

```solidity
error TRSRY_NotActive();
```
