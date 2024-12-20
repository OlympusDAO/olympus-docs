# Emissions Manager

The Emission Manager is an automated system to control OHM emissions. More specifically, it determines a daily capacity of new OHM to sell based on the difference between OHM's backing per token and the market price. It then creates a Bond Protocol market to sell that capacity over the following day. The Emission Manager is configured to only operate at a minimum premium level, ensuring that sales of OHM are accretive to backing.

## Parameters
- **Minimum Premium** - OHM's premium is the percent over the backing price that it sells for in the market. In the Emissions Manager, the minimum premium is the minimum value that is acceptable to allow for new OHM emissions. The initial value is 100%. If the premium is not above this value, then the EM does not issue new tokens.
- **Base Emission Rate** - the base % of circulating supply to be sold per day (at the minimum premium)
- **Backing** - The contract is initialized with current backing per OHM. On each sale, it updates the value based on the additional value accrued. This does not consider increases in backing from yield (which are likely spent via YRF) or other sales such as RBS upper wall sales, making it a conservative value. This can be manually adjusted over time if it drifts too much.

## Mechanism

The Emission Manager is sequenced with the rest of the Olympus protocol via the thrice daily heart beat. It activates once a day (every third beat). When activated, it calculates the emissions for that day.

To calculate the daily emissions, it:
1. Compares the current OHM price (via the PRICE module oracle) against its stored backing value * (1 + minimumPremium). If the current price is less than the minimum premium over backing, then the daily emissions are zero. If not, it proceeds to the next step.
2. Once we know the premium is at least at the minimum threshold, we can calculate the current emission rate by scaling the base emission rate by the amount the premium is over the minimum premium. The formula is:

EmissionRate = BaseEmissionRate * (1 + currentPremium) / (1 + minimumPremium)

The increased emissions help capture larger premium values for the treasury and increase backing. However, it scales slower than it could if we were comparing the premiums directly, i.e. 300% / 200% = 1.5 is less than 200% / 100% = 2.

3. It then calculates the daily emission capacity by multiplying the emission rate by the circulating supply of OHM.

Emission = EmissionRate * Circulating Supply

As a result, the Emission Manager can scale with OHM's supply without requiring adjustments to the emission rate.

Once the daily emission capacity is calculated, it creates a Bond Protocol market that runs for one day. As a result, the sale will be over by the time the next emission check is performed the following day.