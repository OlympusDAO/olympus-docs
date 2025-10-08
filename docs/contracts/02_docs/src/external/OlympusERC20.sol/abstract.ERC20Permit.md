# ERC20Permit

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/external/OlympusERC20.sol)

**Inherits:**
[ERC20](/main/contracts/docs/src/external/OlympusERC20.sol/abstract.ERC20), [IERC20Permit](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20Permit), [EIP712](/main/contracts/docs/src/external/OlympusERC20.sol/abstract.EIP712)

*Implementation of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in
<https://eips.ethereum.org/EIPS/eip-2612[EIP-2612>].
Adds the [permit](/main/contracts/docs/src/external/OlympusERC20.sol/abstract.ERC20Permit#permit) method, which can be used to change an account's ERC20 allowance (see {IERC20-allowance}) by
presenting a message signed by the account. By not relying on `{IERC20-approve}`, the token holder account doesn't
need to send a transaction, and thus is not required to hold Ether at all.
*Available since v3.4.**

## State Variables

### _nonces

```solidity
mapping(address => Counters.Counter) private _nonces;
```

### _PERMIT_TYPEHASH

```solidity
bytes32 private immutable _PERMIT_TYPEHASH =
    keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
```

## Functions

### constructor

*Initializes the {EIP712} domain separator using the `name` parameter, and setting `version` to `"1"`.
It's a good idea to use the same `name` that is defined as the ERC20 token name.*

```solidity
constructor(string memory name) EIP712(name, "1");
```

### permit

*See [IERC20Permit-permit](/main/contracts/docs/src/interfaces/Uniswap/IUniswapV2ERC20.sol/interface.IUniswapV2ERC20#permit).*

```solidity
function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
    public
    virtual
    override;
```

### nonces

*See [IERC20Permit-nonces](/main/contracts/docs/src/interfaces/Uniswap/IUniswapV2ERC20.sol/interface.IUniswapV2ERC20#nonces).*

```solidity
function nonces(address owner) public view virtual override returns (uint256);
```

### DOMAIN_SEPARATOR

*See [IERC20Permit-DOMAIN_SEPARATOR](/main/contracts/docs/src/interfaces/Uniswap/IUniswapV2ERC20.sol/interface.IUniswapV2ERC20#domain_separator).*

```solidity
function DOMAIN_SEPARATOR() external view override returns (bytes32);
```

### _useNonce

*"Consume a nonce": return the current value and increment.
*Available since v4.1.**

```solidity
function _useNonce(address owner) internal virtual returns (uint256 current);
```
