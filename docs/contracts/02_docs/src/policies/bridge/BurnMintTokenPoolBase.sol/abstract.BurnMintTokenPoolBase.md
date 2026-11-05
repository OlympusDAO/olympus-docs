# BurnMintTokenPoolBase

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/bridge/BurnMintTokenPoolBase.sol)

**Inherits:** BurnMintTokenPoolAbstract

**Title:** BurnMintTokenPoolBase

Base contract for creating BurnMintTokenPools.

<i>

This extends the `BurnMintTokenPoolAbstract` contract to allow for a customisable mint call.

</i>

## Functions

<a id="_mint-address-uint256"></a>

### _mint

Specific mint call for a pool.

<i>

Overriding this method allows us to create pools with different mint signatures without duplicating the underlying logic.

</i>

```solidity
function _mint(address receiver_, uint256 amount_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| receiver_ | `address` | The address to mint the tokens to. |
| amount_ | `uint256` | The amount of tokens to mint. |

<a id="releaseormint-pool-releaseormint256inv1"></a>

### releaseOrMint

Releases or mints tokens to the receiver address.

<i>

This is the same as the `releaseOrMint` function in the `BurnMintTokenPoolAbstract` contract, with the direct `mint()` call replaced by the call to the virtual `_mint()` function.

</i>

```solidity
function releaseOrMint(
        Pool.ReleaseOrMintInV1 calldata releaseOrMintIn
    ) public virtual override returns (Pool.ReleaseOrMintOutV1 memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| releaseOrMintIn | `Pool.ReleaseOrMintInV1` | All data required to release or mint tokens. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Pool.ReleaseOrMintOutV1` | releaseOrMintOut The amount of tokens released or minted on the local chain, denominated<br/>in the local token's decimals. |
