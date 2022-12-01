# Kernel





Main contract that acts as a central component registry for the protocol.

*The kernel manages modules and policies. The kernel is mutated via predefined Actions,which are input from any address assigned as the executor. The executor can be changed as needed.*

## Methods

### activePolicies

```solidity
function activePolicies(uint256) external view returns (contract Policy)
```

List of all active policies



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Policy | undefined |

### allKeycodes

```solidity
function allKeycodes(uint256) external view returns (Keycode)
```

Array of all modules currently installed.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |

### executeAction

```solidity
function executeAction(enum Actions action_, address target_) external nonpayable
```

Main kernel function. Initiates state changes to kernel depending on Action passed in.



#### Parameters

| Name | Type | Description |
|---|---|---|
| action_ | enum Actions | undefined |
| target_ | address | undefined |

### executor

```solidity
function executor() external view returns (address)
```

Address that is able to initiate Actions in the kernel. Can be assigned to a multisig or governance contract.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### getDependentIndex

```solidity
function getDependentIndex(Keycode, contract Policy) external view returns (uint256)
```

Helper for module dependent arrays. Prevents the need to loop through array.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |
| _1 | contract Policy | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getKeycodeForModule

```solidity
function getKeycodeForModule(contract Module) external view returns (Keycode)
```

Mapping of keycode to module address.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | contract Module | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |

### getModuleForKeycode

```solidity
function getModuleForKeycode(Keycode) external view returns (contract Module)
```

Mapping of module address to keycode.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Module | undefined |

### getPolicyIndex

```solidity
function getPolicyIndex(contract Policy) external view returns (uint256)
```

Helper to get active policy quickly. Prevents need to loop through array.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | contract Policy | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### isPolicyActive

```solidity
function isPolicyActive(contract Policy policy_) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ | contract Policy | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### moduleDependents

```solidity
function moduleDependents(Keycode, uint256) external view returns (contract Policy)
```

Mapping of a keycode to all of its policy dependents. Used to efficiently reconfigure policy dependencies.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |
| _1 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Policy | undefined |

### modulePermissions

```solidity
function modulePermissions(Keycode, contract Policy, bytes4) external view returns (bool)
```

Module &lt;&gt; Policy Permissions.

*Keycode -&gt; Policy -&gt; Function Selector -&gt; bool for permission*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |
| _1 | contract Policy | undefined |
| _2 | bytes4 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |



## Events

### ActionExecuted

```solidity
event ActionExecuted(enum Actions indexed action_, address indexed target_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| action_ `indexed` | enum Actions | undefined |
| target_ `indexed` | address | undefined |

### PermissionsUpdated

```solidity
event PermissionsUpdated(Keycode indexed keycode_, contract Policy indexed policy_, bytes4 funcSelector_, bool granted_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| keycode_ `indexed` | Keycode | undefined |
| policy_ `indexed` | contract Policy | undefined |
| funcSelector_  | bytes4 | undefined |
| granted_  | bool | undefined |



## Errors

### InvalidKeycode

```solidity
error InvalidKeycode(Keycode keycode_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| keycode_ | Keycode | undefined |

### Kernel_InvalidModuleUpgrade

```solidity
error Kernel_InvalidModuleUpgrade(Keycode module_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| module_ | Keycode | undefined |

### Kernel_ModuleAlreadyInstalled

```solidity
error Kernel_ModuleAlreadyInstalled(Keycode module_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| module_ | Keycode | undefined |

### Kernel_OnlyExecutor

```solidity
error Kernel_OnlyExecutor(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### Kernel_PolicyAlreadyActivated

```solidity
error Kernel_PolicyAlreadyActivated(address policy_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ | address | undefined |

### Kernel_PolicyNotActivated

```solidity
error Kernel_PolicyNotActivated(address policy_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ | address | undefined |

### TargetNotAContract

```solidity
error TargetNotAContract(address target_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| target_ | address | undefined |


