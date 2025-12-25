# BLREGv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/modules/BLREG/BLREG.v1.sol)

**Inherits:**
[Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

**Title:**
Olympus Boosted Liquidity Vault Registry

Olympus Boosted Liquidity Vault Registry (Module) Contract

The Olympus Boosted Liquidity Vault Registry Module tracks the boosted liquidity vaults
that are approved to be used by the Olympus protocol. This allows for a single-soure
of truth for reporting purposes around total OHM deployed and net emissions.

## State Variables

### activeVaultCount

Count of active vaults

This is a useless variable in contracts but useful for any frontends or
off-chain requests where the array is not easily accessible.

```solidity
uint256 public activeVaultCount
```

### activeVaults

Tracks all active vaults

```solidity
address[] public activeVaults
```

## Functions

### addVault

Adds an vault to the registry

```solidity
function addVault(address vault_) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault_`|`address`|  The address of the vault to add|

### removeVault

Removes an vault from the registry

```solidity
function removeVault(address vault_) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault_`|`address`|  The address of the vault to remove|

## Events

### VaultAdded

```solidity
event VaultAdded(address indexed vault);
```

### VaultRemoved

```solidity
event VaultRemoved(address indexed vault);
```
