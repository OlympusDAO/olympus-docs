# IVault

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/libraries/Balancer/interfaces/IVault.sol)

## Functions

### manageUserBalance

```solidity
function manageUserBalance(UserBalanceOp[] memory ops) external payable;
```

### getPoolTokens

```solidity
function getPoolTokens(bytes32 poolId)
    external
    view
    returns (address[] memory tokens, uint256[] memory balances, uint256 lastChangeBlock);
```

## Structs

### UserBalanceOp

Data for `manageUserBalance` operations, which include the possibility for ETH to be sent and received
without manual WETH wrapping or unwrapping.

```solidity
struct UserBalanceOp {
    UserBalanceOpKind kind;
    IAsset asset;
    uint256 amount;
    address sender;
    address payable recipient;
}
```

## Enums

### UserBalanceOpKind

```solidity
enum UserBalanceOpKind {
    DEPOSIT_INTERNAL,
    WITHDRAW_INTERNAL,
    TRANSFER_INTERNAL,
    TRANSFER_EXTERNAL
}
```
