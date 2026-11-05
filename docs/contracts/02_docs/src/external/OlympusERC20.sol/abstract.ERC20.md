# ERC20

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/OlympusERC20.sol)

**Inherits:** [IERC20](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20)

## Constants

### ERC20TOKEN_ERC1820_INTERFACE_ID

```solidity
bytes32 private constant ERC20TOKEN_ERC1820_INTERFACE_ID = keccak256("ERC20Token");
```

### _decimals

```solidity
uint8 internal immutable _decimals;
```

## State Variables

### _balances

```solidity
mapping(address => uint256) internal _balances;
```

### _allowances

```solidity
mapping(address => mapping(address => uint256)) internal _allowances;
```

### _totalSupply

```solidity
uint256 internal _totalSupply;
```

### _name

```solidity
string internal _name;
```

### _symbol

```solidity
string internal _symbol;
```

## Functions

<a id="constructor-string-string-uint8"></a>

### constructor

```solidity
constructor(string memory name_, string memory symbol_, uint8 decimals_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `string` |  |
| symbol_ | `string` |  |
| decimals_ | `uint8` |  |

<a id="name"></a>

### name

```solidity
function name() public view returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="symbol"></a>

### symbol

```solidity
function symbol() public view returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="decimals"></a>

### decimals

```solidity
function decimals() public view virtual returns (uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` |  |

<a id="totalsupply"></a>

### totalSupply

<i>

Returns the amount of tokens in existence.

</i>

```solidity
function totalSupply() public view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="balanceof-address"></a>

### balanceOf

<i>

Returns the amount of tokens owned by `account`.

</i>

```solidity
function balanceOf(address account) public view virtual override returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="transfer-address-uint256"></a>

### transfer

<i>

Moves `amount` tokens from the caller's account to `recipient`.

Returns a boolean value indicating whether the operation succeeded.

Emits a [Transfer](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#transfer) event.

</i>

```solidity
function transfer(address recipient, uint256 amount) public virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| recipient | `address` |  |
| amount | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="allowance-address-address"></a>

### allowance

<i>

Returns the remaining number of tokens that `spender` will be
allowed to spend on behalf of `owner` through [transferFrom](#transferfrom). This is
zero by default.

This value changes when [approve](#approve) or [transferFrom](#transferfrom) are called.

</i>

```solidity
function allowance(
        address owner,
        address spender
    ) public view virtual override returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | `address` |  |
| spender | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

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

Emits an [Approval](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#approval) event.

</i>

```solidity
function approve(address spender, uint256 amount) public virtual override returns (bool);
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

<a id="transferfrom-address-address-uint256"></a>

### transferFrom

<i>

Moves `amount` tokens from `sender` to `recipient` using the
allowance mechanism. `amount` is then deducted from the caller's
allowance.

Returns a boolean value indicating whether the operation succeeded.

Emits a [Transfer](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#transfer) event.

</i>

```solidity
function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` |  |
| recipient | `address` |  |
| amount | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="increaseallowance-address-uint256"></a>

### increaseAllowance

```solidity
function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| spender | `address` |  |
| addedValue | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="decreaseallowance-address-uint256"></a>

### decreaseAllowance

```solidity
function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| spender | `address` |  |
| subtractedValue | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="_transfer-address-address-uint256"></a>

### _transfer

```solidity
function _transfer(address sender, address recipient, uint256 amount) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` |  |
| recipient | `address` |  |
| amount | `uint256` |  |

<a id="_mint-address-uint256"></a>

### _mint

```solidity
function _mint(address account, uint256 amount) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | `address` |  |
| amount | `uint256` |  |

<a id="_burn-address-uint256"></a>

### _burn

```solidity
function _burn(address account, uint256 amount) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | `address` |  |
| amount | `uint256` |  |

<a id="_approve-address-address-uint256"></a>

### _approve

```solidity
function _approve(address owner, address spender, uint256 amount) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | `address` |  |
| spender | `address` |  |
| amount | `uint256` |  |

<a id="_beforetokentransfer-address-address-uint256"></a>

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from_, address to_, uint256 amount_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from_ | `address` |  |
| to_ | `address` |  |
| amount_ | `uint256` |  |
