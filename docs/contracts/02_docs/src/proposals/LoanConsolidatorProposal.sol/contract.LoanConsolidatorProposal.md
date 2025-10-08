# LoanConsolidatorProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/proposals/LoanConsolidatorProposal.sol)

**Inherits:**
GovernorBravoProposal

Activates an updated LoanConsolidator policy.

## State Variables

### _kernel

```solidity
Kernel internal _kernel;
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
