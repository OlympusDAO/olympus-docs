# ContractRegistryAdmin

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/ContractRegistryAdmin.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

This policy is used to register and deregister contracts in the RGSTY module.

*This contract utilises the following roles:

- `contract_registry_admin`: Can register and deregister contracts
This policy provides permissioned access to the state-changing functions on the RGSTY module. The view functions can be called directly on the module.*

## State Variables

### RGSTY

The RGSTY module

*The value is set when the policy is activated*

```solidity
RGSTYv1 internal RGSTY;
```

### CONTRACT_REGISTRY_ADMIN_ROLE

The role for the contract registry admin

```solidity
bytes32 public constant CONTRACT_REGISTRY_ADMIN_ROLE = "contract_registry_admin";
```

## Functions

### constructor

```solidity
constructor(address kernel_) Policy(Kernel(kernel_));
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
function requestPermissions() external pure override returns (Permissions[] memory permissions);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`Permissions[]`|requests - Array of keycodes and function selectors for requested permissions.|

### VERSION

The version of the policy

```solidity
function VERSION() external pure returns (uint8);
```

### onlyPolicyActive

Modifier to check that the contract is activated as a policy

```solidity
modifier onlyPolicyActive();
```

### registerImmutableContract

Register an immutable contract in the contract registry

*This function will revert if:

- This contract is not activated as a policy
- The caller does not have the required role
- The RGSTY module reverts*

```solidity
function registerImmutableContract(bytes5 name_, address contractAddress_)
    external
    onlyPolicyActive
    onlyRole(CONTRACT_REGISTRY_ADMIN_ROLE);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|The name of the contract|
|`contractAddress_`|`address`|The address of the contract|

### registerContract

Register a contract in the contract registry

*This function will revert if:

- This contract is not activated as a policy
- The caller does not have the required role
- The RGSTY module reverts*

```solidity
function registerContract(bytes5 name_, address contractAddress_)
    external
    onlyPolicyActive
    onlyRole(CONTRACT_REGISTRY_ADMIN_ROLE);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|The name of the contract|
|`contractAddress_`|`address`|The address of the contract|

### updateContract

Update a contract in the contract registry

*This function will revert if:

- This contract is not activated as a policy
- The caller does not have the required role
- The RGSTY module reverts*

```solidity
function updateContract(bytes5 name_, address contractAddress_)
    external
    onlyPolicyActive
    onlyRole(CONTRACT_REGISTRY_ADMIN_ROLE);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|The name of the contract|
|`contractAddress_`|`address`|The address of the contract|

### deregisterContract

Deregister a contract in the contract registry

*This function will revert if:

- This contract is not activated as a policy
- The caller does not have the required role
- The RGSTY module reverts*

```solidity
function deregisterContract(bytes5 name_) external onlyPolicyActive onlyRole(CONTRACT_REGISTRY_ADMIN_ROLE);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|The name of the contract|

## Errors

### Params_InvalidAddress

Thrown when the address is invalid

```solidity
error Params_InvalidAddress();
```

### OnlyPolicyActive

Thrown when the contract is not activated as a policy

```solidity
error OnlyPolicyActive();
```
