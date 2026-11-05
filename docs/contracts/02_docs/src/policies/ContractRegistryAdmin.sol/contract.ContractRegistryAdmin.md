# ContractRegistryAdmin

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/ContractRegistryAdmin.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

**Title:** ContractRegistryAdmin

This policy is used to register and deregister contracts in the RGSTY module.

<i>

This contract utilises the following roles:

- `contract_registry_admin`: Can register and deregister contracts

</i>

This policy provides permissioned access to the state-changing functions on the RGSTY module. The view functions can be called directly on the module.

## Constants

### CONTRACT_REGISTRY_ADMIN_ROLE

The role for the contract registry admin

```solidity
bytes32 public constant CONTRACT_REGISTRY_ADMIN_ROLE = "contract_registry_admin";
```

## State Variables

### RGSTY

The RGSTY module

<i>

The value is set when the policy is activated

</i>

```solidity
RGSTYv1 internal RGSTY;
```

## Functions

<a id="constructor-address"></a>

### constructor

```solidity
constructor(address kernel_) Policy(Kernel(kernel_));
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| kernel_ | `address` |             |

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
        pure
        override
        returns (Permissions[] memory permissions);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| permissions | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="version"></a>

### VERSION

The version of the policy

```solidity
function VERSION() external pure returns (uint8);
```

**Returns**

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| &lt;none&gt; | `uint8` |             |

<a id="onlypolicyactive"></a>

### onlyPolicyActive

Modifier to check that the contract is activated as a policy

```solidity
modifier onlyPolicyActive();
```

<a id="registerimmutablecontract-bytes5-address"></a>

### registerImmutableContract

Register an immutable contract in the contract registry

<i>

This function will revert if:

- This contract is not activated as a policy
- The caller does not have the required role
- The RGSTY module reverts

</i>

```solidity
function registerImmutableContract(
        bytes5 name_,
        address contractAddress_
    ) external onlyPolicyActive onlyRole(CONTRACT_REGISTRY_ADMIN_ROLE);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `bytes5` | The name of the contract |
| contractAddress_ | `address` | The address of the contract |

<a id="registercontract-bytes5-address"></a>

### registerContract

Register a contract in the contract registry

<i>

This function will revert if:

- This contract is not activated as a policy
- The caller does not have the required role
- The RGSTY module reverts

</i>

```solidity
function registerContract(
        bytes5 name_,
        address contractAddress_
    ) external onlyPolicyActive onlyRole(CONTRACT_REGISTRY_ADMIN_ROLE);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `bytes5` | The name of the contract |
| contractAddress_ | `address` | The address of the contract |

<a id="updatecontract-bytes5-address"></a>

### updateContract

Update a contract in the contract registry

<i>

This function will revert if:

- This contract is not activated as a policy
- The caller does not have the required role
- The RGSTY module reverts

</i>

```solidity
function updateContract(
        bytes5 name_,
        address contractAddress_
    ) external onlyPolicyActive onlyRole(CONTRACT_REGISTRY_ADMIN_ROLE);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `bytes5` | The name of the contract |
| contractAddress_ | `address` | The address of the contract |

<a id="deregistercontract-bytes5"></a>

### deregisterContract

Deregister a contract in the contract registry

<i>

This function will revert if:

- This contract is not activated as a policy
- The caller does not have the required role
- The RGSTY module reverts

</i>

```solidity
function deregisterContract(
        bytes5 name_
    ) external onlyPolicyActive onlyRole(CONTRACT_REGISTRY_ADMIN_ROLE);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `bytes5` | The name of the contract |

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
