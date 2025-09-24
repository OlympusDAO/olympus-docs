# Emergency

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/Emergency.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## State Variables

### TRSRY

```solidity
TRSRYv1 public TRSRY;
```

### MINTR

```solidity
MINTRv1 public MINTR;
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_) Policy(kernel_);
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
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`requests`|`Permissions[]`|- Array of keycodes and function selectors for requested permissions.|

### shutdown

Emergency shutdown of treasury withdrawals and minting

```solidity
function shutdown() external onlyRole("emergency_shutdown");
```

### shutdownWithdrawals

Emergency shutdown of treasury withdrawals

```solidity
function shutdownWithdrawals() external onlyRole("emergency_shutdown");
```

### shutdownMinting

Emergency shutdown of minting

```solidity
function shutdownMinting() external onlyRole("emergency_shutdown");
```

### restart

Restart treasury withdrawals and minting after shutdown

```solidity
function restart() external onlyRole("emergency_restart");
```

### restartWithdrawals

Restart treasury withdrawals after shutdown

```solidity
function restartWithdrawals() external onlyRole("emergency_restart");
```

### restartMinting

Restart minting after shutdown

```solidity
function restartMinting() external onlyRole("emergency_restart");
```

### _reportStatus

Emit an event to show the current status of TRSRY and MINTR

```solidity
function _reportStatus() internal;
```

## Events

### Status

```solidity
event Status(bool treasury_, bool minter_);
```
