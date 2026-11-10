# JoinPoolRequest

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

```solidity
struct JoinPoolRequest {
    address[] assets;
    uint256[] maxAmountsIn;
    bytes userData;
    bool fromInternalBalance;
}
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| assets | `address[]` |  |
| maxAmountsIn | `uint256[]` |  |
| userData | `bytes` |  |
| fromInternalBalance | `bool` |  |
