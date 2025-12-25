# TransferHelper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/libraries/TransferHelper.sol)

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
