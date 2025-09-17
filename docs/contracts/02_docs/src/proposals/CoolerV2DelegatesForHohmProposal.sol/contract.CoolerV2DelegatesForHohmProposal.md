# CoolerV2DelegatesForHohmProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/proposals/CoolerV2DelegatesForHohmProposal.sol)

**Inherits:**
GovernorBravoProposal

Sets gOHM delegation limits for hOHM.

## State Variables

### _kernel

```solidity
Kernel internal _kernel;
```

### MAX_DELEGATE_ADDRESSES

```solidity
uint32 public constant MAX_DELEGATE_ADDRESSES = 1_000_000;
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
