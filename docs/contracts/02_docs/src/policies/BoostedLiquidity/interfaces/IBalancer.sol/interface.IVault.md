# IVault

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

## Functions

### joinPool

```solidity
function joinPool(bytes32 poolId, address sender, address recipient, JoinPoolRequest memory request)
    external
    payable;
```

### exitPool

```solidity
function exitPool(bytes32 poolId, address sender, address payable recipient, ExitPoolRequest memory request)
    external;
```

### getPoolTokens

```solidity
function getPoolTokens(bytes32 poolId) external view returns (address[] memory, uint256[] memory, uint256);
```
