# BLVaultManagerLusd

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/policies/BoostedLiquidity/BLVaultManagerLusd.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [IBLVaultManager](/main/contracts/docs/src/policies/BoostedLiquidity/interfaces/IBLVaultManager.sol/interface.IBLVaultManager), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## State Variables

### MINTR

```solidity
MINTRv1 public MINTR
```

### TRSRY

```solidity
TRSRYv1 public TRSRY
```

### BLREG

```solidity
BLREGv1 public BLREG
```

### ohm

```solidity
address public ohm
```

### pairToken

```solidity
address public pairToken
```

### aura

```solidity
address public aura
```

### bal

```solidity
address public bal
```

### exchangeName

```solidity
string public exchangeName
```

### balancerData

```solidity
BalancerData public balancerData
```

### auraData

```solidity
AuraData public auraData
```

### auraMiningLib

```solidity
IAuraMiningLib public auraMiningLib
```

### ohmEthPriceFeed

```solidity
OracleFeed public ohmEthPriceFeed
```

### ethUsdPriceFeed

```solidity
OracleFeed public ethUsdPriceFeed
```

### lusdUsdPriceFeed

```solidity
OracleFeed public lusdUsdPriceFeed
```

### implementation

```solidity
BLVaultLusd public implementation
```

### vaultOwners

```solidity
mapping(BLVaultLusd => address) public vaultOwners
```

### userVaults

```solidity
mapping(address => BLVaultLusd) public userVaults
```

### totalLp

```solidity
uint256 public totalLp
```

### deployedOhm

```solidity
uint256 public deployedOhm
```

### circulatingOhmBurned

```solidity
uint256 public circulatingOhmBurned
```

### ohmLimit

```solidity
uint256 public ohmLimit
```

### currentFee

```solidity
uint64 public currentFee
```

### minWithdrawalDelay

```solidity
uint48 public minWithdrawalDelay
```

### isLusdBLVaultActive

```solidity
bool public isLusdBLVaultActive
```

### MAX_FEE

```solidity
uint32 public constant MAX_FEE = 10_000
```

### _ohmIndex

```solidity
uint8 private constant _ohmIndex = 1
```

### _lusdIndex

```solidity
uint8 private constant _lusdIndex = 0
```

## Functions

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

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`dependencies`|`Keycode[]`|- Keycode array of module dependencies.|

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view override returns (Permissions[] memory permissions);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`Permissions[]`|requests - Array of keycodes and function selectors for requested permissions.|

### onlyWhileActive

```solidity
modifier onlyWhileActive() ;
```

### onlyVault

```solidity
modifier onlyVault() ;
```

### deployVault

Deploys a personal single sided vault for the user

The vault is deployed with the user as the owner

```solidity
function deployVault() external override onlyWhileActive returns (address vault);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|                  The address of the deployed vault|

### mintOhmToVault

Mints OHM to the caller

Can only be called by an approved vault

```solidity
function mintOhmToVault(uint256 amount_) external override onlyWhileActive onlyVault;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of OHM to mint|

### burnOhmFromVault

Burns OHM from the caller

Can only be called by an approved vault. The caller must have an OHM approval for the MINTR.

```solidity
function burnOhmFromVault(uint256 amount_) external override onlyWhileActive onlyVault;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of OHM to burn|

### increaseTotalLp

Increases the tracked value for totalLP

Can only be called by an approved vault

```solidity
function increaseTotalLp(uint256 amount_) external override onlyWhileActive onlyVault;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of LP tokens to add to the total|

### decreaseTotalLp

Decreases the tracked value for totalLP

Can only be called by an approved vault

```solidity
function decreaseTotalLp(uint256 amount_) external override onlyWhileActive onlyVault;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of LP tokens to remove from the total|

### canWithdraw

Returns whether enough time has passed since the last deposit for the user to be ale to withdraw

```solidity
function canWithdraw(address user_) external view override returns (bool);
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
function getLpBalance(address user_) external view override returns (uint256);
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

Returns the user's vault's claim on the pair token

```solidity
function getUserPairShare(address user_) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|                   The user to check the vault of|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The user's vault's claim on the pair token|

### getOutstandingRewards

Returns the user's vault's unclaimed rewards in Aura

```solidity
function getOutstandingRewards(address user_) external view override returns (RewardsData[] memory);
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

Calculates the max pair token deposit based on the limit and current amount of OHM minted

```solidity
function getMaxDeposit() external view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The max pair token deposit|

### getExpectedLpAmount

Calculates the amount of LP tokens that will be generated for a given amount of pair tokens

This is an external function but should only be used in a callstatic from an external
source like the frontend.

```solidity
function getExpectedLpAmount(uint256 amount_) external override returns (uint256 bptAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of pair tokens to calculate the LP tokens for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`bptAmount`|`uint256`|uint256                 The amount of LP tokens that will be generated|

### getExpectedTokensOutProtocol

Calculates the amount of OHM and pair tokens that should be received by the vault for withdrawing a given amount of LP tokens

This is an external function but should only be used in a callstatic from an external
source like the frontend.

```solidity
function getExpectedTokensOutProtocol(uint256 lpAmount_)
    external
    override
    returns (uint256[] memory expectedTokenAmounts);
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

This is an external function but should only be used in a callstatic from an external
source like the frontend.

```solidity
function getExpectedPairTokenOutUser(uint256 lpAmount_) external override returns (uint256 expectedTknAmount);
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
function getRewardTokens() external view override returns (address[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|address[]               The addresses of the reward tokens|

### getRewardRate

Gets the reward rate (tokens per second) of the passed reward token

```solidity
function getRewardRate(address rewardToken_) external view override returns (uint256 rewardRate);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rewardRate`|`uint256`|uint256                 The reward rate (tokens per second)|

### getPoolOhmShare

Returns the amount of OHM in the pool that is owned by this vault system.

```solidity
function getPoolOhmShare() public view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The amount of OHM in the pool that is owned by this vault system.|

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

|Name|Type|Description|
|----|----|-----------|
|`poolOhmShare`|`uint256`|uint256                 Vault system's current claim on OHM from the Balancer pool|
|`mintedOhm`|`uint256`||
|`netBurnedOhm`|`uint256`||

### getOhmTknPrice

Gets the number of OHM per 1 pair token using oracle prices

```solidity
function getOhmTknPrice() public view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 OHM per 1 pair token (9 decimals)|

### getTknOhmPrice

Gets the number of pair tokens per 1 OHM using oracle prices

```solidity
function getTknOhmPrice() public view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 Pair tokens per 1 OHM (18 decimals)|

### getOhmTknPoolPrice

Gets the number of OHM per 1 pair token using pool prices

```solidity
function getOhmTknPoolPrice() public view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 OHM per 1 pair token (9 decimals)|

### emergencyBurnOhm

Emergency burns OHM that has been sent to the manager in the event a user had to emergency withdraw

Can only be called by the admin

```solidity
function emergencyBurnOhm(uint256 amount_) external override onlyRole("liquidityvault_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of OHM to burn|

### setLimit

Updates the limit on minting OHM

Can only be called by the admin. Cannot be set lower than the current outstanding minted OHM.

```solidity
function setLimit(uint256 newLimit_) external override onlyRole("liquidityvault_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newLimit_`|`uint256`|               The new OHM limit (9 decimals)|

### setFee

Updates the fee on reward tokens

Can only be called by the admin. Cannot be set beyond 10_000 (100%). Only is used by vaults deployed after the update.

```solidity
function setFee(uint64 newFee_) external override onlyRole("liquidityvault_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newFee_`|`uint64`|                 The new fee (in basis points)|

### setWithdrawalDelay

Updates the minimum holding period before a user can withdraw

Can only be called by the admin

```solidity
function setWithdrawalDelay(uint48 newDelay_) external override onlyRole("liquidityvault_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newDelay_`|`uint48`|               The new minimum holding period (in seconds)|

### changeUpdateThresholds

```solidity
function changeUpdateThresholds(
    uint48 ohmEthUpdateThreshold_,
    uint48 ethUsdUpdateThreshold_,
    uint48 lusdUsdUpdateThreshold_
) external onlyRole("liquidityvault_admin");
```

### activate

Activates the vault manager and all approved vaults

Can only be called by the admin

```solidity
function activate() external override onlyRole("liquidityvault_admin");
```

### deactivate

Deactivates the vault manager and all approved vaults

Can only be called by the admin

```solidity
function deactivate() external override onlyRole("emergency_admin");
```

### _validatePrice

```solidity
function _validatePrice(AggregatorV3Interface priceFeed_, uint48 updateThreshold_) internal view returns (uint256);
```

## Events

### VaultDeployed

```solidity
event VaultDeployed(address vault, address owner, uint64 fee);
```

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
