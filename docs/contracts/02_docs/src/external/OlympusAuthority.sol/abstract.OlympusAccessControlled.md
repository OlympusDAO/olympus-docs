# OlympusAccessControlled

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/external/OlympusAuthority.sol)

## State Variables

### UNAUTHORIZED

```solidity
string internal UNAUTHORIZED = "UNAUTHORIZED"
```

### authority

```solidity
IOlympusAuthority public authority
```

## Functions

### constructor

```solidity
constructor(IOlympusAuthority _authority) ;
```

### onlyGovernor

```solidity
modifier onlyGovernor() ;
```

### onlyGuardian

```solidity
modifier onlyGuardian() ;
```

### onlyPermitted

```solidity
modifier onlyPermitted() ;
```

### onlyVault

```solidity
modifier onlyVault() ;
```

### setAuthority

```solidity
function setAuthority(IOlympusAuthority _newAuthority) external onlyGovernor;
```

## Events

### AuthorityUpdated

```solidity
event AuthorityUpdated(IOlympusAuthority indexed authority);
```
