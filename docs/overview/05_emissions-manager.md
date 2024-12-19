# Emissions Manager

## Overview

On the App you'll notice a variety of metrics, here's what they mean:
- Base Emission Rate is the base % of circulating supply to be sold per day (at the minimum premium)
- Premium is the % market is above backing (obv), must be >= 100% for EM to be active
- Current Emission Rate is the % of circulating supply to be sold per day at the current premium. This is the base emission rate scaled up as premium rises, Base Rate * (1 + premium / 1 + min premium). It's 0% if the premium is not >= the minimum premium (100%)
- Current Emissions is the Current Emission Rate * Circulating Supply (really gOHM supply in OHM terms since we're using that as a proxy for circulating supply)
- Next Emission Rate and Next Emission are just the same values for the next using the current price, not sure Next Emission Rate and Current Emission Rate will be different since the Current Emission is cached using a bond market capacity, but not sure the actual rate is cached (unless in an event)

