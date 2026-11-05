# IUniswapV2ERC20

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/Uniswap/IUniswapV2ERC20.sol)

## Functions

<a id="name"></a>

### name

```solidity
function name() external pure returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="symbol"></a>

### symbol

```solidity
function symbol() external pure returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="decimals"></a>

### decimals

```solidity
function decimals() external pure returns (uint8);
```

**Returns**

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| &lt;none&gt; | `uint8` |             |

<a id="totalsupply"></a>

### totalSupply

```solidity
function totalSupply() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="balanceof-address"></a>

### balanceOf

```solidity
function balanceOf(address owner) external view returns (uint256);
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| owner | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="allowance-address-address"></a>

### allowance

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

```solidity
function approve(address spender, uint256 value) external returns (bool);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| spender | `address` |             |
| value   | `uint256` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="transfer-address-uint256"></a>

### transfer

```solidity
function transfer(address to, uint256 value) external returns (bool);
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| to    | `address` |             |
| value | `uint256` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="transferfrom-address-address-uint256"></a>

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 value) external returns (bool);
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| from  | `address` |             |
| to    | `address` |             |
| value | `uint256` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="domain_separator"></a>

### DOMAIN_SEPARATOR

```solidity
function DOMAIN_SEPARATOR() external view returns (bytes32);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `bytes32` |             |

<a id="permit_typehash"></a>

### PERMIT_TYPEHASH

```solidity
function PERMIT_TYPEHASH() external pure returns (bytes32);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `bytes32` |             |

<a id="nonces-address"></a>

### nonces

```solidity
function nonces(address owner) external view returns (uint256);
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| owner | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="permit-address-address-uint256-uint256-uint8-bytes32-bytes32"></a>

### permit

```solidity
function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| owner    | `address` |             |
| spender  | `address` |             |
| value    | `uint256` |             |
| deadline | `uint256` |             |
| v        | `uint8`   |             |
| r        | `bytes32` |             |
| s        | `bytes32` |             |

## Events

### Approval

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| owner   | `address` |             |
| spender | `address` |             |
| value   | `uint256` |             |

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| from  | `address` |             |
| to    | `address` |             |
| value | `uint256` |             |
