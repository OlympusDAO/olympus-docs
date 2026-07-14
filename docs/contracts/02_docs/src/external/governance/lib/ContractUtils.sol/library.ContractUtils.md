# ContractUtils

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/external/governance/lib/ContractUtils.sol)

## Functions

### getCodeHash

Gets the codehash for a given address

```solidity
function getCodeHash(address target_) internal view returns (bytes32);
```

**Parameters**

| Name      | Type      | Description                         |
| --------- | --------- | ----------------------------------- |
| `target_` | `address` | The address to get the codehash for |

**Returns**

| Name     | Type      | Description  |
| -------- | --------- | ------------ |
| `<none>` | `bytes32` | The codehash |
