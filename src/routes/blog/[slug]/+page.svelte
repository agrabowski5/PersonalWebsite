<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    
    // This would typically come from a CMS or data file
    // For now, we'll use a simple lookup object
    const blogPosts = {
        'introduction-to-auction-theory': {
            title: 'Introduction to Auction Theory',
            date: '2025-05-01',
            author: 'Andrew Grabowski',
            content: `
## Understanding the Foundations

Auction theory is a branch of economics that studies how people act in auction markets and the properties of auction markets. It focuses on how bidding strategies are affected by the rules of the auction and how these rules affect the auction outcome.

### Key Auction Types

1. **English Auction**: The most common type where bidders openly compete against each other, placing bids higher than previous bids.

2. **Dutch Auction**: The auctioneer starts with a high price and gradually lowers it until someone accepts.

3. **First-Price Sealed-Bid Auction**: All bidders submit sealed bids simultaneously, and the highest bidder wins and pays their bid.

4. **Second-Price Sealed-Bid (Vickrey) Auction**: All bidders submit sealed bids simultaneously, and the highest bidder wins but pays the second-highest bid.

### The Revenue Equivalence Theorem

Under certain conditions (risk-neutral bidders, independent private values), all four standard auctions yield the same expected revenue to the seller. This powerful theorem helps us understand why seemingly different auction formats can produce similar outcomes.

## Applications in Modern Economics

Auction theory has applications far beyond traditional auctions:

- **Spectrum Allocation**: Governments use auctions to allocate radio spectrum to telecommunications companies.
- **Online Advertising**: Real-time bidding for ad placements uses auction mechanisms.
- **Procurement**: Companies and governments use reverse auctions to purchase goods and services.
- **Electricity Markets**: Many wholesale electricity markets use auction mechanisms to determine prices.

### The Future of Auction Theory

Recent developments in auction theory, including work by Nobel Prize winners Paul Milgrom and Robert Wilson, have focused on designing auctions for complex settings with multiple items and interdependent values.

These advances are helping to design better markets and allocation mechanisms across the economy.
            `,
            tags: ['economics', 'auction theory', 'game theory'],
            image: '/images/blog/auction-theory.jpg'
        },
        'mechanism-design-primer': {
            title: 'A Primer on Mechanism Design',
            date: '2025-04-15',
            author: 'Andrew Grabowski',
            content: `
## The Engineering of Economics

Mechanism design is often called "reverse game theory." While game theory analyzes how people behave given the rules of a game, mechanism design asks: what rules should we set to achieve a desired outcome?

### Key Concepts

1. **Incentive Compatibility**: Designing mechanisms where participants' best interests align with truthfully revealing their preferences.

2. **Individual Rationality**: Ensuring participants benefit from participating in the mechanism.

3. **Budget Balance**: Creating mechanisms that don't require external subsidies.

4. **Efficiency**: Maximizing the total welfare of all participants.

### The Revelation Principle

One of the most important results in mechanism design is the revelation principle, which states that any mechanism can be transformed into a direct, incentive-compatible mechanism that achieves the same outcome.

## Practical Applications

Mechanism design principles are applied in many domains:

- **Market Design**: Designing markets that efficiently match participants (e.g., school choice, organ exchanges).
- **Auction Design**: Creating auction formats that achieve seller objectives.
- **Voting Systems**: Designing voting rules that reflect group preferences.
- **Contract Design**: Creating incentive structures in employment and procurement contracts.

### The VCG Mechanism

The Vickrey-Clarke-Groves (VCG) mechanism is a generalized version of the second-price auction that works for multiple items. It charges each participant the externality they impose on others, leading to truthful bidding as a dominant strategy.

However, VCG mechanisms have practical limitations, including complexity and vulnerability to collusion, which have limited their adoption in practice.
            `,
            tags: ['economics', 'mechanism design', 'incentives'],
            image: '/images/blog/mechanism-design.jpg'
        },
        'simulation-approaches': {
            title: 'Approaches to Economic Simulation',
            date: '2025-03-22',
            author: 'Andrew Grabowski',
            content: `
## Why Simulate Economic Systems?

Economic simulation allows us to explore outcomes of complex systems where analytical solutions are difficult or impossible to obtain. It's particularly useful for:

- Testing theories in controlled environments
- Exploring emergent behaviors in complex markets
- Evaluating policy interventions before implementation
- Understanding strategic interactions between multiple agents

### Common Simulation Approaches

1. **Agent-Based Modeling (ABM)**

   Agent-based models simulate the actions and interactions of autonomous agents to assess their effects on the system as a whole. They're especially useful for:
   
   - Markets with heterogeneous participants
   - Systems with network effects
   - Scenarios where learning and adaptation are important

2. **Monte Carlo Simulation**

   Monte Carlo methods use repeated random sampling to obtain numerical results and understand the risk and uncertainty in predictive models. They're valuable for:
   
   - Risk assessment
   - Option pricing and financial modeling
   - Evaluating auction outcomes with uncertain parameters
`,
            tags: ['economics', 'simulation', 'agent-based modeling'],
            image: '/images/blog/simulation.jpg'
        },
    };
</script>
