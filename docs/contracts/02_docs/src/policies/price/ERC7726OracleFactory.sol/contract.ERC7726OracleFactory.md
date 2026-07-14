# ERC7726OracleFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/policies/price/ERC7726OracleFactory.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IERC7726OracleFactory](/main/contracts/docs/src/policies/interfaces/price/IERC7726OracleFactory.sol/interface.IERC7726OracleFactory), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned), ReentrancyGuard

**Title:**
ERC7726OracleFactory

**Author:**
OlympusDAO

forge-lint: disable-start(mixed-case-function,mixed-case-variable)

Factory for deploying generic ERC7726 clone oracles keyed by maxAge

## State Variables

### \_ROLES_KEYCODE

```solidity
bytes5 internal constant _ROLES_KEYCODE = "ROLES"
```

### priceCache

The pair cache policy

```solidity
IPriceCache public priceCache
```

### ORACLE_IMPLEMENTATION

Reference implementation for cloning

```solidity
ERC7726OracleCloneable public immutable ORACLE_IMPLEMENTATION
```

### isCreationEnabled

Whether new oracle creation is enabled

```solidity
bool public isCreationEnabled
```

### \_oracles

Internal array of all deployed oracles

```solidity
address[] internal _oracles
```

### \_enabledOracleCount

Number of deployed oracles that are currently enabled

Updated when oracles are created, enabled, or disabled. Factory-level re-enable
recaching skips all requested pairs when this count is zero.

```solidity
uint256 internal _enabledOracleCount
```

### \_maxAgeToOracle

Mapping from maxAge to oracle

```solidity
mapping(uint48 maxAge => address oracle) internal _maxAgeToOracle
```

### \_oracleToMaxAge

Mapping from oracle to maxAge

```solidity
mapping(address oracle => uint48 maxAge) internal _oracleToMaxAge
```

### isOracle

Mapping to validate deployed oracles

```solidity
mapping(address oracle => bool) public isOracle
```

### \_isOracleEnabled

Mapping to track if an oracle is enabled

```solidity
mapping(address oracle => bool) internal _isOracleEnabled
```

### \_DEFAULT_ORACLE_NAME

```solidity
bytes32 internal constant _DEFAULT_ORACLE_NAME = "ERC7726 Oracle"
```

## Functions

### constructor

Constructs a new ERC7726OracleFactory

Reverts if `priceCache_` is not a valid IPriceCache policy for this Kernel.

```solidity
constructor(Kernel kernel_, address priceCache_) Policy(kernel_);
```

**Parameters**

| Name          | Type      | Description                    |
| ------------- | --------- | ------------------------------ |
| `kernel_`     | `Kernel`  | The Kernel address             |
| `priceCache_` | `address` | The price cache policy address |

### configureDependencies

Define module dependencies for this policy.

Reverts if the configured ROLES module major version is unsupported.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name           | Type        | Description                             |
| -------------- | ----------- | --------------------------------------- |
| `dependencies` | `Keycode[]` | - Keycode array of module dependencies. |

### requestPermissions

Function called by kernel to set module function permissions.

Does not revert.

```solidity
function requestPermissions() external pure override returns (Permissions[] memory requests);
```

**Returns**

| Name       | Type            | Description                                                           |
| ---------- | --------------- | --------------------------------------------------------------------- |
| `requests` | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

### VERSION

Returns the version of the contract

Does not revert.

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name    | Type    | Description                                                         |
| ------- | ------- | ------------------------------------------------------------------- |
| `major` | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| `minor` | `uint8` | - Minor version change retains backward-compatible interface.       |

### onlyPolicyActive

Reverts if this policy is not active in the Kernel.

```solidity
modifier onlyPolicyActive() ;
```

### \_onlyPolicyActive

```solidity
function _onlyPolicyActive() internal view;
```

### \_onlyOracleManagerOrAdminRole

```solidity
function _onlyOracleManagerOrAdminRole() internal view;
```

### \_onlyOracleManagerOrAdminOrEmergencyRole

```solidity
function _onlyOracleManagerOrAdminOrEmergencyRole() internal view;
```

### onlyOracleManagerOrAdminRole

```solidity
modifier onlyOracleManagerOrAdminRole() ;
```

### onlyOracleManagerOrAdminOrEmergencyRole

```solidity
modifier onlyOracleManagerOrAdminOrEmergencyRole() ;
```

### createOracle

Creates a new oracle for a specific maxAge

Creates an enabled oracle and adds it to the factory-level re-enable recache count.

Reverts if:

- The factory is disabled
- The caller is not admin or oracle manager
- Oracle creation is disabled
- An oracle for `maxAge_` already exists
- `customParams_` is non-empty and not exactly 32 bytes

```solidity
function createOracle(uint48 maxAge_, bytes calldata customParams_)
    external
    override
    onlyEnabled
    onlyOracleManagerOrAdminRole
    nonReentrant
    returns (address oracle);
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

Does not revert.

```solidity
function getOracle(uint48 maxAge_) external view override returns (address oracle);
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

Does not revert.

```solidity
function getOracles() external view override returns (address[] memory oracles);
```

**Returns**

| Name      | Type        | Description                   |
| --------- | ----------- | ----------------------------- |
| `oracles` | `address[]` | Array of all oracle addresses |

### getPriceCache

Gets the configured price cache policy

Does not revert.

```solidity
function getPriceCache() external view override returns (address policy);
```

**Returns**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `policy` | `address` | The price cache policy address |

### enableCreation

Enables oracle creation

`enableCreation()` sets `isCreationEnabled` to true. It does not update the
enabled-oracle counter or perform recaching logic.

Reverts if:

- The factory is disabled
- The caller is not admin or oracle manager
- Creation is already enabled

```solidity
function enableCreation() external override onlyEnabled onlyOracleManagerOrAdminRole nonReentrant;
```

### disableCreation

Disables oracle creation

`disableCreation()` sets `isCreationEnabled` to false. It does not update the
enabled-oracle counter or perform recaching logic.

Reverts if:

- The factory is disabled
- The caller is not admin, oracle manager, or emergency
- Creation is already disabled

```solidity
function disableCreation() external override onlyEnabled onlyOracleManagerOrAdminOrEmergencyRole nonReentrant;
```

### setPriceCache

Sets the configured price cache policy

Reverts if:

- The factory is disabled
- The caller is not admin
- `policy_` is zero, not IPriceCache-compatible, or bound to a different Kernel

```solidity
function setPriceCache(address policy_) external override onlyEnabled onlyAdminRole nonReentrant;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `policy_` | `address` | The price cache policy address |

### enableOracle

Enables a specific oracle

Reverts if:

- The factory is disabled
- The caller is not admin or oracle manager
- `oracle_` is not a factory-created oracle
- `oracle_` is already enabled

```solidity
function enableOracle(address oracle_) external override onlyEnabled onlyOracleManagerOrAdminRole nonReentrant;
```

**Parameters**

| Name      | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| `oracle_` | `address` | The oracle address to enable |

### disableOracle

Disables a specific oracle

Reverts if:

- The factory is disabled
- The caller is not admin, oracle manager, or emergency
- `oracle_` is not a factory-created oracle
- `oracle_` is already disabled

```solidity
function disableOracle(address oracle_)
    external
    override
    onlyEnabled
    onlyOracleManagerOrAdminOrEmergencyRole
    nonReentrant;
```

**Parameters**

| Name      | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `oracle_` | `address` | The oracle address to disable |

### isOracleEnabled

Checks if a specific oracle is enabled

Reverts if the policy is deactivated in Kernel.

```solidity
function isOracleEnabled(address oracle_) external view override onlyPolicyActive returns (bool enabled);
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
function getOracleContext(address oracle_)
    external
    view
    override
    onlyPolicyActive
    returns (bool enabled, address policy);
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

Reverts if:

- The policy is deactivated in Kernel
- The factory is disabled
- The caller is not a factory-created oracle
- The caller oracle is disabled
- Underlying cache write fails

```solidity
function cachePrice(address base_, address quote_) external override onlyPolicyActive onlyEnabled nonReentrant;
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `base_`  | `address` | The base asset to cache  |
| `quote_` | `address` | The quote asset to cache |

### cachePriceIfNecessary

Cache the direct pair only when stale for the calling oracle's configured max age

Reverts if:

- The policy is deactivated in Kernel
- The factory is disabled
- The caller is not a factory-created oracle
- The caller oracle is disabled
- Underlying cache evaluation/write fails

```solidity
function cachePriceIfNecessary(address base_, address quote_)
    external
    override
    onlyPolicyActive
    onlyEnabled
    nonReentrant;
```

**Parameters**

| Name     | Type      | Description                            |
| -------- | --------- | -------------------------------------- |
| `base_`  | `address` | The base asset to conditionally cache  |
| `quote_` | `address` | The quote asset to conditionally cache |

### \_enable

Implementation-specific enable function

`_enable` optionally re-caches caller-specified pairs from `enableData_` before
the factory-level `isEnabled` flag flips to true. `enableData_` can be empty for
a no-op. Requested pairs are only recached when at least one ERC-7726 oracle
variant is enabled; otherwise all requested pairs are skipped because disabled
clones cannot request fresh cache writes until they are individually re-enabled.
When `enableData_` is non-empty, it must encode:
`(address[] baseTokens, address[] quoteTokens)`.
Reverts if `enableData_` is non-empty and:

- `enableData_` cannot be decoded into `(address[] baseTokens, address[] quoteTokens)`
- The decoded base and quote token arrays have different lengths
- The price cache rejects a requested pair during recaching

```solidity
function _enable(bytes calldata enableData_) internal override;
```

**Parameters**

| Name          | Type    | Description                                                                                                                  |
| ------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `enableData_` | `bytes` | Custom data that can be used by the implementation. The format of this data is left to the discretion of the implementation. |

### \_decodeOracleName

```solidity
function _decodeOracleName(bytes calldata customParams_) internal pure returns (bytes32 oracleName);
```

### \_validateCachingCaller

```solidity
function _validateCachingCaller(address caller_) internal view;
```

### \_hasEnabledOracleVariant

```solidity
function _hasEnabledOracleVariant() internal view returns (bool);
```

### \_setPriceCache

```solidity
function _setPriceCache(address policy_) internal;
```

### \_implementsIPriceCache

```solidity
function _implementsIPriceCache(address policy_) internal view returns (bool);
```

### \_hasSameKernel

```solidity
function _hasSameKernel(address policy_) internal view returns (bool);
```

### supportsInterface

Query if a contract implements an interface

Does not revert.

```solidity
function supportsInterface(bytes4 interfaceId_) public view override returns (bool);
```

**Parameters**

| Name           | Type     | Description                                       |
| -------------- | -------- | ------------------------------------------------- |
| `interfaceId_` | `bytes4` | The interface identifier, as specified in ERC-165 |

**Returns**

| Name     | Type   | Description                                         |
| -------- | ------ | --------------------------------------------------- |
| `<none>` | `bool` | bool True if the contract implements `interfaceId_` |
