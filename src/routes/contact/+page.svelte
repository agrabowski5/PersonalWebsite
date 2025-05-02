<script>
  import { onMount } from 'svelte';
  
  let name = '';
  let email = '';
  let subject = '';
  let message = '';
  let formSubmitted = false;
  let formError = false;
  
  function handleSubmit(e) {
    e.preventDefault();
    
    // Basic form validation
    if (!name || !email || !subject || !message) {
      formError = true;
      return;
    }
    
    // In a real implementation, you would handle the form submission here
    // For now, we'll just simulate a successful submission
    formSubmitted = true;
    formError = false;
    
    // Create mailto URL with all fields
    const mailtoUrl = `mailto:agrabows@mit.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoUrl;
  }
</script>

<svelte:head>
  <title>Contact | Alex Grabowski</title>
  <meta name="description" content="Get in touch with Alex Grabowski to discuss sustainable economics, market design, and mechanism design projects." />
</svelte:head>

<div class="contact-container">
  <div class="canvas-container">
    <canvas></canvas>
  </div>

  <div class="content-section">
    <h1>Connect with Me</h1>
    
    <p class="intro">
      I'm always interested in collaborating on projects related to sustainable economics, 
      market design, or innovative mechanism design. Whether you have a question, 
      a proposal, or just want to say hello, feel free to reach out!
    </p>
    
    <div class="contact-card">
      <div class="contact-info">
        <h2>Contact Details</h2>
        
        <div class="contact-methods">
          <div class="contact-method">
            <div class="icon">✉️</div>
            <div class="detail">
              <h3>Email</h3>
              <a href="mailto:agrabows@mit.edu">agrabows@mit.edu</a>
            </div>
          </div>
          
          <div class="contact-method">
            <div class="icon">🔗</div>
            <div class="detail">
              <h3>LinkedIn</h3>
              <a href="https://www.linkedin.com/in/andrew-grabowski/" target="_blank" rel="noopener noreferrer">
                andrew-grabowski
              </a>
            </div>
          </div>
          
          <div class="contact-method">
            <div class="icon">📍</div>
            <div class="detail">
              <h3>Location</h3>
              <p>Massachusetts Institute of Technology<br>Cambridge, MA</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="contact-form">
        <h2>Send a Message</h2>
        
        {#if formSubmitted}
          <div class="success-message">
            <p>Thanks for reaching out! I'll get back to you soon.</p>
            <button on:click={() => formSubmitted = false}>Send another message</button>
          </div>
        {:else}
          <form on:submit={handleSubmit}>
            {#if formError}
              <div class="error-message">
                Please fill out all fields before submitting.
              </div>
            {/if}
            
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                bind:value={name} 
                placeholder="Your name" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                bind:value={email} 
                placeholder="Your email address" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                bind:value={subject} 
                placeholder="What's this about?" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                bind:value={message} 
                placeholder="Your message here..." 
                rows="5" 
                required
              ></textarea>
            </div>
            
            <button type="submit" class="send-button">
              <span>Send Message</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        {/if}
      </div>
    </div>
    
    <div class="connection-note">
      <h3>Looking for sustainable solutions?</h3>
      <p>
        I'm particularly interested in projects related to:
      </p>
      <ul class="interest-list">
        <li>Sustainable market design</li>
        <li>Auction theory for renewable energy</li>
        <li>Mechanism design for environmental incentives</li>
        <li>Economic simulations of climate policy</li>
        <li>Collaborative research in behavioral economics</li>
      </ul>
    </div>
  </div>
</div>

<style>
  .contact-container {
    position: relative;
    width: 100%;
  }
  
  .canvas-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  
  .content-section {
    position: relative;
    z-index: 1;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
    border-bottom: 2px solid var(--color-accent);
    padding-bottom: 0.5rem;
    max-width: max-content;
  }
  
  .intro {
    font-size: 1.1rem;
    max-width: 50rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  .contact-card {
    background-color: var(--bg-secondary);
    border-radius: 10px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    margin-bottom: 3rem;
  }
  
  @media (max-width: 768px) {
    .contact-card {
      flex-direction: column;
    }
    
    .divider {
      width: 80% !important;
      height: 1px !important;
      margin: 1rem auto !important;
    }
  }
  
  .contact-info, .contact-form {
    padding: 2rem;
    flex: 1;
  }
  
  .divider {
    width: 1px;
    background-color: var(--border-color);
    margin: 2rem 0;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
    color: var(--color-accent-light);
  }
  
  .contact-methods {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .contact-method {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .icon {
    font-size: 1.5rem;
    padding: 0.5rem;
    background-color: rgba(46, 204, 113, 0.1);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .detail p {
    margin: 0;
    color: var(--text-secondary);
  }
  
  .detail a {
    color: var(--color-accent-light);
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .detail a:hover {
    color: var(--color-accent);
    text-decoration: underline;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  input:focus, textarea:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.2);
    outline: none;
  }
  
  .send-button {
    background-color: var(--color-accent);
    color: #000;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background-color 0.3s, transform 0.2s;
    width: auto;
  }
  
  .send-button:hover {
    background-color: var(--color-accent-dark);
    transform: translateY(-2px);
  }
  
  .send-button svg {
    transition: transform 0.3s;
  }
  
  .send-button:hover svg {
    transform: translateX(4px);
  }
  
  .success-message {
    background-color: rgba(46, 204, 113, 0.1);
    border-left: 4px solid var(--color-accent);
    padding: 1.5rem;
    border-radius: 4px;
  }
  
  .success-message p {
    margin-top: 0;
    color: var(--text-primary);
  }
  
  .success-message button {
    background-color: transparent;
    border: 1px solid var(--color-accent);
    color: var(--color-accent);
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.3s;
  }
  
  .success-message button:hover {
    background-color: rgba(46, 204, 113, 0.1);
  }
  
  .error-message {
    background-color: rgba(255, 87, 87, 0.1);
    border-left: 4px solid #ff5757;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 4px;
    color: #ff8080;
  }
  
  .connection-note {
    background-color: var(--bg-secondary);
    border-radius: 10px;
    padding: 2rem;
    border-left: 4px solid var(--color-accent);
  }
  
  .interest-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin-top: 1rem;
  }
  
  .interest-list li {
    background-color: rgba(46, 204, 113, 0.1);
    color: var(--color-accent-light);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .interest-list li {
      width: 100%;
      text-align: center;
    }
  }
</style>