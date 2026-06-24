# AddressStorageArray

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/libraries/AddressStorageArray.sol)

**Title:**
AddressStorageArray

A library for managing a storage array of addresses, with support for insertion and removal at a specific index

## Functions

### insert

Inserts an address at a specific index

```solidity
function insert(address[] storage array, address value_, uint256 index_) internal;
```

### remove

Removes an address at a specific index

```solidity
function remove(address[] storage array, uint256 index_) internal returns (address);
```

## Errors

### AddressStorageArray_IndexOutOfBounds

```solidity
error AddressStorageArray_IndexOutOfBounds(uint256 index, uint256 length);
```
