# Single Sided Liquidity Vaults

The Single Sided Liquidity Vault is a new Olympus utility designed to improve the stability of OHM pairs and establish OHM as a liquidity router for the main pillars of DeFi. By incentivizing third-party liquidity provision using high-quality counter assets, the protocol aims to boost liquidity and minimize volatility.

The mechanism provides a framework for the Olympus Treasury to mint OHM directly into liquidity pair vaults against whitelisted assets. The counter-asset will be provided by individual holders and the vault will be incentivized by partner incentives.

## Economic Mechanisms

The Single Sided Liquidity Vaults are designed to boost liquidity for OHM pairs and stabilize their exchange rate relative to high-quality counter assets through a self-regulating system. The circulating supply of OHM is dynamically adjusted based on its own price fluctuations, but also with the ones of the counter-asset. This property helps stabilize their exchange rate with a self-regulating system.

When the price of OHM increases relative to the counter-asset (either by OHM appreciation or depreciation of the partner token), some of the OHM that was previously minted into the liquidity pool is released back into circulation. This increase in the circulating supply of OHM should, all else being equal, push the price of OHM back down.

Conversely, if the price of OHM decreases relative to the counter-asset (either by OHM depreciation or appreciation of the partner token), previously circulating OHM will now enter the liquidity pool and the protocol will have a claim on it. This decrease in the circulating supply of OHM should, all else being equal, push the price of OHM back up.

*Note: It is important to note that the effectiveness of the vaults in dampening volatility is directly tied to the amount of liquidity that is provided. The more liquidity that is provided, the more effective the volatility-dampening effect will be.

## Operational Mechanisms

### Deposit
The deposit process is simple and straightforward. Anyone (both, users and DAOs) can deposit their assets into the vault to provide single-sided liquidity and receive farming rewards in exchange. The steps are as follows:

1. The counter-asset is taken from the user.
2. The counter-asset is valued using oracles and OHM is minted 1:1 against the dollar value of the deposited counter-asset.
4. The newly minted OHM and deposited counter-asset are deployed into a liquidity pool.
5. LP receipt tokens are custodied by the vault.
6. User’s claim on the LP receipt tokens is tracked.

*Note this vault is custom implementation which doesn't rely on the ERC20 nor the ERC1155 standards. Therefore, despite the claim on the LP is tracked in the contracts, users won't receive a standard receipt of the LP tokens in exchange.

### Withdraw
Users can also withdraw their assets from the vault whenever they want. The steps are as follows:

1.  The user specifies how many LP receipt tokens they would like to withdraw from.
2.  OHM and counter-asset are withdrawn from the liquidity pool in exchange for the LP receipt tokens.
3.  All the OHM received by the vault is burned.
4.  All the received counter-asset and reward tokens are sent back to the user.

## Benefits by Stakeholder

### For the Protocol:
- Facilitating the provision of liquidity for OHM pairs through a more streamlined process.
- Increasing the liquidity of OHM pairs by incentivizing users to provide liquidity using selected, high-quality counter assets.
- Dampening OHM volatility against these high-quality counter-pair assets, helping position OHM as a base asset with great liquidity routing.

### For Partners:
- A more efficient liquidity mining vehicle.
- Olympus does not take a portion of the rewards provided by the partner protocol, meaning partners get 2x TVL for their rewards compared to traditional liquidity mining systems.
- Since OHM is a volatile asset with decent price stability, by pairing with it partners can:
    - Reduce the Impermanent Loss (IL) that Liquidity Providers (LPs) would accure when providing liquidity agains stables.
    - Minimize the price supression that arbitrageurs can produce when their pools are paired with ETH.


### For Users:
- If the ratio of assets in the liquidity pool changes significantly over time, users may experience impermanent losses, which occur when the value of the assets they receive upon withdrawal is lower than the value of the assets they originally deposited.
- To encourage users to provide liquidity and reduce the risks associated with liquidity provision, Olympus is giving up all of its rewards and allocating them to users instead.

## Risks by Stakeholder

### For the Protocol:
-   The OHM is exposed to the counter asset's volatility.
-   Newly minted supply could lead to OHM depreciation if the market is inefficient.

### For Partners:
-   The asset is exposed to OHM's volatility.
-   If Olympus appreciates a lot in price, their asset could be impacted due to arbitrageurs. However, this risk is minimized by the fact that RBS (Reference Based Stabilization) is actively dampening OHM volatility versus DAI.

### For Users:
-   The typical liquidity provider risks apply in this mechanism too.
-   If the composition of the pool changes over time, users may incur some Impermanent Loss (IL).
-   Olympus gives up its rewards in favor of users to incentivize deposits and minimize the risks of liquidity provisioning.

By participating in the Single Sided Liquidity Vaults, users and partners can take advantage of the benefits offered by Olympus DAO while managing their risks. We believe this mechanism will play an important role in the growth and stability of the Olympus ecosystem.