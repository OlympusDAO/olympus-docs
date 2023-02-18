# SingleSidedLiquidityVault

## Overview
For understanding the mechanics and the advantatges of the Single Sided Liquidity Vaults, please refer to the [standard documentation](../../overview/07_liquidity-amo.md).
You can also check the [source code](github-link), the [contract interface](github-link), and the [stETH implementation](github-link) on Github. 

## Contract Implementation
Before implementing an instance of the SingleSidedLiquidityVault contract, it is key to understand its relevant functions.

### Core Functions

    Core functions already implemented by the `SingleSidedLiquidityVaul` contract. Therefore, these functions will be inherited by the implementation contracts.
    The core functions are those external functions which users will use to interact with the vault:

    #### deposit
    Allows users to deposit a certain amount of the pair tokens. Mints the equivalent OHM amount in USD, and creates a liquidity position with both tokens. The vault keeps ownership of the LP tokens and tracks the relative ownership of the depositor.
    ```
    function deposit(
        uint256 amount_,
        uint256 minLpAmount_
    ) external returns (uint256 lpAmountOut);
    ```    
    /// @param  amount_         The amount of pair tokens to deposit
    /// @param  minLpAmount_    The minimum amount of LP tokens to receive

    If the contract call is successful, the Vault will emit the following event:
    ```
    Deposit(msg.sender, pairTokenUsed, ohmUsed);
    ```

    #### withdraw
    Allows users to receive back the corresponding amount pair tokens based on the current composition of the liquidity pool. The vault removes the given amount of LP tokens, returns any received pair tokens to the user, and burns the received OHM.
    Users also have the ability to claim the earned rewards by using the boolean `claim_`.
    ```
    function withdraw(
        uint256 lpAmount_,
        uint256[] calldata minTokenAmounts_,
        bool claim_
    ) external returns (uint256 pairTokenReceived);
    ```
    /// @param  lpAmount_           The amount of LP tokens to withdraw
    /// @param  minTokenAmounts_    The minimum amounts of pair tokens and OHM to receive
    /// @param  claim_              Whether rewards should be claimed or not

    If the contract call is successful, the Vault will emit the following event:
    ```
    Withdraw(msg.sender, pairTokenReceived, ohmReceived);
    ```

    #### claimRewards
    At any given time, users have the ability to claim the rewards they have earned. Both external reward tokens (incentives provided by the partner) and internal rewards tokens (any incentives that Olympus may provide) are claimed when calling this function.
    ```
    function claimRewards() external;
    ```
    If the contract call is successful, the Vault will emit the following event twice (one for the internal rewards and one for the external ones):
    ```
    RewardsClaimed(msg.sender, rewardToken, reward - fee);
    ```