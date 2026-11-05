# OlympusAuthority

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/OlympusAuthority.sol)

**Inherits:** [IOlympusAuthority](/main/contracts/docs/src/external/OlympusAuthority.sol/interface.IOlympusAuthority), [OlympusAccessControlled](/main/contracts/docs/src/external/OlympusAuthority.sol/abstract.OlympusAccessControlled)

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

<a id="constructor-address-address-address-address"></a>

### constructor

```solidity
constructor(
        address _governor,
        address _guardian,
        address _policy,
        address _vault
    ) OlympusAccessControlled(IOlympusAuthority(address(this)));
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| _governor | `address` |             |
| _guardian | `address` |             |
| _policy   | `address` |             |
| _vault    | `address` |             |

<a id="pushgovernor-address-bool"></a>

### pushGovernor

```solidity
function pushGovernor(address _newGovernor, bool _effectiveImmediately) external onlyGovernor;
```

**Parameters**

| Name                  | Type      | Description |
| --------------------- | --------- | ----------- |
| _newGovernor          | `address` |             |
| _effectiveImmediately | `bool`    |             |

<a id="pushguardian-address-bool"></a>

### pushGuardian

```solidity
function pushGuardian(address _newGuardian, bool _effectiveImmediately) external onlyGovernor;
```

**Parameters**

| Name                  | Type      | Description |
| --------------------- | --------- | ----------- |
| _newGuardian          | `address` |             |
| _effectiveImmediately | `bool`    |             |

<a id="pushpolicy-address-bool"></a>

### pushPolicy

```solidity
function pushPolicy(address _newPolicy, bool _effectiveImmediately) external onlyGovernor;
```

**Parameters**

| Name                  | Type      | Description |
| --------------------- | --------- | ----------- |
| _newPolicy            | `address` |             |
| _effectiveImmediately | `bool`    |             |

<a id="pushvault-address-bool"></a>

### pushVault

```solidity
function pushVault(address _newVault, bool _effectiveImmediately) external onlyGovernor;
```

**Parameters**

| Name                  | Type      | Description |
| --------------------- | --------- | ----------- |
| _newVault             | `address` |             |
| _effectiveImmediately | `bool`    |             |

<a id="pullgovernor"></a>

### pullGovernor

```solidity
function pullGovernor() external;
```

<a id="pullguardian"></a>

### pullGuardian

```solidity
function pullGuardian() external;
```

<a id="pullpolicy"></a>

### pullPolicy

```solidity
function pullPolicy() external;
```

<a id="pullvault"></a>

### pullVault

```solidity
function pullVault() external;
```
