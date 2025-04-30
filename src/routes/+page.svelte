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

  
  <!-- Remove the duplicate GitHub data block -->
  
  <style>
 
  </style>