# TRSRYv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/TRSRY/TRSRY.v1.sol)

**Inherits:** [Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

Treasury holds all other assets under the control of the protocol.

## State Variables

### active

Status of the treasury. If false, no withdrawals or debt can be incurred.

```solidity
bool public active;
```

### withdrawApproval

Mapping of who is approved for withdrawal.

<i>

withdrawer -> token -> amount. Infinite approval is max(uint256).

</i>

```solidity
mapping(address => mapping(ERC20 => uint256)) public withdrawApproval;
```

### debtApproval

Mapping of who is approved to incur debt.

<i>

debtor -> token -> amount. Infinite approval is max(uint256).

</i>

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

<a id="onlywhileactive"></a>

### onlyWhileActive

```solidity
modifier onlyWhileActive();
```

<a id="increasewithdrawapproval-address-erc20-uint256"></a>

### increaseWithdrawApproval

Increase approval for specific withdrawer addresses

```solidity
function increaseWithdrawApproval(
        address withdrawer_,
        ERC20 token_,
        uint256 amount_
    ) external virtual;
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| withdrawer_ | `address` |             |
| token_      | `ERC20`   |             |
| amount_     | `uint256` |             |

<a id="decreasewithdrawapproval-address-erc20-uint256"></a>

### decreaseWithdrawApproval

Decrease approval for specific withdrawer addresses

```solidity
function decreaseWithdrawApproval(
        address withdrawer_,
        ERC20 token_,
        uint256 amount_
    ) external virtual;
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| withdrawer_ | `address` |             |
| token_      | `ERC20`   |             |
| amount_     | `uint256` |             |

<a id="withdrawreserves-address-erc20-uint256"></a>

### withdrawReserves

Allow withdrawal of reserve funds from pre-approved addresses.

```solidity
function withdrawReserves(address to_, ERC20 token_, uint256 amount_) external virtual;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| to_     | `address` |             |
| token_  | `ERC20`   |             |
| amount_ | `uint256` |             |

<a id="increasedebtorapproval-address-erc20-uint256"></a>

### increaseDebtorApproval

Increase approval for someone to accrue debt in order to withdraw reserves.

<i>

Debt will generally be taken by contracts to allocate treasury funds in yield sources.

</i>

```solidity
function increaseDebtorApproval(
        address debtor_,
        ERC20 token_,
        uint256 amount_
    ) external virtual;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| debtor_ | `address` |             |
| token_  | `ERC20`   |             |
| amount_ | `uint256` |             |

<a id="decreasedebtorapproval-address-erc20-uint256"></a>

### decreaseDebtorApproval

Decrease approval for someone to withdraw reserves as debt.

```solidity
function decreaseDebtorApproval(
        address debtor_,
        ERC20 token_,
        uint256 amount_
    ) external virtual;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| debtor_ | `address` |             |
| token_  | `ERC20`   |             |
| amount_ | `uint256` |             |

<a id="incurdebt-erc20-uint256"></a>

### incurDebt

Pre-approved policies can get a loan to perform operations with treasury assets.

```solidity
function incurDebt(ERC20 token_, uint256 amount_) external virtual;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| token_  | `ERC20`   |             |
| amount_ | `uint256` |             |

<a id="repaydebt-address-erc20-uint256"></a>

### repayDebt

Repay a debtor debt.

<i>

Only confirmed to safely handle standard and non-standard ERC20s.

</i>

<i>

Can have unforeseen consequences with ERC777. Be careful with ERC777 as reserve.

</i>

```solidity
function repayDebt(address debtor_, ERC20 token_, uint256 amount_) external virtual;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| debtor_ | `address` |             |
| token_  | `ERC20`   |             |
| amount_ | `uint256` |             |

<a id="setdebt-address-erc20-uint256"></a>

### setDebt

An escape hatch for setting debt in special cases, like swapping reserves to another token.

```solidity
function setDebt(address debtor_, ERC20 token_, uint256 amount_) external virtual;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| debtor_ | `address` |             |
| token_  | `ERC20`   |             |
| amount_ | `uint256` |             |

<a id="getreservebalance-erc20"></a>

### getReserveBalance

Get total balance of assets inside the treasury + any debt taken out against those assets.

```solidity
function getReserveBalance(ERC20 token_) external view virtual returns (uint256);
```

**Parameters**

| Name   | Type    | Description |
| ------ | ------- | ----------- |
| token_ | `ERC20` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="deactivate"></a>

### deactivate

Emergency shutdown of withdrawals.

```solidity
function deactivate() external virtual;
```

<a id="activate"></a>

### activate

Re-activate withdrawals after shutdown.

```solidity
function activate() external virtual;
```

## Events

### IncreaseWithdrawApproval

```solidity
event IncreaseWithdrawApproval(
        address indexed withdrawer_,
        ERC20 indexed token_,
        uint256 newAmount_
    );
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| withdrawer_ | `address` |             |
| token_      | `ERC20`   |             |
| newAmount_  | `uint256` |             |

### DecreaseWithdrawApproval

```solidity
event DecreaseWithdrawApproval(
        address indexed withdrawer_,
        ERC20 indexed token_,
        uint256 newAmount_
    );
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| withdrawer_ | `address` |             |
| token_      | `ERC20`   |             |
| newAmount_  | `uint256` |             |

### Withdrawal

```solidity
event Withdrawal(
        address indexed policy_,
        address indexed withdrawer_,
        ERC20 indexed token_,
        uint256 amount_
    );
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| policy_     | `address` |             |
| withdrawer_ | `address` |             |
| token_      | `ERC20`   |             |
| amount_     | `uint256` |             |

### IncreaseDebtorApproval

```solidity
event IncreaseDebtorApproval(address indexed debtor_, ERC20 indexed token_, uint256 newAmount_);
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| debtor_    | `address` |             |
| token_     | `ERC20`   |             |
| newAmount_ | `uint256` |             |

### DecreaseDebtorApproval

```solidity
event DecreaseDebtorApproval(address indexed debtor_, ERC20 indexed token_, uint256 newAmount_);
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| debtor_    | `address` |             |
| token_     | `ERC20`   |             |
| newAmount_ | `uint256` |             |

### DebtIncurred

```solidity
event DebtIncurred(ERC20 indexed token_, address indexed policy_, uint256 amount_);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| token_  | `ERC20`   |             |
| policy_ | `address` |             |
| amount_ | `uint256` |             |

### DebtRepaid

```solidity
event DebtRepaid(ERC20 indexed token_, address indexed policy_, uint256 amount_);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| token_  | `ERC20`   |             |
| policy_ | `address` |             |
| amount_ | `uint256` |             |

### DebtSet

```solidity
event DebtSet(ERC20 indexed token_, address indexed policy_, uint256 amount_);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| token_  | `ERC20`   |             |
| policy_ | `address` |             |
| amount_ | `uint256` |             |

## Errors

### TRSRY_NoDebtOutstanding

```solidity
error TRSRY_NoDebtOutstanding();
```

### TRSRY_NotActive

```solidity
error TRSRY_NotActive();
```
