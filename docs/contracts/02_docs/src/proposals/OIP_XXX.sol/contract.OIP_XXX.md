# OIP_XXX

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/proposals/OIP_XXX.sol)

**Inherits:**
GovernorBravoProposal

OIP_XXX proposal performs all the necessary steps to upgrade the Clearinghouse.

## State Variables

### cacheCH0

```solidity
Cache public cacheCH0;
```

### cacheTRSRY

```solidity
Cache public cacheTRSRY;
```

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
function _afterDeploy(Addresses addresses, address) internal override;
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
function _validate(Addresses addresses, address) internal override;
```

## Structs

### Cache

```solidity
struct Cache {
    uint256 daiBalance;
    uint256 sdaiBalance;
}
```
