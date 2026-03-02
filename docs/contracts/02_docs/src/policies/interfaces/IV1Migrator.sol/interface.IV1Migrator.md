# IV1Migrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/policies/interfaces/IV1Migrator.sol)

**Inherits:**
[IEnabler](/main/contracts/docs/src/periphery/interfaces/IEnabler.sol/interface.IEnabler), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

**Title:**
IV1Migrator

forge-lint: disable-start(mixed-case-function,mixed-case-variable)

Interface for the V1Migrator policy that allows OHM v1 holders to migrate to OHM v2
via merkle proof verification

## Functions

### ohmV1

The OHM v1 token contract

```solidity
function ohmV1() external view returns (IERC20 ohmV1_);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ohmV1_`|`IERC20`|The OHM v1 token|

### ohmV2

The OHM v2 token contract

```solidity
function ohmV2() external view returns (IERC20 ohmV2_);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ohmV2_`|`IERC20`|The OHM v2 token|

### gOHM

The gOHM token contract used for conversion calculations

Used to calculate OHM v2 amount via balanceTo/balanceFrom to match production flow

```solidity
function gOHM() external view returns (address gOHM_);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`gOHM_`|`address`|The gOHM token|

### merkleRoot

The current merkle root for verifying eligible claims

```solidity
function merkleRoot() external view returns (bytes32 merkleRoot_);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`merkleRoot_`|`bytes32`|The current merkle root|

### migratedAmounts

The amount a user has migrated under the current root

```solidity
function migratedAmounts(address account_) external view returns (uint256 migratedAmount_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|The account to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`migratedAmount_`|`uint256`|The amount migrated by the user|

### remainingMintApproval

The remaining amount of OHM that can be minted by this contract

Returns the actual MINTR mint approval, not a stored value. This is the
remaining amount available for migration and is always in sync with MINTR state.

```solidity
function remainingMintApproval() external view returns (uint256 remaining_);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`remaining_`|`uint256`|The remaining OHM that can be minted|

### totalMigrated

The total amount of OHM v1 migrated so far

```solidity
function totalMigrated() external view returns (uint256 totalMigrated_);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`totalMigrated_`|`uint256`|The total migrated amount|

### previewMigrate

Preview the OHM v2 amount that will be received for a given OHM v1 amount

Performs the same gOHM conversion as migrate() without state changes.
Users migrating multiple times will lose dust on each transaction.
Recommended: migrate full allocation in one transaction.

```solidity
function previewMigrate(uint256 amount_) external view returns (uint256 ohmV2Amount_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|The amount of OHM v1 to preview (9 decimals)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ohmV2Amount_`|`uint256`|The amount of OHM v2 that would be received (9 decimals), or 0 if conversion rounds to zero|

### migrate

Migrate OHM v1 to OHM v2

User must approve this contract to transfer their OHM v1
Users can migrate any amount up to their allocated amount in multiple transactions

```solidity
function migrate(uint256 amount_, bytes32[] calldata proof_, uint256 allocatedAmount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|The amount of OHM v1 to migrate (9 decimals)|
|`proof_`|`bytes32[]`|The merkle proof proving the user is eligible|
|`allocatedAmount_`|`uint256`|The user's allocated amount from the merkle tree|

### setMerkleRoot

Update the merkle root for eligible claims

```solidity
function setMerkleRoot(bytes32 merkleRoot_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`merkleRoot_`|`bytes32`|The new merkle root|

### setRemainingMintApproval

Set the remaining MINTR mint approval for migration

This sets the remaining amount that can be minted, NOT a lifetime total.
If you want 1000 OHM v2 to be available for migration and 600 has already
been minted, call this with 1000 (not 400). Queries the current MINTR
approval and adjusts it to the target approval.

```solidity
function setRemainingMintApproval(uint256 approval_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`approval_`|`uint256`|The target remaining mint approval (9 decimals)|

### rescue

Rescue accidentally sent tokens

Only callable by admin or legacy migration admin. Sweeps entire balance to caller.

```solidity
function rescue(IERC20 token_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token_`|`IERC20`|The ERC20 token to rescue|

### verifyClaim

Verify if a claim is valid for a given account and allocated amount

```solidity
function verifyClaim(address account_, uint256 allocatedAmount_, bytes32[] calldata proof_)
    external
    view
    returns (bool valid_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|The account to verify|
|`allocatedAmount_`|`uint256`|The allocated amount to verify|
|`proof_`|`bytes32[]`|The merkle proof|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`valid_`|`bool`|True if the claim is valid|

## Events

### Migrated

Emitted when a user successfully migrates OHM v1 to OHM v2

```solidity
event Migrated(address indexed user, uint256 ohmV1Amount, uint256 ohmV2Amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The address of the user migrating|
|`ohmV1Amount`|`uint256`|The amount of OHM v1 burned|
|`ohmV2Amount`|`uint256`|The amount of OHM v2 minted|

### MerkleRootUpdated

Emitted when the merkle root is updated

```solidity
event MerkleRootUpdated(bytes32 indexed newRoot, address indexed updater);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newRoot`|`bytes32`|The new merkle root|
|`updater`|`address`|The address that updated the root|

### RemainingMintApprovalUpdated

Emitted when the remaining mint approval is updated

```solidity
event RemainingMintApprovalUpdated(uint256 indexed newApproval, uint256 indexed oldApproval);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newApproval`|`uint256`|The new remaining mint approval|
|`oldApproval`|`uint256`|The old remaining mint approval|

### Rescued

Emitted when tokens are rescued from the contract

```solidity
event Rescued(address indexed token, address indexed to, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The rescued token address|
|`to`|`address`|The recipient address|
|`amount`|`uint256`|The amount rescued|

## Errors

### InvalidProof

Thrown when the provided merkle proof is invalid

```solidity
error InvalidProof();
```

### AmountExceedsAllowance

Thrown when the amount exceeds the user's allocation

```solidity
error AmountExceedsAllowance(uint256 requested, uint256 allocated, uint256 migrated);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`requested`|`uint256`|The amount requested to migrate|
|`allocated`|`uint256`|The user's allocated amount from the merkle tree|
|`migrated`|`uint256`|The amount already migrated by the user|

### CapExceeded

Thrown when the migration cap would be exceeded

```solidity
error CapExceeded(uint256 amount, uint256 remaining);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount requested to migrate|
|`remaining`|`uint256`|The remaining MINTR approval for the migrator contract|

### ZeroAmount

Thrown when the OHM v2 amount after gOHM conversion is zero

This can happen when the input OHM v1 amount is very small and
gOHM conversion rounds down to zero

```solidity
error ZeroAmount();
```

### ZeroAddress

Thrown when an address parameter is zero

```solidity
error ZeroAddress();
```

### SameMerkleRoot

Thrown when attempting to set the same merkle root that is already set

```solidity
error SameMerkleRoot();
```
