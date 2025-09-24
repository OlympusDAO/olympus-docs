# OlympusRoles

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/modules/ROLES/OlympusRoles.sol)

**Inherits:**
[ROLESv1](/main/contracts/docs/src/modules/ROLES/ROLES.v1.sol/abstract.ROLESv1)

Module that holds multisig roles needed by various policies.

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

### saveRole

Function to grant policy-defined roles to some address. Can only be called by admin.

```solidity
function saveRole(bytes32 role_, address addr_) external override permissioned;
```

### removeRole

Function to revoke policy-defined roles from some address. Can only be called by admin.

```solidity
function removeRole(bytes32 role_, address addr_) external override permissioned;
```

### requireRole

"Modifier" to restrict policy function access to certain addresses with a role.

*Roles are defined in the policy and granted by the ROLES admin.*

```solidity
function requireRole(bytes32 role_, address caller_) external view override;
```

### ensureValidRole

Function that checks if role is valid (all lower case)

```solidity
function ensureValidRole(bytes32 role_) public pure override;
```
