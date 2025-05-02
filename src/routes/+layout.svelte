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



<script> 
    import { page } from "$app/stores";

    let localStorage = globalThis.localStorage ?? {};
    let colorScheme = localStorage.colorScheme ?? "light dark";

    let root = globalThis?.document?.documentElement;
    $: root?.style.setProperty("color-scheme", colorScheme);

    $: localStorage.colorScheme = colorScheme;

    let pages = [
     {url: "/", title: "Home"},
     {url: "/projects", title: "Projects"},
     {url: "/blog", title: "Blog"},
     {url: "/simulations", title: "Simulations"},
     {url: "/contact", title: "Contact"},
     {url: "/CV", title: "CV"},
     /*{url: "/meta", title: "Meta"},*/
     /*{url: "https://github.com/agrabowski5", title: "GitHub"},*/
 ];
</script>


<slot />

<style>
    /* Navigation styles */
    nav {
        display: flex;
        gap: 1em;
        margin-bottom: 2em;
    }

    nav a {
        color: var(--text);
        text-decoration: none;
    }

    nav a:hover {
        text-decoration: underline;
    }

    nav a.current {
        font-weight: bold;
        color: var(--accent-color);
    }

</style>

