<svelte:head>
  <title>Contact me</title>
</svelte:head>

<h1>Contact</h1>
    <form action="mailto:agrabows@mit.edu">
        <!-- Note: Removed the Email field -->
        
        <label for="subject">
            Subject:
            <input type="text" name="subject" id="subject">
        </label>
        
        <label for="message">
            Message:
            <textarea name="body" id="message"></textarea>
        </label>
        
        <button>Send</button>
    </form>