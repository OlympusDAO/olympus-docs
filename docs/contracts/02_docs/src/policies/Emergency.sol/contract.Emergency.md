# Emergency

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/Emergency.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

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

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) Policy(kernel_);
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| kernel_ | `Kernel` |             |

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
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="shutdown"></a>

### shutdown

Emergency shutdown of treasury withdrawals and minting

```solidity
function shutdown() external onlyRole("emergency_shutdown");
```

<a id="shutdownwithdrawals"></a>

### shutdownWithdrawals

Emergency shutdown of treasury withdrawals

```solidity
function shutdownWithdrawals() external onlyRole("emergency_shutdown");
```

<a id="shutdownminting"></a>

### shutdownMinting

Emergency shutdown of minting

```solidity
function shutdownMinting() external onlyRole("emergency_shutdown");
```

<a id="restart"></a>

### restart

Restart treasury withdrawals and minting after shutdown

```solidity
function restart() external onlyRole("emergency_restart");
```

<a id="restartwithdrawals"></a>

### restartWithdrawals

Restart treasury withdrawals after shutdown

```solidity
function restartWithdrawals() external onlyRole("emergency_restart");
```

<a id="restartminting"></a>

### restartMinting

Restart minting after shutdown

```solidity
function restartMinting() external onlyRole("emergency_restart");
```

<a id="_reportstatus"></a>

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

**Parameters**

| Name      | Type   | Description |
| --------- | ------ | ----------- |
| treasury_ | `bool` |             |
| minter_   | `bool` |             |
