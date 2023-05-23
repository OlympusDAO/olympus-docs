# Example Contract Implementation

Once the key functions are understood, the implementation of a contract that inherits `SingleSidedLiquidityVault` will be easier and safer.

For instance, let's take the `StethLiquidityVault` implementation as an example ([check the source code here](gitbuh-link)). In this case, the vault will be harvesting rewards from Aura. Therefore, it will first deposit its liquidity on Balancer and, afterwards, deposit the received BPT on Aura.

## Custom Variables and Getters

The `SingleSidedLiquidityVault` defines custom variables that help handle the interactions with Balancer and Aura Finance.

### Integration State

```solidity
IVault public vault;
```

`vault` holds the interface to interact with the [Balancer Vault](https://docs.balancer.fi/concepts/vault/) (on Balancer all the liquidity is managed in a single core vault).

```solidity
struct AuraPool {
    uint256 pid;
    IAuraBooster booster;
    IAuraRewardPool rewardsPool;
}

AuraPool public auraPool;
```

`auraPool` stores the necessary information to deposit (BPTs managed by `auraPool.booster` and deposited on `auraPool.pid`) and harvest (rewards are claimed from `auraPool.rewardsPool`) on [Aura](https://docs.aura.finance/developers/building-on-aura).

```solidity
struct OracleFeed {
    AggregatorV3Interface feed;
    uint48 updateThreshold;
}

OracleFeed public ohmEthPriceFeed;
OracleFeed public ethUsdPriceFeed;
OracleFeed public stethUsdPriceFeed;
```

Finally, to handle the price conversions, different Chainlink price oracles must be used.

## Overriding Virtual Functions

The easiest way to implement a these functions is by directly checking the `StethLiquidityVault` [code](gitbuh-link)). Nevertheless, this section will list some of the this that any developer should have in mind.

### deposit

When implementing the `_deposit` function:

1. Cast the liquidity pool address from abstract to Balancer Base pool.
2. Fetch the underlying liquidity before joinning the pool (it will be used later to know the resulting LP tokens).
3. Approve the core Balancer Vault as spender of both tokens (OHM and the pair token).
4. Make a request to the Balancer Vault to join the liquidity pool.
5. Calculate the amount of resulting LP tokens, approve the Aura Booster as a spender, and deposit them there.
6. Return the amount of resulting BPT tokens.

### withdraw

When implementing the `_withdraw` function:

1. Cast the liquidity pool address from abstract to Balancer Base pool.
2. Fetch the underlying naked assets (OHM and the pair token) held by the vault.
3. Unstake the BPT tokens from Aura.
4. Make a request to the Balancer Vault to leave the liquidity pool.
5. Return the amount of extra tokens (OHM and the pair token) held in the vault.

### accumulateExternalRewards

When implementing the `_accumulateExternalRewards` function:

1. Loop over the `externalRewardTokens` to cast the balances of the vault.
2. Harvest the rewards from Aura.
3. Loop over the `externalRewardTokens` again to cast the new balances of the vault.
4. Return a list with the harvested rewards for each token in the `externalRewardTokens` array.

### valueCollateral

When implementing the `_valueCollateral` function:

1. Fetch the necessary price feed oracles to get the ratio of `OHM / PairToken`. Make sure that the decimals are in place.
2. Return the conversion of the input `_amount` of pair token in OHM terms.

### getPoolPrice

When implementing the `_getPoolPrice` function:

1. Calculate the `OHM / pairToken` ratio of the Liquidity pool by fetching the amount of each token in the pool.

### getPoolOhmShare

When implementing the `_getPoolOhmShare` function:

1. Calculate the vault's share on the liquidity pool.
