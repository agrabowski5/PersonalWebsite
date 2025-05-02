<script>
    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";
    import Pie from "$lib/Pie.svelte";
    import { onMount } from "svelte";
    
    let query = "";
    let selectedYearIndex = -1;
    let selectedYear = null;
    let pieData = [];
    
    // Generate data for the pie chart - count projects by year
    onMount(() => {
        try {
            // Make sure we have projects before trying to calculate years
            if (!projects || !projects.length) {
                console.error("No projects data available");
                return;
            }
            
            // Extract unique years and count projects
            const years = [...new Set(projects.filter(p => p.year).map(p => p.year))];
            
            if (!years.length) {
                console.warn("No years found in project data");
                return;
            }
            
            pieData = years.map(year => {
                return {
                    label: year.toString(),
                    value: projects.filter(p => p.year === year).length,
                    color: `hsl(${120 + (year-2020)*30}, 70%, 60%)`
                };
            });
            
            // Sort by year (descending)
            pieData.sort((a, b) => parseInt(b.label) - parseInt(a.label));
        } catch (error) {
            console.error("Error generating pie data:", error);
        }
    });
    
    // Update selectedYear when selectedYearIndex changes
    $: {
        if (selectedYearIndex >= 0 && pieData && pieData[selectedYearIndex]) {
            selectedYear = parseInt(pieData[selectedYearIndex].label);
        } else {
            selectedYear = null;
        }
    }
    
    // Filter projects by search query
    $: filteredProjects = projects.filter(project => {
        const searchString = `${project.title} ${project.description} ${project.tags ? project.tags.join(' ') : ''}`.toLowerCase();
        return searchString.includes(query.toLowerCase());
    });
    
    // Filter projects by selected year
    $: filteredByYear = filteredProjects.filter(project => {
        if (selectedYear && project.year) {
            return project.year === selectedYear;
        }
        return true;
    });
</script>

<svelte:head>
    <title>Projects | Andrew Grabowski</title>
    <meta name="description" content="Explore Andrew Grabowski's projects in sustainable market design, climate economics, and systems engineering." />
</svelte:head>

<div class="projects-container">
    <div class="page-header">
        <h1>Projects</h1>
        <p class="intro">
            Explore my work in sustainable aviation fuels, market design for climate solutions, and systems engineering. 
            Each project represents my commitment to developing innovative approaches to environmental challenges.
        </p>
    </div>
    
    <!--<div class="filters">
        <div class="search-box">
            <input 
                type="search" 
                bind:value={query}
                aria-label="Search projects" 
                placeholder="🔍 Search projects…" 
            />
        </div>
        
        <div class="year-filter">
            <h3>Filter by Year</h3>
            {#if pieData && pieData.length > 0}
                <Pie data={pieData} bind:selectedIndex={selectedYearIndex} />
                
                {#if selectedYear}
                    <button class="clear-filter" on:click={() => selectedYearIndex = -1}>
                        Clear filter ({filteredByYear.length}/{filteredProjects.length} projects)
                    </button>
                {/if}
            {:else}
                <p>Loading chart data...</p>
            {/if}
        </div>
    </div>-->

    {#if filteredByYear.length === 0}
        <div class="no-results">
            <p>No projects match your search criteria.</p>
            <button class="clear-filter" on:click={() => { query = ""; selectedYearIndex = -1; }}>
                Clear all filters
            </button>
        </div>
    {:else}
        <div class="projects-grid">
            {#each filteredByYear as p}
                <Project data={p} />
            {/each}
        </div>
    {/if}
</div>

<!-- This would be saved as c:\Users\agrab\OneDrive - Massachusetts Institute of Technology\Personal\Personal_Website\static\images\aviation-noise.png -->
<!-- You should replace this with an actual screenshot or image from your project -->

<style>
    .projects-container {
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
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .search-box {
        max-width: 100%;
    }
    
    input[type="search"] {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        border-radius: 4px;
        border: 1px solid var(--border-color);
        background-color: var(--bg-secondary);
        color: var(--text-primary);
    }
    
    input[type="search"]:focus {
        border-color: var(--color-accent);
        outline: none;
        box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.2);
    }
    
    .year-filter {
        background-color: var(--bg-secondary);
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .year-filter h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: var(--color-accent-light);
    }
    
    .clear-filter {
        background: none;
        border: 1px solid var(--color-accent);
        color: var(--color-accent);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 1rem;
        transition: all 0.2s ease;
    }
    
    .clear-filter:hover {
        background-color: rgba(46, 204, 113, 0.1);
    }
    
    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .no-results {
        text-align: center;
        padding: 3rem 0;
        background-color: var(--bg-secondary);
        border-radius: 8px;
    }
    
    @media (max-width: 768px) {
        .filters {
            grid-template-columns: 1fr;
        }
        
        .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }
</style>

