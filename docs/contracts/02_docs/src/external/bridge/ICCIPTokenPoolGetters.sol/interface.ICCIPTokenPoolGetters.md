# ICCIPTokenPoolGetters

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/bridge/ICCIPTokenPoolGetters.sol)

**Title:** ICCIPTokenPoolGetters

The view surface of a Chainlink CCIP `TokenPool` (version 1.5.1).

<i>

Set-valued getters return the values of an enumerable set, whose order changes when
entries are removed. Rate limiter states are projected to the current block timestamp
before being returned, so the `tokens` and `lastUpdated` fields differ from storage.
Getters for an unknown chain selector return empty values rather than reverting.

</i>

## Functions

<a id="owner"></a>

### owner

Returns the owner of the pool.

```solidity
function owner() external view returns (address owner_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner_ | `address` | The owner. |

<a id="gettoken"></a>

### getToken

Returns the token that the pool locks, burns, releases or mints.

```solidity
function getToken() external view returns (address token);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The token. |

<a id="gettokendecimals"></a>

### getTokenDecimals

Returns the decimals of the pool token on the local chain.

```solidity
function getTokenDecimals() external view returns (uint8 decimals);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| decimals | `uint8` | The token decimals. |

<a id="getrmnproxy"></a>

### getRmnProxy

Returns the RMN proxy consulted for curses.

```solidity
function getRmnProxy() external view returns (address rmnProxy);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rmnProxy | `address` | The RMN proxy. |

<a id="getrouter"></a>

### getRouter

Returns the router through which ramp authorization is resolved.

```solidity
function getRouter() external view returns (address router);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | `address` | The router. |

<a id="getratelimitadmin"></a>

### getRateLimitAdmin

Returns the rate limit admin, or the zero address if none is set.

```solidity
function getRateLimitAdmin() external view returns (address rateLimitAdmin);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rateLimitAdmin | `address` | The rate limit admin. |

<a id="issupportedchain-uint64"></a>

### isSupportedChain

Returns whether a remote chain is configured on the pool.

```solidity
function isSupportedChain(uint64 remoteChainSelector) external view returns (bool supported);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector of the remote chain. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| supported | `bool` | True if the chain is configured. |

<a id="getsupportedchains"></a>

### getSupportedChains

Returns the configured remote chain selectors.

```solidity
function getSupportedChains() external view returns (uint64[] memory chainSelectors);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelectors | `uint64[]` | The chain selectors. |

<a id="getremotepools-uint64"></a>

### getRemotePools

Returns the accepted remote pools of a remote chain.

```solidity
function getRemotePools(
        uint64 remoteChainSelector
    ) external view returns (bytes[] memory remotePools);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector of the remote chain. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remotePools | `bytes[]` | The remote pool addresses. |

<a id="isremotepool-uint64-bytes"></a>

### isRemotePool

Returns whether a remote pool is accepted for a remote chain.

```solidity
function isRemotePool(
        uint64 remoteChainSelector,
        bytes calldata remotePoolAddress
    ) external view returns (bool accepted);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector of the remote chain. |
| remotePoolAddress | `bytes` | The remote pool address. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| accepted | `bool` | True if the remote pool is accepted. |

<a id="getremotetoken-uint64"></a>

### getRemoteToken

Returns the token address on a remote chain.

```solidity
function getRemoteToken(
        uint64 remoteChainSelector
    ) external view returns (bytes memory remoteToken);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector of the remote chain. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteToken | `bytes` | The remote token address. |

<a id="getcurrentoutboundratelimiterstate-uint64"></a>

### getCurrentOutboundRateLimiterState

Returns the outbound token bucket of a remote chain, projected to the current
block timestamp.

```solidity
function getCurrentOutboundRateLimiterState(
        uint64 remoteChainSelector
    ) external view returns (ICCIPRateLimiter.TokenBucket memory bucket);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector of the remote chain. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bucket | `ICCIPRateLimiter.TokenBucket` | The outbound token bucket. |

<a id="getcurrentinboundratelimiterstate-uint64"></a>

### getCurrentInboundRateLimiterState

Returns the inbound token bucket of a remote chain, projected to the current
block timestamp.

```solidity
function getCurrentInboundRateLimiterState(
        uint64 remoteChainSelector
    ) external view returns (ICCIPRateLimiter.TokenBucket memory bucket);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainSelector | `uint64` | The chain selector of the remote chain. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bucket | `ICCIPRateLimiter.TokenBucket` | The inbound token bucket. |

<a id="getallowlistenabled"></a>

### getAllowListEnabled

Returns whether the sender allowlist is enabled. The flag is fixed at pool
construction.

```solidity
function getAllowListEnabled() external view returns (bool enabled);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enabled | `bool` | True if the allowlist is enabled. |

<a id="getallowlist"></a>

### getAllowList

Returns the sender allowlist.

```solidity
function getAllowList() external view returns (address[] memory allowList);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| allowList | `address[]` | The allowlisted addresses. |

<a id="issupportedtoken-address"></a>

### isSupportedToken

Returns whether the pool supports a token.

```solidity
function isSupportedToken(address token) external view returns (bool supported);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The token. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| supported | `bool` | True if the token is the pool token. |
