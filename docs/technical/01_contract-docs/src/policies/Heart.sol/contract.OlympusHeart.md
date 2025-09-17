# OlympusHeart

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/Heart.sol)

**Inherits:**
[IHeart](/main/technical/contract-docs/src/policies/interfaces/IHeart.sol/interface.IHeart), [Policy](/main/technical/contract-docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/technical/contract-docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer), ReentrancyGuard

Olympus Heart (Policy) Contract

*The Olympus Heart contract provides keeper rewards to call the heart beat function which fuels
Olympus market operations. The Heart orchestrates state updates in the correct order to ensure
market operations use up to date information.
This version implements an auction style reward system where the reward is linearly increasing up to a max reward.
Rewards are issued in OHM.*

## State Variables

### lastBeat

Timestamp of the last beat (UTC, in seconds)

```solidity
uint48 public lastBeat;
```

### auctionDuration

Duration of the reward auction (in seconds)

```solidity
uint48 public auctionDuration;
```

### maxReward

Max reward for beating the Heart (in reward token decimals)

```solidity
uint256 public maxReward;
```

### active

Status of the Heart, false = stopped, true = beating

```solidity
bool public active;
```

### PRICE

```solidity
PRICEv1 internal PRICE;
```

### MINTR

```solidity
MINTRv1 internal MINTR;
```

### operator

```solidity
IOperator public operator;
```

### distributor

```solidity
IDistributor public distributor;
```

### yieldRepo

```solidity
IYieldRepo public yieldRepo;
```

### reserveMigrator

```solidity
IReserveMigrator public reserveMigrator;
```

### emissionManager

```solidity
IEmissionManager public emissionManager;
```

## Functions

### constructor

*Auction duration must be less than or equal to frequency, but we cannot validate that in the constructor because PRICE is not yet set.
Therefore, manually ensure that the value is valid when deploying the contract.*

```solidity
constructor(
    Kernel kernel_,
    IOperator operator_,
    IDistributor distributor_,
    IYieldRepo yieldRepo_,
    IReserveMigrator reserveMigrator_,
    IEmissionManager emissionManager_,
    uint256 maxReward_,
    uint48 auctionDuration_
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

### VERSION

Returns the version of the policy.

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|The major version of the policy.|
|`minor`|`uint8`|The minor version of the policy.|

### beat

Beats the heart

*Triggers price oracle update and market operations*

```solidity
function beat() external nonReentrant;
```

### _syncBeatWithDistributor

```solidity
function _syncBeatWithDistributor() internal;
```

### _resetBeat

```solidity
function _resetBeat() internal;
```

### resetBeat

Unlocks the cycle if stuck on one side, eject function

```solidity
function resetBeat() external onlyRole("heart_admin");
```

### activate

Turns the heart on and resets the beat

*This function is used to restart the heart after a pause*

```solidity
function activate() external onlyRole("heart_admin");
```

### deactivate

Turns the heart off

*Emergency stop function for the heart*

```solidity
function deactivate() external onlyRole("heart_admin");
```

### setOperator

Updates the Operator contract address that the Heart calls on a beat

```solidity
function setOperator(address operator_) external onlyRole("heart_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator_`|`address`|The address of the new Operator contract|

### setDistributor

Updates the Distributor contract address that the Heart calls on a beat

```solidity
function setDistributor(address distributor_) external onlyRole("heart_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`distributor_`|`address`|The address of the new Distributor contract|

### setYieldRepo

Updates the YieldRepo contract address that the Heart calls on a beat

```solidity
function setYieldRepo(address yieldRepo_) external onlyRole("heart_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`yieldRepo_`|`address`|The address of the new YieldRepo contract|

### setReserveMigrator

Updates the ReserveMigrator contract address that the Heart calls on a beat

```solidity
function setReserveMigrator(address reserveMigrator_) external onlyRole("heart_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reserveMigrator_`|`address`|The address of the new ReserveMigrator contract|

### setEmissionManager

Updates the EmissionManager contract address that the Heart calls on a beat

```solidity
function setEmissionManager(address emissionManager_) external onlyRole("heart_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`emissionManager_`|`address`|The address of the new EmissionManager contract|

### notWhileBeatAvailable

```solidity
modifier notWhileBeatAvailable();
```

### setRewardAuctionParams

Sets the max reward amount, and auction duration for the beat function

```solidity
function setRewardAuctionParams(uint256 maxReward_, uint48 auctionDuration_)
    external
    onlyRole("heart_admin")
    notWhileBeatAvailable;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`maxReward_`|`uint256`|- New max reward amount, in units of the reward token|
|`auctionDuration_`|`uint48`|- New auction duration, in seconds|

### frequency

Heart beat frequency, in seconds

```solidity
function frequency() public view returns (uint48);
```

### currentReward

Current reward amount based on linear auction

```solidity
function currentReward() public view returns (uint256);
```
