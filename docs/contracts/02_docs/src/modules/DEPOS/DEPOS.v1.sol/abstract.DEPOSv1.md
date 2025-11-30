# DEPOSv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/modules/DEPOS/DEPOS.v1.sol)

**Inherits:**
[Module](/main/contracts/docs/src/Kernel.sol/abstract.Module), ERC721, [IDepositPositionManager](/main/contracts/docs/src/modules/DEPOS/IDepositPositionManager.sol/interface.IDepositPositionManager)

**Title:**
DEPOSv1

This defines the interface for the DEPOS module.
The objective of this module is to track the terms of a deposit position.

## State Variables

### NON_CONVERSION_PRICE

The value used for the conversion price if conversion is not supported

```solidity
uint256 public constant NON_CONVERSION_PRICE = type(uint256).max
```

### NON_CONVERSION_EXPIRY

The value used for the conversion expiry if conversion is not supported

```solidity
uint48 public constant NON_CONVERSION_EXPIRY = type(uint48).max
```

### _positionCount

The number of positions created

```solidity
uint256 internal _positionCount
```

### _positions

Mapping of position records to an ID

IDs are assigned sequentially starting from 0
Mapping entries should not be deleted, but can be overwritten

```solidity
mapping(uint256 => Position) internal _positions
```

### _userPositions

Mapping of user addresses to their position IDs

```solidity
mapping(address => EnumerableSet.UintSet) internal _userPositions
```
