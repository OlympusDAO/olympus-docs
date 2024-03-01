---
sidebar_position: 2
sidebar_label: Creating a Proposal
---
# Creating a Proposal

:::info
Before creating a new proposal, it's essential to understand Olympus' On-Chain Governance (OCG) system. Please review the details in the [Intro section](./00_governance.md) and [Proposal lifecycle section](./proposal_lifecycle).
:::

Olympus uses [forge-proposal-simulator](https://solidity-labs.gitbook.io/forge-proposal-simulator/), an open-source framework designed to structure proposals effectively and streamline the proposal verification process. On a high-level, this framework allows anyone to execute proposals in a forked environment and develop integration tests to examine the new system's behavior in a controlled sandbox.

Before submitting a proposal to Governor Bravo, proposals must be added, tested and simulated in Olympus V3 repository. To do so, follow these steps:


### Fork the Olympus V3 Repository
Fork the [Olympus V3](https://github.com/OlympusDAO/olympus-v3) GitHub repository.

### Update the Address Registry
The address registry is available here: [addresses.json](./addresses.json). Declare all necessary dependencies and follow the naming convention: 
- 2.1. Use lowercase.
- 2.2. Separate words with dashes.
- 2.3. Start with the source: `"olympus"` or `"external"`.
- 2.4. Indicate the address/contract type: e.g., `"token"`, `"multisig"`, `"policy"`.
- 2.5. Include the address/contract name.
- 2.6. Exceptions: `"proposer"`, `"olympus-governor"`, `"olympus-kernel"`.

Examples:
- **Olympus modules**: Use the following pattern instead of importing module addresses:
    ```solidity
    Kernel kernel = Kernel(addresses.getAddress("olympus-kernel"));
    address TRSRY = address(kernel.getModuleForKeycode(toKeycode(bytes5("TRSRY"))));
    ```
- **Olympus policies**: `"olympus-policy-xxx"`
- **Olympus legacy contracts (OHM, gOHM, staking)**: `"olympus-legacy-xxx"`
- **Olympus multisigs**: `olympus-multisig-dao` or `olympus-multisig-emergency`
- **External tokens (DAI, sDAI, etc)**: `external-tokens-xxx`
- **External contracts**: `external-coolers-factory`

### Create a New Proposal Contract
Create a new contract in `src/proposals/` named after its corresponding OIP (e.g., `OIP_XXX.sol`). The contract should inherit `GovernorBravoProposal`. You can use [OIP_XXX.sol](./OIP_XXX.sol) as a template. Overwrite 


### Deploy, Build, Run and Validate
- `_deploy()`: Deploy the smart contracts for OlympusV3. If already deployed, import addresses from [address registry](./addresses.json).
- `_afterDeploy()`: If necessary, configure the contracts before pluggin them into OlympusV3. Cache initial TRSRY reserves and other values for post-execution checks.
- `_build()`: Add proposal actions one by one. Use the following functions:

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
- `_run()`: Simulate the proposal execution. Use the provided code.

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
- `_validate_()`: Perform validations and assertions to ensure proposal integrity. Demonstrate to the community that the proposal is secure and achieves the intended outcomes without putting the Treasury funds at risk.

### Add tests
Create a test in [src/test/proposals/](https://github.com/OlympusDAO/olympus-v3/tree/master/src/test/proposals) named after the OIP (e.g., `OIP_XXX.t.sol`). Use [OIP_XXX.t.sol](https://github.com/OlympusDAO/olympus-v3/tree/master/src/test/proposals/OIP_XXX.t.sol) as a template.

Import your proposal, and its dependencies, from step #3. Modify `setUp()` to deploy your OIP rather than `OIP_XXX`.

Include this test to ensure `setUp` execution:

```solidity
// [DO NOT DELETE] Dummy test to ensure that `setUp` is executed
function testProposal() public {
    assertTrue(true);
}
```

Optionally, feel free to include integration tests. Integration tests should be named `testProposal_xxx`.

### Submit a PR
Open a GitHub Pull Request in [Olympus V3](https://github.com/OlympusDAO/olympus-v3) repository in the format `OIP-XXX: proposal simulation`. Reach out in Discord to request a review from the community.


:::warning Warning
Due to the importance of this framework in ensuring transparency and security, **Emergency MS will veto any proposals not adopting it**. This stance is based on the belief that omitting the framework could indicate an attempt to pass a harmful proposal by obfuscating its review process.
:::