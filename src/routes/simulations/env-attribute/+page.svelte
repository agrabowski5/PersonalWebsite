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
</script>

<svelte:head>
    <title>Environmental Attribute Auction Simulator | Andrew Grabowski</title>
    <meta name="description" content="Explore auction mechanisms for environmental attributes like Sustainable Aviation Fuel certificates and analyze bidder strategies." />
</svelte:head>

<div class="simulator-container">
    <div class="page-header">
        <h1>Environmental Attribute Auction Simulator</h1>
        <p class="intro">
            This interactive tool simulates different types of auctions for environmental attributes with configurable parameters.
            Explore how different auction mechanisms affect outcomes when bidders have private values for sustainable goods.
        </p>
    </div>
    
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

<style>
    .simulator-container {
        max-width: 100%;
    }
    
    .page-header {
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 1rem;
    }
    
    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    
    .intro {
        font-size: 1.1rem;
        line-height: 1.6;
        max-width: 800px;
        margin-bottom: 1.5rem;
    }
    
    .auction-config {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background-color: var(--bg-secondary);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
    
    button {
        background-color: var(--color-accent);
        color: black;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    button:hover {
        background-color: var(--color-accent-dark);
    }
    
    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
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
        background-color: var(--bg-secondary);
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .card {
        background-color: var(--bg-secondary);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
        .value-range {
            flex-direction: column;
            gap: 0.5rem;
        }
    }
</style>