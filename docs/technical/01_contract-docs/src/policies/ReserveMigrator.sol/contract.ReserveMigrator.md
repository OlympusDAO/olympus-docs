# ReserveMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/ReserveMigrator.sol)

**Inherits:**
[IReserveMigrator](/main/technical/contract-docs/src/policies/interfaces/IReserveMigrator.sol/interface.IReserveMigrator), [Policy](/main/technical/contract-docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/technical/contract-docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## State Variables

### TRSRY

```solidity
TRSRYv1 internal TRSRY;
```

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

### migrator

```solidity
IDaiUsds public migrator;
```

### locallyActive

```solidity
bool public locallyActive;
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_, address sFrom_, address sTo_, address migrator_) Policy(kernel_);
```

### configureDependencies

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

### requestPermissions

```solidity
function requestPermissions() external view override returns (Permissions[] memory permissions);
```

### migrate

migrate reserves and wrapped reserves in the treasury to the new reserve token

*this function is restricted to the heart role to avoid complications with opportunistic conversions*

```solidity
function migrate() external override onlyRole("heart");
```

### VERSION

Returns the version of the policy.

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|The major version of the policy.|
|`minor`|`uint8`|The minor version of the policy.|

### activate

Activate the policy locally, if it has been deactivated

*This function is restricted to the reserve_migrator admin role*

```solidity
function activate() external onlyRole("reserve_migrator_admin");
```

### deactivate

Deactivate the policy locally, preventing it from migrating reserves

*This function is restricted to the reserve_migrator admin role*

```solidity
function deactivate() external onlyRole("reserve_migrator_admin");
```

### rescue

Rescue any ERC20 token sent to this contract and send it to the TRSRY

*This function is restricted to the reserve_migrator admin role*

```solidity
function rescue(address token_) external onlyRole("reserve_migrator_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token_`|`address`|The address of the ERC20 token to rescue|
