---
sidebar_position: 7
---

# OlyZaps

## What is OlyZaps?

OlyZaps allows users to swap (zap) any asset into sOHM or a bond directly through
the [Olympus App](https://app.olympusdao.finance/#/zap).

This is made possible through a collaboration with [Zapper](https://zapper.fi/),
which provides the back-end infrastucture for zapping.

## Does OlyZaps save me gas?

OlyZaps combines a few transactions (token approval and swap) into a single transaction.
As a result, there is less exposure to gas price volatility and the gas fees you
end up paying should be the same or slightly less than performing all these
transactions separately.

## I am trying to use OlyZaps, but the quoted gas price looks expensive.

OlyZaps transaction may appear more expensive, but that is only because OlyZaps
bundles all these transactions into a single, big transaction. If you add up
the gas fees of these individual transactions, the math should work out about the
same.

As mentioned in the previous entry, OlyZaps may end up costing less because you
are not exposed to gas price volatility.
## How to Zap into sOHM

1\. Go to the OlyZaps page.

![OlyZaps page](/gitbook/assets/using-the-website/olyzaps/main.png)

2\. On the "You Pay" field, select the token that you wish to zap into sOHM, and
enter an amount.

![Select a token](/gitbook/assets/using-the-website/olyzaps/select_token.png)

3\. Click "Approve" and sign the transaction on your wallet. **You need to pay gas
for this transaction**.

![Token approval](/gitbook/assets/using-the-website/olyzaps/approve.png)

4\. After the "Approve" transaction has been processed successfully, click "Zap-Stake OHM"
and sign the transaction. **You need to pay gas again for this transaction**.

![Zap and stake](/gitbook/assets/using-the-website/olyzaps/zap.png)

5\. Your sOHM balance should be updated once the zap operation is successful. If
you cannot find sOHM in your wallet, please add the [sOHM contract address](../contracts/tokens#sohm)
to your wallet.

![Balance is updated](/gitbook/assets/using-the-website/olyzaps/balance.png)

:::info
The "Approve" transaction is not needed when you zap from the _same token_ next
time.
:::

## How to Zap into Bonds

:::info
OlyZaps also allows users to zap into Olympus bonds (e.g. OHM-DAI bonds, CVX bonds)
from any assets. This feature is currently **in the works**.
:::