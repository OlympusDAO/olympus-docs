---
sidebar_position: 5
sidebar_label: Inverse Bonds
---

# Inverse Bonds ([OIP-76](https://forum.olympusdao.finance/d/1020-oip-76-create-inverse-bond-policy-lever))

## What are inverse bonds?

As their name suggests, one can think of inverse bonds as doing the "inverse" of what a regular bond does: instead of taking a treasury asset in exchange for OHM, **it takes in OHM in exchange for an asset from the treasury**. Inverse bonds have been introduced as a protocol lever in [OIP-76](https://snapshot.org/#/olympusdao.eth/proposal/0xa544837835f3c4e681efba18d33623d4eb2acedec352dfc3c926a45902cd3612) as a way to support the price of OHM when it is below the (liquid) backing per OHM, and with the launch of RBS, they’ve become an integral part of Olympus’ monetary policy.

Unlike reserve bonds, they vest instantly, and are the core mechanism of absorbing sell pressure from the market.

## Example

- `ETH` inverse bond
- `$120` backing per OHM
- `$100` market price of OHM
- `$100` bond price
- `$105` payout per bond (`5%` premium over the market price of OHM)

Here, the treasury receives $10 worth of OHM and delivers the user $10.50 worth of ETH.The backing per OHM also increases in that scenario, benefitting all remaining OHM holders.
