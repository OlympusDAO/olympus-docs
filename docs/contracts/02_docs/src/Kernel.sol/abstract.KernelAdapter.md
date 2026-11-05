# KernelAdapter

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/Kernel.sol)

Generic adapter interface for kernel access in modules and policies.

## State Variables

### kernel

```solidity
Kernel public kernel;
```

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_);
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| kernel_ | `Kernel` |             |

<a id="onlykernel"></a>

### onlyKernel

Modifier to restrict functions to be called only by kernel.

```solidity
modifier onlyKernel();
```

<a id="changekernel-kernel"></a>

### changeKernel

Function used by kernel when migrating to a new kernel.

```solidity
function changeKernel(Kernel newKernel_) external onlyKernel;
```

**Parameters**

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| newKernel_ | `Kernel` |             |

## Errors

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| caller_ | `address` |             |
