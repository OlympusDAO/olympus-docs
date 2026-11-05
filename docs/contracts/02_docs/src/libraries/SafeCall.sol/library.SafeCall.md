# SafeCall

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/SafeCall.sol)

**Title:** SafeCall

Performs a call or a static call that caps the returndata copied into memory, so that a
callee returning or reverting with oversized returndata cannot inflate the gas cost of
the calling contract.

<i>

Copied from LayerZero at commit 592625b9e5967643853476445ffe0e777360b906, path
`packages/layerzero-v2/evm/messagelib/contracts/libs/SafeCall.sol`, which is itself a
copy of the nomad-xyz `ExcessivelySafeCall` library at commit
81cd99ce3e69117d665d7601c330ea03b97acce0, path `src/ExcessivelySafeCall.sol`.
Copyright (c) Illusory Systems Inc. and LayerZero Labs Ltd., licensed MIT OR
Apache-2.0.

</i>

LayerZero changed the nomad original as follows: added the `extcodesize` guard that
returns `(false, "")` when the target holds no code, renamed `excessivelySafeCall` to
`safeCall` and `excessivelySafeStaticCall` to `safeStaticCall`, dropped the
`swapSelector` helper, and raised the pragma from `>=0.7.6` to `^0.8.20`.

This copy changes the LayerZero source as follows: widened `uint` to `uint256` in the
`extcodesize` guard, corrected two stale comments that named a fixed byte count where
the code caps at `_maxCopy`, and added the lint suppressions. The executable code is
otherwise unchanged.

Neither function propagates the revert reason. Both return the returndata truncated to
`_maxCopy` bytes, which the caller must bubble up itself if it wants to revert. An
`Error(string)` payload needs 100 bytes to survive intact, and a callee that runs out
of gas returns no data at all, which a caller cannot tell apart from a bare `revert()`.

## Functions

<a id="safecall-address-uint256-uint256-uint16-bytes"></a>

### safeCall

calls a contract with a specified gas limit and value and captures the return data

```solidity
function safeCall(
        address _target,
        uint256 _gas,
        uint256 _value,
        uint16 _maxCopy,
        bytes memory _calldata
    ) internal returns (bool, bytes memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _target | `address` | The address to call |
| _gas | `uint256` | The amount of gas to forward to the remote contract |
| _value | `uint256` | The value in wei to send to the remote contract<br/>to memory. |
| _maxCopy | `uint16` | The maximum number of bytes of returndata to copy<br/>to memory. |
| _calldata | `bytes` | The data to send to the remote contract |

**Returns**

| Name         | Type    | Description                                                                         |
| ------------ | ------- | ----------------------------------------------------------------------------------- |
| &lt;none&gt; | `bool`  | success and returndata, as `.call()`. Returndata is capped to<br/>`_maxCopy` bytes. |
| &lt;none&gt; | `bytes` |                                                                                     |

<a id="safestaticcall-address-uint256-uint16-bytes"></a>

### safeStaticCall

Use when you _really_ really _really_ don't trust the called
contract. This prevents the called contract from causing reversion of
the caller in as many ways as we can.

<i>

The main difference between this and a solidity low-level call is
that we limit the number of bytes that the callee can cause to be
copied to caller memory. This prevents stupid things like malicious
contracts returning 10,000,000 bytes causing a local OOG when copying
to memory.

</i>

```solidity
function safeStaticCall(
        address _target,
        uint256 _gas,
        uint16 _maxCopy,
        bytes memory _calldata
    ) internal view returns (bool, bytes memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _target | `address` | The address to call |
| _gas | `uint256` | The amount of gas to forward to the remote contract |
| _maxCopy | `uint16` | The maximum number of bytes of returndata to copy<br/>to memory. |
| _calldata | `bytes` | The data to send to the remote contract |

**Returns**

| Name         | Type    | Description                                                                         |
| ------------ | ------- | ----------------------------------------------------------------------------------- |
| &lt;none&gt; | `bool`  | success and returndata, as `.call()`. Returndata is capped to<br/>`_maxCopy` bytes. |
| &lt;none&gt; | `bytes` |                                                                                     |
