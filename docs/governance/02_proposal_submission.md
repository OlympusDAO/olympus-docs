---
sidebar_position: 2
sidebar_label: Submission Guidelines
---

# Submission Guidelines
:::info
Before submitting a new proposal, it's essential to understand Olympus' On-Chain Governance (OCG) system. Please review the details in the [Intro page](./00_governance.md) and [Proposal lifecycle page](./proposal_lifecycle).
:::


## Requirements
To submit a new proposal to on-chain governance (OCG), submitters interact directly with Governor Bravo contract by calling `propose()` function. However, the following requirements must be met before submitting a proposal:

1. **Minimum voting power** - proposer must hold, and maintain, at least `proposalThreshold` of the total gOHM supply at time of proposal submission.
2. **Code review** - proposals must be added, tested and simulated in [olympus-v3 repository](https://github.com/OlympusDAO/olympus-v3/). This process ensures that the proposal is secure and achieves the intended outcomes without putting the protocol at risk.

### Minimum voting power
Whily anyone can submit a proposal by calling `propose()`, the transaction will revert unless proposer has a minimum amount of voting power to submit a proposal, determined by calling the `getProposalThresholdVotes()` function:

```solidity
function getProposalThresholdVotes() public view returns (uint256) {
    return (gohm.totalSupply() * proposalThreshold) / 100_000;
}
```

The proposer's gOHM balance is checked within the `propose()`, `queue()`, and `execute()` functions. If, at any time, the proposer's gOHM balance falls below the proposal threshold, the proposal will fail. This approach ensures that proposers (or their delegators) maintain skin in the game, preventing them from benefiting from malicious proposals.

:::info
The current proposalThreshold is set to 0.017% of the total gOHM supply
:::

### Code review
Olympus uses [forge-proposal-simulator](https://solidity-labs.gitbook.io/forge-proposal-simulator/), an open-source framework designed to structure proposals effectively and streamline the proposal verification process. On a high-level, this framework allows anyone to execute proposals in a forked environment and develop integration tests to examine the new system's behavior in a controlled sandbox.

:::warning Warning
Due to the importance of this framework in ensuring transparency and security, **Emergency MS will immediately veto any proposals not satisfying the two requirements**. This stance is based on the belief that bypassing the framework indicates an attempt to pass a harmful proposal by obfuscating its review process.
:::

## Instructions
To successfully submit a proposal, the proposer must do the following:

1. Submit code as a pull request to [olympus-v3 repo](https://github.com/OlympusDAO/olympus-v3)
2. Reach out in Discord to request a review from the community
3. Acquire, or be delegated to, `proposalThreshold` percent of gOHM supply. Proposer must maintain that amount of gOHM until conclusion of proposal
4. Call `propose()` on Governor Bravo contract, including the PR link in the description

To submit a successful PR with integration tests, begin by creating a new contract in `src/proposals/` named after its corresponding OIP (e.g., `OIP_XXX.sol`). The contract should inherit `GovernorBravoProposal`, and use [OIP_XXX.sol](./OIP_XXX.sol) as a template. 

Declare all necessary dependencies in [address registry](https://github.com/OlympusDAO/olympus-v3/blob/master/src/proposals/addresses.json). Follow this naming convention:
- Use lowercase.
- Separate words with dashes.
- Start with the source: `"olympus"` or `"external"`.
- Indicate the address/contract type: e.g., `"token"`, `"multisig"`, `"policy"`.
- Include the address/contract name.
- Exceptions: `"proposer"`, `"olympus-governor"`, `"olympus-kernel"`.

Examples:
- Olympus policies: `"olympus-policy-xxx"`
- Olympus modules: Use the following pattern instead of importing module addresses:
    ```solidity
    Kernel kernel = Kernel(addresses.getAddress("olympus-kernel"));
    address TRSRY = address(kernel.getModuleForKeycode(toKeycode(bytes5("TRSRY"))));
    ```
- External tokens (DAI, sDAI, etc): `external-tokens-xxx`
- External contracts: `external-coolers-factory`
- Olympus multisigs: `olympus-multisig-dao` or `olympus-multisig-emergency`
- Olympus legacy contracts (OHM, gOHM, staking): `"olympus-legacy-xxx"`

Deploy the smart contracts by running `_deploy()`. If the contract is already deployed, import addresses from [address registry](https://github.com/OlympusDAO/olympus-v3/blob/master/src/proposals/addresses.json) instead. If necessary, use `_afterDeploy()` hook to cache balances or other values to be used in `validate()`.

Construct the proposal actions by using `_build()`. Use the following functions:
    ```solidity
    // @dev push an action to the proposal
    function _pushAction(
        uint256 value,
        address target,
        bytes memory data,
        string memory _description
    ) internal {
        actions.push(
            Action({
                value: value,
                target: target,
                arguments: data,
                description: _description
            })
        );
    }

    // @dev push an action to the proposal with a value of 0
    function _pushAction(
        address target,
        bytes memory data,
        string memory _description
    ) internal {
        _pushAction(0, target, data, _description);
    }
    ```

Simulate the proposal execution by calling `_run()`. Use the provided code:

    ```solidity
    // Executes the proposal actions.
    function _run(Addresses addresses, address) internal override {
        // Simulates actions on TimelockController
        _simulateActions(
            addresses.getAddress("olympus-governor"),
            addresses.getAddress("olympus-legacy-gohm"),
            addresses.getAddress("proposer")
        );
    }
    ```

Perform validations and assertions through `_validate_()`. Validations should definitely demonstrate to the community that the proposal is secure and achieves the intended outcomes without putting the protocol at risk.

Create tests in [src/test/proposals/](https://github.com/OlympusDAO/olympus-v3/tree/master/src/test/proposals) named after the OIP (e.g., `OIP_XXX.t.sol` for unit tests and `testProposal_xxx` for integration tests). Use [OIP_XXX.t.sol](https://github.com/OlympusDAO/olympus-v3/tree/master/src/test/proposals/OIP_XXX.t.sol) as a template. Import your proposal, and its dependencies. Modify `setUp()` in `OIP_XXX.sol` and include this test to ensure `setUp()` is executed correctly:

```solidity
// [DO NOT DELETE] Dummy test to ensure that `setUp` is executed
function testProposal() public {
    assertTrue(true);
}
```

Once you feel comfortable, open a pull request in [olympus-v3 repo](https://github.com/OlympusDAO/olympus-v3) in the format `OIP-XXX: proposal simulation`.

