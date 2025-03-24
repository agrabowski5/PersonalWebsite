<script>
    import * as d3 from 'd3';

    export let selectedIndex = -1;
    export let data = [];

    let colors = d3.scaleOrdinal(d3.schemeTableau10);
    let sliceGenerator = d3.pie().value(d => d.value);
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    let arcData;
    let arcs;

    $: {
        arcData = sliceGenerator(data);
        arcs = arcData.map(d => arcGenerator(d));
    }
</script>

<div class="container">
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, index}
            <path 
                d={arc} 
                fill={colors(index)} 
                class:selected={selectedIndex === index}
                on:click={e => selectedIndex = selectedIndex === index ? -1 : index}
            />
        {/each}
    </svg>

    <ul class="legend">
        {#each data as d, index}
            <li 
                class:selected={selectedIndex === index}
                on:click={e => selectedIndex = selectedIndex === index ? -1 : index}
                style="--color: {colors(index)}"
            >
                <span class="swatch"></span>
                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>

<style>
    /* Container to hold chart and legend side by side */
    .container {
        display: flex;
        align-items: center;
        gap: 2em;
        flex-wrap: wrap;
    }
    
    svg {
        max-width: 20em;
        margin-block: 2em;
        /* Do not clip shapes outside the viewBox */
        overflow: visible;
    }

    /* When a path is selected, make all non-selected paths 50% opacity */
    svg:has(.selected) path:not(.selected) {
        opacity: 50%;
    }

    .selected {
        --color: oklch(60% 45% 0) !important;
    }

    .selected:is(path) {
        fill: var(--color) !important;
    }
    
    .selected:is(li) {
        color: var(--color);
    }

    ul:has(.selected) li:not(.selected) {
        color: gray;
    }

    path {
        transition: 300ms;
        cursor: pointer;
    }

    path:hover {
        opacity: 100% !important;
    }

    /* Legend styling */
    .legend {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
        gap: 1em;
        padding: 1em;
        margin-top: 1.5em;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #f9f9f9;
    }

    .legend li {
        display: flex;
        align-items: center;
        gap: 0.5em;
        list-style: none;
        cursor: pointer;
        padding: 0.3em;
        border-radius: 0.2em;
        transition: background-color 200ms;
    }

    .legend li:hover {
        background-color: rgba(0,0,0,0.05);
    }

    .swatch {
        display: inline-block;
        width: 1em;
        height: 1em;
        border-radius: 3px;
        background-color: var(--color);
    }

    /* Style for the numerical value */
    em {
        color: #666;
        font-style: italic;
        margin-left: 0.3em;
    }
</style>