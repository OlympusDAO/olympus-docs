# OlympusBoostedLiquidityRegistry

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/BLREG/OlympusBoostedLiquidityRegistry.sol)

**Inherits:** [BLREGv1](/main/contracts/docs/src/modules/BLREG/BLREG.v1.sol/abstract.BLREGv1)

**Title:** Olympus Boosted Liquidity Vault Registry

Olympus Boosted Liquidity Vault Registry (Module) Contract

<i>

The Olympus Boosted Liquidity Vault Registry Module tracks the boosted liquidity vaults
that are approved to be used by the Olympus protocol. This allows for a single-soure
of truth for reporting purposes around total OHM deployed and net emissions.

</i>

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) Module(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |

<a id="keycode"></a>

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Keycode` |  |

<a id="version"></a>

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() public pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="addvault-address"></a>

### addVault

Adds an vault to the registry

```solidity
function addVault(address vault_) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault_ | `address` | The address of the vault to add |

<a id="removevault-address"></a>

### removeVault

Removes an vault from the registry

```solidity
function removeVault(address vault_) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault_ | `address` | The address of the vault to remove |
