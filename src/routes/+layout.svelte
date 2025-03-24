<label class="color-scheme">
    Theme:
    <select bind:value={colorScheme}>
        <option value="light dark">Auto</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
    </select>

    
</label>

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
     {url: "/contact", title: "Contact"},
     {url: "/CV", title: "CV"},
     {url: "/meta", title: "Meta"},
     {url: "https://github.com/agrabowski5", title: "GitHub"},
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

    label {
        display: block;
        margin-block: 1em 0.5em;
        font-weight: bold;
    }
    .color-scheme {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 100;
        background-color: var(--background);
        padding: 0.5rem;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
</style>

