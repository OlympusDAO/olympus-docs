# ExitPoolRequest

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

```solidity
struct ExitPoolRequest {
    address[] assets;
    uint256[] minAmountsOut;
    bytes userData;
    bool toInternalBalance;
}
```
