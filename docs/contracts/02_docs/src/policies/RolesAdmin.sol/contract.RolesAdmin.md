# RolesAdmin

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/policies/RolesAdmin.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy)

The RolesAdmin Policy grants and revokes Roles in the ROLES module.

## State Variables

### admin

Special role that is responsible for assigning policy-defined roles to addresses.

```solidity
address public admin
```

### newAdmin

Proposed new admin. Address must call `pullRolesAdmin` to become the new roles admin.

```solidity
address public newAdmin
```

### ROLES

```solidity
ROLESv1 public ROLES
```

## Functions

### constructor

```solidity
constructor(Kernel _kernel) Policy(_kernel);
```

### configureDependencies

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

### requestPermissions

```solidity
function requestPermissions() external view override returns (Permissions[] memory requests);
```

### onlyAdmin

```solidity
modifier onlyAdmin() ;
```

### grantRole

```solidity
function grantRole(bytes32 role_, address wallet_) external onlyAdmin;
```

### revokeRole

```solidity
function revokeRole(bytes32 role_, address wallet_) external onlyAdmin;
```

### pushNewAdmin

```solidity
function pushNewAdmin(address newAdmin_) external onlyAdmin;
```

### pullNewAdmin

```solidity
function pullNewAdmin() external;
```

## Events

### NewAdminPushed

```solidity
event NewAdminPushed(address indexed newAdmin_);
```

### NewAdminPulled

```solidity
event NewAdminPulled(address indexed newAdmin_);
```

## Errors

### Roles_OnlyAdmin

```solidity
error Roles_OnlyAdmin();
```

### Roles_OnlyNewAdmin

```solidity
error Roles_OnlyNewAdmin();
```
