<script>
    // You can add any interactive components here if needed
</script>

<svelte:head>
    <title>CV | Andrew Grabowski</title>
    <meta name="description" content="Andrew Grabowski's curriculum vitae - education, experience, and expertise in sustainable market design and climate solutions." />
</svelte:head>

<div class="cv-container">
    <div class="page-header">
        <h1>Curriculum Vitae</h1>
        <div class="actions">
            <a href="/documents/Grabowski_CV.pdf" download class="download-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download PDF
            </a>
        </div>
    </div>

    <section class="cv-section">
        <h2>Education</h2>
        
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3>MIT - Massachusetts Institute of Technology</h3>
                <div class="timeline-meta">
                    <span class="date">2021-2025</span>
                    <span class="location">Cambridge, MA</span>
                </div>
                <p class="degree">Master of Engineering in Advanced Manufacturing and Design</p>
                <p>Focused on sustainable manufacturing processes and systems design for climate solutions.</p>
            </div>
        </div>
        
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3>MIT - Massachusetts Institute of Technology</h3>
                <div class="timeline-meta">
                    <span class="date">2019-2023</span>
                    <span class="location">Cambridge, MA</span>
                </div>
                <p class="degree">Bachelor of Science in Computer Science and Engineering</p>
                <p>Minor in Economics with focus on market mechanisms and climate policy.</p>
            </div>
        </div>
    </section>

    <section class="cv-section">
        <h2>Research Experience</h2>
        
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3>Research Assistant - Laboratory for Aviation and the Environment</h3>
                <div class="timeline-meta">
                    <span class="date">2022-Present</span>
                    <span class="location">MIT, Cambridge, MA</span>
                </div>
                <ul>
                    <li>Developing financial instruments to strengthen market-based demand for sustainable aviation fuel.</li>
                    <li>Creating innovative Book and Claim systems for environmental attribute accounting.</li>
                    <li>Designing game-theoretic approaches to collaborative environmental attribute purchasing.</li>
                </ul>
            </div>
        </div>
        
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3>Research Assistant - Sustainable Systems Lab</h3>
                <div class="timeline-meta">
                    <span class="date">2020-2022</span>
                    <span class="location">MIT, Cambridge, MA</span>
                </div>
                <ul>
                    <li>Developed computational models for assessing environmental impact of policy decisions.</li>
                    <li>Created simulations to evaluate market designs for renewable energy credits.</li>
                    <li>Published research on optimizing sustainable supply chains.</li>
                </ul>
            </div>
        </div>
    </section>

    <section class="cv-section">
        <h2>Skills</h2>
        
        <div class="skills-grid">
            <div class="skill-category">
                <h3>Technical</h3>
                <ul class="skill-list">
                    <li>System Dynamics Modeling</li>
                    <li>Life Cycle Assessment</li>
                    <li>Computational Economics</li>
                    <li>Machine Learning</li>
                    <li>Full-stack Development</li>
                </ul>
            </div>
            
            <div class="skill-category">
                <h3>Research</h3>
                <ul class="skill-list">
                    <li>Policy Analysis</li>
                    <li>Market Design</li>
                    <li>Mechanism Design</li>
                    <li>Game Theory</li>
                    <li>Climate Economics</li>
                </ul>
            </div>
            
            <div class="skill-category">
                <h3>Languages & Tools</h3>
                <ul class="skill-list">
                    <li>Python, R, MATLAB</li>
                    <li>JavaScript/TypeScript</li>
                    <li>SQL, NoSQL databases</li>
                    <li>Vensim, GAMS</li>
                    <li>Git, Docker</li>
                </ul>
            </div>
            
            <div class="skill-category">
                <h3>Professional</h3>
                <ul class="skill-list">
                    <li>Research Publication</li>
                    <li>Project Management</li>
                    <li>Stakeholder Engagement</li>
                    <li>Public Speaking</li>
                    <li>Technical Writing</li>
                </ul>
            </div>
        </div>
    </section>

    <section class="cv-section">
        <h2>Publications</h2>
        
        <div class="publications-list">
            <div class="publication-item">
                <h3>Financial Mechanisms for Scaling Sustainable Aviation Fuel Adoption</h3>
                <div class="publication-meta">
                    <span class="journal">Journal of Sustainable Transportation</span>
                    <span class="date">2023</span>
                </div>
                <p>Analysis of book and claim systems and their potential to accelerate SAF market development.</p>
            </div>
            
            <div class="publication-item">
                <h3>Optimizing Cooperative Purchasing Models for Environmental Attributes</h3>
                <div class="publication-meta">
                    <span class="journal">Renewable Energy Economics</span>
                    <span class="date">2022</span>
                </div>
                <p>Game-theoretic approach to collaborative procurement of renewable energy certificates.</p>
            </div>
            
            <div class="publication-item">
                <h3>System Dynamics Modeling for Climate Policy Assessment</h3>
                <div class="publication-meta">
                    <span class="journal">Environmental Systems Analysis</span>
                    <span class="date">2021</span>
                </div>
                <p>Computational framework for evaluating impact of policy interventions on emissions reduction.</p>
            </div>
        </div>
    </section>

    <div class="cv-footer">
        <p>This CV was last updated on May 2, 2025. For the most recent version, please <a href="/contact">contact me</a>.</p>
    </div>
</div>

<style>
    .cv-container {
        max-width: 100%;
    }
    
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .download-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background-color: var(--color-accent);
        color: black;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s ease;
    }
    
    .download-button:hover {
        background-color: var(--color-accent-dark);
        transform: translateY(-2px);
    }
    
    h1 {
        font-size: 3rem;
        margin: 0;
    }
    
    .cv-section {
        margin-bottom: 3rem;
    }
    
    .cv-section h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        color: var(--text-primary);
        border-bottom: 2px solid var(--color-accent);
        padding-bottom: 0.5rem;
        display: inline-block;
    }
    
    /* Timeline styling */
    .timeline-item {
        display: flex;
        margin-bottom: 2rem;
        position: relative;
    }
    
    .timeline-marker {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: var(--color-accent);
        margin-right: 1.5rem;
        margin-top: 0.5rem;
        flex-shrink: 0;
        position: relative;
        z-index: 1;
    }
    
    .timeline-marker::before {
        content: '';
        position: absolute;
        height: calc(100% + 2rem);
        width: 2px;
        background-color: rgba(46, 204, 113, 0.2);
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .timeline-item:last-child .timeline-marker::before {
        display: none;
    }
    
    .timeline-content {
        flex: 1;
    }
    
    .timeline-content h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
    
    .timeline-meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: var(--color-accent-light);
    }
    
    .degree {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    /* Skills grid */
    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 2rem;
    }
    
    .skill-category h3 {
        color: var(--color-accent-light);
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
    
    .skill-list {
        list-style-type: none;
        padding: 0;
    }
    
    .skill-list li {
        margin-bottom: 0.5rem;
        padding-left: 1.2rem;
        position: relative;
    }
    
    .skill-list li::before {
        content: "•";
        color: var(--color-accent);
        position: absolute;
        left: 0;
    }
    
    /* Publications */
    .publication-item {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px dashed var(--border-color);
    }
    
    .publication-item:last-child {
        border-bottom: none;
    }
    
    .publication-item h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
    
    .publication-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        color: var(--color-accent-light);
    }
    
    .cv-footer {
        margin-top: 3rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
        font-size: 0.9rem;
        color: var(--text-muted);
        text-align: center;
    }
    
    @media (max-width: 768px) {
        .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .skills-grid {
            grid-template-columns: 1fr;
        }
        
        .timeline-meta {
            flex-direction: column;
        }
    }
</style>