# pOLY

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/pOLY.sol)

**Inherits:**
[IPOLY](/main/contracts/docs/src/policies/interfaces/IPOLY.sol/interface.IPOLY), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## State Variables

### MINTR

```solidity
MINTRv1 public MINTR;
```

### TRSRY

```solidity
TRSRYv1 public TRSRY;
```

### previous

```solidity
IPreviousPOLY public previous;
```

### previousGenesis

```solidity
IGenesisClaim public previousGenesis;
```

### OHM

```solidity
ERC20 public OHM;
```

### gOHM

```solidity
IgOHM public gOHM;
```

### DAI

```solidity
ERC20 public DAI;
```

### dao

```solidity
address public dao;
```

### terms

```solidity
mapping(address => Term) public terms;
```

### walletChange

```solidity
mapping(address => address) public walletChange;
```

### totalAllocated

```solidity
uint256 public totalAllocated;
```

### maximumAllocated

```solidity
uint256 public maximumAllocated;
```

### PERCENT_PRECISION

```solidity
uint256 public constant PERCENT_PRECISION = 1_000_000;
```

### OHM_PRECISION

```solidity
uint256 public constant OHM_PRECISION = 1_000_000_000;
```

### DAI_PRECISION

```solidity
uint256 public constant DAI_PRECISION = 1_000_000_000_000_000_000;
```

## Functions

### constructor

```solidity
constructor(
    Kernel kernel_,
    address previous_,
    address previousGenesis_,
    address ohm_,
    address gohm_,
    address dai_,
    address dao_,
    uint256 maximumAllocated_
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
function redeemableFor(address account_) public view returns (uint256);
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
function redeemableFor(Term memory accountTerms_) public view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accountTerms_`|`Term`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The amount of OHM the account can redeem|

### getCirculatingSupply

Returns a calculation of OHM circulating supply to be used to determine vested positions

```solidity
function getCirculatingSupply() public view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 OHM circulating supply|

### getAccountClaimed

Calculates the effective amount of OHM claimed taking into consideration rebasing since claim

```solidity
function getAccountClaimed(address account_) public view returns (uint256);
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
function getAccountClaimed(Term memory accountTerms_) public view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accountTerms_`|`Term`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The amount of OHM the account has claimed|

### validateClaim

Calculates the amount of OHM to send to the user and validates the claim

```solidity
function validateClaim(uint256 amount_, Term memory accountTerms_) public view returns (uint256);
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

```solidity
function migrate(address[] calldata accounts_) external onlyRole("poly_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accounts_`|`address[]`|Array of accounts to migrate|

### migrateGenesis

Migrates claim data from the Genesis Claim contract to this one

*The Genesis Claim contract originally did not count the full claimed amount as staked,
only 90% of it, given that there is no longer a staking rate, we can combine the two
claim contracts by counting the 10% that wasn't considered staked as staked at the current index*

```solidity
function migrateGenesis(address[] calldata accounts_) external onlyRole("poly_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accounts_`|`address[]`|Array of accounts to migrate|

### setTerms

Sets the claim terms for an account

```solidity
function setTerms(address account_, uint256 percent_, uint256 gClaimed_, uint256 max_) public onlyRole("poly_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|The account to set the terms for|
|`percent_`|`uint256`|The percent of the circulating supply the account is entitled to|
|`gClaimed_`|`uint256`|The amount of gOHM the account has claimed|
|`max_`|`uint256`|The maximum amount of OHM the account can claim|

### _claim

```solidity
function _claim(uint256 amount_) internal returns (uint256 toSend);
```
