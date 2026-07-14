# BaseOracleFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/policies/price/BaseOracleFactory.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IOracleFactory](/main/contracts/docs/src/policies/interfaces/price/IOracleFactory.sol/interface.IOracleFactory), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned), ReentrancyGuard

**Title:**
BaseOracleFactory

**Author:**
OlympusDAO

forge-lint: disable-start(mixed-case-function,mixed-case-variable)

Abstract base contract for oracle factories with common functionality

Uses ClonesWithImmutableArgs for gas-efficient oracle deployment

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

### \_tokensToOracle

Mapping from base token to quote token to maxAge to oracle address

```solidity
mapping(address baseToken => mapping(address quoteToken => mapping(uint48 maxAge => address oracle))) internal
    _tokensToOracle
```

### \_oraclePairVariantCounts

Mapping from an ordered base/quote pair to the number of deployed oracle variants

Updated when oracles are created. Factory-level re-enable uses this count to reject
unknown pairs before checking whether any deployed variant is enabled.

```solidity
mapping(bytes32 pairKey => uint256 variantCount) internal _oraclePairVariantCounts
```

### \_enabledOraclePairVariantCounts

Mapping from an ordered base/quote pair to the number of enabled oracle variants

Updated when oracles are created, enabled, or disabled. Factory-level re-enable
recaching uses this count to skip pairs that currently have no enabled oracle.

```solidity
mapping(bytes32 pairKey => uint256 variantCount) internal _enabledOraclePairVariantCounts
```

### \_oracles

Internal array of all deployed oracles

```solidity
address[] internal _oracles
```

### isOracle

Mapping to validate deployed oracles

```solidity
mapping(address => bool) public isOracle
```

### \_oracleToBaseToken

Mapping from oracle to base token

```solidity
mapping(address oracle => address baseToken) internal _oracleToBaseToken
```

### \_oracleToQuoteToken

Mapping from oracle to quote token

```solidity
mapping(address oracle => address quoteToken) internal _oracleToQuoteToken
```

### \_oracleToMaxAge

Mapping from oracle to maxAge

```solidity
mapping(address oracle => uint48 maxAge) internal _oracleToMaxAge
```

### \_isOracleEnabled

Mapping to track if an oracle is enabled

```solidity
mapping(address => bool) internal _isOracleEnabled
```

### isCreationEnabled

Whether new oracle creation is enabled

```solidity
bool public isCreationEnabled
```

## Functions

### constructor

Constructs a new BaseOracleFactory

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
function VERSION() external pure virtual override returns (uint8 major, uint8 minor);
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

Checks if the caller has the oracle_manager or admin role

```solidity
function _onlyOracleManagerOrAdminRole() internal view;
```

### \_onlyOracleManagerOrAdminOrEmergencyRole

Checks if the caller has the oracle_manager, admin, or emergency role

```solidity
function _onlyOracleManagerOrAdminOrEmergencyRole() internal view;
```

### onlyOracleManagerOrAdminRole

Modifier that reverts if the caller does not have the oracle_manager or admin role

```solidity
modifier onlyOracleManagerOrAdminRole() ;
```

### onlyOracleManagerOrAdminOrEmergencyRole

Modifier that reverts if the caller does not have the oracle_manager, admin, or emergency role

```solidity
modifier onlyOracleManagerOrAdminOrEmergencyRole() ;
```

### \_getOracleImplementation

Returns the oracle implementation address for cloning

```solidity
function _getOracleImplementation() internal view virtual returns (address);
```

**Returns**

| Name     | Type      | Description                                                            |
| -------- | --------- | ---------------------------------------------------------------------- |
| `<none>` | `address` | address The address of the oracle implementation contract to be cloned |

### \_encodeOracleData

Encodes oracle-specific data for cloning

This function should perform service-specific validation, calculate parameters,
and encode the immutable args for the clone

```solidity
function _encodeOracleData(address baseToken_, address quoteToken_, uint48 maxAge_, bytes calldata customParams_)
    internal
    view
    virtual
    returns (bytes memory);
```

**Parameters**

| Name            | Type      | Description                                                      |
| --------------- | --------- | ---------------------------------------------------------------- |
| `baseToken_`    | `address` | The base token address                                           |
| `quoteToken_`   | `address` | The quote token address                                          |
| `maxAge_`       | `uint48`  | The maximum age (in seconds) of cached prices used by the oracle |
| `customParams_` | `bytes`   | Service-specific custom parameters (can be empty)                |

**Returns**

| Name     | Type    | Description                         |
| -------- | ------- | ----------------------------------- |
| `<none>` | `bytes` | bytes The encoded bytes for cloning |

### createOracle

Creates a new oracle for a base/quote token pair

Creates an enabled oracle only after the initial cache write succeeds.

Reverts if:

- The factory is disabled
- The caller is not admin or oracle manager
- Oracle creation is disabled
- An oracle for `(baseToken_, quoteToken_, maxAge_)` already exists
- Either token is the zero address or both tokens are the same
- Service-specific validation in `_encodeOracleData` fails
- Initial cache population fails in the configured price cache policy

```solidity
function createOracle(address baseToken_, address quoteToken_, uint48 maxAge_, bytes calldata customParams_)
    external
    override
    onlyEnabled
    onlyOracleManagerOrAdminRole
    nonReentrant
    returns (address oracle);
```

**Parameters**

| Name            | Type      | Description                                                      |
| --------------- | --------- | ---------------------------------------------------------------- |
| `baseToken_`    | `address` | The base token address                                           |
| `quoteToken_`   | `address` | The quote token address                                          |
| `maxAge_`       | `uint48`  | The maximum age (in seconds) of cached prices used by the oracle |
| `customParams_` | `bytes`   | Service-specific custom parameters (can be empty)                |

**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `oracle` | `address` | The address of the created oracle |

### getOracle

Gets the oracle address for a base/quote token pair

Does not revert.

```solidity
function getOracle(address baseToken_, address quoteToken_, uint48 maxAge_)
    external
    view
    override
    returns (address oracle);
```

**Parameters**

| Name          | Type      | Description                                                      |
| ------------- | --------- | ---------------------------------------------------------------- |
| `baseToken_`  | `address` | The base token address                                           |
| `quoteToken_` | `address` | The quote token address                                          |
| `maxAge_`     | `uint48`  | The maximum age (in seconds) of cached prices used by the oracle |

**Returns**

| Name     | Type      | Description                                           |
| -------- | --------- | ----------------------------------------------------- |
| `oracle` | `address` | The address of the oracle, or address(0) if not found |

### getPriceCache

Gets the configured price cache policy

Does not revert.

```solidity
function getPriceCache() external view override returns (address);
```

**Returns**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `<none>` | `address` | policy The price cache policy address |

### getOracles

Gets all deployed oracle addresses

Does not revert.

```solidity
function getOracles() external view override returns (address[] memory);
```

**Returns**

| Name     | Type        | Description                           |
| -------- | ----------- | ------------------------------------- |
| `<none>` | `address[]` | oracles Array of all oracle addresses |

### enableCreation

Enables oracle creation

Reverts if:

- The factory is disabled
- The caller is not admin or oracle manager
- Creation is already enabled

```solidity
function enableCreation() external override onlyEnabled onlyOracleManagerOrAdminRole nonReentrant;
```

### disableCreation

Disables oracle creation

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

Refreshes the oracle pair cache if stale before marking the oracle enabled.

Reverts if:

- The caller does not have the required role
- The contract is disabled
- The oracle is not created by the factory
- The oracle is already enabled

```solidity
function enableOracle(address oracle_) external override onlyEnabled onlyOracleManagerOrAdminRole nonReentrant;
```

**Parameters**

| Name      | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| `oracle_` | `address` | The oracle address to enable |

### disableOracle

Disables a specific oracle

Decrements the enabled variant count for the oracle pair so factory-level
re-enable skips the pair when no enabled variants remain.

Reverts if:

- The caller does not have the required role
- The contract is disabled
- The oracle is not created by the factory
- The oracle is already disabled

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

Reverts if:

- The policy is deactivated in Kernel
  Determines if a given oracle is enabled, using the following logic:
- Factory must be enabled
- Oracle must be created by the factory
- Oracle must be enabled

```solidity
function isOracleEnabled(address oracle_) external view override onlyPolicyActive returns (bool);
```

**Parameters**

| Name      | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `oracle_` | `address` | The oracle address to check |

**Returns**

| Name     | Type   | Description                                            |
| -------- | ------ | ------------------------------------------------------ |
| `<none>` | `bool` | enabled True if the oracle is enabled, false otherwise |

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

Caches the provided base/quote pair

Reverts if:

- The policy is deactivated in Kernel
- The factory is disabled
- The caller is not a factory-created oracle
- The caller oracle is disabled
- `(baseToken_, quoteToken_)` does not match the caller oracle pair
- Underlying cache write fails

```solidity
function cachePrice(address baseToken_, address quoteToken_)
    external
    override
    onlyPolicyActive
    onlyEnabled
    nonReentrant;
```

**Parameters**

| Name          | Type      | Description             |
| ------------- | --------- | ----------------------- |
| `baseToken_`  | `address` | The base token address  |
| `quoteToken_` | `address` | The quote token address |

### cachePriceIfNecessary

Caches the provided base/quote pair only when stale

Reverts if:

- The policy is deactivated in Kernel
- The factory is disabled
- The caller is not a factory-created oracle
- The caller oracle is disabled
- `(baseToken_, quoteToken_)` does not match the caller oracle pair
- Underlying cache evaluation/write fails

```solidity
function cachePriceIfNecessary(address baseToken_, address quoteToken_)
    external
    override
    onlyPolicyActive
    onlyEnabled
    nonReentrant;
```

**Parameters**

| Name          | Type      | Description             |
| ------------- | --------- | ----------------------- |
| `baseToken_`  | `address` | The base token address  |
| `quoteToken_` | `address` | The quote token address |

### \_cacheOraclePrices

Caches prices for the configured oracle token pair

```solidity
function _cacheOraclePrices(address oracle_) internal;
```

**Parameters**

| Name      | Type      | Description                                         |
| --------- | --------- | --------------------------------------------------- |
| `oracle_` | `address` | The oracle whose base/quote tokens should be cached |

### \_cachePriceIfNecessary

Conditionally caches prices for the token pair based on direct pair staleness

```solidity
function _cachePriceIfNecessary(address oracle_, address baseToken_, address quoteToken_) internal;
```

### \_enable

Implementation-specific enable function

`_enable` optionally re-caches caller-specified direct pairs from `enableData_`
before the factory-level `isEnabled` flag flips back to true. `enableData_` can
be empty for a no-op. Pairs with deployed variants are recached only when at
least one variant is currently enabled; disabled oracles validate and refresh
their own pair cache when individually re-enabled.
When `enableData_` is non-empty, it must encode:
`(address[] baseTokens, address[] quoteTokens)`.
Reverts if `enableData_` is non-empty and:

- `enableData_` cannot be decoded into `(address[] baseTokens, address[] quoteTokens)`
- The decoded base and quote token arrays have different lengths
- A requested pair has no deployed oracle variant for that exact ordering
- The price cache rejects a requested pair that has an enabled oracle variant

```solidity
function _enable(bytes calldata enableData_) internal virtual override;
```

**Parameters**

| Name          | Type    | Description                                                                                                                  |
| ------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `enableData_` | `bytes` | Custom data that can be used by the implementation. The format of this data is left to the discretion of the implementation. |

### \_hasOracleVariant

Returns whether the factory has a deployed oracle for the provided pair.

```solidity
function _hasOracleVariant(bytes32 pairKey_) internal view returns (bool);
```

### \_hasEnabledOracleVariant

Returns whether the factory has an enabled oracle for the provided pair.

```solidity
function _hasEnabledOracleVariant(bytes32 pairKey_) internal view returns (bool);
```

### \_oraclePairKey

Returns the storage key for an ordered oracle base/quote pair.

```solidity
function _oraclePairKey(address baseToken_, address quoteToken_) internal pure returns (bytes32);
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

### \_validateCachingCaller

```solidity
function _validateCachingCaller(address caller_) internal view;
```

### \_validateCachingPair

```solidity
function _validateCachingPair(address caller_, address baseToken_, address quoteToken_) internal view;
```

### supportsInterface

Query if a contract implements an interface

Does not revert.

```solidity
function supportsInterface(bytes4 interfaceId_) public view virtual override returns (bool);
```

**Parameters**

| Name           | Type     | Description                                       |
| -------------- | -------- | ------------------------------------------------- |
| `interfaceId_` | `bytes4` | The interface identifier, as specified in ERC-165 |

**Returns**

| Name     | Type   | Description                                                            |
| -------- | ------ | ---------------------------------------------------------------------- |
| `<none>` | `bool` | bool True if the contract implements interfaceId\_ and false otherwise |
