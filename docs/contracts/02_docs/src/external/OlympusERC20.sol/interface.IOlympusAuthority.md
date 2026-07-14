# IOlympusAuthority

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/external/OlympusERC20.sol)

Olympus OHM token

This contract is the legacy v2 OHM token. Included in the repo for completeness,
since it is not being changed and is imported in some contracts.

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
