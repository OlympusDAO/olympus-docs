# IConfigOperator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/utils/IConfigOperator.sol)

**Title:** Config Operator

Shared surface for contracts that delegate configuration changes to one operator.

## Functions

<a id="configoperator"></a>

### configOperator

Returns the address allowed to execute delegated configuration changes.

```solidity
function configOperator() external view returns (address configOperator_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configOperator_ | `address` | Config operator, or zero when delegated access is revoked. |

<a id="setconfigoperator-address"></a>

### setConfigOperator

Immediately replaces the delegated configuration operator.

<i>

The implementation defines caller authorization. Setting zero revokes delegated access.
After authorization, setting the current operator reverts with `ConfigOperator_Unchanged`.

</i>

```solidity
function setConfigOperator(address configOperator_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configOperator_ | `address` | New config operator address. |

## Events

### ConfigOperatorSet

Emitted when the delegated configuration operator changes.

```solidity
event ConfigOperatorSet(address indexed configOperator);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configOperator | `address` | New operator, or zero when delegated access is revoked. |

## Errors

### ConfigOperator_Unauthorized

Thrown when an account is not the configured operator or cannot rotate it.

```solidity
error ConfigOperator_Unauthorized(address caller_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | Unauthorized account. |

### ConfigOperator_Unchanged

Thrown when the requested operator is already configured, including the zero address.

```solidity
error ConfigOperator_Unchanged();
```
