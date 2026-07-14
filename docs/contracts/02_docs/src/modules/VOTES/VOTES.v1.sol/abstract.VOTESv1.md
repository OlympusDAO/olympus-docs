# VOTESv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/modules/VOTES/VOTES.v1.sol)

**Inherits:**
[Module](/main/contracts/docs/src/Kernel.sol/abstract.Module), ERC4626

## State Variables

### gOHM

```solidity
ERC20 public gOHM
```

### lastActionTimestamp

```solidity
mapping(address => uint256) public lastActionTimestamp
```

### lastDepositTimestamp

```solidity
mapping(address => uint256) public lastDepositTimestamp
```

## Functions

### resetActionTimestamp

```solidity
function resetActionTimestamp(address wallet_) external virtual;
```
