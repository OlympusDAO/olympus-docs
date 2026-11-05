# ExitPoolRequest

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

```solidity
struct ExitPoolRequest {
    address[] assets;
    uint256[] minAmountsOut;
    bytes userData;
    bool toInternalBalance;
}
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| assets | `address[]` |  |
| minAmountsOut | `uint256[]` |  |
| userData | `bytes` |  |
| toInternalBalance | `bool` |  |
