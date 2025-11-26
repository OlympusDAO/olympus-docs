# OlympusBoostedLiquidityRegistry

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/modules/BLREG/OlympusBoostedLiquidityRegistry.sol)

**Inherits:**
[BLREGv1](/main/contracts/docs/src/modules/BLREG/BLREG.v1.sol/abstract.BLREGv1)

**Title:**
Olympus Boosted Liquidity Vault Registry

Olympus Boosted Liquidity Vault Registry (Module) Contract

The Olympus Boosted Liquidity Vault Registry Module tracks the boosted liquidity vaults
that are approved to be used by the Olympus protocol. This allows for a single-soure
of truth for reporting purposes around total OHM deployed and net emissions.

## Functions

### constructor

```solidity
constructor(Kernel kernel_) Module(kernel_);
```

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() public pure override returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|- Major version upgrade indicates breaking change to the interface.|
|`minor`|`uint8`|- Minor version change retains backward-compatible interface.|

### addVault

Adds an vault to the registry

```solidity
function addVault(address vault_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault_`|`address`|  The address of the vault to add|

### removeVault

Removes an vault from the registry

```solidity
function removeVault(address vault_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault_`|`address`|  The address of the vault to remove|
