# IConfigTimelockBatchQueue

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/utils/IConfigTimelockBatchQueue.sol)

**Inherits:** [ITimelockBatchQueue](/main/contracts/docs/src/policies/interfaces/utils/ITimelockBatchQueue.sol/interface.ITimelockBatchQueue)

**Title:** IConfigTimelockBatchQueue

Interface for configuration timelocks that prevent conflicting queued changes and
reject execution when the underlying configuration changed after queueing.

## Functions

<a id="pendingactionid-bytes32"></a>

### pendingActionId

Return the unresolved action that owns a destination-scoped key, or zero if free.

```solidity
function pendingActionId(bytes32 key_) external view returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| key_ | `bytes32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` |  |

<a id="maxconfigkeysperbatch"></a>

### maxConfigKeysPerBatch

Return the maximum total configuration keys a batch may reserve.

```solidity
function maxConfigKeysPerBatch() external view returns (uint256 maximum);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maximum | `uint256` |  |

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` |  |
| index_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| length | `uint256` |  |

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` |  |
| index_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| destination | `address` |  |

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` |  |
| index_ | `uint256` |  |
| configStateIndex_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | `bytes32` |  |
| expectedStateHash | `bytes32` |  |

## Events

### ConfigStateQueued

Emitted when a sub-action reserves a configuration key.

```solidity
event ConfigStateQueued(
        uint64 indexed actionId,
        uint256 indexed index,
        bytes32 indexed key,
        uint256 configStateIndex,
        address destination,
        bytes32 expectedStateHash
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` |  |
| index | `uint256` |  |
| key | `bytes32` |  |
| configStateIndex | `uint256` |  |
| destination | `address` |  |
| expectedStateHash | `bytes32` |  |

## Errors

### IConfigTimelockBatchQueue_ConfigKeysEmpty

```solidity
error IConfigTimelockBatchQueue_ConfigKeysEmpty(uint64 actionId, uint256 index);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` |  |
| index | `uint256` |  |

### IConfigTimelockBatchQueue_ConfigKeyZero

```solidity
error IConfigTimelockBatchQueue_ConfigKeyZero(
        uint64 actionId,
        uint256 index,
        uint256 configStateIndex
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` |  |
| index | `uint256` |  |
| configStateIndex | `uint256` |  |

### IConfigTimelockBatchQueue_ConfigKeyPending

```solidity
error IConfigTimelockBatchQueue_ConfigKeyPending(bytes32 key, uint64 pendingActionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | `bytes32` |  |
| pendingActionId | `uint64` |  |

### IConfigTimelockBatchQueue_ConfigKeysTooMany

```solidity
error IConfigTimelockBatchQueue_ConfigKeysTooMany(uint256 length, uint256 maximum);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| length | `uint256` |  |
| maximum | `uint256` |  |

### IConfigTimelockBatchQueue_ConfigDestinationZero

```solidity
error IConfigTimelockBatchQueue_ConfigDestinationZero(uint64 actionId, uint256 index);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` |  |
| index | `uint256` |  |

### IConfigTimelockBatchQueue_ConfigDestinationChanged

```solidity
error IConfigTimelockBatchQueue_ConfigDestinationChanged(
        uint64 actionId,
        uint256 index,
        address expectedDestination,
        address currentDestination
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` |  |
| index | `uint256` |  |
| expectedDestination | `address` |  |
| currentDestination | `address` |  |

### IConfigTimelockBatchQueue_ConfigStateChanged

```solidity
error IConfigTimelockBatchQueue_ConfigStateChanged(
        uint64 actionId,
        uint256 index,
        bytes32 key,
        bytes32 expectedStateHash,
        bytes32 currentStateHash
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` |  |
| index | `uint256` |  |
| key | `bytes32` |  |
| expectedStateHash | `bytes32` |  |
| currentStateHash | `bytes32` |  |

### IConfigTimelockBatchQueue_ConfigKeyOwnershipInvalid

```solidity
error IConfigTimelockBatchQueue_ConfigKeyOwnershipInvalid(
        uint64 actionId,
        uint256 index,
        bytes32 key,
        uint64 pendingActionId
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` |  |
| index | `uint256` |  |
| key | `bytes32` |  |
| pendingActionId | `uint64` |  |

### IConfigTimelockBatchQueue_ConfigStateIndexOutOfBounds

```solidity
error IConfigTimelockBatchQueue_ConfigStateIndexOutOfBounds(
        uint64 actionId,
        uint256 index,
        uint256 configStateIndex,
        uint256 length
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` |  |
| index | `uint256` |  |
| configStateIndex | `uint256` |  |
| length | `uint256` |  |
