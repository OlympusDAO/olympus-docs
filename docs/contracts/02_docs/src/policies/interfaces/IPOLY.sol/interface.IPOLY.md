# IPOLY

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/interfaces/IPOLY.sol)

## Functions

### terms

```solidity
function terms(address account_) external view returns (uint256, uint256, uint256);
```

### claim

Claims vested OHM by exchanging DAI

```solidity
function claim(address to_, uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to_`|`address`|Address to send OHM to|
|`amount_`|`uint256`|DAI amount to exchange for OHM|

### pushWalletChange

Pushes entirety of a user's claim to a new address

```solidity
function pushWalletChange(address newAddress_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newAddress_`|`address`|Address to send claim to|

### pullWalletChange

Pulls a queued wallet change

```solidity
function pullWalletChange(address oldAddress_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oldAddress_`|`address`|Address to pull change from|

### redeemableFor

Calculates the current amount a user is eligible to redeem

```solidity
function redeemableFor(address account_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|The account to check the redeemable amount for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The amount of OHM the account can redeem|

### redeemableFor

Calculates the current amount a user is eligible to redeem

```solidity
function redeemableFor(Term memory accountTerms_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accountTerms_`|`Term`|The terms of the account to check the redeemable amount for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The amount of OHM the account can redeem|

### getCirculatingSupply

Returns a calculation of OHM circulating supply to be used to determine vested positions

```solidity
function getCirculatingSupply() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 OHM circulating supply|

### getAccountClaimed

Calculates the effective amount of OHM claimed taking into consideration rebasing since claim

```solidity
function getAccountClaimed(address account_) external returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|The account to check the claim for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The amount of OHM the account has claimed|

### getAccountClaimed

Calculates the effective amount of OHM claimed taking into consideration rebasing since claim

```solidity
function getAccountClaimed(Term memory accountTerms_) external returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accountTerms_`|`Term`|The terms of the account to check the claim for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The amount of OHM the account has claimed|

### validateClaim

Calculates the amount of OHM to send to the user and validates the claim

```solidity
function validateClaim(uint256 amount_, Term memory accountTerms_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|The amount of DAI to exchange for OHM|
|`accountTerms_`|`Term`|The terms to check the claim against|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The amount of OHM to send to the user|

### migrate

Migrates claim data from old pOLY contracts to this one

Can only be called by the poly_admin role

```solidity
function migrate(address[] calldata accounts_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accounts_`|`address[]`|Array of accounts to migrate|

### migrateGenesis

Migrates claim data from the Genesis Claim contract to this one

Can only be called by the poly_admin role

*The Genesis Claim contract originally did not count the full claimed amount as staked,
only 90% of it, given that there is no longer a staking rate, we can combine the two
claim contracts by counting the 10% that wasn't considered staked as staked at the current index*

```solidity
function migrateGenesis(address[] calldata accounts_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accounts_`|`address[]`|Array of accounts to migrate|

### setTerms

Sets the claim terms for an account

Can only be called by the poly_admin role

```solidity
function setTerms(address account_, uint256 percent_, uint256 gClaimed_, uint256 max_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|The account to set the terms for|
|`percent_`|`uint256`|The percent of the circulating supply the account is entitled to|
|`gClaimed_`|`uint256`|The amount of gOHM the account has claimed|
|`max_`|`uint256`|The maximum amount of OHM the account can claim|

## Events

### Claim

```solidity
event Claim(address indexed account, address indexed to, uint256 amount);
```

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);
```

### WalletChange

```solidity
event WalletChange(address indexed account, address indexed newAddress, bool isPull);
```

### TermsSet

```solidity
event TermsSet(address indexed account, uint256 percent, uint256 gClaimed, uint256 max);
```

## Errors

### POLY_NoClaim

```solidity
error POLY_NoClaim();
```

### POLY_AlreadyHasClaim

```solidity
error POLY_AlreadyHasClaim();
```

### POLY_NoWalletChange

```solidity
error POLY_NoWalletChange();
```

### POLY_AllocationLimitViolation

```solidity
error POLY_AllocationLimitViolation();
```

### POLY_ClaimMoreThanVested

```solidity
error POLY_ClaimMoreThanVested(uint256 vested_);
```

### POLY_ClaimMoreThanMax

```solidity
error POLY_ClaimMoreThanMax(uint256 max_);
```

## Structs

### GenesisTerm

```solidity
struct GenesisTerm {
    uint256 percent;
    uint256 claimed;
    uint256 gClaimed;
    uint256 max;
}
```

### Term

```solidity
struct Term {
    uint256 percent;
    uint256 gClaimed;
    uint256 max;
}
```
