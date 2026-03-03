# MigrationProposalHelper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/proposals/MigrationProposalHelper.sol)

**Inherits:**
Owned

forge-lint: disable-start(mixed-case-function,mixed-case-variable)

Single-use contract to execute OHM v1 migration to OHM v2 and burn

## State Variables

### TREASURY

```solidity
address public constant TREASURY = 0x31F8Cc382c9898b273eff4e0b7626a6987C846E8
```

### MIGRATOR

```solidity
address public constant MIGRATOR = 0x184f3FAd8618a6F458C16bae63F70C426fE784B3
```

### STAKING

```solidity
address public constant STAKING = 0xB63cac384247597756545b500253ff8E607a8020
```

### GOHM

```solidity
address public constant GOHM = 0x0ab87046fBb341D058F17CBC4c1133F25a20a52f
```

### OHMV1

```solidity
address public constant OHMV1 = 0x383518188C0C6d7730D91b2c03a03C837814a899
```

### OHMV2

```solidity
address public constant OHMV2 = 0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5
```

### BURNER

```solidity
address public immutable BURNER
```

### TEMPOHM

```solidity
address public immutable TEMPOHM
```

### ADMIN

Admin address that can update the OHM v1 migration limit

```solidity
address public immutable ADMIN
```

### OHMv1ToMigrate

Maximum amount of OHM v1 to migrate (1e9 decimals)

```solidity
uint256 public OHMv1ToMigrate
```

### MIGRATION_CATEGORY

```solidity
bytes32 public constant MIGRATION_CATEGORY = "migration"
```

### isActivated

True if the activation has been performed

```solidity
bool public isActivated = false
```

## Functions

### constructor

```solidity
constructor(address owner_, address admin_, address burner_, address tempOHM_, uint256 OHMv1ToMigrate_)
    Owned(owner_);
```

### _onlyOwnerOrAdmin

```solidity
function _onlyOwnerOrAdmin() internal view;
```

### onlyOwnerOrAdmin

Modifier to restrict access to owner or admin

```solidity
modifier onlyOwnerOrAdmin() ;
```

### setOHMv1ToMigrate

Set the maximum OHM v1 to migrate

Only callable by owner or admin. Updates the migration limit.

```solidity
function setOHMv1ToMigrate(uint256 maxOHMv1_) external onlyOwnerOrAdmin;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`maxOHMv1_`|`uint256`|The new maximum OHM v1 amount (1e9 decimals)|

### rescue

Rescue accidentally sent tokens

Only callable by owner or admin. Sweeps entire token balance to caller.

```solidity
function rescue(IERC20 token_) external onlyOwnerOrAdmin;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token_`|`IERC20`|The ERC20 token to rescue|

### getTempOHMToDeposit

Calculate the amount of tempOHM to deposit

This is based on the OHMv1ToMigrate amount, converted to 1e18 decimals

```solidity
function getTempOHMToDeposit() public view returns (uint256);
```

### activate

Executes the migration process

This function assumes:

- The "burner_admin" role has been granted to this contract
- The caller (owner) has approved tempOHM to this contract
- The caller (owner) has tempOHM balance
Any tempOHM in excess of OHMv1ToMigrate * 1e9 will be burned.
This is intentional: tempOHM has no utility after migration completes.
This function reverts if:
- The caller is not the owner
- The function has already been run

```solidity
function activate() external onlyOwner;
```

### _depositTempOHMToTreasury

Transfer all tempOHM from owner and deposit the calculated amount to treasury

Transfers ALL tempOHM from owner but deposits only getTempOHMToDeposit().
Excess is burned by _burnExcess() (tempOHM has no post-migration utility).

```solidity
function _depositTempOHMToTreasury() internal returns (uint256 ohmV1Minted);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ohmV1Minted`|`uint256`|The amount of OHM v1 minted from the deposit|

### _migrateOHMv1ToGOHM

Migrate OHMv1 to gOHM via migrator

```solidity
function _migrateOHMv1ToGOHM(uint256 ohmV1Amount) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`ohmV1Amount`|`uint256`|The amount of OHM v1 to migrate|

### _burnExcess

Burn any excess tempOHM and OHM v1 remaining after migration

Intentional cleanup: tempOHM has no utility after gOHM migration.
Also burns any OHM v1 left from partial migration failures.

```solidity
function _burnExcess() internal;
```

### _unstakeAndBurn

Unstake gOHM to OHMv2 and burn

```solidity
function _unstakeAndBurn() internal;
```

## Events

### Activated

```solidity
event Activated(address caller);
```

### OHMv1ToMigrateUpdated

```solidity
event OHMv1ToMigrateUpdated(uint256 newMax);
```

### Rescued

```solidity
event Rescued(address indexed token, address indexed to, uint256 amount);
```

## Errors

### AlreadyActivated

```solidity
error AlreadyActivated();
```

### InvalidParams

```solidity
error InvalidParams(string reason);
```

### Unauthorized

```solidity
error Unauthorized();
```
