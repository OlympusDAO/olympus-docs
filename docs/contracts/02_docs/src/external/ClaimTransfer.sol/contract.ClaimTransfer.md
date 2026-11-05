# ClaimTransfer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/ClaimTransfer.sol)

**Title:** Olympus Claim Transfer Contract

<i>

This contract is used to fractionalize pOLY claims and transfer portions of a user's claim to other addresses

</i>

## State Variables

### pOLY

```solidity
IPOLY public pOLY;
```

### OHM

```solidity
ERC20 public OHM;
```

### DAI

```solidity
ERC20 public DAI;
```

### gOHM

```solidity
IgOHM public gOHM;
```

### fractionalizedTerms

```solidity
mapping(address => Term) public fractionalizedTerms;
```

### allowance

```solidity
mapping(address => mapping(address => uint256)) public allowance;
```

## Functions

<a id="constructor-address-address-address-address"></a>

### constructor

```solidity
constructor(address poly_, address ohm_, address dai_, address gohm_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poly_ | `address` |  |
| ohm_ | `address` |  |
| dai_ | `address` |  |
| gohm_ | `address` |  |

<a id="fractionalizeclaim"></a>

### fractionalizeClaim

Convert pOLY claim that can only be fully transfered to a new wallet to a fractionalized claim

```solidity
function fractionalizeClaim() external;
```

<a id="claim-uint256"></a>

### claim

Claim OHM from the pOLY contract via your fractionalized claim

```solidity
function claim(uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | Amount of DAI to send to the pOLY contract |

<a id="redeemablefor-address"></a>

### redeemableFor

Calculate the amount of OHM that can be redeemed for a given address's fractionalized claim

```solidity
function redeemableFor(address user_) external view returns (uint256, uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | Address of the user |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The amount of OHM the account can redeem |
| &lt;none&gt; | `uint256` | uint256 The amount of DAI required to claim the amount of OHM |

<a id="approve-address-uint256"></a>

### approve

Approve a spender to spend a certain amount of your fractionalized claim (denominated in the `percent` value of a Term)

```solidity
function approve(address spender_, uint256 amount_) external returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| spender_ | `address` | Address of the spender |
| amount_ | `uint256` | Amount of your fractionalized claim to approve |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool |

<a id="transfer-address-uint256"></a>

### transfer

Transfer a portion of your fractionalized claim to another address

<i>

Transferring a portion of your claim transfers both based on the percentage and claimable amount of OHM.
The recipient will receive a claimable amount of OHM commensurate to the percentage of the sender's max claim
ignoring what the sender has already claimed. Say the sender has a percent of 10_000 and a max claim of 100 OHM.
They claim 10 OHM, leaving 90 OHM claimable. If they transfer 50% of their claim (5_000), the recipient gets a
max value of 55 and the commensurate gClaimed so they have a true claimable amount of 50 OHM. The sender's
fractionalized claim is updated to reflect the transfer.

</i>

```solidity
function transfer(address to_, uint256 amount_) external returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` | Address of the recipient |
| amount_ | `uint256` | Amount of your fractionalized claim to transfer |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool |

<a id="transferfrom-address-address-uint256"></a>

### transferFrom

Transfer a portion of a fractionalized claim from another address to a recipient (must have approval)

<i>

Transferring a portion of your claim transfers both based on the percentage and claimable amount of OHM.
The recipient will receive a claimable amount of OHM commensurate to the percentage of the sender's max claim
ignoring what the sender has already claimed. Say the sender has a percent of 10_000 and a max claim of 100 OHM.
They claim 10 OHM, leaving 90 OHM claimable. If they transfer 50% of their claim (5_000), the recipient gets a
max value of 55 and the commensurate gClaimed so they have a true claimable amount of 50 OHM. The sender's
fractionalized claim is updated to reflect the transfer.

</i>

```solidity
function transferFrom(address from_, address to_, uint256 amount_) external returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from_ | `address` | Address of the sender |
| to_ | `address` | Address of the recipient |
| amount_ | `uint256` | Amount of the sender's fractionalized claim to transfer |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool |

<a id="_transfer-address-address-uint256"></a>

### _transfer

```solidity
function _transfer(address from_, address to_, uint256 amount_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from_ | `address` |  |
| to_ | `address` |  |
| amount_ | `uint256` |  |

## Errors

### CT_IllegalClaim

```solidity
error CT_IllegalClaim();
```

## Structs

### Term

```solidity
struct Term {
        uint256 percent; // PRECISION = 1_000_000 (i.e. 5000 = 0.5%)
        uint256 gClaimed; // Rebase agnostic # of tokens claimed
        uint256 max; // Maximum nominal OHM amount claimable
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| percent | `uint256` |  |
| gClaimed | `uint256` |  |
| max | `uint256` |  |
