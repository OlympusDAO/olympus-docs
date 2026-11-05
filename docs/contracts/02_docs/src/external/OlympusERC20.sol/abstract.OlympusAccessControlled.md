# OlympusAccessControlled

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/OlympusERC20.sol)

## State Variables

### UNAUTHORIZED

```solidity
string internal UNAUTHORIZED = "UNAUTHORIZED";
```

### authority

```solidity
IOlympusAuthority public authority;
```

## Functions

<a id="constructor-iolympusauthority"></a>

### constructor

```solidity
constructor(IOlympusAuthority _authority);
```

**Parameters**

| Name       | Type                | Description |
| ---------- | ------------------- | ----------- |
| _authority | `IOlympusAuthority` |             |

<a id="onlygovernor"></a>

### onlyGovernor

```solidity
modifier onlyGovernor();
```

<a id="onlyguardian"></a>

### onlyGuardian

```solidity
modifier onlyGuardian();
```

<a id="onlypermitted"></a>

### onlyPermitted

```solidity
modifier onlyPermitted();
```

<a id="onlyvault"></a>

### onlyVault

```solidity
modifier onlyVault();
```

<a id="setauthority-iolympusauthority"></a>

### setAuthority

```solidity
function setAuthority(IOlympusAuthority _newAuthority) external onlyGovernor;
```

**Parameters**

| Name          | Type                | Description |
| ------------- | ------------------- | ----------- |
| _newAuthority | `IOlympusAuthority` |             |

## Events

### AuthorityUpdated

```solidity
event AuthorityUpdated(IOlympusAuthority indexed authority);
```

**Parameters**

| Name      | Type                | Description |
| --------- | ------------------- | ----------- |
| authority | `IOlympusAuthority` |             |
