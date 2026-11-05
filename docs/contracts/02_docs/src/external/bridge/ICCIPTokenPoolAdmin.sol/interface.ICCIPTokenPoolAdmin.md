# ICCIPTokenPoolAdmin

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/bridge/ICCIPTokenPoolAdmin.sol)

**Inherits:** [ICCIPTokenPoolGetters](/main/contracts/docs/src/external/bridge/ICCIPTokenPoolGetters.sol/interface.ICCIPTokenPoolGetters)

**Title:** ICCIPTokenPoolAdmin

The owner-facing surface of a Chainlink CCIP `TokenPool` (version 1.5.1), together
with the pool events and errors and the view surface inherited from
`ICCIPTokenPoolGetters`.

<i>

The `ChainUpdate` struct layout is identical to `TokenPool.ChainUpdate` of Chainlink CCIP
1.6.0, so `applyChainUpdates` and `setChainRateLimiterConfig` declared here have the same
selectors as the pool functions. Every state-changing function is restricted to the pool
owner, except the rate limiter setters, which also accept the pool's rate limit admin.
Remote addresses are ABI-encoded for EVM chains and encoded per the remote chain family
otherwise.

</i>

## Functions

<a id="transferownership-address"></a>

### transferOwnership

Proposes a new owner. Ownership moves when the proposed owner accepts.

```solidity
function transferOwnership(address to) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | `address` | The proposed owner. |

<a id="acceptownership"></a>

### acceptOwnership

Accepts a proposed ownership transfer. Callable only by the proposed owner.

```solidity
function acceptOwnership() external;
```

<a id="applychainupdates-uint64-chainupdate"></a>

### applyChainUpdates

Removes and then adds remote chains. The removals run before the additions, so a
selector present in both arguments is replaced in place. Removing a chain deletes
its remote pools, remote token and both buckets. Added chains start with both
buckets full.

```solidity
function applyChainUpdates(
        uint64[] calldata remoteChainSelectorsToRemove,
        ChainUpdate[] calldata chainsToAdd
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelectorsToRemove | `uint64[]` | The chain selectors to remove. |
| chainsToAdd | `ChainUpdate[]` | The chains to add. |

<a id="addremotepool-uint64-bytes"></a>

### addRemotePool

Adds an accepted remote pool for a configured remote chain.

```solidity
function addRemotePool(uint64 remoteChainSelector, bytes calldata remotePoolAddress) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector of the remote chain. |
| remotePoolAddress | `bytes` | The remote pool address to add. |

<a id="removeremotepool-uint64-bytes"></a>

### removeRemotePool

Removes an accepted remote pool from a configured remote chain. In-flight
messages from the removed pool are rejected afterwards.

```solidity
function removeRemotePool(
        uint64 remoteChainSelector,
        bytes calldata remotePoolAddress
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector of the remote chain. |
| remotePoolAddress | `bytes` | The remote pool address to remove. |

<a id="setrouter-address"></a>

### setRouter

Sets the router through which the pool resolves ramp authorization.

```solidity
function setRouter(address newRouter) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newRouter | `address` | The router address. |

<a id="setratelimitadmin-address"></a>

### setRateLimitAdmin

Sets the rate limit admin, which may set rate limiter configurations alongside
the owner. The zero address clears the role.

```solidity
function setRateLimitAdmin(address rateLimitAdmin) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rateLimitAdmin | `address` | The rate limit admin address. |

<a id="setchainratelimiterconfig-uint64-iccipratelimiter-config-iccipratelimiter-config"></a>

### setChainRateLimiterConfig

Sets both rate limiter configurations of a configured remote chain. The bucket
fill level is clamped to the new capacity and is never raised.

```solidity
function setChainRateLimiterConfig(
        uint64 remoteChainSelector,
        ICCIPRateLimiter.Config calldata outboundConfig,
        ICCIPRateLimiter.Config calldata inboundConfig
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector of the remote chain. |
| outboundConfig | `ICCIPRateLimiter.Config` | The outbound rate limiter configuration. |
| inboundConfig | `ICCIPRateLimiter.Config` | The inbound rate limiter configuration. |

<a id="setchainratelimiterconfigs-uint64-iccipratelimiter-config-iccipratelimiter-config"></a>

### setChainRateLimiterConfigs

Sets both rate limiter configurations of several configured remote chains.

```solidity
function setChainRateLimiterConfigs(
        uint64[] calldata remoteChainSelectors,
        ICCIPRateLimiter.Config[] calldata outboundConfigs,
        ICCIPRateLimiter.Config[] calldata inboundConfigs
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelectors | `uint64[]` | The chain selectors of the remote chains. |
| outboundConfigs | `ICCIPRateLimiter.Config[]` | The outbound rate limiter configurations, one per chain. |
| inboundConfigs | `ICCIPRateLimiter.Config[]` | The inbound rate limiter configurations, one per chain. |

<a id="applyallowlistupdates-address-address"></a>

### applyAllowListUpdates

Removes and then adds sender allowlist entries. Absent removals, duplicate
additions and zero addresses are skipped silently.

```solidity
function applyAllowListUpdates(address[] calldata removes, address[] calldata adds) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| removes | `address[]` | The addresses to remove. |
| adds | `address[]` | The addresses to add. |

## Events

### Locked

Emitted when tokens are locked in the pool.

```solidity
event Locked(address indexed sender, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The calling on-ramp. |
| amount | `uint256` | The amount locked. |

### Burned

Emitted when tokens are burned by the pool.

```solidity
event Burned(address indexed sender, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The calling on-ramp. |
| amount | `uint256` | The amount burned. |

### Released

Emitted when tokens are released by the pool.

```solidity
event Released(address indexed sender, address indexed recipient, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The calling off-ramp. |
| recipient | `address` | The recipient of the tokens. |
| amount | `uint256` | The amount released, in local token units. |

### Minted

Emitted when tokens are minted by the pool.

```solidity
event Minted(address indexed sender, address indexed recipient, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The calling off-ramp. |
| recipient | `address` | The recipient of the tokens. |
| amount | `uint256` | The amount minted, in local token units. |

### ChainAdded

Emitted when a remote chain is added.

```solidity
event ChainAdded(
        uint64 remoteChainSelector,
        bytes remoteToken,
        ICCIPRateLimiter.Config outboundRateLimiterConfig,
        ICCIPRateLimiter.Config inboundRateLimiterConfig
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector added. |
| remoteToken | `bytes` | The token address on the remote chain. |
| outboundRateLimiterConfig | `ICCIPRateLimiter.Config` | The outbound rate limiter configuration. |
| inboundRateLimiterConfig | `ICCIPRateLimiter.Config` | The inbound rate limiter configuration. |

### ChainConfigured

Emitted when the rate limiter configurations of a remote chain are set.

```solidity
event ChainConfigured(
        uint64 remoteChainSelector,
        ICCIPRateLimiter.Config outboundRateLimiterConfig,
        ICCIPRateLimiter.Config inboundRateLimiterConfig
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector configured. |
| outboundRateLimiterConfig | `ICCIPRateLimiter.Config` | The outbound rate limiter configuration. |
| inboundRateLimiterConfig | `ICCIPRateLimiter.Config` | The inbound rate limiter configuration. |

### ChainRemoved

Emitted when a remote chain is removed.

```solidity
event ChainRemoved(uint64 remoteChainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector removed. |

### RemotePoolAdded

Emitted when a remote pool is added to a remote chain.

```solidity
event RemotePoolAdded(uint64 indexed remoteChainSelector, bytes remotePoolAddress);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector of the remote chain. |
| remotePoolAddress | `bytes` | The remote pool address added. |

### RemotePoolRemoved

Emitted when a remote pool is removed from a remote chain.

```solidity
event RemotePoolRemoved(uint64 indexed remoteChainSelector, bytes remotePoolAddress);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector of the remote chain. |
| remotePoolAddress | `bytes` | The remote pool address removed. |

### AllowListAdd

Emitted when an address is added to the sender allowlist.

```solidity
event AllowListAdd(address sender);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The address added. |

### AllowListRemove

Emitted when an address is removed from the sender allowlist.

```solidity
event AllowListRemove(address sender);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The address removed. |

### RouterUpdated

Emitted when the router is set.

```solidity
event RouterUpdated(address oldRouter, address newRouter);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldRouter | `address` | The previous router. |
| newRouter | `address` | The router set. |

### RateLimitAdminSet

Emitted when the rate limit admin is set.

```solidity
event RateLimitAdminSet(address rateLimitAdmin);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rateLimitAdmin | `address` | The rate limit admin set. |

### OwnershipTransferRequested

Emitted when an ownership transfer is requested.

```solidity
event OwnershipTransferRequested(address indexed from, address indexed to);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` | The current owner. |
| to | `address` | The proposed owner. |

### OwnershipTransferred

Emitted when an ownership transfer is accepted.

```solidity
event OwnershipTransferred(address indexed from, address indexed to);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` | The previous owner. |
| to | `address` | The new owner. |

## Errors

### CallerIsNotARampOnRouter

Thrown when the caller is not a ramp of the configured router.

```solidity
error CallerIsNotARampOnRouter(address caller);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller | `address` | The rejected caller. |

### ZeroAddressNotAllowed

Thrown when a zero address or an empty encoded address is supplied.

```solidity
error ZeroAddressNotAllowed();
```

### SenderNotAllowed

Thrown when the sender is not on the enabled allowlist.

```solidity
error SenderNotAllowed(address sender);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The rejected sender. |

### AllowListNotEnabled

Thrown when the allowlist is updated on a pool without an allowlist.

```solidity
error AllowListNotEnabled();
```

### NonExistentChain

Thrown when a remote chain is not configured on the pool.

```solidity
error NonExistentChain(uint64 remoteChainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector. |

### ChainNotAllowed

Thrown when a transfer is attempted for a remote chain that is not configured.

```solidity
error ChainNotAllowed(uint64 remoteChainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector. |

### CursedByRMN

Thrown when the remote chain is cursed by the RMN.

```solidity
error CursedByRMN();
```

### ChainAlreadyExists

Thrown when a remote chain is added twice.

```solidity
error ChainAlreadyExists(uint64 chainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector. |

### InvalidSourcePoolAddress

Thrown when a message originates from a remote pool that is not accepted.

```solidity
error InvalidSourcePoolAddress(bytes sourcePoolAddress);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sourcePoolAddress | `bytes` | The rejected source pool address. |

### InvalidToken

Thrown when the token of a transfer is not the pool token.

```solidity
error InvalidToken(address token);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The rejected token. |

### Unauthorized

Thrown when the caller is not authorized.

```solidity
error Unauthorized(address caller);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller | `address` | The rejected caller. |

### PoolAlreadyAdded

Thrown when a remote pool is added twice for a remote chain.

```solidity
error PoolAlreadyAdded(uint64 remoteChainSelector, bytes remotePoolAddress);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector. |
| remotePoolAddress | `bytes` | The remote pool address. |

### InvalidRemotePoolForChain

Thrown when a remote pool to remove is not configured for a remote chain.

```solidity
error InvalidRemotePoolForChain(uint64 remoteChainSelector, bytes remotePoolAddress);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector. |
| remotePoolAddress | `bytes` | The remote pool address. |

### InvalidRemoteChainDecimals

Thrown when the decimals encoded by a remote pool are malformed.

```solidity
error InvalidRemoteChainDecimals(bytes sourcePoolData);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sourcePoolData | `bytes` | The rejected pool data. |

### MismatchedArrayLengths

Thrown when array arguments have different lengths.

```solidity
error MismatchedArrayLengths();
```

### OverflowDetected

Thrown when a remote amount cannot be represented in local decimals.

```solidity
error OverflowDetected(uint8 remoteDecimals, uint8 localDecimals, uint256 remoteAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteDecimals | `uint8` | The remote token decimals. |
| localDecimals | `uint8` | The local token decimals. |
| remoteAmount | `uint256` | The remote amount. |

### InvalidDecimalArgs

Thrown when the supplied token decimals differ from the token's decimals.

```solidity
error InvalidDecimalArgs(uint8 expected, uint8 actual);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| expected | `uint8` | The supplied decimals. |
| actual | `uint8` | The token's decimals. |

### OwnerCannotBeZero

Thrown when the owner is set to the zero address.

```solidity
error OwnerCannotBeZero();
```

### MustBeProposedOwner

Thrown when `acceptOwnership` is called by an address other than the proposed
owner.

```solidity
error MustBeProposedOwner();
```

### CannotTransferToSelf

Thrown when the owner proposes itself as the new owner.

```solidity
error CannotTransferToSelf();
```

### OnlyCallableByOwner

Thrown when an owner-only function is called by another address.

```solidity
error OnlyCallableByOwner();
```

## Structs

### ChainUpdate

A remote chain to add to the pool.

```solidity
struct ChainUpdate {
        uint64 remoteChainSelector;
        bytes[] remotePoolAddresses;
        bytes remoteTokenAddress;
        ICCIPRateLimiter.Config outboundRateLimiterConfig;
        ICCIPRateLimiter.Config inboundRateLimiterConfig;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The CCIP chain selector of the remote chain. |
| remotePoolAddresses | `bytes[]` | The pool addresses on the remote chain accepted as message<br/>sources. |
| remoteTokenAddress | `bytes` | The token address on the remote chain. |
| outboundRateLimiterConfig | `ICCIPRateLimiter.Config` | The rate limiter configuration for transfers to the<br/>remote chain. |
| inboundRateLimiterConfig | `ICCIPRateLimiter.Config` | The rate limiter configuration for transfers from the<br/>remote chain. |
