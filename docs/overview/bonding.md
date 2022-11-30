---
sidebar_position: 2
---

# Bonds

## Overview
Olympus bonds are a financial primitive that allow transacting assets, often between the protocol and individual stakeholders, over a specified time-period and at completely market-driven prices. In other words, Olympus bonds are a market-driven pricing mechanism for any two ERC-20 tokens that does not rely on third parties like oracles.

## Bond mechanics
Bonds are a financial primitive that allow transacting assets, often between the protocol and individual stakeholders, over a specified time-period and at completely market-driven prices. The bonds pricing mechanism is dictated by a modified dutch auction, called a Sequential Dutch Auction (SDA), which is solely driven by market actors and does not rely on oracles. 


### Purchasing a bond
When purchasing a bond, purchasers commit a capital sum upfront in return for OHM upon maturity. Thus, a bond’s profit is uncertain and dependent on the price of OHM at the time of maturity.

Bond payouts are dictated by their current discount percentage. A **positive** discount percentage indicates that the bond is offering a price less than the market price. Likewise, a **negative** discount percentage on a bond is offering a price greater than the market price.

This variable discount rate is how a bond market internally governs its supply by responding to demand. This ensures that a bond market’s supply is sold over the specified period of time.

:::info 
More information on bonds can be found in the
[Bond Protocol documentation](https://docs.bondprotocol.finance/)
:::

## Types of Olympus bonds

### Reserve Bonds
Reserve Bonds are bonds which sell OHM at a discount to acquire treasury reserve assets. Reserve bonds serve a dual purpose, of not only stabilizing OHM price in bullish market conditions, but also accumulating the profits from these bonds as treasury reserves. These accumulated reserves are later used to stabilize the price in bearish conditions using Inverse Bonds, described below.

### Inverse Bonds
Inverse Bonds are bonds which sell Reserve assets (generally USD stablecoins) in exchange for OHM, the inverse to Reserve Bonds. Like Reserve Bonds, these bonds are used to stabilize the OHM price.
Unlike reserve bonds, they vest instantly, and are the core mechanism of absorbing sell pressure from the market.

### OHM Bonds
OHM bonds are bonds which sell OHM for OHM. The purpose of these is to transition off of gOHM staking, which is perpetual and fully liquid, into a time-locked, semi-liquid form of staking.

More information on OHM bonds can be found in the whitepaper: 
[Liquid Interest Rate Markets through Olympus Bonds](https://hackmd.io/@HMyg0dxkQ96YOMpI30o8PA/mbga)

### Liquidity Bonds
Liquidity Bonds are similar to Reserve Bonds, except that they bond in Liquidity Provider (LP) tokens issued by an AMM. These bonds are used when there is a need to accumulate more liquidity.

