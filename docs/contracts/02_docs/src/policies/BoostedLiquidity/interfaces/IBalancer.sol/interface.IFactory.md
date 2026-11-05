# IFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

## Functions

<a id="create-string-string-erc20-uint256-uint256-address"></a>

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

**Parameters**

| Name              | Type        | Description |
| ----------------- | ----------- | ----------- |
| name              | `string`    |             |
| symbol            | `string`    |             |
| tokens            | `ERC20[]`   |             |
| weights           | `uint256[]` |             |
| swapFeePercentage | `uint256`   |             |
| owner             | `address`   |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |
