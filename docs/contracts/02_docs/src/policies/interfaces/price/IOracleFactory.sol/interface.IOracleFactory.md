# IOracleFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/price/IOracleFactory.sol)

**Title:** IOracleFactory

**Author:** OlympusDAO

Oracle-agnostic interface for oracle factories

## Functions

<a id="getpricecache"></a>

### getPriceCache

Gets the configured price cache policy

```solidity
function getPriceCache() external view returns (address policy);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy | `address` |  The price cache policy address |

<a id="createoracle-address-address-uint48-bytes"></a>

### createOracle

Creates a new oracle for a base/quote token pair

```solidity
function createOracle(
        address baseToken_,
        address quoteToken_,
        uint48 maxAge_,
        bytes calldata customParams_
    ) external returns (address oracle);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| baseToken_ | `address` | The base token address |
| quoteToken_ | `address` | The quote token address |
| maxAge_ | `uint48` | The maximum age (in seconds) of cached prices used by the oracle |
| customParams_ | `bytes` | Service-specific custom parameters (can be empty) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | `address` |         The address of the created oracle |

<a id="getoracle-address-address-uint48"></a>

### getOracle

Gets the oracle address for a base/quote token pair

```solidity
function getOracle(
        address baseToken_,
        address quoteToken_,
        uint48 maxAge_
    ) external view returns (address oracle);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| baseToken_ | `address` | The base token address |
| quoteToken_ | `address` | The quote token address |
| maxAge_ | `uint48` | The maximum age (in seconds) of cached prices used by the oracle |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | `address` |         The address of the oracle, or address(0) if not found |

<a id="getoracles"></a>

### getOracles

Gets all deployed oracle addresses

```solidity
function getOracles() external view returns (address[] memory oracles);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracles | `address[]` | Array of all oracle addresses |

<a id="enableoracle-address"></a>

### enableOracle

Enables a specific oracle

```solidity
function enableOracle(address oracle_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle_ | `address` | The oracle address to enable |

<a id="disableoracle-address"></a>

### disableOracle

Disables a specific oracle

```solidity
function disableOracle(address oracle_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle_ | `address` | The oracle address to disable |

<a id="isoracleenabled-address"></a>

### isOracleEnabled

Checks if a specific oracle is enabled

```solidity
function isOracleEnabled(address oracle_) external view returns (bool enabled);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle_ | `address` | The oracle address to check |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enabled | `bool` | True if the oracle is enabled, false otherwise |

<a id="getoraclecontext-address"></a>

### getOracleContext

Checks if a factory-created oracle is enabled and returns the configured price cache

<i>

Reverts if:

- The policy is deactivated in Kernel
- `oracle_` was not created by this factory

</i>

```solidity
function getOracleContext(address oracle_) external view returns (bool enabled, address policy);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle_ | `address` | The oracle address to check |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enabled | `bool` | True if the oracle is enabled, false otherwise |
| policy | `address` |  The configured price cache policy address |

<a id="cacheprice-address-address"></a>

### cachePrice

Caches the provided base/quote pair

<i>

Intended to be called by oracle contracts created by this factory

</i>

```solidity
function cachePrice(address baseToken_, address quoteToken_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| baseToken_ | `address` | The base token address |
| quoteToken_ | `address` | The quote token address |

<a id="cachepriceifnecessary-address-address"></a>

### cachePriceIfNecessary

Caches the provided base/quote pair only when stale

<i>

Intended to be called by oracle contracts created by this factory

</i>

```solidity
function cachePriceIfNecessary(address baseToken_, address quoteToken_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| baseToken_ | `address` | The base token address |
| quoteToken_ | `address` | The quote token address |

<a id="enablecreation"></a>

### enableCreation

Enables oracle creation

```solidity
function enableCreation() external;
```

<a id="disablecreation"></a>

### disableCreation

Disables oracle creation

```solidity
function disableCreation() external;
```

<a id="setpricecache-address"></a>

### setPriceCache

Sets the configured price cache policy

```solidity
function setPriceCache(address policy_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` | The price cache policy address |

## Events

### OracleCreated

Emitted when a new oracle is created

```solidity
event OracleCreated(
        address indexed oracle,
        address indexed baseToken,
        address indexed quoteToken
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | `address` | The address of the created oracle |
| baseToken | `address` | The base token address |
| quoteToken | `address` | The quote token address |

### CreationEnabled

Emitted when oracle creation is enabled

```solidity
event CreationEnabled();
```

### CreationDisabled

Emitted when oracle creation is disabled

```solidity
event CreationDisabled();
```

### OracleEnabled

Emitted when an oracle is enabled

```solidity
event OracleEnabled(address indexed oracle);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | `address` | The address of the enabled oracle |

### OracleDisabled

Emitted when an oracle is disabled

```solidity
event OracleDisabled(address indexed oracle);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | `address` | The address of the disabled oracle |

### PriceCacheSet

Emitted when the price cache policy is updated

```solidity
event PriceCacheSet(address indexed policy);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy | `address` | The updated price cache policy address |

## Errors

### OracleFactory_InvalidToken

Thrown when a token address is invalid (zero address or not a contract)

```solidity
error OracleFactory_InvalidToken(address token);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | Invalid token address |

### OracleFactory_PolicyNotActive

Thrown when this policy is no longer active in Kernel

```solidity
error OracleFactory_PolicyNotActive();
```

### OracleFactory_UnsupportedModuleVersion

Thrown when module version is not supported

```solidity
error OracleFactory_UnsupportedModuleVersion(bytes5 keycode, uint8 major, uint8 minor);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| keycode | `bytes5` | Keycode of the module |
| major | `uint8` | Major version of the module |
| minor | `uint8` | Minor version of the module |

### OracleFactory_UnsupportedModuleInterface

Thrown when module does not support interface

```solidity
error OracleFactory_UnsupportedModuleInterface(bytes5 keycode, bytes4 interfaceId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| keycode | `bytes5` | Keycode of the module |
| interfaceId | `bytes4` | Interface identifier, as specified in ERC-165 |

### OracleFactory_CreationDisabled

Thrown when oracle creation is disabled

```solidity
error OracleFactory_CreationDisabled();
```

### OracleFactory_OracleAlreadyExists

Thrown when trying to create an oracle that already exists

```solidity
error OracleFactory_OracleAlreadyExists(address baseToken, address quoteToken);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| baseToken | `address` | Base token address |
| quoteToken | `address` | Quote token address |

### OracleFactory_InvalidTokenPair

Thrown when a token pair is invalid

```solidity
error OracleFactory_InvalidTokenPair(address baseToken, address quoteToken);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| baseToken | `address` | Base token address |
| quoteToken | `address` | Quote token address |

### OracleFactory_CreationAlreadyEnabled

Thrown when creation is already enabled

```solidity
error OracleFactory_CreationAlreadyEnabled();
```

### OracleFactory_CreationAlreadyDisabled

Thrown when creation is already disabled

```solidity
error OracleFactory_CreationAlreadyDisabled();
```

### OracleFactory_InvalidOracle

Thrown when an invalid oracle address is provided

```solidity
error OracleFactory_InvalidOracle(address oracle);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | `address` | Invalid oracle address |

### OracleFactory_OracleAlreadyEnabled

Thrown when an oracle is already enabled

```solidity
error OracleFactory_OracleAlreadyEnabled(address oracle);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | `address` | Already enabled oracle address |

### OracleFactory_OracleAlreadyDisabled

Thrown when an oracle is already disabled

```solidity
error OracleFactory_OracleAlreadyDisabled(address oracle);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | `address` | Already disabled oracle address |

### OracleFactory_OracleDisabled

Thrown when an oracle is disabled and attempts an operation that requires enabled state

```solidity
error OracleFactory_OracleDisabled(address oracle);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | `address` | Disabled oracle address |

### OracleFactory_InvalidPriceCache

Thrown when a price cache policy address is invalid

```solidity
error OracleFactory_InvalidPriceCache(address policy);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy | `address` | Invalid price cache policy address |

### OracleFactory_InvalidEnableData

Thrown when re-enable pair arrays are malformed

```solidity
error OracleFactory_InvalidEnableData(uint256 baseTokenLength, uint256 quoteTokenLength);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| baseTokenLength | `uint256` | The number of base tokens |
| quoteTokenLength | `uint256` | The number of quote tokens |
