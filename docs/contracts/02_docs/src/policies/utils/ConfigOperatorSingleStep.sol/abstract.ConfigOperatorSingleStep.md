# ConfigOperatorSingleStep

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/utils/ConfigOperatorSingleStep.sol)

**Inherits:** [IConfigOperator](/main/contracts/docs/src/policies/interfaces/utils/IConfigOperator.sol/interface.IConfigOperator)

**Title:** Config Operator Single Step

Reusable single-step configuration-operator storage and rotation.

<i>

The operator starts unset. Implementations must explicitly override
`_authorizeSetConfigOperator` to permit rotation; the default implementation denies every
caller. An authorized rotation to the current operator, including an unset zero address,
reverts with `ConfigOperator_Unchanged`. Product setters remain responsible for composing
operator authority with any other accepted authority.

</i>

## State Variables

### configOperator

Returns the address allowed to execute delegated configuration changes.

```solidity
address public override configOperator;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | Config operator, or zero when delegated access is revoked. |

## Functions

<a id="setconfigoperator-address"></a>

### setConfigOperator

<i>

The zero address revokes delegated configuration access. Authorization is checked before
rejecting an operator that is already configured.

</i>

Reverts if:

- The authorization check of the implementation denies the caller or reverts.
- The requested operator is the one already configured, which includes the zero
address while no operator is set.

```solidity
function setConfigOperator(address configOperator_) public virtual override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configOperator_ | `address` | New config operator address. |

<a id="_authorizesetconfigoperator"></a>

### _authorizeSetConfigOperator

Validates a caller before an immediate operator rotation or revocation.

<i>

Returns false by default. Implementations must explicitly override this hook to grant
authority and may revert while applying lifecycle or role checks.

</i>

```solidity
function _authorizeSetConfigOperator() internal view virtual returns (bool authorized);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| authorized | `bool` | True when the caller may set the config operator. |

<a id="_isconfigoperator-address"></a>

### _isConfigOperator

Returns whether an account is the current non-zero config operator.

```solidity
function _isConfigOperator(address account_) internal view returns (bool authorized);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | Account to check. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| authorized | `bool` | True when `account_` is the current non-zero config operator. |
