# Math

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/Balancer/math/Math.sol)

<i>

Wrappers over Solidity's arithmetic operations with added overflow checks.
Adapted from OpenZeppelin's SafeMath library.

</i>

## Functions

<a id="abs-int256"></a>

### abs

<i>

Returns the absolute value of a signed integer.

</i>

```solidity
function abs(int256 a) internal pure returns (uint256 result);
```

**Parameters**

| Name | Type     | Description |
| ---- | -------- | ----------- |
| a    | `int256` |             |

**Returns**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| result | `uint256` |             |

<a id="add-uint256-uint256"></a>

### add

<i>

Returns the addition of two unsigned integers of 256 bits, reverting on overflow.

</i>

```solidity
function add(uint256 a, uint256 b) internal pure returns (uint256);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| a    | `uint256` |             |
| b    | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="add-int256-int256"></a>

### add

<i>

Returns the addition of two signed integers, reverting on overflow.

</i>

```solidity
function add(int256 a, int256 b) internal pure returns (int256);
```

**Parameters**

| Name | Type     | Description |
| ---- | -------- | ----------- |
| a    | `int256` |             |
| b    | `int256` |             |

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `int256` |             |

<a id="sub-uint256-uint256"></a>

### sub

<i>

Returns the subtraction of two unsigned integers of 256 bits, reverting on overflow.

</i>

```solidity
function sub(uint256 a, uint256 b) internal pure returns (uint256);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| a    | `uint256` |             |
| b    | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="sub-int256-int256"></a>

### sub

<i>

Returns the subtraction of two signed integers, reverting on overflow.

</i>

```solidity
function sub(int256 a, int256 b) internal pure returns (int256);
```

**Parameters**

| Name | Type     | Description |
| ---- | -------- | ----------- |
| a    | `int256` |             |
| b    | `int256` |             |

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `int256` |             |

<a id="max-uint256-uint256"></a>

### max

<i>

Returns the largest of two numbers of 256 bits.

</i>

```solidity
function max(uint256 a, uint256 b) internal pure returns (uint256 result);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| a    | `uint256` |             |
| b    | `uint256` |             |

**Returns**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| result | `uint256` |             |

<a id="min-uint256-uint256"></a>

### min

<i>

Returns the smallest of two numbers of 256 bits.

</i>

```solidity
function min(uint256 a, uint256 b) internal pure returns (uint256 result);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| a    | `uint256` |             |
| b    | `uint256` |             |

**Returns**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| result | `uint256` |             |

<a id="mul-uint256-uint256"></a>

### mul

```solidity
function mul(uint256 a, uint256 b) internal pure returns (uint256);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| a    | `uint256` |             |
| b    | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="div-uint256-uint256-bool"></a>

### div

```solidity
function div(uint256 a, uint256 b, bool roundUp) internal pure returns (uint256);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| a       | `uint256` |             |
| b       | `uint256` |             |
| roundUp | `bool`    |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="divdown-uint256-uint256"></a>

### divDown

```solidity
function divDown(uint256 a, uint256 b) internal pure returns (uint256);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| a    | `uint256` |             |
| b    | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="divup-uint256-uint256"></a>

### divUp

```solidity
function divUp(uint256 a, uint256 b) internal pure returns (uint256 result);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| a    | `uint256` |             |
| b    | `uint256` |             |

**Returns**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| result | `uint256` |             |
