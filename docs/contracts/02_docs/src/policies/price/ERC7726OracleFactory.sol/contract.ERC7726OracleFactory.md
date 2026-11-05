# ERC7726OracleFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/price/ERC7726OracleFactory.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IERC7726OracleFactory](/main/contracts/docs/src/policies/interfaces/price/IERC7726OracleFactory.sol/interface.IERC7726OracleFactory), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned), ReentrancyGuard

**Title:** ERC7726OracleFactory

**Author:** OlympusDAO

Factory for deploying generic ERC7726 clone oracles keyed by maxAge

## Constants

### _ROLES_KEYCODE

```solidity
bytes5 internal constant _ROLES_KEYCODE = "ROLES";
```

### ORACLE_IMPLEMENTATION

Reference implementation for cloning

```solidity
ERC7726OracleCloneable public immutable ORACLE_IMPLEMENTATION;
```

### _DEFAULT_ORACLE_NAME

```solidity
bytes32 internal constant _DEFAULT_ORACLE_NAME = "ERC7726 Oracle";
```

## State Variables

### priceCache

The pair cache policy

```solidity
IPriceCache public priceCache;
```

### isCreationEnabled

Whether new oracle creation is enabled

```solidity
bool public isCreationEnabled;
```

### _oracles

Internal array of all deployed oracles

```solidity
address[] internal _oracles;
```

### _enabledOracleCount

Number of deployed oracles that are currently enabled

<i>

Updated when oracles are created, enabled, or disabled. Factory-level re-enable
recaching skips all requested pairs when this count is zero.

</i>

```solidity
uint256 internal _enabledOracleCount;
```

### _maxAgeToOracle

Mapping from maxAge to oracle

```solidity
mapping(uint48 maxAge => address oracle) internal _maxAgeToOracle;
```

### _oracleToMaxAge

Mapping from oracle to maxAge

```solidity
mapping(address oracle => uint48 maxAge) internal _oracleToMaxAge;
```

### isOracle

Mapping to validate deployed oracles

```solidity
mapping(address oracle => bool) public isOracle;
```

### _isOracleEnabled

Mapping to track if an oracle is enabled

```solidity
mapping(address oracle => bool) internal _isOracleEnabled;
```

## Functions

<a id="constructor-kernel-address"></a>

### constructor

Constructs a new ERC7726OracleFactory

<i>

Reverts if `priceCache_` is not a valid IPriceCache policy for this Kernel.

</i>

```solidity
constructor(Kernel kernel_, address priceCache_) Policy(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` | The Kernel address |
| priceCache_ | `address` | The price cache policy address |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

<i>

Reverts if the configured ROLES module major version is unsupported.

</i>

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

<i>

Does not revert.

</i>

```solidity
function requestPermissions() external pure override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="version"></a>

### VERSION

Returns the version of the contract

<i>

Does not revert.

</i>

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="onlypolicyactive"></a>

### onlyPolicyActive

Reverts if this policy is not active in the Kernel.

```solidity
modifier onlyPolicyActive();
```

<a id="_onlypolicyactive"></a>

### _onlyPolicyActive

```solidity
function _onlyPolicyActive() internal view;
```

<a id="_onlyoraclemanageroradminrole"></a>

### _onlyOracleManagerOrAdminRole

```solidity
function _onlyOracleManagerOrAdminRole() internal view;
```

<a id="_onlyoraclemanageroradminoremergencyrole"></a>

### _onlyOracleManagerOrAdminOrEmergencyRole

```solidity
function _onlyOracleManagerOrAdminOrEmergencyRole() internal view;
```

<a id="onlyoraclemanageroradminrole"></a>

### onlyOracleManagerOrAdminRole

```solidity
modifier onlyOracleManagerOrAdminRole();
```

<a id="onlyoraclemanageroradminoremergencyrole"></a>

### onlyOracleManagerOrAdminOrEmergencyRole

```solidity
modifier onlyOracleManagerOrAdminOrEmergencyRole();
```

<a id="createoracle-uint48-bytes"></a>

### createOracle

Creates a new oracle for a specific maxAge

<i>

Creates an enabled oracle and adds it to the factory-level re-enable recache count.

</i>

<i>

Reverts if:

- The factory is disabled
- The caller is not admin or oracle manager
- Oracle creation is disabled
- An oracle for `maxAge_` already exists
- `customParams_` is non-empty and not exactly 32 bytes

</i>

```solidity
function createOracle(
        uint48 maxAge_,
        bytes calldata customParams_
    )
        external
        override
        onlyEnabled
        onlyOracleManagerOrAdminRole
        nonReentrant
        returns (address oracle);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxAge_ | `uint48` | The maximum age (in seconds) of cached prices used by the oracle |
| customParams_ | `bytes` | Optional params for factory-specific customization |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | `address` | The address of the created oracle |

<a id="getoracle-uint48"></a>

### getOracle

Gets the oracle address for a maxAge

<i>

Does not revert.

</i>

```solidity
function getOracle(uint48 maxAge_) external view override returns (address oracle);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxAge_ | `uint48` | The maximum age used by the oracle |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | `address` | The oracle address, or address(0) if not found |

<a id="getoracles"></a>

### getOracles

Gets all deployed oracle addresses

<i>

Does not revert.

</i>

```solidity
function getOracles() external view override returns (address[] memory oracles);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracles | `address[]` | Array of all oracle addresses |

<a id="getpricecache"></a>

### getPriceCache

Gets the configured price cache policy

<i>

Does not revert.

</i>

```solidity
function getPriceCache() external view override returns (address policy);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy | `address` | The price cache policy address |

<a id="enablecreation"></a>

### enableCreation

Enables oracle creation

<i>

`enableCreation()` sets `isCreationEnabled` to true. It does not update the
enabled-oracle counter or perform recaching logic.

</i>

<i>

Reverts if:

- The factory is disabled
- The caller is not admin or oracle manager
- Creation is already enabled

</i>

```solidity
function enableCreation()
        external
        override
        onlyEnabled
        onlyOracleManagerOrAdminRole
        nonReentrant;
```

<a id="disablecreation"></a>

### disableCreation

Disables oracle creation

<i>

`disableCreation()` sets `isCreationEnabled` to false. It does not update the
enabled-oracle counter or perform recaching logic.

</i>

<i>

Reverts if:

- The factory is disabled
- The caller is not admin, oracle manager, or emergency
- Creation is already disabled

</i>

```solidity
function disableCreation()
        external
        override
        onlyEnabled
        onlyOracleManagerOrAdminOrEmergencyRole
        nonReentrant;
```

<a id="setpricecache-address"></a>

### setPriceCache

Sets the configured price cache policy

<i>

Reverts if:

- The factory is disabled
- The caller is not admin
- `policy_` is zero, not IPriceCache-compatible, or bound to a different Kernel

</i>

```solidity
function setPriceCache(
        address policy_
    ) external override onlyEnabled onlyAdminRole nonReentrant;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` | The price cache policy address |

<a id="enableoracle-address"></a>

### enableOracle

Enables a specific oracle

<i>

Reverts if:

- The factory is disabled
- The caller is not admin or oracle manager
- `oracle_` is not a factory-created oracle
- `oracle_` is already enabled

</i>

```solidity
function enableOracle(
        address oracle_
    ) external override onlyEnabled onlyOracleManagerOrAdminRole nonReentrant;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle_ | `address` | The oracle address to enable |

<a id="disableoracle-address"></a>

### disableOracle

Disables a specific oracle

<i>

Reverts if:

- The factory is disabled
- The caller is not admin, oracle manager, or emergency
- `oracle_` is not a factory-created oracle
- `oracle_` is already disabled

</i>

```solidity
function disableOracle(
        address oracle_
    ) external override onlyEnabled onlyOracleManagerOrAdminOrEmergencyRole nonReentrant;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle_ | `address` | The oracle address to disable |

<a id="isoracleenabled-address"></a>

### isOracleEnabled

Checks if a specific oracle is enabled

<i>

Reverts if the policy is deactivated in Kernel.

</i>

```solidity
function isOracleEnabled(
        address oracle_
    ) external view override onlyPolicyActive returns (bool enabled);
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
function getOracleContext(
        address oracle_
    ) external view override onlyPolicyActive returns (bool enabled, address policy);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle_ | `address` | The oracle address to check |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enabled | `bool` | True if the oracle is enabled, false otherwise |
| policy | `address` | The configured price cache policy address |

<a id="cacheprice-address-address"></a>

### cachePrice

Cache the direct pair unconditionally for the calling oracle

<i>

Reverts if:

- The policy is deactivated in Kernel
- The factory is disabled
- The caller is not a factory-created oracle
- The caller oracle is disabled
- Underlying cache write fails

</i>

```solidity
function cachePrice(
        address base_,
        address quote_
    ) external override onlyPolicyActive onlyEnabled nonReentrant;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| base_ | `address` | The base asset to cache |
| quote_ | `address` | The quote asset to cache |

<a id="cachepriceifnecessary-address-address"></a>

### cachePriceIfNecessary

Cache the direct pair only when stale for the calling oracle's configured max age

<i>

Reverts if:

- The policy is deactivated in Kernel
- The factory is disabled
- The caller is not a factory-created oracle
- The caller oracle is disabled
- Underlying cache evaluation/write fails

</i>

```solidity
function cachePriceIfNecessary(
        address base_,
        address quote_
    ) external override onlyPolicyActive onlyEnabled nonReentrant;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| base_ | `address` | The base asset to conditionally cache |
| quote_ | `address` | The quote asset to conditionally cache |

<a id="_enable-bytes"></a>

### _enable

<i>

`_enable` optionally re-caches caller-specified pairs from `enableData_` before
the factory-level `isEnabled` flag flips to true. `enableData_` can be empty for
a no-op. Requested pairs are only recached when at least one ERC-7726 oracle
variant is enabled; otherwise all requested pairs are skipped because disabled
clones cannot request fresh cache writes until they are individually re-enabled.

</i>

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| enableData_ | `bytes` | Custom data that can be used by the implementation. The format of this data is<br/>left to the discretion of the implementation. |

<a id="_decodeoraclename-bytes"></a>

### _decodeOracleName

```solidity
function _decodeOracleName(
        bytes calldata customParams_
    ) internal pure returns (bytes32 oracleName);
```

**Parameters**

| Name          | Type    | Description |
| ------------- | ------- | ----------- |
| customParams_ | `bytes` |             |

**Returns**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| oracleName | `bytes32` |             |

<a id="_validatecachingcaller-address"></a>

### _validateCachingCaller

```solidity
function _validateCachingCaller(address caller_) internal view;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| caller_ | `address` |             |

<a id="_hasenabledoraclevariant"></a>

### _hasEnabledOracleVariant

```solidity
function _hasEnabledOracleVariant() internal view returns (bool);
```

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="_setpricecache-address"></a>

### _setPriceCache

```solidity
function _setPriceCache(address policy_) internal;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| policy_ | `address` |             |

<a id="_implementsipricecache-address"></a>

### _implementsIPriceCache

```solidity
function _implementsIPriceCache(address policy_) internal view returns (bool);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| policy_ | `address` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="_hassamekernel-address"></a>

### _hasSameKernel

```solidity
function _hasSameKernel(address policy_) internal view returns (bool);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| policy_ | `address` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

Query if a contract implements an interface

<i>

Does not revert.

</i>

```solidity
function supportsInterface(bytes4 interfaceId_) public view override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` | The interface identifier, as specified in ERC-165 |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool            True if the contract implements `interfaceId_` |
