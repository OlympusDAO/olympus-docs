# BLVaultLusd

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/BoostedLiquidity/BLVaultLusd.sol)

**Inherits:** [IBLVault](/main/contracts/docs/src/policies/BoostedLiquidity/interfaces/IBLVault.sol/interface.IBLVault), Clone

## Constants

### _OHM_DECIMALS

```solidity
uint256 private constant _OHM_DECIMALS = 1e9;
```

### _LUSD_DECIMALS

```solidity
uint256 private constant _LUSD_DECIMALS = 1e18;
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

### lastDeposit

The last timestamp a deposit was made. Used for enforcing minimum deposit lengths.

```solidity
uint256 public lastDeposit;
```

### _reentrancyStatus

```solidity
uint256 private _reentrancyStatus;
```

## Functions

<a id="constructor"></a>

### constructor

```solidity
constructor();
```

<a id="initializeclone"></a>

### initializeClone

```solidity
function initializeClone() external;
```

<a id="owner"></a>

### owner

```solidity
function owner() public pure returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="manager"></a>

### manager

```solidity
function manager() public pure returns (BLVaultManagerLusd);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `BLVaultManagerLusd` |  |

<a id="trsry"></a>

### TRSRY

```solidity
function TRSRY() public pure returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="mintr"></a>

### MINTR

```solidity
function MINTR() public pure returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="ohm"></a>

### ohm

```solidity
function ohm() public pure returns (OlympusERC20Token);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `OlympusERC20Token` |  |

<a id="lusd"></a>

### lusd

```solidity
function lusd() public pure returns (ERC20);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `ERC20` |  |

<a id="aura"></a>

### aura

```solidity
function aura() public pure returns (ERC20);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `ERC20` |  |

<a id="bal"></a>

### bal

```solidity
function bal() public pure returns (ERC20);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `ERC20` |  |

<a id="vault"></a>

### vault

```solidity
function vault() public pure returns (IVault);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `IVault` |  |

<a id="liquiditypool"></a>

### liquidityPool

```solidity
function liquidityPool() public pure returns (IBasePool);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `IBasePool` |  |

<a id="pid"></a>

### pid

```solidity
function pid() public pure returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="aurabooster"></a>

### auraBooster

```solidity
function auraBooster() public pure returns (IAuraBooster);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `IAuraBooster` |  |

<a id="aurarewardpool"></a>

### auraRewardPool

```solidity
function auraRewardPool() public pure returns (IAuraRewardPool);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `IAuraRewardPool` |  |

<a id="fee"></a>

### fee

```solidity
function fee() public pure returns (uint64);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint64` |  |

<a id="onlyowner"></a>

### onlyOwner

```solidity
modifier onlyOwner();
```

<a id="onlywhileactive"></a>

### onlyWhileActive

```solidity
modifier onlyWhileActive();
```

<a id="onlywhileinactive"></a>

### onlyWhileInactive

```solidity
modifier onlyWhileInactive();
```

<a id="nonreentrant"></a>

### nonReentrant

```solidity
modifier nonReentrant();
```

<a id="deposit-uint256-uint256"></a>

### deposit

Mints OHM against a pair token deposit and uses the OHM and pair tokens to add liquidity to a Balancer pool

<i>

Can only be called by the owner of the vault

</i>

```solidity
function deposit(
        uint256 amount_,
        uint256 minLpAmount_
    ) external override onlyWhileActive onlyOwner nonReentrant returns (uint256 lpAmountOut);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of pair tokens to deposit |
| minLpAmount_ | `uint256` | The minimum acceptable amount of LP tokens to receive back |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lpAmountOut | `uint256` | The amount of LP tokens received by the transaction |

<a id="withdraw-uint256-uint256-uint256-bool"></a>

### withdraw

Withdraws LP tokens from Aura and Balancer, burns the OHM side, and returns the pair token side to the user

<i>

Can only be called by the owner of the vault

</i>

```solidity
function withdraw(
        uint256 lpAmount_,
        uint256[] calldata minTokenAmountsBalancer_,
        uint256 minTokenAmountUser_,
        bool claim_
    ) external override onlyOwner nonReentrant returns (uint256, uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lpAmount_ | `uint256` | The amount of LP tokens to withdraw from Balancer |
| minTokenAmountsBalancer_ | `uint256[]` | The minimum acceptable amounts of OHM (first entry), and pair tokens (second entry) to receive back from Balancer |
| minTokenAmountUser_ | `uint256` | The minimum acceptable amount of pair tokens to receive back from the vault |
| claim_ | `bool` | Whether to claim outstanding rewards from Aura |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 The amount of OHM received |
| &lt;none&gt; | `uint256` | uint256                 The amount of pair tokens received |

<a id="emergencywithdraw-uint256-uint256"></a>

### emergencyWithdraw

Withdraws LP tokens from Aura and Balancer, returns the pair tokens to the user

<i>

Can only be called by the owner of the vault. Can only be called when the vault is paused

</i>

```solidity
function emergencyWithdraw(
        uint256 lpAmount_,
        uint256[] calldata minTokenAmounts_
    ) external override onlyWhileInactive onlyOwner nonReentrant returns (uint256, uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lpAmount_ | `uint256` | The amount of LP tokens to withdraw from Balancer |
| minTokenAmounts_ | `uint256[]` | The minimum acceptable amounts of OHM (first entry), and pair tokens (second entry) to receive back from Balancer |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 The amount of OHM received |
| &lt;none&gt; | `uint256` | uint256                 The amount of pair tokens received |

<a id="claimrewards"></a>

### claimRewards

Claims outstanding rewards from Aura

<i>

Can only be called by the owner of the vault

</i>

```solidity
function claimRewards() external override onlyWhileActive onlyOwner nonReentrant;
```

<a id="canwithdraw"></a>

### canWithdraw

Gets whether enough time has passed since the last deposit for the user to be ale to withdraw

```solidity
function canWithdraw() external view override returns (bool);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool                    Whether enough time has passed since the last deposit for the user to be ale to withdraw |

<a id="getlpbalance"></a>

### getLpBalance

Gets the LP balance of the contract based on its deposits to Aura

```solidity
function getLpBalance() public view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 LP balance deposited into Aura |

<a id="getuserpairshare"></a>

### getUserPairShare

Gets the contract's claim on pair tokens based on its LP balance deposited into Aura

```solidity
function getUserPairShare() public view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 Claim on pair tokens |

<a id="getoutstandingrewards"></a>

### getOutstandingRewards

Returns the vault's unclaimed rewards in Aura

```solidity
function getOutstandingRewards() public view override returns (RewardsData[] memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `RewardsData[]` | RewardsData[]           The vault's unclaimed rewards in Aura |

<a id="_joinbalancerpool-uint256-uint256-uint256"></a>

### _joinBalancerPool

```solidity
function _joinBalancerPool(
        uint256 ohmAmount_,
        uint256 lusdAmount_,
        uint256 minLpAmount_
    ) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| ohmAmount_ | `uint256` |  |
| lusdAmount_ | `uint256` |  |
| minLpAmount_ | `uint256` |  |

<a id="_exitbalancerpool-uint256-uint256"></a>

### _exitBalancerPool

```solidity
function _exitBalancerPool(uint256 lpAmount_, uint256[] calldata minTokenAmounts_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lpAmount_ | `uint256` |  |
| minTokenAmounts_ | `uint256[]` |  |

<a id="_sendrewards"></a>

### _sendRewards

```solidity
function _sendRewards() internal;
```

## Events

### Deposit

```solidity
event Deposit(uint256 ohmAmount, uint256 lusdAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| ohmAmount | `uint256` |  |
| lusdAmount | `uint256` |  |

### Withdraw

```solidity
event Withdraw(uint256 ohmAmount, uint256 lusdAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| ohmAmount | `uint256` |  |
| lusdAmount | `uint256` |  |

### RewardsClaimed

```solidity
event RewardsClaimed(address indexed rewardsToken, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rewardsToken | `address` |  |
| amount | `uint256` |  |

## Errors

### BLVaultLusd_AlreadyInitialized

```solidity
error BLVaultLusd_AlreadyInitialized();
```

### BLVaultLusd_OnlyOwner

```solidity
error BLVaultLusd_OnlyOwner();
```

### BLVaultLusd_Active

```solidity
error BLVaultLusd_Active();
```

### BLVaultLusd_Inactive

```solidity
error BLVaultLusd_Inactive();
```

### BLVaultLusd_Reentrancy

```solidity
error BLVaultLusd_Reentrancy();
```

### BLVaultLusd_AuraDepositFailed

```solidity
error BLVaultLusd_AuraDepositFailed();
```

### BLVaultLusd_AuraWithdrawalFailed

```solidity
error BLVaultLusd_AuraWithdrawalFailed();
```

### BLVaultLusd_WithdrawFailedPriceImbalance

```solidity
error BLVaultLusd_WithdrawFailedPriceImbalance();
```

### BLVaultLusd_WithdrawalDelay

```solidity
error BLVaultLusd_WithdrawalDelay();
```
