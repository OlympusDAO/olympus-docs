# MigrationProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/proposals/MigrationProposal.sol)

**Inherits:**
GovernorBravoProposal

forge-lint: disable-start(mixed-case-function,mixed-case-variable)

Proposal to enable V1Migrator for OHM v1 migration and execute gOHM burn

## State Variables

### _kernel

```solidity
address internal _kernel
```

### _v1Migrator

```solidity
V1Migrator internal _v1Migrator
```

### _burner

```solidity
Burner internal _burner
```

### _migrationProposalHelper

```solidity
MigrationProposalHelper internal _migrationProposalHelper
```

### BURNER_ADMIN_ROLE

forge-lint: disable-next-line(unsafe-typecast)

```solidity
bytes32 public constant BURNER_ADMIN_ROLE = bytes32("burner_admin")
```

### INITIAL_MIGRATION_CAP

Initial migration cap for V1Migrator (in OHM v1, 9 decimals)

This is determined off-chain as the amount of OHM v1 outstanding

```solidity
uint256 public constant INITIAL_MIGRATION_CAP = 352614824540487
```

## Functions

### constructor

```solidity
constructor() ;
```

### id

```solidity
function id() public pure override returns (uint256);
```

### name

```solidity
function name() public pure override returns (string memory);
```

### description

```solidity
function description() public pure override returns (string memory);
```

### _deploy

```solidity
function _deploy(Addresses addresses, address) internal override;
```

### _afterDeploy

```solidity
function _afterDeploy(Addresses addresses, address deployer) internal override;
```

### _build

```solidity
function _build(Addresses addresses) internal override;
```

### _run

```solidity
function _run(Addresses addresses, address) internal override;
```

### _validate

```solidity
function _validate(Addresses addresses, address) internal view override;
```

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
