# IOlympusAuthority

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/external/OlympusAuthority.sol)

OlympusAuthority

*Legacy authority contract*

## Functions

### governor

```solidity
function governor() external view returns (address);
```

### guardian

```solidity
function guardian() external view returns (address);
```

### policy

```solidity
function policy() external view returns (address);
```

### vault

```solidity
function vault() external view returns (address);
```

## Events

### GovernorPushed

```solidity
event GovernorPushed(address indexed from, address indexed to, bool _effectiveImmediately);
```

### GuardianPushed

```solidity
event GuardianPushed(address indexed from, address indexed to, bool _effectiveImmediately);
```

### PolicyPushed

```solidity
event PolicyPushed(address indexed from, address indexed to, bool _effectiveImmediately);
```

### VaultPushed

```solidity
event VaultPushed(address indexed from, address indexed to, bool _effectiveImmediately);
```

### GovernorPulled

```solidity
event GovernorPulled(address indexed from, address indexed to);
```

### GuardianPulled

```solidity
event GuardianPulled(address indexed from, address indexed to);
```

### PolicyPulled

```solidity
event PolicyPulled(address indexed from, address indexed to);
```

### VaultPulled

```solidity
event VaultPulled(address indexed from, address indexed to);
```
