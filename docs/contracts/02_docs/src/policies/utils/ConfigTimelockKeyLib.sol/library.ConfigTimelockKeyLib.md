# ConfigTimelockKeyLib

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/utils/ConfigTimelockKeyLib.sol)

**Title:** ConfigTimelockKeyLib

Derives destination-scoped configuration keys used by ConfigTimelockBatchQueue.

## Functions

<a id="scope-address-bytes32"></a>

### scope

Returns the destination-scoped key for a local configuration key.

```solidity
function scope(address destination_, bytes32 localKey_) internal pure returns (bytes32 key);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| destination_ | `address` | The configuration destination. |
| localKey_ | `bytes32` | The key within that destination. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | `bytes32` | The hash of the destination and local key. |
