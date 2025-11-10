# BurnMintTokenPoolBase

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/bridge/BurnMintTokenPoolBase.sol)

**Inherits:**
BurnMintTokenPoolAbstract

Base contract for creating BurnMintTokenPools.

*This extends the `BurnMintTokenPoolAbstract` contract to allow for a customisable mint call.*

## Functions

### _mint

Specific mint call for a pool.

*Overriding this method allows us to create pools with different mint signatures without duplicating the underlying logic.*

```solidity
function _mint(address receiver_, uint256 amount_) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver_`|`address`| The address to mint the tokens to.|
|`amount_`|`uint256`|   The amount of tokens to mint.|

### releaseOrMint

Releases or mints tokens to the receiver address.

*This is the same as the `releaseOrMint` function in the `BurnMintTokenPoolAbstract` contract, with the direct `mint()` call replaced by the call to the virtual `_mint()` function.*

```solidity
function releaseOrMint(Pool.ReleaseOrMintInV1 calldata releaseOrMintIn)
    public
    virtual
    override
    returns (Pool.ReleaseOrMintOutV1 memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`releaseOrMintIn`|`Pool.ReleaseOrMintInV1`|All data required to release or mint tokens.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Pool.ReleaseOrMintOutV1`|releaseOrMintOut The amount of tokens released or minted on the local chain, denominated in the local token's decimals.|
