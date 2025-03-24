<script> 
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import {
        computePosition,
        autoPlacement,
        offset,
        shift
    } from '@floating-ui/dom';
    import Bar from '$lib/Bar.svelte';

    let data = [];
    let commits = [];
    let fileStats = {};
    let yAxisGridlines;
    let commitTooltip;
    let tooltipPosition = {x: 0, y: 0};
    
    // Array for tracking clicked/selected commits
    let clickedCommits = [];

    // Hover state tracking
    let hoveredIndex = -1;
    
    $: hoveredCommit = commits[hoveredIndex] ?? hoveredCommit ?? {};
    
    // Define an accent color for selected items
    const accentColor = "#ff6b6b";

    // Handle dot interactions with advanced tooltip positioning
    async function dotInteraction(index, evt) {
        let hoveredDot = evt.target;
        
        if (evt.type === "mouseenter") {
            hoveredIndex = index;
            
            // Ensure the tooltip exists before positioning
            // Add a small delay to make sure the tooltip is rendered
            setTimeout(async () => {
                if (hoveredDot && commitTooltip && hoveredIndex === index) {
                    try {
                        const position = await computePosition(hoveredDot, commitTooltip, {
                            strategy: "fixed",
                            middleware: [
                                offset(10),
                                shift({ padding: 5 }),
                                autoPlacement({ padding: 5 })
                            ],
                        });
                        
                        // Only update if we're still hovering the same dot
                        if (hoveredIndex === index) {
                            tooltipPosition = position;
                            console.log("Successfully positioned tooltip:", position);
                        }
                    } catch (err) {
                        console.error("Error computing tooltip position:", err, { 
                            hoveredDot, 
                            commitTooltip, 
                            hoveredIndex 
                        });
                    }
                }
            }, 0);
        }
        else if (evt.type === "mouseleave") {
            hoveredIndex = -1;
        }
        else if (evt.type === "click") {
            let commit = commits[index];
            if (!clickedCommits.includes(commit)) {
                // Add the commit to the clickedCommits array
                clickedCommits = [...clickedCommits, commit];
            }
            else {
                // Remove the commit from the array
                clickedCommits = clickedCommits.filter(c => c !== commit);
            }
            console.log("Clicked commits:", clickedCommits.length);
        }
    }

    // Visualizing time and day
    let width = 1000, height = 600;
    let margin = {top: 10, right: 10, bottom: 30, left: 20};
    let xAxis, yAxis;

    let usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left
    };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;

    $: minDate = d3.min(commits.map(d => d.date));
    $: maxDate = d3.max(commits.map(d => d.date));
    $: maxDatePlusOne = new Date(maxDate);
    $: maxDatePlusOne?.setDate(maxDatePlusOne?.getDate() + 1);

    $: xScale = d3.scaleTime()
                .domain([minDate, maxDatePlusOne])
                .range([usableArea.left, usableArea.right])
                .nice();

    $: yScale = d3.scaleLinear()
                .domain([24, 0])
                .range([usableArea.bottom, usableArea.top]);

    $: {
        if (xAxis && yAxis && yAxisGridlines) {
            d3.select(xAxis).call(d3.axisBottom(xScale));
            d3.select(yAxis).call(d3.axisLeft(yScale)
                .tickFormat(d => String(d % 24).padStart(2, "0") + ":00"));
                
            // Add gridlines
            d3.select(yAxisGridlines).call(
                d3.axisLeft(yScale)
                .tickFormat("")
                .tickSize(-usableArea.width)
            );
        }
    }
    
    // Compute statistics for selected commits
    $: selectedStats = clickedCommits.length ? {
        count: clickedCommits.length,
        totalLines: d3.sum(clickedCommits, d => d.totalLines),
        authors: [...new Set(clickedCommits.map(d => d.author))].join(", "),
        timeRange: clickedCommits.length > 1 ? 
            `${d3.timeFormat("%b %d")(d3.min(clickedCommits, d => d.datetime))} - ${d3.timeFormat("%b %d")(d3.max(clickedCommits, d => d.datetime))}` : 
            d3.timeFormat("%b %d, %Y")(clickedCommits[0].datetime)
    } : null;

    // Add these new reactive statements for the bar chart
    $: allTypes = Array.from(new Set(data.map(d => d.type || "unknown")));
    
    $: selectedLines = (clickedCommits.length > 0 ? 
        clickedCommits.flatMap(c => c.lines || []) : 
        data);
    
    $: selectedCounts = d3.rollup(
        selectedLines,
        v => v.length,
        d => d.type || "unknown"
    );
    
    $: languageBreakdown = allTypes.map(type => [type, selectedCounts.get(type) || 0])
        .sort((a, b) => b[1] - a[1]); // Sort by count descending

    onMount(async () => {
        try {
            data = await d3.csv("/loc.csv", row => ({
                ...row,
                line: Number(row.line), 
                depth: Number(row.depth),
                length: Number(row.length),
                date: new Date(row.date + "T00:00" + row.timezone),
                datetime: new Date(row.datetime)
            }));

            commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
                let first = lines[0];
                let {author, date, time, timezone, datetime} = first;
                let ret = {
                    id: commit,
                    url: "https://github.com/vis-society/lab-7/commit/" + commit,
                    author, date, time, timezone, datetime,
                    hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
                    totalLines: lines.length
                };

                Object.defineProperty(ret, "lines", {
                    value: lines,
                    configurable: true,
                    writable: true,
                    enumerable: false,
                });

                return ret;
            });

            const fileGroups = d3.groups(data, d => d.file);
            fileStats = {
                count: fileGroups.length,
                maxLength: d3.max(fileGroups, group => group[1].length),
                longestFile: fileGroups.sort((a, b) => b[1].length - a[1].length)[0][0],
                avgLength: d3.mean(fileGroups, group => group[1].length),
                maxDepth: d3.max(data, d => d.depth),
                deepestLine: data.sort((a, b) => b.depth - a.depth)[0],
                avgDepth: d3.mean(data, d => d.depth),
                maxLineLength: d3.max(data, d => d.length),
                longestLine: data.sort((a, b) => b.length - a.length)[0]
            };
        } catch (error) {
            console.error("Error loading or processing data:", error);
        }
    });
</script>

<h1>META</h1>

<h2>Overall Stats</h2>
<dl class="stats">
    <dt>Total <abbr title="Lines of code">LOC</abbr></dt>
    <dd>{data.length}</dd>
    
    <dt>Commits</dt>
    <dd>{commits.length}</dd>
    
    <dt>Number of Files</dt>
    <dd>{fileStats.count || 'Loading...'}</dd>
</dl>

{#if selectedStats}
<h2>Selected Commits ({selectedStats.count})</h2>
<dl class="stats selected-stats">
    <dt>Total Lines Changed</dt>
    <dd>{selectedStats.totalLines}</dd>
    
    <dt>Authors</dt>
    <dd>{selectedStats.authors}</dd>
    
    <dt>Time Range</dt>
    <dd>{selectedStats.timeRange}</dd>
</dl>
{/if}

<svg viewBox="0 0 {width} {height}">
    <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />
    
    <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
    <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
    
    <g class="dots">
    {#each commits as commit, index}
        <circle
            cx={xScale(commit.datetime)}
            cy={yScale(commit.hourFrac)}
            r="5"
            fill="steelblue"
            class:selected={clickedCommits.includes(commit)}
            on:mouseenter={evt => dotInteraction(index, evt)}
            on:mouseleave={evt => dotInteraction(index, evt)}
            on:click={evt => dotInteraction(index, evt)}
        />
    {/each}
    </g>
</svg>

<!-- Add the Bar component after the scatter plot SVG -->
<h2>{clickedCommits.length ? 'Selected' : 'All'} Code by Language</h2>
<Bar data={languageBreakdown} width={width} />

<dl class="info tooltip" 
    bind:this={commitTooltip}
    style="left: {tooltipPosition.x}px; top: {tooltipPosition.y}px; opacity: {hoveredIndex >= 0 ? 1 : 0}; visibility: {hoveredIndex >= 0 ? 'visible' : 'hidden'};">
    {#if hoveredIndex >= 0}
        <dt>Commit</dt>
        <dd><a href="{hoveredCommit.url}" target="_blank">{hoveredCommit.id?.substring(0, 7)}</a></dd>
        
        <dt>Date</dt>
        <dd>{hoveredCommit.datetime?.toLocaleString("en", {dateStyle: "full"})}</dd>
        
        <dt>Time</dt>
        <dd>{hoveredCommit.datetime?.toLocaleString("en", {timeStyle: "short"})}</dd>
        
        <dt>Author</dt>
        <dd>{hoveredCommit.author}</dd>
        
        <dt>Lines Edited</dt>
        <dd>{hoveredCommit.totalLines}</dd>
        
        <dt>Status</dt>
        <dd>{clickedCommits.includes(hoveredCommit) ? "Selected" : "Not Selected"}</dd>
    {/if}
</dl>

<style>
    :root {
        --color-accent: #ff6b6b;
    }
    
    .gridlines {
        stroke-opacity: 0.2;
    }

    svg {
        overflow: visible;
    }
    
    /* Circle hover styles */
    circle {
        transition: 200ms;
        cursor: pointer;
        transform-origin: center;
        transform-box: fill-box;
    }
    
    circle:hover {
        transform: scale(1.5);
    }
    
    /* Selected circle style */
    circle.selected {
        fill: var(--color-accent);
        stroke: #333;
        stroke-width: 1px;
    }

    /* Info display styles */
    dl.info {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0.3em 1em;
        margin: 0;
        padding: 1em;
        background-color: rgba(255, 255, 255, 0.95);
        border: 1px solid rgba(200, 200, 200, 0.8);
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(4px);
    }
    
    .info dt {
        font-weight: bold;
        color: #666;
        grid-column: 1;
    }
    
    .info dd {
        grid-column: 2;
        margin: 0;
    }
    
    /* Tooltip styles */
    .tooltip {
        position: fixed;
        z-index: 100;
        max-width: 300px;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
        background-color: rgba(255, 255, 255, 0.95);
        border: 1px solid rgba(200, 200, 200, 0.8);
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .stats {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0.5em 1em;
        max-width: 40em;
        margin: 1em 0 2em;
    }
    
    .stats dt {
        font-weight: bold;
        grid-column: 1;
    }
    
    .stats dd {
        grid-column: 2;
        margin: 0;
    }
    
    .selected-stats {
        background-color: rgba(255, 107, 107, 0.1);
        padding: 1em;
        border-radius: 6px;
        border-left: 3px solid var(--color-accent);
    }
    
    h2 {
        margin-top: 2em;
        font-size: 1.5em;
        color: var(--accent-color, #0077ff);
    }
    
    abbr {
        text-decoration: underline dotted;
        cursor: help;
    }
</style>

