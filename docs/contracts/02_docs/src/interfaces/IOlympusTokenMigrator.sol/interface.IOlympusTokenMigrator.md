# IOlympusTokenMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IOlympusTokenMigrator.sol)

## Functions

<a id="migrate-uint256-type-type"></a>

### migrate

```solidity
function migrate(uint256 _amount, TYPE _from, TYPE _to) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | `uint256` |  |
| _from | `TYPE` |  |
| _to | `TYPE` |  |

<a id="oldsupply"></a>

### oldSupply

```solidity
function oldSupply() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

## Enums

### TYPE

```solidity
enum TYPE {
        UNSTAKED,
        STAKED,
        WRAPPED
    }
```

**Variants**

| Name | Description |
| ---- | ----------- |
| UNSTAKED |  |
| STAKED |  |
| WRAPPED |  |
