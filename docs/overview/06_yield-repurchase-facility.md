---
title: "Yield Repurchase Facility: OHM Buybacks"
description: "The Yield Repurchase Facility uses protocol yield and backing recycled from purchased OHM to fund market buybacks."
sidebar_label: "Yield Repurchase Facility"
---

# Yield Repurchase Facility

The Yield Repurchase Facility (YRF) uses protocol yield to buy back OHM. It can also recycle backing from purchased OHM into later purchases, increasing the facility's buying capacity while reducing OHM supply.

## Mechanism

YRF is an Olympus V3 smart contract integrated with Heart. Heartbeats trigger its accounting and market operations; the effective budget and execution history should be read from current contract or indexer data.

YRF is configured to pull earned yield from the Treasury on a weekly cadence. On the weekly reset the system:

1. Calculates the previous week's eligible savings-vault and Cooler-loan yield. It stores this as "next yield" for a later reset, avoiding estimates based on changing balances.
2. Pulls the yield calculated for the system the previous week from the Treasury in the form of sUSDS.

Then, on a daily cadence (including on the same day as the weekly reset), the system:

1. Checks the amount of OHM received the previous day, borrows USDS against it at a preconfigured backing value, and then burns the OHM.
2. It unwraps a day's worth of USDS from sUSDS to use for purchases.
3. Creates a Bond Protocol market to buy OHM with USDS over a one-day period, using that day's yield allocation and backing recycled from prior purchases.

YRF consumes the backwards-compatible OHM price functions exposed by PRICE. PRICE v1.2 keeps those v1-style functions available for YRF while adding granular asset-specific accessors for future protocol integrations.

A common question is how does taking the backing from the purchased OHM affect the daily purchase amounts. The short answer is that it depends on the price of OHM over the week. If the price of OHM is increasing, then the YRF buys back less OHM than it would have and has less backing to add to the buybacks. If the price of OHM is decreasing, then it buys back more OHM than it would have and has more backing to add to the buybacks.

As an illustration, suppose the YRF has the following inputs and OHM's price stays constant throughout the week. These are hypothetical values, not current rates or budgets:

- Weekly yield = 70,000 USDS
- OHM price = 20 USDS
- Backing = 10 USDS

The table assumes every day's market fills its intended capacity. Values are rounded independently, so displayed rows may differ by a cent from arithmetic on rounded figures. Actual markets may not fill, especially when prices move quickly.

| Day | Reserve Balance | Fraction to Use | Total Spent    | OHM Purchased | Backing Received from OHM |
| --- | --------------- | --------------- | -------------- | ------------- | ------------------------- |
| 1   | 70,000 USDS     | 1/7             | 10,000 USDS    | 500 OHM       | 5,000 USDS                |
| 2   | 65,000 USDS     | 1/6             | 10,833.33 USDS | 541.67 OHM    | 5,416.67 USDS             |
| 3   | 59,583.33 USDS  | 1/5             | 11,916.67 USDS | 595.83 OHM    | 5,958.33 USDS             |
| 4   | 53,625.00 USDS  | 1/4             | 13,406.25 USDS | 670.31 OHM    | 6,703.12 USDS             |
| 5   | 46,921.88 USDS  | 1/3             | 15,640.62 USDS | 782.03 OHM    | 7,820.31 USDS             |
| 6   | 39,101.56 USDS  | 1/2             | 19,550.78 USDS | 977.54 OHM    | 9,775.39 USDS             |
| 7   | 29,326.17 USDS  | 1               | 29,326.17 USDS | 1,466.31 OHM  | 14,663.09 USDS            |

In this simplified example, purchases increase toward the end of the week because backing from earlier purchases is spread across the remaining days. Actual fills, prices and budgets vary.

## Mandate

Olympus governance approved the use of protocol yield for OHM buybacks and the development of YRF to automate them. The facility's current budget, market creation and completed purchases are live state, not fixed terms of the original mandate.
