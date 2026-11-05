# IVault

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/Balancer/interfaces/IVault.sol)

## Functions

<a id="manageuserbalance-userbalanceop"></a>

### manageUserBalance

```solidity
function manageUserBalance(UserBalanceOp[] memory ops) external payable;
```

**Parameters**

| Name | Type              | Description |
| ---- | ----------------- | ----------- |
| ops  | `UserBalanceOp[]` |             |

<a id="getpooltokens-bytes32"></a>

### getPoolTokens

```solidity
function getPoolTokens(
        bytes32 poolId
    )
        external
        view
        returns (address[] memory tokens, uint256[] memory balances, uint256 lastChangeBlock);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| poolId | `bytes32` |             |

**Returns**

| Name            | Type        | Description |
| --------------- | ----------- | ----------- |
| tokens          | `address[]` |             |
| balances        | `uint256[]` |             |
| lastChangeBlock | `uint256`   |             |

## Structs

### UserBalanceOp

<i>

Data for `manageUserBalance` operations, which include the possibility for ETH to be sent and received
     without manual WETH wrapping or unwrapping.

</i>

```solidity
struct UserBalanceOp {
        UserBalanceOpKind kind;
        IAsset asset;
        uint256 amount;
        address sender;
        address payable recipient;
    }
```

**Properties**

| Name      | Type                | Description |
| --------- | ------------------- | ----------- |
| kind      | `UserBalanceOpKind` |             |
| asset     | `IAsset`            |             |
| amount    | `uint256`           |             |
| sender    | `address`           |             |
| recipient | `address payable`   |             |

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

**Variants**

| Name              | Description |
| ----------------- | ----------- |
| DEPOSIT_INTERNAL  |             |
| WITHDRAW_INTERNAL |             |
| TRANSFER_INTERNAL |             |
| TRANSFER_EXTERNAL |             |
