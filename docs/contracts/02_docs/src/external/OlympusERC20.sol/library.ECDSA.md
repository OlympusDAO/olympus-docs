# ECDSA

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/OlympusERC20.sol)

<i>

Elliptic Curve Digital Signature Algorithm (ECDSA) operations.

These functions can be used to verify that a message was signed by the holder
of the private keys of a given address.

</i>

## Functions

<a id="_throwerror-recovererror"></a>

### _throwError

```solidity
function _throwError(RecoverError error) private pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| error | `RecoverError` |  |

<a id="tryrecover-bytes32-bytes"></a>

### tryRecover

<i>

Returns the address that signed a hashed message (`hash`) with
`signature` or error string. This address can then be used for verification purposes.

The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
this function rejects them by requiring the `s` value to be in the lower
half order, and the `v` value to be either 27 or 28.

IMPORTANT: `hash` _must_ be the result of a hash operation for the
verification to be secure: it is possible to craft signatures that
recover to arbitrary addresses for non-hashed data. A safe way to ensure
this is by receiving a hash of the original message (which may otherwise
be too long), and then calling [toEthSignedMessageHash](#toethsignedmessagehash) on it.

Documentation for signature generation:

- with <https://web3js.readthedocs.io/en/v1.3.4/web3-eth-accounts.html#sign>[Web3.js]
- with <https://docs.ethers.io/v5/api/signer/#Signer-signMessage>[ethers]

_Available since v4.3._

</i>

```solidity
function tryRecover(
        bytes32 hash,
        bytes memory signature
    ) internal pure returns (address, RecoverError);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | `bytes32` |  |
| signature | `bytes` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |
| &lt;none&gt; | `RecoverError` |  |

<a id="recover-bytes32-bytes"></a>

### recover

<i>

Returns the address that signed a hashed message (`hash`) with
`signature`. This address can then be used for verification purposes.

The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
this function rejects them by requiring the `s` value to be in the lower
half order, and the `v` value to be either 27 or 28.

IMPORTANT: `hash` _must_ be the result of a hash operation for the
verification to be secure: it is possible to craft signatures that
recover to arbitrary addresses for non-hashed data. A safe way to ensure
this is by receiving a hash of the original message (which may otherwise
be too long), and then calling [toEthSignedMessageHash](#toethsignedmessagehash) on it.

</i>

```solidity
function recover(bytes32 hash, bytes memory signature) internal pure returns (address);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | `bytes32` |  |
| signature | `bytes` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="tryrecover-bytes32-bytes32-bytes32"></a>

### tryRecover

<i>

Overload of [ECDSA.tryRecover](#tryrecover) that receives the `r` and `vs` short-signature fields separately.

See <https://eips.ethereum.org/EIPS/eip-2098>[EIP-2098 short signatures]

_Available since v4.3._

</i>

```solidity
function tryRecover(
        bytes32 hash,
        bytes32 r,
        bytes32 vs
    ) internal pure returns (address, RecoverError);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | `bytes32` |  |
| r | `bytes32` |  |
| vs | `bytes32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |
| &lt;none&gt; | `RecoverError` |  |

<a id="recover-bytes32-bytes32-bytes32"></a>

### recover

<i>

Overload of [ECDSA.recover](#recover) that receives the `r and `vs` short-signature fields separately.

_Available since v4.2._

</i>

```solidity
function recover(bytes32 hash, bytes32 r, bytes32 vs) internal pure returns (address);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | `bytes32` |  |
| r | `bytes32` |  |
| vs | `bytes32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="tryrecover-bytes32-uint8-bytes32-bytes32"></a>

### tryRecover

<i>

Overload of [ECDSA.tryRecover](#tryrecover) that receives the `v`,
`r` and `s` signature fields separately.

_Available since v4.3._

</i>

```solidity
function tryRecover(
        bytes32 hash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal pure returns (address, RecoverError);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | `bytes32` |  |
| v | `uint8` |  |
| r | `bytes32` |  |
| s | `bytes32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |
| &lt;none&gt; | `RecoverError` |  |

<a id="recover-bytes32-uint8-bytes32-bytes32"></a>

### recover

<i>

Overload of [ECDSA.recover](#recover) that receives the `v`,
`r` and `s` signature fields separately.

</i>

```solidity
function recover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) internal pure returns (address);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | `bytes32` |  |
| v | `uint8` |  |
| r | `bytes32` |  |
| s | `bytes32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="toethsignedmessagehash-bytes32"></a>

### toEthSignedMessageHash

<i>

Returns an Ethereum Signed Message, created from a `hash`. This
produces hash corresponding to the one signed with the
<https://eth.wiki/json-rpc/API#eth_sign>[`eth_sign`]
JSON-RPC method as part of EIP-191.

See [recover](#recover).

</i>

```solidity
function toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | `bytes32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` |  |

<a id="totypeddatahash-bytes32-bytes32"></a>

### toTypedDataHash

<i>

Returns an Ethereum Signed Typed Data, created from a
`domainSeparator` and a `structHash`. This produces hash corresponding
to the one signed with the
<https://eips.ethereum.org/EIPS/eip-712>[`eth_signTypedData`]
JSON-RPC method as part of EIP-712.

See [recover](#recover).

</i>

```solidity
function toTypedDataHash(
        bytes32 domainSeparator,
        bytes32 structHash
    ) internal pure returns (bytes32);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| domainSeparator | `bytes32` |  |
| structHash | `bytes32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` |  |

## Enums

### RecoverError

```solidity
enum RecoverError {
        NoError,
        InvalidSignature,
        InvalidSignatureLength,
        InvalidSignatureS,
        InvalidSignatureV
    }
```

**Variants**

| Name | Description |
| ---- | ----------- |
| NoError |  |
| InvalidSignature |  |
| InvalidSignatureLength |  |
| InvalidSignatureS |  |
| InvalidSignatureV |  |
