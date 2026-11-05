# OlympusTreasury

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/TRSRY/OlympusTreasury.sol)

**Inherits:** [TRSRYv1](/main/contracts/docs/src/modules/TRSRY/TRSRY.v1.sol/abstract.TRSRYv1), ReentrancyGuard

Treasury holds all other assets under the control of the protocol.

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) Module(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |

<a id="keycode"></a>

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Keycode` |  |

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

<a id="increasewithdrawapproval-address-erc20-uint256"></a>

### increaseWithdrawApproval

Increase approval for specific withdrawer addresses

```solidity
function increaseWithdrawApproval(
        address withdrawer_,
        ERC20 token_,
        uint256 amount_
    ) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| withdrawer_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="decreasewithdrawapproval-address-erc20-uint256"></a>

### decreaseWithdrawApproval

Decrease approval for specific withdrawer addresses

```solidity
function decreaseWithdrawApproval(
        address withdrawer_,
        ERC20 token_,
        uint256 amount_
    ) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| withdrawer_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="withdrawreserves-address-erc20-uint256"></a>

### withdrawReserves

Allow withdrawal of reserve funds from pre-approved addresses.

```solidity
function withdrawReserves(
        address to_,
        ERC20 token_,
        uint256 amount_
    ) public override permissioned onlyWhileActive;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="increasedebtorapproval-address-erc20-uint256"></a>

### increaseDebtorApproval

Increase approval for someone to accrue debt in order to withdraw reserves.

<i>

Debt will generally be taken by contracts to allocate treasury funds in yield sources.

</i>

```solidity
function increaseDebtorApproval(
        address debtor_,
        ERC20 token_,
        uint256 amount_
    ) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| debtor_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="decreasedebtorapproval-address-erc20-uint256"></a>

### decreaseDebtorApproval

Decrease approval for someone to withdraw reserves as debt.

```solidity
function decreaseDebtorApproval(
        address debtor_,
        ERC20 token_,
        uint256 amount_
    ) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| debtor_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="incurdebt-erc20-uint256"></a>

### incurDebt

Pre-approved policies can get a loan to perform operations with treasury assets.

```solidity
function incurDebt(
        ERC20 token_,
        uint256 amount_
    ) external override permissioned onlyWhileActive;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="repaydebt-address-erc20-uint256"></a>

### repayDebt

Repay a debtor debt.

<i>

Only confirmed to safely handle standard and non-standard ERC20s.

</i>

<i>

Can have unforeseen consequences with ERC777. Be careful with ERC777 as reserve.

</i>

```solidity
function repayDebt(
        address debtor_,
        ERC20 token_,
        uint256 amount_
    ) external override permissioned nonReentrant;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| debtor_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="setdebt-address-erc20-uint256"></a>

### setDebt

An escape hatch for setting debt in special cases, like swapping reserves to another token.

```solidity
function setDebt(
        address debtor_,
        ERC20 token_,
        uint256 amount_
    ) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| debtor_ | `address` |  |
| token_ | `ERC20` |  |
| amount_ | `uint256` |  |

<a id="deactivate"></a>

### deactivate

Emergency shutdown of withdrawals.

```solidity
function deactivate() external override permissioned;
```

<a id="activate"></a>

### activate

Re-activate withdrawals after shutdown.

```solidity
function activate() external override permissioned;
```

<a id="getreservebalance-erc20"></a>

### getReserveBalance

Get total balance of assets inside the treasury + any debt taken out against those assets.

```solidity
function getReserveBalance(ERC20 token_) external view override returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token_ | `ERC20` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |
