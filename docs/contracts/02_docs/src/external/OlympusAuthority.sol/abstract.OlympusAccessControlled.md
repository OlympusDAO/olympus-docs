# OlympusAccessControlled

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/external/OlympusAuthority.sol)

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
