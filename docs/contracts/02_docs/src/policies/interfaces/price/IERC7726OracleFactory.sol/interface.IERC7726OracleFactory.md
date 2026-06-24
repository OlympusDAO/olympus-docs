# IERC7726OracleFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/policies/interfaces/price/IERC7726OracleFactory.sol)

**Title:**
IERC7726OracleFactory

**Author:**
OlympusDAO

Interface for deploying and managing ERC7726 clone oracles parameterized by maxAge

## Functions

### createOracle

Creates a new oracle for a specific maxAge

```solidity
function createOracle(uint48 maxAge_, bytes calldata customParams_) external returns (address oracle);
```

**Parameters**

| Name            | Type     | Description                                                      |
| --------------- | -------- | ---------------------------------------------------------------- |
| `maxAge_`       | `uint48` | The maximum age (in seconds) of cached prices used by the oracle |
| `customParams_` | `bytes`  | Optional params for factory-specific customization               |

**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `oracle` | `address` | The address of the created oracle |

### getOracle

Gets the oracle address for a maxAge

```solidity
function getOracle(uint48 maxAge_) external view returns (address oracle);
```

**Parameters**

| Name      | Type     | Description                        |
| --------- | -------- | ---------------------------------- |
| `maxAge_` | `uint48` | The maximum age used by the oracle |

**Returns**

| Name     | Type      | Description                                    |
| -------- | --------- | ---------------------------------------------- |
| `oracle` | `address` | The oracle address, or address(0) if not found |

### getOracles

Gets all deployed oracle addresses

```solidity
function getOracles() external view returns (address[] memory oracles);
```

**Returns**

| Name      | Type        | Description                   |
| --------- | ----------- | ----------------------------- |
| `oracles` | `address[]` | Array of all oracle addresses |

### getPriceCache

Gets the configured price cache policy

```solidity
function getPriceCache() external view returns (address policy);
```

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `policy` | `address` | The price cache policy address |

### enableOracle

Enables a specific oracle

```solidity
function enableOracle(address oracle_) external;
```

**Parameters**

| Name      | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| `oracle_` | `address` | The oracle address to enable |

### disableOracle

Disables a specific oracle

```solidity
function disableOracle(address oracle_) external;
```

**Parameters**

| Name      | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `oracle_` | `address` | The oracle address to disable |

### isOracleEnabled

Checks if a specific oracle is enabled

```solidity
function isOracleEnabled(address oracle_) external view returns (bool enabled);
```

**Parameters**

| Name      | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `oracle_` | `address` | The oracle address to check |

**Returns**

| Name      | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| `enabled` | `bool` | True if the oracle is enabled, false otherwise |

### getOracleContext

Checks if a factory-created oracle is enabled and returns the configured price cache

Reverts if:

- The policy is deactivated in Kernel
- `oracle_` was not created by this factory

```solidity
function getOracleContext(address oracle_) external view returns (bool enabled, address policy);
```

**Parameters**

| Name      | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `oracle_` | `address` | The oracle address to check |

**Returns**

| Name      | Type      | Description                                    |
| --------- | --------- | ---------------------------------------------- |
| `enabled` | `bool`    | True if the oracle is enabled, false otherwise |
| `policy`  | `address` | The configured price cache policy address      |

### cachePrice

Cache the direct pair unconditionally for the calling oracle

```solidity
function cachePrice(address base_, address quote_) external;
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `base_`  | `address` | The base asset to cache  |
| `quote_` | `address` | The quote asset to cache |

### cachePriceIfNecessary

Cache the direct pair only when stale for the calling oracle's configured max age

```solidity
function cachePriceIfNecessary(address base_, address quote_) external;
```

**Parameters**

| Name     | Type      | Description                            |
| -------- | --------- | -------------------------------------- |
| `base_`  | `address` | The base asset to conditionally cache  |
| `quote_` | `address` | The quote asset to conditionally cache |

### enableCreation

Enables oracle creation

```solidity
function enableCreation() external;
```

### disableCreation

Disables oracle creation

```solidity
function disableCreation() external;
```

### setPriceCache

Sets the configured price cache policy

```solidity
function setPriceCache(address policy_) external;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `policy_` | `address` | The price cache policy address |

## Events

### OracleCreated

Emitted when a new oracle is created

```solidity
event OracleCreated(address indexed oracle, uint48 indexed maxAge);
```

**Parameters**

| Name     | Type      | Description                            |
| -------- | --------- | -------------------------------------- |
| `oracle` | `address` | The created oracle address             |
| `maxAge` | `uint48`  | The max age configured for this oracle |

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

| Name     | Type      | Description                |
| -------- | --------- | -------------------------- |
| `oracle` | `address` | The enabled oracle address |

### OracleDisabled

Emitted when an oracle is disabled

```solidity
event OracleDisabled(address indexed oracle);
```

**Parameters**

| Name     | Type      | Description                 |
| -------- | --------- | --------------------------- |
| `oracle` | `address` | The disabled oracle address |

### PriceCacheSet

Emitted when the price cache policy is updated

```solidity
event PriceCacheSet(address indexed policy);
```

**Parameters**

| Name     | Type      | Description                            |
| -------- | --------- | -------------------------------------- |
| `policy` | `address` | The updated price cache policy address |

## Errors

### ERC7726OracleFactory_UnsupportedModuleVersion

Thrown when module version is not supported

```solidity
error ERC7726OracleFactory_UnsupportedModuleVersion(bytes5 keycode, uint8 major, uint8 minor);
```

**Parameters**

| Name      | Type     | Description                     |
| --------- | -------- | ------------------------------- |
| `keycode` | `bytes5` | The keycode of the module       |
| `major`   | `uint8`  | The major version of the module |
| `minor`   | `uint8`  | The minor version of the module |

### ERC7726OracleFactory_PolicyNotActive

Thrown when this policy is no longer active in Kernel

```solidity
error ERC7726OracleFactory_PolicyNotActive();
```

### ERC7726OracleFactory_UnsupportedModuleInterface

Thrown when module does not support interface

```solidity
error ERC7726OracleFactory_UnsupportedModuleInterface(bytes5 keycode, bytes4 interfaceId);
```

**Parameters**

| Name          | Type     | Description                                       |
| ------------- | -------- | ------------------------------------------------- |
| `keycode`     | `bytes5` | The keycode of the module                         |
| `interfaceId` | `bytes4` | The interface identifier, as specified in ERC-165 |

### ERC7726OracleFactory_CreationDisabled

Thrown when oracle creation is disabled

```solidity
error ERC7726OracleFactory_CreationDisabled();
```

### ERC7726OracleFactory_OracleAlreadyExists

Thrown when trying to create an oracle that already exists for maxAge

```solidity
error ERC7726OracleFactory_OracleAlreadyExists(uint48 maxAge);
```

**Parameters**

| Name     | Type     | Description                           |
| -------- | -------- | ------------------------------------- |
| `maxAge` | `uint48` | The maxAge that already has an oracle |

### ERC7726OracleFactory_CreationAlreadyEnabled

Thrown when creation is already enabled

```solidity
error ERC7726OracleFactory_CreationAlreadyEnabled();
```

### ERC7726OracleFactory_CreationAlreadyDisabled

Thrown when creation is already disabled

```solidity
error ERC7726OracleFactory_CreationAlreadyDisabled();
```

### ERC7726OracleFactory_InvalidOracle

Thrown when an invalid oracle address is provided

```solidity
error ERC7726OracleFactory_InvalidOracle(address oracle);
```

**Parameters**

| Name     | Type      | Description                |
| -------- | --------- | -------------------------- |
| `oracle` | `address` | The invalid oracle address |

### ERC7726OracleFactory_OracleAlreadyEnabled

Thrown when an oracle is already enabled

```solidity
error ERC7726OracleFactory_OracleAlreadyEnabled(address oracle);
```

**Parameters**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| `oracle` | `address` | The already enabled oracle address |

### ERC7726OracleFactory_OracleAlreadyDisabled

Thrown when an oracle is already disabled

```solidity
error ERC7726OracleFactory_OracleAlreadyDisabled(address oracle);
```

**Parameters**

| Name     | Type      | Description                         |
| -------- | --------- | ----------------------------------- |
| `oracle` | `address` | The already disabled oracle address |

### ERC7726OracleFactory_OracleDisabled

Thrown when an oracle is disabled and attempts an operation that requires enabled state

```solidity
error ERC7726OracleFactory_OracleDisabled(address oracle);
```

**Parameters**

| Name     | Type      | Description                 |
| -------- | --------- | --------------------------- |
| `oracle` | `address` | The disabled oracle address |

### ERC7726OracleFactory_InvalidCustomParams

Thrown when custom params are malformed

```solidity
error ERC7726OracleFactory_InvalidCustomParams(uint256 length);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `length` | `uint256` | The custom params length |

### ERC7726OracleFactory_InvalidPriceCache

Thrown when a price cache policy address is invalid

```solidity
error ERC7726OracleFactory_InvalidPriceCache(address policy);
```

**Parameters**

| Name     | Type      | Description                            |
| -------- | --------- | -------------------------------------- |
| `policy` | `address` | The invalid price cache policy address |

### ERC7726OracleFactory_InvalidEnableData

Thrown when re-enable pair arrays are malformed

```solidity
error ERC7726OracleFactory_InvalidEnableData(uint256 baseTokenLength, uint256 quoteTokenLength);
```

**Parameters**

| Name               | Type      | Description                |
| ------------------ | --------- | -------------------------- |
| `baseTokenLength`  | `uint256` | The number of base tokens  |
| `quoteTokenLength` | `uint256` | The number of quote tokens |
