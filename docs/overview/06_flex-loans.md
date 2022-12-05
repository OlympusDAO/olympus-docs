# Flex Loans

Flex Loans is a whitelisted product offering for protocols to grow their protocol-owned liquidity through an interest free loan against perfect collateral. By depositing gOHM as a collateral asset, the borrower is able to borrow up to 100% LTV in OHM and pair this with another token to create a liquidity pair. Since the loan is in the same denomination there is no risk of liquidation and the loan will lower in LTV% as the gOHM collateral continues to receive the underlying rebases.

Once whitelisted by Olympus, the borrower deposits gOHM into Flex Loan contract along with the other half of the intended LP token. The contract then borrows against the deposited gOHM and pairs the resulting OHM with the provided token to create an LP pair at the designated DEX of their choosing. At the moment, LP strategies for Balancer, Uniswap, Sushiswap and Curve are available.

Repayment of the loan is possible at any moment and can either be done by paying back the OHM debt directly (from the LP position itself, or externally supplied) or by using part of the supplied gOHM collateral.
