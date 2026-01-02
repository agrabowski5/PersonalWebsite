<script>
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    
    let posts = [
        {
            id: 'understanding-steel-industry-green-steel',
            title: "Understanding the Steel Industry and the Path to Green Steel",
            excerpt: "A deep dive into the steel industry, its massive carbon footprint, and emerging technologies like Molten Oxide Electrolysis that promise a greener future for this critical industry.",
            date: "2026-01-01",
            tags: ["steel", "green technology", "climate", "industrial decarbonization"],
            image: "/images/blog/green-steel.jpg",
            readTime: "8 min read"
        }
    ];
    
    $: filteredPosts = posts;
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
        <div class="blog-main">
            <div class="posts-grid">
                {#each filteredPosts as post}
                    <article class="post-card">
                        <div class="post-image">
                            <img src={`${base}${post.image || '/images/blog/placeholder.jpg'}`} alt={post.title}>
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
                    <p>No posts available at this time.</p>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .blog-container {
        max-width: 100%;
        /* Add this to ensure consistent width with other pages */
        width: 100%;
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
        display: block;
        /* Add this to ensure content has a max width */
        max-width: 100%;
    }
    
    .blog-main {
        /* Add this to ensure consistent width */
        width: 100%;
    }
    
    .posts-grid {
        display: grid;
        /* Adjusted to match the common width pattern in your other pages */
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
    
    @media (max-width: 900px) {
        .posts-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }
</style>