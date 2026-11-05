# ILZBridgeAndDelegateConfig

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/ILZBridgeAndDelegateConfig.sol)

**Inherits:** [ITimelockBatchQueue](/main/contracts/docs/src/policies/interfaces/utils/ITimelockBatchQueue.sol/interface.ITimelockBatchQueue)

**Title:** ILZBridgeAndDelegateConfig

Timelock policy that owns LayerZero bridge configuration on behalf of the
LZBridgeGateway, LZEndpointDelegate, and periphery LZCrossChainBridge contracts.

<i>

The policy is intended to hold the `bridge_configurator` role on the
gateway/delegate and to be pinned as `configurator` on the periphery bridge. In
that deployment shape every `bridge_configurator`-gated mutator on the gateway
and the delegate, and every `configurator`-gated setter on the periphery, is
reached only through the queue exposed here; the contracts themselves only
enforce the role / configurator gate. Gateway, delegate, and facilitator
mutators are submitted as sub-actions of `queue`; the policy's own configuration
(target slots, timelock delay) is managed through the typed `queueSetTarget*` and
`queueSetTimelockDelay` helpers. Proposer roles map back to the existing
`bridge_admin`, `bridge_rate_limiter`, and `admin` roles; emergency cancels
malicious or stale queued actions.

</i>

Implementations are expected to inherit `TimelockBatchQueue` and extend its event
and error surface; the inherited interface is exposed by also implementing
`ITimelockBatchQueue`.

## Functions

<a id="gateway"></a>

### gateway

The LZBridgeGateway this policy manages.

```solidity
function gateway() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="delegate"></a>

### delegate

The LZEndpointDelegate this policy manages.

```solidity
function delegate() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="facilitator"></a>

### facilitator

The periphery LZCrossChainBridge this policy manages.

```solidity
function facilitator() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="min_timelock_delay"></a>

### MIN_TIMELOCK_DELAY

Minimum accepted timelock delay.

```solidity
function MIN_TIMELOCK_DELAY() external view returns (uint48);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

<a id="max_timelock_delay"></a>

### MAX_TIMELOCK_DELAY

Maximum accepted timelock delay.

```solidity
function MAX_TIMELOCK_DELAY() external view returns (uint48);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

<a id="execution_window"></a>

### EXECUTION_WINDOW

Length of the window after `executableAt` during which a queued action may be
executed before it expires.

```solidity
function EXECUTION_WINDOW() external view returns (uint48);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

<a id="queuesettargetgateway-address"></a>

### queueSetTargetGateway

Queues a self-call updating the policy's `gateway` target slot.

<i>

Proposer access: `admin` only.

</i>

```solidity
function queueSetTargetGateway(address newGateway_) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newGateway_ | `address` | The new gateway address. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queuesettargetdelegate-address"></a>

### queueSetTargetDelegate

Queues a self-call updating the policy's `delegate` target slot.

<i>

Proposer access: `admin` only.

</i>

```solidity
function queueSetTargetDelegate(address newDelegate_) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newDelegate_ | `address` | The new delegate address. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queuesettargetfacilitator-address"></a>

### queueSetTargetFacilitator

Queues a self-call updating the policy's `facilitator` target slot.

<i>

Proposer access: `admin` only.

</i>

```solidity
function queueSetTargetFacilitator(address newFacilitator_) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newFacilitator_ | `address` | The new facilitator address. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queuesettimelockdelay-uint48"></a>

### queueSetTimelockDelay

Queues a self-call updating the configured timelock delay.

<i>

Proposer access: `admin` only.

</i>

```solidity
function queueSetTimelockDelay(uint48 delay_) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay_ | `uint48` | The new timelock delay in seconds. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queue-itimelockbatchqueue-batchaction"></a>

### queue

Queues a batch of one or more gateway, delegate, or facilitator sub-actions
for atomic timelocked execution.

<i>

Each sub-action is validated as if it had been submitted individually; the
caller must hold the proposer role required by every sub-action in the batch.
Self-targeted sub-actions are rejected: the policy's own configuration is
managed only through the typed `queueSetTarget*` / `queueSetTimelockDelay`
helpers.

</i>

```solidity
function queue(
        ITimelockBatchQueue.BatchAction[] memory actions_
    ) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actions_ | `ITimelockBatchQueue.BatchAction[]` | The sub-actions to queue. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

## Events

### TargetGatewaySet

Emitted when the gateway target slot is updated through the timelock queue.

```solidity
event TargetGatewaySet(address indexed gateway);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gateway | `address` | The new gateway address. |

### TargetDelegateSet

Emitted when the delegate target slot is updated through the timelock queue.

```solidity
event TargetDelegateSet(address indexed delegate);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegate | `address` | The new delegate address. |

### TargetFacilitatorSet

Emitted when the facilitator target slot is updated through the timelock queue.

```solidity
event TargetFacilitatorSet(address indexed facilitator);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| facilitator | `address` | The new facilitator address. |

## Errors

### LZBridgeAndDelegateConfig_InvalidAddress

Thrown when a constructor argument or proposed target slot is the zero address.

```solidity
error LZBridgeAndDelegateConfig_InvalidAddress(string parameter);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parameter | `string` | The name of the invalid parameter. |

### LZBridgeAndDelegateConfig_SubActionTargetStale

Thrown at execution when the target slot for a sub-action's queue-time
`TargetKind` no longer holds the address the action was queued against (the
slot was rotated between queue and execution). The action can be cleared via
emergency cancellation and re-queued against the new target.

```solidity
error LZBridgeAndDelegateConfig_SubActionTargetStale(
        uint64 actionId,
        uint256 index,
        address queuedTarget,
        address currentTarget
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |
| index | `uint256` | The sub-action position within the batch. |
| queuedTarget | `address` | The address the sub-action was validated against at queue time. |
| currentTarget | `address` | The address the slot currently holds. |

## Enums

### TargetKind

Which target slot a queued sub-action was validated against at queue time.

<i>

`NONE` is the zero value, meaning "no sub-action recorded".

</i>

```solidity
enum TargetKind {
        NONE,
        GATEWAY,
        DELEGATE,
        FACILITATOR,
        SELF
    }
```

**Variants**

| Name        | Description |
| ----------- | ----------- |
| NONE        |             |
| GATEWAY     |             |
| DELEGATE    |             |
| FACILITATOR |             |
| SELF        |             |
