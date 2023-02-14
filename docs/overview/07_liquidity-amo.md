# Single Sided Liquidity Vaults

The Single Sided Liquidity Vault aims to bootstrap third-party liquidity for OHM pairs with selected, high quality counter assets. The goal is to improve OHM's stability relative to these counter-assets and stablishing it as a liquidity router of the main pillars of DeFi.

The mechanism provides a framework for the Olympus Treasury to mint OHM directly into liquidity pair vaults against whitelisted assets. The counter-asset will be provided by individual holders and the vault will be incentivized by partner incentives.

## Economic Mechanisms

Through the design of the single sided liquidity vaults, Olympus creates a self-correcting system that boosts liquidity for OHM pairs while dampening its relative volatility against the partner counter asset. The circulating supply of OHM is dynamically adjusted based on price fluctuation of OHM and the counter-asset, which helps stabilize their exchange rate with a self-regulating system.

On the one hand, when the price of OHM increases relative to the counter-asset (either by OHM appreciation or depreciation of the partner token), some of the OHM that was previously minted into the liquidity pool is released back into circulation. This increase in the circulating supply of OHM should, all else being equal, push the price of OHM back down.

On the other hand, if the price of OHM decreases relative to the counter-asset (either by OHM depreciation or appreciation of the partner token), previously circulating OHM will now enter the liquidity pool and the protocol will have a claim on it. This decrease in the circulating supply of OHM should, all else being equal, push the price of OHM back up.

*Note that the volatility-dampening effect of the vaults will be limited by the amount of liquidity bootstrapped by the vaults. The deeper the pools, the more effective they will become.

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
- Efficiently bootstrapping liquidity for OHM.
- Growing liquidity for pairs with quality counter-assets.
- Dampening OHM volatility against these counter-pair assets.

### For Partners:
- A more efficient liquidity mining vehicle.
- Olympus does not take a portion of the rewards provided by the partner protocol, meaning partners get 2x TVL for their rewards compared to traditional liquidity mining systems.

### For Users:
-   More efficient liquidity farms.
-   Receiving 2x rewards, relative to traditional liquidity systems.
-   Effectively receiving 2x leverage on reward accumulation without 2x exposure to the underlying asset nor liquidation risk.

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