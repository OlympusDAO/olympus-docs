# IBondFixedExpiryTeller

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IBondFixedExpiryTeller.sol)

**Inherits:** [IBondTeller](/main/contracts/docs/src/interfaces/IBondTeller.sol/interface.IBondTeller)

## Functions

<a id="getbondtokenformarket-uint256"></a>

### getBondTokenForMarket

Get the OlympusERC20BondToken contract corresponding to a market

```solidity
function getBondTokenForMarket(uint256 id_) external view returns (ERC20);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| id_ | `uint256` | ID of the market |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `ERC20` | ERC20BondToken contract address |

<a id="deploy-erc20-uint48"></a>

### deploy

Deploy a new ERC20 bond token for an (underlying, expiry) pair and return its address

<i>

ERC20 used for fixed-expiry

</i>

<i>

If a bond token exists for the (underlying, expiry) pair, it returns that address

</i>

```solidity
function deploy(ERC20 underlying_, uint48 expiry_) external returns (ERC20);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| underlying_ | `ERC20` | ERC20 token redeemable when the bond token vests |
| expiry_ | `uint48` | Timestamp at which the bond token can be redeemed for the underlying token |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `ERC20` | Address of the ERC20 bond token being created |

<a id="create-erc20-uint48-uint256"></a>

### create

Deposit an ERC20 token and mint a future-dated ERC20 bond token

```solidity
function create(
        ERC20 underlying_,
        uint48 expiry_,
        uint256 amount_
    ) external returns (ERC20, uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| underlying_ | `ERC20` | ERC20 token redeemable when the bond token vests |
| expiry_ | `uint48` | Timestamp at which the bond token can be redeemed for the underlying token |
| amount_ | `uint256` | Amount of underlying tokens to deposit |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `ERC20` | Address of the ERC20 bond token received |
| &lt;none&gt; | `uint256` | Amount of the ERC20 bond token received |
