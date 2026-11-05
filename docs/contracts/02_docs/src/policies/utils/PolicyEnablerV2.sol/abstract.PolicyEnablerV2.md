# PolicyEnablerV2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/utils/PolicyEnablerV2.sol)

**Inherits:** [EnablerV2](/main/contracts/docs/src/bases/EnablerV2.sol/abstract.EnablerV2), [PolicyAdminOptimized](/main/contracts/docs/src/policies/utils/PolicyAdminOptimized.sol/abstract.PolicyAdminOptimized)

**Title:** PolicyEnablerV2

An abstract policy mix-in that wires `EnablerV2` to the role-based
access control exposed by `PolicyAdminOptimized`.

<i>

The mix-in restricts `enable` to the admin role and `disable` to
either the admin or the emergency role, matching the access pattern
of the legacy `PolicyEnabler`. Inheriting policies are expected to
override `_beforeEnable` and `_beforeDisable` when implementation
specific state changes are required, and to assign the `ROLES`
module address inside `configureDependencies`.

</i>

The mix-in does not introduce any storage variables of its own and
does not modify the `IEnabler` wire-level surface, so legacy callers
that target the `IEnabler` interface continue to interoperate with
policies that derive from this contract.

## Functions

<a id="_authorizeenable-bytes"></a>

### _authorizeEnable

Validates that the caller is permitted to enable the contract.

Reverts if:

- The caller is not authorized to perform the enable.

<i>

Reverts if:

- The caller does not hold the admin role.

</i>

```solidity
function _authorizeEnable(bytes calldata) internal view override onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` | The calldata payload passed to `enable`. |

<a id="_authorizedisable-bytes"></a>

### _authorizeDisable

Validates that the caller is permitted to disable the contract.

Reverts if:

- The caller is not authorized to perform the disable.

<i>

Reverts if:

- The caller holds neither the admin role nor the emergency role.

</i>

```solidity
function _authorizeDisable(bytes calldata) internal view override onlyEmergencyOrAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` | The calldata payload passed to `disable`. |
