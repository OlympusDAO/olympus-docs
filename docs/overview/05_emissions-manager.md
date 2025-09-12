# Emissions Manager

## Overview

The Emissions Manager (EM) is an Olympus Policy installed into the Kernel.  Its purpose is to emit new OHM supply into the market in a programmatic way.  At its core, its schedule is informed by two main variables:  the **base emissions rate** and the **minimum premium**.  This variables are configurable by OCG in the event that they need to be adjusted in the future.  The calculation of premium (which equals market price / backing price) occurs every 3 epochs and is triggered by the heart.

When premium is greater than the minimum premium, the protocol will create a Bond Protocol market offering a computed amount of OHM in exchange for new reserves (in the form of USDS). The equation for this emission is: `new supply = total supply * base emissions rate * (premium + 100%) / (minimum premium + 100%)`

## Examples

Let’s assume a total supply of 15m OHM and the base emissions rate is set to 0.02%
Let’s also assume the current premium is 200% (Price of $30 with backing of $10)
Last, let’s assume the minimum premium is set to 100%
We then derive:
New Supply = `15m * 0.0002 * (2 + 1) / (1 + 1) = 4,500` to be minted and sold through the Bond Protocol Market over the next 8 Hours (One Epoch)

## Definitions

The Emissions Manager also considers the following definitions:

- Base Emission Rate is the base % of Circulating Supply to be sold per day (At the minimum premium)
- Premium is the % Market Price is above backing and must be >= 100% for EM to be active
- Current Emission Rate is the % of circulating supply to be sold per day at the current premium. This is the base Emission Rate scaled up as premium rises: `Base Rate * (1 + premium / 1 + min premium)`. Its 0% if the premium is not >= the minimum premium (100%)
- Current Emissions is the Current Emission Rate * Circulating Supply (Really gOHM supply in OHM terms since we're using that as a proxy for circulating supply)
- Next Emission Rate and Next Emission are just the same values for the next using the current price
