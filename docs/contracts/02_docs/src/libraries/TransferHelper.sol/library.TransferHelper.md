# TransferHelper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/TransferHelper.sol)

**Author:** Modified from Uniswap & old Solmate ([https://github.com/Uniswap/uniswap-v3-periphery/blob/main/contracts/libraries/TransferHelper.sol](https://github.com/Uniswap/uniswap-v3-periphery/blob/main/contracts/libraries/TransferHelper.sol))

Safe ERC20 and ETH transfer library that safely handles missing return values.

## Functions

<a id="safetransferfrom-erc20-address-address-uint256"></a>

### safeTransferFrom

```solidity
function safeTransferFrom(ERC20 token, address from, address to, uint256 amount) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `ERC20` |  |
| from | `address` |  |
| to | `address` |  |
| amount | `uint256` |  |

<a id="safetransfer-erc20-address-uint256"></a>

### safeTransfer

```solidity
function safeTransfer(ERC20 token, address to, uint256 amount) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `ERC20` |  |
| to | `address` |  |
| amount | `uint256` |  |

<a id="safeapprove-erc20-address-uint256"></a>

### safeApprove

```solidity
function safeApprove(ERC20 token, address to, uint256 amount) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `ERC20` |  |
| to | `address` |  |
| amount | `uint256` |  |
