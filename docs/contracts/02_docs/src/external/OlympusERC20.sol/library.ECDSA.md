# ECDSA

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/external/OlympusERC20.sol)

Elliptic Curve Digital Signature Algorithm (ECDSA) operations.
These functions can be used to verify that a message was signed by the holder
of the private keys of a given address.

## Functions

### _throwError

```solidity
function _throwError(RecoverError error) private pure;
```

### tryRecover

Returns the address that signed a hashed message (`hash`) with
`signature` or error string. This address can then be used for verification purposes.
The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
this function rejects them by requiring the `s` value to be in the lower
half order, and the `v` value to be either 27 or 28.
IMPORTANT: `hash` _must_ be the result of a hash operation for the
verification to be secure: it is possible to craft signatures that
recover to arbitrary addresses for non-hashed data. A safe way to ensure
this is by receiving a hash of the original message (which may otherwise
be too long), and then calling [toEthSignedMessageHash](/main/contracts/docs/src/external/OlympusERC20.sol/library.ECDSA#toethsignedmessagehash) on it.
Documentation for signature generation:

- with <https://web3js.readthedocs.io/en/v1.3.4/web3-eth-accounts.html#sign[Web3.js>]
- with <https://docs.ethers.io/v5/api/signer/#Signer-signMessage[ethers>]
_Available since v4.3._

```solidity
function tryRecover(bytes32 hash, bytes memory signature) internal pure returns (address, RecoverError);
```

### recover

Returns the address that signed a hashed message (`hash`) with
`signature`. This address can then be used for verification purposes.
The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
this function rejects them by requiring the `s` value to be in the lower
half order, and the `v` value to be either 27 or 28.
IMPORTANT: `hash` _must_ be the result of a hash operation for the
verification to be secure: it is possible to craft signatures that
recover to arbitrary addresses for non-hashed data. A safe way to ensure
this is by receiving a hash of the original message (which may otherwise
be too long), and then calling [toEthSignedMessageHash](/main/contracts/docs/src/external/OlympusERC20.sol/library.ECDSA#toethsignedmessagehash) on it.

```solidity
function recover(bytes32 hash, bytes memory signature) internal pure returns (address);
```

### tryRecover

Overload of [ECDSA-tryRecover](/main/contracts/docs/src/external/OlympusERC20.sol/library.ECDSA#tryrecover) that receives the `r` and `vs` short-signature fields separately.
See <https://eips.ethereum.org/EIPS/eip-2098[EIP-2098> short signatures]
_Available since v4.3._

```solidity
function tryRecover(bytes32 hash, bytes32 r, bytes32 vs) internal pure returns (address, RecoverError);
```

### recover

Overload of [ECDSA-recover](/main/contracts/docs/src/external/OlympusERC20.sol/library.ECDSA#recover) that receives the `r and`vs` short-signature fields separately.
_Available since v4.2._

```solidity
function recover(bytes32 hash, bytes32 r, bytes32 vs) internal pure returns (address);
```

### tryRecover

Overload of [ECDSA-tryRecover](/main/contracts/docs/src/external/OlympusERC20.sol/library.ECDSA#tryrecover) that receives the `v`,
`r` and `s` signature fields separately.
_Available since v4.3._

```solidity
function tryRecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) internal pure returns (address, RecoverError);
```

### recover

Overload of [ECDSA-recover](/main/contracts/docs/src/external/OlympusERC20.sol/library.ECDSA#recover) that receives the `v`,
`r` and `s` signature fields separately.

```solidity
function recover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) internal pure returns (address);
```

### toEthSignedMessageHash

Returns an Ethereum Signed Message, created from a `hash`. This
produces hash corresponding to the one signed with the
<https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`>]
JSON-RPC method as part of EIP-191.
See [recover](/main/contracts/docs/src/external/OlympusERC20.sol/library.ECDSA#recover).

```solidity
function toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32);
```

### toTypedDataHash

Returns an Ethereum Signed Typed Data, created from a
`domainSeparator` and a `structHash`. This produces hash corresponding
to the one signed with the
<https://eips.ethereum.org/EIPS/eip-712[`eth_signTypedData`>]
JSON-RPC method as part of EIP-712.
See [recover](/main/contracts/docs/src/external/OlympusERC20.sol/library.ECDSA#recover).

```solidity
function toTypedDataHash(bytes32 domainSeparator, bytes32 structHash) internal pure returns (bytes32);
```

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
