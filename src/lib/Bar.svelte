<script>
  import * as d3 from 'd3';
  
  // Props
  export let data = [];
  export let width = 800;
  export let height = 300;
  export let margin = { top: 20, right: 20, bottom: 30, left: 60 };

  // Derived values
  $: innerWidth = width - margin.left - margin.right;
  $: innerHeight = height - margin.top - margin.bottom;
  
  // Scales and color scheme
  $: xScale = d3.scaleBand()
    .domain(data.map(d => d[0]))
    .range([0, innerWidth])
    .padding(0.2);
    
  $: yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[1]) || 0])
    .range([innerHeight, 0])
    .nice();
    
  $: colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d[0]))
    .range(d3.schemeCategory10);
    
  // Format functions
  const formatCount = d3.format(",d");
</script>

<div class="bar-chart-container">
  <svg {width} {height}>
    <g transform="translate({margin.left}, {margin.top})">
      <!-- Y-axis -->
      <g class="y-axis">
        {#each yScale.ticks(5) as tick}
          <line
            x1="0"
            y1={yScale(tick)}
            x2={innerWidth}
            y2={yScale(tick)}
            stroke="#ddd"
            stroke-dasharray="3,3"
          />
          <text
            x="-5"
            y={yScale(tick)}
            text-anchor="end"
            dominant-baseline="middle"
            font-size="12px"
          >{formatCount(tick)}</text>
        {/each}
        <text
          transform="rotate(-90)"
          x={-innerHeight / 2}
          y="-40"
          text-anchor="middle"
          font-size="14px"
          font-weight="bold"
        >Lines of Code</text>
      </g>
      
      <!-- X-axis -->
      <g class="x-axis" transform="translate(0, {innerHeight})">
        {#each data as [lang], i}
          <text
            x={xScale(lang) + xScale.bandwidth() / 2}
            y="20"
            text-anchor="middle"
            font-size="12px"
          >{lang}</text>
        {/each}
        <line x1="0" y1="0" x2={innerWidth} y2="0" stroke="#999" />
      </g>
      
      <!-- Bars -->
      {#each data as [lang, count], i}
        <rect
          x={xScale(lang)}
          y={yScale(count)}
          width={xScale.bandwidth()}
          height={innerHeight - yScale(count)}
          fill={colorScale(lang)}
          opacity="0.8"
        >
          <title>{lang}: {formatCount(count)} lines</title>
        </rect>
        
        <!-- Count on top of bar if it's large enough -->
        {#if count > 0 && (innerHeight - yScale(count)) > 25}
          <text
            x={xScale(lang) + xScale.bandwidth() / 2}
            y={yScale(count) + 15}
            text-anchor="middle"
            fill="white"
            font-size="12px"
            font-weight="bold"
          >{formatCount(count)}</text>
        {/if}
      {/each}
    </g>
  </svg>
  
  <!-- Legend -->
  <div class="legend">
    {#each data as [lang], i}
      <div class="legend-item">
        <span class="color-box" style="background-color: {colorScale(lang)};"></span>
        <span class="lang-name">{lang}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .bar-chart-container {
    margin: 20px 0;
  }
  
  .legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-top: 10px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .color-box {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }
  
  .lang-name {
    font-size: 14px;
  }
</style>