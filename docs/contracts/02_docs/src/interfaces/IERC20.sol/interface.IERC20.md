# IERC20

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IERC20.sol)

<i>

Interface of the ERC20 standard as defined in the EIP.

</i>

<i>

This includes the optional name, symbol, and decimals metadata.

</i>

## Functions

<a id="totalsupply"></a>

### totalSupply

Returns the amount of tokens in existence.

```solidity
function totalSupply() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="balanceof-address"></a>

### balanceOf

Returns the amount of tokens owned by `account`.

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

Moves `amount` tokens from the caller's account to `to`.

```solidity
function transfer(address to, uint256 amount) external returns (bool);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| to     | `address` |             |
| amount | `uint256` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="allowance-address-address"></a>

### allowance

Returns the remaining number of tokens that `spender` is allowed
to spend on behalf of `owner`

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

Sets `amount` as the allowance of `spender` over the caller's tokens.

<i>

Be aware of front-running risks: <https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729>

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

Moves `amount` tokens from `from` to `to` using the allowance mechanism.
`amount` is then deducted from the caller's allowance.

```solidity
function transferFrom(address from, address to, uint256 amount) external returns (bool);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| from   | `address` |             |
| to     | `address` |             |
| amount | `uint256` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="name"></a>

### name

Returns the name of the token.

```solidity
function name() external view returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="symbol"></a>

### symbol

Returns the symbol of the token.

```solidity
function symbol() external view returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="decimals"></a>

### decimals

Returns the decimals places of the token.

```solidity
function decimals() external view returns (uint8);
```

**Returns**

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| &lt;none&gt; | `uint8` |             |

## Events

### Transfer

<i>

Emitted when `value` tokens are moved from one account (`from`) to another (`to`).

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

Emitted when the allowance of a `spender` for an `owner` is set, where `value`
is the new allowance.

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
