# PriceConfigv2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/price/PriceConfig.v2.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [TimelockQueue](/main/contracts/docs/src/policies/utils/TimelockQueue.sol/abstract.TimelockQueue), [IPriceConfigv2](/main/contracts/docs/src/policies/interfaces/IPriceConfigv2.sol/interface.IPriceConfigv2), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

Policy to configure PRICEv2

<i>

Some functions in this policy are gated to addresses with the "price_admin" or "admin" roles.
Timelocked actions assume an independent emergency role can cancel malicious or stale queued actions.

</i>

## Constants

### _PRICE_KEYCODE

```solidity
bytes5 internal constant _PRICE_KEYCODE = "PRICE";
```

### _ROLES_KEYCODE

```solidity
bytes5 internal constant _ROLES_KEYCODE = "ROLES";
```

### _PRICE_ADMIN_ROLE

```solidity
bytes32 internal constant _PRICE_ADMIN_ROLE = "price_admin";
```

### _BPS_MAX

```solidity
uint16 internal constant _BPS_MAX = 10_000;
```

### MIN_TIMELOCK_DELAY

```solidity
uint48 public constant MIN_TIMELOCK_DELAY = 1 days;
```

### MAX_TIMELOCK_DELAY

```solidity
uint48 public constant MAX_TIMELOCK_DELAY = 30 days;
```

### EXECUTION_WINDOW

```solidity
uint48 public constant EXECUTION_WINDOW = 7 days;
```

## State Variables

### PRICE

```solidity
PRICEv2 public PRICE;
```

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) Policy(kernel_) TimelockQueue(MIN_TIMELOCK_DELAY);
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| kernel_ | `Kernel` |             |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

<i>

Reverts if:

- The configured PRICE module version is unsupported
- The configured PRICE module does not implement IPRICEv2
- The configured ROLES module major version is unsupported

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
function requestPermissions() external view override returns (Permissions[] memory requests);
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
function VERSION() external pure override returns (uint8, uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| &lt;none&gt; | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="_onlypriceoradminrole"></a>

### _onlyPriceOrAdminRole

```solidity
function _onlyPriceOrAdminRole() internal view;
```

<a id="onlypriceoradminrole"></a>

### onlyPriceOrAdminRole

Modifier that reverts if the caller does not have the admin or price_admin role

```solidity
modifier onlyPriceOrAdminRole();
```

<a id="queuetimelockdelay-uint48"></a>

### queueTimelockDelay

Queue a timelocked change to the timelock delay

<i>

Reverts if:

- The policy is disabled
- The caller does not have the `admin` role
- The delay is outside the accepted range

</i>

```solidity
function queueTimelockDelay(uint48 delay_) external override returns (uint64 actionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay_ | `uint48` | The new timelock delay in seconds |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID |

<a id="_executeaction-uint64-itimelockqueue-queuedaction"></a>

### _executeAction

Execute an implementation-specific queued action.

<i>

Called by `executeQueuedAction` after the standard timelock state checks and
`_validateExecution` pass. Dispatches the queued target/selector to the
corresponding PRICE or local operation.

</i>

<i>

Reverts if:

- The queued target and selector pair is not supported
- The queued payload cannot be decoded for the supported action
- PRICE rejects the queued operation at execution time
- An execOnSubmodule action no longer points to the submodule implementation
that was installed when it was queued

</i>

```solidity
function _executeAction(uint64, ITimelockQueue.QueuedAction memory action_) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `uint64` | The queued action ID. |
| action_ | `ITimelockQueue.QueuedAction` | A memory copy of the queued action. |

<a id="_validatequeue-address-address-bytes4-bytes"></a>

### _validateQueue

Validate whether an action can be queued.

<i>

Called by `_queueAction` before a queued action is stored. This is the queue-time
gate for PriceConfig actions: it checks enabled status, queue authorization,
supported target/selector pairs, and action-specific PRICE validation.

</i>

<i>

Reverts if:

- The policy is disabled
- The caller cannot queue the requested action
- The target/selector pair is not supported
- The payload cannot be decoded for the action
- PRICE rejects the action-specific queue parameters
- An execOnSubmodule payload does not match the currently installed submodule
implementation

</i>

```solidity
function _validateQueue(
        address caller_,
        address target_,
        bytes4 selector_,
        bytes memory payload_
    ) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account queueing the action. |
| target_ | `address` | The contract expected to receive the queued action. |
| selector_ | `bytes4` | The function selector for the queued action. |
| payload_ | `bytes` | Encoded parameters for the action. |

<a id="_validateexecution-address-uint64-itimelockqueue-queuedaction"></a>

### _validateExecution

Validate implementation-specific execution rules.

<i>

Called by `executeQueuedAction` after the standard timelock state checks pass
and before `_executeAction` runs. Execution is deliberately permissionless; this
hook only enforces enabled status and rejects unknown action targets/selectors.

</i>

<i>

Authorization is not repeated here because the proposer was checked by
`_validateQueue`. Requiring an execution role would let an unavailable or
compromised executor block already-approved timelocked changes.

</i>

<i>

Reverts if:

- The policy is disabled
- The queued target/selector pair is not supported

</i>

```solidity
function _validateExecution(
        address,
        uint64,
        ITimelockQueue.QueuedAction memory action_
    ) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `address` | The account executing the action. |
| _ | `uint64` | The queued action ID. |
| action_ | `ITimelockQueue.QueuedAction` | A memory copy of the queued action. |

<a id="_validatecancellation-address-uint64-itimelockqueue-queuedaction"></a>

### _validateCancellation

Validate implementation-specific cancellation rules.

<i>

Called by `cancelQueuedAction` after the standard cancellable-state checks pass.
Cancellation is intentionally allowed while the policy is disabled so the
emergency role can clear malicious or stale queued actions.

</i>

<i>

The emergency role is separate from the roles that can queue actions. This gives
emergency operators a narrow veto path without granting them PRICE configuration
authority or timelock-delay authority.

</i>

<i>

Reverts if:

- The caller does not have the emergency role

</i>

```solidity
function _validateCancellation(
        address caller_,
        uint64,
        ITimelockQueue.QueuedAction memory
    ) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account cancelling the action. |
| _ | `uint64` | The queued action ID. |
| _ | `ITimelockQueue.QueuedAction` | A memory copy of the queued action. |

<a id="_validatetimelockdelay-uint48"></a>

### _validateTimelockDelay

Validate a timelock delay.

<i>

Child contracts must revert on failure.

</i>

```solidity
function _validateTimelockDelay(uint48 delay_) internal pure override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay_ | `uint48` | The delay to validate. |

<a id="_executionwindow"></a>

### _executionWindow

Return the execution window for queued actions.

```solidity
function _executionWindow() internal pure override returns (uint48 executionWindow_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| executionWindow_ | `uint48` | The execution window in seconds. |

<a id="_validateremoveassetpayload-address-bytes4-bytes"></a>

### _validateRemoveAssetPayload

Validate a queued removeAsset payload before it is stored.

<i>

Called from `_validateQueue` after the caller has been authorized to queue PRICE
mutations. Uses PRICE's view validator so queue-time checks match PRICE mutation-time
invariants.

</i>

<i>

Reverts if the payload cannot be decoded as an address or PRICE rejects removing
the decoded asset.

</i>

```solidity
function _validateRemoveAssetPayload(address, bytes4, bytes memory payload_) internal view;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| _        | `address` |             |
| _        | `bytes4`  |             |
| payload_ | `bytes`   |             |

<a id="_validateupdateassetpayload-address-bytes4-bytes"></a>

### _validateUpdateAssetPayload

Validate a queued updateAsset payload before it is stored.

<i>

Called from `_validateQueue` after the caller has been authorized to queue PRICE
mutations. Keeps feed expectation count validation in this policy because feed
expectations are a PriceConfig safety check, then uses PRICE's view validator for
PRICE-owned invariants.

</i>

<i>

Reverts if the payload cannot be decoded as updateAsset parameters, has an invalid
feed expectation count, or PRICE rejects the decoded update parameters.

</i>

```solidity
function _validateUpdateAssetPayload(address, bytes4, bytes memory payload_) internal view;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| _        | `address` |             |
| _        | `bytes4`  |             |
| payload_ | `bytes`   |             |

<a id="_validateupgradesubmodulepayload-address-bytes4-bytes"></a>

### _validateUpgradeSubmodulePayload

Validate a queued upgradeSubmodule payload before it is stored.

<i>

Called from `_validateQueue` after the caller has been authorized to queue PRICE
mutations. Uses PRICE's view validator so queue-time checks match PRICE submodule
upgrade invariants.

</i>

<i>

Reverts if the payload cannot be decoded as an address or PRICE rejects upgrading
to the decoded submodule.

</i>

```solidity
function _validateUpgradeSubmodulePayload(
        address,
        bytes4,
        bytes memory payload_
    ) internal view;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| _        | `address` |             |
| _        | `bytes4`  |             |
| payload_ | `bytes`   |             |

<a id="_validateexeconsubmodulepayload-address-bytes4-bytes"></a>

### _validateExecOnSubmodulePayload

Validate a queued execOnSubmodule payload before it is stored.

<i>

Called from `_validateQueue` after the caller has been authorized to queue PRICE
mutations. Binds the queued call to the current submodule implementation so a later
submodule upgrade cannot silently redirect already-reviewed calldata to different
code.

</i>

<i>

Reverts if the payload cannot be decoded as execOnSubmodule parameters, PRICE
rejects the decoded subkeycode, or the decoded submodule implementation does not
match the currently installed submodule.

</i>

```solidity
function _validateExecOnSubmodulePayload(address, bytes4, bytes memory payload_) internal view;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| _        | `address` |             |
| _        | `bytes4`  |             |
| payload_ | `bytes`   |             |

<a id="_validatetimelockdelaypayload-address-bytes4-bytes"></a>

### _validateTimelockDelayPayload

Validate a queued timelock delay payload before it is stored.

<i>

Called by `_validateQueue` for local timelock delay updates after the caller has
been authorized as admin. Delay updates affect all future queued actions, so invalid
delays are rejected before the action is stored.

</i>

<i>

Reverts if the payload cannot be decoded as a `uint48`, or the decoded delay is
outside the accepted range.

</i>

```solidity
function _validateTimelockDelayPayload(address, bytes4, bytes memory payload_) internal pure;
```

**Parameters**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| _        | `address` |                                    |
| _        | `bytes4`  |                                    |
| payload_ | `bytes`   | The encoded queued action payload. |

<a id="_validatepricefeedexpectations-address-ipricev2-component-pricefeedexpectation"></a>

### _validatePriceFeedExpectations

Validates each feed against its configured expected price

<i>

This is a configuration-time plausibility check only. It does
not prove feed identity, since another asset with a similar
price can still pass within tolerance.

</i>

```solidity
function _validatePriceFeedExpectations(
        address asset_,
        IPRICEv2.Component[] memory feeds_,
        PriceFeedExpectation[] memory feedExpectations_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset being configured |
| feeds_ | `IPRICEv2.Component[]` | The feeds to validate |
| feedExpectations_ | `PriceFeedExpectation[]` | The expected price and tolerance for each feed |

<a id="_validateupdatefeedexpectationcount-address-uint256-pricefeedexpectation"></a>

### _validateUpdateFeedExpectationCount

```solidity
function _validateUpdateFeedExpectationCount(
        address asset_,
        uint256 expectedCount_,
        PriceFeedExpectation[] memory feedExpectations_
    ) internal pure;
```

**Parameters**

| Name              | Type                     | Description |
| ----------------- | ------------------------ | ----------- |
| asset_            | `address`                |             |
| expectedCount_    | `uint256`                |             |
| feedExpectations_ | `PriceFeedExpectation[]` |             |

<a id="_executeupdateasset-address-ipricev2-updateassetparams-pricefeedexpectation"></a>

### _executeUpdateAsset

```solidity
function _executeUpdateAsset(
        address asset_,
        IPRICEv2.UpdateAssetParams memory params_,
        PriceFeedExpectation[] memory feedExpectations_
    ) internal;
```

**Parameters**

| Name              | Type                         | Description |
| ----------------- | ---------------------------- | ----------- |
| asset_            | `address`                    |             |
| params_           | `IPRICEv2.UpdateAssetParams` |             |
| feedExpectations_ | `PriceFeedExpectation[]`     |             |

<a id="registernoncontractasset-address"></a>

### registerNonContractAsset

Register a non-contract asset for management by the PRICE module

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- `asset_` is the zero address
- `asset_` is a contract
- `asset_` is reserved or otherwise invalid under PRICE rules
- `asset_` is already registered as a non-contract asset
- PRICE rejects the registration

</i>

```solidity
function registerNonContractAsset(
        address asset_
    ) external override onlyEnabled onlyPriceOrAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The non-contract asset address to register |

<a id="unregisternoncontractasset-address"></a>

### unregisterNonContractAsset

Deregister a non-contract asset from management by the PRICE module

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- PRICE rejects the deregistration

</i>

```solidity
function unregisterNonContractAsset(
        address asset_
    ) external override onlyEnabled onlyPriceOrAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The non-contract asset address to deregister |

<a id="addasset-address-bool-bool-uint32-uint48-uint256-ipricev2-component-ipricev2-component-pricefeedexpectation"></a>

### addAsset

Configure a new asset on the PRICE module

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- PRICE rejects the asset configuration
- Any feed expectation is invalid or outside the accepted tolerance

</i>

```solidity
function addAsset(
        address asset_,
        bool storeMovingAverage_,
        bool useMovingAverage_,
        uint32 movingAverageDuration_,
        uint48 lastObservationTime_,
        uint256[] memory observations_,
        IPRICEv2.Component memory strategy_,
        IPRICEv2.Component[] memory feeds_,
        PriceFeedExpectation[] memory feedExpectations_
    ) external override onlyEnabled onlyPriceOrAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset to add |
| storeMovingAverage_ | `bool` | Whether to store the moving average for this asset |
| useMovingAverage_ | `bool` | Whether to use the moving average as part of the price resolution strategy for this asset |
| movingAverageDuration_ | `uint32` | The duration of the moving average in seconds, only used if `storeMovingAverage_` is true |
| lastObservationTime_ | `uint48` | The timestamp of the last observation |
| observations_ | `uint256[]` | The array of observations to add - the number of observations must match the moving average duration divided by the PRICEv2 observation frequency |
| strategy_ | `IPRICEv2.Component` | The price resolution strategy to use for this asset |
| feeds_ | `IPRICEv2.Component[]` | The array of price feeds to use for this asset |
| feedExpectations_ | `PriceFeedExpectation[]` | Expected price and tolerance for each feed, aligned by index with `feeds_` |

<a id="queueremoveasset-address"></a>

### queueRemoveAsset

Queue removal of an asset from the PRICE module

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- The removal queue parameters are invalid

</i>

```solidity
function queueRemoveAsset(address asset_) external override returns (uint64 actionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset to remove |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID |

<a id="queueupdateasset-address-ipricev2-updateassetparams-pricefeedexpectation"></a>

### queueUpdateAsset

Queue an atomic asset configuration update

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- The update queue parameters are invalid

</i>

```solidity
function queueUpdateAsset(
        address asset_,
        IPRICEv2.UpdateAssetParams memory params_,
        PriceFeedExpectation[] memory feedExpectations_
    ) external override returns (uint64 actionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset to update |
| params_ | `IPRICEv2.UpdateAssetParams` | Update parameters with flags indicating which components to update |
| feedExpectations_ | `PriceFeedExpectation[]` | Expected price and tolerance for each feed when `params_.updateFeeds` is true. Must be empty otherwise. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID |

<a id="storeobservation-address"></a>

### storeObservation

Store a price observation for an asset

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- PRICE rejects storing the observation

</i>

```solidity
function storeObservation(address asset_) external override onlyEnabled onlyPriceOrAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of asset |

<a id="storeobservations"></a>

### storeObservations

Store the current price of all assets that track a moving average

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- PRICE rejects storing observations

</i>

```solidity
function storeObservations() external override onlyEnabled onlyPriceOrAdminRole;
```

<a id="installsubmodule-address"></a>

### installSubmodule

Install a new submodule on the designated module

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- PRICE rejects submodule installation

</i>

```solidity
function installSubmodule(
        address submodule_
    ) external override onlyEnabled onlyPriceOrAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| submodule_ | `address` | The address of the submodule to install |

<a id="queueupgradesubmodule-address"></a>

### queueUpgradeSubmodule

Queue an upgrade of a submodule on the PRICE module

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- The submodule upgrade queue parameters are invalid

</i>

```solidity
function queueUpgradeSubmodule(
        address submodule_
    ) external override returns (uint64 actionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| submodule_ | `address` | The address of the submodule to upgrade to |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID |

<a id="queueexeconsubmodule-bytes20-bytes"></a>

### queueExecOnSubmodule

Queue an action on a PRICE submodule

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- The submodule execution queue parameters are invalid

</i>

```solidity
function queueExecOnSubmodule(
        bytes20 subKeycode_,
        bytes calldata data_
    ) external override returns (uint64 actionId_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| subKeycode_ | `bytes20` | The bytes20 keycode of the submodule to call |
| data_ | `bytes` | The calldata to send to the submodule |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

Query if a contract implements an interface

<i>

Does not revert.

</i>

```solidity
function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(PolicyEnabler, TimelockQueue) returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | `bytes4` | The interface identifier, as specified in ERC-165 |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool        True if the contract implements `interfaceId` |
