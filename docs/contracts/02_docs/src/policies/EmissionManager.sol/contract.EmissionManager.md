# EmissionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/EmissionManager.sol)

**Inherits:** [IEmissionManager](/main/contracts/docs/src/policies/interfaces/IEmissionManager.sol/interface.IEmissionManager), [IPeriodicTask](/main/contracts/docs/src/interfaces/IPeriodicTask.sol/interface.IPeriodicTask), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler)

## Constants

### ONE_HUNDRED_PERCENT

```solidity
uint256 internal constant ONE_HUNDRED_PERCENT = 1e18;
```

### MAX_BOND_MARKET_CAPACITY_SCALAR

```solidity
uint256 internal constant MAX_BOND_MARKET_CAPACITY_SCALAR = 2e18;
```

### ROLE_HEART

The role assigned to the Heart contract.
This enables the Heart contract to call specific functions on this contract.

```solidity
bytes32 public constant ROLE_HEART = "heart";
```

### ROLE_EM_MANAGER

The role defined for the manager of this contract

```solidity
bytes32 public constant ROLE_EM_MANAGER = "em_manager";
```

### ENABLE_PARAMS_LENGTH

The length of the `EnableParams` struct in bytes

```solidity
uint256 internal constant ENABLE_PARAMS_LENGTH = 224;
```

### ohm

```solidity
ERC20 public immutable ohm;
```

### gohm

```solidity
IgOHM public immutable gohm;
```

### reserve

```solidity
ERC20 public immutable reserve;
```

### sReserve

```solidity
ERC4626 public immutable sReserve;
```

### _ohmDecimals

```solidity
uint8 internal immutable _ohmDecimals;
```

### _gohmDecimals

```solidity
uint8 internal immutable _gohmDecimals;
```

### _reserveDecimals

```solidity
uint8 internal immutable _reserveDecimals;
```

## State Variables

### rateChange

active base emissions rate change information

<i>

active until daysLeft is 0

</i>

```solidity
BaseRateChange public rateChange;
```

### TRSRY

```solidity
TRSRYv1 public TRSRY;
```

### PRICE

```solidity
PRICEv1 public PRICE;
```

### MINTR

```solidity
MINTRv1 public MINTR;
```

### CHREG

```solidity
CHREGv1 public CHREG;
```

### bondAuctioneer

```solidity
IBondSDA public bondAuctioneer;
```

### teller

```solidity
address public teller;
```

### cdAuctioneer

```solidity
IConvertibleDepositAuctioneer public cdAuctioneer;
```

### baseEmissionRate

The base emission rate, in OHM scale.

<i>

e.g. 2e5 = 0.02%

</i>

```solidity
uint256 public baseEmissionRate;
```

### minimumPremium

The minimum premium for bond markets created by the manager, in terms of ONE_HUNDRED_PERCENT.

<i>

A minimum premium of 1e18 would require the market price to be 100% above the backing price (i.e. double).

</i>

```solidity
uint256 public minimumPremium;
```

### vestingPeriod

The vesting period for bond markets created by the manager, in seconds.

<i>

Initialized at 0, which means no vesting.

</i>

```solidity
uint48 public vestingPeriod;
```

### backing

The backed price of OHM, in reserve scale.

```solidity
uint256 public backing;
```

### beatCounter

Used to track the number of beats that have occurred.

```solidity
uint8 public beatCounter;
```

### activeMarketId

The ID of the active bond market (or 0)

```solidity
uint256 public activeMarketId;
```

### tickSize

The fixed tick size for CD auctions, in OHM scale (9 decimals)

```solidity
uint256 public tickSize;
```

### minPriceScalar

The multiplier applied to the price, in terms of ONE_HUNDRED_PERCENT

<i>

The value must be greater than or equal to ONE_HUNDRED_PERCENT (100%)

</i>

```solidity
uint256 public minPriceScalar;
```

### bondMarketCapacityScalar

The multiplier applied to bond market capacity from auction remainders, in terms of ONE_HUNDRED_PERCENT

<i>

The value must be between 0 and MAX_BOND_MARKET_CAPACITY_SCALAR (0-200%)

</i>

```solidity
uint256 public bondMarketCapacityScalar;
```

### _oracleDecimals

```solidity
uint8 internal _oracleDecimals;
```

### shutdownTimestamp

timestamp of last shutdown

```solidity
uint48 public shutdownTimestamp;
```

### restartTimeframe

time in seconds that the manager needs to be restarted after a shutdown, otherwise it must be re-initialized

```solidity
uint48 public restartTimeframe;
```

### bondMarketPendingCapacity

In situations where a bond market cannot be created, this variable is used to record the OHM capacity for the bond market that needs to be created

```solidity
uint256 public bondMarketPendingCapacity;
```

## Functions

<a id="constructor-kernel-address-address-address-address-address-address-address"></a>

### constructor

```solidity
constructor(
        Kernel kernel_,
        address ohm_,
        address gohm_,
        address reserve_,
        address sReserve_,
        address bondAuctioneer_,
        address cdAuctioneer_,
        address teller_
    ) Policy(kernel_);
```

**Parameters**

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| kernel_         | `Kernel`  |             |
| ohm_            | `address` |             |
| gohm_           | `address` |             |
| reserve_        | `address` |             |
| sReserve_       | `address` |             |
| bondAuctioneer_ | `address` |             |
| cdAuctioneer_   | `address` |             |
| teller_         | `address` |             |

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

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

**Returns**

| Name  | Type    | Description |
| ----- | ------- | ----------- |
| major | `uint8` |             |
| minor | `uint8` |             |

<a id="execute"></a>

### execute

<i>

This function performs the following:

- Adjusts the beat counter
- Exits if the beat counter is not 0
- Sets the parameters for the auction
- If the auction tracking period has finished and there is a deficit of OHM sold, attempts to create a bond market
- If market creation fails (external dependency), emits BondMarketCreationFailed and continues execution

</i>

Notes:

- If the CD auction is not running (e.g. the auctioneer contract is disabled), this function will consider OHM to have been under-sold across the auction tracking period. This will result in a bond market being created at the end of the auction tracking period in an attempt to sell the remaining OHM.
- If there are delays in the heartbeat (which calls this function), auction result tracking will be affected.

```solidity
function execute() external onlyRole(ROLE_HEART);
```

<a id="_enable-bytes"></a>

### _enable

Implementation-specific enable function

The implementing contract can override this function and perform the following:

1. Validate any parameters (if needed) or revert

2. Validate state (if needed) or revert

3. Perform any necessary actions, apart from modifying the `isEnabled` state variable

<i>

This function expects the parameters to be an abi-encoded `EnableParams` struct

</i>

```solidity
function _enable(bytes calldata params_) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| params_ | `bytes` | Custom data that can be used by the implementation. The format of this data is<br/>left to the discretion of the implementation. |

<a id="callback-uint256-uint256-uint256"></a>

### callback

callback function for bond market, only callable by the teller

```solidity
function callback(uint256 id_, uint256 inputAmount_, uint256 outputAmount_) external;
```

**Parameters**

| Name          | Type      | Description |
| ------------- | --------- | ----------- |
| id_           | `uint256` |             |
| inputAmount_  | `uint256` |             |
| outputAmount_ | `uint256` |             |

<a id="_createmarket-uint256"></a>

### _createMarket

create bond protocol market with given budget

```solidity
function _createMarket(uint256 saleAmount) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| saleAmount | `uint256` | amount of DAI to fund bond market with |

<a id="_updatebacking-uint256-uint256"></a>

### _updateBacking

allow emission manager to update backing price based on new supply and reserves added

```solidity
function _updateBacking(uint256 supplyAdded, uint256 reservesAdded) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| supplyAdded | `uint256` | number of new OHM minted |
| reservesAdded | `uint256` | number of new DAI added |

<a id="_getpricedecimals-uint256"></a>

### _getPriceDecimals

Helper function to calculate number of price decimals based on the value returned from the price feed.

```solidity
function _getPriceDecimals(uint256 price_) internal view returns (int8);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| price_ | `uint256` | The price to calculate the number of decimals for |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `int8` | The number of decimals |

<a id="_onlyadminoremmanagerrole"></a>

### _onlyAdminOrEmManagerRole

Reverts if the caller does not have the admin or em_manager role

```solidity
function _onlyAdminOrEmManagerRole() internal view;
```

<a id="onlyadminoremmanagerrole"></a>

### onlyAdminOrEmManagerRole

```solidity
modifier onlyAdminOrEmManagerRole();
```

<a id="_disable-bytes"></a>

### _disable

Implementation-specific disable function

The implementing contract can override this function and perform the following:

1. Validate any parameters (if needed) or revert

2. Validate state (if needed) or revert

3. Perform any necessary actions, apart from modifying the `isEnabled` state variable

<i>

This function performs the following:

- Sets the shutdown timestamp
- Closes the active bond market (if it is active)
- Disables the convertible deposit auction

</i>

```solidity
function _disable(bytes calldata) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` | Custom data that can be used by the implementation. The format of this data is<br/>left to the discretion of the implementation. |

<a id="restart"></a>

### restart

Restart the emission manager

<i>

This function reverts if:

- The caller does not have the admin role
- The restart timeframe has passed since shutdown

</i>

```solidity
function restart() external onlyAdminRole;
```

<a id="rescue-address"></a>

### rescue

Rescue any ERC20 token sent to this contract and send it to the TRSRY

<i>

This function is restricted to the ADMIN role

</i>

```solidity
function rescue(address token_) external onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token_ | `address` | The address of the ERC20 token to rescue |

<a id="changebaserate-uint256-uint48-bool"></a>

### changeBaseRate

Set the base emissions rate

<i>

This function reverts if:

- The caller does not have the admin or em_manager role
- There is an underflow or overflow on adjustments

</i>

```solidity
function changeBaseRate(
        uint256 changeBy_,
        uint48 forNumBeats_,
        bool add
    ) external onlyAdminOrEmManagerRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| changeBy_ | `uint256` | uint256 added or subtracted from baseEmissionRate |
| forNumBeats_ | `uint48` | uint256 number of times to change baseEmissionRate by changeBy_ |
| add | `bool` | bool determining addition or subtraction to baseEmissionRate |

<a id="setminimumpremium-uint256"></a>

### setMinimumPremium

Set the minimum premium for emissions

<i>

This function reverts if:

- The caller does not have the admin or em_manager role
- newMinimumPremium_ is 0

</i>

```solidity
function setMinimumPremium(uint256 newMinimumPremium_) external onlyAdminOrEmManagerRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newMinimumPremium_ | `uint256` | The new minimum premium, in terms of ONE_HUNDRED_PERCENT |

<a id="setvestingperiod-uint48"></a>

### setVestingPeriod

Set the new bond vesting period in seconds

<i>

This function reverts if:

- The caller does not have the admin role
- newVestingPeriod_ is more than 31536000 (1 year in seconds)

</i>

```solidity
function setVestingPeriod(uint48 newVestingPeriod_) external onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newVestingPeriod_ | `uint48` | uint48 |

<a id="setbacking-uint256"></a>

### setBacking

Allow governance to adjust backing price if deviated from reality

<i>

This function reverts if:

- The caller does not have the admin role
- newBacking is 0
- newBacking is less than 90% of current backing (to prevent large sudden drops)

</i>

Note: if adjustment is more than 33% down, contract should be redeployed

```solidity
function setBacking(uint256 newBacking) external onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newBacking | `uint256` | to adjust to<br/>TODO maybe put in a timespan arg so it can be smoothed over time if desirable |

<a id="setrestarttimeframe-uint48"></a>

### setRestartTimeframe

Allow governance to adjust the timeframe for restart after shutdown

<i>

This function reverts if:

- The caller does not have the admin role
- newTimeframe is 0

</i>

```solidity
function setRestartTimeframe(uint48 newTimeframe) external onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTimeframe | `uint48` | to adjust it to |

<a id="setbondcontracts-address-address"></a>

### setBondContracts

allow governance to set the bond contracts used by the emission manager

<i>

This function reverts if:

- The caller does not have the admin role
- bondAuctioneer_ is the zero address
- teller_ is the zero address

</i>

```solidity
function setBondContracts(address bondAuctioneer_, address teller_) external onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bondAuctioneer_ | `address` | address of the bond auctioneer contract |
| teller_ | `address` | address of the bond teller contract |

<a id="setcdauctioncontract-address"></a>

### setCDAuctionContract

Allow governance to set the CD contract used by the emission manager

<i>

This function reverts if:

- The caller does not have the admin role
- cdAuctioneer_ is the zero address
- The deposit asset of the CDAuctioneer is not the same as the reserve asset in this contract

</i>

```solidity
function setCDAuctionContract(address cdAuctioneer_) external onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| cdAuctioneer_ | `address` | address of the cd auctioneer contract |

<a id="setticksize-uint256"></a>

### setTickSize

Allow governance to set the CD tick size

<i>

This function reverts if:

- The caller does not have the admin or em_manager role
- newTickSize_ is 0

</i>

```solidity
function setTickSize(uint256 newTickSize_) external onlyAdminOrEmManagerRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newTickSize_ | `uint256` | as a fixed amount in OHM decimals (9) |

<a id="setminpricescalar-uint256"></a>

### setMinPriceScalar

Allow governance to set the CD minimum price scalar

<i>

This function reverts if:

- The caller does not have the admin or em_manager role
- newScalar is less than ONE_HUNDRED_PERCENT (100% in 18 decimals)

</i>

```solidity
function setMinPriceScalar(uint256 newScalar) external onlyAdminOrEmManagerRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newScalar | `uint256` | as a percentage in 18 decimals |

<a id="setbondmarketcapacityscalar-uint256"></a>

### setBondMarketCapacityScalar

Allow governance to set the bond market capacity scalar, which acts as a multiplier for the bond market capacity

<i>

This function reverts if:

- The caller does not have the admin or em_manager role
- newScalar is greater than MAX_BOND_MARKET_CAPACITY_SCALAR (200%)

</i>

```solidity
function setBondMarketCapacityScalar(uint256 newScalar) external onlyAdminOrEmManagerRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newScalar | `uint256` | as a percentage in 18 decimals |

<a id="getreserves"></a>

### getReserves

return reserves, measured as clearinghouse receivables and sReserve balances, in reserve denomination

```solidity
function getReserves() public view returns (uint256 reserves);
```

**Returns**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| reserves | `uint256` |             |

<a id="getsupply"></a>

### getSupply

return supply, measured as supply of gOHM in OHM denomination

```solidity
function getSupply() public view returns (uint256 supply);
```

**Returns**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| supply | `uint256` |             |

<a id="getpremium"></a>

### getPremium

return the current premium as a percentage where 1e18 is 100%

```solidity
function getPremium() public view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="getnextemission"></a>

### getNextEmission

return the next sale amount, premium, emission rate, and emissions based on the current premium

```solidity
function getNextEmission()
        public
        view
        returns (uint256 premium, uint256 emissionRate, uint256 emission);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| premium      | `uint256` |             |
| emissionRate | `uint256` |             |
| emission     | `uint256` |             |

<a id="getsizefor-uint256"></a>

### getSizeFor

Get the auction tick size for a given target

<i>

Returns the standard tick size if the target emission is at least the standard tick size.
Otherwise, 0 is returned to indicate that the auction should be disabled.

</i>

```solidity
function getSizeFor(uint256 target) public view returns (uint256 size);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| target | `uint256` | size of day's CD auction |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| size | `uint256` | of tick |

<a id="getminpricefor-uint256"></a>

### getMinPriceFor

Get CD auction minimum price for a given price input

<i>

Expects `price` to already be expressed in the reserve asset's decimal scale.
This function does not adjust/convert decimal scales.

</i>

```solidity
function getMinPriceFor(uint256 price) public view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| price | `uint256` | Price of OHM in reserve token terms, scaled to the reserve asset's decimals |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="_getcurrentprice"></a>

### _getCurrentPrice

Returns the current price from the PRICE module

```solidity
function _getCurrentPrice() internal view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | currentPrice with decimal scale of the reserve asset |

<a id="creatependingbondmarket"></a>

### createPendingBondMarket

Creates a bond market

<i>

Notes:

- If there is no pending capacity, no bond market will be created

</i>

This function will revert if:

- The caller is not this contract, or an address with the admin/manager role
- The contract is disabled
- The bond market cannot be created

```solidity
function createPendingBondMarket() external onlyEnabled;
```

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(PolicyEnabler, IPeriodicTask) returns (bool);
```

**Parameters**

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| interfaceId | `bytes4` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |
