# Clearinghouse

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/Clearinghouse.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer), [CoolerCallback](/main/contracts/docs/src/external/cooler/CoolerCallback.sol/abstract.CoolerCallback)

Olympus Clearinghouse (Policy) Contract.

*The Olympus Clearinghouse is a lending facility built on top of Cooler Loans. The Clearinghouse
ensures that OHM holders can take loans against their gOHM holdings according to the parameters
approved by the community in OIP-144 and its subsequent RFCs. The Clearinghouse parameters are
immutable, because of that, if backing was to increase substantially, a new governance process
to fork this implementation with upgraded parameters should take place.
Although the Cooler contracts allow lenders to transfer ownership of their repayment rights, the
Clearinghouse doesn't implement any functions to use that feature.*

## State Variables

### reserve

```solidity
ERC20 public immutable reserve;
```

### sReserve

```solidity
ERC4626 public immutable sReserve;
```

### gohm

```solidity
ERC20 public immutable gohm;
```

### ohm

```solidity
ERC20 public immutable ohm;
```

### staking

```solidity
IStaking public immutable staking;
```

### CHREG

```solidity
CHREGv1 public CHREG;
```

### MINTR

```solidity
MINTRv1 public MINTR;
```

### TRSRY

```solidity
TRSRYv1 public TRSRY;
```

### INTEREST_RATE

```solidity
uint256 public constant INTEREST_RATE = 5e15;
```

### LOAN_TO_COLLATERAL

```solidity
uint256 public constant LOAN_TO_COLLATERAL = 289292e16;
```

### DURATION

```solidity
uint256 public constant DURATION = 121 days;
```

### FUND_CADENCE

```solidity
uint256 public constant FUND_CADENCE = 7 days;
```

### FUND_AMOUNT

```solidity
uint256 public constant FUND_AMOUNT = 18_000_000e18;
```

### MAX_REWARD

```solidity
uint256 public constant MAX_REWARD = 1e17;
```

### active

determines whether the contract can be funded or not.

```solidity
bool public active;
```

### fundTime

timestamp at which the next rebalance can occur.

```solidity
uint256 public fundTime;
```

### interestReceivables

Outstanding receivables.
Incremented when a loan is taken or rolled.
Decremented when a loan is repaid or collateral is burned.

```solidity
uint256 public interestReceivables;
```

### principalReceivables

```solidity
uint256 public principalReceivables;
```

## Functions

### constructor

```solidity
constructor(address ohm_, address gohm_, address staking_, address sReserve_, address coolerFactory_, address kernel_)
    Policy(Kernel(kernel_))
    CoolerCallback(coolerFactory_);
```

### configureDependencies

Default framework setup. Configure dependencies for olympus-v3 modules.

*This function will be called when the `executor` installs the Clearinghouse
policy in the olympus-v3 `Kernel`.*

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

### requestPermissions

Default framework setup. Request permissions for interacting with olympus-v3 modules.

*This function will be called when the `executor` installs the Clearinghouse
policy in the olympus-v3 `Kernel`.*

```solidity
function requestPermissions() external view override returns (Permissions[] memory requests);
```

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

### lendToCooler

Lend to a cooler.

*To simplify the UX and easily ensure that all holders get the same terms,
this function requests a new loan and clears it in the same transaction.*

```solidity
function lendToCooler(Cooler cooler_, uint256 amount_) external returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`cooler_`|`Cooler`|to lend to.|
|`amount_`|`uint256`|of reserve to lend.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|the id of the granted loan.|

### extendLoan

Extend the loan expiry by repaying the extension interest in advance.
The extension cost is paid by the caller. If a third-party executes the
extension, the loan period is extended, but the borrower debt does not increase.

```solidity
function extendLoan(Cooler cooler_, uint256 loanID_, uint8 times_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`cooler_`|`Cooler`|holding the loan to be extended.|
|`loanID_`|`uint256`|index of loan in loans[].|
|`times_`|`uint8`|Amount of times that the fixed-term loan duration is extended.|

### claimDefaulted

Batch several default claims to save gas.
The elements on both arrays must be paired based on their index.

*Implements an auction style reward system that linearly increases up to a max reward.*

```solidity
function claimDefaulted(address[] calldata coolers_, uint256[] calldata loans_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`coolers_`|`address[]`|Array of contracts where the default must be claimed.|
|`loans_`|`uint256[]`|Array of defaulted loan ids.|

### _onRepay

Overridden callback to decrement loan receivables.

```solidity
function _onRepay(uint256, uint256 principalPaid_, uint256 interestPaid_) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`||
|`principalPaid_`|`uint256`|in reserve.|
|`interestPaid_`|`uint256`|in reserve.|

### _onDefault

Unused callback since defaults are handled by the clearinghouse.

*Overriden and left empty to save gas.*

```solidity
function _onDefault(uint256, uint256, uint256, uint256) internal override;
```

### rebalance

Fund loan liquidity from treasury.

*Exposure is always capped at FUND_AMOUNT and rebalanced at up to FUND_CADANCE.
If several rebalances are available (because some were missed), calling this
function several times won't impact the funds controlled by the contract.
If the emergency shutdown is triggered, a rebalance will send funds back to
the treasury.*

```solidity
function rebalance() public returns (bool);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|False if too early to rebalance. Otherwise, true.|

### sweepIntoSavingsVault

Sweep excess reserve into savings vault.

```solidity
function sweepIntoSavingsVault() public;
```

### _sweepIntoSavingsVault

Sweep excess reserve into vault.

```solidity
function _sweepIntoSavingsVault(uint256 amount_) internal;
```

### burn

Public function to burn gOHM.

*Can be used to burn any gOHM defaulted using the Cooler instead of the Clearinghouse.*

```solidity
function burn() public;
```

### activate

Activate the contract.

```solidity
function activate() external onlyRole("cooler_overseer");
```

### emergencyShutdown

Deactivate the contract and return funds to treasury.

```solidity
function emergencyShutdown() external onlyRole("emergency_shutdown");
```

### defund

Return funds to treasury.

```solidity
function defund(ERC20 token_, uint256 amount_) external onlyRole("cooler_overseer");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token_`|`ERC20`|to transfer.|
|`amount_`|`uint256`|to transfer.|

### _defund

Internal function to return funds to treasury.

```solidity
function _defund(ERC20 token_, uint256 amount_) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token_`|`ERC20`|to transfer.|
|`amount_`|`uint256`|to transfer.|

### getCollateralForLoan

view function computing collateral for a loan amount.

```solidity
function getCollateralForLoan(uint256 principal_) external pure returns (uint256);
```

### getLoanForCollateral

view function computing loan for a collateral amount.

```solidity
function getLoanForCollateral(uint256 collateral_) public pure returns (uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`collateral_`|`uint256`|amount of gOHM.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|debt (amount to be lent + interest) for a given collateral amount.|
|`<none>`|`uint256`||

### interestForLoan

view function to compute the interest for given principal amount.

```solidity
function interestForLoan(uint256 principal_, uint256 duration_) public pure returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`principal_`|`uint256`|amount of reserve being lent.|
|`duration_`|`uint256`|elapsed time in seconds.|

### getTotalReceivables

Get total receivable reserve for the treasury.
Includes both principal and interest.

```solidity
function getTotalReceivables() external view returns (uint256);
```

## Events

### Activate

Logs whenever the Clearinghouse is initialized or reactivated.

```solidity
event Activate();
```

### Deactivate

Logs whenever the Clearinghouse is deactivated.

```solidity
event Deactivate();
```

### Defund

Logs whenever the treasury is defunded.

```solidity
event Defund(address token, uint256 amount);
```

### Rebalance

Logs the balance change (in reserve terms) whenever a rebalance occurs.

```solidity
event Rebalance(bool defund, uint256 reserveAmount);
```

## Errors

### BadEscrow

```solidity
error BadEscrow();
```

### DurationMaximum

```solidity
error DurationMaximum();
```

### OnlyBurnable

```solidity
error OnlyBurnable();
```

### TooEarlyToFund

```solidity
error TooEarlyToFund();
```

### LengthDiscrepancy

```solidity
error LengthDiscrepancy();
```

### OnlyBorrower

```solidity
error OnlyBorrower();
```

### NotLender

```solidity
error NotLender();
```
