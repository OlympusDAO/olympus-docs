# V1MigratorAdminProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/V1MigratorAdminProposal.sol)

**Inherits:** GovernorBravoProposal

Configures V1Migrator for the final OHM v1 migration.

## Constants

### LEGACY_MIGRATION_ADMIN_ROLE

forge-lint: disable-next-line(unsafe-typecast)

```solidity
bytes32 public constant LEGACY_MIGRATION_ADMIN_ROLE = bytes32("legacy_migration_admin");
```

### MAX_MIGRATABLE_OHM_V1

```solidity
uint256 public constant MAX_MIGRATABLE_OHM_V1 = 102_397_596_876_863;
```

## State Variables

### _kernel

```solidity
Kernel internal _kernel;
```

## Functions

<a id="id"></a>

### id

```solidity
function id() public pure override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="name"></a>

### name

```solidity
function name() public pure override returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="description"></a>

### description

```solidity
function description() public pure override returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="_deploy-addresses-address"></a>

### _deploy

```solidity
function _deploy(Addresses addresses, address) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addresses | `Addresses` |  |
| _ | `address` |  |

<a id="_afterdeploy-addresses-address"></a>

### _afterDeploy

```solidity
function _afterDeploy(Addresses addresses, address deployer) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addresses | `Addresses` |  |
| deployer | `address` |  |

<a id="_build-addresses"></a>

### _build

```solidity
function _build(Addresses addresses) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addresses | `Addresses` |  |

<a id="_run-addresses-address"></a>

### _run

```solidity
function _run(Addresses addresses, address) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addresses | `Addresses` |  |
| _ | `address` |  |

<a id="_validate-addresses-address"></a>

### _validate

```solidity
function _validate(Addresses addresses, address) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addresses | `Addresses` |  |
| _ | `address` |  |

## Errors

### DaoMsMissingLegacyMigrationAdminRole

```solidity
error DaoMsMissingLegacyMigrationAdminRole();
```

### InvalidRemainingMintApproval

```solidity
error InvalidRemainingMintApproval(uint256 actual, uint256 expected);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actual | `uint256` |  |
| expected | `uint256` |  |
