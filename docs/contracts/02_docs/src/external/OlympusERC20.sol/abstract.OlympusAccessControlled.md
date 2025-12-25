# OlympusAccessControlled

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/external/OlympusERC20.sol)

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
