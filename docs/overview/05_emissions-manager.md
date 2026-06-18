# Emissions Manager

## Overview

The Emissions Manager (EM) is an Olympus Policy installed into the Kernel. Its purpose is to control potential OHM emissions when OHM trades at a sufficient premium to treasury backing. At its core, its schedule is informed by two main variables: the **base emissions rate** and the **minimum premium**. These variables are configurable by OCG in the event that they need to be adjusted in the future. The calculation of premium (which equals market price / backing price) occurs periodically and can be triggered by the Heart.

When premium is greater than the minimum premium and the relevant contracts are configured and enabled, the protocol can create a Convertible Deposits auction offering a computed amount of OHM in exchange for new reserves, currently expected to be stablecoin reserves such as USDS. If the premium target has not been reached, the auction can be disabled. The equation for this emission is: `new supply = total supply * base emissions rate * (premium + 100%) / (minimum premium + 100%)`

The EmissionManager tracks auction performance over a defined tracking period. If OHM is under-sold during the auction, the system can use a configured fallback capacity, such as a Bond Protocol market, to sell remaining under-sold OHM. If fallback capacity is set to zero, no fallback market is created.

## Key Variables & Definitions

### Core Parameters

- **Base emissions rate** - the base percentage of circulating supply to be sold per day (at minimum premium)
- **Minimum premium rate** - the threshold premium required for emissions to be active (must be ≥ 100%)
- **Backing** - the treasury backing value used in premium calculations
- **Tick size** - the amount in OHM that each auction tick will have as capacity
- **Min price scalar** - the multiplier applied to the price of OHM (≤ 100%) used in auction pricing

### Calculated Values

- **Premium** - the percentage that market price is above backing (`market price / backing price`)
- **Current emission rate** - the percentage of circulating supply to be sold per day at current premium:

  ```text
  Base Rate × (1 + premium) / (1 + min premium)
  ```

  Returns 0% if premium is below minimum premium

- **Current emissions** - Current emission rate × the supply measure configured for the emission calculation
- **Next emission rate/emissions** - same calculations using next period's projected price

All core parameters are configurable by OCG and can be adjusted as needed.

### Limitations

#### Limited to Stablecoins

The `EmissionManager` utilises the `PRICE` module, which provides the price of OHM in terms of the configured reserve token. It uses that value to determine the minimum price that the `ConvertibleDepositAuctioneer` contract will sell OHM at.

As a result, the `EmissionManager` cannot currently be configured to run auctions for assets that are not stablecoins, as the minimum price calculation would be incorrect.

## Example Calculation

**Given:**

- Total supply: 15m OHM
- Base emissions rate: 0.02%
- Current premium: 200% (price: $30, backing: $10)
- Minimum premium: 100%

**Calculation:**

```text
New Supply = 15m × 0.0002 × (2 + 1) / (1 + 1) = 4,500 OHM
```

**Result:**
4,500 OHM will be offered (not minted - happens at conversion) through the auction over the next 3 epochs (24 hours total). If the auctions over the auction tracking period undersell, any remaining OHM will be sold through a Bond Protocol market as fallback.
