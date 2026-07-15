# IFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

## Functions

### create

```solidity
function create(
    string memory name,
    string memory symbol,
    ERC20[] memory tokens,
    uint256[] memory weights,
    uint256 swapFeePercentage,
    address owner
) external returns (address);
```
