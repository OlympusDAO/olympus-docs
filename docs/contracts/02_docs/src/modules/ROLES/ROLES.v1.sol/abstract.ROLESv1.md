# ROLESv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/modules/ROLES/ROLES.v1.sol)

**Inherits:**
[Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

## State Variables

### hasRole

Mapping for if an address has a policy-defined role.

```solidity
mapping(address => mapping(bytes32 => bool)) public hasRole;
```

## Functions

### saveRole

Function to grant policy-defined roles to some address. Can only be called by admin.

```solidity
function saveRole(bytes32 role_, address addr_) external virtual;
```

### removeRole

Function to revoke policy-defined roles from some address. Can only be called by admin.

```solidity
function removeRole(bytes32 role_, address addr_) external virtual;
```

### requireRole

"Modifier" to restrict policy function access to certain addresses with a role.

*Roles are defined in the policy and granted by the ROLES admin.*

```solidity
function requireRole(bytes32 role_, address caller_) external virtual;
```

### ensureValidRole

Function that checks if role is valid (all lower case)

```solidity
function ensureValidRole(bytes32 role_) external pure virtual;
```

## Events

### RoleGranted

```solidity
event RoleGranted(bytes32 indexed role_, address indexed addr_);
```

### RoleRevoked

```solidity
event RoleRevoked(bytes32 indexed role_, address indexed addr_);
```

## Errors

### ROLES_InvalidRole

```solidity
error ROLES_InvalidRole(bytes32 role_);
```

### ROLES_RequireRole

```solidity
error ROLES_RequireRole(bytes32 role_);
```

### ROLES_AddressAlreadyHasRole

```solidity
error ROLES_AddressAlreadyHasRole(address addr_, bytes32 role_);
```

### ROLES_AddressDoesNotHaveRole

```solidity
error ROLES_AddressDoesNotHaveRole(address addr_, bytes32 role_);
```

### ROLES_RoleDoesNotExist

```solidity
error ROLES_RoleDoesNotExist(bytes32 role_);
```
