# OlympusGovDelegation

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/modules/DLGTE/OlympusGovDelegation.sol)

**Inherits:**
[DLGTEv1](/main/contracts/docs/src/modules/DLGTE/DLGTE.v1.sol/abstract.DLGTEv1)

Olympus Governance Delegation (Module) Contract

*The Olympus Governance Delegation Module enables policies to delegate gOHM on behalf of users.
If the gOHM is undelegated, this module acts as an escrow for the gOHM.
When the gOHM is delegated, new individual escrows are created for those delegates, and that
portion of gOHM is transferred to that escrow.
gOHM balances are tracked per (policy, account) separately such that one policy cannot pull the
gOHM from another policy (eg policy B pulling collateral out of the Cooler policy).*

## State Variables

### delegateEscrowFactory

```solidity
DelegateEscrowFactory public immutable delegateEscrowFactory;
```

### _accountState

*The mapping of a delegate's address to their escrow contract*

*An account's current state across all policies
A given account is allowed up to 10 delegates. This is capped because to avoid gas griefing,
eg within Cooler, upon a liquidation, the gOHM needs to be pulled from all delegates.*

```solidity
mapping(address => AccountState) private _accountState;
```

### _policyAccountBalances

*The per policy balances of (delegated and undelegated) gOHM for each end user account
One policy isn't allowed to deposit/withdraw to another policy's tracked balances
Eg policy B cannot withdraw gOHM from the collateral held here by the Cooler policy*

```solidity
mapping(address => mapping(address => uint256)) private _policyAccountBalances;
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_, address gohm_, DelegateEscrowFactory delegateEscrowFactory_)
    Module(kernel_)
    DLGTEv1(gohm_);
```

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|- Major version upgrade indicates breaking change to the interface.|
|`minor`|`uint8`|- Minor version change retains backward-compatible interface.|

### depositUndelegatedGohm

```solidity
function depositUndelegatedGohm(address onBehalfOf, uint256 amount) external override permissioned;
```

### withdrawUndelegatedGohm

```solidity
function withdrawUndelegatedGohm(address onBehalfOf, uint256 amount, uint256 autoRescindMaxNumDelegates)
    external
    override
    permissioned;
```

### rescindDelegations

```solidity
function rescindDelegations(address onBehalfOf, uint256 requestedUndelegatedBalance, uint256 maxNumDelegates)
    external
    override
    permissioned
    returns (uint256 totalRescinded, uint256 newUndelegatedBalance);
```

### applyDelegations

```solidity
function applyDelegations(address onBehalfOf, IDLGTEv1.DelegationRequest[] calldata delegationRequests)
    external
    override
    permissioned
    returns (uint256 appliedDelegationAmounts, uint256 appliedUndelegationAmounts, uint256 undelegatedBalance);
```

### setMaxDelegateAddresses

```solidity
function setMaxDelegateAddresses(address account, uint32 maxDelegates) external override permissioned;
```

### policyAccountBalances

```solidity
function policyAccountBalances(address policy, address account) external view override returns (uint256 gOhmBalance);
```

### accountDelegationsList

```solidity
function accountDelegationsList(address account, uint256 startIndex, uint256 maxItems)
    external
    view
    override
    returns (IDLGTEv1.AccountDelegation[] memory delegations);
```

### totalDelegatedTo

```solidity
function totalDelegatedTo(address delegate) external view override returns (uint256);
```

### accountDelegationSummary

```solidity
function accountDelegationSummary(address account)
    external
    view
    override
    returns (uint256, uint256, uint256, uint256);
```

### maxDelegateAddresses

```solidity
function maxDelegateAddresses(address account) external view override returns (uint32 result);
```

### _applyDelegations

```solidity
function _applyDelegations(
    address onBehalfOf,
    AccountState storage aState,
    uint256 undelegatedBalance,
    IDLGTEv1.DelegationRequest[] calldata delegationRequests
)
    private
    returns (uint256 appliedDelegationAmounts, uint256 appliedUndelegationAmounts, uint256 newUndelegatedBalance);
```

### _maxDelegateAddresses

```solidity
function _maxDelegateAddresses(AccountState storage aState) private returns (uint32 maxDelegates);
```

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

## Structs

### AccountState

```solidity
struct AccountState {
    EnumerableMap.AddressToUintMap delegatedAmounts;
    uint112 totalGOhm;
    uint112 delegatedGOhm;
    uint32 maxDelegateAddresses;
}
```
