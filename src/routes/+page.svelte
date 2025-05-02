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

<div class="home-container">
  <section class="hero">
    <div class="hero-content">
      <div class="profile-image">
        <img src="images/GrabowskiMITPhoto.jpg" alt="Andrew Grabowski" />
      </div>
      <div class="intro-text">
        <h1>Andrew Grabowski</h1>
        <h2 class="subtitle">Climate Tech Researcher</h2>
        <p>
          I'm passionate about developing innovative market-based solutions for climate change mitigation.
          As a dual-degree candidate at MIT studying Engineering Management and Computer Science, 
          I focus on combining financial mechanisms, systems design, and computational methods
          to accelerate the transition to sustainable economies.
        </p>
        <div class="social-links">
          <a href="mailto:agrabows@mit.edu" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/andrew-grabowski/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://github.com/agrabowski5" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="about">
    <div class="about-content">
      <div class="expertise">
        <h2>Areas of Focus</h2>
        <ul class="expertise-list">
          <li>Sustainable Aviation Fuel Deployment</li>
          <li>Book and Claim Systems</li>
          <li>Mechanism Design for Sustainable Markets</li>
          <li>Systems Engineering</li>
          <li>Climate Policy & Economics</li>
        </ul>
      </div>
      <div class="current-work">
        <h2>Current Projects</h2>
        <p>
          At MIT's Laboratory for Aviation and the Environment, I'm researching financial instruments 
          to enable market-based demand for sustainable goods and defining novel game-theoretic approaches 
          to collaborative purchasing of environmental attributes.
        </p>
      </div>
    </div>
  </section>

  <section class="featured-projects">
    <h2>Latest Projects</h2>
    <div class="projects">
      {#each projects.slice(0, 3) as p}
        <Project data={p} />
      {/each}
    </div>
    <div class="view-more">
      <a href="/projects" class="button">View All Projects</a>
    </div>
  </section>
</div>

<style>
  .home-container {
    max-width: 100%;
    margin: 0 auto;
  }

  /* Hero section with photo and intro */
  .hero {
    margin-bottom: 2rem;
  }

  .hero-content {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
  }

  .profile-image {
    flex-shrink: 0;
  }

  .profile-image img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--color-accent);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  .intro-text {
    flex: 1;
  }

  .intro-text h1 {
    font-size: 3.5rem;
    margin: 0 0 0.5rem 0;
    line-height: 1.1;
    color: var(--text-primary);
  }

  .subtitle {
    font-size: 1.5rem;
    margin: 0 0 1.5rem 0;
    color: var(--color-accent);
    font-weight: normal;
  }

  .intro-text p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    max-width: 800px;
  }

  /* Social links */
  .social-links {
    display: flex;
    gap: 1rem;
  }

  .social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: var(--bg-secondary);
    color: var(--color-accent);
    transition: all 0.2s ease;
  }

  .social-links a:hover {
    background-color: var(--color-accent);
    color: var(--bg-secondary);
    transform: translateY(-3px);
  }

  /* About section */
  .about {
    margin-bottom: 3rem;
  }

  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .expertise h2, .current-work h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
    border-bottom: 2px solid var(--color-accent);
    padding-bottom: 0.5rem;
    display: inline-block;
  }

  .expertise-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0;
  }

  .expertise-list li {
    background-color: rgba(46, 204, 113, 0.1);
    color: var(--color-accent-light);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    list-style: none;
    display: inline-block;
  }

  .current-work p {
    line-height: 1.6;
  }

  /* Featured projects section */
  .featured-projects {
    margin-top: 2rem;
  }

  .featured-projects h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .view-more {
    margin-top: 2rem;
    text-align: center;
  }

  .button {
    display: inline-block;
    background-color: var(--color-accent);
    color: #000;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.2s;
  }

  .button:hover {
    background-color: var(--color-accent-dark);
    transform: translateY(-2px);
  }

  /* Responsive design */
  @media (max-width: 900px) {
    .hero-content {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
    }

    .social-links {
      justify-content: center;
    }

    .about-content {
      grid-template-columns: 1fr;
    }

    .intro-text h1 {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }
  }
</style>