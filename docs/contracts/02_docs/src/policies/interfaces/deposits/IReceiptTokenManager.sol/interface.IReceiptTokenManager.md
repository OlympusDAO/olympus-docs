# IReceiptTokenManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/deposits/IReceiptTokenManager.sol)

**Inherits:** IERC6909, [IERC6909Wrappable](/main/contracts/docs/src/interfaces/IERC6909Wrappable.sol/interface.IERC6909Wrappable)

**Title:** IReceiptTokenManager

Interface for the contract that creates and manages receipt tokens

## Functions

<a id="createtoken-ierc20-uint8-address-string"></a>

### createToken

Creates a new receipt token

<i>

The caller (msg.sender) becomes the owner of the token for security

</i>

```solidity
function createToken(
        IERC20 asset_,
        uint8 depositPeriod_,
        address operator_,
        string memory operatorName_
    ) external returns (uint256 tokenId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `IERC20` | The underlying asset |
| depositPeriod_ | `uint8` | The deposit period |
| operator_ | `address` | The operator address |
| operatorName_ | `string` | The operator name for token metadata |

**Returns**

| Name    | Type      | Description          |
| ------- | --------- | -------------------- |
| tokenId | `uint256` | The created token ID |

<a id="mint-address-uint256-uint256-bool"></a>

### mint

Mints tokens to a recipient

<i>

Gated to the owner (creator) of the token

</i>

```solidity
function mint(address to_, uint256 tokenId_, uint256 amount_, bool shouldWrap_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` | The recipient |
| tokenId_ | `uint256` | The token ID |
| amount_ | `uint256` | The amount to mint |
| shouldWrap_ | `bool` | Whether to wrap as ERC20 |

<a id="burn-address-uint256-uint256-bool"></a>

### burn

Burns tokens from a holder

<i>

Gated to the owner (creator) of the token

</i>

```solidity
function burn(address from_, uint256 tokenId_, uint256 amount_, bool isWrapped_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from_ | `address` | The holder |
| tokenId_ | `uint256` | The token ID |
| amount_ | `uint256` | The amount to burn |
| isWrapped_ | `bool` | Whether the tokens are wrapped |

<a id="getreceipttokenid-address-ierc20-uint8-address"></a>

### getReceiptTokenId

Generates a receipt token ID

```solidity
function getReceiptTokenId(
        address owner_,
        IERC20 asset_,
        uint8 depositPeriod_,
        address operator_
    ) external pure returns (uint256 tokenId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner_ | `address` | The owner address |
| asset_ | `IERC20` | The asset |
| depositPeriod_ | `uint8` | The deposit period |
| operator_ | `address` | The operator |

**Returns**

| Name    | Type      | Description            |
| ------- | --------- | ---------------------- |
| tokenId | `uint256` | The generated token ID |

<a id="gettokenname-uint256"></a>

### getTokenName

Returns the name of a receipt token

```solidity
function getTokenName(uint256 tokenId_) external view returns (string memory name);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The ID of the receipt token |

**Returns**

| Name | Type     | Description                   |
| ---- | -------- | ----------------------------- |
| name | `string` | The name of the receipt token |

<a id="gettokensymbol-uint256"></a>

### getTokenSymbol

Returns the symbol of a receipt token

```solidity
function getTokenSymbol(uint256 tokenId_) external view returns (string memory symbol);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The ID of the receipt token |

**Returns**

| Name   | Type     | Description                     |
| ------ | -------- | ------------------------------- |
| symbol | `string` | The symbol of the receipt token |

<a id="gettokendecimals-uint256"></a>

### getTokenDecimals

Returns the decimals of a receipt token

```solidity
function getTokenDecimals(uint256 tokenId_) external view returns (uint8 decimals);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The ID of the receipt token |

**Returns**

| Name     | Type    | Description                       |
| -------- | ------- | --------------------------------- |
| decimals | `uint8` | The decimals of the receipt token |

<a id="gettokenowner-uint256"></a>

### getTokenOwner

Gets the owner of a token

```solidity
function getTokenOwner(uint256 tokenId_) external view returns (address owner);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The token ID |

**Returns**

| Name  | Type      | Description     |
| ----- | --------- | --------------- |
| owner | `address` | The token owner |

<a id="gettokenasset-uint256"></a>

### getTokenAsset

Gets the asset of a token

```solidity
function getTokenAsset(uint256 tokenId_) external view returns (IERC20 asset);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The token ID |

**Returns**

| Name  | Type     | Description          |
| ----- | -------- | -------------------- |
| asset | `IERC20` | The underlying asset |

<a id="gettokendepositperiod-uint256"></a>

### getTokenDepositPeriod

Gets the deposit period of a token

```solidity
function getTokenDepositPeriod(uint256 tokenId_) external view returns (uint8 depositPeriod);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The token ID |

**Returns**

| Name          | Type    | Description        |
| ------------- | ------- | ------------------ |
| depositPeriod | `uint8` | The deposit period |

<a id="gettokenoperator-uint256"></a>

### getTokenOperator

Gets the operator of a token

```solidity
function getTokenOperator(uint256 tokenId_) external view returns (address operator);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId_ | `uint256` | The token ID |

**Returns**

| Name     | Type      | Description          |
| -------- | --------- | -------------------- |
| operator | `address` | The operator address |

## Events

### TokenCreated

```solidity
event TokenCreated(
        uint256 indexed tokenId,
        address indexed owner,
        address indexed asset,
        uint8 depositPeriod,
        address operator
    );
```

**Parameters**

| Name          | Type      | Description |
| ------------- | --------- | ----------- |
| tokenId       | `uint256` |             |
| owner         | `address` |             |
| asset         | `address` |             |
| depositPeriod | `uint8`   |             |
| operator      | `address` |             |

## Errors

### ReceiptTokenManager_TokenExists

```solidity
error ReceiptTokenManager_TokenExists(uint256 tokenId);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| tokenId | `uint256` |             |

### ReceiptTokenManager_NotOwner

```solidity
error ReceiptTokenManager_NotOwner(address caller, address owner);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| caller | `address` |             |
| owner  | `address` |             |

### ReceiptTokenManager_InvalidParams

```solidity
error ReceiptTokenManager_InvalidParams(string reason);
```

**Parameters**

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| reason | `string` |             |
