# IMonoCooler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/policies/interfaces/cooler/IMonoCooler.sol)

**Title:**
Mono Cooler

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

## Functions

### collateralToken

The collateral token supplied by users/accounts, eg gOHM

```solidity
function collateralToken() external view returns (IERC20);
```

### debtToken

The debt token which can be borrowed, eg DAI or USDS

```solidity
function debtToken() external view returns (IERC20);
```

### ohm

Unwrapped gOHM

```solidity
function ohm() external view returns (IERC20);
```

### staking

staking contract to unstake (and burn) OHM from liquidations

```solidity
function staking() external view returns (IStaking);
```

### minDebtRequired

The minimum debt a user needs to maintain

It costs gas to liquidate users, so we don't want dust amounts.
To 18 decimal places

```solidity
function minDebtRequired() external view returns (uint256);
```

### totalCollateral

The total amount of collateral posted across all accounts.

To 18 decimal places

```solidity
function totalCollateral() external view returns (uint128);
```

### totalDebt

The total amount of debt which has been borrowed across all users
as of the latest checkpoint

To 18 decimal places

```solidity
function totalDebt() external view returns (uint128);
```

### liquidationsPaused

Liquidations may be paused in order for users to recover/repay debt after
emergency actions or interest rate changes

```solidity
function liquidationsPaused() external view returns (bool);
```

### borrowsPaused

Borrows may be paused for emergency actions or deprecating the facility

```solidity
function borrowsPaused() external view returns (bool);
```

### interestRateWad

The flat interest rate (APR).

Interest (approximately) continuously compounds at this rate.

To 18 decimal places

```solidity
function interestRateWad() external view returns (uint96);
```

### ltvOracle

The oracle serving both the Max Origination LTV and the Liquidation LTV

```solidity
function ltvOracle() external view returns (ICoolerLtvOracle);
```

### treasuryBorrower

The policy which borrows/repays from Treasury on behalf of Cooler

```solidity
function treasuryBorrower() external view returns (ICoolerTreasuryBorrower);
```

### loanToValues

The current Max Origination LTV and Liquidation LTV from the `ltvOracle()`

Both to 18 decimal places

```solidity
function loanToValues() external view returns (uint96 maxOriginationLtv, uint96 liquidationLtv);
```

### interestAccumulatorUpdatedAt

The last time the global debt accumulator was updated

```solidity
function interestAccumulatorUpdatedAt() external view returns (uint40);
```

### interestAccumulatorRay

The accumulator index used to track the compounding of debt, starting at 1e27 at genesis

To RAY (1e27) precision

```solidity
function interestAccumulatorRay() external view returns (uint256);
```

### authorizations

Whether `authorized` is authorized to act on `authorizer`'s behalf for all user actions
up until the `authorizationDeadline` unix timestamp.

Anyone is authorized to modify their own positions, regardless of this variable.

```solidity
function authorizations(address authorizer, address authorized) external view returns (uint96 authorizationDeadline);
```

### authorizationNonces

The `authorizer`'s current nonce. Used to prevent replay attacks with EIP-712 signatures.

```solidity
function authorizationNonces(address authorizer) external view returns (uint256);
```

### DOMAIN_SEPARATOR

Returns the domain separator used in the encoding of the signature for `setAuthorizationWithSig()`, as defined by {EIP712}.

```solidity
function DOMAIN_SEPARATOR() external view returns (bytes32);
```

### setAuthorization

Sets the authorization for `authorized` to manage `msg.sender`'s positions until `authorizationDeadline`

Authorization can be revoked by setting the `authorizationDeadline` into the past

```solidity
function setAuthorization(address authorized, uint96 authorizationDeadline) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`authorized`|`address`|The authorized address.|
|`authorizationDeadline`|`uint96`|The unix timestamp that they the authorization is valid until.|

### setAuthorizationWithSig

Sets the authorization for `authorization.authorized` to manage `authorization.authorizer`'s positions
until `authorization.authorizationDeadline`.

Warning: Reverts if the signature has already been submitted.

The signature is malleable, but it has no impact on the security here.

The nonce is passed as argument to be able to revert with a different error message.

Authorization can be revoked by calling `setAuthorization()` and setting the `authorizationDeadline` into the past

```solidity
function setAuthorizationWithSig(Authorization calldata authorization, Signature calldata signature) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`authorization`|`Authorization`|The `Authorization` struct.|
|`signature`|`Signature`|The signature.|

### isSenderAuthorized

Returns whether the `sender` is authorized to manage `onBehalf`'s positions.

```solidity
function isSenderAuthorized(address sender, address onBehalf) external view returns (bool);
```

### addCollateral

Deposit gOHM as collateral

```solidity
function addCollateral(
    uint128 collateralAmount,
    address onBehalfOf,
    IDLGTEv1.DelegationRequest[] calldata delegationRequests
) external;
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
) external returns (uint128 collateralWithdrawn);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`collateralAmount`|`uint128`|The amount of collateral to remove to 18 decimal places - MUST be greater than zero - If set to type(uint128).max then withdraw the max amount up to maxOriginationLtv|
|`onBehalfOf`|`address`|A caller can withdraw collateral on behalf of themselves or another address if authorized via `setAuthorization()` or `setAuthorizationWithSig()`|
|`recipient`|`address`|Send the gOHM collateral to a specified recipient address. - MUST NOT be address(0)|
|`delegationRequests`|`IDLGTEv1.DelegationRequest[]`|The set of delegations to apply before removing collateral. - MAY be empty, meaning no delegations are applied. - MUST ONLY be requests to undelegate, and that total undelegated MUST BE less than the `collateralAmount` argument|

### applyDelegations

Apply a set of delegation requests on behalf of a given user.

```solidity
function applyDelegations(IDLGTEv1.DelegationRequest[] calldata delegationRequests, address onBehalfOf)
    external
    returns (uint256 totalDelegated, uint256 totalUndelegated, uint256 undelegatedBalance);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegationRequests`|`IDLGTEv1.DelegationRequest[]`|The set of delegations to apply. - MAY be empty, meaning no delegations are applied. - Total collateral delegated as part of these requests MUST BE less than the account collateral. - MUST NOT apply delegations that results in more collateral being undelegated than the account has collateral for. - It applies across total gOHM balances for a given account across all calling policies So this may (un)delegate the account's gOHM set by another policy|
|`onBehalfOf`|`address`|A caller can apply delegations on behalf of themselves or another address if authorized via `setAuthorization()` or `setAuthorizationWithSig()`|

### borrow

Borrow `debtToken`

- Account LTV MUST be less than or equal to `maxOriginationLtv` after the borrow is applied
- Total debt for this account MUST be greater than or equal to the `minDebtRequired`
after the borrow is applied

```solidity
function borrow(uint128 borrowAmountInWad, address onBehalfOf, address recipient)
    external
    returns (uint128 amountBorrowedInWad);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`borrowAmountInWad`|`uint128`|The amount of `debtToken` to borrow, to 18 decimals regardless of the debt token - MUST be greater than zero - If set to type(uint128).max then borrow the max amount up to maxOriginationLtv|
|`onBehalfOf`|`address`|A caller can borrow on behalf of themselves or another address if authorized via `setAuthorization()` or `setAuthorizationWithSig()`|
|`recipient`|`address`|Send the borrowed token to a specified recipient address. - MUST NOT be address(0)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountBorrowedInWad`|`uint128`|The amount actually borrowed.|

### repay

Repay a portion, or all of the debt

- MUST NOT be called for an account which has no debt
- If the entire debt isn't paid off, then the total debt for this account
MUST be greater than or equal to the `minDebtRequired` after the borrow is applied

```solidity
function repay(uint128 repayAmountInWad, address onBehalfOf) external returns (uint128 amountRepaidInWad);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`repayAmountInWad`|`uint128`|The amount to repay, to 18 decimals regardless of the debt token - MUST be greater than zero - MAY be greater than the latest debt as of this block. In which case it will be capped to that latest debt|
|`onBehalfOf`|`address`|A caller can repay the debt on behalf of themselves or another address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountRepaidInWad`|`uint128`|The amount actually repaid.|

### batchLiquidate

Liquidate one or more accounts which have exceeded the `liquidationLtv`
The gOHM collateral is seized (unstaked to OHM and burned), and the accounts debt is wiped.

- If one of the provided accounts in the batch hasn't exceeded the max LTV then it is skipped.
- Delegations are auto-rescinded if required. Ordering of this is not guaranteed.

```solidity
function batchLiquidate(address[] calldata accounts)
    external
    returns (uint128 totalCollateralClaimed, uint128 totalDebtWiped, uint128 totalLiquidationIncentive);
```

### applyUnhealthyDelegations

If an account becomes unhealthy and has many delegations such that liquidation can't be
performed in one transaction, then delegations can be rescinded over multiple transactions
in order to get this account into a state where it can then be liquidated.

```solidity
function applyUnhealthyDelegations(address account, uint256 autoRescindMaxNumDelegates)
    external
    returns (uint256 totalUndelegated, uint256 undelegatedBalance);
```

### setLtvOracle

Set the oracle which serves the max Origination LTV and the Liquidation LTV

```solidity
function setLtvOracle(address newOracle) external;
```

### setTreasuryBorrower

Set the policy which borrows/repays from Treasury on behalf of Cooler

```solidity
function setTreasuryBorrower(address newTreasuryBorrower) external;
```

### setLiquidationsPaused

Liquidation may be paused in order for users to recover/repay debt after emergency actions

Can only be called by emergency or admin roles

```solidity
function setLiquidationsPaused(bool isPaused) external;
```

### setBorrowPaused

Pause any new borrows of `debtToken`

Can only be called by emergency or admin roles

```solidity
function setBorrowPaused(bool isPaused) external;
```

### setInterestRateWad

Update the interest rate (APR), specified in Wad (18 decimals)

- Cannot be set higher than 10% APR
- Interest (approximately) continuously compounds at this rate.

```solidity
function setInterestRateWad(uint96 newInterestRateWad) external;
```

### setMaxDelegateAddresses

Allow an account to have more or less than the DEFAULT_MAX_DELEGATE_ADDRESSES
number of delegates.

```solidity
function setMaxDelegateAddresses(address account, uint32 maxDelegateAddresses) external;
```

### checkpointDebt

Update and checkpoint the total debt up until now

May be useful in case there are no new user actions for some time.

```solidity
function checkpointDebt() external returns (uint128 totalDebtInWad, uint256 interestAccumulatorRay);
```

### debtDeltaForMaxOriginationLtv

Calculate the difference in debt required in order to be at or just under
the maxOriginationLTV if `collateralDelta` was added/removed
from the current position.
A positive `debtDeltaInWad` means the account can borrow that amount after adding that `collateralDelta` collateral
A negative `debtDeltaInWad` means it needs to repay that amount in order to withdraw that `collateralDelta` collateral

debtDeltaInWad is always to 18 decimal places

```solidity
function debtDeltaForMaxOriginationLtv(address account, int128 collateralDelta)
    external
    view
    returns (int128 debtDeltaInWad);
```

### accountPosition

An view of an accounts current and up to date position as of this block

```solidity
function accountPosition(address account) external view returns (AccountPosition memory position);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account to get a position for|

### computeLiquidity

Compute the liquidity status for a set of accounts.

This can be used to verify if accounts can be liquidated or not.

```solidity
function computeLiquidity(address[] calldata accounts) external view returns (LiquidationStatus[] memory status);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accounts`|`address[]`|The accounts to get the status for.|

### accountDelegationsList

Paginated view of an account's delegations

Can call sequentially increasing the `startIndex` each time by the number of items returned in the previous call,
until number of items returned is less than `maxItems`

```solidity
function accountDelegationsList(address account, uint256 startIndex, uint256 maxItems)
    external
    view
    returns (IDLGTEv1.AccountDelegation[] memory delegations);
```

### accountState

A view of the last checkpoint of account data (not as of this block)

```solidity
function accountState(address account) external view returns (AccountState memory);
```

### accountCollateral

An account's current collateral

to 18 decimal places

```solidity
function accountCollateral(address account) external view returns (uint128 collateralInWad);
```

### accountDebt

An account's current debt as of this block

```solidity
function accountDebt(address account) external view returns (uint128 debtInWad);
```

### globalState

A view of the derived/internal cache data.

```solidity
function globalState() external view returns (uint128 totalDebt, uint256 interestAccumulatorRay);
```

## Events

### BorrowPausedSet

```solidity
event BorrowPausedSet(bool isPaused);
```

### LiquidationsPausedSet

```solidity
event LiquidationsPausedSet(bool isPaused);
```

### InterestRateSet

```solidity
event InterestRateSet(uint96 interestRateWad);
```

### LtvOracleSet

```solidity
event LtvOracleSet(address indexed oracle);
```

### TreasuryBorrowerSet

```solidity
event TreasuryBorrowerSet(address indexed treasuryBorrower);
```

### CollateralAdded

```solidity
event CollateralAdded(address indexed caller, address indexed onBehalfOf, uint128 collateralAmount);
```

### CollateralWithdrawn

```solidity
event CollateralWithdrawn(
    address indexed caller, address indexed onBehalfOf, address indexed recipient, uint128 collateralAmount
);
```

### Borrow

```solidity
event Borrow(address indexed caller, address indexed onBehalfOf, address indexed recipient, uint128 amount);
```

### Repay

```solidity
event Repay(address indexed caller, address indexed onBehalfOf, uint128 repayAmount);
```

### Liquidated

```solidity
event Liquidated(
    address indexed caller, address indexed account, uint128 collateralSeized, uint128 debtWiped, uint128 incentives
);
```

### AuthorizationSet

```solidity
event AuthorizationSet(
    address indexed caller, address indexed account, address indexed authorized, uint96 authorizationDeadline
);
```

## Errors

### ExceededMaxOriginationLtv

```solidity
error ExceededMaxOriginationLtv(uint256 newLtv, uint256 maxOriginationLtv);
```

### ExceededCollateralBalance

```solidity
error ExceededCollateralBalance();
```

### MinDebtNotMet

```solidity
error MinDebtNotMet(uint256 minRequired, uint256 current);
```

### InvalidAddress

```solidity
error InvalidAddress();
```

### InvalidParam

```solidity
error InvalidParam();
```

### ExpectedNonZero

```solidity
error ExpectedNonZero();
```

### Paused

```solidity
error Paused();
```

### CannotLiquidate

```solidity
error CannotLiquidate();
```

### InvalidDelegationRequests

```solidity
error InvalidDelegationRequests();
```

### ExceededPreviousLtv

```solidity
error ExceededPreviousLtv(uint256 oldLtv, uint256 newLtv);
```

### InvalidCollateralDelta

```solidity
error InvalidCollateralDelta();
```

### ExpiredSignature

```solidity
error ExpiredSignature(uint256 deadline);
```

### InvalidNonce

```solidity
error InvalidNonce(uint256 deadline);
```

### InvalidSigner

```solidity
error InvalidSigner(address signer, address owner);
```

### UnauthorizedOnBehalfOf

```solidity
error UnauthorizedOnBehalfOf();
```

## Structs

### AccountState

The record of an individual account's collateral and debt data

```solidity
struct AccountState {
    /// @notice The amount of gOHM collateral the account has posted
    uint128 collateral;
    /**
     * @notice A checkpoint of user debt, updated after a borrow/repay/liquidation
     * @dev Debt as of now =  (
     *    `account.debtCheckpoint` *
     *    `debtTokenData.interestAccumulator` /
     *    `account.interestAccumulator`
     * )
     */
    uint128 debtCheckpoint;
    /// @notice The account's last interest accumulator checkpoint
    uint256 interestAccumulatorRay;
}
```

### Authorization

```solidity
struct Authorization {
    /// @notice The address of the account granting authorization
    address account;
    /// @notice The address of who is authorized to act on the the accounts behalf
    address authorized;
    /// @notice The unix timestamp that the access is automatically revoked
    uint96 authorizationDeadline;
    /// @notice For replay protection
    uint256 nonce;
    /// @notice A unix timestamp for when the signature is valid until
    uint256 signatureDeadline;
}
```

### Signature

```solidity
struct Signature {
    uint8 v;
    bytes32 r;
    bytes32 s;
}
```

### LiquidationStatus

The status for whether an account can be liquidated or not

```solidity
struct LiquidationStatus {
    /// @notice The amount [in gOHM collateral terms] of collateral which has been provided by the user
    uint128 collateral;
    /// @notice The up to date amount of debt [in debtToken terms]
    uint128 currentDebt;
    /// @notice The current LTV of this account [in debtTokens per gOHM collateral terms]
    uint128 currentLtv;
    /// @notice Has this account exceeded the liquidation LTV
    bool exceededLiquidationLtv;
    /// @notice Has this account exceeded the max origination LTV
    bool exceededMaxOriginationLtv;
    /// @notice A liquidator will receive this amount [in gOHM collateral terms] if
    /// this account is liquidated as of this block
    uint128 currentIncentive;
}
```

### AccountPosition

An account's collateral and debt position details
Provided for UX

```solidity
struct AccountPosition {
    /// @notice The amount [in gOHM collateral terms] of collateral which has been provided by the user
    /// @dev To 18 decimal places
    uint256 collateral;
    /// @notice The up to date amount of debt
    /// @dev To 18 decimal places
    uint256 currentDebt;
    /// @notice The maximum amount of debtToken's this account can borrow given the
    /// collateral posted, up to `maxOriginationLtv`
    /// @dev To 18 decimal places
    uint256 maxOriginationDebtAmount;
    /// @notice The maximum amount of debtToken's this account can accrue before being
    /// eligable to be liquidated, up to `liquidationLtv`
    /// @dev To 18 decimal places
    uint256 liquidationDebtAmount;
    /// @notice The health factor of this accounts position.
    /// Anything less than 1 can be liquidated, relative to `liquidationLtv`
    /// @dev To 18 decimal places
    uint256 healthFactor;
    /// @notice The current LTV of this account [in debtTokens per gOHM collateral terms]
    /// @dev To 18 decimal places
    uint256 currentLtv;
    /// @notice The total collateral delegated for this user across all delegates
    /// @dev To 18 decimal places
    uint256 totalDelegated;
    /// @notice The current number of addresses this account has delegated to
    uint256 numDelegateAddresses;
    /// @notice The max number of delegates this account is allowed to delegate to
    uint256 maxDelegateAddresses;
}
```
