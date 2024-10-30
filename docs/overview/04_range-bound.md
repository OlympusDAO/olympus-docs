# Range Bound Stability

## Overview

The Olympus Protocol automatically executes market operations to absorb volatility in the market price of OHM in relation to its reserve assets. This system is called Range-Bound Stability (RBS). The initial system design operates against individual reserve assets in isolation, and has been deployed to stabilize the price of OHM against DAI. The mechanism was originally defined in the [Stabilizing Currency Through a Protocol-Enforced Range](https://docs.google.com/document/u/2/d/e/2PACX-1vSIufbgAxAAtZkITd_s57o5AmyhAnk6iYbLYvN-ATL59hQ5nC2t2BTPvA8X9DYzFa-i3PRw9ARrAS9E/pub) white paper by Zeus et al.

![Visualization of Range](/gitbook/assets/range-denoted.png)

RBS involves deploying treasury reserves in a downward trending market and selling OHM for reserves in an upward trending market to stabilize price. The nature of these actions causes contraction and growth of the network depending on the market environment to enforce stability.

Liquidity is a key aspect of the Olympus system and the vast majority of OHM liquidity is [Protocol-Owned](./pol). In addition to the market operations performed by RBS, the protocol enacts policies to balance the amount of reserves deployed in liquidity and the treasury for RBS to maintain sufficient pricing depth.

:::info
Details can be found in these resources:
- [Whitepaper](https://ohm.fyi/gentle-pegging)
- [Initial spec](https://docs.google.com/document/d/1AdPex_lMpSC_3U8UEU4hiSZIT1O1FekoCujRtYEJ0ig)
- [Video overview](https://www.loom.com/share/f3b053ad02674383908d53783eccb37e)
:::

## RBS System Specification and Requirements

The following specification was used to implement the RBS V1 system. It provides a succint summary of the system operates. The implementation of the concepts can be found in the Technical Guides section of the docs.

1. Calculate and maintain a moving average price for OHM against a specified reserve asset for a configurable duration. The MA price should be updated each system epoch.
2. Calculate lower and upper bounds for the price OHM against a specified reserve asset, both “wall” and “cushion” components, from the moving average price and configurable spread variables. The price levels are calculated as:

        Lower Wall = MA * (1 - Wall Spread)
        Lower Cushion = MA * (1 - Cushion Spread)
        Upper Cushion = MA * (1 + Cushion Spread)
        Upper Wall = MA * (1 + Wall Spread)

        where Cushion Spread < Wall Spread
  
        such that LW < LC < MA < UC < UW

3. Allow users to swap OHM for reserves at the lower wall price (WL) and reserves for OHM at the upper wall price (WH) up to the specified capacity of the current walls.

    a. Capacity of the lower wall (bid) in reserves should be the amount of reserves in the Olympus Treasury multiplied by a configured bid factor (percent of reserves to use for each wall).  

        Bid Capacity = Bid Factor * Reserves

    b. Capacity of the upper wall (ask) in OHM should be the capacity of the lower wall (bid) divided by the upper wall price and scaled up by the difference in spread from the lower wall to the upper wall. 

        Ask Capacity = Bid Capacity * (1 + 2 * Wall Spread) / Upper Wall Price

    c. When the capacity of either wall is depleted, the system should not allow additional swaps on that side until it is regenerated.

    d. When the capacity of the upper wall (ask) is depleted, the system should not reinstate a new wall with additional capacity until the current price is observed to be below the MA price for a X out of the last Y system epochs, where X and Y are configured parameters representing the regeneration threshold (X) and total number of observations (Y). Additionally, the wall should not regenerate until a minimum configured amount of time has past.

4. Deploy a bond market to sell OHM for reserves when the current price of OHM against the reserve asset is greater than or equal to the upper cushion price at the system epoch with a capacity equal to the configured percentage of the upper wall capacity to use for the cushion.

    a. If a bond market is active on a system epoch, the system should close the market if the current price of OHM against the reserve is back below the upper cushion price or has exceeded the upper wall price.

    b. The bond market should be closed if the upper wall capacity is depleted.

    c. The bond market should be instant-swap with no vesting.

    d. The bond market should start at the upper wall price and have a minimum price of the upper cushion price.

5. Deploy a bond market to buy OHM with reserves when the current price of OHM against the reserve asset is less than or equal to the lower cushion price at the system epoch with a capacity equal to the configured percentage of the lower wall capacity to use for the cushion.

    a. If a bond market is active on a system epoch, the system should close the market if the current price of OHM against the reserve is back above the lower cushion price or has gone below the lower wall price.

    b. The bond market should be closed if the lower wall capacity is depleted.

    c. The bond market should be instant-swap with no vesting.

    d. The bond market should start at the lower wall price and have a minimum price of the lower cushion price.
