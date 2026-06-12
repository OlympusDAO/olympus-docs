# Cross-Chain Bridge

## Overview

The OHM token is available cross-chain! Olympus uses bridge infrastructure to send and receive native OHM on supported chains. Whereas most bridge architectures create a wrapped representation of a token, Olympus takes a different approach: OHM is burned or locked on the source chain, and minted or released on the destination chain. The resulting OHM is native to that chain which makes it composable with every dApp.

Olympus currently uses two bridge paths:

- EVM chains use the `CrossChainBridge` contracts with LayerZero messaging.
- Solana uses Chainlink CCIP through `CCIPCrossChainBridge`, the user-facing bridge contract, and CCIP token pools such as `CCIPLockReleaseTokenPool`.

## How to bridge

1. Navigate to [https://app.olympusdao.finance](https://app.olympusdao.finance)
2. Click Bridge in the sidebar
3. Select the source chain and the destination chain
4. Enter amounts, approve and click Bridge. Note that Olympus does not charge a fee for bridging. You only pay for gas and the message passing fee charged by the bridge infrastructure.
5. You can view the transaction under the Transactions list.

## Supported networks

Arbitrum, Optimism, Base, Bera, and Solana.

## Mechanism

### EVM bridge

When sending OHM from a source chain (e.g. mainnet) to a supported EVM chain, the `CrossChainBridge` smart contract invokes the `MINTR` module to burn OHM on the source chain and send a message payload over the LayerZero Endpoint.

```solidity
function sendOhm(uint16 dstChainId_, address to_, uint256 amount_) external payable {
  if (!bridgeActive) revert Bridge_Deactivated();
  if (ohm.balanceOf(msg.sender) < amount_) revert Bridge_InsufficientAmount();

  bytes memory payload = abi.encode(to_, amount_);

  MINTR.burnOhm(msg.sender, amount_);
  _sendMessage(dstChainId_, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);

  emit BridgeTransferred(msg.sender, amount_, dstChainId_);
}
```

When the message is received by the destination chain (e.g. Arbitrum), the `CrossChainBridge` smart contract mints native OHM on the destination chain.

```solidity
function _receiveMessage(
    uint16 srcChainId_,
    bytes memory,
    uint64,
    bytes memory payload_
) internal {
  (address to, uint256 amount) = abi.decode(payload_, (address, uint256));

  MINTR.increaseMintApproval(address(this), amount);
  MINTR.mintOhm(to, amount);

  emit BridgeReceived(to, amount, srcChainId_);
}
```

### Solana bridge

Bridging to and from Solana uses Chainlink CCIP instead of the LayerZero bridge. Users interact with `CCIPCrossChainBridge`, which sends CCIP messages and transfers OHM through CCIP token pools.

On Ethereum, Olympus uses Chainlink's heavily audited `CCIPLockReleaseTokenPool` to lock canonical OHM when tokens are bridged out and release OHM when tokens are bridged back. On non-canonical chains, CCIP burn/mint token pools support the same native-token model by burning tokens on the source chain and minting tokens on the destination chain.

Once bridged, users can use native OHM in any protocol that accepts OHM.

## Security

The Olympus `CrossChainBridge` smart contract was reviewed by the LayerZero integrations team and audited by OtterSec. The CCIP bridge contracts were audited by Electisec. Audit reports are available in the [Audits](../security/02_audits.md) section.

To consider the pros and cons of Olympus’ approach to bridging, it’s worth understanding the difference between native tokens and non-native tokens. Native tokens (to a chain) are those tokens that are deployed by the smart contract; non-native tokens are those that are wrapped and managed by a third-party.

### Pros

Under the non-native bridge design, source tokens are stored in bridge contracts and wrapped representations are minted. This makes the contract a single point-of-attack, and why bridges account for ~50% of all DeFi exploits.

![Bridge Exploits](/gitbook/assets/bridgeExploits.png)

Olympus’ native bridge design avoids this problem by deploying bridge contracts that can mint, burn, lock, or release OHM according to the destination chain’s bridge path. This makes OHM a truly native asset on each chain it’s deployed on.

The CCIP lock/release design also bounds the impact of a non-canonical-chain minting issue. If an attacker were able to mint OHM on a non-canonical chain, the amount that could be bridged back to Ethereum mainnet would be capped by the amount of canonical OHM locked in the Ethereum `CCIPLockReleaseTokenPool`.

### Cons

Native bridge architecture is not without risk. The EVM bridge path depends on LayerZero messaging, and the Solana bridge path depends on Chainlink CCIP messaging and token pool infrastructure. A failure or compromise in the relevant messaging layer could affect bridge operation.

## Contracts

### Ethereum

| Contract                 | Address                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| CrossChainBridge         | [0x45e563c39cddba8699a90078f42353a57509543a](https://etherscan.io/address/0x45e563c39cddba8699a90078f42353a57509543a) |
| CCIPCrossChainBridge     | [0xFbf6383dC3F6010d403Ecdf12DDC1311701D143D](https://etherscan.io/address/0xFbf6383dC3F6010d403Ecdf12DDC1311701D143D) |
| CCIPLockReleaseTokenPool | [0xa5588e518CE5ee0e4628C005E4edAbD5e87de3aD](https://etherscan.io/address/0xa5588e518CE5ee0e4628C005E4edAbD5e87de3aD) |

### Arbitrum

| Contract         | Address                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| CrossChainBridge | [0x20B3834091f038Ce04D8686FAC99CA44A0FB285c](https://arbiscan.io/address/0x20B3834091f038Ce04D8686FAC99CA44A0FB285c) |
