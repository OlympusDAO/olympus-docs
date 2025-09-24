# IBLVaultManagerLido

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/BoostedLiquidity/interfaces/IBLVaultManagerLido.sol)

## Functions

### minWithdrawalDelay

The minimum length of time between a deposit and a withdrawal

```solidity
function minWithdrawalDelay() external returns (uint48);
```

### deployVault

Deploys a personal single sided vault for the user

*The vault is deployed with the user as the owner*

```solidity
function deployVault() external returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|vault                   The address of the deployed vault|

### mintOhmToVault

Mints OHM to the caller

*Can only be called by an approved vault*

```solidity
function mintOhmToVault(uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of OHM to mint|

### burnOhmFromVault

Burns OHM from the caller

*Can only be called by an approved vault. The caller must have an OHM approval for the MINTR.*

```solidity
function burnOhmFromVault(uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of OHM to burn|

### increaseTotalLp

Increases the tracked value for totalLP

*Can only be called by an approved vault*

```solidity
function increaseTotalLp(uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of LP tokens to add to the total|

### decreaseTotalLp

Decreases the tracked value for totalLP

*Can only be called by an approved vault*

```solidity
function decreaseTotalLp(uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of LP tokens to remove from the total|

### canWithdraw

Returns whether enough time has passed since the last deposit for the user to be ale to withdraw

```solidity
function canWithdraw(address user_) external view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|                   The user to check the vault of|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool                    Whether enough time has passed since the last deposit for the user to be ale to withdraw|

### getLpBalance

Returns the user's vault's LP balance

```solidity
function getLpBalance(address user_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|                   The user to check the vault of|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The user's vault's LP balance|

### getUserPairShare

Returns the user's vault's claim on wstETH

```solidity
function getUserPairShare(address user_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|                   The user to check the vault of|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The user's vault's claim on wstETH|

### getOutstandingRewards

Returns the user's vault's unclaimed rewards in Aura

```solidity
function getOutstandingRewards(address user_) external view returns (RewardsData[] memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|                   The user to check the vault of|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`RewardsData[]`|RewardsData[]           The user's vault's unclaimed rewards in Aura|

### getMaxDeposit

Calculates the max wstETH deposit based on the limit and current amount of OHM minted

```solidity
function getMaxDeposit() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The max wstETH deposit|

### getExpectedLpAmount

Calculates the amount of LP tokens that will be generated for a given amount of wstETH

```solidity
function getExpectedLpAmount(uint256 amount_) external returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of wstETH to calculate the LP tokens for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The amount of LP tokens that will be generated|

### getExpectedTokensOutProtocol

Calculates the amount of OHM and pair tokens that should be received by the vault for withdrawing a given amount of LP tokens

```solidity
function getExpectedTokensOutProtocol(uint256 lpAmount_) external returns (uint256[] memory expectedTokenAmounts);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`lpAmount_`|`uint256`|               The amount of LP tokens to calculate the OHM and pair tokens for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`expectedTokenAmounts`|`uint256[]`|   The amount of OHM and pair tokens that should be received|

### getExpectedPairTokenOutUser

Calculates the amount of pair tokens that should be received by the user for withdrawing a given amount of LP tokens after the treasury takes any arbs

```solidity
function getExpectedPairTokenOutUser(uint256 lpAmount_) external returns (uint256 expectedTknAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`lpAmount_`|`uint256`|               The amount of LP tokens to calculate the pair tokens for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`expectedTknAmount`|`uint256`|      The amount of pair tokens that should be received|

### getRewardTokens

Gets all the reward tokens from the Aura pool

```solidity
function getRewardTokens() external view returns (address[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|address[]               The addresses of the reward tokens|

### getRewardRate

Gets the reward rate (tokens per second) of the passed reward token

```solidity
function getRewardRate(address rewardToken_) external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The reward rate (tokens per second)|

### getPoolOhmShare

Returns the amount of OHM in the pool that is owned by this vault system.

```solidity
function getPoolOhmShare() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The amount of OHM in the pool that is owned by this vault system.|

### getOhmSupplyChangeData

Gets the net OHM emitted or removed by the system since inception

```solidity
function getOhmSupplyChangeData() external view returns (uint256, uint256, uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 Vault system's current claim on OHM from the Balancer pool|
|`<none>`|`uint256`|uint256                 Current amount of OHM minted by the system into the Balancer pool|
|`<none>`|`uint256`|uint256                 OHM that wasn't minted, but was previously circulating that has been burned by the system|

### getOhmTknPrice

Gets the number of OHM per 1 wstETH using oracle prices

```solidity
function getOhmTknPrice() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 OHM per 1 wstETH (9 decimals)|

### getTknOhmPrice

Gets the number of wstETH per 1 OHM using oracle prices

```solidity
function getTknOhmPrice() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 wstETH per 1 OHM (18 decimals)|

### getOhmTknPoolPrice

Gets the number of OHM per 1 wstETH using pool prices

```solidity
function getOhmTknPoolPrice() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 OHM per 1 wstETH (9 decimals)|

### emergencyBurnOhm

Emergency burns OHM that has been sent to the manager in the event a user had to emergency withdraw

*Can only be called by the admin*

```solidity
function emergencyBurnOhm(uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of OHM to burn|

### setLimit

Updates the limit on minting OHM

*Can only be called by the admin. Cannot be set lower than the current outstanding minted OHM.*

```solidity
function setLimit(uint256 newLimit_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newLimit_`|`uint256`|               The new OHM limit (9 decimals)|

### setFee

Updates the fee on reward tokens

*Can only be called by the admin. Cannot be set beyond 10_000 (100%). Only is used by vaults deployed after the update.*

```solidity
function setFee(uint64 newFee_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newFee_`|`uint64`|                 The new fee (in basis points)|

### setWithdrawalDelay

Updates the minimum holding period before a user can withdraw

*Can only be called by the admin*

```solidity
function setWithdrawalDelay(uint48 newDelay_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newDelay_`|`uint48`|               The new minimum holding period (in seconds)|

### changeUpdateThresholds

Updates the time threshold for oracle staleness checks

*Can only be called by the admin*

```solidity
function changeUpdateThresholds(
    uint48 ohmEthUpdateThreshold_,
    uint48 ethUsdUpdateThreshold_,
    uint48 stethUsdUpdateThreshold_
) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`ohmEthUpdateThreshold_`|`uint48`|  The new time threshold for the OHM-ETH oracle|
|`ethUsdUpdateThreshold_`|`uint48`|  The new time threshold for the ETH-USD oracle|
|`stethUsdUpdateThreshold_`|`uint48`|The new time threshold for the stETH-USD oracle|

### activate

Activates the vault manager and all approved vaults

*Can only be called by the admin*

```solidity
function activate() external;
```

### deactivate

Deactivates the vault manager and all approved vaults

*Can only be called by the admin*

```solidity
function deactivate() external;
```

## Structs

### TokenData

```solidity
struct TokenData {
    address ohm;
    address pairToken;
    address aura;
    address bal;
}
```

### BalancerData

```solidity
struct BalancerData {
    address vault;
    address liquidityPool;
    address balancerHelper;
}
```

### AuraData

```solidity
struct AuraData {
    uint256 pid;
    address auraBooster;
    address auraRewardPool;
}
```

### OracleFeed

```solidity
struct OracleFeed {
    AggregatorV3Interface feed;
    uint48 updateThreshold;
}
```
