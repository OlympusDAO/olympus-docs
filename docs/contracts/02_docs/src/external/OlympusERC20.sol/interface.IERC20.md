# IERC20

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/OlympusERC20.sol)

## Functions

<a id="totalsupply"></a>

### totalSupply

<i>

Returns the amount of tokens in existence.

</i>

```solidity
function totalSupply() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="balanceof-address"></a>

### balanceOf

<i>

Returns the amount of tokens owned by `account`.

</i>

```solidity
function balanceOf(address account) external view returns (uint256);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| account | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="transfer-address-uint256"></a>

### transfer

<i>

Moves `amount` tokens from the caller's account to `recipient`.

Returns a boolean value indicating whether the operation succeeded.

Emits a [Transfer](#transfer) event.

</i>

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| recipient | `address` |             |
| amount    | `uint256` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="allowance-address-address"></a>

### allowance

<i>

Returns the remaining number of tokens that `spender` will be
allowed to spend on behalf of `owner` through [transferFrom](#transferfrom). This is
zero by default.

This value changes when [approve](#approve) or [transferFrom](#transferfrom) are called.

</i>

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| owner   | `address` |             |
| spender | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="approve-address-uint256"></a>

### approve

<i>

Sets `amount` as the allowance of `spender` over the caller's tokens.

Returns a boolean value indicating whether the operation succeeded.

IMPORTANT: Beware that changing an allowance with this method brings the risk
that someone may use both the old and the new allowance by unfortunate
transaction ordering. One possible solution to mitigate this race
condition is to first reduce the spender's allowance to 0 and set the
desired value afterwards:
<https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729>

Emits an [Approval](#approval) event.

</i>

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| spender | `address` |             |
| amount  | `uint256` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="transferfrom-address-address-uint256"></a>

### transferFrom

<i>

Moves `amount` tokens from `sender` to `recipient` using the
allowance mechanism. `amount` is then deducted from the caller's
allowance.

Returns a boolean value indicating whether the operation succeeded.

Emits a [Transfer](#transfer) event.

</i>

```solidity
function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| sender    | `address` |             |
| recipient | `address` |             |
| amount    | `uint256` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

## Events

### Transfer

<i>

Emitted when `value` tokens are moved from one account (`from`) to
another (`to`).

Note that `value` may be zero.

</i>

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| from  | `address` |             |
| to    | `address` |             |
| value | `uint256` |             |

### Approval

<i>

Emitted when the allowance of a `spender` for an `owner` is set by
a call to [approve](#approve). `value` is the new allowance.

</i>

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| owner   | `address` |             |
| spender | `address` |             |
| value   | `uint256` |             |
