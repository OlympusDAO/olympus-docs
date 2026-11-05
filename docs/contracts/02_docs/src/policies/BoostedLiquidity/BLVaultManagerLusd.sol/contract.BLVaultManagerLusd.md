# BLVaultManagerLusd

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/BoostedLiquidity/BLVaultManagerLusd.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [IBLVaultManager](/main/contracts/docs/src/policies/BoostedLiquidity/interfaces/IBLVaultManager.sol/interface.IBLVaultManager), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## Constants

### MAX_FEE

```solidity
uint32 public constant MAX_FEE = 10_000;
```

### _ohmIndex

```solidity
uint8 private constant _ohmIndex = 1;
```

### _lusdIndex

```solidity
uint8 private constant _lusdIndex = 0;
```

## State Variables

### MINTR

```solidity
MINTRv1 public MINTR;
```

### TRSRY

```solidity
TRSRYv1 public TRSRY;
```

### BLREG

```solidity
BLREGv1 public BLREG;
```

### ohm

```solidity
address public ohm;
```

### pairToken

```solidity
address public pairToken;
```

### aura

```solidity
address public aura;
```

### bal

```solidity
address public bal;
```

### exchangeName

```solidity
string public exchangeName;
```

### balancerData

```solidity
BalancerData public balancerData;
```

### auraData

```solidity
AuraData public auraData;
```

### auraMiningLib

```solidity
IAuraMiningLib public auraMiningLib;
```

### ohmEthPriceFeed

```solidity
OracleFeed public ohmEthPriceFeed;
```

### ethUsdPriceFeed

```solidity
OracleFeed public ethUsdPriceFeed;
```

### lusdUsdPriceFeed

```solidity
OracleFeed public lusdUsdPriceFeed;
```

### implementation

```solidity
BLVaultLusd public implementation;
```

### vaultOwners

```solidity
mapping(BLVaultLusd => address) public vaultOwners;
```

### userVaults

```solidity
mapping(address => BLVaultLusd) public userVaults;
```

### totalLp

```solidity
uint256 public totalLp;
```

### deployedOhm

```solidity
uint256 public deployedOhm;
```

### circulatingOhmBurned

```solidity
uint256 public circulatingOhmBurned;
```

### ohmLimit

```solidity
uint256 public ohmLimit;
```

### currentFee

```solidity
uint64 public currentFee;
```

### minWithdrawalDelay

The minimum length of time between a deposit and a withdrawal

```solidity
uint48 public minWithdrawalDelay;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

### isLusdBLVaultActive

```solidity
bool public isLusdBLVaultActive;
```

## Functions

<a id="constructor-kernel-tokendata-balancerdata-auradata-address-oraclefeed-oraclefeed-oraclefeed-address-uint256-uint64-uint48"></a>

### constructor

```solidity
constructor(
        Kernel kernel_,
        TokenData memory tokenData_,
        BalancerData memory balancerData_,
        AuraData memory auraData_,
        address auraMiningLib_,
        OracleFeed memory ohmEthPriceFeed_,
        OracleFeed memory ethUsdPriceFeed_,
        OracleFeed memory lusdUsdPriceFeed_,
        address implementation_,
        uint256 ohmLimit_,
        uint64 fee_,
        uint48 minWithdrawalDelay_
    ) Policy(kernel_);
```

**Parameters**

| Name                | Type           | Description |
| ------------------- | -------------- | ----------- |
| kernel_             | `Kernel`       |             |
| tokenData_          | `TokenData`    |             |
| balancerData_       | `BalancerData` |             |
| auraData_           | `AuraData`     |             |
| auraMiningLib_      | `address`      |             |
| ohmEthPriceFeed_    | `OracleFeed`   |             |
| ethUsdPriceFeed_    | `OracleFeed`   |             |
| lusdUsdPriceFeed_   | `OracleFeed`   |             |
| implementation_     | `address`      |             |
| ohmLimit_           | `uint256`      |             |
| fee_                | `uint64`       |             |
| minWithdrawalDelay_ | `uint48`       |             |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions()
        external
        view
        override
        returns (Permissions[] memory permissions);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| permissions | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="onlywhileactive"></a>

### onlyWhileActive

```solidity
modifier onlyWhileActive();
```

<a id="onlyvault"></a>

### onlyVault

```solidity
modifier onlyVault();
```

<a id="deployvault"></a>

### deployVault

Deploys a personal single sided vault for the user

<i>

The vault is deployed with the user as the owner

</i>

```solidity
function deployVault() external override onlyWhileActive returns (address vault);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | `address` | vault                   The address of the deployed vault |

<a id="mintohmtovault-uint256"></a>

### mintOhmToVault

Mints OHM to the caller

<i>

Can only be called by an approved vault

</i>

```solidity
function mintOhmToVault(uint256 amount_) external override onlyWhileActive onlyVault;
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
function burnOhmFromVault(uint256 amount_) external override onlyWhileActive onlyVault;
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
function increaseTotalLp(uint256 amount_) external override onlyWhileActive onlyVault;
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
function decreaseTotalLp(uint256 amount_) external override onlyWhileActive onlyVault;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of LP tokens to remove from the total |

<a id="canwithdraw-address"></a>

### canWithdraw

Returns whether enough time has passed since the last deposit for the user to be ale to withdraw

```solidity
function canWithdraw(address user_) external view override returns (bool);
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
function getLpBalance(address user_) external view override returns (uint256);
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
function getUserPairShare(address user_) external view override returns (uint256);
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
function getOutstandingRewards(
        address user_
    ) external view override returns (RewardsData[] memory);
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
function getMaxDeposit() external view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 The max pair token deposit |

<a id="getexpectedlpamount-uint256"></a>

### getExpectedLpAmount

Calculates the amount of LP tokens that will be generated for a given amount of pair tokens

<i>

This is an external function but should only be used in a callstatic from an external
source like the frontend.

</i>

```solidity
function getExpectedLpAmount(uint256 amount_) external override returns (uint256 bptAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of pair tokens to calculate the LP tokens for |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bptAmount | `uint256` | uint256                 The amount of LP tokens that will be generated |

<a id="getexpectedtokensoutprotocol-uint256"></a>

### getExpectedTokensOutProtocol

Calculates the amount of OHM and pair tokens that should be received by the vault for withdrawing a given amount of LP tokens

<i>

This is an external function but should only be used in a callstatic from an external
source like the frontend.

</i>

```solidity
function getExpectedTokensOutProtocol(
        uint256 lpAmount_
    ) external override returns (uint256[] memory expectedTokenAmounts);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lpAmount_ | `uint256` | The amount of LP tokens to calculate the OHM and pair tokens for |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| expectedTokenAmounts | `uint256[]` | The amount of OHM and pair tokens that should be received |

<a id="getexpectedpairtokenoutuser-uint256"></a>

### getExpectedPairTokenOutUser

Calculates the amount of pair tokens that should be received by the user for withdrawing a given amount of LP tokens after the treasury takes any arbs

<i>

This is an external function but should only be used in a callstatic from an external
source like the frontend.

</i>

```solidity
function getExpectedPairTokenOutUser(
        uint256 lpAmount_
    ) external override returns (uint256 expectedTknAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lpAmount_ | `uint256` | The amount of LP tokens to calculate the pair tokens for |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| expectedTknAmount | `uint256` | The amount of pair tokens that should be received |

<a id="getrewardtokens"></a>

### getRewardTokens

Gets all the reward tokens from the Aura pool

```solidity
function getRewardTokens() external view override returns (address[] memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address[]` | address[]               The addresses of the reward tokens |

<a id="getrewardrate-address"></a>

### getRewardRate

Gets the reward rate (tokens per second) of the passed reward token

```solidity
function getRewardRate(
        address rewardToken_
    ) external view override returns (uint256 rewardRate);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| rewardToken_ | `address` |             |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rewardRate | `uint256` | uint256                 The reward rate (tokens per second) |

<a id="getpoolohmshare"></a>

### getPoolOhmShare

Returns the amount of OHM in the pool that is owned by this vault system.

```solidity
function getPoolOhmShare() public view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 The amount of OHM in the pool that is owned by this vault system. |

<a id="getohmsupplychangedata"></a>

### getOhmSupplyChangeData

Gets the net OHM emitted or removed by the system since inception

```solidity
function getOhmSupplyChangeData()
        external
        view
        override
        returns (uint256 poolOhmShare, uint256 mintedOhm, uint256 netBurnedOhm);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolOhmShare | `uint256` | uint256                 Vault system's current claim on OHM from the Balancer pool |
| mintedOhm | `uint256` | uint256                 Current amount of OHM minted by the system into the Balancer pool |
| netBurnedOhm | `uint256` | uint256                 OHM that wasn't minted, but was previously circulating that has been burned by the system |

<a id="getohmtknprice"></a>

### getOhmTknPrice

Gets the number of OHM per 1 pair token using oracle prices

```solidity
function getOhmTknPrice() public view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 OHM per 1 pair token (9 decimals) |

<a id="gettknohmprice"></a>

### getTknOhmPrice

Gets the number of pair tokens per 1 OHM using oracle prices

```solidity
function getTknOhmPrice() public view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 Pair tokens per 1 OHM (18 decimals) |

<a id="getohmtknpoolprice"></a>

### getOhmTknPoolPrice

Gets the number of OHM per 1 pair token using pool prices

```solidity
function getOhmTknPoolPrice() public view override returns (uint256);
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
function emergencyBurnOhm(uint256 amount_) external override onlyRole("liquidityvault_admin");
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
function setLimit(uint256 newLimit_) external override onlyRole("liquidityvault_admin");
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
function setFee(uint64 newFee_) external override onlyRole("liquidityvault_admin");
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
function setWithdrawalDelay(
        uint48 newDelay_
    ) external override onlyRole("liquidityvault_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newDelay_ | `uint48` | The new minimum holding period (in seconds) |

<a id="changeupdatethresholds-uint48-uint48-uint48"></a>

### changeUpdateThresholds

```solidity
function changeUpdateThresholds(
        uint48 ohmEthUpdateThreshold_,
        uint48 ethUsdUpdateThreshold_,
        uint48 lusdUsdUpdateThreshold_
    ) external onlyRole("liquidityvault_admin");
```

**Parameters**

| Name                    | Type     | Description |
| ----------------------- | -------- | ----------- |
| ohmEthUpdateThreshold_  | `uint48` |             |
| ethUsdUpdateThreshold_  | `uint48` |             |
| lusdUsdUpdateThreshold_ | `uint48` |             |

<a id="activate"></a>

### activate

Activates the vault manager and all approved vaults

<i>

Can only be called by the admin

</i>

```solidity
function activate() external override onlyRole("liquidityvault_admin");
```

<a id="deactivate"></a>

### deactivate

Deactivates the vault manager and all approved vaults

<i>

Can only be called by the admin

</i>

```solidity
function deactivate() external override onlyRole("emergency_admin");
```

<a id="_validateprice-aggregatorv3interface-uint48"></a>

### _validatePrice

```solidity
function _validatePrice(
        AggregatorV3Interface priceFeed_,
        uint48 updateThreshold_
    ) internal view returns (uint256);
```

**Parameters**

| Name             | Type                    | Description |
| ---------------- | ----------------------- | ----------- |
| priceFeed_       | `AggregatorV3Interface` |             |
| updateThreshold_ | `uint48`                |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

## Events

### VaultDeployed

```solidity
event VaultDeployed(address vault, address owner, uint64 fee);
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| vault | `address` |             |
| owner | `address` |             |
| fee   | `uint64`  |             |

## Errors

### BLManagerLusd_AlreadyActive

```solidity
error BLManagerLusd_AlreadyActive();
```

### BLManagerLusd_AlreadyInactive

```solidity
error BLManagerLusd_AlreadyInactive();
```

### BLManagerLusd_Inactive

```solidity
error BLManagerLusd_Inactive();
```

### BLManagerLusd_InvalidVault

```solidity
error BLManagerLusd_InvalidVault();
```

### BLManagerLusd_LimitViolation

```solidity
error BLManagerLusd_LimitViolation();
```

### BLManagerLusd_InvalidLpAmount

```solidity
error BLManagerLusd_InvalidLpAmount();
```

### BLManagerLusd_InvalidLimit

```solidity
error BLManagerLusd_InvalidLimit();
```

### BLManagerLusd_InvalidFee

```solidity
error BLManagerLusd_InvalidFee();
```

### BLManagerLusd_BadPriceFeed

```solidity
error BLManagerLusd_BadPriceFeed();
```

### BLManagerLusd_VaultAlreadyExists

```solidity
error BLManagerLusd_VaultAlreadyExists();
```

### BLManagerLusd_NoUserVault

```solidity
error BLManagerLusd_NoUserVault();
```
