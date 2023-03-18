# Boosted Liquidity Vaults

The Boosted Liquidity Vault is a new Olympus utility designed to improve the stability of OHM pairs and establish OHM as a liquidity router for the main pillars of DeFi. By incentivizing third-party liquidity provision using high-quality counter assets, the protocol aims to boost liquidity and minimize volatility.

The mechanism provides a framework for the Olympus Treasury to mint OHM directly into liquidity pair vaults against allowlisted assets. The counter-asset will be provided by individual holders and the vault will be incentivized by partner incentives.

## Economic Mechanisms

The BoostedLiquidity Vaults are designed to boost liquidity for OHM pairs and stabilize their exchange rate relative to high-quality counter assets through a self-regulating system. The circulating supply of OHM is dynamically adjusted based on its own price fluctuations, but also with the ones of the counter-asset. This property helps stabilize their exchange rate with a self-regulating system.

When the price of OHM increases relative to the counter-asset (either by OHM appreciation or depreciation of the partner token), some of the OHM that was previously minted into the liquidity pool is released back into circulation. This increase in the circulating supply of OHM should, all else being equal, push the price of OHM back down.

Conversely, if the price of OHM decreases relative to the counter-asset (either by OHM depreciation or appreciation of the partner token), previously circulating OHM will now enter the liquidity pool and the protocol will have a claim on it. This decrease in the circulating supply of OHM should, all else being equal, push the price of OHM back up.

*Note: It is important to note that the effectiveness of the vaults in dampening volatility is directly tied to the amount of liquidity that is provided. The more liquidity that is provided, the more effective the volatility-dampening effect will be.

## Operational Mechanisms

### Deposit
The deposit process is simple and straightforward. Anyone (both, users and DAOs) can deposit their assets into the vault to provide single-sided liquidity and receive farming rewards in exchange. The steps are as follows:

1. The counter-asset is deposited by the user.
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
- Ability to provide single sided liquidity.
- Reduced fees / slippage when entering an LP position.
- Double the rewards (compared to traditional pools) because Olympus is giving up all of its rewards and allocating them to users instead.

## Risks by Stakeholder

### For the Protocol:
-   The OHM is exposed to the counter asset's volatility.
-   Newly minted supply could lead to OHM depreciation if the market is inefficient.

### For Partners:
-   The asset is exposed to OHM's volatility.
-   If Olympus appreciates a lot in price, their asset could be impacted due to arbitrageurs. However, this risk is minimized by the fact that RBS (Reference Based Stabilization) is actively dampening OHM volatility versus DAI.

### For Users:
- The typical liquidity provider risks apply (smart contract risk, impermanent loss, etc).
- If the ratio of assets in the liquidity pool changes significantly over time, users may experience impermanent losses (IL), which occur when the value of the assets they receive upon withdrawal is lower than the value than the originally deposited assets would have.
- To encourage users to provide liquidity and reduce the risks associated with liquidity provision, Olympus is giving up all of its rewards and allocating them to users instead.


[yella's infographic on IL risk]

By participating in the Boosted Liquidity Vaults, users and partners can take advantage of the benefits offered by Olympus DAO while managing their risks. We believe this mechanism will play an important role in the growth and stability of the Olympus ecosystem.

## Security Considerations

Security is of utmost importance to Olympus. The DAO is committed to ensuring that the participants of the econohmy are always safe and secure. The Boosted Liquidity Vaults implement several measures to mitigate security risks.

Firstly, the smart contracts have been designed with security in mind. The contracts do not have upgradable proxies, meaning that once a contract has been deployed, its code cannot be changed. This ensures that there are no unforeseen changes that can compromise the integrity of the contract.

Secondly, an emergency shutoff mechanism has been implemented, which is controlled by the DAO multisig. This function allows for a quick and efficient way to shut down the platform in the event of an emergency, such as an exploit.

Thirdly, the vault uses price oracles to determine the USD value of OHM and the pair asset. While this approach is necessary to facilitate the Boosted Liquidity Vaults, it also exposes the vault to potential attacks (either from well capitalized individuals, or flashlaon users). To mitigate this risk, the vault implements a strategy where it executes an arbitrage between the pool where the assets are deposited and the oracle price feeds. By taking the arbitrage opportunity, the vault ensures that any attempt to manipulate the price oracle or the pool composition will translate the price imbalance to the attacker (generating a profit for the vault and a loss for the attacker).

Furthermore, all smart contracts have been audited by reputable third-party auditors such as [Sherlock](link-to-report-sherlock) and [XXX](link-to-report-XXX). Any issues identified during the audit have been addressed and re-audited to ensure that the necessary corrections were made. In addition, an [ImmuneFi bug bounty program](link-to-immunefi) has been implemented to incentivize white-hat hackers to find and report any vulnerabilities they may discover in the Boosted Liquidity Vaults. This practice helps proactively identify and address any potential security issues before they can be exploited.

Olympus takes the security of its ecosystem very seriously and is committed to ensuring that its users' assets are always protected. With these measures in place, participants can have confidence in the security of the Boosted Liquidity Vaults.