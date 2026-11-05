# ICCIPTokenAdminRegistry

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/bridge/ICCIPTokenAdminRegistry.sol)

**Title:** ICCIPTokenAdminRegistry

The token-specific surface of the Chainlink CCIP `TokenAdminRegistry` (version 1.5.0):
the per-token administrator, its two-step transfer and the pool registration.

<i>

The registry holds one configuration per token. The administrator of a token selects the
pool used for that token and nominates its successor; the successor completes the
transfer by accepting it. Registering the zero address as pool delists the token.
Functions that change the configuration of a token are restricted to its administrator,
except `acceptAdminRole`, which is restricted to its pending administrator, and
`proposeAdministrator`, which is restricted to the registry owner and its registry
modules.

</i>

## Functions

<a id="getpool-address"></a>

### getPool

Returns the pool registered for a token.

```solidity
function getPool(address token) external view returns (address pool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The token. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | `address` | The pool, or the zero address if none is registered. |

<a id="gettokenconfig-address"></a>

### getTokenConfig

Returns the configuration of a token.

```solidity
function getTokenConfig(address token) external view returns (TokenConfig memory config);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The token. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | `TokenConfig` | The configuration, with every field zero for an unknown token. |

<a id="isadministrator-address-address"></a>

### isAdministrator

Returns whether an address is the administrator of a token.

```solidity
function isAdministrator(
        address localToken,
        address administrator
    ) external view returns (bool isAdmin);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| localToken | `address` | The token. |
| administrator | `address` | The address to check. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| isAdmin | `bool` | True if `administrator` is the administrator of `localToken`. |

<a id="setpool-address-address"></a>

### setPool

Registers the pool of a token. The pool must support the token. The zero address
delists the token from CCIP. Restricted to the administrator of the token.

```solidity
function setPool(address localToken, address pool) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| localToken | `address` | The token. |
| pool | `address` | The pool to register. |

<a id="transferadminrole-address-address"></a>

### transferAdminRole

Nominates a new administrator of a token. The current administrator keeps the role
until the nominee accepts. The zero address cancels a pending transfer. Restricted
to the administrator of the token.

```solidity
function transferAdminRole(address localToken, address newAdmin) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| localToken | `address` | The token. |
| newAdmin | `address` | The nominated administrator. |

<a id="acceptadminrole-address"></a>

### acceptAdminRole

Accepts the administrator role of a token. Restricted to the pending administrator
of the token.

```solidity
function acceptAdminRole(address localToken) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| localToken | `address` | The token. |

<a id="proposeadministrator-address-address"></a>

### proposeAdministrator

Proposes the first administrator of a token. Restricted to the registry owner and
its registry modules.

```solidity
function proposeAdministrator(address localToken, address administrator) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| localToken | `address` | The token. |
| administrator | `address` | The proposed administrator. |

## Events

### PoolSet

Emitted when the pool of a token changes.

```solidity
event PoolSet(address indexed token, address indexed previousPool, address indexed newPool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The token. |
| previousPool | `address` | The pool registered before the change. |
| newPool | `address` | The pool registered after the change. |

### AdministratorTransferRequested

Emitted when an administrator transfer is requested.

```solidity
event AdministratorTransferRequested(
        address indexed token,
        address indexed currentAdmin,
        address indexed newAdmin
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The token. |
| currentAdmin | `address` | The current administrator, or the zero address for a first-time<br/>proposal. |
| newAdmin | `address` | The nominated administrator. |

### AdministratorTransferred

Emitted when an administrator transfer is accepted.

```solidity
event AdministratorTransferred(address indexed token, address indexed newAdmin);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The token. |
| newAdmin | `address` | The new administrator. |

## Errors

### OnlyRegistryModuleOrOwner

Thrown when `proposeAdministrator` is called by an address that is neither a
registry module nor the registry owner.

```solidity
error OnlyRegistryModuleOrOwner(address sender);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The rejected caller. |

### OnlyAdministrator

Thrown when an administrator function is called by an address other than the
administrator of the token.

```solidity
error OnlyAdministrator(address sender, address token);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The rejected caller. |
| token | `address` | The token. |

### OnlyPendingAdministrator

Thrown when `acceptAdminRole` is called by an address other than the pending
administrator of the token, including when no transfer is pending.

```solidity
error OnlyPendingAdministrator(address sender, address token);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The rejected caller. |
| token | `address` | The token. |

### AlreadyRegistered

Thrown when an administrator is proposed for a token that already has one.

```solidity
error AlreadyRegistered(address token);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The token. |

### ZeroAddress

Thrown when the zero address is proposed as administrator.

```solidity
error ZeroAddress();
```

### InvalidTokenPoolToken

Thrown when the pool to register does not support the token.

```solidity
error InvalidTokenPoolToken(address token);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The token. |

## Structs

### TokenConfig

The configuration of a token.

```solidity
struct TokenConfig {
        address administrator;
        address pendingAdministrator;
        address tokenPool;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| administrator | `address` | The current administrator of the token. |
| pendingAdministrator | `address` | The address nominated to become the administrator, or the<br/>zero address when no transfer is pending. |
| tokenPool | `address` | The pool registered for the token, or the zero address when the token is<br/>not deployed or not configured. |
