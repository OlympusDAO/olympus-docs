# IFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

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
