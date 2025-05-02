<script>
    export let data;
    
    // Helper function to determine if the media is a video
    function isVideo(path) {
        if (!path) return false;
        const ext = path.split('.').pop().toLowerCase();
        return ['mp4', 'mov', 'webm'].includes(ext);
    }
</script>

<article>
    <div class="project-media">
        {#if isVideo(data.media)}
            <video 
                src={data.media} 
                alt={data.title}
                autoplay 
                muted 
                loop 
                playsinline
            ></video>
        {:else}
            <img src={data.media || data.image || "/images/project-placeholder.jpg"} alt={data.title} />
        {/if}
    </div>
    <div class="project-content">
        <h2>{data.title}</h2>
        <div class="project-meta">
            {#if data.year}
                <span class="year">{data.year}</span>
            {/if}
            
            {#if data.tags && data.tags.length > 0}
                <div class="tags">
                    {#each data.tags as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>
            {/if}
        </div>
        <p>{data.description}</p>
        
        {#if data.github || data.website}
            <div class="project-links">
                {#if data.github}
                    <a href={data.github} target="_blank" rel="noopener noreferrer" class="project-link github">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                        GitHub
                    </a>
                {/if}
                
                {#if data.website}
                    <a href={data.website} target="_blank" rel="noopener noreferrer" class="project-link website">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        Website
                    </a>
                {/if}
            </div>
        {/if}
    </div>
</article>

<style>
    article {
        background-color: var(--bg-secondary);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    
    article:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    
    .project-media {
        height: 180px;
        overflow: hidden;
    }
    
    .project-media img,
    .project-media video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    
    article:hover .project-media img,
    article:hover .project-media video {
        transform: scale(1.05);
    }
    
    .project-content {
        padding: 1.5rem;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    
    h2 {
        font-size: 1.3rem;
        margin: 0 0 0.75rem 0;
        color: var(--text-primary);
    }
    
    .project-meta {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        gap: 0.5rem;
    }
    
    .year {
        background-color: var(--color-accent);
        color: black;
        padding: 0.2rem 0.6rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: bold;
    }
    
    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .tag {
        background-color: rgba(46, 204, 113, 0.1);
        color: var(--color-accent-light);
        padding: 0.2rem 0.5rem;
        border-radius: 20px;
        font-size: 0.7rem;
    }
    
    p {
        margin: 0;
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: auto;
    }
    
    .project-links {
        display: flex;
        gap: 0.8rem;
        margin-top: 1.2rem;
    }
    
    .project-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        text-decoration: none;
        font-size: 0.85rem;
        transition: all 0.2s ease;
    }
    
    .github {
        background-color: rgba(36, 41, 46, 0.1);
        color: var(--text-primary);
    }
    
    .website {
        background-color: rgba(46, 204, 113, 0.1);
        color: var(--color-accent);
    }
    
    .project-link:hover {
        transform: translateY(-2px);
    }
    
    .github:hover {
        background-color: rgba(36, 41, 46, 0.2);
    }
    
    .website:hover {
        background-color: rgba(46, 204, 113, 0.2);
    }
</style>