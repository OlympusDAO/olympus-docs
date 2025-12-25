# TimestampLinkedList

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/libraries/TimestampLinkedList.sol)

**Title:**
TimestampLinkedList

A library for managing linked lists of uint48 timestamps in descending order

Each list maintains timestamps in descending chronological order (newest first)

## Functions

### add

Adds a new timestamp to the list in descending order

Does nothing if timestamp already exists

This function will revert if:

- The timestamp is 0

```solidity
function add(List storage list, uint48 timestamp) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`list`|`List`|The list to add to|
|`timestamp`|`uint48`|The timestamp to add|

### findLastBefore

Finds the largest timestamp that is less than or equal to the target

Returns 0 if no such timestamp exists

```solidity
function findLastBefore(List storage list, uint48 target) internal view returns (uint48);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`list`|`List`|The list to search|
|`target`|`uint48`|The target timestamp|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint48`|The largest timestamp ≤ target, or 0 if none found|

### findFirstAfter

Finds the smallest timestamp that is greater than the target

Returns 0 if no such timestamp exists

```solidity
function findFirstAfter(List storage list, uint48 target) internal view returns (uint48);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`list`|`List`|The list to search|
|`target`|`uint48`|The target timestamp|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint48`|The smallest timestamp > target, or 0 if none found|

### contains

Checks if a timestamp exists in the list

```solidity
function contains(List storage list, uint48 timestamp) internal view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`list`|`List`|The list to check|
|`timestamp`|`uint48`|The timestamp to look for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if timestamp exists in the list|

### getHead

Returns the most recent (head) timestamp

```solidity
function getHead(List storage list) internal view returns (uint48);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`list`|`List`|The list to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint48`|The head timestamp, or 0 if list is empty|

### getPrevious

Returns the previous timestamp for a given timestamp

```solidity
function getPrevious(List storage list, uint48 timestamp) internal view returns (uint48);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`list`|`List`|The list to check|
|`timestamp`|`uint48`|The timestamp to get the previous for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint48`|The previous timestamp, or 0 if none|

### isEmpty

Checks if the list is empty

```solidity
function isEmpty(List storage list) internal view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`list`|`List`|The list to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the list is empty|

### length

Returns the number of elements in the list

This is an O(n) operation, use sparingly

```solidity
function length(List storage list) internal view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`list`|`List`|The list to count|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of timestamps in the list|

### toArray

Returns all timestamps in the list in descending order

This is an O(n) operation with O(n) memory allocation, use sparingly

```solidity
function toArray(List storage list) internal view returns (uint48[] memory timestamps);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`list`|`List`|The list to convert to array|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`timestamps`|`uint48[]`|Array of timestamps in descending order|

## Errors

### TimestampLinkedList_InvalidTimestamp

```solidity
error TimestampLinkedList_InvalidTimestamp(uint48 timestamp);
```

## Structs

### List

Structure representing a timestamp linked list

```solidity
struct List {
    uint48 head;
    mapping(uint48 => uint48) previous;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`head`|`uint48`|The most recent (largest) timestamp in the list|
|`previous`|`mapping(uint48 => uint48)`|Mapping from timestamp to the previous (older) timestamp|
