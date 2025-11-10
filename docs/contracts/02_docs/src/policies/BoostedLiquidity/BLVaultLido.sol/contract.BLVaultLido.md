# BLVaultLido

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/BoostedLiquidity/BLVaultLido.sol)

**Inherits:**
[IBLVaultLido](/main/contracts/docs/src/policies/BoostedLiquidity/interfaces/IBLVaultLido.sol/interface.IBLVaultLido), Clone

## State Variables

### lastDeposit

The last timestamp a deposit was made. Used for enforcing minimum deposit lengths.

```solidity
uint256 public lastDeposit;
```

### _OHM_DECIMALS

```solidity
uint256 private constant _OHM_DECIMALS = 1e9;
```

### _WSTETH_DECIMALS

```solidity
uint256 private constant _WSTETH_DECIMALS = 1e18;
```

### _reentrancyStatus

```solidity
uint256 private _reentrancyStatus;
```

## Functions

### constructor

```solidity
constructor();
```

### initializeClone

```solidity
function initializeClone() external;
```

### owner

```solidity
function owner() public pure returns (address);
```

### manager

```solidity
function manager() public pure returns (BLVaultManagerLido);
```

### TRSRY

```solidity
function TRSRY() public pure returns (address);
```

### MINTR

```solidity
function MINTR() public pure returns (address);
```

### ohm

```solidity
function ohm() public pure returns (OlympusERC20Token);
```

### wsteth

```solidity
function wsteth() public pure returns (ERC20);
```

### aura

```solidity
function aura() public pure returns (ERC20);
```

### bal

```solidity
function bal() public pure returns (ERC20);
```

### vault

```solidity
function vault() public pure returns (IVault);
```

### liquidityPool

```solidity
function liquidityPool() public pure returns (IBasePool);
```

### pid

```solidity
function pid() public pure returns (uint256);
```

### auraBooster

```solidity
function auraBooster() public pure returns (IAuraBooster);
```

### auraRewardPool

```solidity
function auraRewardPool() public pure returns (IAuraRewardPool);
```

### fee

```solidity
function fee() public pure returns (uint64);
```

### onlyOwner

```solidity
modifier onlyOwner();
```

### onlyWhileActive

```solidity
modifier onlyWhileActive();
```

### onlyWhileInactive

```solidity
modifier onlyWhileInactive();
```

### nonReentrant

```solidity
modifier nonReentrant();
```

### deposit

Mints OHM against a wstETH deposit and uses the OHM and wstETH to add liquidity to a Balancer pool

*Can only be called by the owner of the vault*

```solidity
function deposit(uint256 amount_, uint256 minLpAmount_)
    external
    override
    onlyWhileActive
    onlyOwner
    nonReentrant
    returns (uint256 lpAmountOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of wstETH to deposit|
|`minLpAmount_`|`uint256`|            The minimum acceptable amount of LP tokens to receive back|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`lpAmountOut`|`uint256`|            The amount of LP tokens received by the transaction|

### withdraw

Withdraws LP tokens from Aura and Balancer, burns the OHM side, and returns the wstETH side to the user

*Can only be called by the owner of the vault*

```solidity
function withdraw(
    uint256 lpAmount_,
    uint256[] calldata minTokenAmountsBalancer_,
    uint256 minTokenAmountUser_,
    bool claim_
) external override onlyOwner nonReentrant returns (uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`lpAmount_`|`uint256`|               The amount of LP tokens to withdraw from Balancer|
|`minTokenAmountsBalancer_`|`uint256[]`|The minimum acceptable amounts of OHM (first entry), and wstETH (second entry) to receive back from Balancer|
|`minTokenAmountUser_`|`uint256`|     The minimum acceptable amount of wstETH to receive back from the vault|
|`claim_`|`bool`|                  Whether to claim outstanding rewards from Aura|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The amount of OHM received|
|`<none>`|`uint256`||

### emergencyWithdraw

Withdraws LP tokens from Aura and Balancer, returns the wstETH to the user

*Can only be called by the owner of the vault. Can only be called when the vault is paused*

```solidity
function emergencyWithdraw(uint256 lpAmount_, uint256[] calldata minTokenAmounts_)
    external
    override
    onlyWhileInactive
    onlyOwner
    nonReentrant
    returns (uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`lpAmount_`|`uint256`|               The amount of LP tokens to withdraw from Balancer|
|`minTokenAmounts_`|`uint256[]`|        The minimum acceptable amounts of OHM (first entry), and wstETH (second entry) to receive back from Balancer|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The amount of OHM received|
|`<none>`|`uint256`||

### claimRewards

Claims outstanding rewards from Aura

*Can only be called by the owner of the vault*

```solidity
function claimRewards() external override onlyWhileActive onlyOwner nonReentrant;
```

### canWithdraw

Gets whether enough time has passed since the last deposit for the user to be ale to withdraw

```solidity
function canWithdraw() external view override returns (bool);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool                    Whether enough time has passed since the last deposit for the user to be ale to withdraw|

### getLpBalance

Gets the LP balance of the contract based on its deposits to Aura

```solidity
function getLpBalance() public view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 LP balance deposited into Aura|

### getUserPairShare

Gets the contract's claim on wstETH based on its LP balance deposited into Aura

```solidity
function getUserPairShare() public view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 Claim on wstETH|

### getOutstandingRewards

Returns the vault's unclaimed rewards in Aura

```solidity
function getOutstandingRewards() public view override returns (RewardsData[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`RewardsData[]`|RewardsData[]           The vault's unclaimed rewards in Aura|

### _joinBalancerPool

```solidity
function _joinBalancerPool(uint256 ohmAmount_, uint256 wstethAmount_, uint256 minLpAmount_) internal;
```

### _exitBalancerPool

```solidity
function _exitBalancerPool(uint256 lpAmount_, uint256[] calldata minTokenAmounts_) internal;
```

### _sendRewards

```solidity
function _sendRewards() internal;
```

## Events

### Deposit

```solidity
event Deposit(uint256 ohmAmount, uint256 wstethAmount);
```

### Withdraw

```solidity
event Withdraw(uint256 ohmAmount, uint256 wstethAmount);
```

### RewardsClaimed

```solidity
event RewardsClaimed(address indexed rewardsToken, uint256 amount);
```

## Errors

### BLVaultLido_AlreadyInitialized

```solidity
error BLVaultLido_AlreadyInitialized();
```

### BLVaultLido_OnlyOwner

```solidity
error BLVaultLido_OnlyOwner();
```

### BLVaultLido_Active

```solidity
error BLVaultLido_Active();
```

### BLVaultLido_Inactive

```solidity
error BLVaultLido_Inactive();
```

### BLVaultLido_Reentrancy

```solidity
error BLVaultLido_Reentrancy();
```

### BLVaultLido_AuraDepositFailed

```solidity
error BLVaultLido_AuraDepositFailed();
```

### BLVaultLido_AuraWithdrawalFailed

```solidity
error BLVaultLido_AuraWithdrawalFailed();
```

### BLVaultLido_WithdrawFailedPriceImbalance

```solidity
error BLVaultLido_WithdrawFailedPriceImbalance();
```

### BLVaultLido_WithdrawalDelay

```solidity
error BLVaultLido_WithdrawalDelay();
```
