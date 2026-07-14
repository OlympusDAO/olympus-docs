# SolanaCCIPBridgeProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/proposals/CCIPBridgeSolana.sol)

**Inherits:**
GovernorBravoProposal

Proposal for activation of the CCIP Bridge for Solana

## State Variables

### \_kernel

```solidity
address public _kernel
```

## Functions

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

### \_deploy

```solidity
function _deploy(Addresses addresses, address) internal override;
```

### \_afterDeploy

```solidity
function _afterDeploy(Addresses addresses, address deployer) internal override;
```

### \_build

```solidity
function _build(Addresses addresses) internal override;
```

### \_run

```solidity
function _run(Addresses addresses, address) internal override;
```

### \_validate

```solidity
function _validate(Addresses addresses, address) internal view override;
```
