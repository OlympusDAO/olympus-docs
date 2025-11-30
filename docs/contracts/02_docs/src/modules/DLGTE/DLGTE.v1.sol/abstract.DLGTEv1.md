# DLGTEv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/modules/DLGTE/DLGTE.v1.sol)

**Inherits:**
[Module](/main/contracts/docs/src/Kernel.sol/abstract.Module), [IDLGTEv1](/main/contracts/docs/src/modules/DLGTE/IDLGTE.v1.sol/interface.IDLGTEv1)

**Title:**
Olympus Governance Delegation

Olympus Governance Delegation (Module) Contract

The Olympus Governance Delegation Module enables policies to delegate gOHM on behalf of accounts.
If the gOHM is undelegated, this module acts as an escrow for the gOHM.
When the gOHM is delegated, new individual escrows are created for those delegates, and that
portion of gOHM is transferred to that escrow.
gOHM balances are tracked per (policy, account) separately such that one policy cannot pull the
gOHM from another policy (eg policy B pulling collateral out of the Cooler policy).

## State Variables

### _gOHM

```solidity
ERC20 internal immutable _gOHM
```

### DEFAULT_MAX_DELEGATE_ADDRESSES

The default maximum number of addresses an account can delegate to

```solidity
uint32 public constant override DEFAULT_MAX_DELEGATE_ADDRESSES = 10
```

## Functions

### constructor

```solidity
constructor(address gohm_) ;
```

### setMaxDelegateAddresses

Set an account to have more or less than the DEFAULT_MAX_DELEGATE_ADDRESSES
number of delegates.

```solidity
function setMaxDelegateAddresses(address account, uint32 maxDelegateAddresses) external virtual override;
```

### depositUndelegatedGohm

gOHM is pulled from the calling policy and added to the undelegated balance.

- This gOHM cannot be used for governance voting until it is delegated.
- Deposted gOHM balances are tracked per policy. policyA cannot withdraw gOHM that policyB deposited

```solidity
function depositUndelegatedGohm(address onBehalfOf, uint256 amount) external virtual override;
```

### withdrawUndelegatedGohm

Undelegated gOHM is transferred to the calling policy.

- If `autoRescindMaxNumDelegates` is greater than zero, the delegations will be automatically rescinded if required
from up to `autoRescindMaxNumDelegates` number of delegate escrows. See `rescindDelegations()` for details
- Will revert if there is still not enough undelegated gOHM for `onBehalfOf` OR
if policy is attempting to withdraw more gOHM than it deposited
Deposted gOHM balances are tracked per policy. policyA cannot withdraw gOHM that policyB deposited

```solidity
function withdrawUndelegatedGohm(address onBehalfOf, uint256 amount, uint256 autoRescindMaxNumDelegates)
    external
    virtual
    override;
```

### applyDelegations

Apply a set of delegation requests on behalf of a given account.

- Each delegation request either delegates or undelegates to an address
- It applies across total gOHM balances for a given account across all calling policies
So policyA may (un)delegate the account's gOHM set by policyA, B and C

```solidity
function applyDelegations(address onBehalfOf, DelegationRequest[] calldata delegationRequests)
    external
    virtual
    override
    returns (uint256 totalDelegated, uint256 totalUndelegated, uint256 undelegatedBalance);
```

### rescindDelegations

Rescind delegations until the amount undelegated for the `onBehalfOf` account
is greater or equal to `requestedUndelegatedBalance`. No more than `maxNumDelegates`
will be rescinded as part of this

- Delegations are rescinded by iterating through the delegate addresses for the
`onBehalfOf` address.
- No guarantees on the order of who is rescinded -- it may change as delegations are
removed
- A calling policy may be able to rescind more than it added via `depositUndelegatedGohm()`
however the policy cannot then withdraw an amount higher than what it deposited.
- If the full `requestedUndelegatedBalance` cannot be fulfilled the `actualUndelegatedBalance`
return parameter may be less than `requestedUndelegatedBalance`. The caller must decide
on how to handle that.

```solidity
function rescindDelegations(address onBehalfOf, uint256 requestedUndelegatedBalance, uint256 maxNumDelegates)
    external
    virtual
    override
    returns (uint256 totalRescinded, uint256 newUndelegatedBalance);
```

### policyAccountBalances

Report the total delegated and undelegated gOHM balance for an account
in a given policy

```solidity
function policyAccountBalances(address policy, address account)
    external
    view
    virtual
    override
    returns (uint256 gOhmBalance);
```

### accountDelegationsList

Paginated view of an account's delegations

This can be called sequentially, increasing the `startIndex` each time by the number of items
returned in the previous call, until number of items returned is less than `maxItems`
The `totalAmount` delegated within the return struct is across all policies for that account delegate

```solidity
function accountDelegationsList(address account, uint256 startIndex, uint256 maxItems)
    external
    view
    virtual
    override
    returns (AccountDelegation[] memory delegations);
```

### accountDelegationSummary

A summary of an account's delegations

```solidity
function accountDelegationSummary(address account)
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

### totalDelegatedTo

The total amount delegated to a particular delegate across all policies,
and externally made delegations (including any permanent donations)

```solidity
function totalDelegatedTo(address delegate) external view virtual returns (uint256);
```

### maxDelegateAddresses

The maximum number of delegates an account can have accross all policies

```solidity
function maxDelegateAddresses(address account) external view virtual override returns (uint32 result);
```

### gOHM

The gOhm token supplied by accounts

```solidity
function gOHM() external view override returns (IERC20);
```
