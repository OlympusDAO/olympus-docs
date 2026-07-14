# OlympusAccessControlled

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/external/OlympusAuthority.sol)

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
