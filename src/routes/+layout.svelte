<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import LeafBackground from "$lib/LeafBackground.svelte";

    // Always set to dark mode
    const colorScheme = "dark";

    // Apply dark mode when component mounts
    onMount(() => {
        document.documentElement.style.setProperty("color-scheme", colorScheme);
        document.body.classList.add("dark-theme");
    });

    let pages = [
        {url: "/", title: "Home"},
        {url: "/projects", title: "Projects"},
        {url: "/blog", title: "Blog"},
        {url: "/simulations", title: "Simulations"},
        {url: "/contact", title: "Contact"},
        {url: "/CV", title: "CV"},
    ];
    
    // Adjust leaf intensity based on the current page
    $: leafIntensity = $page.route.id === "/contact" ? 1.5 : 
                       $page.route.id === "/" ? 1.2 : 
                       0.8;
</script>

<!-- Add leaf background to all pages -->
<LeafBackground intensity={leafIntensity} />

<div class="page-container">
    <nav>
        {#each pages as p}
        <a 
          href={p.url} 
          class:current={"." + $page.route.id === p.url}
          target={p.url.startsWith("http") ? "_blank" : null}
        >
          {p.title}
        </a>
        {/each}
    </nav>

    <main>
        <slot />
    </main>

    <footer>
        <p>© {new Date().getFullYear()} Andrew Grabowski - Sustainable economic solutions for a better future</p>
    </footer>
</div>

<style>
    .page-container {
        max-width: 130ch; /* Increased from 100ch to 120ch */
        margin-inline: auto;
        padding: 1rem;
        position: relative;
        z-index: 1;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        /* Make borders visible for leaf animation */
        border-left: 1px solid rgba(255, 255, 255, 0.1);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        background-color: rgba(18, 18, 18, 0.9);
    }

    /* Navigation styles */
    nav {
        display: flex;
        gap: 1em;
        margin-bottom: 2em;
        border-bottom: 1px solid var(--border-color);
    }

    nav a {
        color: var(--text-primary);
        text-decoration: none;
        transition: color 0.3s ease, border-color 0.3s ease;
        padding: 0.5em 1em;
    }

    nav a:hover {
        color: var(--color-accent);
    }

    nav a.current {
        font-weight: bold;
        color: var(--color-accent-light);
        border-bottom: 2px solid var(--color-accent);
    }
    
    main {
        flex: 1;
    }
    
    footer {
        margin-top: 4rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
        font-size: 0.9rem;
        color: var(--text-muted);
        text-align: center;
    }
</style>

