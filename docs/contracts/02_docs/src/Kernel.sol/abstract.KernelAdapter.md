# KernelAdapter

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/Kernel.sol)

Generic adapter interface for kernel access in modules and policies.

## State Variables

### kernel

```solidity
Kernel public kernel
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_) ;
```

### onlyKernel

Modifier to restrict functions to be called only by kernel.

```solidity
modifier onlyKernel() ;
```

### changeKernel

Function used by kernel when migrating to a new kernel.

```solidity
function changeKernel(Kernel newKernel_) external onlyKernel;
```

## Errors

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_);
```
