# MigrationProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/MigrationProposal.sol)

**Inherits:** GovernorBravoProposal

Proposal to enable V1Migrator for OHM v1 migration and execute gOHM burn

## Constants

### BURNER_ADMIN_ROLE

forge-lint: disable-next-line(unsafe-typecast)

```solidity
bytes32 public constant BURNER_ADMIN_ROLE = bytes32("burner_admin");
```

### INITIAL_MIGRATION_CAP

Initial migration cap for V1Migrator (in OHM v1, 9 decimals)

<i>

This is determined off-chain as the amount of OHM v1 outstanding

</i>

```solidity
uint256 public constant INITIAL_MIGRATION_CAP = 352614824540487;
```

## State Variables

### _kernel

```solidity
address internal _kernel;
```

### _v1Migrator

```solidity
V1Migrator internal _v1Migrator;
```

### _burner

```solidity
Burner internal _burner;
```

### _migrationProposalHelper

```solidity
MigrationProposalHelper internal _migrationProposalHelper;
```

## Functions

<a id="constructor"></a>

### constructor

```solidity
constructor();
```

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

### InvalidV1Migrator

```solidity
error InvalidV1Migrator();
```

### InvalidMigrationProposalHelper

```solidity
error InvalidMigrationProposalHelper();
```

### InvalidBurner

```solidity
error InvalidBurner();
```
