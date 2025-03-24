<script>
    import * as d3 from 'd3';
    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";
    import Pie from '$lib/Pie.svelte';

    // Search Bar 
    let query = "";

    // First, filter projects by search query
    $: filteredProjects = projects.filter(project => {
        if (!query) return true;
        let values = Object.values(project).join("\n").toLowerCase();
        return values.includes(query.toLowerCase());
    });

    // Define selectedYearIndex variable for the pie chart
    let selectedYearIndex = -1;

    // Calculate pie data from filtered projects
    let pieData;
    $: {
        // Process data for pie chart
        let rolledData = d3.rollups(filteredProjects, v => v.length, d => d.year);
        pieData = rolledData.map(([year, count]) => {
            return { value: count, label: year };
        });
    }

    // Now extract the selected year based on the selected index
    $: selectedYear = selectedYearIndex >= 0 && pieData.length > selectedYearIndex 
        ? pieData[selectedYearIndex].label 
        : null;

    // Finally, filter projects by both search and selected year
    $: filteredByYear = filteredProjects.filter(project => {
        if (selectedYear) {
            return project.year === selectedYear;
        }
        return true;
    });

    // Debug:
    $: console.log({
        selectedYearIndex,
        selectedYear,
        pieDataLength: pieData?.length,
        filteredProjectsCount: filteredProjects.length,
        filteredByYearCount: filteredByYear.length
    });
</script>

<h1>{projects.length} Projects</h1>

<input 
    type="search" 
    bind:value={query}
    aria-label="Search projects" 
    placeholder="🔍 Search projects…" 
/>

<Pie data={pieData} bind:selectedIndex={selectedYearIndex} />

<div class="projects">
    {#each filteredByYear as p}
        <Project data={p} />
    {/each}
</div>

<style>
    .projects {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1em;
        margin-top: 2em;
    }

    input[type="search"] {
        display: block;
        width: 100%;
        max-width: 40em;
        margin: 1em 0;
        padding: 0.5em;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1em;
    }
</style>

