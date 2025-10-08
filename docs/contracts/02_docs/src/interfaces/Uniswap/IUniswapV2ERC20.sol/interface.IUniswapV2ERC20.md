# IUniswapV2ERC20

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/interfaces/Uniswap/IUniswapV2ERC20.sol)

## Functions

### name

```solidity
function name() external pure returns (string memory);
```

### symbol

```solidity
function symbol() external pure returns (string memory);
```

### decimals

```solidity
function decimals() external pure returns (uint8);
```

### totalSupply

```solidity
function totalSupply() external view returns (uint256);
```

### balanceOf

```solidity
function balanceOf(address owner) external view returns (uint256);
```

### allowance

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

### approve

```solidity
function approve(address spender, uint256 value) external returns (bool);
```

### transfer

```solidity
function transfer(address to, uint256 value) external returns (bool);
```

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 value) external returns (bool);
```

### DOMAIN_SEPARATOR

```solidity
function DOMAIN_SEPARATOR() external view returns (bytes32);
```

### PERMIT_TYPEHASH

```solidity
function PERMIT_TYPEHASH() external pure returns (bytes32);
```

### nonces

```solidity
function nonces(address owner) external view returns (uint256);
```

### permit

```solidity
function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
    external;
```

## Events

### Approval

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```
