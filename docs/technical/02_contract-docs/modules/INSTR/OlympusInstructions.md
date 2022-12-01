# OlympusInstructions





Caches and executes batched instructions for protocol upgrades in the Kernel.



## Methods

### INIT

```solidity
function INIT() external nonpayable
```

Initialization function for the module

*This function is called when the module is installed or upgraded by the kernel.MUST BE GATED BY onlyKernel. Used to encompass any initialization or upgrade logic.*


### KEYCODE

```solidity
function KEYCODE() external pure returns (Keycode)
```

5 byte identifier for a module.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |

### VERSION

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor)
```

Returns which semantic version of a module is being implemented.




#### Returns

| Name | Type | Description |
|---|---|---|
| major | uint8 | - Major version upgrade indicates breaking change to the interface. |
| minor | uint8 | - Minor version change retains backward-compatible interface. |

### changeKernel

```solidity
function changeKernel(contract Kernel newKernel_) external nonpayable
```

Function used by kernel when migrating to a new kernel.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newKernel_ | contract Kernel | undefined |

### getInstructions

```solidity
function getInstructions(uint256 instructionsId_) external view returns (struct Instruction[])
```

View function for retrieving a list of Instructions in an outside contract.



#### Parameters

| Name | Type | Description |
|---|---|---|
| instructionsId_ | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Instruction[] | undefined |

### kernel

```solidity
function kernel() external view returns (contract Kernel)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Kernel | undefined |

### store

```solidity
function store(Instruction[] instructions_) external nonpayable returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| instructions_ | Instruction[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### storedInstructions

```solidity
function storedInstructions(uint256, uint256) external view returns (enum Actions action, address target)
```

All stored instructions per count in totalInstructions



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |
| _1 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| action | enum Actions | undefined |
| target | address | undefined |

### totalInstructions

```solidity
function totalInstructions() external view returns (uint256)
```

Counter of total instructions




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |



## Events

### InstructionsStored

```solidity
event InstructionsStored(uint256 instructionsId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| instructionsId  | uint256 | undefined |



## Errors

### INSTR_InstructionsCannotBeEmpty

```solidity
error INSTR_InstructionsCannotBeEmpty()
```






### INSTR_InvalidAction

```solidity
error INSTR_InvalidAction()
```






### InvalidKeycode

```solidity
error InvalidKeycode(Keycode keycode_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| keycode_ | Keycode | undefined |

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### Module_PolicyNotPermitted

```solidity
error Module_PolicyNotPermitted(address policy_)
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


