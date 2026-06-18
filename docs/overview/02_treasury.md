# Treasury

The Treasury is a key component of the Olympus protocol. The Treasury represents assets owned and controlled by the protocol across the on-chain treasury contract, treasury multisigs, liquidity positions, and protocol-controlled strategy venues.

The primary responsibility of the Treasury is to support OHM market liquidity, maintain liquid backing, and fund governance-approved protocol operations. Treasury assets include reserve assets, yield-bearing reserve positions, Cooler loan receivables, and protocol-owned liquidity.

Olympus no longer relies on a single sDAI reserve-operation path. Current reserve operations use assets such as USDS, sUSDS, sUSDe, and other governance-approved treasury positions. Cooler V2 extends USDS credit against gOHM collateral, and the resulting debt is tracked as a treasury receivable rather than idle cash. Other policies and modules can access treasury assets only through permissions granted by on-chain governance and Kernel roles.

Liquid backing metrics should be read from the current Olympus dashboard or indexers. These metrics are dynamic and depend on the current treasury market value, liquid reserve set, and backed OHM supply.

:::info
A full list of Olympus assets is available on the [Olympus Treasury Dashboard](https://app.olympusdao.finance/#/dashboard)
:::
