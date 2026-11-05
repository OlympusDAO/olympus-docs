# Counters

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/OlympusERC20.sol)

## Functions

<a id="current-counter"></a>

### current

```solidity
function current(Counter storage counter) internal view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| counter | `Counter` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="increment-counter"></a>

### increment

```solidity
function increment(Counter storage counter) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| counter | `Counter` |  |

<a id="decrement-counter"></a>

### decrement

```solidity
function decrement(Counter storage counter) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| counter | `Counter` |  |

## Structs

### Counter

```solidity
struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _value | `uint256` |  |
