<script>
  import projects from "$lib/projects.json";
  import Project from "$lib/Project.svelte";

  import { onMount } from "svelte";

  let githubData = null;
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch("https://api.github.com/users/agrabowski5");
      githubData = await response.json();
    } catch (err) {
      error = err;
    }
    loading = false;
  });


</script>

<h1>Andrew Grabowski</h1>
    
<img src="images/GrabowskiMITPhoto.jpg" alt="Andrew Grabowski" width="200" height="200">
<p>Hi, I'm Andrew. I'm a software engineer and developing a website.</p>

<h2>Latest Projects</h2>
<div class="projects">
    {#each projects.slice(0, 3) as p}
    <Project data={p} />
    {/each}
</div>

<section>
    <h2>GITHUB</h2>
    {#await fetch("https://api.github.com/users/agrabowski5")}
      <p>Loading...</p>
    {:then response}
      {#await response.json()}
        <p>Decoding...</p>
      {:then data}
        <section>
          <h2>My GitHub Stats</h2>
          <dl class="github-stats">
            <dt>Followers:</dt>
            <dd>{data.followers}</dd>
            <dt>Following:</dt>
            <dd>{data.following}</dd>
            <dt>Public Repositories:</dt>
            <dd>{data.public_repos}</dd>
          </dl>
        </section>
      {:catch error}
        <p class="error">Something went wrong: {error.message}</p>
      {/await}
    {:catch error}
      <p class="error">Something went wrong: {error.message}</p>
    {/await}
  </section>
  
  <!-- Remove the duplicate GitHub data block -->
  
  <style>
    .github-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin: 1rem 0;
    }
    
    .github-stats dt {
      grid-row: 1;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    
    .github-stats dd {
      grid-row: 2;
      margin: 0;
      font-size: 1.2rem;
    }
  </style>