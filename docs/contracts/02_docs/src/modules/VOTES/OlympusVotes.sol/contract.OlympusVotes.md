# OlympusVotes

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/VOTES/OlympusVotes.sol)

**Inherits:** [VOTESv1](/main/contracts/docs/src/modules/VOTES/VOTES.v1.sol/abstract.VOTESv1)

Votes module is the ERC20 token that represents voting power in the network.

## Functions

<a id="constructor-kernel-erc20"></a>

### constructor

```solidity
constructor(
        Kernel kernel_,
        ERC20 gOhm_
    ) Module(kernel_) ERC4626(gOhm_, "Olympus Votes", "vOHM");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |
| gOhm_ | `ERC20` |  |

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

<a id="deposit-uint256-address"></a>

### deposit

```solidity
function deposit(
        uint256 assets_,
        address receiver_
    ) public override permissioned returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| assets_ | `uint256` |  |
| receiver_ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="mint-uint256-address"></a>

### mint

```solidity
function mint(
        uint256 shares_,
        address receiver_
    ) public override permissioned returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| shares_ | `uint256` |  |
| receiver_ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="withdraw-uint256-address-address"></a>

### withdraw

```solidity
function withdraw(
        uint256 assets_,
        address receiver_,
        address owner_
    ) public override permissioned returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| assets_ | `uint256` |  |
| receiver_ | `address` |  |
| owner_ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="redeem-uint256-address-address"></a>

### redeem

```solidity
function redeem(
        uint256 shares_,
        address receiver_,
        address owner_
    ) public override permissioned returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| shares_ | `uint256` |  |
| receiver_ | `address` |  |
| owner_ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="transfer-address-uint256"></a>

### transfer

Transfers are locked for this token.

```solidity
function transfer(address to_, uint256 amt_) public override permissioned returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` |  |
| amt_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="transferfrom-address-address-uint256"></a>

### transferFrom

TransferFrom is only allowed by permissioned policies.

```solidity
function transferFrom(
        address from_,
        address to_,
        uint256 amount_
    ) public override permissioned returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from_ | `address` |  |
| to_ | `address` |  |
| amount_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="resetactiontimestamp-address"></a>

### resetActionTimestamp

```solidity
function resetActionTimestamp(address _wallet) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | `address` |  |

<a id="totalassets"></a>

### totalAssets

```solidity
function totalAssets() public view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |
