# TransferHelper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/libraries/TransferHelper.sol)

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
