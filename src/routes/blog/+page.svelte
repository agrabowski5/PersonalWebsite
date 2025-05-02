<script>
    import { onMount } from 'svelte';
    
    let posts = [
        {
            id: 1,
            title: "The Future of Sustainable Aviation Fuel Markets",
            excerpt: "Exploring innovative financial mechanisms to scale SAF adoption and overcome market barriers.",
            date: "2025-04-15",
            tags: ["aviation", "sustainability", "market design"],
            image: "/images/blog/saf-market.jpg",
            readTime: "7 min read"
        },
        {
            id: 2,
            title: "Book and Claim Systems: Tokenizing Environmental Attributes",
            excerpt: "How digital accounting systems can revolutionize the way we track and trade sustainability benefits.",
            date: "2025-03-22",
            tags: ["book-and-claim", "environmental markets", "blockchain"],
            image: "/images/blog/book-claim.jpg",
            readTime: "5 min read"
        },
        {
            id: 3,
            title: "Game Theory in Collaborative Climate Action",
            excerpt: "Analyzing the strategic dynamics of multi-stakeholder climate initiatives and how to optimize outcomes.",
            date: "2025-02-10",
            tags: ["game theory", "climate policy", "collaboration"],
            image: "/images/blog/game-theory.jpg",
            readTime: "9 min read"
        },
        {
            id: 4,
            title: "Systems Engineering Approaches to Decarbonization",
            excerpt: "Applying systems thinking to complex climate challenges for more effective solutions.",
            date: "2025-01-05",
            tags: ["systems engineering", "decarbonization", "case study"],
            image: "/images/blog/systems-engineering.jpg",
            readTime: "6 min read"
        }
    ];
    
    let categories = ["All", "Market Design", "Technology", "Policy", "Research"];
    let selectedCategory = "All";
    
    function filterByCategory(category) {
        selectedCategory = category;
    }
    
    $: filteredPosts = selectedCategory === "All" ? 
        posts : 
        posts.filter(post => post.tags.some(tag => 
            tag.toLowerCase().includes(selectedCategory.toLowerCase())
        ));
</script>

<svelte:head>
    <title>Blog | Andrew Grabowski</title>
    <meta name="description" content="Andrew Grabowski's insights on sustainable aviation, market design for climate solutions, and systems engineering approaches." />
</svelte:head>

<div class="blog-container">
    <div class="page-header">
        <h1>Blog</h1>
        <p class="intro">
            Thoughts, research findings, and insights on sustainable markets, climate technology, 
            and the intersection of engineering and economics.
        </p>
    </div>
    
    <div class="blog-layout">
        <div class="blog-sidebar">
            <div class="categories">
                <h2>Categories</h2>
                <ul class="category-list">
                    {#each categories as category}
                        <li>
                            <button 
                                class:active={selectedCategory === category}
                                on:click={() => filterByCategory(category)}
                            >
                                {category}
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
            
            <div class="newsletter">
                <h2>Newsletter</h2>
                <p>Subscribe to get my latest posts and research updates.</p>
                <form>
                    <input type="email" placeholder="Your email address" required>
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>
        
        <div class="blog-main">
            <div class="posts-grid">
                {#each filteredPosts as post}
                    <article class="post-card">
                        <div class="post-image">
                            <img src={post.image || "/images/blog/placeholder.jpg"} alt={post.title}>
                            <div class="post-meta">
                                <span class="post-date">{new Date(post.date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</span>
                                <span class="read-time">{post.readTime}</span>
                            </div>
                        </div>
                        <div class="post-content">
                            <h2>{post.title}</h2>
                            <p>{post.excerpt}</p>
                            <div class="post-tags">
                                {#each post.tags as tag}
                                    <span class="tag">{tag}</span>
                                {/each}
                            </div>
                            <a href={`/blog/${post.id}`} class="read-more">Read more</a>
                        </div>
                    </article>
                {/each}
            </div>
            
            {#if filteredPosts.length === 0}
                <div class="no-posts">
                    <p>No posts found in this category.</p>
                    <button on:click={() => selectedCategory = "All"}>View all posts</button>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .blog-container {
        max-width: 100%;
    }
    
    .page-header {
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 1rem;
    }
    
    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .intro {
        font-size: 1.1rem;
        line-height: 1.6;
        max-width: 800px;
    }
    
    .blog-layout {
        display: grid;
        grid-template-columns: 1fr 3fr;
        gap: 2rem;
    }
    
    /* Sidebar */
    .blog-sidebar {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .categories h2, .newsletter h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .category-list {
        list-style: none;
        padding: 0;
    }
    
    .category-list li {
        margin-bottom: 0.5rem;
    }
    
    .category-list button {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 0.5rem 0;
        text-align: left;
        width: 100%;
        transition: color 0.2s;
    }
    
    .category-list button:hover {
        color: var(--color-accent);
    }
    
    .category-list button.active {
        color: var(--color-accent);
        font-weight: bold;
    }
    
    .newsletter p {
        margin-bottom: 1rem;
    }
    
    .newsletter form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .newsletter input {
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background-color: var(--bg-secondary);
        color: var(--text-primary);
    }
    
    .newsletter button {
        padding: 0.75rem;
        background-color: var(--color-accent);
        color: black;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s;
    }
    
    .newsletter button:hover {
        background-color: var(--color-accent-dark);
    }
    
    /* Blog posts grid */
    .posts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }
    
    .post-card {
        background-color: var(--bg-secondary);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .post-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    
    .post-image {
        position: relative;
        height: 200px;
        overflow: hidden;
    }
    
    .post-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .post-meta {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
        color: white;
        font-size: 0.8rem;
    }
    
    .post-content {
        padding: 1.5rem;
    }
    
    .post-content h2 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        font-size: 1.4rem;
        line-height: 1.3;
    }
    
    .post-content p {
        margin-bottom: 1rem;
        color: var(--text-secondary);
    }
    
    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .tag {
        background-color: rgba(46, 204, 113, 0.1);
        color: var(--color-accent-light);
        padding: 0.25rem 0.5rem;
        border-radius: 20px;
        font-size: 0.8rem;
    }
    
    .read-more {
        display: inline-block;
        color: var(--color-accent);
        text-decoration: none;
        font-weight: bold;
        transition: color 0.2s;
    }
    
    .read-more:hover {
        color: var(--color-accent-light);
    }
    
    .no-posts {
        text-align: center;
        padding: 3rem 0;
        background-color: var(--bg-secondary);
        border-radius: 8px;
    }
    
    .no-posts button {
        background: none;
        border: 1px solid var(--color-accent);
        color: var(--color-accent);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 1rem;
    }
    
    .no-posts button:hover {
        background-color: rgba(46, 204, 113, 0.1);
    }
    
    @media (max-width: 900px) {
        .blog-layout {
            grid-template-columns: 1fr;
        }
        
        .blog-sidebar {
            order: 2;
        }
        
        .blog-main {
            order: 1;
        }
        
        .posts-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }
</style>