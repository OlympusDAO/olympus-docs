# ERC20

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/external/OlympusERC20.sol)

**Inherits:**
[IERC20](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20)

## State Variables

### ERC20TOKEN_ERC1820_INTERFACE_ID

```solidity
bytes32 private constant ERC20TOKEN_ERC1820_INTERFACE_ID = keccak256("ERC20Token");
```

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

### _decimals

```solidity
uint8 internal immutable _decimals;
```

## Functions

### constructor

```solidity
constructor(string memory name_, string memory symbol_, uint8 decimals_);
```

### name

```solidity
function name() public view returns (string memory);
```

### symbol

```solidity
function symbol() public view returns (string memory);
```

### decimals

```solidity
function decimals() public view virtual returns (uint8);
```

### totalSupply

```solidity
function totalSupply() public view override returns (uint256);
```

### balanceOf

```solidity
function balanceOf(address account) public view virtual override returns (uint256);
```

### transfer

```solidity
function transfer(address recipient, uint256 amount) public virtual override returns (bool);
```

### allowance

```solidity
function allowance(address owner, address spender) public view virtual override returns (uint256);
```

### approve

```solidity
function approve(address spender, uint256 amount) public virtual override returns (bool);
```

### transferFrom

```solidity
function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool);
```

### increaseAllowance

```solidity
function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool);
```

### decreaseAllowance

```solidity
function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool);
```

### _transfer

```solidity
function _transfer(address sender, address recipient, uint256 amount) internal virtual;
```

### _mint

```solidity
function _mint(address account, uint256 amount) internal virtual;
```

### _burn

```solidity
function _burn(address account, uint256 amount) internal virtual;
```

### _approve

```solidity
function _approve(address owner, address spender, uint256 amount) internal virtual;
```

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from_, address to_, uint256 amount_) internal virtual;
```
