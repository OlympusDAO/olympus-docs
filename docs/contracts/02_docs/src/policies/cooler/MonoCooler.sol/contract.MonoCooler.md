# MonoCooler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/cooler/MonoCooler.sol)

**Inherits:** [IMonoCooler](/main/contracts/docs/src/policies/interfaces/cooler/IMonoCooler.sol/interface.IMonoCooler), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyAdmin](/main/contracts/docs/src/policies/utils/PolicyAdmin.sol/abstract.PolicyAdmin)

**Title:** Mono Cooler

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

## Constants

### _COLLATERAL_TOKEN

<i>

The collateral token, eg gOHM

</i>

```solidity
ERC20 private immutable _COLLATERAL_TOKEN;
```

### _OHM

<i>

The OHM token

</i>

```solidity
ERC20 private immutable _OHM;
```

### _STAKING

<i>

The OHM staking contract

</i>

```solidity
IStaking private immutable _STAKING;
```

### _MIN_DEBT_REQUIRED

<i>

The minimum debt a user needs to maintain

</i>

```solidity
uint256 private immutable _MIN_DEBT_REQUIRED;
```

### DOMAIN_SEPARATOR

<i>

Returns the domain separator used in the encoding of the signature for `setAuthorizationWithSig()`, as defined by [EIP712](/main/contracts/docs/src/external/OlympusERC20.sol/abstract.EIP712).

</i>

```solidity
bytes32 public immutable override DOMAIN_SEPARATOR;
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `bytes32` |             |

### _RAY

Extra precision scalar

```solidity
uint256 private constant _RAY = 1e27;
```

### _DOMAIN_TYPEHASH

<i>

The EIP-712 typeHash for EIP712Domain.

</i>

```solidity
bytes32 private constant _DOMAIN_TYPEHASH =
        keccak256("EIP712Domain(uint256 chainId,address verifyingContract)");
```

### _AUTHORIZATION_TYPEHASH

<i>

The EIP-712 typeHash for Authorization.

</i>

```solidity
bytes32 private constant _AUTHORIZATION_TYPEHASH =
        keccak256(
            "Authorization(address account,address authorized,uint96 authorizationDeadline,uint256 nonce,uint256 signatureDeadline)"
        );
```

### _EXPECTED_DECIMALS

<i>

expected decimals for the `_COLLATERAL_TOKEN` and `treasuryBorrower`

</i>

```solidity
uint8 private constant _EXPECTED_DECIMALS = 18;
```

### MAX_INTEREST_RATE

<i>

Cannot set an interest rate higher than 10%

</i>

```solidity
uint96 private constant MAX_INTEREST_RATE = 0.1e18;
```

## State Variables

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

<i>

To 18 decimal places

</i>

```solidity
uint128 public override totalCollateral;
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint128` |             |

### totalDebt

The total amount of debt which has been borrowed across all users
as of the latest checkpoint

<i>

To 18 decimal places

</i>

```solidity
uint128 public override totalDebt;
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint128` |             |

### interestAccumulatorRay

The accumulator index used to track the compounding of debt, starting at 1e27 at genesis

<i>

To RAY (1e27) precision

</i>

```solidity
uint256 public override interestAccumulatorRay;
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

### interestRateWad

The flat interest rate (APR).

<i>

Interest (approximately) continuously compounds at this rate.

</i>

<i>

To 18 decimal places

</i>

```solidity
uint96 public override interestRateWad;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint96` |             |

### ltvOracle

The oracle serving both the Max Origination LTV and the Liquidation LTV

```solidity
ICoolerLtvOracle public override ltvOracle;
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

### liquidationsPaused

Liquidations may be paused in order for users to recover/repay debt after
emergency actions or interest rate changes

```solidity
bool public override liquidationsPaused;
```

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

### borrowsPaused

Borrows may be paused for emergency actions or deprecating the facility

```solidity
bool public override borrowsPaused;
```

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

### interestAccumulatorUpdatedAt

The last time the global debt accumulator was updated

```solidity
uint40 public override interestAccumulatorUpdatedAt;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint40` |             |

### treasuryBorrower

The policy which borrows/repays from Treasury on behalf of Cooler

```solidity
ICoolerTreasuryBorrower public override treasuryBorrower;
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

### allAccountState

<i>

A per account store, tracking collateral/debt as of their latest checkpoint.

</i>

```solidity
mapping(address /* account */ => AccountState) private allAccountState;
```

### authorizations

Whether `authorized` is authorized to act on `authorizer`'s behalf for all user actions
up until the `authorizationDeadline` unix timestamp.

<i>

Anyone is authorized to modify their own positions, regardless of this variable.

</i>

```solidity
mapping(address /* account */ => mapping(address /* authorized */ => uint96 /* authorizationDeadline */))
        public
        override authorizations;
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |
| &lt;none&gt; | `address` |             |

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint96` |             |

### authorizationNonces

The `authorizer`'s current nonce. Used to prevent replay attacks with EIP-712 signatures.

```solidity
mapping(address /* account */ => uint256) public override authorizationNonces;
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

## Functions

<a id="constructor-address-address-address-address-address-uint96-uint256"></a>

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

**Parameters**

| Name             | Type      | Description |
| ---------------- | --------- | ----------- |
| ohm_             | `address` |             |
| gohm_            | `address` |             |
| staking_         | `address` |             |
| kernel_          | `address` |             |
| ltvOracle_       | `address` |             |
| interestRateWad_ | `uint96`  |             |
| minDebtRequired_ | `uint256` |             |

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
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="setauthorization-address-uint96"></a>

### setAuthorization

Sets the authorization for `authorized` to manage `msg.sender`'s positions until `authorizationDeadline`

<i>

Authorization can be revoked by setting the `authorizationDeadline` into the past

</i>

```solidity
function setAuthorization(address authorized, uint96 authorizationDeadline) external override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| authorized | `address` | The authorized address. |
| authorizationDeadline | `uint96` | The unix timestamp that they the authorization is valid until. |

<a id="setauthorizationwithsig-authorization-signature"></a>

### setAuthorizationWithSig

Sets the authorization for `authorization.authorized` to manage `authorization.authorizer`'s positions
until `authorization.authorizationDeadline`.

<i>

Warning: Reverts if the signature has already been submitted.

</i>

<i>

The signature is malleable, but it has no impact on the security here.

</i>

<i>

The nonce is passed as argument to be able to revert with a different error message.

</i>

<i>

Authorization can be revoked by calling `setAuthorization()` and setting the `authorizationDeadline` into the past

</i>

```solidity
function setAuthorizationWithSig(
        Authorization memory authorization,
        Signature calldata signature
    ) external override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| authorization | `Authorization` | The `Authorization` struct. |
| signature | `Signature` | The signature. |

<a id="issenderauthorized-address-address"></a>

### isSenderAuthorized

<i>

Returns whether the `sender` is authorized to manage `onBehalf`'s positions.

</i>

```solidity
function isSenderAuthorized(
        address sender,
        address onBehalfOf
    ) public view override returns (bool);
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| sender     | `address` |             |
| onBehalfOf | `address` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="_requiresenderauthorized-address-address"></a>

### _requireSenderAuthorized

```solidity
function _requireSenderAuthorized(address sender, address onBehalfOf) internal view;
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| sender     | `address` |             |
| onBehalfOf | `address` |             |

<a id="addcollateral-uint128-address-idlgtev1-delegationrequest"></a>

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| collateralAmount | `uint128` | The amount to deposit to 18 decimal places<br/>   - MUST be greater than zero |
| onBehalfOf | `address` | A caller can add collateral on behalf of themselves or another address.<br/>   - MUST NOT be address(0) |
| delegationRequests | `IDLGTEv1.DelegationRequest[]` | The set of delegations to apply after adding collateral.<br/>   - MAY be empty, meaning no delegations are applied.<br/>   - MUST ONLY be requests to add delegations, and that total MUST BE less than the `collateralAmount` argument<br/>   - If `onBehalfOf` does not equal the caller, the caller must be authorized via<br/>     `setAuthorization()` or `setAuthorizationWithSig()` |

<a id="withdrawcollateral-uint128-address-address-idlgtev1-delegationrequest"></a>

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| collateralAmount | `uint128` | The amount of collateral to remove to 18 decimal places<br/>   - MUST be greater than zero<br/>   - If set to type(uint128).max then withdraw the max amount up to maxOriginationLtv |
| onBehalfOf | `address` | A caller can withdraw collateral on behalf of themselves or another address if<br/>     authorized via `setAuthorization()` or `setAuthorizationWithSig()` |
| recipient | `address` | Send the gOHM collateral to a specified recipient address.<br/>   - MUST NOT be address(0) |
| delegationRequests | `IDLGTEv1.DelegationRequest[]` | The set of delegations to apply before removing collateral.<br/>   - MAY be empty, meaning no delegations are applied.<br/>   - MUST ONLY be requests to undelegate, and that total undelegated MUST BE less than the `collateralAmount` argument |

**Returns**

| Name                | Type      | Description |
| ------------------- | --------- | ----------- |
| collateralWithdrawn | `uint128` |             |

<a id="borrow-uint128-address-address"></a>

### borrow

Borrow `debtToken`

- Account LTV MUST be less than or equal to `maxOriginationLtv` after the borrow is applied
- Total debt for this account MUST be greater than or equal to the `minDebtRequired`
  after the borrow is applied

```solidity
function borrow(
        uint128 borrowAmount,
        address onBehalfOf,
        address recipient
    ) external override returns (uint128 amountBorrowed);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| borrowAmount | `uint128` | The amount of `debtToken` to borrow, to 18 decimals regardless of the debt token<br/>   - MUST be greater than zero<br/>   - If set to type(uint128).max then borrow the max amount up to maxOriginationLtv |
| onBehalfOf | `address` | A caller can borrow on behalf of themselves or another address if<br/>     authorized via `setAuthorization()` or `setAuthorizationWithSig()` |
| recipient | `address` | Send the borrowed token to a specified recipient address.<br/>   - MUST NOT be address(0) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountBorrowed | `uint128` | The amount actually borrowed. |

<a id="repay-uint128-address"></a>

### repay

Repay a portion, or all of the debt

- MUST NOT be called for an account which has no debt
- If the entire debt isn't paid off, then the total debt for this account
  MUST be greater than or equal to the `minDebtRequired` after the borrow is applied

```solidity
function repay(
        uint128 repayAmount,
        address onBehalfOf
    ) external override returns (uint128 amountRepaid);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| repayAmount | `uint128` | The amount to repay, to 18 decimals regardless of the debt token<br/>   - MUST be greater than zero<br/>   - MAY be greater than the latest debt as of this block. In which case it will be capped<br/>     to that latest debt |
| onBehalfOf | `address` | A caller can repay the debt on behalf of themselves or another address |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountRepaid | `uint128` | The amount actually repaid. |

<a id="applydelegations-idlgtev1-delegationrequest-address"></a>

### applyDelegations

Apply a set of delegation requests on behalf of a given user.

```solidity
function applyDelegations(
        IDLGTEv1.DelegationRequest[] calldata delegationRequests,
        address onBehalfOf
    )
        external
        override
        returns (uint256 totalDelegated, uint256 totalUndelegated, uint256 undelegatedBalance);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegationRequests | `IDLGTEv1.DelegationRequest[]` | The set of delegations to apply.<br/>   - MAY be empty, meaning no delegations are applied.<br/>   - Total collateral delegated as part of these requests MUST BE less than the account collateral.<br/>   - MUST NOT apply delegations that results in more collateral being undelegated than<br/>     the account has collateral for.<br/>   - It applies across total gOHM balances for a given account across all calling policies<br/>     So this may (un)delegate the account's gOHM set by another policy |
| onBehalfOf | `address` | A caller can apply delegations on behalf of themselves or another address if<br/>     authorized via `setAuthorization()` or `setAuthorizationWithSig()` |

**Returns**

| Name               | Type      | Description |
| ------------------ | --------- | ----------- |
| totalDelegated     | `uint256` |             |
| totalUndelegated   | `uint256` |             |
| undelegatedBalance | `uint256` |             |

<a id="applyunhealthydelegations-address-uint256"></a>

### applyUnhealthyDelegations

If an account becomes unhealthy and has many delegations such that liquidation can't be
performed in one transaction, then delegations can be rescinded over multiple transactions
in order to get this account into a state where it can then be liquidated.

```solidity
function applyUnhealthyDelegations(
        address account,
        uint256 autoRescindMaxNumDelegates
    ) external override returns (uint256 totalUndelegated, uint256 undelegatedBalance);
```

**Parameters**

| Name                       | Type      | Description |
| -------------------------- | --------- | ----------- |
| account                    | `address` |             |
| autoRescindMaxNumDelegates | `uint256` |             |

**Returns**

| Name               | Type      | Description |
| ------------------ | --------- | ----------- |
| totalUndelegated   | `uint256` |             |
| undelegatedBalance | `uint256` |             |

<a id="batchliquidate-address"></a>

### batchLiquidate

Liquidate one or more accounts which have exceeded the `liquidationLtv`
The gOHM collateral is seized (unstaked to OHM and burned), and the accounts debt is wiped.

<i>

- If one of the provided accounts in the batch hasn't exceeded the max LTV then it is skipped.
  - Delegations are auto-rescinded if required. Ordering of this is not guaranteed.

</i>

```solidity
function batchLiquidate(
        address[] calldata accounts
    )
        external
        override
        returns (
            uint128 totalCollateralClaimed,
            uint128 totalDebtWiped,
            uint128 totalLiquidationIncentive
        );
```

**Parameters**

| Name     | Type        | Description |
| -------- | ----------- | ----------- |
| accounts | `address[]` |             |

**Returns**

| Name                      | Type      | Description |
| ------------------------- | --------- | ----------- |
| totalCollateralClaimed    | `uint128` |             |
| totalDebtWiped            | `uint128` |             |
| totalLiquidationIncentive | `uint128` |             |

<a id="setltvoracle-address"></a>

### setLtvOracle

Set the oracle which serves the max Origination LTV and the Liquidation LTV

```solidity
function setLtvOracle(address newOracle) external override onlyAdminRole;
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| newOracle | `address` |             |

<a id="settreasuryborrower-address"></a>

### setTreasuryBorrower

Set the policy which borrows/repays from Treasury on behalf of Cooler

```solidity
function setTreasuryBorrower(address newTreasuryBorrower) external override;
```

**Parameters**

| Name                | Type      | Description |
| ------------------- | --------- | ----------- |
| newTreasuryBorrower | `address` |             |

<a id="setliquidationspaused-bool"></a>

### setLiquidationsPaused

Liquidation may be paused in order for users to recover/repay debt after emergency actions

<i>

Can only be called by emergency or admin roles

</i>

```solidity
function setLiquidationsPaused(bool isPaused) external override onlyEmergencyOrAdminRole;
```

**Parameters**

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| isPaused | `bool` |             |

<a id="setborrowpaused-bool"></a>

### setBorrowPaused

Pause any new borrows of `debtToken`

<i>

Can only be called by emergency or admin roles

</i>

```solidity
function setBorrowPaused(bool isPaused) external override onlyEmergencyOrAdminRole;
```

**Parameters**

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| isPaused | `bool` |             |

<a id="setinterestratewad-uint96"></a>

### setInterestRateWad

Update the interest rate (APR), specified in Wad (18 decimals)

<i>

- Cannot be set higher than 10% APR
- Interest (approximately) continuously compounds at this rate.

</i>

```solidity
function setInterestRateWad(uint96 newInterestRate) external override onlyAdminRole;
```

**Parameters**

| Name            | Type     | Description |
| --------------- | -------- | ----------- |
| newInterestRate | `uint96` |             |

<a id="setmaxdelegateaddresses-address-uint32"></a>

### setMaxDelegateAddresses

Allow an account to have more or less than the DEFAULT_MAX_DELEGATE_ADDRESSES
number of delegates.

```solidity
function setMaxDelegateAddresses(
        address account,
        uint32 maxDelegateAddresses
    ) external override onlyAdminRole;
```

**Parameters**

| Name                 | Type      | Description |
| -------------------- | --------- | ----------- |
| account              | `address` |             |
| maxDelegateAddresses | `uint32`  |             |

<a id="checkpointdebt"></a>

### checkpointDebt

Update and checkpoint the total debt up until now

<i>

May be useful in case there are no new user actions for some time.

</i>

```solidity
function checkpointDebt()
        external
        override
        returns (uint128 /*totalDebt*/, uint256 /*interestAccumulatorRay*/);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint128` |             |
| &lt;none&gt; | `uint256` |             |

<a id="collateraltoken"></a>

### collateralToken

The collateral token supplied by users/accounts, eg gOHM

```solidity
function collateralToken() external view override returns (IERC20);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `IERC20` |             |

<a id="ohm"></a>

### ohm

Unwrapped gOHM

```solidity
function ohm() external view override returns (IERC20);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `IERC20` |             |

<a id="debttoken"></a>

### debtToken

The debt token which can be borrowed, eg DAI or USDS

```solidity
function debtToken() external view override returns (IERC20);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `IERC20` |             |

<a id="staking"></a>

### staking

staking contract to unstake (and burn) OHM from liquidations

```solidity
function staking() external view override returns (IStaking);
```

**Returns**

| Name         | Type       | Description |
| ------------ | ---------- | ----------- |
| &lt;none&gt; | `IStaking` |             |

<a id="mindebtrequired"></a>

### minDebtRequired

The minimum debt a user needs to maintain

<i>

It costs gas to liquidate users, so we don't want dust amounts.
To 18 decimal places

</i>

```solidity
function minDebtRequired() external view override returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="loantovalues"></a>

### loanToValues

The current Max Origination LTV and Liquidation LTV from the `ltvOracle()`

<i>

Both to 18 decimal places

</i>

```solidity
function loanToValues()
        external
        view
        override
        returns (uint96 maxOriginationLtv, uint96 liquidationLtv);
```

**Returns**

| Name              | Type     | Description |
| ----------------- | -------- | ----------- |
| maxOriginationLtv | `uint96` |             |
| liquidationLtv    | `uint96` |             |

<a id="debtdeltaformaxoriginationltv-address-int128"></a>

### debtDeltaForMaxOriginationLtv

Calculate the difference in debt required in order to be at or just under
the maxOriginationLTV if `collateralDelta` was added/removed
from the current position.
A positive `debtDeltaInWad` means the account can borrow that amount after adding that `collateralDelta` collateral
A negative `debtDeltaInWad` means it needs to repay that amount in order to withdraw that `collateralDelta` collateral

<i>

debtDeltaInWad is always to 18 decimal places

</i>

```solidity
function debtDeltaForMaxOriginationLtv(
        address account,
        int128 collateralDelta
    ) external view override returns (int128 debtDelta);
```

**Parameters**

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| account         | `address` |             |
| collateralDelta | `int128`  |             |

**Returns**

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| debtDelta | `int128` |             |

<a id="accountposition-address"></a>

### accountPosition

An view of an accounts current and up to date position as of this block

```solidity
function accountPosition(
        address account
    ) external view override returns (AccountPosition memory position);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | `address` | The account to get a position for |

**Returns**

| Name     | Type              | Description |
| -------- | ----------------- | ----------- |
| position | `AccountPosition` |             |

<a id="computeliquidity-address"></a>

### computeLiquidity

Compute the liquidity status for a set of accounts.

<i>

This can be used to verify if accounts can be liquidated or not.

</i>

```solidity
function computeLiquidity(
        address[] calldata accounts
    ) external view override returns (LiquidationStatus[] memory status);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| accounts | `address[]` | The accounts to get the status for. |

**Returns**

| Name   | Type                  | Description |
| ------ | --------------------- | ----------- |
| status | `LiquidationStatus[]` |             |

<a id="accountdelegationslist-address-uint256-uint256"></a>

### accountDelegationsList

Paginated view of an account's delegations

<i>

Can call sequentially increasing the `startIndex` each time by the number of items returned in the previous call,
until number of items returned is less than `maxItems`

</i>

```solidity
function accountDelegationsList(
        address account,
        uint256 startIndex,
        uint256 maxItems
    ) external view override returns (IDLGTEv1.AccountDelegation[] memory delegations);
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| account    | `address` |             |
| startIndex | `uint256` |             |
| maxItems   | `uint256` |             |

**Returns**

| Name        | Type                           | Description |
| ----------- | ------------------------------ | ----------- |
| delegations | `IDLGTEv1.AccountDelegation[]` |             |

<a id="accountstate-address"></a>

### accountState

A view of the last checkpoint of account data (not as of this block)

```solidity
function accountState(address account) external view override returns (AccountState memory);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| account | `address` |             |

**Returns**

| Name         | Type           | Description |
| ------------ | -------------- | ----------- |
| &lt;none&gt; | `AccountState` |             |

<a id="accountcollateral-address"></a>

### accountCollateral

An account's current collateral

<i>

to 18 decimal places

</i>

```solidity
function accountCollateral(address account) external view override returns (uint128);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| account | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint128` |             |

<a id="accountdebt-address"></a>

### accountDebt

An account's current debt as of this block

```solidity
function accountDebt(address account) external view override returns (uint128);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| account | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint128` |             |

<a id="globalstate"></a>

### globalState

A view of the derived/internal cache data.

```solidity
function globalState()
        external
        view
        override
        returns (uint128 /*totalDebt*/, uint256 /*interestAccumulatorRay*/);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint128` |             |
| &lt;none&gt; | `uint256` |             |

<a id="_globalstaterw"></a>

### _globalStateRW

<i>

Setup and refresh the global state
Update storage if and only if the timestamp has changed since last updated.

</i>

```solidity
function _globalStateRW() private returns (GlobalStateCache memory gStateCache);
```

**Returns**

| Name        | Type               | Description |
| ----------- | ------------------ | ----------- |
| gStateCache | `GlobalStateCache` |             |

<a id="_globalstatero"></a>

### _globalStateRO

<i>

Setup the GlobalStateCache for a given token
read only -- storage isn't updated.

</i>

```solidity
function _globalStateRO() private view returns (GlobalStateCache memory gStateCache);
```

**Returns**

| Name        | Type               | Description |
| ----------- | ------------------ | ----------- |
| gStateCache | `GlobalStateCache` |             |

<a id="_initglobalstatecache-globalstatecache"></a>

### _initGlobalStateCache

<i>

Initialize the global state cache from storage to this block, for a given token.

</i>

```solidity
function _initGlobalStateCache(
        GlobalStateCache memory gStateCache
    ) private view returns (bool dirty);
```

**Parameters**

| Name        | Type               | Description |
| ----------- | ------------------ | ----------- |
| gStateCache | `GlobalStateCache` |             |

**Returns**

| Name  | Type   | Description |
| ----- | ------ | ----------- |
| dirty | `bool` |             |

<a id="_reducetotaldebt-globalstatecache-uint128"></a>

### _reduceTotalDebt

<i>

Reduce the total debt in storage by a repayment amount.
NB: The sum of all users debt may be slightly more than the recorded total debt
because users debt is rounded up for dust.
The total debt is floored at 0.

</i>

```solidity
function _reduceTotalDebt(GlobalStateCache memory gStateCache, uint128 repayAmount) private;
```

**Parameters**

| Name        | Type               | Description |
| ----------- | ------------------ | ----------- |
| gStateCache | `GlobalStateCache` |             |
| repayAmount | `uint128`          |             |

<a id="_maxdebt-uint128-uint256"></a>

### _maxDebt

<i>

Calculate the maximum amount which can be borrowed up to the maxOriginationLtv, given
a collateral amount

</i>

```solidity
function _maxDebt(
        uint128 collateral,
        uint256 maxOriginationLtv
    ) private pure returns (uint128);
```

**Parameters**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| collateral        | `uint128` |             |
| maxOriginationLtv | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint128` |             |

<a id="_mincollateral-uint128-uint256"></a>

### _minCollateral

<i>

Calculate the maximum collateral amount which can be withdrawn up to the maxOriginationLtv, given
a current debt amount

</i>

```solidity
function _minCollateral(
        uint128 debt,
        uint256 maxOriginationLtv
    ) private pure returns (uint128);
```

**Parameters**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| debt              | `uint128` |             |
| maxOriginationLtv | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint128` |             |

<a id="_validateoriginationltv-uint128-uint256"></a>

### _validateOriginationLtv

<i>

Ensure the LTV isn't higher than the maxOriginationLtv

</i>

```solidity
function _validateOriginationLtv(uint128 ltv, uint256 maxOriginationLtv) private pure;
```

**Parameters**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| ltv               | `uint128` |             |
| maxOriginationLtv | `uint256` |             |

<a id="_calculatecurrentltv-uint128-uint128"></a>

### _calculateCurrentLtv

<i>

Calculate the current LTV based on the latest debt

</i>

```solidity
function _calculateCurrentLtv(
        uint128 currentDebt,
        uint128 collateral
    ) private pure returns (uint128);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| currentDebt | `uint128` |             |
| collateral  | `uint128` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint128` |             |

<a id="_computeliquidity-accountstate-globalstatecache"></a>

### _computeLiquidity

<i>

Generate the LiquidationStatus struct with current details
for this account.

</i>

```solidity
function _computeLiquidity(
        AccountState memory aStateCache,
        GlobalStateCache memory gStateCache
    ) private pure returns (LiquidationStatus memory status);
```

**Parameters**

| Name        | Type               | Description |
| ----------- | ------------------ | ----------- |
| aStateCache | `AccountState`     |             |
| gStateCache | `GlobalStateCache` |             |

**Returns**

| Name   | Type                | Description |
| ------ | ------------------- | ----------- |
| status | `LiquidationStatus` |             |

<a id="_currentaccountdebt-uint128-uint256-uint256"></a>

### _currentAccountDebt

<i>

Calculate the latest debt for a given account & token.
Derived from the prior debt checkpoint, and the interest accumulator.

</i>

```solidity
function _currentAccountDebt(
        uint128 accountDebtCheckpoint_,
        uint256 accountInterestAccumulatorRay_,
        uint256 globalInterestAccumulatorRay_
    ) private pure returns (uint128 result);
```

**Parameters**

| Name                           | Type      | Description |
| ------------------------------ | --------- | ----------- |
| accountDebtCheckpoint_         | `uint128` |             |
| accountInterestAccumulatorRay_ | `uint256` |             |
| globalInterestAccumulatorRay_  | `uint256` |             |

**Returns**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| result | `uint128` |             |

<a id="_requireamountnonzero-uint256"></a>

### _requireAmountNonZero

```solidity
function _requireAmountNonZero(uint256 amount_) internal pure;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| amount_ | `uint256` |             |

<a id="_requireaddressnonzero-address"></a>

### _requireAddressNonZero

```solidity
function _requireAddressNonZero(address addr_) internal pure;
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| addr_ | `address` |             |

## Structs

### GlobalStateCache

```solidity
struct GlobalStateCache {
        /**
         * @notice The total amount that has already been borrowed by all accounts.
         * This increases as interest accrues or new borrows.
         * Decreases on repays or liquidations.
         */
        uint128 totalDebt;
        /**
         * @notice Internal tracking of the accumulated interest as an index starting from 1.0e27
         * When this accumulator is compunded by the interest rate, the total debt can be calculated as
         * `updatedTotalDebt = prevTotalDebt * latestInterestAccumulator / prevInterestAccumulator
         */
        uint256 interestAccumulatorRay;
        /**
         * @notice The current Liquidation LTV, served from the `ltvOracle`
         */
        uint96 liquidationLtv;
        /**
         * @notice The current Max Origination LTV, served from the `ltvOracle`
         */
        uint96 maxOriginationLtv;
    }
```

**Properties**

| Name                   | Type      | Description |
| ---------------------- | --------- | ----------- |
| totalDebt              | `uint128` |             |
| interestAccumulatorRay | `uint256` |             |
| liquidationLtv         | `uint96`  |             |
| maxOriginationLtv      | `uint96`  |             |
