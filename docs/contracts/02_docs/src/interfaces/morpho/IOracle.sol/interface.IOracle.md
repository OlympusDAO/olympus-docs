# IOracle

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/morpho/IOracle.sol)

**Title:** IOracle

**Author:** Morpho Labs

Interface that oracles used by Morpho must implement.

<i>

It is the user's responsibility to select markets with safe oracles.

</i>

**Note:**

- **contact:** <security@morpho.org>

## Functions

<a id="price"></a>

### price

Returns the price of 1 asset of collateral token quoted in 1 asset of loan token, scaled by 1e36.

<i>

It corresponds to the price of 10**(collateral token decimals) assets of collateral token quoted in
10**(loan token decimals) assets of loan token with `36 + loan token decimals - collateral token decimals`
decimals of precision.

</i>

```solidity
function price() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |
