# AddressStorageArray

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/AddressStorageArray.sol)

**Title:** AddressStorageArray

A library for managing a storage array of addresses, with support for insertion and removal at a specific index

## Functions

<a id="insert-address-address-uint256"></a>

### insert

Inserts an address at a specific index

```solidity
function insert(address[] storage array, address value_, uint256 index_) internal;
```

**Parameters**

| Name   | Type        | Description |
| ------ | ----------- | ----------- |
| array  | `address[]` |             |
| value_ | `address`   |             |
| index_ | `uint256`   |             |

<a id="remove-address-uint256"></a>

### remove

Removes an address at a specific index

```solidity
function remove(address[] storage array, uint256 index_) internal returns (address);
```

**Parameters**

| Name   | Type        | Description |
| ------ | ----------- | ----------- |
| array  | `address[]` |             |
| index_ | `uint256`   |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

## Errors

### AddressStorageArray_IndexOutOfBounds

```solidity
error AddressStorageArray_IndexOutOfBounds(uint256 index, uint256 length);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| index  | `uint256` |             |
| length | `uint256` |             |
