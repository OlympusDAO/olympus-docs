---
sidebar_position: 2
sidebar_label: Range Bound Stability
---

# Range Bound Stability

After the protocol was able to bootstrap its treasury with an initial growth phase powered by the continuous emission of bonds, it has reached a treasury size and an overall maturity where it can start shifting its focus towards a more stable phase.

Having this in mind, Zeus (with the support of the DAO members) ideated a novel mechanism that leverages the protocol treasury reserves and protocol owner liquidity to create an algorithmic forward-looking trading range in which the protocol provides a spread of maker and taker bids and asks to create consistent, predictable market pricing. This system moderates protocol and treasury growth in exchange for support, effectively making the treasury an active participant in the ecosystem that backs its currency.

A deep-dive explanation of the system can be found in the [Range Bound Stability paper](https://docs.google.com/document/u/2/d/e/2PACX-1vSIufbgAxAAtZkITd_s57o5AmyhAnk6iYbLYvN-ATL59hQ5nC2t2BTPvA8X9DYzFa-i3PRw9ARrAS9E/pub).

## How will the Range Bound system help with Stability?

By evolving from a passive liquidity provider role, into a more active one with market-making activity and by defining a framework, a set of objectives, and clearly communicating the Treasury operations in advance, the protocol reduces market risk for its participants through the issuance of guidance and by providing predictability.

As long as the protocol remains credible and trustworthy, the market participants are incentivized to support the objectives that the protocol sets (predictability), so those that trade alongside the Treasury are rewarded and those deviating are dissuaded.

The credibility of this protocol guidance is derived from the capitalization of the Treasury and its majority ownership of market liquidity. As long as the Treasury holds significant assets relative to the *market capitalization of the liquid supply of OHM*, the market should take its guidance seriously. On top of that, the protocol’s majority ownership of its liquidity markets further extends this dynamic.

*Note that the influence of the Treasury over the market is directly dependent on the liquid supply of OHM. Thanks to the introduction of [OHM bonds](./ohm-bonds.md), the protocol can convert current supply into supply locked on a protocol level, magnifying the influence of the Treasury over the liquid market.*


## How does the Range Bound Stability system work?

As previously described, the system will use Treasury assets to perform market operations and guide market participants.

The whole system revolves around a target price. This target is calculated as a price moving average, and determines the range of "free trading" where the treasury expects regular market activity to happen.

Based on this target price, the treasury will algorithmically set (and therefore publicly announce) some price levels that would require considerable price volatility. If the market activity were to reach those levels that the treasury considers irrational, it would perform a set of market operations to dampen volatility and revert price to its mean.

It is important to note that the treasury wants to dissuade irrational traders from creating volatility, but it is not willing to combat the whole market. Because of that, it will only allocate a certain percentage of its reserves to market operations and, if there is enough coordination from market participants, it will let those participants establish a new trading range outside of the previous one.

![RBS-paper](/gitbook/assets/range-denoted.png)

Market operations have two different forms based on how far from the price target the market is trading. Initially, some capacity is used by creating bond markets. If this capacity depletes then additional capacity is added in the form of fixed exchange rate swaps with the treasury.
