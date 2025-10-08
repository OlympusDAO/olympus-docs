# OlympusAuthority

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/external/OlympusAuthority.sol)

**Inherits:**
[IOlympusAuthority](/main/contracts/docs/src/external/OlympusAuthority.sol/interface.IOlympusAuthority), [OlympusAccessControlled](/main/contracts/docs/src/external/OlympusAuthority.sol/abstract.OlympusAccessControlled)

## State Variables

### governor

```solidity
address public override governor;
```

### guardian

```solidity
address public override guardian;
```

### policy

```solidity
address public override policy;
```

### vault

```solidity
address public override vault;
```

### newGovernor

```solidity
address public newGovernor;
```

### newGuardian

```solidity
address public newGuardian;
```

### newPolicy

```solidity
address public newPolicy;
```

### newVault

```solidity
address public newVault;
```

## Functions

### constructor

```solidity
constructor(address _governor, address _guardian, address _policy, address _vault)
    OlympusAccessControlled(IOlympusAuthority(address(this)));
```

### pushGovernor

```solidity
function pushGovernor(address _newGovernor, bool _effectiveImmediately) external onlyGovernor;
```

### pushGuardian

```solidity
function pushGuardian(address _newGuardian, bool _effectiveImmediately) external onlyGovernor;
```

### pushPolicy

```solidity
function pushPolicy(address _newPolicy, bool _effectiveImmediately) external onlyGovernor;
```

### pushVault

```solidity
function pushVault(address _newVault, bool _effectiveImmediately) external onlyGovernor;
```

### pullGovernor

```solidity
function pullGovernor() external;
```

### pullGuardian

```solidity
function pullGuardian() external;
```

### pullPolicy

```solidity
function pullPolicy() external;
```

### pullVault

```solidity
function pullVault() external;
```
