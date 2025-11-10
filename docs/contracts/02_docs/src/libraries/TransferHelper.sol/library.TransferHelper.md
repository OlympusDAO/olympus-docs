# TransferHelper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/libraries/TransferHelper.sol)

**Author:**
Modified from Uniswap & old Solmate (<https://github.com/Uniswap/uniswap-v3-periphery/blob/main/contracts/libraries/TransferHelper.sol>)

Safe ERC20 and ETH transfer library that safely handles missing return values.

## Functions

### safeTransferFrom

```solidity
function safeTransferFrom(ERC20 token, address from, address to, uint256 amount) internal;
```

### safeTransfer

```solidity
function safeTransfer(ERC20 token, address to, uint256 amount) internal;
```

### safeApprove

```solidity
function safeApprove(ERC20 token, address to, uint256 amount) internal;
```
