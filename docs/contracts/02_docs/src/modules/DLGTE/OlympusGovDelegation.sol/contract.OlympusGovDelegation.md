# OlympusGovDelegation

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/DLGTE/OlympusGovDelegation.sol)

**Inherits:** [DLGTEv1](/main/contracts/docs/src/modules/DLGTE/DLGTE.v1.sol/abstract.DLGTEv1)

**Title:** Olympus Governance Delegation

Olympus Governance Delegation (Module) Contract

<i>

The Olympus Governance Delegation Module enables policies to delegate gOHM on behalf of users.
        If the gOHM is undelegated, this module acts as an escrow for the gOHM.
        When the gOHM is delegated, new individual escrows are created for those delegates, and that
        portion of gOHM is transferred to that escrow.
        gOHM balances are tracked per (policy, account) separately such that one policy cannot pull the
        gOHM from another policy (eg policy B pulling collateral out of the Cooler policy).

</i>

## Constants

### delegateEscrowFactory

```solidity
DelegateEscrowFactory public immutable delegateEscrowFactory;
```

## State Variables

### _accountState

<i>

The mapping of a delegate's address to their escrow contract

</i>

<i>

An account's current state across all policies
A given account is allowed up to 10 delegates. This is capped because to avoid gas griefing,
eg within Cooler, upon a liquidation, the gOHM needs to be pulled from all delegates.

</i>

```solidity
mapping(address /*account*/ => AccountState /*delegations*/) private _accountState;
```

### _policyAccountBalances

<i>

The per policy balances of (delegated and undelegated) gOHM for each end user account
One policy isn't allowed to deposit/withdraw to another policy's tracked balances
Eg policy B cannot withdraw gOHM from the collateral held here by the Cooler policy

</i>

```solidity
mapping(address /*policy*/ => mapping(address /*account*/ => uint256 /*totalGOhm*/))
        private _policyAccountBalances;
```

## Functions

<a id="constructor-kernel-address-delegateescrowfactory"></a>

### constructor

```solidity
constructor(
        Kernel kernel_,
        address gohm_,
        DelegateEscrowFactory delegateEscrowFactory_
    ) Module(kernel_) DLGTEv1(gohm_);
```

**Parameters**

| Name                   | Type                    | Description |
| ---------------------- | ----------------------- | ----------- |
| kernel_                | `Kernel`                |             |
| gohm_                  | `address`               |             |
| delegateEscrowFactory_ | `DelegateEscrowFactory` |             |

<a id="keycode"></a>

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `Keycode` |             |

<a id="version"></a>

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="depositundelegatedgohm-address-uint256"></a>

### depositUndelegatedGohm

gOHM is pulled from the calling policy and added to the undelegated balance.

<i>

- This gOHM cannot be used for governance voting until it is delegated.
  - Deposted gOHM balances are tracked per policy. policyA cannot withdraw gOHM that policyB deposited

</i>

```solidity
function depositUndelegatedGohm(
        address onBehalfOf,
        uint256 amount
    ) external override permissioned;
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| onBehalfOf | `address` |             |
| amount     | `uint256` |             |

<a id="withdrawundelegatedgohm-address-uint256-uint256"></a>

### withdrawUndelegatedGohm

Undelegated gOHM is transferred to the calling policy.

<i>

- If `autoRescindMaxNumDelegates` is greater than zero, the delegations will be automatically rescinded if required
  from up to `autoRescindMaxNumDelegates` number of delegate escrows. See `rescindDelegations()` for details
  - Will revert if there is still not enough undelegated gOHM for `onBehalfOf` OR
    if policy is attempting to withdraw more gOHM than it deposited
    Deposted gOHM balances are tracked per policy. policyA cannot withdraw gOHM that policyB deposited

</i>

```solidity
function withdrawUndelegatedGohm(
        address onBehalfOf,
        uint256 amount,
        uint256 autoRescindMaxNumDelegates
    ) external override permissioned;
```

**Parameters**

| Name                       | Type      | Description |
| -------------------------- | --------- | ----------- |
| onBehalfOf                 | `address` |             |
| amount                     | `uint256` |             |
| autoRescindMaxNumDelegates | `uint256` |             |

<a id="rescinddelegations-address-uint256-uint256"></a>

### rescindDelegations

Rescind delegations until the amount undelegated for the `onBehalfOf` account
is greater or equal to `requestedUndelegatedBalance`. No more than `maxNumDelegates`
will be rescinded as part of this

<i>

- Delegations are rescinded by iterating through the delegate addresses for the
  `onBehalfOf` address.
  - No guarantees on the order of who is rescinded -- it may change as delegations are
    removed
  - A calling policy may be able to rescind more than it added via `depositUndelegatedGohm()`
    however the policy cannot then withdraw an amount higher than what it deposited.
  - If the full `requestedUndelegatedBalance` cannot be fulfilled the `actualUndelegatedBalance`
    return parameter may be less than `requestedUndelegatedBalance`. The caller must decide
    on how to handle that.

</i>

```solidity
function rescindDelegations(
        address onBehalfOf,
        uint256 requestedUndelegatedBalance,
        uint256 maxNumDelegates
    )
        external
        override
        permissioned
        returns (uint256 totalRescinded, uint256 newUndelegatedBalance);
```

**Parameters**

| Name                        | Type      | Description |
| --------------------------- | --------- | ----------- |
| onBehalfOf                  | `address` |             |
| requestedUndelegatedBalance | `uint256` |             |
| maxNumDelegates             | `uint256` |             |

**Returns**

| Name                  | Type      | Description |
| --------------------- | --------- | ----------- |
| totalRescinded        | `uint256` |             |
| newUndelegatedBalance | `uint256` |             |

<a id="applydelegations-address-idlgtev1-delegationrequest"></a>

### applyDelegations

Apply a set of delegation requests on behalf of a given account.

- Each delegation request either delegates or undelegates to an address
- It applies across total gOHM balances for a given account across all calling policies
  So policyA may (un)delegate the account's gOHM set by policyA, B and C

```solidity
function applyDelegations(
        address onBehalfOf,
        IDLGTEv1.DelegationRequest[] calldata delegationRequests
    )
        external
        override
        permissioned
        returns (
            uint256 appliedDelegationAmounts,
            uint256 appliedUndelegationAmounts,
            uint256 undelegatedBalance
        );
```

**Parameters**

| Name               | Type                           | Description |
| ------------------ | ------------------------------ | ----------- |
| onBehalfOf         | `address`                      |             |
| delegationRequests | `IDLGTEv1.DelegationRequest[]` |             |

**Returns**

| Name                       | Type      | Description |
| -------------------------- | --------- | ----------- |
| appliedDelegationAmounts   | `uint256` |             |
| appliedUndelegationAmounts | `uint256` |             |
| undelegatedBalance         | `uint256` |             |

<a id="setmaxdelegateaddresses-address-uint32"></a>

### setMaxDelegateAddresses

Set an account to have more or less than the DEFAULT_MAX_DELEGATE_ADDRESSES
number of delegates.

```solidity
function setMaxDelegateAddresses(
        address account,
        uint32 maxDelegates
    ) external override permissioned;
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| account      | `address` |             |
| maxDelegates | `uint32`  |             |

<a id="policyaccountbalances-address-address"></a>

### policyAccountBalances

Report the total delegated and undelegated gOHM balance for an account
in a given policy

```solidity
function policyAccountBalances(
        address policy,
        address account
    ) external view override returns (uint256 gOhmBalance);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| policy  | `address` |             |
| account | `address` |             |

**Returns**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| gOhmBalance | `uint256` |             |

<a id="accountdelegationslist-address-uint256-uint256"></a>

### accountDelegationsList

Paginated view of an account's delegations

<i>

This can be called sequentially, increasing the `startIndex` each time by the number of items
returned in the previous call, until number of items returned is less than `maxItems`
The `totalAmount` delegated within the return struct is across all policies for that account delegate

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

<a id="totaldelegatedto-address"></a>

### totalDelegatedTo

The total amount delegated to a particular delegate across all policies,
and externally made delegations (including any permanent donations)

```solidity
function totalDelegatedTo(address delegate) external view override returns (uint256);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| delegate | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="accountdelegationsummary-address"></a>

### accountDelegationSummary

A summary of an account's delegations

```solidity
function accountDelegationSummary(
        address account
    )
        external
        view
        override
        returns (
            uint256 /*totalGOhm*/,
            uint256 /*delegatedGOhm*/,
            uint256 /*numDelegateAddresses*/,
            uint256 /*maxAllowedDelegateAddresses*/
        );
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| account | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |
| &lt;none&gt; | `uint256` |             |
| &lt;none&gt; | `uint256` |             |
| &lt;none&gt; | `uint256` |             |

<a id="maxdelegateaddresses-address"></a>

### maxDelegateAddresses

The maximum number of delegates an account can have accross all policies

```solidity
function maxDelegateAddresses(address account) external view override returns (uint32 result);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| account | `address` |             |

**Returns**

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| result | `uint32` |             |

<a id="_applydelegations-address-accountstate-uint256-idlgtev1-delegationrequest"></a>

### _applyDelegations

```solidity
function _applyDelegations(
        address onBehalfOf,
        AccountState storage aState,
        uint256 undelegatedBalance,
        IDLGTEv1.DelegationRequest[] calldata delegationRequests
    )
        private
        returns (
            uint256 appliedDelegationAmounts,
            uint256 appliedUndelegationAmounts,
            uint256 newUndelegatedBalance
        );
```

**Parameters**

| Name               | Type                           | Description |
| ------------------ | ------------------------------ | ----------- |
| onBehalfOf         | `address`                      |             |
| aState             | `AccountState`                 |             |
| undelegatedBalance | `uint256`                      |             |
| delegationRequests | `IDLGTEv1.DelegationRequest[]` |             |

**Returns**

| Name                       | Type      | Description |
| -------------------------- | --------- | ----------- |
| appliedDelegationAmounts   | `uint256` |             |
| appliedUndelegationAmounts | `uint256` |             |
| newUndelegatedBalance      | `uint256` |             |

<a id="_maxdelegateaddresses-accountstate"></a>

### _maxDelegateAddresses

```solidity
function _maxDelegateAddresses(
        AccountState storage aState
    ) private returns (uint32 maxDelegates);
```

**Parameters**

| Name   | Type           | Description |
| ------ | -------------- | ----------- |
| aState | `AccountState` |             |

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| maxDelegates | `uint32` |             |

<a id="_applydelegation-address-uint256-uint32-enumerablemap-addresstouint256map-idlgtev1-delegationrequest"></a>

### _applyDelegation

```solidity
function _applyDelegation(
        address onBehalfOf,
        uint256 undelegatedBalance,
        uint32 maxDelegates,
        EnumerableMap.AddressToUintMap storage acctDelegatedAmounts,
        IDLGTEv1.DelegationRequest calldata delegationRequest
    ) private returns (uint256 delegatedAmount, uint256 undelegatedAmount);
```

**Parameters**

| Name                 | Type                             | Description |
| -------------------- | -------------------------------- | ----------- |
| onBehalfOf           | `address`                        |             |
| undelegatedBalance   | `uint256`                        |             |
| maxDelegates         | `uint32`                         |             |
| acctDelegatedAmounts | `EnumerableMap.AddressToUintMap` |             |
| delegationRequest    | `IDLGTEv1.DelegationRequest`     |             |

**Returns**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| delegatedAmount   | `uint256` |             |
| undelegatedAmount | `uint256` |             |

<a id="_adddelegation-address-address-uint256-enumerablemap-addresstouint256map-uint32"></a>

### _addDelegation

```solidity
function _addDelegation(
        address onBehalfOf,
        address delegate,
        uint256 delegatedAmount,
        EnumerableMap.AddressToUintMap storage acctDelegatedAmounts,
        uint32 maxDelegates
    ) private;
```

**Parameters**

| Name                 | Type                             | Description |
| -------------------- | -------------------------------- | ----------- |
| onBehalfOf           | `address`                        |             |
| delegate             | `address`                        |             |
| delegatedAmount      | `uint256`                        |             |
| acctDelegatedAmounts | `EnumerableMap.AddressToUintMap` |             |
| maxDelegates         | `uint32`                         |             |

<a id="_autorescinddelegations-address-uint256-accountstate-uint256-uint256"></a>

### _autoRescindDelegations

```solidity
function _autoRescindDelegations(
        address onBehalfOf,
        uint256 requestedUndelegatedBalance,
        AccountState storage aState,
        uint256 totalAccountGOhm,
        uint256 maxNumDelegates
    ) private returns (uint256 totalRescinded, uint256 newUndelegatedBalance);
```

**Parameters**

| Name                        | Type           | Description |
| --------------------------- | -------------- | ----------- |
| onBehalfOf                  | `address`      |             |
| requestedUndelegatedBalance | `uint256`      |             |
| aState                      | `AccountState` |             |
| totalAccountGOhm            | `uint256`      |             |
| maxNumDelegates             | `uint256`      |             |

**Returns**

| Name                  | Type      | Description |
| --------------------- | --------- | ----------- |
| totalRescinded        | `uint256` |             |
| newUndelegatedBalance | `uint256` |             |

<a id="_rescinddelegation-address-address-uint256-uint256-enumerablemap-addresstouint256map"></a>

### _rescindDelegation

```solidity
function _rescindDelegation(
        address onBehalfOf,
        address delegate,
        uint256 delegatedBalance,
        uint256 rescindAmount,
        EnumerableMap.AddressToUintMap storage acctDelegatedAmounts
    ) private;
```

**Parameters**

| Name                 | Type                             | Description |
| -------------------- | -------------------------------- | ----------- |
| onBehalfOf           | `address`                        |             |
| delegate             | `address`                        |             |
| delegatedBalance     | `uint256`                        |             |
| rescindAmount        | `uint256`                        |             |
| acctDelegatedAmounts | `EnumerableMap.AddressToUintMap` |             |

## Structs

### AccountState

```solidity
struct AccountState {
        /// @dev A regular account is allowed to delegate up to 10 different addresses.
        /// The account may be whitelisted to delegate more than that.
        EnumerableMap.AddressToUintMap delegatedAmounts;
        /// @dev The total gOHM undelegated and delegated gOHM for this account across all delegates.
        uint112 totalGOhm;
        /// @dev The total gOhm delegated for this account across all delegates
        uint112 delegatedGOhm;
        /// @dev By default an account can only delegate to 10 addresses.
        /// This may be increased on a per account basis by governance.
        uint32 maxDelegateAddresses;
    }
```

**Properties**

| Name                 | Type                             | Description |
| -------------------- | -------------------------------- | ----------- |
| delegatedAmounts     | `EnumerableMap.AddressToUintMap` |             |
| totalGOhm            | `uint112`                        |             |
| delegatedGOhm        | `uint112`                        |             |
| maxDelegateAddresses | `uint32`                         |             |
