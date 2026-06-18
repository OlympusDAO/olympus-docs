# Protocol Owned Liquidity

## Overview

Olympus pioneered the concept of Protocol Owned Liquidity (POL), ensuring liquidity for OHM holders without relying on liquidity mining incentives. POL currently refers to protocol-owned DEX liquidity positions that Olympus controls across supported chains. These positions can change over time through governance, treasury operations, and market movements.

Current POL includes positions such as Ethereum OHM/sUSDS and OHM/wETH Uniswap V3 liquidity, Base OHM/USDC Uniswap V3 liquidity, Arbitrum OHM/wETH Camelot liquidity, and Berachain OHM/HONEY liquidity. Exact pool values, ownership percentages, and non-OHM reserve exposure are dynamic and should be read from current Olympus dashboards or indexers before being cited.

POL is separate from Cooler loans. Cooler loans provide USDS credit against gOHM collateral under governance-set parameters, while DEX POL provides executable market liquidity for OHM pairs. Both can affect holder liquidity, but they are different mechanisms and should not be treated as the same source of market depth.

:::info
For current POL composition and values, use the Olympus Treasury Dashboard or current protocol indexer data. Berachain and Arbitrum values may have chain-specific freshness or liquidity caveats.
:::
