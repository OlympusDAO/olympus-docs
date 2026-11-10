# CHREGv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/CHREG/CHREG.v1.sol)

**Inherits:** [Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

**Title:** Olympus Clearinghouse Registry

Olympus Clearinghouse Registry (Module) Contract

<i>

The Olympus Clearinghouse Registry Module tracks the lending facilities that the Olympus
protocol deploys to satisfy the Cooler Loan demand. This allows for a single-source of truth
for reporting purposes around the total Treasury holdings as well as its projected receivables.

</i>

## State Variables

### activeCount

Count of active and historical clearinghouses.

<i>

These are useless variables in contracts, but useful for any frontends
or off-chain requests where the array is not easily accessible.

</i>

```solidity
uint256 public activeCount;
```

### registryCount

```solidity
uint256 public registryCount;
```

### active

Tracks the addresses of all the active Clearinghouses.

```solidity
address[] public active;
```

### registry

Historical record of all the Clearinghouse addresses.

```solidity
address[] public registry;
```

## Functions

<a id="activateclearinghouse-address"></a>

### activateClearinghouse

Adds a Clearinghouse to the registry.
Only callable by permissioned policies.

```solidity
function activateClearinghouse(address clearinghouse_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse_ | `address` | The address of the clearinghouse. |

<a id="deactivateclearinghouse-address"></a>

### deactivateClearinghouse

Deactivates a clearinghouse from the registry.
Only callable by permissioned policies.

```solidity
function deactivateClearinghouse(address clearinghouse_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse_ | `address` | The address of the clearinghouse. |

## Events

### ClearinghouseActivated

Logs whenever a Clearinghouse is activated.
If it is the first time, it is also added to the registry.

```solidity
event ClearinghouseActivated(address indexed clearinghouse);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse | `address` |  |

### ClearinghouseDeactivated

Logs whenever an active Clearinghouse is deactivated.

```solidity
event ClearinghouseDeactivated(address indexed clearinghouse);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse | `address` |  |

## Errors

### CHREG_InvalidConstructor

```solidity
error CHREG_InvalidConstructor();
```

### CHREG_NotActivated

```solidity
error CHREG_NotActivated(address clearinghouse_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse_ | `address` |  |

### CHREG_AlreadyActivated

```solidity
error CHREG_AlreadyActivated(address clearinghouse_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse_ | `address` |  |
