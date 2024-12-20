# Yield Repurchase Facility

The Yield Repurchase Facility (YRF) is an automated system to use the yield generated by the Protocol to buyback OHM from the market. In addition to using yield to buy OHM, it funds additional purchases by exchanging the OHM it receives from purchases for its backing in USDS. This increases the purchasing power of the facility and reduces OHM supply.

## Mechanism

YRF is implemented as a smart contract that is deployed in the Olympus V3 system. It is integrated into the Heart contract and is activated by its regular beats (every 8 hours).

YRF is configured to pull earned yield from the Treasury on a weekly cadence. On the weekly reset the system:
1. Calculates the amount of yield earned by the Treasury for reserves deposited in the USDS savings vault the amount of yield earned from Cooler loans for the previous week. It stores this amount as the "next yield" value, which will be used the following week. By looking at retroactive earnings, we avoid issues with balance changes that alter the effective yield for the following week.
2. Pulls the yield calculated for the system the previous week from the Treasury in the form of sUSDS. 

Then, on a daily cadence (including on the same day as the weekly reset), the system:
1. Checks the amount of OHM received the previous day, borrows USDS against it at a preconfigured backing value, and then burns the OHM.
2. It unwraps a day's worth of USDS from sUSDS to use for purchases.
3. Creates a market on Bond Protocol to buy OHM with USDS over a 1 day period using the day's worth of yield + backing from the previously purchased OHM.

A common question is how does taking the backing from the purchased OHM affect the daily purchase amounts. The short answer is that it depends on the price of OHM over the week. If the price of OHM is increasing, then the YRF buys back less OHM than it would have and has less backing to add to the buybacks. If the price of OHM is decreasing, then it buys back more OHM than it would have and has more backing to add to the buybacks.

As a longer explanation, let's consider a simple example where the YRF has the following inputs and the OHM price stays constant throughout the week:
- Weekly yield = 70,000 USDS
- OHM price = 20 USDS
- Backing = 10 USDS

The following table illustrates the purchases made each day starting at the beginning of the week. Note: we assume that the YRF buys all of its intended capacity on a daily basis. If price is dropping quickly, then it may not achieve this level of efficiency.

| Day | Reserve Balance | Fraction to Use | Total Spent    | OHM Purchased | Backing Received from OHM |
| --- | --------------- | --------------- | -------------- | ------------- | ------------------------- |
|  1  | 70,000 USDS     | 1/7             | 10,000 USDS    | 500 OHM       | 5,000 USDS                |
|  2  | 65,000 USDS     | 1/6             | 10,833.33 USDS | 541.67 OHM    | 5,416.67 USDS             |
|  3  | 59,583.33 USDS  | 1/5             | 11,916.67 USDS | 595.83 OHM    | 5,958.33 USDS             |
|  4  | 53,650 USDS     | 1/4             | 13,412.5 USDS  | 670.625 OHM   | 6,706.25 USDS             |
|  5  | 46,943.75 USDS  | 1/3             | 15,647.92 USDS | 782.396 OHM   | 7,823.96 USDS             |
|  6  | 39,119,79 USDS  | 1/2             | 19,559.90 USDS | 977.995 OHM   | 9,779.95 USDS             |
|  7  | 29,339.84 USDS  | 1               | 29,339.84 USDS | 1466.992 OHM  | 14,669.92 USDS            |

In this case, the amount of OHM purchased is increasing each day and the amounts speed up towards the end because we are distributing the received backing over the remaining days instead of using it all immediately. The affect of this is magnified if the price is dropping because we buy back more OHM each day, which means more OHM is burnt and its backing is used for purchases. The opposite happens if price is rising.

## Mandate

OHM buybacks using yield generated by the protocol were originally proposed and activated by OIP-163 "The Framework". Following that, OIP-164 gave authority for the DAO to make this an ongoing activty and to automate it via the development of the Yield Repurchase Facility contract.