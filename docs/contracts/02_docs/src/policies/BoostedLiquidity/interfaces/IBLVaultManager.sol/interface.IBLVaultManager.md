# IBLVaultManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/BoostedLiquidity/interfaces/IBLVaultManager.sol)

## Functions

<a id="minwithdrawaldelay"></a>

### minWithdrawalDelay

The minimum length of time between a deposit and a withdrawal

```solidity
function minWithdrawalDelay() external returns (uint48);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

<a id="deployvault"></a>

### deployVault

Deploys a personal single sided vault for the user

<i>

The vault is deployed with the user as the owner

</i>

```solidity
function deployVault() external returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | vault                   The address of the deployed vault |

<a id="mintohmtovault-uint256"></a>

### mintOhmToVault

Mints OHM to the caller

<i>

Can only be called by an approved vault

</i>

```solidity
function mintOhmToVault(uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of OHM to mint |

<a id="burnohmfromvault-uint256"></a>

### burnOhmFromVault

Burns OHM from the caller

<i>

Can only be called by an approved vault. The caller must have an OHM approval for the MINTR.

</i>

```solidity
function burnOhmFromVault(uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of OHM to burn |

<a id="increasetotallp-uint256"></a>

### increaseTotalLp

Increases the tracked value for totalLP

<i>

Can only be called by an approved vault

</i>

```solidity
function increaseTotalLp(uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of LP tokens to add to the total |

<a id="decreasetotallp-uint256"></a>

### decreaseTotalLp

Decreases the tracked value for totalLP

<i>

Can only be called by an approved vault

</i>

```solidity
function decreaseTotalLp(uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of LP tokens to remove from the total |

<a id="canwithdraw-address"></a>

### canWithdraw

Returns whether enough time has passed since the last deposit for the user to be ale to withdraw

```solidity
function canWithdraw(address user_) external view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The user to check the vault of |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool                    Whether enough time has passed since the last deposit for the user to be ale to withdraw |

<a id="getlpbalance-address"></a>

### getLpBalance

Returns the user's vault's LP balance

```solidity
function getLpBalance(address user_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The user to check the vault of |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 The user's vault's LP balance |

<a id="getuserpairshare-address"></a>

### getUserPairShare

Returns the user's vault's claim on the pair token

```solidity
function getUserPairShare(address user_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The user to check the vault of |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 The user's vault's claim on the pair token |

<a id="getoutstandingrewards-address"></a>

### getOutstandingRewards

Returns the user's vault's unclaimed rewards in Aura

```solidity
function getOutstandingRewards(address user_) external view returns (RewardsData[] memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The user to check the vault of |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `RewardsData[]` | RewardsData[]           The user's vault's unclaimed rewards in Aura |

<a id="getmaxdeposit"></a>

### getMaxDeposit

Calculates the max pair token deposit based on the limit and current amount of OHM minted

```solidity
function getMaxDeposit() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 The max pair token deposit |

<a id="getexpectedlpamount-uint256"></a>

### getExpectedLpAmount

Calculates the amount of LP tokens that will be generated for a given amount of pair tokens

```solidity
function getExpectedLpAmount(uint256 amount_) external returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of pair tokens to calculate the LP tokens for |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 The amount of LP tokens that will be generated |

<a id="getexpectedtokensoutprotocol-uint256"></a>

### getExpectedTokensOutProtocol

Calculates the amount of OHM and pair tokens that should be received by the vault for withdrawing a given amount of LP tokens

```solidity
function getExpectedTokensOutProtocol(
        uint256 lpAmount_
    ) external returns (uint256[] memory expectedTokenAmounts);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lpAmount_ | `uint256` | The amount of LP tokens to calculate the OHM and pair tokens for |

**Returns**

| Name                 | Type        | Description                                               |
| -------------------- | ----------- | --------------------------------------------------------- |
| expectedTokenAmounts | `uint256[]` | The amount of OHM and pair tokens that should be received |

<a id="getexpectedpairtokenoutuser-uint256"></a>

### getExpectedPairTokenOutUser

Calculates the amount of pair tokens that should be received by the user for withdrawing a given amount of LP tokens after the treasury takes any arbs

```solidity
function getExpectedPairTokenOutUser(
        uint256 lpAmount_
    ) external returns (uint256 expectedTknAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lpAmount_ | `uint256` | The amount of LP tokens to calculate the pair tokens for |

**Returns**

| Name              | Type      | Description                                       |
| ----------------- | --------- | ------------------------------------------------- |
| expectedTknAmount | `uint256` | The amount of pair tokens that should be received |

<a id="getrewardtokens"></a>

### getRewardTokens

Gets all the reward tokens from the Aura pool

```solidity
function getRewardTokens() external view returns (address[] memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address[]` | address[]               The addresses of the reward tokens |

<a id="getrewardrate-address"></a>

### getRewardRate

Gets the reward rate (tokens per second) of the passed reward token

```solidity
function getRewardRate(address rewardToken_) external view returns (uint256);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| rewardToken_ | `address` |             |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 The reward rate (tokens per second) |

<a id="getpoolohmshare"></a>

### getPoolOhmShare

Returns the amount of OHM in the pool that is owned by this vault system.

```solidity
function getPoolOhmShare() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 The amount of OHM in the pool that is owned by this vault system. |

<a id="getohmsupplychangedata"></a>

### getOhmSupplyChangeData

Gets the net OHM emitted or removed by the system since inception

```solidity
function getOhmSupplyChangeData() external view returns (uint256, uint256, uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 Vault system's current claim on OHM from the Balancer pool |
| &lt;none&gt; | `uint256` | uint256                 Current amount of OHM minted by the system into the Balancer pool |
| &lt;none&gt; | `uint256` | uint256                 OHM that wasn't minted, but was previously circulating that has been burned by the system |

<a id="getohmtknprice"></a>

### getOhmTknPrice

Gets the number of OHM per 1 pair token using oracle prices

```solidity
function getOhmTknPrice() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 OHM per 1 pair token (9 decimals) |

<a id="gettknohmprice"></a>

### getTknOhmPrice

Gets the number of pair tokens per 1 OHM using oracle prices

```solidity
function getTknOhmPrice() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 Pair tokens per 1 OHM (18 decimals) |

<a id="getohmtknpoolprice"></a>

### getOhmTknPoolPrice

Gets the number of OHM per 1 pair token using pool prices

```solidity
function getOhmTknPoolPrice() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 OHM per 1 pair token (9 decimals) |

<a id="emergencyburnohm-uint256"></a>

### emergencyBurnOhm

Emergency burns OHM that has been sent to the manager in the event a user had to emergency withdraw

<i>

Can only be called by the admin

</i>

```solidity
function emergencyBurnOhm(uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of OHM to burn |

<a id="setlimit-uint256"></a>

### setLimit

Updates the limit on minting OHM

<i>

Can only be called by the admin. Cannot be set lower than the current outstanding minted OHM.

</i>

```solidity
function setLimit(uint256 newLimit_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newLimit_ | `uint256` | The new OHM limit (9 decimals) |

<a id="setfee-uint64"></a>

### setFee

Updates the fee on reward tokens

<i>

Can only be called by the admin. Cannot be set beyond 10_000 (100%). Only is used by vaults deployed after the update.

</i>

```solidity
function setFee(uint64 newFee_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newFee_ | `uint64` | The new fee (in basis points) |

<a id="setwithdrawaldelay-uint48"></a>

### setWithdrawalDelay

Updates the minimum holding period before a user can withdraw

<i>

Can only be called by the admin

</i>

```solidity
function setWithdrawalDelay(uint48 newDelay_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newDelay_ | `uint48` | The new minimum holding period (in seconds) |

<a id="activate"></a>

### activate

Activates the vault manager and all approved vaults

<i>

Can only be called by the admin

</i>

```solidity
function activate() external;
```

<a id="deactivate"></a>

### deactivate

Deactivates the vault manager and all approved vaults

<i>

Can only be called by the admin

</i>

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

**Properties**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| ohm       | `address` |             |
| pairToken | `address` |             |
| aura      | `address` |             |
| bal       | `address` |             |

### BalancerData

```solidity
struct BalancerData {
        address vault;
        address liquidityPool;
        address balancerHelper;
    }
```

**Properties**

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| vault          | `address` |             |
| liquidityPool  | `address` |             |
| balancerHelper | `address` |             |

### AuraData

```solidity
struct AuraData {
        uint256 pid;
        address auraBooster;
        address auraRewardPool;
    }
```

**Properties**

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| pid            | `uint256` |             |
| auraBooster    | `address` |             |
| auraRewardPool | `address` |             |

### OracleFeed

```solidity
struct OracleFeed {
        AggregatorV3Interface feed;
        uint48 updateThreshold;
    }
```

**Properties**

| Name            | Type                    | Description |
| --------------- | ----------------------- | ----------- |
| feed            | `AggregatorV3Interface` |             |
| updateThreshold | `uint48`                |             |
