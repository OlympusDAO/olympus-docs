# IFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

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
