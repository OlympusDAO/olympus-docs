# DLGTEv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/DLGTE/DLGTE.v1.sol)

**Inherits:** [Module](/main/contracts/docs/src/Kernel.sol/abstract.Module), [IDLGTEv1](/main/contracts/docs/src/modules/DLGTE/IDLGTE.v1.sol/interface.IDLGTEv1)

**Title:** Olympus Governance Delegation

Olympus Governance Delegation (Module) Contract

<i>

The Olympus Governance Delegation Module enables policies to delegate gOHM on behalf of accounts.
        If the gOHM is undelegated, this module acts as an escrow for the gOHM.
        When the gOHM is delegated, new individual escrows are created for those delegates, and that
        portion of gOHM is transferred to that escrow.
        gOHM balances are tracked per (policy, account) separately such that one policy cannot pull the
        gOHM from another policy (eg policy B pulling collateral out of the Cooler policy).

</i>

## Constants

### _gOHM

```solidity
ERC20 internal immutable _gOHM;
```

### DEFAULT_MAX_DELEGATE_ADDRESSES

The default maximum number of addresses an account can delegate to

```solidity
uint32 public constant override DEFAULT_MAX_DELEGATE_ADDRESSES = 10;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint32` |             |

## Functions

<a id="constructor-address"></a>

### constructor

```solidity
constructor(address gohm_);
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| gohm_ | `address` |             |

<a id="setmaxdelegateaddresses-address-uint32"></a>

### setMaxDelegateAddresses

Set an account to have more or less than the DEFAULT_MAX_DELEGATE_ADDRESSES
number of delegates.

```solidity
function setMaxDelegateAddresses(
        address account,
        uint32 maxDelegateAddresses
    ) external virtual override;
```

**Parameters**

| Name                 | Type      | Description |
| -------------------- | --------- | ----------- |
| account              | `address` |             |
| maxDelegateAddresses | `uint32`  |             |

<a id="depositundelegatedgohm-address-uint256"></a>

### depositUndelegatedGohm

gOHM is pulled from the calling policy and added to the undelegated balance.

<i>

- This gOHM cannot be used for governance voting until it is delegated.
  - Deposted gOHM balances are tracked per policy. policyA cannot withdraw gOHM that policyB deposited

</i>

```solidity
function depositUndelegatedGohm(address onBehalfOf, uint256 amount) external virtual override;
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
    ) external virtual override;
```

**Parameters**

| Name                       | Type      | Description |
| -------------------------- | --------- | ----------- |
| onBehalfOf                 | `address` |             |
| amount                     | `uint256` |             |
| autoRescindMaxNumDelegates | `uint256` |             |

<a id="applydelegations-address-delegationrequest"></a>

### applyDelegations

Apply a set of delegation requests on behalf of a given account.

- Each delegation request either delegates or undelegates to an address
- It applies across total gOHM balances for a given account across all calling policies
  So policyA may (un)delegate the account's gOHM set by policyA, B and C

```solidity
function applyDelegations(
        address onBehalfOf,
        DelegationRequest[] calldata delegationRequests
    )
        external
        virtual
        override
        returns (uint256 totalDelegated, uint256 totalUndelegated, uint256 undelegatedBalance);
```

**Parameters**

| Name               | Type                  | Description |
| ------------------ | --------------------- | ----------- |
| onBehalfOf         | `address`             |             |
| delegationRequests | `DelegationRequest[]` |             |

**Returns**

| Name               | Type      | Description |
| ------------------ | --------- | ----------- |
| totalDelegated     | `uint256` |             |
| totalUndelegated   | `uint256` |             |
| undelegatedBalance | `uint256` |             |

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
    ) external virtual override returns (uint256 totalRescinded, uint256 newUndelegatedBalance);
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

<a id="policyaccountbalances-address-address"></a>

### policyAccountBalances

Report the total delegated and undelegated gOHM balance for an account
in a given policy

```solidity
function policyAccountBalances(
        address policy,
        address account
    ) external view virtual override returns (uint256 gOhmBalance);
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
    ) external view virtual override returns (AccountDelegation[] memory delegations);
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| account    | `address` |             |
| startIndex | `uint256` |             |
| maxItems   | `uint256` |             |

**Returns**

| Name        | Type                  | Description |
| ----------- | --------------------- | ----------- |
| delegations | `AccountDelegation[]` |             |

<a id="accountdelegationsummary-address"></a>

### accountDelegationSummary

A summary of an account's delegations

```solidity
function accountDelegationSummary(
        address account
    )
        external
        view
        virtual
        returns (
            uint256 totalGOhm,
            uint256 delegatedGOhm,
            uint256 numDelegateAddresses,
            uint256 maxAllowedDelegateAddresses
        );
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| account | `address` |             |

**Returns**

| Name                        | Type      | Description |
| --------------------------- | --------- | ----------- |
| totalGOhm                   | `uint256` |             |
| delegatedGOhm               | `uint256` |             |
| numDelegateAddresses        | `uint256` |             |
| maxAllowedDelegateAddresses | `uint256` |             |

<a id="totaldelegatedto-address"></a>

### totalDelegatedTo

The total amount delegated to a particular delegate across all policies,
and externally made delegations (including any permanent donations)

```solidity
function totalDelegatedTo(address delegate) external view virtual returns (uint256);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| delegate | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="maxdelegateaddresses-address"></a>

### maxDelegateAddresses

The maximum number of delegates an account can have accross all policies

```solidity
function maxDelegateAddresses(
        address account
    ) external view virtual override returns (uint32 result);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| account | `address` |             |

**Returns**

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| result | `uint32` |             |

<a id="gohm"></a>

### gOHM

The gOhm token supplied by accounts

```solidity
function gOHM() external view override returns (IERC20);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `IERC20` |             |
