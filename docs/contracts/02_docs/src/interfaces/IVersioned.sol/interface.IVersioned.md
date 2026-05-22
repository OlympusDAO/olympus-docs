# IVersioned

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/interfaces/IVersioned.sol)

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
