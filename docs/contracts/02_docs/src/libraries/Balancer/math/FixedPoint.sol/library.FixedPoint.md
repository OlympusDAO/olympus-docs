# FixedPoint

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/Balancer/math/FixedPoint.sol)

## Constants

### ONE

```solidity
uint256 internal constant ONE = 1e18;
```

### TWO

```solidity
uint256 internal constant TWO = 2 * ONE;
```

### FOUR

```solidity
uint256 internal constant FOUR = 4 * ONE;
```

### MAX_POW_RELATIVE_ERROR

```solidity
uint256 internal constant MAX_POW_RELATIVE_ERROR = 10000;
```

### MIN_POW_BASE_FREE_EXPONENT

```solidity
uint256 internal constant MIN_POW_BASE_FREE_EXPONENT = 0.7e18;
```

## Functions

<a id="add-uint256-uint256"></a>

### add

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

<a id="sub-uint256-uint256"></a>

### sub

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

<a id="muldown-uint256-uint256"></a>

### mulDown

```solidity
function mulDown(uint256 a, uint256 b) internal pure returns (uint256);
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

<a id="mulup-uint256-uint256"></a>

### mulUp

```solidity
function mulUp(uint256 a, uint256 b) internal pure returns (uint256 result);
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

<a id="powdown-uint256-uint256"></a>

### powDown

<i>

Returns x^y, assuming both are fixed point numbers, rounding down. The result is guaranteed to not be above
the true value (that is, the error function expected - actual is always positive).

</i>

```solidity
function powDown(uint256 x, uint256 y) internal pure returns (uint256);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| x    | `uint256` |             |
| y    | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="powup-uint256-uint256"></a>

### powUp

<i>

Returns x^y, assuming both are fixed point numbers, rounding up. The result is guaranteed to not be below
the true value (that is, the error function expected - actual is always negative).

</i>

```solidity
function powUp(uint256 x, uint256 y) internal pure returns (uint256);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| x    | `uint256` |             |
| y    | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="complement-uint256"></a>

### complement

<i>

Returns the complement of a value (1 - x), capped to 0 if x is larger than 1.

Useful when computing the complement for values with some level of relative error, as it strips this error and
prevents intermediate negative values.

</i>

```solidity
function complement(uint256 x) internal pure returns (uint256 result);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| x    | `uint256` |             |

**Returns**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| result | `uint256` |             |
