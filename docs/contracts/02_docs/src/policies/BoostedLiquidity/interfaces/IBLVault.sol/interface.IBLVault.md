# IBLVault

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/BoostedLiquidity/interfaces/IBLVault.sol)

## Functions

### deposit

Mints OHM against a pair token deposit and uses the OHM and pair tokens to add liquidity to a Balancer pool

*Can only be called by the owner of the vault*

```solidity
function deposit(uint256 amount_, uint256 minLpAmount_) external returns (uint256 lpAmountOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|                 The amount of pair tokens to deposit|
|`minLpAmount_`|`uint256`|            The minimum acceptable amount of LP tokens to receive back|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`lpAmountOut`|`uint256`|            The amount of LP tokens received by the transaction|

### withdraw

Withdraws LP tokens from Aura and Balancer, burns the OHM side, and returns the pair token side to the user

*Can only be called by the owner of the vault*

```solidity
function withdraw(
    uint256 lpAmount_,
    uint256[] calldata minTokenAmountsBalancer_,
    uint256 minTokenAmountUser_,
    bool claim_
) external returns (uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`lpAmount_`|`uint256`|               The amount of LP tokens to withdraw from Balancer|
|`minTokenAmountsBalancer_`|`uint256[]`|The minimum acceptable amounts of OHM (first entry), and pair tokens (second entry) to receive back from Balancer|
|`minTokenAmountUser_`|`uint256`|     The minimum acceptable amount of pair tokens to receive back from the vault|
|`claim_`|`bool`|                  Whether to claim outstanding rewards from Aura|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The amount of OHM received|
|`<none>`|`uint256`|uint256                 The amount of pair tokens received|

### emergencyWithdraw

Withdraws LP tokens from Aura and Balancer, returns the pair tokens to the user

*Can only be called by the owner of the vault. Can only be called when the vault is paused*

```solidity
function emergencyWithdraw(uint256 lpAmount_, uint256[] calldata minTokenAmounts_)
    external
    returns (uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`lpAmount_`|`uint256`|               The amount of LP tokens to withdraw from Balancer|
|`minTokenAmounts_`|`uint256[]`|        The minimum acceptable amounts of OHM (first entry), and pair tokens (second entry) to receive back from Balancer|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 The amount of OHM received|
|`<none>`|`uint256`|uint256                 The amount of pair tokens received|

### claimRewards

Claims outstanding rewards from Aura

*Can only be called by the owner of the vault*

```solidity
function claimRewards() external;
```

### canWithdraw

Gets whether enough time has passed since the last deposit for the user to be ale to withdraw

```solidity
function canWithdraw() external view returns (bool);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool                    Whether enough time has passed since the last deposit for the user to be ale to withdraw|

### getLpBalance

Gets the LP balance of the contract based on its deposits to Aura

```solidity
function getLpBalance() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 LP balance deposited into Aura|

### getUserPairShare

Gets the contract's claim on pair tokens based on its LP balance deposited into Aura

```solidity
function getUserPairShare() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256                 Claim on pair tokens|

### getOutstandingRewards

Returns the vault's unclaimed rewards in Aura

```solidity
function getOutstandingRewards() external view returns (RewardsData[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`RewardsData[]`|RewardsData[]           The vault's unclaimed rewards in Aura|
