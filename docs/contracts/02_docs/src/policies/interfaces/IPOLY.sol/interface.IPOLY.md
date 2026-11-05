# IPOLY

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/IPOLY.sol)

## Functions

<a id="terms-address"></a>

### terms

```solidity
function terms(address account_) external view returns (uint256, uint256, uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |
| &lt;none&gt; | `uint256` |  |
| &lt;none&gt; | `uint256` |  |

<a id="claim-address-uint256"></a>

### claim

Claims vested OHM by exchanging DAI

```solidity
function claim(address to_, uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` | Address to send OHM to |
| amount_ | `uint256` | DAI amount to exchange for OHM |

<a id="pushwalletchange-address"></a>

### pushWalletChange

Pushes entirety of a user's claim to a new address

```solidity
function pushWalletChange(address newAddress_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newAddress_ | `address` | Address to send claim to |

<a id="pullwalletchange-address"></a>

### pullWalletChange

Pulls a queued wallet change

```solidity
function pullWalletChange(address oldAddress_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldAddress_ | `address` | Address to pull change from |

<a id="redeemablefor-address"></a>

### redeemableFor

Calculates the current amount a user is eligible to redeem

```solidity
function redeemableFor(address account_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account to check the redeemable amount for |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The amount of OHM the account can redeem |

<a id="redeemablefor-term"></a>

### redeemableFor

Calculates the current amount a user is eligible to redeem

```solidity
function redeemableFor(Term memory accountTerms_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| accountTerms_ | `Term` | The terms of the account to check the redeemable amount for |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The amount of OHM the account can redeem |

<a id="getcirculatingsupply"></a>

### getCirculatingSupply

Returns a calculation of OHM circulating supply to be used to determine vested positions

```solidity
function getCirculatingSupply() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 OHM circulating supply |

<a id="getaccountclaimed-address"></a>

### getAccountClaimed

Calculates the effective amount of OHM claimed taking into consideration rebasing since claim

```solidity
function getAccountClaimed(address account_) external returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account to check the claim for |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The amount of OHM the account has claimed |

<a id="getaccountclaimed-term"></a>

### getAccountClaimed

Calculates the effective amount of OHM claimed taking into consideration rebasing since claim

```solidity
function getAccountClaimed(Term memory accountTerms_) external returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| accountTerms_ | `Term` | The terms of the account to check the claim for |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The amount of OHM the account has claimed |

<a id="validateclaim-uint256-term"></a>

### validateClaim

Calculates the amount of OHM to send to the user and validates the claim

```solidity
function validateClaim(
        uint256 amount_,
        Term memory accountTerms_
    ) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of DAI to exchange for OHM |
| accountTerms_ | `Term` | The terms to check the claim against |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The amount of OHM to send to the user |

<a id="migrate-address"></a>

### migrate

Migrates claim data from old pOLY contracts to this one

Can only be called by the poly_admin role

```solidity
function migrate(address[] calldata accounts_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| accounts_ | `address[]` | Array of accounts to migrate |

<a id="migrategenesis-address"></a>

### migrateGenesis

Migrates claim data from the Genesis Claim contract to this one

Can only be called by the poly_admin role

<i>

The Genesis Claim contract originally did not count the full claimed amount as staked,
only 90% of it, given that there is no longer a staking rate, we can combine the two
claim contracts by counting the 10% that wasn't considered staked as staked at the current index

</i>

```solidity
function migrateGenesis(address[] calldata accounts_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| accounts_ | `address[]` | Array of accounts to migrate |

<a id="setterms-address-uint256-uint256-uint256"></a>

### setTerms

Sets the claim terms for an account

Can only be called by the poly_admin role

```solidity
function setTerms(address account_, uint256 percent_, uint256 gClaimed_, uint256 max_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account to set the terms for |
| percent_ | `uint256` | The percent of the circulating supply the account is entitled to |
| gClaimed_ | `uint256` | The amount of gOHM the account has claimed |
| max_ | `uint256` | The maximum amount of OHM the account can claim |

## Events

### Claim

```solidity
event Claim(address indexed account, address indexed to, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | `address` |  |
| to | `address` |  |
| amount | `uint256` |  |

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |
| amount | `uint256` |  |

### WalletChange

```solidity
event WalletChange(address indexed account, address indexed newAddress, bool isPull);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | `address` |  |
| newAddress | `address` |  |
| isPull | `bool` |  |

### TermsSet

```solidity
event TermsSet(address indexed account, uint256 percent, uint256 gClaimed, uint256 max);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | `address` |  |
| percent | `uint256` |  |
| gClaimed | `uint256` |  |
| max | `uint256` |  |

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| vested_ | `uint256` |  |

### POLY_ClaimMoreThanMax

```solidity
error POLY_ClaimMoreThanMax(uint256 max_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| max_ | `uint256` |  |

## Structs

### GenesisTerm

```solidity
struct GenesisTerm {
        uint256 percent; // PRECISION = 1_000_000 (i.e. 5000 = 0.5%)
        uint256 claimed; // Static number
        uint256 gClaimed; // Rebasing agnostic # of tokens claimed
        uint256 max; // Maximum nominal OHM amount can claim
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| percent | `uint256` |  |
| claimed | `uint256` |  |
| gClaimed | `uint256` |  |
| max | `uint256` |  |

### Term

```solidity
struct Term {
        uint256 percent; // PRECISION = 1_000_000 (i.e. 5000 = 0.5%)
        uint256 gClaimed; // Rebase agnostic # of tokens claimed
        uint256 max; // Maximum nominal OHM amount claimable
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| percent | `uint256` |  |
| gClaimed | `uint256` |  |
| max | `uint256` |  |
