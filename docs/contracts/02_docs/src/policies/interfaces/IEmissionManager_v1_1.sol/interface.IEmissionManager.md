# IEmissionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/IEmissionManager_v1_1.sol)

<i>

Interface for the EmissionManager policy as of v1.1

</i>

## Functions

<a id="locallyactive"></a>

### locallyActive

Whether the contract is locally active

```solidity
function locallyActive() external view returns (bool);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="shutdown"></a>

### shutdown

Shutdown the emission manager

```solidity
function shutdown() external;
```
