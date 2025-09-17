# IFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

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
