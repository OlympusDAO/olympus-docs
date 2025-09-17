# IPolicyEnabler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/interfaces/utils/IPolicyEnabler.sol)

## Functions

### isEnabled

```solidity
function isEnabled() external view returns (bool);
```

### enable

```solidity
function enable(bytes calldata) external;
```

### disable

```solidity
function disable(bytes calldata) external;
```

## Events

### Disabled

```solidity
event Disabled();
```

### Enabled

```solidity
event Enabled();
```

## Errors

### NotDisabled

```solidity
error NotDisabled();
```

### NotEnabled

```solidity
error NotEnabled();
```
