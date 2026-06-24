# IOracle

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/interfaces/morpho/IOracle.sol)

**Title:**
IOracle

**Author:**
Morpho Labs

Interface that oracles used by Morpho must implement.

It is the user's responsibility to select markets with safe oracles.

**Note:**
contact: <security@morpho.org>

## Functions

### price

Returns the price of 1 asset of collateral token quoted in 1 asset of loan token, scaled by 1e36.

It corresponds to the price of 10**(collateral token decimals) assets of collateral token quoted in
10**(loan token decimals) assets of loan token with `36 + loan token decimals - collateral token decimals`
decimals of precision.

```solidity
function price() external view returns (uint256);
```
