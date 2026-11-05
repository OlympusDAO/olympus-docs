# LZBridgeGateway

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/bridge/LZBridgeGateway.sol)

**Inherits:** ILayerZeroReceiver, [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned), [ILZBridgeGateway](/main/contracts/docs/src/policies/interfaces/ILZBridgeGateway.sol/interface.ILZBridgeGateway), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyReEnabler](/main/contracts/docs/src/policies/utils/PolicyReEnabler.sol/abstract.PolicyReEnabler), [ReEnablerGracePeriod](/main/contracts/docs/src/bases/ReEnablerGracePeriod.sol/abstract.ReEnablerGracePeriod), [OffsettingRateLimiter](/main/contracts/docs/src/bases/OffsettingRateLimiter.sol/abstract.OffsettingRateLimiter), [Rescueable](/main/contracts/docs/src/bases/Rescueable.sol/abstract.Rescueable)

**Title:** LZBridgeGateway

Infrastructure policy handling LayerZero V2 endpoint communication for cross-chain
OHM transfers.
Performs OHM mint/burn via MINTR, manages peers, enforces options and rate limits,
tracks bridged supply on canonical chains, and bounds inflow minting to previously burned OHM via mint approval.
OApp-authorized endpoint operations (libraries, ULN/Executor config, messaging channel control)
live on the LZEndpointDelegate policy, which is assigned via `setDelegate`.

## Constants

### MSG_BRIDGE_OHM

Returns the message type identifier for OHM bridge transfers.

```solidity
uint8 public constant override MSG_BRIDGE_OHM = 1;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` |  |

### _BRIDGE_OHM_DATA_LENGTH

Expected byte length of an ABI-encoded (address, uint256) bridge payload.

```solidity
uint256 internal constant _BRIDGE_OHM_DATA_LENGTH = 64;
```

### _MIN_PAYLOAD_LENGTH

Minimum ABI-encoded length for (uint8, bytes): 32 + 32 offset + 32 length.

```solidity
uint256 internal constant _MIN_PAYLOAD_LENGTH = 96;
```

### _OPTION_TYPE_3

Type 3 option type identifier.

```solidity
uint16 internal constant _OPTION_TYPE_3 = 3;
```

### _KEYCODE_MINTR

Keycode for the MINTR module dependency.

<i>

Pre-computed to avoid the runtime cost of `toKeycode("MINTR")`.

</i>

```solidity
Keycode internal constant _KEYCODE_MINTR = Keycode.wrap(0x4D494E5452);
```

### _KEYCODE_ROLES

Keycode for the ROLES module dependency.

<i>

Pre-computed to avoid the runtime cost of `toKeycode("ROLES")`.

</i>

```solidity
Keycode internal constant _KEYCODE_ROLES = Keycode.wrap(0x524F4C4553);
```

### LZ_ENDPOINT

The LayerZero V2 endpoint address.

```solidity
address public immutable override LZ_ENDPOINT;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

### IS_CANONICAL

Returns whether this is the canonical (mainnet) chain.

```solidity
bool public immutable override IS_CANONICAL;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

## State Variables

### MINTR

Bophades module for minting and burning OHM.

```solidity
MINTRv1 public MINTR;
```

### ohm

Returns the OHM token address.

```solidity
address public override ohm;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

### bridgedSupply

Returns the current bridged supply (canonical only).

```solidity
uint256 public override bridgedSupply;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

### bridgedSupplyInitialized

Returns whether the one-shot `initializeBridgedSupply` has already succeeded.

```solidity
bool public override bridgedSupplyInitialized;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

### isReceiveEnabled

Whether lzReceive() can process incoming messages.

<i>

Automatically set to true by enable() and false by disable().
Can be manually set via setIsReceiveEnabled() to allow receiving
while the gateway is otherwise disabled (e.g., during gateway replacements).

</i>

```solidity
bool public override isReceiveEnabled;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

### peers

Returns the peer for a given endpoint ID.

```solidity
mapping(uint32 eid_ => bytes32) public override peers;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The remote endpoint ID. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` | The peer address (as bytes32). |

### enforcedOptions

Returns the enforced options for a given endpoint and message type.

```solidity
mapping(uint32 eid_ => mapping(uint16 msgType_ => bytes)) public override enforcedOptions;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The endpoint ID. |
| msgType_ | `uint16` | The message type. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes` | The enforced options bytes. |

## Functions

<a id="onlybridgeadminoradmin"></a>

### onlyBridgeAdminOrAdmin

Modifier that reverts if the caller does not have the `bridge_admin` or `admin` role.

<i>

Used only by the one-shot `initializeBridgedSupply`; the other privileged mutators
are gated by `onlyBridgeConfigurator`.

</i>

```solidity
modifier onlyBridgeAdminOrAdmin();
```

<a id="_requirebridgeadminoradmin"></a>

### _requireBridgeAdminOrAdmin

Reverts with `IPolicyAdmin.NotAuthorised` if `msg.sender` has neither the
`bridge_admin` nor the `admin` role.

```solidity
function _requireBridgeAdminOrAdmin() private view;
```

<a id="onlybridgeconfigurator"></a>

### onlyBridgeConfigurator

Modifier that reverts if the caller does not have the `bridge_configurator` role.

<i>

Gated solely by the role; the role is expected to be granted exclusively to
`LZBridgeAndDelegateConfig` (the timelock policy), in which case calls are
dispatched through that policy's timelock queue. Any holder that does not
itself enforce a timelock on these mutators should only be granted the role
temporarily for bootstrap. This contract does not enforce a timelock itself;
it is enforced only by the `LZBridgeAndDelegateConfig` role holder. Granting
`bridge_configurator` to any other address bypasses the timelock for these
mutators.

</i>

```solidity
modifier onlyBridgeConfigurator();
```

<a id="_requirebridgeconfigurator"></a>

### _requireBridgeConfigurator

Reverts with `ROLESv1.ROLES_RequireRole(BRIDGE_CONFIGURATOR_ROLE)` if
`msg.sender` does not hold the `bridge_configurator` role.

```solidity
function _requireBridgeConfigurator() private view;
```

<a id="constructor-kernel-address-bool-uint32"></a>

### constructor

<i>

Reverts if:

- The kernel address is the zero address.
- The LZ endpoint address is the zero address.
- The grace window length is zero.

</i>

```solidity
constructor(
        Kernel kernel_,
        address lzEndpoint_,
        bool isCanonical_,
        uint32 grace_
    ) Policy(kernel_) ReEnablerGracePeriod(grace_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |
| lzEndpoint_ | `address` |  |
| isCanonical_ | `bool` |  |
| grace_ | `uint32` |  |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="_requiremajorv1-uint8"></a>

### _requireMajorV1

Reverts with `Policy_WrongModuleVersion` if the given module major version is
not 1.

```solidity
function _requireMajorV1(uint8 major_) private pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major_ | `uint8` | The major version reported by the module's `VERSION()`. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions()
        external
        view
        override
        returns (Permissions[] memory permissions);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| permissions | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="version"></a>

### VERSION

Returns the version of the contract

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="_beforeenable-bytes"></a>

### _beforeEnable

<i>

Sets isReceiveEnabled to true when the gateway is enabled.

</i>

```solidity
function _beforeEnable(bytes calldata) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` |  |

<a id="_beforedisable-bytes"></a>

### _beforeDisable

<i>

Resets isReceiveEnabled to false if it is not already when the gateway is disabled.

</i>

```solidity
function _beforeDisable(bytes calldata) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` |  |

<a id="_beforereenable"></a>

### _beforeReEnable

<i>

Restores isReceiveEnabled when the manager re-enables the gateway. The grace
check is inherited from `ReEnablerGracePeriod` via `super`.

</i>

```solidity
function _beforeReEnable() internal override(ReEnabler, ReEnablerGracePeriod);
```

<a id="_authorizesetgraceperiod"></a>

### _authorizeSetGracePeriod

Validates that the caller is permitted to update the grace window.

Reverts if:

- The caller is not authorized to update the grace window.

<i>

Restricts `setGracePeriod` to the `bridge_configurator` role; that role is
expected to be granted exclusively to `LZBridgeAndDelegateConfig` (the
timelock policy).

</i>

```solidity
function _authorizeSetGracePeriod() internal view override;
```

<a id="_enablereceive"></a>

### _enableReceive

Sets isReceiveEnabled to true if it is not already.

<i>

Shared between `_beforeEnable` and `_beforeReEnable` because both
transitions move the gateway into the enabled state with receiving allowed.

</i>

```solidity
function _enableReceive() private;
```

<a id="burnandsend-uint32-address-uint256-address-payable-bytes"></a>

### burnAndSend

Burns OHM held by the gateway and sends a bridge message to a destination chain.

On canonical chains, increments bridgedSupply.

<i>

Reverts if:

- The caller does not have the `bridge_facilitator` role.
- The gateway is not enabled.
- The recipient address is the zero address.
- No peer exists for the destination endpoint ID.
- The rate limit would be exceeded.

</i>

```solidity
function burnAndSend(
        uint32 dstEid_,
        address to_,
        uint256 amount_,
        address payable refundAddress_,
        bytes calldata extraOptions_
    )
        external
        payable
        override
        givenEnabled
        onlyRole(BRIDGE_FACILITATOR_ROLE)
        returns (MessagingReceipt memory receipt);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The LayerZero destination endpoint ID. |
| to_ | `address` | The recipient address on the destination chain. |
| amount_ | `uint256` | The amount of OHM to burn and send. |
| refundAddress_ | `address payable` | The address to receive excess native token refund. |
| extraOptions_ | `bytes` | Additional Type 3 options to combine with enforced options. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| receipt | `MessagingReceipt` | The LayerZero messaging receipt. `receipt.fee.nativeFee` is the<br/>actual native amount charged by the endpoint (may be less than msg.value;<br/>excess is refunded to `refundAddress_`). |

<a id="estimatesendfee-uint32-address-uint256-bytes"></a>

### estimateSendFee

Estimates the fee for sending OHM to a destination chain.

<i>

Reverts if:

- The recipient address is zero.
- No peer exists for the destination endpoint ID.

</i>

```solidity
function estimateSendFee(
        uint32 dstEid_,
        address to_,
        uint256 amount_,
        bytes calldata extraOptions_
    ) external view override returns (MessagingFee memory fee);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The LayerZero destination endpoint ID. |
| to_ | `address` | The recipient address on the destination chain. |
| amount_ | `uint256` | The amount of OHM to send. |
| extraOptions_ | `bytes` | Additional Type 3 options to combine with enforced options. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | `MessagingFee` | The estimated messaging fee (native + lzToken). |

<a id="lzreceive-origin-bytes32-bytes-address-bytes"></a>

### lzReceive

<i>

Reverts if:

- Receiving is not enabled (isReceiveEnabled is false).
- The caller is not the LayerZero endpoint.
- The origin sender is not the configured peer for the source endpoint ID.
- No peer is configured for the source endpoint ID.
- The message payload is shorter than the minimum encoded length.
- The message type is not MSG_BRIDGE_OHM.
- The bridge data payload has an unexpected length.
- (Canonical) The bridged supply would underflow.
- The OHM recipient address is the zero address when the message type is MSG_BRIDGE_OHM.

</i>

```solidity
function lzReceive(
        Origin calldata origin_,
        bytes32 guid_,
        bytes calldata message_,
        address,
        bytes calldata
    ) external payable override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| origin_ | `Origin` |  |
| guid_ | `bytes32` |  |
| message_ | `bytes` |  |
| _ | `address` |  |
| _ | `bytes` |  |

<a id="allowinitializepath-origin"></a>

### allowInitializePath

```solidity
function allowInitializePath(Origin calldata origin_) external view override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| origin_ | `Origin` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="nextnonce-uint32-bytes32"></a>

### nextNonce

```solidity
function nextNonce(uint32, bytes32) external pure override returns (uint64);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `uint32` |  |
| _ | `bytes32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint64` |  |

<a id="setpeer-uint32-bytes32"></a>

### setPeer

<i>

Reverts if:

- The caller does not have the admin role.

</i>

WARNING: Updating or clearing the peer for an EID strands any in-flight inbound
messages from the previous peer that have already been verified on the LayerZero
endpoint but not yet executed. Such messages will revert in `lzReceive` on the
peer check and become permanently undeliverable.

Recovery requires the admin to handle each stranded message individually via the
LayerZero endpoint recovery functions (`skip`, `nilify`, `burn`, or `clear`).
A separate governance proposal may also be required to restore the OHM owed to
the affected users, and a corresponding `decreaseBridgedSupply` call is required
to keep the bookkeeping consistent.

```solidity
function setPeer(uint32 eid_, bytes32 peer_) external override onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The remote endpoint ID. |
| peer_ | `bytes32` | The peer (remote gateway) address (bytes32 or `bytes32(0)` to clear). |

<a id="setisreceiveenabled-bool"></a>

### setIsReceiveEnabled

<i>

Reverts if:

- The caller does not have the emergency or admin role.
- The gateway is currently enabled.
- The value is already in the desired state.

</i>

The flag `isReceiveEnabled` is managed automatically by the policy lifecycle:
`enable()` and the re-enable path set it to `true`, and `disable()` resets it to
`false`. This function provides a manual override for the disabled state, so that
a disabled gateway can keep delivering in-flight inbound LayerZero messages after
sending stops.

The intended use case is a gateway replacement on a given chain.
The admin calls `disable` followed by `setIsReceiveEnabled(true)`. The old gateway
is disabled (which stops outbound sends), but any inbound LayerZero messages already
in flight to the old gateway can still settle on it. Once the migration is complete,
the old gateway is deactivated in the Kernel.

If `disable` is triggered by the emergency role without a proposal, it automatically
sets `isReceiveEnabled` to `false`. If it is confirmed that re-enabling is safe, the
manager can call `reEnable` within the grace window, which automatically sets
`isReceiveEnabled` to `true`.

```solidity
function setIsReceiveEnabled(
        bool isReceiveEnabled_
    ) external override givenDisabled onlyEmergencyOrAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| isReceiveEnabled_ | `bool` | The desired state of the flag. |

<a id="setdelegate-address"></a>

### setDelegate

Sets the delegate on the LayerZero endpoint.

The delegate is authorized to configure anything on the LayerZero endpoint

on behalf of this contract (e.g. send/receive libraries, DVN config).

`delegate_` must be nonzero: the delegate cannot be cleared, only replaced

with another nonzero address.

<i>

Reverts if:

- The caller does not have the bridge_configurator role.
- `delegate_` is the zero address.

</i>

```solidity
function setDelegate(address delegate_) external override onlyBridgeConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegate_ | `address` | The new delegate address; must be nonzero. |

<a id="initializebridgedsupply-uint256"></a>

### initializeBridgedSupply

<i>

Intended for use immediately after the OCG proposal so the DAO MS can write
the computed initial bridged supply without going through the
`bridge_configurator` role (and therefore, in the intended deployment,
without waiting for the `LZBridgeAndDelegateConfig` timelock). After this
call further mutations must go through `increaseBridgedSupply` /
`decreaseBridgedSupply`.

</i>

Reverts if:

- The caller does not have the `bridge_admin` or `admin` role.
- The chain is not canonical.
- The bridged supply has already been initialized.
- The current bridged supply is non-zero.
- `amount_` is zero.

```solidity
function initializeBridgedSupply(uint256 amount_) external override onlyBridgeAdminOrAdmin;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The initial bridged supply to write. |

<a id="increasebridgedsupply-uint256"></a>

### increaseBridgedSupply

Increases the bridged supply by the given amount and syncs the MINTR mint approval.

<i>

Reverts if:

- The caller does not have the bridge_configurator role.
- IS_CANONICAL is false.
- `amount_` is zero.

</i>

```solidity
function increaseBridgedSupply(uint256 amount_) external override onlyBridgeConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount to increase bridged supply by. |

<a id="decreasebridgedsupply-uint256"></a>

### decreaseBridgedSupply

Decreases the bridged supply by the given amount and syncs the MINTR mint approval.

<i>

Reverts if:

- The caller does not have the bridge_configurator role.
- IS_CANONICAL is false.
- `amount_` is zero.
- The bridged supply would underflow.

</i>

```solidity
function decreaseBridgedSupply(uint256 amount_) external override onlyBridgeConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount to decrease bridged supply by. |

<a id="setenforcedoptions-enforcedoptionparam"></a>

### setEnforcedOptions

Sets enforced options for specific endpoint and message type combinations.

<i>

Reverts if:

- The caller does not have the admin role.
- Any option entry is not Type 3 format.

</i>

```solidity
function setEnforcedOptions(
        EnforcedOptionParam[] calldata enforcedOptions_
    ) external override onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enforcedOptions_ | `EnforcedOptionParam[]` | Array of enforced option parameters. |

<a id="setoutratelimits-ratelimitconfig"></a>

### setOutRateLimits

<i>

Reverts if:

- The caller does not have the bridge_configurator role.

</i>

Decays the existing in-flight amount of the targeted outbound limit and
checkpoints the counterpart inbound limit before writing the new `limit`
and `window`. The counterpart inbound limit's own `limit` and `window`
are preserved.

```solidity
function setOutRateLimits(
        RateLimitConfig[] calldata configs_
    ) external override onlyBridgeConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configs_ | `RateLimitConfig[]` | The outbound rate limit configurations to apply. |

<a id="setinratelimits-ratelimitconfig"></a>

### setInRateLimits

<i>

Reverts if:

- The caller does not have the bridge_configurator role.

</i>

Symmetric with `setOutRateLimits`: decays the existing inbound in-flight
and checkpoints the counterpart outbound limit before writing the new
inbound `limit` and `window`. The counterpart outbound limit's own
`limit` and `window` are preserved.

```solidity
function setInRateLimits(
        RateLimitConfig[] calldata configs_
    ) external override onlyBridgeConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configs_ | `RateLimitConfig[]` | The inbound rate limit configurations to apply. |

<a id="clearoutboundinflight-uint32"></a>

### clearOutboundInFlight

<i>

Reverts if:

- The caller does not have the bridge_configurator role.

</i>

Sets `inFlight` to zero and refreshes `lastUpdated` to the current
timestamp; the configured `limit` and `window` are preserved. The
corresponding inbound rate limit is not affected.

```solidity
function clearOutboundInFlight(
        uint32[] calldata eids_
    ) external override onlyBridgeConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eids_ | `uint32[]` | The endpoint identifiers whose outbound in-flight amount should be cleared. |

<a id="clearinboundinflight-uint32"></a>

### clearInboundInFlight

<i>

Reverts if:

- The caller does not have the bridge_configurator role.

</i>

Sets `inFlight` to zero and refreshes `lastUpdated` to the current
timestamp; the configured `limit` and `window` are preserved. The
corresponding outbound rate limit is not affected.

```solidity
function clearInboundInFlight(
        uint32[] calldata eids_
    ) external override onlyBridgeConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eids_ | `uint32[]` | The endpoint identifiers whose inbound in-flight amount should be cleared. |

<a id="_authorizerescue"></a>

### _authorizeRescue

Hook for subclasses to authorize the caller of `rescue()`.

<i>

Implementations MUST revert if the caller is not authorised.

</i>

```solidity
function _authorizeRescue() internal view override onlyManagerOrAdminRole;
```

<a id="combineoptions-uint32-uint16-bytes"></a>

### combineOptions

Combines enforced options with caller-provided extra options.

<i>

Reverts if:

- Extra options are provided but are not Type 3 format.
- Extra options have length 1 (insufficient for Type 3 prefix).

</i>

```solidity
function combineOptions(
        uint32 eid_,
        uint16 msgType_,
        bytes calldata extraOptions_
    ) external view override returns (bytes memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The endpoint ID. |
| msgType_ | `uint16` | The message type. |
| extraOptions_ | `bytes` | Caller-provided options. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes` | The combined options bytes. |

<a id="validatesetdelegate-address"></a>

### validateSetDelegate

Validates the payload that would be passed to `setDelegate`.

<i>

Reverts if:

- `delegate_` is the zero address.

</i>

```solidity
function validateSetDelegate(address delegate_) public pure override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegate_ | `address` | The candidate delegate address. |

<a id="validateincreasebridgedsupply-uint256"></a>

### validateIncreaseBridgedSupply

Validates the payload that would be passed to `increaseBridgedSupply`.

<i>

Reverts if:

- The chain is not canonical.
- `amount_` is zero.

</i>

```solidity
function validateIncreaseBridgedSupply(uint256 amount_) public view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The candidate increase amount. |

<a id="validatedecreasebridgedsupply-uint256"></a>

### validateDecreaseBridgedSupply

Validates the payload that would be passed to `decreaseBridgedSupply`.

<i>

Reverts if:

- The chain is not canonical.
- `amount_` is zero.
- The current `bridgedSupply` is below `amount_`.

</i>

```solidity
function validateDecreaseBridgedSupply(uint256 amount_) public view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The candidate decrease amount. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(
        bytes4 interfaceId
    ) public view override(PolicyReEnabler, ReEnablerGracePeriod, Rescueable) returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="_increasesupplyandmintapproval-uint256"></a>

### _increaseSupplyAndMintApproval

Increments `bridgedSupply` by `amount_` and grants the matching MINTR mint
approval to the gateway.

<i>

Used on canonical chains to keep `bridgedSupply` and the MINTR mint approval in
lockstep during outflow and forced supply increases.

</i>

```solidity
function _increaseSupplyAndMintApproval(uint256 amount_) private;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount of OHM to add to bridged supply and mint approval. |

<a id="_increasemintapproval-uint256"></a>

### _increaseMintApproval

Grants `amount_` of additional MINTR mint approval to the gateway.

<i>

Wraps the MINTR call so the `address(this)` argument is not duplicated at each
use site, saving bytecode.

</i>

```solidity
function _increaseMintApproval(uint256 amount_) private;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The mint approval delta to add. |

<a id="_setisreceiveenabled-bool"></a>

### _setIsReceiveEnabled

Sets `isReceiveEnabled` and emits the corresponding event.

```solidity
function _setIsReceiveEnabled(bool isReceiveEnabled_) private;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| isReceiveEnabled_ | `bool` | The new flag value. |

<a id="_requiresupplyatleastamount-uint256"></a>

### _requireSupplyAtLeastAmount

Reverts with `LZBridgeGateway_BridgedSupplyUnderflow` if the current
`bridgedSupply` is below `amount_`.

```solidity
function _requireSupplyAtLeastAmount(uint256 amount_) private view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount that would be subtracted from bridged supply. |

<a id="_requirenonzeroamount-uint256"></a>

### _requireNonzeroAmount

Reverts with `LZBridgeGateway_ZeroAmount` if `amount_` is zero.

```solidity
function _requireNonzeroAmount(uint256 amount_) private pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount to validate. |

<a id="_encodebridgeohmmessage-uint32-address-uint256-bytes"></a>

### _encodeBridgeOhmMessage

Builds the outbound bridge-OHM payload and the combined options for a given
destination.

```solidity
function _encodeBridgeOhmMessage(
        uint32 dstEid_,
        address to_,
        uint256 amount_,
        bytes calldata extraOptions_
    ) private view returns (bytes memory payload, bytes memory options);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The LayerZero destination endpoint ID. |
| to_ | `address` | The recipient address on the destination chain. |
| amount_ | `uint256` | The amount of OHM being bridged. |
| extraOptions_ | `bytes` | Caller-supplied Type 3 options to merge with enforced options. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| payload | `bytes` | The ABI-encoded `(MSG_BRIDGE_OHM, abi.encode(to_, amount_))` message. |
| options | `bytes` | The combination of enforced and caller-supplied options. |

<a id="_decodeandroute-uint32-bytes32-bytes"></a>

### _decodeAndRoute

Decodes the message type from the payload and routes to the appropriate handler.

```solidity
function _decodeAndRoute(uint32 srcEid_, bytes32 guid_, bytes calldata payload_) private;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` |  |
| guid_ | `bytes32` |  |
| payload_ | `bytes` |  |

<a id="_receivebridgeohm-uint32-bytes32-bytes"></a>

### _receiveBridgeOhm

Processes a received OHM bridge message.

<i>

On canonical chains, decrements bridgedSupply and mints from pre-funded approval
(set during outflow). On non-canonical chains, uses JIT self approval.

</i>

```solidity
function _receiveBridgeOhm(uint32 srcEid_, bytes32 guid_, bytes memory data_) private;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` |  |
| guid_ | `bytes32` |  |
| data_ | `bytes` |  |

<a id="_getpeerorrevert-uint32"></a>

### _getPeerOrRevert

```solidity
function _getPeerOrRevert(uint32 eid_) private view returns (bytes32);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` |  |

<a id="_requirecanonical"></a>

### _requireCanonical

```solidity
function _requireCanonical() private view;
```

<a id="_requirenonzeroaddress-address-string"></a>

### _requireNonzeroAddress

```solidity
function _requireNonzeroAddress(address address_, string memory parameter_) private pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| address_ | `address` |  |
| parameter_ | `string` |  |

<a id="_requirenonzerorecipient-address"></a>

### _requireNonzeroRecipient

Reverts with `LZBridgeGateway_InvalidAddress("to")` if `to_` is the zero address.

```solidity
function _requireNonzeroRecipient(address to_) private pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` | The recipient address to validate. |

<a id="_combineoptions-uint32-uint16-bytes"></a>

### _combineOptions

Combines enforced options with caller-provided extra options.

```solidity
function _combineOptions(
        uint32 eid_,
        uint16 msgType_,
        bytes calldata extraOptions_
    ) internal view returns (bytes memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` |  |
| msgType_ | `uint16` |  |
| extraOptions_ | `bytes` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes` |  |

<a id="_assertoptionstype3-bytes"></a>

### _assertOptionsType3

Validates that calldata options bytes begin with the Type 3 prefix.

```solidity
function _assertOptionsType3(bytes calldata options_) internal pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| options_ | `bytes` |  |
