# Structure

## 1. Modules

### 1.1. Explain the LQREG
	- contracts: LQREG.v1.sol, OlympusLiquidityRegistry.sol
	- idea: understand how the LQREG works from a technical POV.

## 2. Policies

### 2.1. Explain the abstract contract
	- contract: SingleSidedLiquidityVault.sol
	- idea: understand how the SSLV works from a technical POV.
	- target audience: devs who want to integrate with SSLVs + devs who want to create a new SSLV.
	- topics to cover:
		- core functions: deposit(), withdraw(), claimRewards()
		- virtual functions (to be implemented by inheriting contract): _valueCollateral(), _getPoolPrice(), _getPoolOhmShare(), _deposit(), _withdraw(), _accumulateExternalRewards()
		- view functions?
		- admin functions?

### 2.2. Explain the stETH implementation
	- contract: StethLiquidityVault.sol
	- idea: show an example of how the virtual functions should be implemented
	- target audience: devs who want to create a new SSLV.