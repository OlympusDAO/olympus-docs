# EmissionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/EmissionManager.sol)

**Inherits:**
[IEmissionManager](/main/technical/contract-docs/src/policies/interfaces/IEmissionManager.sol/interface.IEmissionManager), [Policy](/main/technical/contract-docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/technical/contract-docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## State Variables

### rateChange

active base emissions rate change information

*active until daysLeft is 0*

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

### auctioneer

```solidity
IBondSDA public auctioneer;
```

### teller

```solidity
address public teller;
```

### baseEmissionRate

```solidity
uint256 public baseEmissionRate;
```

### minimumPremium

```solidity
uint256 public minimumPremium;
```

### vestingPeriod

```solidity
uint48 public vestingPeriod;
```

### backing

```solidity
uint256 public backing;
```

### beatCounter

```solidity
uint8 public beatCounter;
```

### locallyActive

```solidity
bool public locallyActive;
```

### activeMarketId

```solidity
uint256 public activeMarketId;
```

### _oracleDecimals

```solidity
uint8 internal _oracleDecimals;
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

### ONE_HUNDRED_PERCENT

```solidity
uint256 internal constant ONE_HUNDRED_PERCENT = 1e18;
```

## Functions

### constructor

```solidity
constructor(
    Kernel kernel_,
    address ohm_,
    address gohm_,
    address reserve_,
    address sReserve_,
    address auctioneer_,
    address teller_
) Policy(kernel_);
```

### configureDependencies

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

### requestPermissions

```solidity
function requestPermissions() external view override returns (Permissions[] memory permissions);
```

### execute

calculate and execute sale, if applicable, once per day (every 3 beats)

*this function is restricted to the heart role and is called on each heart beat*

```solidity
function execute() external onlyRole("heart");
```

### initialize

allow governance to initialize the emission manager

```solidity
function initialize(uint256 baseEmissionsRate_, uint256 minimumPremium_, uint256 backing_, uint48 restartTimeframe_)
    external
    onlyRole("emissions_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`baseEmissionsRate_`|`uint256`|percent of OHM supply to issue per day at the minimum premium, in OHM scale, i.e. 1e9 = 100%|
|`minimumPremium_`|`uint256`|minimum premium at which to issue OHM, a percentage where 1e18 is 100%|
|`backing_`|`uint256`|backing price of OHM in reserve token, in reserve scale|
|`restartTimeframe_`|`uint48`|time in seconds that the manager needs to be restarted after a shutdown, otherwise it must be re-initialized|

### callback

callback function for bond market, only callable by the teller

```solidity
function callback(uint256 id_, uint256 inputAmount_, uint256 outputAmount_) external;
```

### _createMarket

create bond protocol market with given budget

```solidity
function _createMarket(uint256 saleAmount) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`saleAmount`|`uint256`|amount of DAI to fund bond market with|

### _updateBacking

allow emission manager to update backing price based on new supply and reserves added

```solidity
function _updateBacking(uint256 supplyAdded, uint256 reservesAdded) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`supplyAdded`|`uint256`|number of new OHM minted|
|`reservesAdded`|`uint256`|number of new DAI added|

### _getPriceDecimals

Helper function to calculate number of price decimals based on the value returned from the price feed.

```solidity
function _getPriceDecimals(uint256 price_) internal view returns (int8);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`price_`|`uint256`|  The price to calculate the number of decimals for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int8`|The number of decimals|

### shutdown

shutdown the emission manager locally and close the active bond market

```solidity
function shutdown() external onlyRole("emergency_shutdown");
```

### restart

restart the emission manager locally

```solidity
function restart() external onlyRole("emergency_restart");
```

### rescue

Rescue any ERC20 token sent to this contract and send it to the TRSRY

*This function is restricted to the emissions_admin role*

```solidity
function rescue(address token_) external onlyRole("emissions_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token_`|`address`|The address of the ERC20 token to rescue|

### changeBaseRate

set the base emissions rate

```solidity
function changeBaseRate(uint256 changeBy_, uint48 forNumBeats_, bool add) external onlyRole("emissions_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`changeBy_`|`uint256`|uint256 added or subtracted from baseEmissionRate|
|`forNumBeats_`|`uint48`|uint256 number of times to change baseEmissionRate by changeBy_|
|`add`|`bool`|bool determining addition or subtraction to baseEmissionRate|

### setMinimumPremium

set the minimum premium for emissions

```solidity
function setMinimumPremium(uint256 newMinimumPremium_) external onlyRole("emissions_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newMinimumPremium_`|`uint256`|uint256|

### setVestingPeriod

set the new vesting period in seconds

```solidity
function setVestingPeriod(uint48 newVestingPeriod_) external onlyRole("emissions_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newVestingPeriod_`|`uint48`|uint48|

### setBacking

allow governance to adjust backing price if deviated from reality

*note if adjustment is more than 33% down, contract should be redeployed*

```solidity
function setBacking(uint256 newBacking) external onlyRole("emissions_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newBacking`|`uint256`|to adjust to TODO maybe put in a timespan arg so it can be smoothed over time if desirable|

### setRestartTimeframe

allow governance to adjust the timeframe for restart after shutdown

```solidity
function setRestartTimeframe(uint48 newTimeframe) external onlyRole("emissions_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newTimeframe`|`uint48`|to adjust it to|

### setBondContracts

allow governance to set the bond contracts used by the emission manager

```solidity
function setBondContracts(address auctioneer_, address teller_) external onlyRole("emissions_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`auctioneer_`|`address`|address of the bond auctioneer contract|
|`teller_`|`address`|address of the bond teller contract|

### getReserves

return reserves, measured as clearinghouse receivables and sReserve balances, in reserve denomination

```solidity
function getReserves() public view returns (uint256 reserves);
```

### getSupply

return supply, measured as supply of gOHM in OHM denomination

```solidity
function getSupply() public view returns (uint256 supply);
```

### getPremium

return the current premium as a percentage where 1e18 is 100%

```solidity
function getPremium() public view returns (uint256);
```

### getNextSale

return the next sale amount, premium, emission rate, and emissions based on the current premium

```solidity
function getNextSale() public view returns (uint256 premium, uint256 emissionRate, uint256 emission);
```
