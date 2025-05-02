<script>
    import { onMount } from 'svelte';
    
    let numBidders = 5;
    let numItems = 3;
    let auctionType = 'firstPrice';
    let valueDistribution = 'uniform';
    let minValue = 0;
    let maxValue = 100;
    let results = [];
    let showResults = false;
    let loading = false;
    
    // Bidder values will be stored here
    let bidderValues = [];
    
    // Generate random values for bidders
    function generateValues() {
        bidderValues = [];
        for (let i = 0; i < numBidders; i++) {
            let bidderItemValues = [];
            for (let j = 0; j < numItems; j++) {
                if (valueDistribution === 'uniform') {
                    bidderItemValues.push(Math.floor(minValue + Math.random() * (maxValue - minValue)));
                } else {
                    // Normal distribution approximation using Central Limit Theorem
                    let mean = (maxValue + minValue) / 2;
                    let stdDev = (maxValue - minValue) / 6; // ~99.7% within range
                    let sum = 0;
                    for (let k = 0; k < 12; k++) { // 12 iterations for approximation
                        sum += Math.random();
                    }
                    let normalRandom = (sum - 6) * stdDev + mean;
                    // Constrain to min and max values
                    normalRandom = Math.max(minValue, Math.min(maxValue, normalRandom));
                    bidderItemValues.push(Math.floor(normalRandom));
                }
            }
            bidderValues.push(bidderItemValues);
        }
    }
    
    // Run the auction simulation
    function runAuction() {
        loading = true;
        showResults = false;
        
        // Generate values
        generateValues();
        
        // Simple bidding strategy - bid a percentage of value based on auction type
        let bids = bidderValues.map(bidderValues => {
            return bidderValues.map(value => {
                if (auctionType === 'firstPrice') {
                    // In first-price auctions, bid strategically lower
                    return Math.floor(value * 0.7); // Bid 70% of value
                } else {
                    // In second-price auctions, bid truthfully
                    return value;
                }
            });
        });
        
        // Determine winners and payments
        results = [];
        for (let itemIndex = 0; itemIndex < numItems; itemIndex++) {
            let highestBid = -1;
            let secondHighestBid = -1;
            let winningBidderIndex = -1;
            
            // Find highest and second-highest bids
            for (let bidderIndex = 0; bidderIndex < numBidders; bidderIndex++) {
                let bid = bids[bidderIndex][itemIndex];
                if (bid > highestBid) {
                    secondHighestBid = highestBid;
                    highestBid = bid;
                    winningBidderIndex = bidderIndex;
                } else if (bid > secondHighestBid) {
                    secondHighestBid = bid;
                }
            }
            
            // Calculate payment based on auction type
            let payment = auctionType === 'firstPrice' ? highestBid : secondHighestBid;
            
            // Calculate surplus (profit) for the winner
            let winnerValue = bidderValues[winningBidderIndex][itemIndex];
            let surplus = winnerValue - payment;
            
            results.push({
                item: itemIndex + 1,
                winner: winningBidderIndex + 1,
                winnerValue,
                payment,
                surplus,
                highestBid,
                secondHighestBid
            });
        }
        
        // Simulate delay to show loading state
        setTimeout(() => {
            loading = false;
            showResults = true;
        }, 800);
    }
    
    // For chart visualization (simplified)
    let chartData = [];
    
    $: if (showResults && results.length > 0) {
        chartData = results.map(r => ({
            item: `Item ${r.item}`,
            value: r.winnerValue,
            payment: r.payment,
            surplus: r.surplus
        }));
    }
    
    onMount(() => {
        // Initialize with some default values
        generateValues();
    });

    let simulations = [
        {
            id: "saf-market",
            title: "Sustainable Aviation Fuel Market Dynamics",
            description: "Explore how different policy interventions affect SAF adoption rates and market growth.",
            thumbnail: "/images/simulations/saf-simulation.jpg",
            categories: ["market", "aviation", "policy"],
            interactive: true
        },
        {
            id: "carbon-pricing",
            title: "Carbon Pricing Impact Simulator",
            description: "See how different carbon pricing mechanisms affect emissions across industrial sectors.",
            thumbnail: "/images/simulations/carbon-simulation.jpg",
            categories: ["economics", "policy", "climate"],
            interactive: true
        },
        {
            id: "book-claim",
            title: "Book and Claim System Visualizer",
            description: "Visual representation of environmental attribute tracking in a book and claim system.",
            thumbnail: "/images/simulations/bookclaim-simulation.jpg",
            categories: ["market", "accounting", "visualization"],
            interactive: false
        },
        {
            id: "renewable-auction",
            title: "Renewable Energy Auction Simulator",
            description: "Simulate bidding strategies and outcomes in renewable energy procurement auctions.",
            thumbnail: "/images/simulations/auction-simulation.jpg",
            categories: ["market", "auction", "energy"],
            interactive: true
        }
    ];
    
    let categories = [...new Set(simulations.flatMap(sim => sim.categories))];
    categories.unshift("All");
    
    let selectedCategory = "All";
    let activeSimulation = null;
    
    function filterByCategory(category) {
        selectedCategory = category;
    }
    
    function openSimulation(simulation) {
        activeSimulation = simulation;
        // This would potentially load an iframe or component with the simulation
    }
    
    $: filteredSimulations = selectedCategory === "All" ? 
        simulations : 
        simulations.filter(sim => sim.categories.includes(selectedCategory));

    let projects = [
        {
            title: "Collaborative Purchasing of Environmental Attributes",
            year: 2024,
            image: "images/Thesis_Emission_Tracking.png",
            description: "Developed a novel game-theoretic approach to collaborative purchasing of environmental attributes like Sustainable Aviation Fuel certificates.",
            tags: ["market design", "game theory", "climate"]
        },
        {
            title: "Book and Claim Systems for SAF",
            year: 2023,
            image: "images/book-claim.png", 
            description: "Designed and analyzed book and claim systems for tracking environmental attributes of Sustainable Aviation Fuel across complex supply chains.",
            tags: ["aviation", "systems engineering", "sustainability"]
        },
        {
            title: "Carbon Market Optimization Model",
            year: 2023,
            image: "images/carbon-market.png",
            description: "Created computational models to optimize carbon market design and maximize emissions reduction at minimal economic cost.",
            tags: ["economics", "climate policy", "modeling"]
        },
        {
            title: "Climate Policy Impact Assessment Tool",
            year: 2022,
            image: "images/policy-assessment.png",
            description: "Built an interactive tool to evaluate the environmental and economic impacts of different climate policy mechanisms.",
            tags: ["policy", "impact assessment", "visualization"]
        },
        {
            title: "Renewable Energy Credit Trading Platform",
            year: 2022,
            image: "images/rec-trading.png",
            description: "Developed a prototype platform for more efficient trading of renewable energy credits with improved price discovery.",
            tags: ["market design", "energy", "platform"]
        },
        {
            title: "Supply Chain Emissions Tracking System",
            year: 2021,
            image: "images/emissions-tracking.png",
            description: "Created a system to track and verify emissions across multi-tier supply chains using blockchain and IoT sensors.",
            tags: ["supply chain", "blockchain", "emissions"]
        },
        {
            title: "Sustainable Aviation Market Analysis",
            year: 2021,
            image: "images/aviation-market.png",
            description: "Analyzed market barriers to sustainable aviation fuel adoption and proposed financial mechanisms to overcome them.",
            tags: ["market analysis", "aviation", "sustainability"]
        },
        {
            title: "Green Bond Impact Assessment Framework",
            year: 2021,
            image: "images/green-bonds.png",
            description: "Developed a standardized framework for measuring and reporting the environmental impact of green bonds.",
            tags: ["finance", "impact assessment", "standards"]
        },
        {
            title: "Emissions Trading Simulation",
            year: 2020,
            image: "images/emissions-trading.png",
            description: "Built a multi-agent simulation of emissions trading systems to identify optimal policy parameters.",
            tags: ["simulation", "policy", "emissions"]
        },
        {
            title: "Climate Tech Investment Analysis Tool",
            year: 2020,
            image: "images/investment-analysis.png",
            description: "Created an analytical tool to evaluate climate tech investments based on both financial returns and emissions reduction potential.",
            tags: ["finance", "climate tech", "analysis"]
        }
    ];
</script>

<svelte:head>
    <title>Simulations | Andrew Grabowski</title>
    <meta name="description" content="Interactive simulations and visualizations exploring market mechanisms, policy impacts, and climate solutions." />
</svelte:head>

<div class="content-section">
    <h1>Auction Simulator</h1>
    
    <p>This interactive tool simulates different types of auctions with configurable parameters.
    Explore how different auction mechanisms affect outcomes when bidders have private values.</p>
    
    <div class="auction-config card">
        <h2>Configure Auction</h2>
        
        <div class="form-group">
            <label for="auctionType">Auction Type:</label>
            <select id="auctionType" bind:value={auctionType}>
                <option value="firstPrice">First Price Auction</option>
                <option value="secondPrice">Second Price (Vickrey) Auction</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="numBidders">Number of Bidders:</label>
            <input type="range" id="numBidders" bind:value={numBidders} min="2" max="20" step="1">
            <span>{numBidders} bidders</span>
        </div>
        
        <div class="form-group">
            <label for="numItems">Number of Items:</label>
            <input type="range" id="numItems" bind:value={numItems} min="1" max="10" step="1">
            <span>{numItems} items</span>
        </div>
        
        <div class="form-group">
            <label for="valueDistribution">Value Distribution:</label>
            <select id="valueDistribution" bind:value={valueDistribution}>
                <option value="uniform">Uniform</option>
                <option value="normal">Normal</option>
            </select>
        </div>
        
        <div class="value-range">
            <div class="form-group">
                <label for="minValue">Min Value:</label>
                <input type="number" id="minValue" bind:value={minValue} min="0" max="999">
            </div>
            
            <div class="form-group">
                <label for="maxValue">Max Value:</label>
                <input type="number" id="maxValue" bind:value={maxValue} min="1" max="1000">
            </div>
        </div>
        
        <button on:click={runAuction} disabled={loading}>
            {loading ? 'Simulating...' : 'Run Auction Simulation'}
        </button>
    </div>
    
    {#if loading}
        <div class="loading">
            <p>Simulating auction results...</p>
            <div class="spinner"></div>
        </div>
    {/if}
    
    {#if showResults}
        <div class="results-section card">
            <h2>Auction Results</h2>
            
            <div class="results-overview">
                <div class="metric">
                    <span class="metric-value">{results.length}</span>
                    <span class="metric-label">Items Sold</span>
                </div>
                <div class="metric">
                    <span class="metric-value">${results.reduce((sum, r) => sum + r.payment, 0)}</span>
                    <span class="metric-label">Total Revenue</span>
                </div>
                <div class="metric">
                    <span class="metric-value">${results.reduce((sum, r) => sum + r.surplus, 0)}</span>
                    <span class="metric-label">Total Surplus</span>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Winner</th>
                        <th>Winner's Value</th>
                        <th>Payment</th>
                        <th>Surplus</th>
                    </tr>
                </thead>
                <tbody>
                    {#each results as result}
                        <tr>
                            <td>Item {result.item}</td>
                            <td>Bidder {result.winner}</td>
                            <td>${result.winnerValue}</td>
                            <td>${result.payment}</td>
                            <td>${result.surplus}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            
            <div class="bidder-values">
                <h3>Bidder Values</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Bidder</th>
                            {#each Array(numItems) as _, i}
                                <th>Item {i+1}</th>
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                        {#each bidderValues as bidder, i}
                            <tr>
                                <td>Bidder {i+1}</td>
                                {#each bidder as value}
                                    <td>${value}</td>
                                {/each}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            
            <button on:click={() => showResults = false}>Hide Results</button>
        </div>
    {/if}
</div>

<div class="simulations-container">
    <div class="page-header">
        <h1>Interactive Simulations</h1>
        <p class="intro">
            Explore complex systems through interactive models that demonstrate the dynamics 
            of markets, policies, and environmental interventions. These simulations provide 
            intuitive ways to understand the impacts of different decisions.
        </p>
    </div>
    
    <div class="filters">
        <div class="categories-filter">
            {#each categories as category}
                <button 
                    class:active={selectedCategory === category}
                    on:click={() => filterByCategory(category)}
                >
                    {category}
                </button>
            {/each}
        </div>
        
        <div class="view-options">
            <span class="legend">
                <span class="interactive-marker"></span> Interactive
            </span>
        </div>
    </div>
    
    <div class="simulations-grid">
        {#each filteredSimulations as sim}
            <div class="simulation-card" on:click={() => openSimulation(sim)}>
                <div class="simulation-thumbnail">
                    <img src={sim.thumbnail || "/images/simulations/placeholder.jpg"} alt={sim.title}>
                    {#if sim.interactive}
                        <div class="interactive-badge">Interactive</div>
                    {/if}
                </div>
                <div class="simulation-content">
                    <h2>{sim.title}</h2>
                    <p>{sim.description}</p>
                    <div class="simulation-categories">
                        {#each sim.categories as category}
                            <span class="category-tag">{category}</span>
                        {/each}
                    </div>
                    <button class="launch-button">
                        Launch Simulation
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        {/each}
    </div>
    
    {#if filteredSimulations.length === 0}
        <div class="no-simulations">
            <p>No simulations found in this category.</p>
            <button on:click={() => selectedCategory = "All"}>View all simulations</button>
        </div>
    {/if}
    
    <!-- Simulation modal would go here -->
</div>

<style>
    .auction-config {
        margin-bottom: 2rem;
        padding: 1.5rem;
    }
    
    .form-group {
        margin-bottom: 1rem;
    }
    
    label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    input[type="range"] {
        width: 100%;
        max-width: 300px;
    }
    
    select, input {
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid var(--border-color, #ccc);
        background-color: var(--background, white);
        color: var(--text, black);
        margin-right: 0.5rem;
    }
    
    .value-range {
        display: flex;
        gap: 1rem;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0 2rem;
    }
    
    th, td {
        padding: 0.5rem;
        text-align: left;
        border-bottom: 1px solid var(--border-color, #ccc);
    }
    
    th {
        background-color: color-mix(in oklch, var(--color-accent, #0066ff) 10%, var(--background, white));
    }
    
    .results-overview {
        display: flex;
        justify-content: space-around;
        margin: 2rem 0;
    }
    
    .metric {
        text-align: center;
    }
    
    .metric-value {
        display: block;
        font-size: 2rem;
        font-weight: bold;
        color: var(--color-accent, #0066ff);
    }
    
    .metric-label {
        font-size: 0.9rem;
    }
    
    .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem 0;
    }
    
    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 4px solid var(--color-accent, #0066ff);
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .bidder-values {
        margin-top: 2rem;
    }
    
    .results-section {
        margin-top: 2rem;
    }

    .simulations-container {
        max-width: 100%;
    }
    
    .page-header {
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 1rem;
    }
    
    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .intro {
        font-size: 1.1rem;
        line-height: 1.6;
        max-width: 800px;
        margin-bottom: 1.5rem;
    }
    
    .filters {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: var(--bg-secondary);
        border-radius: 8px;
    }
    
    .categories-filter {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .categories-filter button {
        background: none;
        border: 1px solid var(--border-color);
        border-radius: 20px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        color: var(--text-secondary);
        transition: all 0.2s ease;
    }
    
    .categories-filter button:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
    }
    
    .categories-filter button.active {
        background-color: var(--color-accent);
        border-color: var(--color-accent);
        color: black;
    }
    
    .view-options {
        display: flex;
        align-items: center;
    }
    
    .legend {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .interactive-marker {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: var(--color-accent);
    }
    
    .simulations-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
    }
    
    .simulation-card {
        background-color: var(--bg-secondary);
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s, box-shadow 0.3s;
        cursor: pointer;
    }
    
    .simulation-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
    }
    
    .simulation-thumbnail {
        position: relative;
        height: 200px;
        overflow: hidden;
    }
    
    .simulation-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .interactive-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: var(--color-accent);
        color: black;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: bold;
    }
    
    .simulation-content {
        padding: 1.5rem;
    }
    
    .simulation-content h2 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        font-size: 1.4rem;
    }
    
    .simulation-content p {
        margin-bottom: 1rem;
        color: var(--text-secondary);
    }
    
    .simulation-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }
    
    .category-tag {
        background-color: rgba(46, 204, 113, 0.1);
        color: var(--color-accent-light);
        padding: 0.25rem 0.5rem;
        border-radius: 20px;
        font-size: 0.8rem;
    }
    
    .launch-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: var(--color-accent);
        color: black;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        width: 100%;
        transition: all 0.2s ease;
    }
    
    .launch-button:hover {
        background-color: var(--color-accent-dark);
    }
    
    .no-simulations {
        text-align: center;
        padding: 3rem 0;
        background-color: var(--bg-secondary);
        border-radius: 8px;
    }
    
    .no-simulations button {
        background: none;
        border: 1px solid var(--color-accent);
        color: var(--color-accent);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 1rem;
    }
    
    .no-simulations button:hover {
        background-color: rgba(46, 204, 113, 0.1);
    }
    
    @media (max-width: 900px) {
        .filters {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .simulations-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
    }
</style>