---
sidebar_position: 3
---

# Bonds

Olympus bonds are a financial primitive for protocols to acquire assets, including their own liquidity, over a specified time in exchange for tokens upon maturity. In other words, Olympus bonds are a pricing mechanism for any two ERC-20 tokens that does not rely on third parties like oracles.

External Bonds are an application of this primitive, which sells OHM at a discount to acquire Treasury assets. External Bonds represent the primary mechanism for Olympus Treasury inflows.

When purchasing a bond, purchasers commit a capital sum upfront in return for OHM upon maturity. Thus, a bond’s profit is uncertain and dependent on the price of OHM at the time of maturity.

When viewing a current bond offering, a positive discount indicates that the bond is currently offering OHM at a discount to its current market price. A negative discount indicates that the bond is currently offering OHM at a premium to its current market price.

This variable discount rate is how a bond market internally governs its supply by responding to demand. This ensures that a bond market’s supply is sold over the specified period of time.
