# MonoCooler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/cooler/MonoCooler.sol)

**Inherits:**
[IMonoCooler](/main/contracts/docs/src/policies/interfaces/cooler/IMonoCooler.sol/interface.IMonoCooler), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyAdmin](/main/contracts/docs/src/policies/utils/PolicyAdmin.sol/abstract.PolicyAdmin)

A borrow/lend market where users can deposit their gOHM as collateral and then
borrow a stablecoin debt token up to a certain LTV

- The debt token may change over time - eg DAI to USDS (or USDC), determined by the
`CoolerTreasuryBorrower`
- The collateral and debt amounts tracked on this contract are always reported in wad,
ie 18 decimal places
- gOHM collateral can be delegated to accounts for voting, via the DLGTE module
- Positions can be liquidated if the LTV breaches the 'liquidation LTV' as determined by the
`LTV Oracle`
- Users may set an authorization for one other address to act on its behalf.

## State Variables

### _COLLATERAL_TOKEN

*The collateral token, eg gOHM*

```solidity
ERC20 private immutable _COLLATERAL_TOKEN;
```

### _OHM

*The OHM token*

```solidity
ERC20 private immutable _OHM;
```

### _STAKING

*The OHM staking contract*

```solidity
IStaking private immutable _STAKING;
```

### _MIN_DEBT_REQUIRED

*The minimum debt a user needs to maintain*

```solidity
uint256 private immutable _MIN_DEBT_REQUIRED;
```

### DOMAIN_SEPARATOR

*Returns the domain separator used in the encoding of the signature for `setAuthorizationWithSig()`, as defined by {EIP712}.*

```solidity
bytes32 public immutable override DOMAIN_SEPARATOR;
```

### MINTR

```solidity
MINTRv1 public MINTR;
```

### DLGTE

```solidity
DLGTEv1 public DLGTE;
```

### totalCollateral

The total amount of collateral posted across all accounts.

*To 18 decimal places*

```solidity
uint128 public override totalCollateral;
```

### totalDebt

The total amount of debt which has been borrowed across all users
as of the latest checkpoint

*To 18 decimal places*

```solidity
uint128 public override totalDebt;
```

### interestAccumulatorRay

The accumulator index used to track the compounding of debt, starting at 1e27 at genesis

*To RAY (1e27) precision*

```solidity
uint256 public override interestAccumulatorRay;
```

### interestRateWad

The flat interest rate (APR).

*Interest (approximately) continuously compounds at this rate.*

```solidity
uint96 public override interestRateWad;
```

### ltvOracle

The oracle serving both the Max Origination LTV and the Liquidation LTV

```solidity
ICoolerLtvOracle public override ltvOracle;
```

### liquidationsPaused

Liquidations may be paused in order for users to recover/repay debt after
emergency actions or interest rate changes

```solidity
bool public override liquidationsPaused;
```

### borrowsPaused

Borrows may be paused for emergency actions or deprecating the facility

```solidity
bool public override borrowsPaused;
```

### interestAccumulatorUpdatedAt

The last time the global debt accumulator was updated

```solidity
uint40 public override interestAccumulatorUpdatedAt;
```

### treasuryBorrower

The policy which borrows/repays from Treasury on behalf of Cooler

```solidity
ICoolerTreasuryBorrower public override treasuryBorrower;
```

### allAccountState

*A per account store, tracking collateral/debt as of their latest checkpoint.*

```solidity
mapping(address => AccountState) private allAccountState;
```

### authorizations

Whether `authorized` is authorized to act on `authorizer`'s behalf for all user actions
up until the `authorizationDeadline` unix timestamp.

*Anyone is authorized to modify their own positions, regardless of this variable.*

```solidity
mapping(address => mapping(address => uint96)) public override authorizations;
```

### authorizationNonces

The `authorizer`'s current nonce. Used to prevent replay attacks with EIP-712 signatures.

```solidity
mapping(address => uint256) public override authorizationNonces;
```

### _RAY

Extra precision scalar

```solidity
uint256 private constant _RAY = 1e27;
```

### _DOMAIN_TYPEHASH

*The EIP-712 typeHash for EIP712Domain.*

```solidity
bytes32 private constant _DOMAIN_TYPEHASH = keccak256("EIP712Domain(uint256 chainId,address verifyingContract)");
```

### _AUTHORIZATION_TYPEHASH

*The EIP-712 typeHash for Authorization.*

```solidity
bytes32 private constant _AUTHORIZATION_TYPEHASH = keccak256(
    "Authorization(address account,address authorized,uint96 authorizationDeadline,uint256 nonce,uint256 signatureDeadline)"
);
```

### _EXPECTED_DECIMALS

*expected decimals for the `_COLLATERAL_TOKEN` and `treasuryBorrower`*

```solidity
uint8 private constant _EXPECTED_DECIMALS = 18;
```

### MAX_INTEREST_RATE

*Cannot set an interest rate higher than 10%*

```solidity
uint96 private constant MAX_INTEREST_RATE = 0.1e18;
```

## Functions

### constructor

```solidity
constructor(
    address ohm_,
    address gohm_,
    address staking_,
    address kernel_,
    address ltvOracle_,
    uint96 interestRateWad_,
    uint256 minDebtRequired_
) Policy(Kernel(kernel_));
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
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`requests`|`Permissions[]`|- Array of keycodes and function selectors for requested permissions.|

### setAuthorization

Sets the authorization for `authorized` to manage `msg.sender`'s positions until `authorizationDeadline`

*Authorization can be revoked by setting the `authorizationDeadline` into the past*

```solidity
function setAuthorization(address authorized, uint96 authorizationDeadline) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`authorized`|`address`|The authorized address.|
|`authorizationDeadline`|`uint96`|The unix timestamp that they the authorization is valid until.|

### setAuthorizationWithSig

Sets the authorization for `authorization.authorized` to manage `authorization.authorizer`'s positions
until `authorization.authorizationDeadline`.

*Warning: Reverts if the signature has already been submitted.*

```solidity
function setAuthorizationWithSig(Authorization memory authorization, Signature calldata signature) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`authorization`|`Authorization`|The `Authorization` struct.|
|`signature`|`Signature`|The signature.|

### isSenderAuthorized

*Returns whether the `sender` is authorized to manage `onBehalf`'s positions.*

```solidity
function isSenderAuthorized(address sender, address onBehalfOf) public view override returns (bool);
```

### _requireSenderAuthorized

```solidity
function _requireSenderAuthorized(address sender, address onBehalfOf) internal view;
```

### addCollateral

Deposit gOHM as collateral

```solidity
function addCollateral(
    uint128 collateralAmount,
    address onBehalfOf,
    IDLGTEv1.DelegationRequest[] calldata delegationRequests
) external override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`collateralAmount`|`uint128`|The amount to deposit to 18 decimal places - MUST be greater than zero|
|`onBehalfOf`|`address`|A caller can add collateral on behalf of themselves or another address. - MUST NOT be address(0)|
|`delegationRequests`|`IDLGTEv1.DelegationRequest[]`|The set of delegations to apply after adding collateral. - MAY be empty, meaning no delegations are applied. - MUST ONLY be requests to add delegations, and that total MUST BE less than the `collateralAmount` argument - If `onBehalfOf` does not equal the caller, the caller must be authorized via `setAuthorization()` or `setAuthorizationWithSig()`|

### withdrawCollateral

Withdraw gOHM collateral.

- Account LTV MUST be less than or equal to `maxOriginationLtv` after the withdraw is applied
- At least `collateralAmount` collateral MUST be undelegated for this account.
Use the `delegationRequests` to rescind enough as part of this request.

```solidity
function withdrawCollateral(
    uint128 collateralAmount,
    address onBehalfOf,
    address recipient,
    IDLGTEv1.DelegationRequest[] calldata delegationRequests
) external override returns (uint128 collateralWithdrawn);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`collateralAmount`|`uint128`|The amount of collateral to remove to 18 decimal places - MUST be greater than zero - If set to type(uint128).max then withdraw the max amount up to maxOriginationLtv|
|`onBehalfOf`|`address`|A caller can withdraw collateral on behalf of themselves or another address if authorized via `setAuthorization()` or `setAuthorizationWithSig()`|
|`recipient`|`address`|Send the gOHM collateral to a specified recipient address. - MUST NOT be address(0)|
|`delegationRequests`|`IDLGTEv1.DelegationRequest[]`|The set of delegations to apply before removing collateral. - MAY be empty, meaning no delegations are applied. - MUST ONLY be requests to undelegate, and that total undelegated MUST BE less than the `collateralAmount` argument|

### borrow

Borrow `debtToken`

- Account LTV MUST be less than or equal to `maxOriginationLtv` after the borrow is applied
- Total debt for this account MUST be greater than or equal to the `minDebtRequired`
after the borrow is applied

```solidity
function borrow(uint128 borrowAmount, address onBehalfOf, address recipient)
    external
    override
    returns (uint128 amountBorrowed);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`borrowAmount`|`uint128`||
|`onBehalfOf`|`address`|A caller can borrow on behalf of themselves or another address if authorized via `setAuthorization()` or `setAuthorizationWithSig()`|
|`recipient`|`address`|Send the borrowed token to a specified recipient address. - MUST NOT be address(0)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountBorrowed`|`uint128`|amountBorrowedInWad The amount actually borrowed.|

### repay

Repay a portion, or all of the debt

- MUST NOT be called for an account which has no debt
- If the entire debt isn't paid off, then the total debt for this account
MUST be greater than or equal to the `minDebtRequired` after the borrow is applied

```solidity
function repay(uint128 repayAmount, address onBehalfOf) external override returns (uint128 amountRepaid);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`repayAmount`|`uint128`||
|`onBehalfOf`|`address`|A caller can repay the debt on behalf of themselves or another address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountRepaid`|`uint128`|amountRepaidInWad The amount actually repaid.|

### applyDelegations

Apply a set of delegation requests on behalf of a given user.

```solidity
function applyDelegations(IDLGTEv1.DelegationRequest[] calldata delegationRequests, address onBehalfOf)
    external
    override
    returns (uint256 totalDelegated, uint256 totalUndelegated, uint256 undelegatedBalance);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegationRequests`|`IDLGTEv1.DelegationRequest[]`|The set of delegations to apply. - MAY be empty, meaning no delegations are applied. - Total collateral delegated as part of these requests MUST BE less than the account collateral. - MUST NOT apply delegations that results in more collateral being undelegated than the account has collateral for. - It applies across total gOHM balances for a given account across all calling policies So this may (un)delegate the account's gOHM set by another policy|
|`onBehalfOf`|`address`|A caller can apply delegations on behalf of themselves or another address if authorized via `setAuthorization()` or `setAuthorizationWithSig()`|

### applyUnhealthyDelegations

If an account becomes unhealthy and has many delegations such that liquidation can't be
performed in one transaction, then delegations can be rescinded over multiple transactions
in order to get this account into a state where it can then be liquidated.

```solidity
function applyUnhealthyDelegations(address account, uint256 autoRescindMaxNumDelegates)
    external
    override
    returns (uint256 totalUndelegated, uint256 undelegatedBalance);
```

### batchLiquidate

Liquidate one or more accounts which have exceeded the `liquidationLtv`
The gOHM collateral is seized (unstaked to OHM and burned), and the accounts debt is wiped.

- If one of the provided accounts in the batch hasn't exceeded the max LTV then it is skipped.
- Delegations are auto-rescinded if required. Ordering of this is not guaranteed.*

```solidity
function batchLiquidate(address[] calldata accounts)
    external
    override
    returns (uint128 totalCollateralClaimed, uint128 totalDebtWiped, uint128 totalLiquidationIncentive);
```

### setLtvOracle

Set the oracle which serves the max Origination LTV and the Liquidation LTV

```solidity
function setLtvOracle(address newOracle) external override onlyAdminRole;
```

### setTreasuryBorrower

Set the policy which borrows/repays from Treasury on behalf of Cooler

```solidity
function setTreasuryBorrower(address newTreasuryBorrower) external override;
```

### setLiquidationsPaused

Liquidation may be paused in order for users to recover/repay debt after emergency actions

*Can only be called by emergency or admin roles*

```solidity
function setLiquidationsPaused(bool isPaused) external override onlyEmergencyOrAdminRole;
```

### setBorrowPaused

Pause any new borrows of `debtToken`

*Can only be called by emergency or admin roles*

```solidity
function setBorrowPaused(bool isPaused) external override onlyEmergencyOrAdminRole;
```

### setInterestRateWad

Update the interest rate (APR), specified in Wad (18 decimals)

- Cannot be set higher than 10% APR
- Interest (approximately) continuously compounds at this rate.*

```solidity
function setInterestRateWad(uint96 newInterestRate) external override onlyAdminRole;
```

### setMaxDelegateAddresses

Allow an account to have more or less than the DEFAULT_MAX_DELEGATE_ADDRESSES
number of delegates.

```solidity
function setMaxDelegateAddresses(address account, uint32 maxDelegateAddresses) external override onlyAdminRole;
```

### checkpointDebt

Update and checkpoint the total debt up until now

*May be useful in case there are no new user actions for some time.*

```solidity
function checkpointDebt() external override returns (uint128, uint256);
```

### collateralToken

The collateral token supplied by users/accounts, eg gOHM

```solidity
function collateralToken() external view override returns (IERC20);
```

### ohm

Unwrapped gOHM

```solidity
function ohm() external view override returns (IERC20);
```

### debtToken

The debt token which can be borrowed, eg DAI or USDS

```solidity
function debtToken() external view override returns (IERC20);
```

### staking

staking contract to unstake (and burn) OHM from liquidations

```solidity
function staking() external view override returns (IStaking);
```

### minDebtRequired

The minimum debt a user needs to maintain

*It costs gas to liquidate users, so we don't want dust amounts.
To 18 decimal places*

```solidity
function minDebtRequired() external view override returns (uint256);
```

### loanToValues

The current Max Origination LTV and Liquidation LTV from the `ltvOracle()`

*Both to 18 decimal places*

```solidity
function loanToValues() external view override returns (uint96 maxOriginationLtv, uint96 liquidationLtv);
```

### debtDeltaForMaxOriginationLtv

Calculate the difference in debt required in order to be at or just under
the maxOriginationLTV if `collateralDelta` was added/removed
from the current position.
A positive `debtDeltaInWad` means the account can borrow that amount after adding that `collateralDelta` collateral
A negative `debtDeltaInWad` means it needs to repay that amount in order to withdraw that `collateralDelta` collateral

*debtDeltaInWad is always to 18 decimal places*

```solidity
function debtDeltaForMaxOriginationLtv(address account, int128 collateralDelta)
    external
    view
    override
    returns (int128 debtDelta);
```

### accountPosition

An view of an accounts current and up to date position as of this block

```solidity
function accountPosition(address account) external view override returns (AccountPosition memory position);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account to get a position for|

### computeLiquidity

Compute the liquidity status for a set of accounts.

*This can be used to verify if accounts can be liquidated or not.*

```solidity
function computeLiquidity(address[] calldata accounts)
    external
    view
    override
    returns (LiquidationStatus[] memory status);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accounts`|`address[]`|The accounts to get the status for.|

### accountDelegationsList

Paginated view of an account's delegations

*Can call sequentially increasing the `startIndex` each time by the number of items returned in the previous call,
until number of items returned is less than `maxItems`*

```solidity
function accountDelegationsList(address account, uint256 startIndex, uint256 maxItems)
    external
    view
    override
    returns (IDLGTEv1.AccountDelegation[] memory delegations);
```

### accountState

A view of the last checkpoint of account data (not as of this block)

```solidity
function accountState(address account) external view override returns (AccountState memory);
```

### accountCollateral

An account's current collateral

*to 18 decimal places*

```solidity
function accountCollateral(address account) external view override returns (uint128);
```

### accountDebt

An account's current debt as of this block

```solidity
function accountDebt(address account) external view override returns (uint128);
```

### globalState

A view of the derived/internal cache data.

```solidity
function globalState() external view override returns (uint128, uint256);
```

### _globalStateRW

*Setup and refresh the global state
Update storage if and only if the timestamp has changed since last updated.*

```solidity
function _globalStateRW() private returns (GlobalStateCache memory gStateCache);
```

### _globalStateRO

*Setup the GlobalStateCache for a given token
read only -- storage isn't updated.*

```solidity
function _globalStateRO() private view returns (GlobalStateCache memory gStateCache);
```

### _initGlobalStateCache

*Initialize the global state cache from storage to this block, for a given token.*

```solidity
function _initGlobalStateCache(GlobalStateCache memory gStateCache) private view returns (bool dirty);
```

### _reduceTotalDebt

*Reduce the total debt in storage by a repayment amount.
NB: The sum of all users debt may be slightly more than the recorded total debt
because users debt is rounded up for dust.
The total debt is floored at 0.*

```solidity
function _reduceTotalDebt(GlobalStateCache memory gStateCache, uint128 repayAmount) private;
```

### _maxDebt

*Calculate the maximum amount which can be borrowed up to the maxOriginationLtv, given
a collateral amount*

```solidity
function _maxDebt(uint128 collateral, uint256 maxOriginationLtv) private pure returns (uint128);
```

### _minCollateral

*Calculate the maximum collateral amount which can be withdrawn up to the maxOriginationLtv, given
a current debt amount*

```solidity
function _minCollateral(uint128 debt, uint256 maxOriginationLtv) private pure returns (uint128);
```

### _validateOriginationLtv

*Ensure the LTV isn't higher than the maxOriginationLtv*

```solidity
function _validateOriginationLtv(uint128 ltv, uint256 maxOriginationLtv) private pure;
```

### _calculateCurrentLtv

*Calculate the current LTV based on the latest debt*

```solidity
function _calculateCurrentLtv(uint128 currentDebt, uint128 collateral) private pure returns (uint128);
```

### _computeLiquidity

*Generate the LiquidationStatus struct with current details
for this account.*

```solidity
function _computeLiquidity(AccountState memory aStateCache, GlobalStateCache memory gStateCache)
    private
    pure
    returns (LiquidationStatus memory status);
```

### _currentAccountDebt

*Calculate the latest debt for a given account & token.
Derived from the prior debt checkpoint, and the interest accumulator.*

```solidity
function _currentAccountDebt(
    uint128 accountDebtCheckpoint_,
    uint256 accountInterestAccumulatorRay_,
    uint256 globalInterestAccumulatorRay_
) private pure returns (uint128 result);
```

### _requireAmountNonZero

```solidity
function _requireAmountNonZero(uint256 amount_) internal pure;
```

### _requireAddressNonZero

```solidity
function _requireAddressNonZero(address addr_) internal pure;
```

## Structs

### GlobalStateCache

```solidity
struct GlobalStateCache {
    uint128 totalDebt;
    uint256 interestAccumulatorRay;
    uint96 liquidationLtv;
    uint96 maxOriginationLtv;
}
```
