# V1Migrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/V1Migrator.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned), [IV1Migrator](/main/contracts/docs/src/policies/interfaces/IV1Migrator.sol/interface.IV1Migrator)

**Title:** V1Migrator

Policy to allow OHM v1 holders to migrate to OHM v2 via merkle proof verification

<i>

Migration flow (partial migrations allowed):

1. User has OHM v1 balance
2. User proves eligibility via merkle proof with their allocated amount
3. User can migrate any amount up to their allocation in multiple transactions
4. Contract calculates OHM v2 amount using gOHM conversion (to match production flow):

- Convert OHM v1 to gOHM via gOHM.balanceTo(ohmV1Amount)
- Convert gOHM back to OHM v2 via gOHM.balanceFrom(gOHMAmount)
- This matches the production flow: OHM v1 -> gOHM -> OHM v2
- When gOHM index is not at base level, the result may be slightly less due to rounding

5. Contract burns OHM v1 and mints calculated OHM v2 amount to user
6. User's migrated amount is tracked by OHM v1 amount (original allocation)

</i>

Admin functions:

- setMerkleRoot: Update eligibility tree (resets all migrated amounts)
- setRemainingMintApproval: Update remaining MINTR approval for migration
- enable/disable: Emergency pause/resume

## Constants

### LEGACY_MIGRATION_ADMIN_ROLE

The role required to set merkle root

```solidity
bytes32 internal constant LEGACY_MIGRATION_ADMIN_ROLE = "legacy_migration_admin";
```

### _GOHM

The gOHM token contract used for OHM v2 amount calculation

```solidity
IgOHM internal immutable _GOHM;
```

### _OHMV1

The OHM v1 token contract (9 decimals)

```solidity
IERC20 internal immutable _OHMV1;
```

## State Variables

### MINTR

The MINTR module reference for minting OHM v2

```solidity
MINTRv1 internal MINTR;
```

### _OHMV2

The OHM v2 token contract from MINTR (9 decimals)

<i>

Set in configureDependencies via MINTR.ohm()

</i>

```solidity
IERC20 internal _OHMV2;
```

### merkleRoot

The current merkle root for verifying eligible claims

```solidity
bytes32 public override merkleRoot;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` | The current merkle root |

### _currentMerkleNonce

Current merkle root nonce for invalidating old migrations on root update

```solidity
uint256 internal _currentMerkleNonce = 1;
```

### _migratedAmounts

Mapping of user => nonce => migrated amount

<i>

Nonce-based invalidation allows O(1) merkle root updates

</i>

```solidity
mapping(address user => mapping(uint256 nonce => uint256 amount)) private _migratedAmounts;
```

### totalMigrated

The total amount of OHM v1 migrated so far

```solidity
uint256 public override totalMigrated;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The total migrated amount |

## Functions

<a id="constructor-kernel-ierc20-igohm-bytes32"></a>

### constructor

```solidity
constructor(Kernel kernel_, IERC20 ohmV1_, IgOHM gOHM_, bytes32 merkleRoot_) Policy(kernel_);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| kernel_     | `Kernel`  |             |
| ohmV1_      | `IERC20`  |             |
| gOHM_       | `IgOHM`   |             |
| merkleRoot_ | `bytes32` |             |

<a id="ohmv1"></a>

### ohmV1

The OHM v1 token contract

```solidity
function ohmV1() external view returns (IERC20 ohmV1_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| ohmV1_ | `IERC20` | The OHM v1 token |

<a id="ohmv2"></a>

### ohmV2

The OHM v2 token contract

```solidity
function ohmV2() external view returns (IERC20 ohmV2_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| ohmV2_ | `IERC20` | The OHM v2 token |

<a id="gohm"></a>

### gOHM

The gOHM token contract used for conversion calculations

<i>

Used to calculate OHM v2 amount via balanceTo/balanceFrom to match production flow

</i>

```solidity
function gOHM() external view returns (address gOHM_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gOHM_ | `address` | The gOHM token |

<a id="remainingmintapproval"></a>

### remainingMintApproval

The remaining amount of OHM that can be minted by this contract

<i>

Returns the actual MINTR mint approval, not a stored value. This is the
remaining amount available for migration and is always in sync with MINTR state.

</i>

```solidity
function remainingMintApproval() external view returns (uint256 remaining_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remaining_ | `uint256` | The remaining OHM that can be minted |

<a id="migratedamounts-address"></a>

### migratedAmounts

The amount a user has migrated under the current root

<i>

Returns the migrated amount for the current merkle root nonce

</i>

```solidity
function migratedAmounts(address account_) external view returns (uint256 migratedAmount_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account to check |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| migratedAmount_ | `uint256` | The amount migrated by the user |

<a id="_calculateohmv2amount-uint256"></a>

### _calculateOHMv2Amount

Calculate OHM v2 amount from OHM v1 amount using gOHM conversion

<i>

Used by both migrate() and previewMigrate() to ensure consistency

</i>

```solidity
function _calculateOHMv2Amount(uint256 amount_) internal view returns (uint256 ohmV2Amount_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The OHM v1 amount (9 decimals) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| ohmV2Amount_ | `uint256` | The OHM v2 amount (9 decimals), or 0 if conversion rounds to zero |

<a id="previewmigrate-uint256"></a>

### previewMigrate

Preview the OHM v2 amount that will be received for a given OHM v1 amount

<i>

Performs the same gOHM conversion as migrate() without state changes.
Users migrating multiple times will lose dust on each transaction.
Recommended: migrate full allocation in one transaction.

</i>

```solidity
function previewMigrate(uint256 amount_) external view returns (uint256 ohmV2Amount_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of OHM v1 to preview (9 decimals) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| ohmV2Amount_ | `uint256` | The amount of OHM v2 that would be received (9 decimals), or 0 if conversion rounds to zero |

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
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="_enable-bytes"></a>

### _enable

Override _enable to accept initial remaining mint approval

<i>

The enableData should be ABI-encoded as (uint256 remainingApproval)

</i>

This allows setting the initial remaining mint approval when enabling the contract.
The merkle root is set in the constructor and cannot be changed via enable().

On re-enable, the MINTR approval is adjusted to match the provided remaining approval.

```solidity
function _enable(bytes calldata enableData_) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enableData_ | `bytes` | ABI-encoded (uint256 remainingApproval) |

<a id="_setremainingmintapproval-uint256"></a>

### _setRemainingMintApproval

Internal function to set the remaining MINTR mint approval

<i>

This sets the remaining allowance (not a lifetime total). The MINTR approval
represents how much OHM v2 can still be minted. When users migrate, the
approval decreases. This function synchronizes the approval to a target value.

</i>

```solidity
function _setRemainingMintApproval(uint256 approval_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| approval_ | `uint256` | The target remaining mint approval (in OHM v2 units) |

<a id="version"></a>

### VERSION

Returns the version of the contract

```solidity
function VERSION() external pure returns (uint8, uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| &lt;none&gt; | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

ERC165 interface support

<i>

Supports IERC165, IVersioned, IV1Migrator, and IEnabler (via PolicyEnabler)

</i>

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```

**Parameters**

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| interfaceId | `bytes4` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="_onlyadminorlegacymigrationadmin"></a>

### _onlyAdminOrLegacyMigrationAdmin

```solidity
function _onlyAdminOrLegacyMigrationAdmin() internal view;
```

<a id="onlyadminorlegacymigrationadmin"></a>

### onlyAdminOrLegacyMigrationAdmin

```solidity
modifier onlyAdminOrLegacyMigrationAdmin();
```

<a id="_verifyclaim-address-uint256-bytes32"></a>

### _verifyClaim

Internal function to verify a merkle proof

<i>

Uses double-hashing to prevent leaf collision attacks (OpenZeppelin standard)

</i>

```solidity
function _verifyClaim(
        address account_,
        uint256 allocatedAmount_,
        bytes32[] calldata proof_
    ) internal view returns (bool valid);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account to verify |
| allocatedAmount_ | `uint256` | The allocated amount to verify |
| proof_ | `bytes32[]` | The merkle proof |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| valid | `bool` | True if the proof is valid |

<a id="verifyclaim-address-uint256-bytes32"></a>

### verifyClaim

Verify if a claim is valid for a given account and allocated amount

```solidity
function verifyClaim(
        address account_,
        uint256 allocatedAmount_,
        bytes32[] calldata proof_
    ) external view returns (bool valid_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account to verify |
| allocatedAmount_ | `uint256` | The allocated amount to verify |
| proof_ | `bytes32[]` | The merkle proof |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| valid_ | `bool` | True if the claim is valid |

<a id="migrate-uint256-bytes32-uint256"></a>

### migrate

Migrate OHM v1 to OHM v2

<i>

User must approve this contract to transfer their OHM v1
Users can migrate any amount up to their allocated amount in multiple transactions

</i>

```solidity
function migrate(
        uint256 amount_,
        bytes32[] calldata proof_,
        uint256 allocatedAmount_
    ) external onlyEnabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of OHM v1 to migrate (9 decimals) |
| proof_ | `bytes32[]` | The merkle proof proving the user is eligible |
| allocatedAmount_ | `uint256` | The user's allocated amount from the merkle tree |

<a id="setmerkleroot-bytes32"></a>

### setMerkleRoot

Update the merkle root for eligible claims

<i>

When the merkle root is updated, the nonce is incremented.
This resets all previous migrations without needing to iterate over users.
The new merkle tree should reflect the amount each user can migrate going
forward (i.e., their current OHM v1 balance).

</i>

```solidity
function setMerkleRoot(bytes32 merkleRoot_) external onlyAdminOrLegacyMigrationAdmin;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| merkleRoot_ | `bytes32` | The new merkle root |

<a id="setremainingmintapproval-uint256"></a>

### setRemainingMintApproval

Set the remaining MINTR mint approval for migration

<i>

This sets the remaining amount that can be minted, NOT a lifetime total.
If you want 1000 OHM v2 to be available for migration and 600 has already
been minted, call this with 1000 (not 400). Queries the current MINTR
approval and adjusts it to the target approval.

</i>

```solidity
function setRemainingMintApproval(uint256 approval_) external onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| approval_ | `uint256` | The target remaining mint approval (9 decimals) |

<a id="rescue-ierc20"></a>

### rescue

Rescue accidentally sent tokens

<i>

Only callable by admin or legacy migration admin. Sweeps entire balance to caller.

</i>

```solidity
function rescue(IERC20 token_) external onlyAdminOrLegacyMigrationAdmin;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token_ | `IERC20` | The ERC20 token to rescue |
