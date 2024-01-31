# Default Framework

Olympus V3 uses the [Default Framework](https://github.com/fullyallocated/Default) to configure the protocol’s smart contracts and authorized addresses within the system. More information regarding Default Framework can be found in the [Contracts Overview section](../technical/00_overview.md) of the docs.

## ROLES.sol
Module that stores all the active system roles.


## Kernel.sol
Contract registry that manages all the contracts of the system. The `Kernel` is in charge of module and policy upgradability.


**Roles** 
- `executor`: Only address that can interact with the `Kernel` contract. The `executor` can install and upgrade modules, as well as approve and terminate policies.

![](/gitbook/assets/security-diagrams/olympus-kernel.svg)


## RolesAdmin.sol
Policy that has the ability to grant and revoke roles from `ROLES` module.

**Dependencies**
- `ROLES` module
	
**Permissions**
- `ROLES.saveRole`
- `ROLES.removeRole`

**Roles**
- `admin`: Only address that can grant/revoke roles by calling `grantRole()` and `revokeRole()` respectively. It is also the only address that can propose a newAdmin by calling pushNewAdmin(). On top of that, the newAdmin must accept the role by calling pullNewAdmin().

![](/gitbook/assets/security-diagrams/olympus-roles.svg)

## Emergency.sol
Policy that has the ability to shutdown critical system functionalities.

**Dependencies**
- `ROLES` module
- `TRSRY` module
- `MINTR` module

**Permissions**
- `TRSRY.deactivate`
- `TRSRY.activate`
- `MINTR.deactivate`
- `MINTR.activate`

**Roles**
- `emergency_shutdown`: has the ability to shutdown Treasury withdrawals by calling `shutdownWithdrawals()`, Minting capabilities by calling `shutdownMinting()`, or both by calling `shutdown()`. This role is held by the Emergency Multisig, requiring only 2 confirmations out of 8 signers.
- `emergency_restart`: has the ability to restart Treasury withdrawals by calling `restartWithdrawals()`, Minting capabilities by calling `restartMinting()`, or both by calling `restart()`. This role is held by the DAO Multisig, requiring 4 confirmations out of 8 signers.

![](/gitbook/assets/security-diagrams/olympus-emergency.svg)

## Heart.sol
Policy that provides keeper rewards to call the `beat()` function which orchestrates state updates and fuels Olympus' market operations.

**Dependencies**
- `ROLES` module
- `PRICE` module

**Permissions**
- `PRICE.updateMovingAverage`

**Roles**
- Only the `heart_admin` controls the liveliness of the `Heart` contract, as well as the `Operator` implementation and the reward tokens paid to keepers.

![](/gitbook/assets/security-diagrams/olympus-heart.svg)

## Operator.sol
Policy that performs market operations to enforce OlympusDAO's OHM price range guidance policies against a specific reserve asset. These market operations are only performed under certain conditions and up to a specific capacity before the market must stabilize to regenerate more capacity.

**Dependencies**
- `ROLES` module
- `TRSRY` module
- `MINTR` module
- `PRICE` module
- `RANGE` module

**Permissions**
- `TRSRY.withdrawReserves`
- `TRSRY.increaseWithdrawApproval`
- `TRSRY.decreaseWithdrawApproval`
- `MINTR.mintOhm`
- `MINTR.burnOhm`
- `MINTR.mintOhm`
- `MINTR.increaseMintApproval`
- `MINTR.decreaseMintApproval`
- `RANGE.updateCapacity`
- `RANGE.updateMarket`
- `RANGE.updatePrices`
- `RANGE.regenerate`
- `RANGE.setSpreads`
- `RANGE.setThresholdFactor`

**Roles**
- `operator_admin`: Has the ability to initialize the system. Limited to the DAO Multisig and to a single execution.
- `operator_policy`: Has the ability to execute policy-related functions that control the system liveliness and determine the parameters under which the system works. The liveliness functions are critical, since they can activate/deactivate the system, as well as regenerate the Treasury's capacity to perform market operations.
- `operator_operate`: Has the ability to make the system work. Executes different core functions depending on the system state. Limited to the `Heart` contract (triggered by keepers) and the DAO Multisig.
- `operator_reporter`: Records a bond purchase and updates capacity accordingly. Limited to the `BondCallback` contract.

![](/gitbook/assets/security-diagrams/olympus-operator.svg)

## TreasuryCustodian.sol
Policy that gatekeeps the Treasury. Prevents unauthorized contracts from interacting with the Treasury.

**Dependencies**
- `ROLES` module
- `TRSRY` module

**Permissions**
- `TRSRY.withdrawReserves`
- `TRSRY.increaseWithdrawApproval`
- `TRSRY.decreaseWithdrawApproval`
- `TRSRY.setDebt`
- `TRSRY.increaseDebtorApproval`
- `TRSRY.decreaseDebtorApproval`

**Roles**
- `custodian`: The solely manager of Treasury access. Has the ability to grant/revoke withdrawal/debt capabilities to external contracts. It can also withdraw funds form the Treasury directly. Finally, it can also revoke previous approvals for policies. Limited to the DAO Multisig.

![](/gitbook/assets/security-diagrams/olympus-custodian.svg)

## BondCallback.sol
Policy that handles the calls from the bond markets to gatekeep the interactions with the Treasury.

**Dependencies**
- `ROLES` module
- `TRSRY` module
- `MINTR` module

**Permissions**
- `TRSRY.withdrawReserves`
- `TRSRY.increaseWithdrawApproval`
- `MINTR.mintOhm`
- `MINTR.burnOhm`
- `MINTR.increaseMintApproval`

**Roles**
- `callback_admin`: Has the ability to set he operator contract for the callback to use to report bond purchases. It also has the ability to send tokens in this contract to the Treasury.
- `callback_whitelist`: Can whitelist a bond Teller, as well as blacklist specific bond markets in case there's an issue with the Teller.

![](/gitbook/assets/security-diagrams/olympus-callback.svg)

## PriceConfig.sol
Policy that deals with the price observations and which serves as the price reference that guides the market operations of the system.

**Dependencies**
- `ROLES` module
- `PRICE` module

**Permissions**
- `PRICE.initialize`
- `PRICE.changeMovingAverageDuration`
- `PRICE.changeObservationFrequency`
- `PRICE.changeUpdateThresholds`
- `PRICE.changeMinimumTargetPrice`

**Roles**
- `price_admin`: Has the ability to configure the observation frequency, as well as determine the moving average duration and the minimum target price.

![](/gitbook/assets/security-diagrams/olympus-price.svg)

## BondManager.sol
Policy that manages the auctions and the issuance of OHM Bonds.

**Dependencies**
- `ROLES` module
- `TRSRY` module
- `MINTR` module

**Permissions**
- `MINTR.mintOhm`
- `MINTR.burnOhm`
- `MINTR.increaseMintApproval`
- `MINTR.decreaseMintApproval`

**Roles**
- `bondmanager_admin`: Has the ability to configure the auction parameters, create new bond markets, finalize them, as well as some emergency functions in case there is a malfunction.
	
## Clearinghouse.sol
Policy that manages loan workflows including fulfilling requests, extending maturities, claiming defaults and rebalancing funds to/from Olympus Treasury

**Dependencies**
- `ROLES` module
- `TRSRY` module
- `MINTR` module

**Permissions**
```
    function requestPermissions() external view override returns (Permissions[] memory requests) {
        Keycode TRSRY_KEYCODE = toKeycode("TRSRY");

        requests = new Permissions[](4);
        requests[0] = Permissions(TRSRY_KEYCODE, TRSRY.setDebt.selector);
        requests[1] = Permissions(TRSRY_KEYCODE, TRSRY.increaseWithdrawApproval.selector);
        requests[2] = Permissions(TRSRY_KEYCODE, TRSRY.withdrawReserves.selector);
        requests[3] = Permissions(toKeycode("MINTR"), MINTR.burnOhm.selector);
    }
```

**Roles**
- `cooler_overseer`: ability to call `defund()` and `reactivate()`
- `emergency_shutdown`: ability to call `emergencyShutdown()`
	

## CrossChainBridge.sol
Policy that serves as the message bridge for cross-chain OHM transfers. Uses LayerZero as communication protocol.

**Dependencies**
- `ROLES` module
- `MINTR` module

**Permissions**
- `MINTR.mintOhm`
- `MINTR.burnOhm`
- `MINTR.increaseMintApproval`
	
**Roles**
- `bridge_admin`: Has the ability to set the bridge configuration, as well as activating and deactivating the bridge.
	
## BLVaultManagerLido.sol (in process of deprecation)
Policy that manages the auctions and the issuance of OHM Bonds.

**Dependencies**
- `ROLES` module
- `TRSRY` module
- `MINTR` module
- `BLREG` module

**Permissions**
- `MINTR.mintOhm`
- `MINTR.burnOhm`
- `MINTR.increaseMintApproval`
- `BLREG.addVault`
- `BLREG.removeVault`

**Roles**
- `liquidityvault_admin`: Has the ability to configure the Lido Boosted Liquidity Vault parameters, as well as activating the vaults.
- `emergency_admin`: Has the ability shut down the Lido Boosted Liquidity Vaults.



## Kernel and ROLES module

| Network | Type | Address | Executor |
| ------------ | -------------- | ------- | ---- |
| Mainnet | Kernel | `0x2286d7f9639e8158FaD1169e76d1FbC38247f54b` | DAO MS |
| Mainnet | ROLES module | `0x6CAfd730Dc199Df73C16420C4fCAb18E3afbfA59` | DAO MS |

## Active Roles
| Role | Executor |
| ------------ | ------- |
|  `admin` |  DAO Multisig |
|  `emergency_restart` |  DAO Multisig |
|  `emergency_shutdown` |  Emergency Multisig |
|  `heart_admin` |  DAO Multisig |
|  `operator_admin` |  DAO Multisig |
|  `operator_policy` |  DAO Multisig |
|  `operator_operate` |  DAO Multisig |
|  `operator_reporter` | Bond Callback |
|  `custodian` |  DAO Multisig |
|  `callback_admin` |  DAO Multisig |
|  `price_admin` |  DAO Multisig |
|  `price_admin` |  DAO Multisig |
|  `bondmanager_admin` |  DAO Multisig |
|  `liquidityvault_admin` |  DAO Multisig |
|  `emergency_admin` | Emergency Multisig |
|  `bridge_admin` |  DAO Multisig |
|  `cooler_overseer` |  DAO MS |
|  `emergency_shutdown` |  Emergency MS |


## Relevant Multisigs
| Multisig | Network | Address | Roles | Setup |
| ------- | -------- | ------- | ------| ------- |
| DAO Multisig | Mainnet | `0x245cc372C84B3645Bf0Ffe6538620B04a217988B` | [`executor`, `admin`, `emergency_restart`, `operator_admin`, `operator_operate`, `custodian`, `callback_admin`, `price_admin`, `cooler_overseer`] | 4/8 |
| Emergency Multisig| Mainnet  | `0xa8A6ff2606b24F61AFA986381D8991DFcCCd2D55` | [`emergency_shutdown`, `emergency_admin`] | 2/8 |
