# Boosted Liquidity Vaults

:::warning Warning
[BLVaultManagerLido](https://etherscan.io/address/0xafe729d57d2cc58978c2e01b4ec39c47fb7c4b23) has been turned off. Using
Olympus frontend will revert. To withdraw, use `emergencyWithdraw()`, accessible from Write As Proxy within Etherscan.
:::

The Boosted Liquidity Vault is a new Olympus utility designed to improve the stability of OHM pairs and establish OHM as a liquidity router for the main pillars of DeFi. By incentivizing third-party liquidity provision using high-quality counter assets, the protocol aims to boost liquidity and minimize volatility.

The mechanism provides a framework for the Olympus Treasury to mint OHM directly into liquidity pair vaults against allowlisted assets. The counter-asset will be provided by individual holders and the vault will be incentivized by partner incentives.

## Economic Mechanisms

The Boosted Liquidity Vaults are designed to boost liquidity for OHM pairs and stabilize their exchange rate relative to high-quality counter assets through a self-regulating system. The circulating supply of OHM is dynamically adjusted based on its own price fluctuations, but also with the ones of the counter-asset. This property helps stabilize their exchange rate with a self-regulating system.

When the price of OHM increases relative to the counter-asset (either by OHM appreciation or depreciation of the partner token), some of the OHM that was previously minted into the liquidity pool is released back into circulation. This increase in the circulating supply of OHM should, all else being equal, push the price of OHM back down.

Conversely, if the price of OHM decreases relative to the counter-asset (either by OHM depreciation or appreciation of the partner token), previously circulating OHM will now enter the liquidity pool and the protocol will have a claim on it. This decrease in the circulating supply of OHM should, all else being equal, push the price of OHM back up.

_It is important to note that the effectiveness of the vaults in dampening volatility is directly tied to the amount of liquidity that is provided. The more liquidity that is provided, the more effective the volatility-dampening effect will be._

## Operational Mechanisms

### Deposit

The deposit process is simple and straightforward. Anyone (both, users and DAOs) can deposit their assets into the vault to provide single-sided liquidity and receive farming rewards in exchange. The steps are as follows:

1. The counter-asset is deposited by the user.
2. The counter-asset is valued using oracles and OHM is minted 1:1 against the dollar value of the deposited counter-asset.
3. The newly minted OHM and deposited counter-asset are deployed into a liquidity pool.
4. LP receipt tokens are custodied by the vault.
5. User’s claim on the LP receipt tokens is tracked.

\*Note this vault is custom implementation which doesn't rely on the ERC20 nor the ERC1155 standards. Therefore, despite the claim on the LP being tracked in the contracts, users won't receive a standard receipt of the LP tokens in exchange.

### Withdraw

Users can also withdraw their assets from the vault whenever they want. The steps are as follows:

1.  The user specifies how many LP receipt tokens they would like to withdraw.
2.  OHM and counter-asset are withdrawn from the liquidity pool in exchange for the LP receipt tokens.
3.  All the OHM received by the vault is burned.
4.  All the received counter-asset and reward tokens are sent back to the user.

## Benefits by Stakeholder

### For the Protocol:

- Facilitating the provision of liquidity for OHM pairs through a more streamlined process.
- Increasing the liquidity of OHM pairs by incentivizing users to provide liquidity using high-quality counter assets.
- Dampening OHM volatility against these high-quality counter-pair assets, helping position OHM as a base asset with great liquidity routing.

### For Partners:

- A more efficient liquidity mining vehicle.
- Olympus does not take a portion of the rewards provided by the partner protocol, meaning partners get 2x TVL for their rewards compared to traditional liquidity mining systems.
- Since OHM is a volatile asset with decent price stability, using it as a pair provides the following benefits for partners:
  - Reduce the Impermanent Loss (IL) that Liquidity Providers (LPs) would accure when providing liquidity against stables.
  - Minimize the price supression that arbitrageurs can produce when their pools are paired with ETH.

### For Users:

- Ability to provide single sided liquidity.
- Reduced fees / slippage when entering an LP position.
- Double the rewards (compared to traditional pools) because Olympus is forfeiting all of its rewards and allocating them to users instead.

## Risks by Stakeholder

### For the Protocol:

- The OHM is exposed to the counter asset's volatility.
- Newly minted supply could lead to OHM depreciation if the market is inefficient .

### For Partners:

- The asset is exposed to OHM's volatility.
- If OHM depreciates excessively in price, their asset could be impacted due to arbitrageurs. In such scenario, arbitrageurs would buy "cheap" OHM from the main Olympus' pools, arb the BLV pool, and realize the profits by selling the acquired partner token to their main pool. However, this risk is minimized by the fact that RBS (Range Bound Stability) is actively dampening OHM volatility versus DAI, and the fact that the Treasury provides an infinite bid at liquid backing.

### For Users:

- The typical liquidity provider risks apply (smart contract risk, impermanent loss, etc).
- If the ratio of assets in the liquidity pool changes significantly over time, users may experience impermanent losses (IL), which occur when the value of the assets they receive upon withdrawal is lower than the originally deposited assets would have if held without providing liquidity.
- To encourage users to provide liquidity and reduce the risks associated with liquidity provision, Olympus is giving up all of its rewards and allocating them to users instead.
- To mitigate oracle attacks, there is a 24-hour withdraw period from time of last deposit.

By participating in the Boosted Liquidity Vaults, users and partners can take advantage of the benefits offered by Olympus DAO while managing their risks. We believe this mechanism will play an important role in the growth and stability of the Olympus ecosystem.

## Security Considerations

Security is of utmost importance to Olympus. The DAO is committed to ensuring that the participants of the econohmy are always safe and secure. With this commitment, the Boosted Liquidity Vaults implement several measures to mitigate security risks.

Firstly, the smart contracts have been designed with security in mind. The contracts do not have upgradable proxies, meaning that once a contract has been deployed, its code cannot be changed. This ensures that there are no unforeseen changes that can compromise the integrity of the contract.

Secondly, the vault contracts are designed in a manner where user deposits are recorded as liabilities, thus preventing any commingling of funds. This procedure guarantees that the underlying funds can solely be accessed by the depositor and not by external entities, including Olympus.

Thirdly, an emergency shutoff mechanism has been implemented, which is controlled by the DAO multisig. This function allows for a quick and efficient way to shut down the platform in the event of an emergency, such as an exploit.

Fourthly, the vault uses price oracles to determine the USD value of OHM and the pair asset. While this approach is necessary to facilitate the Boosted Liquidity Vaults, it also exposes the vault to potential attacks (either from well capitalized individuals, or flashlaon users). To mitigate this risk, the vault implements a strategy where it executes an arbitrage between the pool where the assets are deposited and the oracle price feeds. By taking the arbitrage opportunity, the vault ensures that any attempt to manipulate the price oracle or the pool composition will translate the price imbalance to the attacker (generating a profit for the vault and a loss for the attacker).

Furthermore, all smart contracts have been [audited](../../security/05_audits.md#boosted-liquidity-vaults) by reputable third-party auditors such as [Sherlock](/gitbook/assets/Olympus_Liquidity_Vaults_Audit_Report_1.pdf) and [Kebabsec](https://hackmd.io/@12og4u7y8i/HJVAPMlno). Any issues identified during the audit have been addressed and re-audited to ensure that the necessary corrections were made. In addition, an [ImmuneFi bug bounty program](https://immunefi.com/bounty/olympus/) of $3.33M which aims to incentivize white-hat hackers to find and report any vulnerabilities they may discover in the Boosted Liquidity Vaults, is in place. This practice helps proactively identify and address any potential security issues before they can be exploited.

Olympus takes the security of its ecosystem very seriously and is committed to ensuring that its users' assets are always protected. With these measures in place, participants can have confidence in the security of the Boosted Liquidity Vaults.





# Integrating with BLV
For understanding the mechanics and the advantatges of the Boosted Liquidity Vaults, please refer to the [standard documentation](../../../overview/07_boosted-liq-vaults.md).
You can also check the [source code](github-link), the [contract interface](github-link), and the [stETH implementation](github-link) on Github. 

Before implementing an instance of the `SingleSidedLiquidityVault` contract, it is key to understand its relevant functions.

## Useful Variables and Getters

Public variable getters are autogenerated by the solidity compiler. Some of the useful getters when implementing or interacting with a contract than inherits `SingleSidedLiquidityVault` are the ones which refer to reward tokens and user state:

### Reward Token State

```
InternalRewardToken[] public internalRewardTokens;
ExternalRewardToken[] public externalRewardTokens;
```
Both arrays store information related to the different reward tokens. To better understand such information, let's check their underlying data structures:
```
struct InternalRewardToken {
    address token;
    uint256 rewardsPerSecond;
    uint256 lastRewardTime;
    uint256 accumulatedRewardsPerShare;
}

struct ExternalRewardToken {
    address token;
    uint256 accumulatedRewardsPerShare;
}
```

As it can be deducted by looking at the `InternalRewardToken` struct, an internal reward token is a token where the vault distributes and handles the accounting of rewards over time. 

Instead, for external reward tokens the primary accrual of rewards occurs outside the scope of this contract (it happens in other systems such as Convex or Aura). In this case, the vault is responsible for harvesting the rewards and distributing them proportionally to users.

### Reward Token State
```
mapping(address user => uint256 pairTokens) public pairTokenDeposits;
mapping(address user => uint256 lpTokens) public lpPositions;
mapping(address user => mapping(address rewardToken => int256 rewards)) public userRewardDebts;
```
- `pairTokenDeposits` tracks the deposited pair tokens by each user.
- `lpPositions` tracks the LP tokens received when creating the liquidity positions with the provided pair tokens by each user.
- `userRewardDebts` is a nested mapping that tracks the amount of each reward token owed to each user.
``

## View Functions

View functions are already implemented by the `SingleSidedLiquidityVault` contract. Therefore, these functions will be inherited by the implementation contracts.
View functions are those public functions which end-users and the implementation contract can use to check the status of the accured rewards:

```
/// @param  id_        The position ID of the reward token in the `internalRewardTokens` array
/// @param  user_      The user's address to check rewards for
/// @return rewards    The amount of internal rewards that the user has earned
function internalRewardsForToken(uint256 id_, address user_) public view returns (uint256 rewards);

/// @param  id_        The position ID of the reward token in the `externalRewardTokens` array
/// @param  user_      The user's address to check rewards for
/// @return rewards    The amount of internal rewards that the user has earned
function internalRewardsForToken(uint256 id_, address user_) public view returns (uint256 rewards);
```

## Core Functions

Core functions are also implemented by the `SingleSidedLiquidityVault` contract. Therefore, these functions will be inherited by the implementation contracts too.
Core functions are those external functions which end-users will use to interact with the vault:

### deposit
Allows users to deposit a certain amount of the pair tokens. Mints the equivalent OHM amount in USD, and creates a liquidity position with both tokens. The vault keeps ownership of the LP tokens and tracks the relative ownership of the depositor.
```
/// @param    amount_        The amount of desposited pair tokens
/// @param    minLpAmount_   The minimum amount of LP tokens to receive
/// @return   lpAmountOut    The actual amount of received LP tokens
function deposit(
    uint256 amount_,
    uint256 minLpAmount_
) external returns (uint256 lpAmountOut);
```    

If the contract call is successful, the Vault will emit the following event:
```
Deposit(msg.sender, pairTokenUsed, ohmUsed);
```

### withdraw
Allows users to receive back the corresponding amount pair tokens based on the current composition of the liquidity pool. The vault removes the given amount of LP tokens, returns any received pair tokens to the user, and burns the received OHM.
Users also have the ability to claim the earned rewards by using the boolean `claim_`.
```
/// @param  lpAmount_           The amount of LP tokens to withdraw
/// @param  minTokenAmounts_    The minimum amounts of pair tokens and OHM to receive
/// @param  claim_              Whether rewards should be claimed or not
function withdraw(
    uint256 lpAmount_,
    uint256[] calldata minTokenAmounts_,
    bool claim_
) external returns (uint256 pairTokenReceived);
```

If the contract call is successful, the Vault will emit the following event:
```
Withdraw(msg.sender, pairTokenReceived, ohmReceived);
```

### claimRewards
At any given time, users have the ability to claim the rewards they have earned. Both external reward tokens (incentives provided by the partner) and internal rewards tokens (any incentives that Olympus may provide) are claimed when calling this function.
```
function claimRewards() external;
```
If the contract call is successful, the Vault will emit the following event twice (one for the internal rewards and one for the external ones):
```
RewardsClaimed(msg.sender, rewardToken, reward - fee);
```

## Virtual Functions

Virtual functions are not implemented by the `SingleSidedLiquidityVault` contract. Instead, those functions must be implemented by the developers which aim to integrate a new SSLV on top of Olympus.
These are the virtual functions which must be overrriden by the implementation contract:

- `_valueCollateral:` Internal function which calculates the equivalent OHM amount for a given amount of partner tokens. This function will usually use several price feeds to calculate the conversion rate.
```            
/// @param amount_      The amount of partner tokens to calculate the OHM value of
/// @return ohmAmount   The amount of OHM for the given amount of partner tokens
function _valueCollateral(uint256 amount_) internal view virtual returns (uint256 ohmAmount);
```

- `_getPoolPrice:` Internal function which calculates the current price of the liquidity pool and expresses it in OHM/TKN ratio.
```
/// @return ohmTknRatio  The current price of the liquidity pool in OHM/TKN
function _getPoolPrice() internal view virtual returns (uint256 ohmTknRatio);
```

- `_getPoolOhmShare:` Internal function which calculates the vaults' current share of OHM in the liquidity pool.
```
/// @return ohmShare   The contract's current share of OHM in the liquidity pool
function _getPoolOhmShare() internal view virtual returns (uint256 ohmShare);
```

- `_deposit:` Internal function which deposits OHM and partner tokens into the liquidity pool. This functions is called by the core function `deposit` which users use to interact with the vault. This function should also handle deposits into any external staking pools like Aura or Convex.
```
/// @param ohmAmount_    The amount of OHM to deposit
/// @param pairAmount_   The amount of partner tokens to deposit
/// @param minLpAmount_  The minimum amount of liquidity pool tokens to receive
/// @return lpAmountOut  The amount of liquidity pool tokens received
function _deposit(
    uint256 ohmAmount_,
    uint256 pairAmount_,
    uint256 minLpAmount_
) internal virtual returns (uint256 lpAmountOut);
```

- `_withdraw:` Internal function which withdraws OHM and partner tokens from the liquidity pool. This functions is called by the core function `withdraw` which users use to interact with the vault. This function should also handle withdrawals from any external staking pools like Aura or Convex.
```
/// @param lpAmount_         The amount of liquidity pool tokens to withdraw
/// @param minTokenAmounts_  The minimum amounts of OHM and partner tokens to receive
/// @return ohmOut           The amount of OHM received
/// @return tknOut           The amount of partner tokens received
function _withdraw(
    uint256 lpAmount_,
    uint256[] calldata minTokenAmounts_
) internal virtual returns (uint256 ohmOut, uint256 tknOut);
```

- `_accumulateExternalRewards:`Internal function which harvests any external rewards from sources like Aura or Convex.
```
/// @return rewardsOut  The amounts of each external reward token harvested
function _accumulateExternalRewards() internal virtual returns (uint256[] memory rewardsOut);
```



# Example Contract Implementation
Once the key functions are understood, the implementation of a contract that inherits `SingleSidedLiquidityVault` will be easier and safer.

For instance, let's take the `StethLiquidityVault` implementation as an example ([check the source code here](gitbuh-link)). In this case, the vault will be harvesting rewards from Aura. Therefore, it will first deposit its liquidity on Balancer and, afterwards, deposit the received BPT on Aura.

## Custom Variables and Getters

The `SingleSidedLiquidityVault` defines custom variables that help handle the interactions with Balancer and Aura Finance.

### Integration State

```
IVault public vault;
```
`vault` holds the interface to interact with the [Balancer Vault](https://docs.balancer.fi/concepts/vault/) (on Balancer all the liquidity is managed in a single core vault).

```
struct AuraPool {
    uint256 pid;
    IAuraBooster booster;
    IAuraRewardPool rewardsPool;
}

AuraPool public auraPool;
```
`auraPool` stores the necessary information to deposit (BPTs managed by `auraPool.booster` and deposited on `auraPool.pid`) and harvest (rewards are claimed from `auraPool.rewardsPool`) on [Aura](https://docs.aura.finance/developers/building-on-aura).

```
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





