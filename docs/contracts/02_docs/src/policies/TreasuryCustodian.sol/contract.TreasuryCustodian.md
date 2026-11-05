# TreasuryCustodian

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/TreasuryCustodian.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## State Variables

### TRSRY

```solidity
TRSRYv1 public TRSRY;
```

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) Policy(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="grantwithdrawerapproval-address-erc20-uint256"></a>

### grantWithdrawerApproval

Allow an address to withdraw `amount_` from the treasury

```solidity
function grantWithdrawerApproval(
        address for_,
        ERC20 token_,
        uint256 amount_
    ) external onlyRole("custodian");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| for_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="reducewithdrawerapproval-address-erc20-uint256"></a>

### reduceWithdrawerApproval

Lower an address's withdrawer approval

```solidity
function reduceWithdrawerApproval(
        address for_,
        ERC20 token_,
        uint256 amount_
    ) external onlyRole("custodian");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| for_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="withdrawreservesto-address-erc20-uint256"></a>

### withdrawReservesTo

Custodian can withdraw reserves to an address.

<i>

Used for withdrawing assets to a MS or other address in special cases.

</i>

```solidity
function withdrawReservesTo(
        address to_,
        ERC20 token_,
        uint256 amount_
    ) external onlyRole("custodian");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="grantdebtorapproval-address-erc20-uint256"></a>

### grantDebtorApproval

Allow an address to incur `amount_` of debt from the treasury

```solidity
function grantDebtorApproval(
        address for_,
        ERC20 token_,
        uint256 amount_
    ) external onlyRole("custodian");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| for_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="reducedebtorapproval-address-erc20-uint256"></a>

### reduceDebtorApproval

Lower an address's debtor approval

```solidity
function reduceDebtorApproval(
        address for_,
        ERC20 token_,
        uint256 amount_
    ) external onlyRole("custodian");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| for_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="increasedebt-erc20-address-uint256"></a>

### increaseDebt

Allow authorized addresses to increase debt in special cases

```solidity
function increaseDebt(
        ERC20 token_,
        address debtor_,
        uint256 amount_
    ) external onlyRole("custodian");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token_ | `ERC20` |  |
| debtor_ | `address` |  |
| amount_ | `uint256` |  |

<a id="decreasedebt-erc20-address-uint256"></a>

### decreaseDebt

Allow authorized addresses to decrease debt in special cases

```solidity
function decreaseDebt(
        ERC20 token_,
        address debtor_,
        uint256 amount_
    ) external onlyRole("custodian");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token_ | `ERC20` |  |
| debtor_ | `address` |  |
| amount_ | `uint256` |  |

<a id="revokepolicyapprovals-address-erc20"></a>

### revokePolicyApprovals

Anyone can call to revoke a deactivated policy's approvals.

```solidity
function revokePolicyApprovals(
        address policy_,
        ERC20[] memory tokens_
    ) external onlyRole("custodian");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` |  |
| tokens_ | `ERC20[]` |  |

## Events

### ApprovalRevoked

```solidity
event ApprovalRevoked(address indexed policy_, ERC20[] tokens_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` |  |
| tokens_ | `ERC20[]` |  |

## Errors

### Custodian_PolicyStillActive

```solidity
error Custodian_PolicyStillActive();
```
