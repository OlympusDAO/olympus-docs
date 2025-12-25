# IERC20

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/external/OlympusERC20.sol)

## Functions

### totalSupply

Returns the amount of tokens in existence.

```solidity
function totalSupply() external view returns (uint256);
```

### balanceOf

Returns the amount of tokens owned by `account`.

```solidity
function balanceOf(address account) external view returns (uint256);
```

### transfer

Moves `amount` tokens from the caller's account to `recipient`.
Returns a boolean value indicating whether the operation succeeded.
Emits a [Transfer](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#transfer) event.

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

### allowance

Returns the remaining number of tokens that `spender` will be
allowed to spend on behalf of `owner` through [transferFrom](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#transferfrom). This is
zero by default.
This value changes when [approve](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#approve) or [transferFrom](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#transferfrom) are called.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

### approve

Sets `amount` as the allowance of `spender` over the caller's tokens.
Returns a boolean value indicating whether the operation succeeded.
IMPORTANT: Beware that changing an allowance with this method brings the risk
that someone may use both the old and the new allowance by unfortunate
transaction ordering. One possible solution to mitigate this race
condition is to first reduce the spender's allowance to 0 and set the
desired value afterwards:
<https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729>
Emits an [Approval](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#approval) event.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

### transferFrom

Moves `amount` tokens from `sender` to `recipient` using the
allowance mechanism. `amount` is then deducted from the caller's
allowance.
Returns a boolean value indicating whether the operation succeeded.
Emits a [Transfer](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#transfer) event.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

## Events

### Transfer

Emitted when `value` tokens are moved from one account (`from`) to
another (`to`).
Note that `value` may be zero.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

### Approval

Emitted when the allowance of a `spender` for an `owner` is set by
a call to [approve](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#approve). `value` is the new allowance.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```
