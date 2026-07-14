# IVersioned

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/interfaces/IVersioned.sol)

**Title:**
IVersioned

forge-lint: disable-start(mixed-case-function)

Interface for contracts that have a version

## Functions

### VERSION

Returns the version of the contract

```solidity
function VERSION() external view returns (uint8 major, uint8 minor);
```

**Returns**

| Name    | Type    | Description                                                         |
| ------- | ------- | ------------------------------------------------------------------- |
| `major` | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| `minor` | `uint8` | - Minor version change retains backward-compatible interface.       |
