# CloneERC20

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/clones/CloneERC20.sol)

**Inherits:** Clone, [IERC20](/main/contracts/docs/src/interfaces/IERC20.sol/interface.IERC20)

**Authors:** Solmate ([https://github.com/Rari-Capital/solmate/blob/main/src/tokens/ERC20.sol](https://github.com/Rari-Capital/solmate/blob/main/src/tokens/ERC20.sol)), Modified from Uniswap ([https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol))

Modern and gas efficient ERC20 implementation.

<i>

Do not manually set balances without updating totalSupply, as the sum of all user balances must not exceed it.

</i>

## State Variables

### totalSupply

Returns the amount of tokens in existence.

```solidity
uint256 public totalSupply;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

### balanceOf

Returns the amount of tokens owned by `account`.

```solidity
mapping(address => uint256) public balanceOf;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

### allowance

Returns the remaining number of tokens that `spender` is allowed
to spend on behalf of `owner`

```solidity
mapping(address => mapping(address => uint256)) public allowance;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |
| &lt;none&gt; | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

## Functions

<a id="name"></a>

### name

Returns the name of the token.

```solidity
function name() external pure returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="symbol"></a>

### symbol

Returns the symbol of the token.

```solidity
function symbol() external pure returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="decimals"></a>

### decimals

Returns the decimals places of the token.

```solidity
function decimals() external pure returns (uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` |  |

<a id="approve-address-uint256"></a>

### approve

Sets `amount` as the allowance of `spender` over the caller's tokens.

<i>

Be aware of front-running risks: [https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)

</i>

```solidity
function approve(address spender, uint256 amount) public virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| spender | `address` |  |
| amount | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="increaseallowance-address-uint256"></a>

### increaseAllowance

```solidity
function increaseAllowance(address spender, uint256 amount) public virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| spender | `address` |  |
| amount | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="decreaseallowance-address-uint256"></a>

### decreaseAllowance

```solidity
function decreaseAllowance(address spender, uint256 amount) public virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| spender | `address` |  |
| amount | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="transfer-address-uint256"></a>

### transfer

Moves `amount` tokens from the caller's account to `to`.

```solidity
function transfer(address to, uint256 amount) public virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | `address` |  |
| amount | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="transferfrom-address-address-uint256"></a>

### transferFrom

Moves `amount` tokens from `from` to `to` using the allowance mechanism.
`amount` is then deducted from the caller's allowance.

```solidity
function transferFrom(address from, address to, uint256 amount) public virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |
| amount | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="_mint-address-uint256"></a>

### _mint

```solidity
function _mint(address to, uint256 amount) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | `address` |  |
| amount | `uint256` |  |

<a id="_burn-address-uint256"></a>

### _burn

```solidity
function _burn(address from, uint256 amount) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| amount | `uint256` |  |
