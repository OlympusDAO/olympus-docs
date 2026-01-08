# IFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

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
