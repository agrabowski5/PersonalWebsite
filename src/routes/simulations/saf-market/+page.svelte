<script>
    // SAF Market Dynamics Simulator
</script>

<svelte:head>
    <title>SAF Market Dynamics Simulator | Andrew Grabowski</title>
    <meta name="description" content="Explore how different policy interventions affect Sustainable Aviation Fuel adoption rates and market growth." />
</svelte:head>

<div class="simulator-container">
    <div class="page-header">
        <h1>Sustainable Aviation Fuel Market Dynamics</h1>
        <p class="intro">
            This simulation is under development. Check back soon to explore how different policy 
            interventions affect SAF adoption rates and market growth.
        </p>
    </div>
    
    <div class="coming-soon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2>Coming Soon</h2>
        <p>This simulation is currently being developed and will be available in the near future.</p>
        <a href="/simulations" class="back-button">Back to Simulations</a>
    </div>
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
    
    .coming-soon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;
        background-color: var(--bg-secondary);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .coming-soon svg {
        color: var(--color-accent);
        margin-bottom: 1.5rem;
    }
    
    .coming-soon h2 {
        margin-bottom: 1rem;
        font-size: 2rem;
    }
    
    .coming-soon p {
        margin-bottom: 2rem;
        max-width: 500px;
    }
    
    .back-button {
        background-color: var(--color-accent);
        color: black;
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        font-weight: bold;
        transition: background-color 0.2s;
    }
    
    .back-button:hover {
        background-color: var(--color-accent-dark);
    }
</style>