# VOTESv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/modules/VOTES/VOTES.v1.sol)

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
