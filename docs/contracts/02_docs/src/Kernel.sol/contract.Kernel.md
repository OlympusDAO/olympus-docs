# Kernel

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/Kernel.sol)

Main contract that acts as a central component registry for the protocol.

*The kernel manages modules and policies. The kernel is mutated via predefined Actions,*

*which are input from any address assigned as the executor. The executor can be changed as needed.*

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

Module \\<\\> Policy Permissions.

*Keycode -> Policy -> Function Selector -> bool for permission*

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

### constructor

```solidity
constructor();
```

### onlyExecutor

Modifier to check if caller is the executor.

```solidity
modifier onlyExecutor();
```

### isPolicyActive

```solidity
function isPolicyActive(Policy policy_) public view returns (bool);
```

### executeAction

Main kernel function. Initiates state changes to kernel depending on Action passed in.

```solidity
function executeAction(Actions action_, address target_) external onlyExecutor;
```

### _installModule

```solidity
function _installModule(Module newModule_) internal;
```

### _upgradeModule

```solidity
function _upgradeModule(Module newModule_) internal;
```

### _activatePolicy

```solidity
function _activatePolicy(Policy policy_) internal;
```

### _deactivatePolicy

```solidity
function _deactivatePolicy(Policy policy_) internal;
```

### _migrateKernel

All functionality will move to the new kernel. WARNING: ACTION WILL BRICK THIS KERNEL.

*New kernel must add in all of the modules and policies via executeAction.*

*NOTE: Data does not get cleared from this kernel.*

```solidity
function _migrateKernel(Kernel newKernel_) internal;
```

### _reconfigurePolicies

```solidity
function _reconfigurePolicies(Keycode keycode_) internal;
```

### _setPolicyPermissions

```solidity
function _setPolicyPermissions(Policy policy_, Permissions[] memory requests_, bool grant_) internal;
```

### _pruneFromDependents

```solidity
function _pruneFromDependents(Policy policy_) internal;
```

## Events

### PermissionsUpdated

```solidity
event PermissionsUpdated(Keycode indexed keycode_, Policy indexed policy_, bytes4 funcSelector_, bool granted_);
```

### ActionExecuted

```solidity
event ActionExecuted(Actions indexed action_, address indexed target_);
```

## Errors

### Kernel_OnlyExecutor

```solidity
error Kernel_OnlyExecutor(address caller_);
```

### Kernel_ModuleAlreadyInstalled

```solidity
error Kernel_ModuleAlreadyInstalled(Keycode module_);
```

### Kernel_InvalidModuleUpgrade

```solidity
error Kernel_InvalidModuleUpgrade(Keycode module_);
```

### Kernel_PolicyAlreadyActivated

```solidity
error Kernel_PolicyAlreadyActivated(address policy_);
```

### Kernel_PolicyNotActivated

```solidity
error Kernel_PolicyNotActivated(address policy_);
```
