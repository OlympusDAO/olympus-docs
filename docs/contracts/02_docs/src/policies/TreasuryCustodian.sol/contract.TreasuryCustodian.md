# TreasuryCustodian

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/policies/TreasuryCustodian.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## State Variables

### TRSRY

```solidity
TRSRYv1 public TRSRY
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_) Policy(kernel_);
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

### grantWithdrawerApproval

Allow an address to withdraw `amount_` from the treasury

```solidity
function grantWithdrawerApproval(address for_, ERC20 token_, uint256 amount_) external onlyRole("custodian");
```

### reduceWithdrawerApproval

Lower an address's withdrawer approval

```solidity
function reduceWithdrawerApproval(address for_, ERC20 token_, uint256 amount_) external onlyRole("custodian");
```

### withdrawReservesTo

Custodian can withdraw reserves to an address.

Used for withdrawing assets to a MS or other address in special cases.

```solidity
function withdrawReservesTo(address to_, ERC20 token_, uint256 amount_) external onlyRole("custodian");
```

### grantDebtorApproval

Allow an address to incur `amount_` of debt from the treasury

```solidity
function grantDebtorApproval(address for_, ERC20 token_, uint256 amount_) external onlyRole("custodian");
```

### reduceDebtorApproval

Lower an address's debtor approval

```solidity
function reduceDebtorApproval(address for_, ERC20 token_, uint256 amount_) external onlyRole("custodian");
```

### increaseDebt

Allow authorized addresses to increase debt in special cases

```solidity
function increaseDebt(ERC20 token_, address debtor_, uint256 amount_) external onlyRole("custodian");
```

### decreaseDebt

Allow authorized addresses to decrease debt in special cases

```solidity
function decreaseDebt(ERC20 token_, address debtor_, uint256 amount_) external onlyRole("custodian");
```

### revokePolicyApprovals

Anyone can call to revoke a deactivated policy's approvals.

```solidity
function revokePolicyApprovals(address policy_, ERC20[] memory tokens_) external onlyRole("custodian");
```

## Events

### ApprovalRevoked

```solidity
event ApprovalRevoked(address indexed policy_, ERC20[] tokens_);
```

## Errors

### Custodian_PolicyStillActive

```solidity
error Custodian_PolicyStillActive();
```
