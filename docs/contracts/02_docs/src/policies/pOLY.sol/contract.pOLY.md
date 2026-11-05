# pOLY

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/pOLY.sol)

**Inherits:** [IPOLY](/main/contracts/docs/src/policies/interfaces/IPOLY.sol/interface.IPOLY), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## Constants

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

## Functions

<a id="constructor-kernel-address-address-address-address-address-address-uint256"></a>

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

**Parameters**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| kernel_           | `Kernel`  |             |
| previous_         | `address` |             |
| previousGenesis_  | `address` |             |
| ohm_              | `address` |             |
| gohm_             | `address` |             |
| dai_              | `address` |             |
| dao_              | `address` |             |
| maximumAllocated_ | `uint256` |             |

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
function redeemableFor(address account_) public view returns (uint256);
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
function redeemableFor(Term memory accountTerms_) public view returns (uint256);
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
function getCirculatingSupply() public view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 OHM circulating supply |

<a id="getaccountclaimed-address"></a>

### getAccountClaimed

Calculates the effective amount of OHM claimed taking into consideration rebasing since claim

```solidity
function getAccountClaimed(address account_) public view returns (uint256);
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
function getAccountClaimed(Term memory accountTerms_) public view returns (uint256);
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
    ) public view returns (uint256);
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
function migrate(address[] calldata accounts_) external onlyRole("poly_admin");
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
function migrateGenesis(address[] calldata accounts_) external onlyRole("poly_admin");
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
function setTerms(
        address account_,
        uint256 percent_,
        uint256 gClaimed_,
        uint256 max_
    ) public onlyRole("poly_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account to set the terms for |
| percent_ | `uint256` | The percent of the circulating supply the account is entitled to |
| gClaimed_ | `uint256` | The amount of gOHM the account has claimed |
| max_ | `uint256` | The maximum amount of OHM the account can claim |

<a id="_claim-uint256"></a>

### _claim

```solidity
function _claim(uint256 amount_) internal returns (uint256 toSend);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| amount_ | `uint256` |             |

**Returns**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| toSend | `uint256` |             |
