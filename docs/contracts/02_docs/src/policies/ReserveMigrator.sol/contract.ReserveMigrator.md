# ReserveMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/ReserveMigrator.sol)

**Inherits:** [IReserveMigrator](/main/contracts/docs/src/policies/interfaces/IReserveMigrator.sol/interface.IReserveMigrator), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## Constants

### from

```solidity
ERC20 public immutable from;
```

### sFrom

```solidity
ERC4626 public immutable sFrom;
```

### to

```solidity
ERC20 public immutable to;
```

### sTo

```solidity
ERC4626 public immutable sTo;
```

## State Variables

### TRSRY

```solidity
TRSRYv1 internal TRSRY;
```

### migrator

```solidity
IDaiUsds public migrator;
```

### locallyActive

```solidity
bool public locallyActive;
```

## Functions

<a id="constructor-kernel-address-address-address"></a>

### constructor

```solidity
constructor(Kernel kernel_, address sFrom_, address sTo_, address migrator_) Policy(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |
| sFrom_ | `address` |  |
| sTo_ | `address` |  |
| migrator_ | `address` |  |

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
function requestPermissions()
        external
        view
        override
        returns (Permissions[] memory permissions);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| permissions | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="migrate"></a>

### migrate

migrate reserves and wrapped reserves in the treasury to the new reserve token

<i>

this function is restricted to the heart role to avoid complications with opportunistic conversions

</i>

<i>

if no migration is required or it is deactivated, the function does nothing

</i>

```solidity
function migrate() external override onlyRole("heart");
```

<a id="version"></a>

### VERSION

Returns the version of the policy.

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | The major version of the policy. |
| minor | `uint8` | The minor version of the policy. |

<a id="activate"></a>

### activate

Activate the policy locally, if it has been deactivated

<i>

This function is restricted to the reserve_migrator admin role

</i>

```solidity
function activate() external onlyRole("reserve_migrator_admin");
```

<a id="deactivate"></a>

### deactivate

Deactivate the policy locally, preventing it from migrating reserves

<i>

This function is restricted to the reserve_migrator admin role

</i>

```solidity
function deactivate() external onlyRole("reserve_migrator_admin");
```

<a id="rescue-address"></a>

### rescue

Rescue any ERC20 token sent to this contract and send it to the TRSRY

<i>

This function is restricted to the reserve_migrator admin role

</i>

```solidity
function rescue(address token_) external onlyRole("reserve_migrator_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token_ | `address` | The address of the ERC20 token to rescue |
