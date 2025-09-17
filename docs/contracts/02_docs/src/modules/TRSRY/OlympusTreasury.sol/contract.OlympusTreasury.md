# OlympusTreasury

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/modules/TRSRY/OlympusTreasury.sol)

**Inherits:**
[TRSRYv1](/main/contracts/docs/src/modules/TRSRY/TRSRY.v1.sol/abstract.TRSRYv1), ReentrancyGuard

Treasury holds all other assets under the control of the protocol.

## Functions

### constructor

```solidity
constructor(Kernel kernel_) Module(kernel_);
```

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|- Major version upgrade indicates breaking change to the interface.|
|`minor`|`uint8`|- Minor version change retains backward-compatible interface.|

### increaseWithdrawApproval

Increase approval for specific withdrawer addresses

```solidity
function increaseWithdrawApproval(address withdrawer_, ERC20 token_, uint256 amount_) external override permissioned;
```

### decreaseWithdrawApproval

Decrease approval for specific withdrawer addresses

```solidity
function decreaseWithdrawApproval(address withdrawer_, ERC20 token_, uint256 amount_) external override permissioned;
```

### withdrawReserves

Allow withdrawal of reserve funds from pre-approved addresses.

```solidity
function withdrawReserves(address to_, ERC20 token_, uint256 amount_) public override permissioned onlyWhileActive;
```

### increaseDebtorApproval

Increase approval for someone to accrue debt in order to withdraw reserves.

*Debt will generally be taken by contracts to allocate treasury funds in yield sources.*

```solidity
function increaseDebtorApproval(address debtor_, ERC20 token_, uint256 amount_) external override permissioned;
```

### decreaseDebtorApproval

Decrease approval for someone to withdraw reserves as debt.

```solidity
function decreaseDebtorApproval(address debtor_, ERC20 token_, uint256 amount_) external override permissioned;
```

### incurDebt

Pre-approved policies can get a loan to perform operations with treasury assets.

```solidity
function incurDebt(ERC20 token_, uint256 amount_) external override permissioned onlyWhileActive;
```

### repayDebt

Repay a debtor debt.

*Only confirmed to safely handle standard and non-standard ERC20s.*

```solidity
function repayDebt(address debtor_, ERC20 token_, uint256 amount_) external override permissioned nonReentrant;
```

### setDebt

An escape hatch for setting debt in special cases, like swapping reserves to another token.

```solidity
function setDebt(address debtor_, ERC20 token_, uint256 amount_) external override permissioned;
```

### deactivate

Emergency shutdown of withdrawals.

```solidity
function deactivate() external override permissioned;
```

### activate

Re-activate withdrawals after shutdown.

```solidity
function activate() external override permissioned;
```

### getReserveBalance

Get total balance of assets inside the treasury + any debt taken out against those assets.

```solidity
function getReserveBalance(ERC20 token_) external view override returns (uint256);
```
