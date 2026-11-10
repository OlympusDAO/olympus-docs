# CCIPTokenPoolConfigKeyLib

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/utils/CCIPTokenPoolConfigKeyLib.sol)

**Title:** CCIPTokenPoolConfigKeyLib

Derives the configuration domains and keys of `CCIPTokenPoolConfigTimelock`: the four
domain constants, the destination-local key of each domain, and the destination-scoped
key that the timelock reserves and that `pendingActionId` takes, scoped to the config
policy the timelock is bound to.

<i>

A route contributes three domains, keyed per chain selector; the allowlist is one
pool-wide domain whose local key is the domain constant itself. Shared by the timelock
and the tooling that reads its reservations, so that both compute a key with one formula.

</i>

## Constants

### RATE_LIMITS_DOMAIN

The domain of the rate limits of a route: `isEnabled`, `capacity` and `rate` of
both buckets.

```solidity
bytes32 internal constant RATE_LIMITS_DOMAIN = keccak256("CCIP_TOKEN_POOL_CONFIG_RATE_LIMITS");
```

### REMOTE_POOLS_DOMAIN

The domain of the accepted remote pools of a route.

```solidity
bytes32 internal constant REMOTE_POOLS_DOMAIN =
        keccak256("CCIP_TOKEN_POOL_CONFIG_REMOTE_POOLS");
```

### ROUTE_IDENTITY_DOMAIN

The domain of the identity of a route: whether the route exists and its remote
token.

```solidity
bytes32 internal constant ROUTE_IDENTITY_DOMAIN =
        keccak256("CCIP_TOKEN_POOL_CONFIG_ROUTE_IDENTITY");
```

### ALLOWLIST_DOMAIN

The domain of the pool-wide sender allowlist.

```solidity
bytes32 internal constant ALLOWLIST_DOMAIN = keccak256("CCIP_TOKEN_POOL_CONFIG_ALLOWLIST");
```

## Functions

<a id="routelocalkey-bytes32-uint64"></a>

### routeLocalKey

Returns the destination-local key of a route domain.

```solidity
function routeLocalKey(
        bytes32 domain_,
        uint64 chainSelector_
    ) internal pure returns (bytes32 localKey);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| domain_ | `bytes32` | The domain constant. |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| localKey | `bytes32` | The key `keccak256(abi.encode(domain_, chainSelector_))`. |

<a id="ratelimitslocalkey-uint64"></a>

### rateLimitsLocalKey

Returns the destination-local key of the rate limits domain of a route.

```solidity
function rateLimitsLocalKey(uint64 chainSelector_) internal pure returns (bytes32 localKey);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| localKey | `bytes32` | The local key. |

<a id="remotepoolslocalkey-uint64"></a>

### remotePoolsLocalKey

Returns the destination-local key of the remote pools domain of a route.

```solidity
function remotePoolsLocalKey(uint64 chainSelector_) internal pure returns (bytes32 localKey);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| localKey | `bytes32` | The local key. |

<a id="routeidentitylocalkey-uint64"></a>

### routeIdentityLocalKey

Returns the destination-local key of the identity domain of a route.

```solidity
function routeIdentityLocalKey(uint64 chainSelector_) internal pure returns (bytes32 localKey);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| localKey | `bytes32` | The local key. |

<a id="allowlistlocalkey"></a>

### allowListLocalKey

Returns the destination-local key of the allowlist domain: the domain constant
itself, since the domain has no chain selector.

```solidity
function allowListLocalKey() internal pure returns (bytes32 localKey);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| localKey | `bytes32` | The local key. |

<a id="ratelimitskey-address-uint64"></a>

### rateLimitsKey

Returns the reserved key of the rate limits domain of a route.

```solidity
function rateLimitsKey(
        address config_,
        uint64 chainSelector_
    ) internal pure returns (bytes32 key);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config_ | `address` | The config policy the timelock is bound to. |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | `bytes32` | The destination-scoped key. |

<a id="remotepoolskey-address-uint64"></a>

### remotePoolsKey

Returns the reserved key of the remote pools domain of a route.

```solidity
function remotePoolsKey(
        address config_,
        uint64 chainSelector_
    ) internal pure returns (bytes32 key);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config_ | `address` | The config policy the timelock is bound to. |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | `bytes32` | The destination-scoped key. |

<a id="routeidentitykey-address-uint64"></a>

### routeIdentityKey

Returns the reserved key of the identity domain of a route.

```solidity
function routeIdentityKey(
        address config_,
        uint64 chainSelector_
    ) internal pure returns (bytes32 key);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config_ | `address` | The config policy the timelock is bound to. |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | `bytes32` | The destination-scoped key. |

<a id="allowlistkey-address"></a>

### allowListKey

Returns the reserved key of the allowlist domain.

```solidity
function allowListKey(address config_) internal pure returns (bytes32 key);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config_ | `address` | The config policy the timelock is bound to. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | `bytes32` | The destination-scoped key. |
