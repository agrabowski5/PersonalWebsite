<script>
    import { onMount } from 'svelte';
    
    // Blog post metadata
    let posts = [
        {
            slug: 'introduction-to-auction-theory',
            title: 'Introduction to Auction Theory',
            date: '2025-05-01',
            excerpt: 'An overview of auction theory fundamentals and why they matter in modern economics.',
            tags: ['economics', 'auction theory', 'game theory'],
            image: '/images/blog/auction-theory.jpg'
        },
        {
            slug: 'mechanism-design-primer',
            title: 'A Primer on Mechanism Design',
            date: '2025-04-15',
            excerpt: 'Understanding how incentives shape behavior and outcomes in economic systems.',
            tags: ['economics', 'mechanism design', 'incentives'],
            image: '/images/blog/mechanism-design.jpg'
        },
        {
            slug: 'simulation-approaches',
            title: 'Approaches to Economic Simulation',
            date: '2025-03-22',
            excerpt: 'Comparing different methodologies for simulating economic systems and auctions.',
            tags: ['simulation', 'economics', 'modeling'],
            image: '/images/blog/simulation.jpg'
        }
        // You can add more sample posts here
    ];
    
    // Filter and sort functionality
    let searchQuery = '';
    let selectedTag = '';
    let tags = [];
    
    // Extract all unique tags from posts
    $: {
        const tagSet = new Set();
        posts.forEach(post => {
            post.tags.forEach(tag => tagSet.add(tag));
        });
        tags = Array.from(tagSet).sort();
    }
    
    // Filtered posts based on search query and selected tag
    $: filteredPosts = posts.filter(post => {
        // Search filter
        const matchesSearch = searchQuery === '' || 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            
        // Tag filter
        const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
        
        return matchesSearch && matchesTag;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
    
    // Format date for display
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
</script>

<svelte:head>
    <title>Blog | Alex Grabowski</title>
    <meta name="description" content="Thoughts and insights on economics, auction theory, mechanism design, and more." />
</svelte:head>

<div class="content-section">
    <h1>Blog</h1>
    
    <p class="intro">
        Exploring ideas in economics, auction theory, mechanism design, and more. Here you'll find my thoughts,
        research notes, and practical insights on topics I'm passionate about.
    </p>
    
    <div class="blog-controls">
        <div class="search-container">
            <input 
                type="text" 
                placeholder="Search posts..." 
                bind:value={searchQuery}
                aria-label="Search blog posts"
            >
        </div>
        
        <div class="tags-filter">
            <label for="tag-filter">Filter by tag:</label>
            <select id="tag-filter" bind:value={selectedTag}>
                <option value="">All tags</option>
                {#each tags as tag}
                    <option value={tag}>{tag}</option>
                {/each}
            </select>
        </div>
    </div>
    
    {#if filteredPosts.length === 0}
        <div class="no-results">
            <p>No posts found matching your criteria. Try adjusting your search or filters.</p>
        </div>
    {:else}
        <div class="blog-grid">
            {#each filteredPosts as post}
                <article class="blog-card">
                    <a href={`/blog/${post.slug}`} class="blog-link">
                        {#if post.image}
                            <div class="blog-image" style="background-image: url({post.image})"></div>
                        {:else}
                            <div class="blog-image blog-image-placeholder"></div>
                        {/if}
                        
                        <div class="blog-content">
                            <h2>{post.title}</h2>
                            <div class="blog-meta">
                                <time datetime={post.date}>{formatDate(post.date)}</time>
                            </div>
                            <p class="blog-excerpt">{post.excerpt}</p>
                            
                            <div class="blog-tags">
                                {#each post.tags as tag}
                                    <span class="tag" on:click|preventDefault={() => selectedTag = tag}>
                                        #{tag}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    </a>
                </article>
            {/each}
        </div>
    {/if}
</div>

<style>
    .intro {
        max-width: 800px;
        margin-bottom: 2rem;
        font-size: 1.1rem;
        line-height: 1.5;
    }
    
    .blog-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: var(--background-alt, #f5f5f5);
        border-radius: 8px;
    }
    
    .search-container {
        flex: 1;
        min-width: 250px;
    }
    
    .search-container input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--border-color, #ccc);
        border-radius: 4px;
        font-size: 1rem;
    }
    
    .tags-filter {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .tags-filter select {
        padding: 0.5rem;
        border: 1px solid var(--border-color, #ccc);
        border-radius: 4px;
        font-size: 1rem;
        background-color: var(--background, white);
    }
    
    .blog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }
    
    .blog-card {
        border: 1px solid var(--border-color, #ccc);
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .blog-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    
    .blog-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }
    
    .blog-image {
        height: 180px;
        background-size: cover;
        background-position: center;
        background-color: var(--background-alt, #f5f5f5);
    }
    
    .blog-image-placeholder {
        background-image: linear-gradient(135deg, var(--color-accent, #0066ff) 0%, var(--color-accent-light, #66a3ff) 100%);
    }
    
    .blog-content {
        padding: 1.5rem;
    }
    
    .blog-content h2 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.4rem;
        line-height: 1.3;
    }
    
    .blog-meta {
        color: var(--text-muted, #666);
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }
    
    .blog-excerpt {
        margin-bottom: 1rem;
        line-height: 1.5;
    }
    
    .blog-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .tag {
        background-color: var(--tag-bg, #eee);
        color: var(--tag-text, #555);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    
    .tag:hover {
        background-color: var(--tag-bg-hover, #ddd);
    }
    
    .no-results {
        padding: 2rem;
        text-align: center;
        background-color: var(--background-alt, #f5f5f5);
        border-radius: 8px;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .blog-controls {
            flex-direction: column;
        }
    }
</style>