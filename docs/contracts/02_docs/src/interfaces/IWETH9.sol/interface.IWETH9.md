# IWETH9

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IWETH9.sol)

**Title:** Interface for WETH9

## Functions

<a id="deposit"></a>

### deposit

Deposit ether to get wrapped ether

```solidity
function deposit() external payable;
```

<a id="withdraw-uint256"></a>

### withdraw

Withdraw wrapped ether to get ether

```solidity
function withdraw(uint256) external;
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| _    | `uint256` |             |
