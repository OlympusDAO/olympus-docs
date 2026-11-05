# ERC20Permit

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/OlympusERC20.sol)

**Inherits:** [ERC20](/main/contracts/docs/src/external/OlympusERC20.sol/abstract.ERC20), [IERC20Permit](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20Permit), [EIP712](/main/contracts/docs/src/external/OlympusERC20.sol/abstract.EIP712)

<i>

Implementation of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in
<https://eips.ethereum.org/EIPS/eip-2612>[EIP-2612].

Adds the [permit](#permit) method, which can be used to change an account's ERC20 allowance (see [IERC20.allowance](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#allowance)) by
presenting a message signed by the account. By not relying on `[IERC20.approve](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20#approve)`, the token holder account doesn't
need to send a transaction, and thus is not required to hold Ether at all.

_Available since v3.4._

</i>

## Constants

### _PERMIT_TYPEHASH

```solidity
bytes32 private immutable _PERMIT_TYPEHASH =
        keccak256(
            "Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"
        );
```

## State Variables

### _nonces

```solidity
mapping(address => Counters.Counter) private _nonces;
```

## Functions

<a id="constructor-string"></a>

### constructor

<i>

Initializes the [EIP712](/main/contracts/docs/src/external/OlympusERC20.sol/abstract.EIP712) domain separator using the `name` parameter, and setting `version` to `"1"`.

It's a good idea to use the same `name` that is defined as the ERC20 token name.

</i>

```solidity
constructor(string memory name) EIP712(name, "1");
```

**Parameters**

| Name | Type     | Description |
| ---- | -------- | ----------- |
| name | `string` |             |

<a id="permit-address-address-uint256-uint256-uint8-bytes32-bytes32"></a>

### permit

<i>

See [IERC20Permit.permit](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20Permit#permit).

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
    ) public virtual override;
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

<a id="nonces-address"></a>

### nonces

<i>

See [IERC20Permit.nonces](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20Permit#nonces).

</i>

```solidity
function nonces(address owner) public view virtual override returns (uint256);
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| owner | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="domain_separator"></a>

### DOMAIN_SEPARATOR

<i>

See [IERC20Permit.DOMAIN_SEPARATOR](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20Permit#domain_separator).

</i>

```solidity
function DOMAIN_SEPARATOR() external view override returns (bytes32);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `bytes32` |             |

<a id="_usenonce-address"></a>

### _useNonce

<i>

"Consume a nonce": return the current value and increment.

_Available since v4.1._

</i>

```solidity
function _useNonce(address owner) internal virtual returns (uint256 current);
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| owner | `address` |             |

**Returns**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| current | `uint256` |             |
