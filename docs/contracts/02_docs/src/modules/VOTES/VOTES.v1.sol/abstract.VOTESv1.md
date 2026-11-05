# VOTESv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/VOTES/VOTES.v1.sol)

**Inherits:** [Module](/main/contracts/docs/src/Kernel.sol/abstract.Module), ERC4626

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

<a id="resetactiontimestamp-address"></a>

### resetActionTimestamp

```solidity
function resetActionTimestamp(address wallet_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| wallet_ | `address` |  |
