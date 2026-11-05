# YieldRepurchaseFacility

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/YieldRepurchaseFacility.sol)

**Inherits:** [IYieldRepo](/main/contracts/docs/src/policies/interfaces/IYieldRepo.sol/interface.IYieldRepo), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

the Yield Repurchase Facility (Yield Repo) contract pulls a derived amount of yield from
the Olympus treasury each week and uses it, along with the backing of previously purchased
OHM, to purchase OHM off the market using a Bond Protocol SDA market.

## Constants

### sReserve

```solidity
ERC4626 public immutable sReserve;
```

### reserve

```solidity
ERC20 public immutable reserve;
```

### _reserveDecimals

```solidity
uint8 internal immutable _reserveDecimals;
```

### ohm

```solidity
ERC20 public immutable ohm;
```

### _ohmDecimals

```solidity
uint8 internal immutable _ohmDecimals;
```

### teller

```solidity
address public immutable teller;
```

### auctioneer

```solidity
IBondSDA public immutable auctioneer;
```

### epochLength

```solidity
uint48 public constant epochLength = 21;
```

### backingPerToken

```solidity
uint256 public constant backingPerToken = 1133 * 1e7;
```

## State Variables

### _oracleDecimals

```solidity
uint8 internal _oracleDecimals;
```

### TRSRY

```solidity
TRSRYv1 public TRSRY;
```

### PRICE

```solidity
PRICEv1 public PRICE;
```

### CHREG

```solidity
CHREGv1 public CHREG;
```

### epoch

========== VIEWS ========== //

Returns the current epoch

```solidity
uint48 public epoch;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

### nextYield

```solidity
uint256 public nextYield;
```

### lastReserveBalance

```solidity
uint256 public lastReserveBalance;
```

### lastConversionRate

```solidity
uint256 public lastConversionRate;
```

### isShutdown

Returns whether the contract is shutdown

```solidity
bool public isShutdown;
```

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

## Functions

<a id="constructor-kernel-address-address-address-address"></a>

### constructor

```solidity
constructor(
        Kernel kernel_,
        address ohm_,
        address sReserve_,
        address teller_,
        address auctioneer_
    ) Policy(kernel_);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| kernel_     | `Kernel`  |             |
| ohm_        | `address` |             |
| sReserve_   | `address` |             |
| teller_     | `address` |             |
| auctioneer_ | `address` |             |

<a id="initialize-uint256-uint256-uint256"></a>

### initialize

```solidity
function initialize(
        uint256 initialReserveBalance,
        uint256 initialConversionRate,
        uint256 initialYield
    ) external onlyRole("loop_daddy");
```

**Parameters**

| Name                  | Type      | Description |
| --------------------- | --------- | ----------- |
| initialReserveBalance | `uint256` |             |
| initialConversionRate | `uint256` |             |
| initialYield          | `uint256` |             |

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

<a id="endepoch"></a>

### endEpoch

create a new bond market at the end of the day with some portion of remaining funds

```solidity
function endEpoch() public override onlyRole("heart");
```

<a id="adjustnextyield-uint256"></a>

### adjustNextYield

allow manager to increase (by maximum 10%) or decrease yield for week if contract is inaccurate

```solidity
function adjustNextYield(uint256 newNextYield) external onlyRole("loop_daddy");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newNextYield | `uint256` | to fund |

<a id="shutdown-erc20"></a>

### shutdown

retire contract by burning ohm balance and transferring tokens to treasury

```solidity
function shutdown(ERC20[] memory tokensToTransfer) external onlyRole("loop_daddy");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokensToTransfer | `ERC20[]` | list of tokens to transfer back to treasury (i.e. reserves) |

<a id="_createmarket-uint256"></a>

### _createMarket

create bond protocol market with given budget

```solidity
function _createMarket(uint256 bidAmount) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bidAmount | `uint256` | amount of reserve to fund bond market with |

<a id="_getbackingforpurchased"></a>

### _getBackingForPurchased

internal function to burn ohm and retrieve backing

```solidity
function _getBackingForPurchased() internal;
```

<a id="_withdraw-uint256"></a>

### _withdraw

internal function to withdraw sReserve from treasury

<i>

note amount given is in reserve, not sReserve

</i>

```solidity
function _withdraw(uint256 amount) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | `uint256` | an amount to withdraw, in reserve |

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

<a id="getreservebalance"></a>

### getReserveBalance

fetch combined sReserve balance of active clearinghouses and treasury, in reserve

```solidity
function getReserveBalance() public view override returns (uint256 balance);
```

**Returns**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| balance | `uint256` |             |

<a id="getnextyield"></a>

### getNextYield

compute yield for the next week

```solidity
function getNextYield() public view override returns (uint256 yield);
```

**Returns**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| yield | `uint256` |             |

<a id="getohmbalanceandbacking"></a>

### getOhmBalanceAndBacking

compute backing for ohm balance

```solidity
function getOhmBalanceAndBacking()
        public
        view
        override
        returns (uint256 balance, uint256 backing);
```

**Returns**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| balance | `uint256` |             |
| backing | `uint256` |             |

## Events

### RepoMarket

```solidity
event RepoMarket(uint256 marketId, uint256 bidAmount);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| marketId  | `uint256` |             |
| bidAmount | `uint256` |             |

### NextYieldSet

```solidity
event NextYieldSet(uint256 nextYield);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| nextYield | `uint256` |             |

### Shutdown

```solidity
event Shutdown();
```
