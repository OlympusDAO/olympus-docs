# IBalancerHelper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

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
