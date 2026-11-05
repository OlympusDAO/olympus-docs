# PriceSubmodule

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/PRICE/PRICE.v2.sol)

**Inherits:** [Submodule](/main/contracts/docs/src/Submodules.sol/abstract.Submodule)

## Functions

<a id="parent"></a>

### PARENT

5 byte identifier for the parent module.

```solidity
function PARENT() public pure override returns (Keycode);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `Keycode` |             |

<a id="_price"></a>

### _PRICE

The parent PRICE module

```solidity
function _PRICE() internal view returns (PRICEv2);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `PRICEv2` |             |
