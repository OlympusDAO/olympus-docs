# Staking

OHM holders can choose to stake OHM for gOHM, which receives the Base Staking Rate (“BSR”). During Olympus’ bootstrapping phase, this rate was intended to reflect the expected growth of the network. The BSR now serves as a demand driver for OHM as well as a reference rate against which productive economic activity (lending, liquidity provision, etc.) is measured. Furthermore, it acts as a foundation for OHM bonds to develop a yield curve across different expiries.

The BSR is set by governance.

    gOHM = OHM * Index

where `Index` is an increasing number based on the BSR.

## Staking Warm-Up Period

To protect Olympus against flash loan attacks wishing to unfairly game the staking mechanism, a warm-up period was introduced in February 2023.

When you stake OHM to receive gOHM, you:

1. Will earn rebases as normal for each epoch that occurs every ~8 hours.
2. Will be able to claim gOHM (gOHM → OHM) after 2 rebases.
3. Can claim your original OHM amount if wishing to unstake before 2 epochs, waiving the earned rebases.
