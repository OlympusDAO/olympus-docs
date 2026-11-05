# OIP_XXX

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/OIP_XXX.sol)

**Inherits:** GovernorBravoProposal

OIP_XXX proposal performs all the necessary steps to upgrade the Clearinghouse.

## State Variables

### cacheCH0

```solidity
Cache public cacheCH0;
```

### cacheTRSRY

```solidity
Cache public cacheTRSRY;
```

### _kernel

```solidity
Kernel internal _kernel;
```

## Functions

<a id="id"></a>

### id

```solidity
function id() public pure override returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="name"></a>

### name

```solidity
function name() public pure override returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="description"></a>

### description

```solidity
function description() public pure override returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_deploy-addresses-address"></a>

### _deploy

```solidity
function _deploy(Addresses addresses, address) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| _         | `address`   |             |

<a id="_afterdeploy-addresses-address"></a>

### _afterDeploy

```solidity
function _afterDeploy(Addresses addresses, address) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| _         | `address`   |             |

<a id="_build-addresses"></a>

### _build

```solidity
function _build(Addresses addresses) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |

<a id="_run-addresses-address"></a>

### _run

```solidity
function _run(Addresses addresses, address) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| _         | `address`   |             |

<a id="_validate-addresses-address"></a>

### _validate

```solidity
function _validate(Addresses addresses, address) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| _         | `address`   |             |

## Structs

### Cache

```solidity
struct Cache {
        uint256 daiBalance;
        uint256 sdaiBalance;
    }
```

**Properties**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| daiBalance  | `uint256` |             |
| sdaiBalance | `uint256` |             |
