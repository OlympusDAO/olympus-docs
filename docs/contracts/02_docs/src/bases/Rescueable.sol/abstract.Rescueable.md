# Rescueable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/Rescueable.sol)

**Inherits:** [IRescueable](/main/contracts/docs/src/bases/interfaces/IRescueable.sol/interface.IRescueable), ERC165

**Title:** Rescueable

An abstract base for contracts that expose a privileged `rescue()` to sweep
accidentally-sent assets.
Derived contracts authorize the caller via the `_authorizeRescue()` hook.

<i>

The native asset is identified using the EIP-7528 sentinel.

</i>

## Functions

<a id="rescue-address-address-payable"></a>

### rescue

<i>

Sweeps the entire balance of the specified asset to the provided recipient.
Pass the EIP-7528 native sentinel (`ERC7528Constants.NATIVE_ASSET`) as `token_`
to rescue the native asset.

</i>

Reverts if:

- The caller is not authorised by the implementation's `_authorizeRescue()`.
- `to_` is the zero address.

Does NOT revert when the contract's balance of `token_` is zero, so the call is
a no-op in that case.

```solidity
function rescue(address token_, address payable to_) public virtual override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token_ | `address` | The token to rescue, or the EIP-7528 native sentinel for the native asset. |
| to_ | `address payable` | The recipient of the rescued assets. |

<a id="_authorizerescue"></a>

### _authorizeRescue

Hook for subclasses to authorize the caller of `rescue()`.

<i>

Implementations MUST revert if the caller is not authorised.

</i>

```solidity
function _authorizeRescue() internal view virtual;
```

<a id="supportsinterface-bytes4"></a>

### supportsInterface

<i>

See `IERC165`.

</i>

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
