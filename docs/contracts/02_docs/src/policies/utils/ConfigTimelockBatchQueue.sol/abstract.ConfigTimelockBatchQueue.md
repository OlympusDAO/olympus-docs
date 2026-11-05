# ConfigTimelockBatchQueue

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/utils/ConfigTimelockBatchQueue.sol)

**Inherits:** [TimelockBatchQueue](/main/contracts/docs/src/policies/utils/TimelockBatchQueue.sol/abstract.TimelockBatchQueue), [IConfigTimelockBatchQueue](/main/contracts/docs/src/policies/interfaces/utils/IConfigTimelockBatchQueue.sol/interface.IConfigTimelockBatchQueue)

**Title:** ConfigTimelockBatchQueue

Base contract for configuration timelocks. It prevents conflicting changes from being
queued together and prevents queued changes from executing after their underlying
configuration has changed.

<i>

Each sub-action identifies its destination and the configuration it depends on with one
or more keys. The contract scopes every key to that destination, reserves the scoped
keys, and records their current state hashes at queue time. A reserved key cannot be
used by another unresolved action. At execution, the destination and every current
state hash must still match. Keys are released only after the whole batch executes or
is cancelled. Product contracts customize validation, destinations, keys, hashes, and
dispatch through the config-specific hooks below.

</i>

## State Variables

### _pendingActionIds

The unresolved action holding a destination-scoped configuration key.

```solidity
mapping(bytes32 key => uint64 actionId) internal _pendingActionIds;
```

### _queuedConfigStates

Configuration states recorded for each sub-action at queue time, by local key.

```solidity
mapping(uint64 actionId => mapping(uint256 index => QueuedConfigState[] states))
        internal _queuedConfigStates;
```

### _queuedConfigDestinations

Destination recorded for each sub-action at queue time.

```solidity
mapping(uint64 actionId => mapping(uint256 index => address destination))
        internal _queuedConfigDestinations;
```

## Functions

<a id="constructor-uint48"></a>

### constructor

```solidity
constructor(uint48 initialTimelockDelay_) TimelockBatchQueue(initialTimelockDelay_);
```

**Parameters**

| Name                  | Type     | Description |
| --------------------- | -------- | ----------- |
| initialTimelockDelay_ | `uint48` |             |

<a id="pendingactionid-bytes32"></a>

### pendingActionId

Return the unresolved action that owns a destination-scoped key, or zero if free.

```solidity
function pendingActionId(bytes32 key_) external view returns (uint64 actionId);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| key_ | `bytes32` |             |

**Returns**

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| actionId | `uint64` |             |

<a id="maxconfigkeysperbatch"></a>

### maxConfigKeysPerBatch

Return the maximum total configuration keys a batch may reserve.

```solidity
function maxConfigKeysPerBatch() external view returns (uint256 maximum);
```

**Returns**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| maximum | `uint256` |             |

<a id="getqueuedconfigstatecount-uint64-uint256"></a>

### getQueuedConfigStateCount

Return the number of configuration guards stored for a sub-action.

```solidity
function getQueuedConfigStateCount(
        uint64 actionId_,
        uint256 index_
    ) external view returns (uint256 length);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| actionId_ | `uint64`  |             |
| index_    | `uint256` |             |

**Returns**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| length | `uint256` |             |

<a id="getqueuedconfigdestination-uint64-uint256"></a>

### getQueuedConfigDestination

Return the destination selected by the subclass when a sub-action was queued.

```solidity
function getQueuedConfigDestination(
        uint64 actionId_,
        uint256 index_
    ) external view returns (address destination);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| actionId_ | `uint64`  |             |
| index_    | `uint256` |             |

**Returns**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| destination | `address` |             |

<a id="getqueuedconfigstate-uint64-uint256-uint256"></a>

### getQueuedConfigState

Return a stored destination-scoped key and its queue-time canonical state hash.

```solidity
function getQueuedConfigState(
        uint64 actionId_,
        uint256 index_,
        uint256 configStateIndex_
    ) external view returns (bytes32 key, bytes32 expectedStateHash);
```

**Parameters**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| actionId_         | `uint64`  |             |
| index_            | `uint256` |             |
| configStateIndex_ | `uint256` |             |

**Returns**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| key               | `bytes32` |             |
| expectedStateHash | `bytes32` |             |

<a id="_onsubactionqueued-address-uint64-uint256-itimelockbatchqueue-batchaction"></a>

### _onSubActionQueued

Hook invoked once per sub-action at queue time, before the batch is stored.

<i>

Derived contracts must revert on failure. Implementations are expected to
validate the target, selector, and payload of the sub-action in isolation, and
may record per-sub-action state. Cross sub-action invariants belong in
`_onBatchQueued`. The caller is passed explicitly for clarity and to support
derived contracts that centralize authorization around actor params.

</i>

```solidity
function _onSubActionQueued(
        address caller_,
        uint64 actionId_,
        uint256 index_,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account queueing the action. |
| actionId_ | `uint64` | The id the batch will be stored under. |
| index_ | `uint256` | The position of the sub-action within the batch. |
| action_ | `ITimelockBatchQueue.BatchAction` | The sub-action being queued. |

<a id="_onbatchqueued-address-uint64-itimelockbatchqueue-batchaction"></a>

### _onBatchQueued

```solidity
function _onBatchQueued(
        address caller_,
        uint64 actionId_,
        ITimelockBatchQueue.BatchAction[] memory actions_
    ) internal view override;
```

**Parameters**

| Name      | Type                                | Description |
| --------- | ----------------------------------- | ----------- |
| caller_   | `address`                           |             |
| actionId_ | `uint64`                            |             |
| actions_  | `ITimelockBatchQueue.BatchAction[]` |             |

<a id="_executesubaction-uint64-uint256-itimelockbatchqueue-batchaction"></a>

### _executeSubAction

Execute a single sub-action of a batched queued action.

<i>

Derived contracts must revert on failure. Called by the base contract once per
sub-action in array order; the action has already been marked executed, so a
revert in any iteration reverts the entire batch and rolls back that flag.
Derived contracts must not rely on the base contract calling this hook in any
other order.

</i>

```solidity
function _executeSubAction(
        uint64 actionId_,
        uint256 index_,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |
| index_ | `uint256` | The position of the sub-action within the batch. |
| action_ | `ITimelockBatchQueue.BatchAction` | The sub-action to execute. |

<a id="_onactionexecuted-uint64-uint256"></a>

### _onActionExecuted

Hook invoked once after every sub-action has executed successfully and before the
stored sub-actions are cleared.

<i>

Default implementation is a no-op. A revert rolls back the complete batch,
including target state changes and the action's executed flag. Derived contracts
may use this hook to clear state that must remain available throughout execution.

</i>

```solidity
function _onActionExecuted(uint64 actionId_, uint256 subActionCount_) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The executed action ID. |
| subActionCount_ | `uint256` | The number of successfully executed sub-actions. |

<a id="_onactioncancelled-uint64-uint256"></a>

### _onActionCancelled

Hook invoked once when a queued action is cancelled, after the stored
sub-actions have been cleared.

<i>

Default implementation is a no-op. Derived contracts override to clear any
per-sub-action state recorded at queue time by `_onSubActionQueued`. The
sub-action count is captured before the stored array is deleted, so
implementations can iterate the indices that were recorded.

</i>

```solidity
function _onActionCancelled(uint64 actionId_, uint256 subActionCount_) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The cancelled action ID. |
| subActionCount_ | `uint256` | The number of sub-actions the action held before clearing. |

<a id="_releaseconfigkeys-uint64-uint256"></a>

### _releaseConfigKeys

```solidity
function _releaseConfigKeys(uint64 actionId_, uint256 subActionCount_) private;
```

**Parameters**

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| actionId_       | `uint64`  |             |
| subActionCount_ | `uint256` |             |

<a id="_queuedconfigkeycount-uint64-uint256"></a>

### _queuedConfigKeyCount

```solidity
function _queuedConfigKeyCount(
        uint64 actionId_,
        uint256 endIndex_
    ) private view returns (uint256 count);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| actionId_ | `uint64`  |             |
| endIndex_ | `uint256` |             |

**Returns**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| count | `uint256` |             |

<a id="_validateconfigqueue-address"></a>

### _validateConfigQueue

Validates queue-wide authorization and lifecycle requirements.

<i>

Called once, before the first sub-action acquires configuration keys. Implementations
must revert when the caller or current product lifecycle cannot queue the batch.

</i>

```solidity
function _validateConfigQueue(address caller_) internal view virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | Account queueing the batch. |

<a id="_validateconfigsubaction-address-uint64-uint256-itimelockbatchqueue-batchaction"></a>

### _validateConfigSubAction

Validates one sub-action before its destination and configuration keys are stored.

<i>

Implementations must revert for unsupported targets, selectors, payloads, or product
state. Any state recorded by an earlier sub-action is rolled back if validation fails.

</i>

```solidity
function _validateConfigSubAction(
        address caller_,
        uint64 actionId_,
        uint256 index_,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal view virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | Account queueing the batch. |
| actionId_ | `uint64` | Action ID reserved for the batch. |
| index_ | `uint256` | Position of the sub-action within the batch. |
| action_ | `ITimelockBatchQueue.BatchAction` | Sub-action to validate. |

<a id="_configdestination-itimelockbatchqueue-batchaction"></a>

### _configDestination

Selects the destination that namespaces this sub-action's configuration keys.

<i>

The base stores this address at queue time and requires the hook to return the same
address at execution. Returning a new address after rotation creates a distinct key
namespace for new actions and makes existing actions non-executable.

</i>

```solidity
function _configDestination(
        ITimelockBatchQueue.BatchAction memory action_
    ) internal view virtual returns (address destination);
```

**Parameters**

| Name    | Type                              | Description |
| ------- | --------------------------------- | ----------- |
| action_ | `ITimelockBatchQueue.BatchAction` |             |

**Returns**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| destination | `address` |             |

<a id="_configkeys-itimelockbatchqueue-batchaction"></a>

### _configKeys

Selects the destination-local configuration domains used by a sub-action.

<i>

The base rejects zero or duplicate local keys and scopes every key with the address
returned by `_configDestination` before acquiring ownership.

</i>

```solidity
function _configKeys(
        ITimelockBatchQueue.BatchAction memory action_
    ) internal view virtual returns (bytes32[] memory keys);
```

**Parameters**

| Name    | Type                              | Description |
| ------- | --------------------------------- | ----------- |
| action_ | `ITimelockBatchQueue.BatchAction` |             |

**Returns**

| Name | Type        | Description |
| ---- | ----------- | ----------- |
| keys | `bytes32[]` |             |

<a id="_currentconfigstatehash-uint64-uint256-bytes32-itimelockbatchqueue-batchaction"></a>

### _currentConfigStateHash

Hashes the live configuration state guarded by one local key.

<i>

Called when queueing to store the expected hash and again immediately before execution
to detect stale state. Implementations must hash the same canonical fields on both
paths and exclude values that may legitimately change during the timelock delay.

</i>

```solidity
function _currentConfigStateHash(
        uint64 actionId_,
        uint256 index_,
        bytes32 key_,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal view virtual returns (bytes32 stateHash);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | ID of the queued action. |
| index_ | `uint256` | Position of the sub-action within the batch. |
| key_ | `bytes32` | Destination-local configuration key being guarded. |
| action_ | `ITimelockBatchQueue.BatchAction` | Sub-action whose live configuration state is hashed. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| stateHash | `bytes32` | Canonical hash of the guarded live state. |

<a id="_validateconfigbatch-address-uint64-itimelockbatchqueue-batchaction"></a>

### _validateConfigBatch

Validates invariants spanning the complete batch after all guards are acquired.

<i>

The default implementation is a no-op. An override must revert on invalid cross-action
state; the revert rolls back every guard acquired for the batch.

</i>

```solidity
function _validateConfigBatch(
        address caller_,
        uint64 actionId_,
        ITimelockBatchQueue.BatchAction[] memory actions_
    ) internal view virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | Account queueing the batch. |
| actionId_ | `uint64` | Action ID reserved for the batch. |
| actions_ | `ITimelockBatchQueue.BatchAction[]` | Complete ordered set of queued sub-actions. |

<a id="_executeconfigsubaction-uint64-uint256-itimelockbatchqueue-batchaction"></a>

### _executeConfigSubAction

<i>

Subclasses must not perform a state-changing external call before the intended
target dispatch. Such a call could make the already-validated state stale.

</i>

```solidity
function _executeConfigSubAction(
        uint64 actionId_,
        uint256 index_,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal virtual;
```

**Parameters**

| Name      | Type                              | Description |
| --------- | --------------------------------- | ----------- |
| actionId_ | `uint64`                          |             |
| index_    | `uint256`                         |             |
| action_   | `ITimelockBatchQueue.BatchAction` |             |

<a id="_maxconfigkeysperbatch"></a>

### _maxConfigKeysPerBatch

Maximum aggregate number of configuration keys a batch may reserve.

<i>

Defaults to the maximum number of sub-actions. Products supporting composite
multi-domain sub-actions should override this batch-wide bound.

</i>

```solidity
function _maxConfigKeysPerBatch() internal view virtual returns (uint256 maximum);
```

**Returns**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| maximum | `uint256` |             |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

Query if a contract implements an interface.

<i>

Does not revert.

</i>

```solidity
function supportsInterface(
        bytes4 interfaceId_
    ) public view virtual override(TimelockBatchQueue) returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` | The interface identifier, as specified in ERC-165. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool         True if the contract implements `interfaceId_`. |

## Structs

### QueuedConfigState

```solidity
struct QueuedConfigState {
        bytes32 localKey;
        bytes32 expectedStateHash;
    }
```

**Properties**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| localKey          | `bytes32` |             |
| expectedStateHash | `bytes32` |             |
