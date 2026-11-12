# IERC20Permit

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/OlympusERC20.sol)

<i>

Interface of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in
[https://eips.ethereum.org/EIPS/eip-2612](https://eips.ethereum.org/EIPS/eip-2612)[EIP-2612].

Adds the [permit](#permit) method, which can be used to change an account's ERC20 allowance (see [IERC20.allowance](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#allowance)) by
presenting a message signed by the account. By not relying on [IERC20.approve](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#approve), the token holder account doesn't
need to send a transaction, and thus is not required to hold Ether at all.

</i>

## Functions

<a id="permit-address-address-uint256-uint256-uint8-bytes32-bytes32"></a>

### permit

<i>

Sets `value` as th xe allowance of `spender` over ``owner``'s tokens,
given ``owner``'s signed approval.

IMPORTANT: The same issues [IERC20.approve](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#approve) has related to transaction
ordering also apply here.

Emits an `Approval` event.

Requirements:

- `spender` cannot be the zero address.
- `deadline` must be a timestamp in the future.
- `v`, `r` and `s` must be a valid `secp256k1` signature from `owner`
over the EIP712-formatted function arguments.
- the signature must use ``owner``'s current nonce (see [nonces](#nonces)).

For more information on the signature format, see the
[https://eips.ethereum.org/EIPS/eip-2612#specification](https://eips.ethereum.org/EIPS/eip-2612#specification)[relevant EIP
section].

</i>

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | `address` |  |
| spender | `address` |  |
| value | `uint256` |  |
| deadline | `uint256` |  |
| v | `uint8` |  |
| r | `bytes32` |  |
| s | `bytes32` |  |

<a id="nonces-address"></a>

### nonces

<i>

Returns the current nonce for `owner`. This value must be
included whenever a signature is generated for [permit](#permit).

Every successful call to [permit](#permit) increases ``owner``'s nonce by one. This
prevents a signature from being used multiple times.

</i>

```solidity
function nonces(address owner) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="domain_separator"></a>

### DOMAIN_SEPARATOR

<i>

Returns the domain separator used in the encoding of the signature for [permit](#permit), as defined by [EIP712](/main/contracts/docs/src/external/OlympusERC20.sol/abstract.EIP712).

</i>

```solidity
function DOMAIN_SEPARATOR() external view returns (bytes32);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` |  |
