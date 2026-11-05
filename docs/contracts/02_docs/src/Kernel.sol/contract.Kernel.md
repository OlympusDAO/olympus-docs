# Kernel

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/Kernel.sol)

Main contract that acts as a central component registry for the protocol.

<i>

The kernel manages modules and policies. The kernel is mutated via predefined Actions,

</i>

<i>

which are input from any address assigned as the executor. The executor can be changed as needed.

</i>

## State Variables

### executor

Address that is able to initiate Actions in the kernel. Can be assigned to a multisig or governance contract.

```solidity
address public executor;
```

### allKeycodes

Array of all modules currently installed.

```solidity
Keycode[] public allKeycodes;
```

### getModuleForKeycode

Mapping of module address to keycode.

```solidity
mapping(Keycode => Module) public getModuleForKeycode;
```

### getKeycodeForModule

Mapping of keycode to module address.

```solidity
mapping(Module => Keycode) public getKeycodeForModule;
```

### moduleDependents

Mapping of a keycode to all of its policy dependents. Used to efficiently reconfigure policy dependencies.

```solidity
mapping(Keycode => Policy[]) public moduleDependents;
```

### getDependentIndex

Helper for module dependent arrays. Prevents the need to loop through array.

```solidity
mapping(Keycode => mapping(Policy => uint256)) public getDependentIndex;
```

### modulePermissions

Module &lt;> Policy Permissions.

<i>

Keycode -> Policy -> Function Selector -> bool for permission

</i>

```solidity
mapping(Keycode => mapping(Policy => mapping(bytes4 => bool))) public modulePermissions;
```

### activePolicies

List of all active policies

```solidity
Policy[] public activePolicies;
```

### getPolicyIndex

Helper to get active policy quickly. Prevents need to loop through array.

```solidity
mapping(Policy => uint256) public getPolicyIndex;
```

## Functions

<a id="constructor"></a>

### constructor

```solidity
constructor();
```

<a id="onlyexecutor"></a>

### onlyExecutor

Modifier to check if caller is the executor.

```solidity
modifier onlyExecutor();
```

<a id="ispolicyactive-policy"></a>

### isPolicyActive

```solidity
function isPolicyActive(Policy policy_) public view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `Policy` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="executeaction-actions-address"></a>

### executeAction

Main kernel function. Initiates state changes to kernel depending on Action passed in.

```solidity
function executeAction(Actions action_, address target_) external onlyExecutor;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| action_ | `Actions` |  |
| target_ | `address` |  |

<a id="_installmodule-module"></a>

### _installModule

```solidity
function _installModule(Module newModule_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newModule_ | `Module` |  |

<a id="_upgrademodule-module"></a>

### _upgradeModule

```solidity
function _upgradeModule(Module newModule_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newModule_ | `Module` |  |

<a id="_activatepolicy-policy"></a>

### _activatePolicy

```solidity
function _activatePolicy(Policy policy_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `Policy` |  |

<a id="_deactivatepolicy-policy"></a>

### _deactivatePolicy

```solidity
function _deactivatePolicy(Policy policy_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `Policy` |  |

<a id="_migratekernel-kernel"></a>

### _migrateKernel

All functionality will move to the new kernel. WARNING: ACTION WILL BRICK THIS KERNEL.

<i>

New kernel must add in all of the modules and policies via executeAction.

</i>

<i>

NOTE: Data does not get cleared from this kernel.

</i>

```solidity
function _migrateKernel(Kernel newKernel_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newKernel_ | `Kernel` |  |

<a id="_reconfigurepolicies-keycode"></a>

### _reconfigurePolicies

```solidity
function _reconfigurePolicies(Keycode keycode_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| keycode_ | `Keycode` |  |

<a id="_setpolicypermissions-policy-permissions-bool"></a>

### _setPolicyPermissions

```solidity
function _setPolicyPermissions(
        Policy policy_,
        Permissions[] memory requests_,
        bool grant_
    ) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `Policy` |  |
| requests_ | `Permissions[]` |  |
| grant_ | `bool` |  |

<a id="_prunefromdependents-policy"></a>

### _pruneFromDependents

```solidity
function _pruneFromDependents(Policy policy_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `Policy` |  |

## Events

### PermissionsUpdated

```solidity
event PermissionsUpdated(
        Keycode indexed keycode_,
        Policy indexed policy_,
        bytes4 funcSelector_,
        bool granted_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| keycode_ | `Keycode` |  |
| policy_ | `Policy` |  |
| funcSelector_ | `bytes4` |  |
| granted_ | `bool` |  |

### ActionExecuted

```solidity
event ActionExecuted(Actions indexed action_, address indexed target_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| action_ | `Actions` |  |
| target_ | `address` |  |

## Errors

### Kernel_OnlyExecutor

```solidity
error Kernel_OnlyExecutor(address caller_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` |  |

### Kernel_ModuleAlreadyInstalled

```solidity
error Kernel_ModuleAlreadyInstalled(Keycode module_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| module_ | `Keycode` |  |

### Kernel_InvalidModuleUpgrade

```solidity
error Kernel_InvalidModuleUpgrade(Keycode module_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| module_ | `Keycode` |  |

### Kernel_PolicyAlreadyActivated

```solidity
error Kernel_PolicyAlreadyActivated(address policy_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` |  |

### Kernel_PolicyNotActivated

```solidity
error Kernel_PolicyNotActivated(address policy_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` |  |
