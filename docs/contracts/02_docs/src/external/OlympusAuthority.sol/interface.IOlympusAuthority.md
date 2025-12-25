# IOlympusAuthority

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/external/OlympusAuthority.sol)

OlympusAuthority

Legacy authority contract

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
