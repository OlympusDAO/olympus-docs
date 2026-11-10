# IRescueable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/interfaces/IRescueable.sol)

**Title:** IRescueable

Interface for contracts that allow privileged rescue of accidentally-sent assets.

<i>

The native asset is identified using the EIP-7528 sentinel address
(`ERC7528Constants.NATIVE_ASSET`).

</i>

## Functions

<a id="rescue-address-address-payable"></a>

### rescue

Rescues assets accidentally sent to this contract.

```solidity
function rescue(address token_, address payable to_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token_ | `address` | The token to rescue, or the EIP-7528 native sentinel for the native asset. |
| to_ | `address payable` | The recipient of the rescued assets. |
