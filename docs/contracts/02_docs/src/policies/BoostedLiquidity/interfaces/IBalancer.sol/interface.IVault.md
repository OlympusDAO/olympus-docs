# IVault

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

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
