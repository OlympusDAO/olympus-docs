# OlympusHeart

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/Heart.sol)

**Inherits:** [IHeart](/main/contracts/docs/src/policies/interfaces/IHeart.sol/interface.IHeart), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), ReentrancyGuard, [BasePeriodicTaskManager](/main/contracts/docs/src/bases/BasePeriodicTaskManager.sol/abstract.BasePeriodicTaskManager)

**Title:** Olympus Heart

Olympus Heart (Policy) Contract

<i>

The Olympus Heart contract provides keeper rewards to call the heart beat function which fuels
Olympus market operations. The Heart orchestrates state updates in the correct order to ensure
market operations use up to date information.
This version implements an auction style reward system where the reward is linearly increasing up to a max reward.
Rewards are issued in OHM.

</i>

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

### PRICE

```solidity
PRICEv1 internal PRICE;
```

### MINTR

```solidity
MINTRv1 internal MINTR;
```

### distributor

```solidity
IDistributor public distributor;
```

## Functions

<a id="constructor-kernel-idistributor-uint256-uint48"></a>

### constructor

<i>

Auction duration must be less than or equal to frequency, but we cannot validate that in the constructor because PRICE is not yet set.
Therefore, manually ensure that the value is valid when deploying the contract.

</i>

```solidity
constructor(
        Kernel kernel_,
        IDistributor distributor_,
        uint256 maxReward_,
        uint48 auctionDuration_
    ) Policy(kernel_);
```

**Parameters**

| Name             | Type           | Description |
| ---------------- | -------------- | ----------- |
| kernel_          | `Kernel`       |             |
| distributor_     | `IDistributor` |             |
| maxReward_       | `uint256`      |             |
| auctionDuration_ | `uint48`       |             |

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

<a id="version"></a>

### VERSION

Returns the version of the policy.

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | The major version of the policy. |
| minor | `uint8` | The minor version of the policy. |

<a id="beat"></a>

### beat

Beats the heart

Only callable when enough time has passed since last beat (determined by frequency variable)

This function is incentivized with a token reward (see rewardToken and reward variables).

<i>

Triggers price oracle update and market operations

</i>

```solidity
function beat() external nonReentrant;
```

<a id="_syncbeatwithdistributor"></a>

### _syncBeatWithDistributor

```solidity
function _syncBeatWithDistributor() internal;
```

<a id="_resetbeat"></a>

### _resetBeat

```solidity
function _resetBeat() internal;
```

<a id="resetbeat"></a>

### resetBeat

Unlocks the cycle if stuck on one side, eject function

Access restricted

<i>

This function is gated to the ADMIN or MANAGER roles

</i>

```solidity
function resetBeat() external onlyManagerOrAdminRole;
```

<a id="_enable-bytes"></a>

### _enable

Implementation-specific enable function

The implementing contract can override this function and perform the following:

1. Validate any parameters (if needed) or revert

2. Validate state (if needed) or revert

3. Perform any necessary actions, apart from modifying the `isEnabled` state variable

<i>

This function is called by the `enable()` function

</i>

```solidity
function _enable(bytes calldata) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` | Custom data that can be used by the implementation. The format of this data is<br/>left to the discretion of the implementation. |

<a id="setdistributor-address"></a>

### setDistributor

Updates the Distributor contract address that the Heart calls on a beat

Access restricted

<i>

This function is gated to the ADMIN role

</i>

```solidity
function setDistributor(address distributor_) external onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| distributor_ | `address` | The address of the new Distributor contract |

<a id="notwhilebeatavailable"></a>

### notWhileBeatAvailable

```solidity
modifier notWhileBeatAvailable();
```

<a id="setrewardauctionparams-uint256-uint48"></a>

### setRewardAuctionParams

Sets the max reward amount, and auction duration for the beat function

Access restricted

<i>

This function is gated to the ADMIN role

</i>

```solidity
function setRewardAuctionParams(
        uint256 maxReward_,
        uint48 auctionDuration_
    ) external onlyAdminRole notWhileBeatAvailable;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxReward_ | `uint256` | - New max reward amount, in units of the reward token |
| auctionDuration_ | `uint48` | - New auction duration, in seconds |

<a id="frequency"></a>

### frequency

Heart beat frequency, in seconds

```solidity
function frequency() public view returns (uint48);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

<a id="currentreward"></a>

### currentReward

Current reward amount based on linear auction

```solidity
function currentReward() public view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |
