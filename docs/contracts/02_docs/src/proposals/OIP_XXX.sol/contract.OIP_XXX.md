# OIP_XXX

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/proposals/OIP_XXX.sol)

**Inherits:**
GovernorBravoProposal

OIP_XXX proposal performs all the necessary steps to upgrade the Clearinghouse.

## State Variables

### cacheCH0

```solidity
Cache public cacheCH0
```

### cacheTRSRY

```solidity
Cache public cacheTRSRY
```

### _kernel

```solidity
Kernel internal _kernel
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
