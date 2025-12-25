# CHREGv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/modules/CHREG/CHREG.v1.sol)

**Inherits:**
[Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

**Title:**
Olympus Clearinghouse Registry

Olympus Clearinghouse Registry (Module) Contract

The Olympus Clearinghouse Registry Module tracks the lending facilities that the Olympus
protocol deploys to satisfy the Cooler Loan demand. This allows for a single-source of truth
for reporting purposes around the total Treasury holdings as well as its projected receivables.

## State Variables

### activeCount

Count of active and historical clearinghouses.

These are useless variables in contracts, but useful for any frontends
or off-chain requests where the array is not easily accessible.

```solidity
uint256 public activeCount
```

### registryCount

```solidity
uint256 public registryCount
```

### active

Tracks the addresses of all the active Clearinghouses.

```solidity
address[] public active
```

### registry

Historical record of all the Clearinghouse addresses.

```solidity
address[] public registry
```

## Functions

### activateClearinghouse

Adds a Clearinghouse to the registry.
Only callable by permissioned policies.

```solidity
function activateClearinghouse(address clearinghouse_) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`clearinghouse_`|`address`|The address of the clearinghouse.|

### deactivateClearinghouse

Deactivates a clearinghouse from the registry.
Only callable by permissioned policies.

```solidity
function deactivateClearinghouse(address clearinghouse_) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`clearinghouse_`|`address`|The address of the clearinghouse.|

## Events

### ClearinghouseActivated

Logs whenever a Clearinghouse is activated.
If it is the first time, it is also added to the registry.

```solidity
event ClearinghouseActivated(address indexed clearinghouse);
```

### ClearinghouseDeactivated

Logs whenever an active Clearinghouse is deactivated.

```solidity
event ClearinghouseDeactivated(address indexed clearinghouse);
```

## Errors

### CHREG_InvalidConstructor

```solidity
error CHREG_InvalidConstructor();
```

### CHREG_NotActivated

```solidity
error CHREG_NotActivated(address clearinghouse_);
```

### CHREG_AlreadyActivated

```solidity
error CHREG_AlreadyActivated(address clearinghouse_);
```
