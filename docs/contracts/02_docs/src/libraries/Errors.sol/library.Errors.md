# Errors

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/Errors.sol)

**Title:** Errors

Common custom errors shared across contracts.

## Errors

### Unauthorized

Thrown when the account is not authorized to perform the action.

<i>

Intended for access control checks in contracts that do not use the `ROLES` module.

</i>

```solidity
error Unauthorized(address account, string reason);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | `address` | The unauthorized account. |
| reason | `string` | An identifier of the role or capability the account was expected to hold (e.g. "owner"). |

### InvalidRecipient

Thrown when a recipient address is invalid (e.g. the zero address).

```solidity
error InvalidRecipient();
```

### BadInput

Thrown when an input argument fails.

```solidity
error BadInput(string parameter);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parameter | `string` | A short identifier of the offending input (e.g. the parameter name). |
