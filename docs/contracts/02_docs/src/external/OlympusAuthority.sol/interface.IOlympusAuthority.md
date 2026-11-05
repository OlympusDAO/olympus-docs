# IOlympusAuthority

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/OlympusAuthority.sol)

OlympusAuthority

<i>

Legacy authority contract

</i>

## Functions

<a id="governor"></a>

### governor

```solidity
function governor() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="guardian"></a>

### guardian

```solidity
function guardian() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="policy"></a>

### policy

```solidity
function policy() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="vault"></a>

### vault

```solidity
function vault() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

## Events

### GovernorPushed

```solidity
event GovernorPushed(address indexed from, address indexed to, bool _effectiveImmediately);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |
| _effectiveImmediately | `bool` |  |

### GuardianPushed

```solidity
event GuardianPushed(address indexed from, address indexed to, bool _effectiveImmediately);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |
| _effectiveImmediately | `bool` |  |

### PolicyPushed

```solidity
event PolicyPushed(address indexed from, address indexed to, bool _effectiveImmediately);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |
| _effectiveImmediately | `bool` |  |

### VaultPushed

```solidity
event VaultPushed(address indexed from, address indexed to, bool _effectiveImmediately);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |
| _effectiveImmediately | `bool` |  |

### GovernorPulled

```solidity
event GovernorPulled(address indexed from, address indexed to);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |

### GuardianPulled

```solidity
event GuardianPulled(address indexed from, address indexed to);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |

### PolicyPulled

```solidity
event PolicyPulled(address indexed from, address indexed to);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |

### VaultPulled

```solidity
event VaultPulled(address indexed from, address indexed to);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |
