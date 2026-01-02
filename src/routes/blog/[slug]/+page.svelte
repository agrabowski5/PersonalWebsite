<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    
    // This would typically come from a CMS or data file
    // For now, we'll use a simple lookup object
    const blogPosts = {
        'introduction-to-auction-theory': {
            title: 'Introduction to Auction Theory',
            date: '2025-05-01',
            author: 'Andrew Grabowski',
            content: `
## Understanding the Foundations

Auction theory is a branch of economics that studies how people act in auction markets and the properties of auction markets. It focuses on how bidding strategies are affected by the rules of the auction and how these rules affect the auction outcome.

### Key Auction Types

1. **English Auction**: The most common type where bidders openly compete against each other, placing bids higher than previous bids.

2. **Dutch Auction**: The auctioneer starts with a high price and gradually lowers it until someone accepts.

3. **First-Price Sealed-Bid Auction**: All bidders submit sealed bids simultaneously, and the highest bidder wins and pays their bid.

4. **Second-Price Sealed-Bid (Vickrey) Auction**: All bidders submit sealed bids simultaneously, and the highest bidder wins but pays the second-highest bid.

### The Revenue Equivalence Theorem

Under certain conditions (risk-neutral bidders, independent private values), all four standard auctions yield the same expected revenue to the seller. This powerful theorem helps us understand why seemingly different auction formats can produce similar outcomes.

## Applications in Modern Economics

Auction theory has applications far beyond traditional auctions:

- **Spectrum Allocation**: Governments use auctions to allocate radio spectrum to telecommunications companies.
- **Online Advertising**: Real-time bidding for ad placements uses auction mechanisms.
- **Procurement**: Companies and governments use reverse auctions to purchase goods and services.
- **Electricity Markets**: Many wholesale electricity markets use auction mechanisms to determine prices.

### The Future of Auction Theory

Recent developments in auction theory, including work by Nobel Prize winners Paul Milgrom and Robert Wilson, have focused on designing auctions for complex settings with multiple items and interdependent values.

These advances are helping to design better markets and allocation mechanisms across the economy.
            `,
            tags: ['economics', 'auction theory', 'game theory'],
            image: '/images/blog/auction-theory.jpg'
        },
        'mechanism-design-primer': {
            title: 'A Primer on Mechanism Design',
            date: '2025-04-15',
            author: 'Andrew Grabowski',
            content: `
## The Engineering of Economics

Mechanism design is often called "reverse game theory." While game theory analyzes how people behave given the rules of a game, mechanism design asks: what rules should we set to achieve a desired outcome?

### Key Concepts

1. **Incentive Compatibility**: Designing mechanisms where participants' best interests align with truthfully revealing their preferences.

2. **Individual Rationality**: Ensuring participants benefit from participating in the mechanism.

3. **Budget Balance**: Creating mechanisms that don't require external subsidies.

4. **Efficiency**: Maximizing the total welfare of all participants.

### The Revelation Principle

One of the most important results in mechanism design is the revelation principle, which states that any mechanism can be transformed into a direct, incentive-compatible mechanism that achieves the same outcome.

## Practical Applications

Mechanism design principles are applied in many domains:

- **Market Design**: Designing markets that efficiently match participants (e.g., school choice, organ exchanges).
- **Auction Design**: Creating auction formats that achieve seller objectives.
- **Voting Systems**: Designing voting rules that reflect group preferences.
- **Contract Design**: Creating incentive structures in employment and procurement contracts.

### The VCG Mechanism

The Vickrey-Clarke-Groves (VCG) mechanism is a generalized version of the second-price auction that works for multiple items. It charges each participant the externality they impose on others, leading to truthful bidding as a dominant strategy.

However, VCG mechanisms have practical limitations, including complexity and vulnerability to collusion, which have limited their adoption in practice.
            `,
            tags: ['economics', 'mechanism design', 'incentives'],
            image: '/images/blog/mechanism-design.jpg'
        },
        'simulation-approaches': {
            title: 'Approaches to Economic Simulation',
            date: '2025-03-22',
            author: 'Andrew Grabowski',
            content: `
## Why Simulate Economic Systems?

Economic simulation allows us to explore outcomes of complex systems where analytical solutions are difficult or impossible to obtain. It's particularly useful for:

- Testing theories in controlled environments
- Exploring emergent behaviors in complex markets
- Evaluating policy interventions before implementation
- Understanding strategic interactions between multiple agents

### Common Simulation Approaches

1. **Agent-Based Modeling (ABM)**

   Agent-based models simulate the actions and interactions of autonomous agents to assess their effects on the system as a whole. They're especially useful for:
   
   - Markets with heterogeneous participants
   - Systems with network effects
   - Scenarios where learning and adaptation are important

2. **Monte Carlo Simulation**

   Monte Carlo methods use repeated random sampling to obtain numerical results and understand the risk and uncertainty in predictive models. They're valuable for:
   
   - Risk assessment
   - Option pricing and financial modeling
   - Evaluating auction outcomes with uncertain parameters
`,
            tags: ['economics', 'simulation', 'agent-based modeling'],
            image: '/images/blog/simulation.jpg'
        },
        'understanding-steel-industry-green-steel': {
            title: 'Understanding the Steel Industry and the Path to Green Steel',
            date: '2026-01-01',
            author: 'Andrew Grabowski',
            content: `
## A New Year, A New Learning Journey

Today is New Year's Day 2026, and I wanted to start something new. A lot of times my brain feels broken, because although I can read something a thousand times, I don't seem to remember it unless I use it or teach it to someone else. That's why I wanted to start writing on topics that I think are interesting to me in a freeform manner without considerations for form. I just wanted to write to write, and potentially learn better along the way.

My first topic of interest is going to be on the Steel industry. This industry has constantly been on the edge of my experience, always close but I've never dived in. When I was at MathWorks, I supported Boston Metal, and at World Energy we explored how to use hydrogen reserve for green steel creation, but I never sat down to learn about steel, so here we go.

## The Steel Industry's Climate Impact

The Steel industry is a huge emitter of CO₂ emissions with potentially 7-11% of all emissions. This shouldn't be a surprise if we think about all the value that comes from it. It got us out of the stone, and iron ages, allowing us to develop awe inspiring buildings and infrastructure (51% of all steel used), Automobiles (12%) and airplanes and trains (5%), and allowed us to make all the tools that helped us build these things. Similar to what electricity did for the digital age, steel became our mechanical chromosomal structure defining how we would be able to build and who would be able to build.

### The Global Steel Landscape

Today, the world's largest steel producer is China, with over 50% of steel created there. With over 1875 MMT of steel created every year, they far exceed every other nation's development. China's BaoWu group leads with 130 MMT produced, followed by Luxembourg's ArcelorMittal's 68 MMT, with again China's Ansteel Group and Japan's Nippon Steel following in fourth. The East is leading the charge, since the west has offloaded these trade heavy industry jobs to the east. Even America's Nucor is mainly a recycler of steel and US Steel is potentially getting acquired by Nippon Steels.

## The Current Steel Production Process

These industries are dirty, and energy intensive. Depending on the process, 1 MT of steel could require 2 tonnes of CO₂ emitted. Steel is fundamentally an alloy of iron and up to 2% carbon with other elements to obtain particular properties. For instance, higher carbon means stronger, but more brittle steel. These emissions come from both the energy intensity with the extreme heat required of 1500°C to actually melt the iron, but also the current need for carbon sources to remove the oxygen from natural iron ore.

### Traditional Production Methods

Before we jump into how we can clean up this industry, let's discuss how it's done today. Today it has a primary approach from virgin iron ore called **Blast Furnace plus Basic Oxygen Furnace (BF-BOF)**. We also use a secondary approach to help with scrap or recycled steel using an **Electric Arc Furnace (EAF)**.

The EAF isn't a direct replacement for BF-BOF, but instead allows an accumulation of old steel and other metals to be thrown in a furnace. Once collected, a set of electrodes is inserted into the shred at the top and melted down at a lower voltage, then it moves to the deeper material and turns up the voltage to melt the entire furnace. Oxygen and coke is then pumped into the system - oxygen to remove the impurities and coke to remove the oxygen from iron oxide. This process can use electricity instead of coal or other fossil fuels to create the heat needed to get the temperature up to 1500°C which allows for forming. However, it still needs carbon to actually create the steel.

## Green Steel Technologies

Now, can we ask what happens if we want it to be green steel?

### Molten Oxide Electrolysis (MOE)

One promising approach today is explored by Boston Metal. They aim to use a Molten Oxide Electrolysis to replace the need for blast furnaces. The current setup pours iron ore into the furnace full of electrolyte, which is really just a molten mixture of metal oxides like MgO, CaO, SiO₂, and Al₂O₃ that acts as a solvent. The electrodes then pass the current through the electrolyte with the iron ore driving temperatures to 1600°C which then facilitates the separation of the iron and the oxygen gas where the metal is collected at the cathode, and the oxygen is collected at the anode. The iron is then tapped at the bottom of the furnace to get pure iron. The small percentage of carbon can then be added in later stages using things like ladle metallurgy.

### Other Green Steel Approaches

There are other processes as well, including using **hydrogen-based DRI**, which uses hydrogen instead of the carbon of coke to strip off oxygen creating water instead of CO₂. There are also proposed approaches of using a perovskite structure that can convert CO₂ to CO in a blast furnace, however today the MOE approach seems to be the most understood 'green steel' approach.

## Market Mechanisms: Book and Claim

Finally, the last thing we wanted to explore was to understand how companies like MSFT and Apple could actually use these 'green steel' options. Since supply of green steel will most likely start off in very concentrated areas such as in the Labrador Trough in Canada, a company like ArcelorMittal or Rio Tinto may have its iron ore deposits, and therefore want to have its steel refinery near the deposit level no longer needing long transportation of the iron ore. The company could use the MOE process to convert the iron ore into pure iron metal and add carbon to create middle grade steel. This steel would be termed green steel if the energy and embodied emissions of the steel is reduced compared to the baseline steel levels of around 2 MT CO₂/MT of Steel.

### How Book and Claim Works

If MSFT wanted to use this in Seattle, they could ship this steel out to Seattle for use, however this could be expensive and increase the CO₂ output due to the transportation required. Instead they could use **Book and Claim**. Book and Claim is a chain of custody model that lets you detach the environmental attributes of a product such as green steel from the actual physical good. This means that the steel could be sold to local steel users in Canada, but the environmental attributes of the steel could be purchased by MSFT for any uses of steel they have where they have used typical 'dirty' steel.

This Book and Claim model isn't as evolved as other sustainable goods such as sustainable aviation fuel, but it is developing. This book and claims allows us to still participate in green steel markets without actually being required to ship it to us.

### Challenges and Questions

However, many complications arise:

1. **Physical Properties**: Steel has many varieties available with high strength, compression factors, yield, and other factors. Do these physical properties have to be equivalent in order to use Book and Claim?

2. **Market Development**: Will using this model hamper or help the market development?

## Conclusion

Through this exploration, we looked at the current state of the steel market and explored how the future may look from a technology standpoint. Overall, steel is a huge component of our economy and is critical to maintaining environmental goals. Thank you all for your time and I hope you learned something!
            `,
            tags: ['steel', 'green technology', 'climate', 'industrial decarbonization', 'book and claim'],
            image: '/images/blog/green-steel.jpg',
            imageSource: 'https://www.steel.org/steel-technology/steel-production/'
        },
    };

    let currentPost = null;
    let slug = '';

    onMount(() => {
        slug = $page.params.slug;
        currentPost = blogPosts[slug];
    });
</script>

{#if currentPost}
    <svelte:head>
        <title>{currentPost.title} | Andrew Grabowski</title>
        <meta name="description" content={currentPost.content.slice(0, 160)} />
    </svelte:head>

    <article class="blog-post">
        {#if currentPost.image}
            <div class="post-header-image">
                <img src={currentPost.image} alt={currentPost.title} />
                {#if currentPost.imageSource}
                    <p class="image-source">Image source: <a href={currentPost.imageSource} target="_blank" rel="noopener noreferrer">{currentPost.imageSource}</a></p>
                {/if}
            </div>
        {/if}

        <header class="post-header">
            <h1>{currentPost.title}</h1>
            <div class="post-metadata">
                <span class="post-author">By {currentPost.author}</span>
                <span class="post-date">{new Date(currentPost.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</span>
            </div>
            {#if currentPost.tags}
                <div class="post-tags">
                    {#each currentPost.tags as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>
            {/if}
        </header>

        <div class="post-content">
            {@html currentPost.content.split('\n').map(line => {
                // Convert markdown-style headers
                if (line.startsWith('### ')) {
                    return `<h3>${line.slice(4)}</h3>`;
                } else if (line.startsWith('## ')) {
                    return `<h2>${line.slice(3)}</h2>`;
                } else if (line.startsWith('# ')) {
                    return `<h1>${line.slice(2)}</h1>`;
                }
                // Convert bold text **text**
                line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                // Convert markdown lists
                if (line.match(/^\d+\.\s/)) {
                    return `<li>${line.replace(/^\d+\.\s/, '')}</li>`;
                } else if (line.startsWith('- ')) {
                    return `<li>${line.slice(2)}</li>`;
                }
                // Regular paragraphs
                return line.trim() ? `<p>${line}</p>` : '';
            }).join('\n')}
        </div>

        <div class="post-footer">
            <a href="/blog" class="back-to-blog">← Back to Blog</a>
        </div>
    </article>
{:else}
    <div class="not-found">
        <h1>Blog Post Not Found</h1>
        <p>Sorry, we couldn't find the blog post you're looking for.</p>
        <a href="/blog" class="back-to-blog">← Back to Blog</a>
    </div>
{/if}

<style>
    .blog-post {
        max-width: 800px;
        margin: 0 auto;
    }

    .post-header-image {
        width: 100%;
        margin-bottom: 2rem;
        border-radius: 8px;
        overflow: hidden;
    }

    .post-header-image img {
        width: 100%;
        height: auto;
        display: block;
    }

    .image-source {
        margin-top: 0.5rem;
        font-size: 0.85rem;
        color: var(--text-muted);
        font-style: italic;
    }

    .image-source a {
        color: var(--color-accent);
        text-decoration: none;
    }

    .image-source a:hover {
        text-decoration: underline;
    }

    .post-header {
        margin-bottom: 2rem;
    }

    .post-header h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        line-height: 1.2;
    }

    .post-metadata {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        color: var(--text-muted);
        font-size: 0.9rem;
    }

    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .tag {
        background-color: rgba(46, 204, 113, 0.1);
        color: var(--color-accent-light);
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
    }

    .post-content {
        line-height: 1.8;
        font-size: 1.05rem;
    }

    .post-content :global(h2) {
        font-size: 1.8rem;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
    }

    .post-content :global(h3) {
        font-size: 1.4rem;
        margin-top: 2rem;
        margin-bottom: 0.75rem;
        color: var(--text-primary);
    }

    .post-content :global(p) {
        margin-bottom: 1.25rem;
    }

    .post-content :global(li) {
        margin-bottom: 0.5rem;
        margin-left: 1.5rem;
    }

    .post-content :global(strong) {
        color: var(--text-primary);
        font-weight: 600;
    }

    .post-footer {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);
    }

    .back-to-blog {
        display: inline-block;
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s;
    }

    .back-to-blog:hover {
        color: var(--color-accent-light);
    }

    .not-found {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        padding: 4rem 0;
    }

    .not-found h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
        .post-header h1 {
            font-size: 2rem;
        }

        .post-content {
            font-size: 1rem;
        }

        .post-metadata {
            flex-direction: column;
            gap: 0.25rem;
        }
    }
</style>
