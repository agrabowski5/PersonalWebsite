<script>
    import { onMount } from 'svelte';
    import { base } from '$app/paths';  // Import the base path
    
    let simulations = [
        {
            id: "env-attribute",
            title: "Environmental Attribute Auction Simulator",
            description: "Explore auction mechanisms for environmental attributes like Sustainable Aviation Fuel certificates and analyze bidder strategies.",
            thumbnail: "/images/simulations/auction-simulation.jpg",
            categories: ["market", "auction", "sustainability"],
            interactive: true,
            // Use base path in links
            get link() { return `${base}/simulations/env-attribute`; }
        },
        {
            id: "saf-market",
            title: "Sustainable Aviation Fuel Market Dynamics",
            description: "Explore how different policy interventions affect SAF adoption rates and market growth.",
            thumbnail: "/images/simulations/saf-simulation.jpg",
            categories: ["market", "aviation", "policy"],
            interactive: true,
            get link() { return `${base}/simulations/saf-market`; }
        },
        {
            id: "carbon-pricing",
            title: "Carbon Pricing Impact Simulator",
            description: "See how different carbon pricing mechanisms affect emissions across industrial sectors.",
            thumbnail: "/images/simulations/carbon-simulation.jpg",
            categories: ["economics", "policy", "climate"],
            interactive: true,
            get link() { return `${base}/simulations/carbon-pricing`; }
        },
        {
            id: "emissions-trading",
            title: "Emissions Trading Simulation",
            description: "Visual representation of environmental attribute tracking in a book and claim system.",
            thumbnail: "/images/simulations/bookclaim-simulation.jpg",
            categories: ["market", "accounting", "visualization"],
            interactive: false,
            get link() { return `${base}/simulations/book-claim`; }
        },
        {
            id: "GreenBond",
            title: "Green Bond Impact Assessment Framework",
            description: "",
            thumbnail: "",
            categories: ["market", "trading", "policy"],
            interactive: true,
            get link() { return `${base}/simulations/emissions-trading`; }
        },
        {
            id: "InvestmentAnalysis",
            title: "Climate Tech Investment Analysis Tool",
            description: ".",
            thumbnail: "",
            categories: ["supply chain", "emissions"],
            interactive: false,
            get link() { return `${base}/simulations/supply-chain`; }
        }
    ];
    
    let categories = [...new Set(simulations.flatMap(sim => sim.categories))];
    categories.unshift("All");
    
    let selectedCategory = "All";
    
    $: filteredSimulations = selectedCategory === "All" ? 
        simulations : 
        simulations.filter(sim => sim.categories.includes(selectedCategory));
</script>

<svelte:head>
    <title>Simulations | Andrew Grabowski</title>
    <meta name="description" content="Interactive simulations and visualizations exploring market mechanisms, policy impacts, and climate solutions." />
</svelte:head>

<div class="simulations-container">
    <div class="page-header">
        <h1>Interactive Simulations</h1>
        <p class="intro">
            Explore complex systems through interactive models that demonstrate the dynamics 
            of markets, policies, and environmental interventions. These simulations provide 
            intuitive ways to understand the impacts of different decisions.
        </p>
    </div>
    

    
    <div class="simulations-grid">
        {#each filteredSimulations as sim}
            <a href={sim.link} class="simulation-card">
                <div class="simulation-thumbnail">
                    <img src={`${base}${sim.thumbnail || '/images/simulations/placeholder.jpg'}`} alt={sim.title}>
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
                    <div class="launch-button">
                        Launch Simulation
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
            </a>
        {/each}
    </div>
    
    {#if filteredSimulations.length === 0}
        <div class="no-simulations">
            <p>No simulations found in this category.</p>
            <button on:click={() => selectedCategory = "All"}>View all simulations</button>
        </div>
    {/if}
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
        text-decoration: none;
        color: inherit;
        display: block;
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
    
    .simulation-card:hover .launch-button {
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