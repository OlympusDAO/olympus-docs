# TransferHelper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/libraries/TransferHelper.sol)

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
