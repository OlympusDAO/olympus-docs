# IERC20Permit

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/external/OlympusERC20.sol)

Interface of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in
<https://eips.ethereum.org/EIPS/eip-2612[EIP-2612>].
Adds the [permit](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20Permit#permit) method, which can be used to change an account's ERC20 allowance (see [IERC20-allowance](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#allowance)) by
presenting a message signed by the account. By not relying on [IERC20-approve](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#approve), the token holder account doesn't
need to send a transaction, and thus is not required to hold Ether at all.

## Functions

### permit

Sets `value` as th xe allowance of `spender` over ``owner``'s tokens,
given ``owner``'s signed approval.
IMPORTANT: The same issues [IERC20-approve](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#approve) has related to transaction
ordering also apply here.
Emits an {Approval} event.
Requirements:

- `spender` cannot be the zero address.
- `deadline` must be a timestamp in the future.
- `v`, `r` and `s` must be a valid `secp256k1` signature from `owner`
over the EIP712-formatted function arguments.
- the signature must use ``owner``'s current nonce (see [nonces](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20Permit#nonces)).
For more information on the signature format, see the
<https://eips.ethereum.org/EIPS/eip-2612#specification[relevant> EIP
section].

```solidity
function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
    external;
```

### nonces

Returns the current nonce for `owner`. This value must be
included whenever a signature is generated for [permit](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20Permit#permit).
Every successful call to [permit](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20Permit#permit) increases ``owner``'s nonce by one. This
prevents a signature from being used multiple times.

```solidity
function nonces(address owner) external view returns (uint256);
```

### DOMAIN_SEPARATOR

Returns the domain separator used in the encoding of the signature for [permit](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20Permit#permit), as defined by {EIP712}.

```solidity
function DOMAIN_SEPARATOR() external view returns (bytes32);
```
