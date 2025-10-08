# VOTESv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/modules/VOTES/VOTES.v1.sol)

**Inherits:**
[Module](/main/contracts/docs/src/Kernel.sol/abstract.Module), ERC4626

## State Variables

### gOHM

```solidity
ERC20 public gOHM;
```

### lastActionTimestamp

```solidity
mapping(address => uint256) public lastActionTimestamp;
```

### lastDepositTimestamp

```solidity
mapping(address => uint256) public lastDepositTimestamp;
```

## Functions

### resetActionTimestamp

```solidity
function resetActionTimestamp(address wallet_) external virtual;
```
