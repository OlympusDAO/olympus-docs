# IBalancerHelper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

## Functions

### queryJoin

```solidity
function queryJoin(bytes32 poolId, address sender, address recipient, JoinPoolRequest memory request)
    external
    returns (uint256 bptOut, uint256[] memory amountsIn);
```

### queryExit

```solidity
function queryExit(bytes32 poolId, address sender, address recipient, ExitPoolRequest memory request)
    external
    returns (uint256 bptIn, uint256[] memory amountsOut);
```
