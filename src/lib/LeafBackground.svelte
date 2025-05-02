<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let intensity = 1; // Allows different pages to adjust leaf density
  let canvasEl;
  let animationFrame;
  let leaves = [];
  
  // Add debugging
  console.log('LeafBackground component initialized with intensity:', intensity);
  
  onMount(() => {
    console.log('LeafBackground mounted, canvas element exists:', !!canvasEl);
    if (canvasEl) initCanvas();
    
    // Clean up animation frame on component destroy
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  });
  
  function initCanvas() {
    console.log('Initializing canvas');
    const canvas = canvasEl;
    const ctx = canvas.getContext('2d');
    
    // Add a visible background temporarily to see if the canvas is positioned correctly
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'; // Semi-transparent red
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Resize canvas to fill viewport
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Regenerate leaves after resize
      createLeaves();
    }
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Leaf class for animation
    class Leaf {
      constructor(x, y, size, speed, opacity, bounce) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseSpeed = speed;
        this.speed = speed;
        this.opacity = opacity;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.leafType = Math.floor(Math.random() * 3); // 3 types of leaves
        this.sway = Math.random() * 0.1;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.lastTime = performance.now();
        
        // Edge behavior
        this.bounce = bounce; // Whether to bounce off edges
        this.edge = null; // Which edge it's currently near
        this.bounceDecay = 0.8; // Energy loss on bounce
        this.bounceCounter = 0; // Count bounces to eventually reset
        this.xVelocity = 0; // Horizontal velocity (for bouncing)
      }
      
      update(time) {
        // Time-based animation for consistent speed
        const delta = time - this.lastTime;
        this.lastTime = time;
        const timeScale = delta / 16.7; // Normalize to ~60fps
        
        // Basic movement
        this.y += this.speed * timeScale;
        
        // Sway side to side
        const swayAmount = Math.sin(this.y * 0.01 + this.swayOffset) * this.sway;
        this.x += swayAmount * timeScale;
        
        // Add horizontal velocity when bouncing
        this.x += this.xVelocity * timeScale;
        
        // Rotate leaf
        this.rotation += this.rotationSpeed * timeScale;
        
        // Detect edges (left and right margins)
        const leftBorder = 20;
        const rightBorder = canvas.width - 20;
        
        // Left edge collision
        if (this.x - this.size < leftBorder) {
          if (this.bounce && this.edge !== 'left') {
            this.edge = 'left';
            this.xVelocity = Math.abs(this.xVelocity) + 0.5;
            this.rotationSpeed = Math.abs(this.rotationSpeed) * 3;
            this.bounceCounter++;
          }
          this.x = leftBorder + this.size;
        } 
        // Right edge collision
        else if (this.x + this.size > rightBorder) {
          if (this.bounce && this.edge !== 'right') {
            this.edge = 'right';
            this.xVelocity = -Math.abs(this.xVelocity) - 0.5;
            this.rotationSpeed = -Math.abs(this.rotationSpeed) * 3;
            this.bounceCounter++;
          }
          this.x = rightBorder - this.size;
        } else {
          this.edge = null;
        }
        
        // Apply bouncing effect decay
        if (this.xVelocity !== 0) {
          this.xVelocity *= 0.98; // Air resistance
          if (Math.abs(this.xVelocity) < 0.1) this.xVelocity = 0;
        }
        
        // Reset when out of view or after several bounces
        if (this.y > canvas.height + this.size || this.bounceCounter > 3) {
          this.reset();
        }
      }
      
      reset() {
        this.y = -this.size - Math.random() * canvas.height * 0.3;
        this.x = Math.random() * canvas.width;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.speed = this.baseSpeed * (0.7 + Math.random() * 0.6);
        this.xVelocity = 0;
        this.edge = null;
        this.bounceCounter = 0;
      }
      
      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        
        // Draw a simple leaf shape
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        
        if (this.leafType === 0) {
          // Oval leaf
          ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Stem
          ctx.beginPath();
          ctx.strokeStyle = '#27ae60';
          ctx.lineWidth = this.size * 0.1;
          ctx.moveTo(0, -this.size);
          ctx.lineTo(0, this.size);
          ctx.stroke();
        } else if (this.leafType === 1) {
          // Round leaf
          ctx.arc(0, 0, this.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
          
          // Veins
          ctx.beginPath();
          ctx.strokeStyle = '#27ae60';
          ctx.lineWidth = this.size * 0.05;
          for (let i = 0; i < 4; i++) {
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(i * Math.PI/2) * this.size * 0.7, 
                     Math.sin(i * Math.PI/2) * this.size * 0.7);
          }
          ctx.stroke();
        } else {
          // Simple maple-like leaf
          for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const x = Math.cos(angle) * this.size;
            const y = Math.sin(angle) * this.size;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.fill();
        }
        
        ctx.restore();
      }
    }
    
    function createLeaves() {
      // Clear existing leaves
      leaves = [];
      
      // Calculate number of leaves based on viewport size and intensity
      const leafCount = Math.floor(20 * intensity + (canvas.width * canvas.height) / 100000);
      
      // Create new leaves
      for (let i = 0; i < leafCount; i++) {
        // Randomly place leaves across the entire height (not just at the top)
        const y = Math.random() * canvas.height * 1.2 - canvas.height * 0.1;
        
        leaves.push(new Leaf(
          Math.random() * canvas.width, // x
          y, // y
          2 + Math.random() * 8, // size
          0.2 + Math.random() * 0.5, // speed
          0.1 + Math.random() * 0.3,  // opacity
          true // enable bouncing off edges
        ));
      }
    }
    
    createLeaves();
    
    // Animation loop
    function animate(timestamp) {
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(18, 18, 18, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw leaves
      leaves.forEach(leaf => {
        leaf.update(timestamp);
        leaf.draw(ctx);
      });
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    animationFrame = requestAnimationFrame(animate);
    
    // Clean up event listener when the component is destroyed
    onDestroy(() => {
      window.removeEventListener('resize', resizeCanvas);
    });
  }
</script>

<div class="leaf-background">
  <canvas bind:this={canvasEl}></canvas>
</div>

<style>
  .leaf-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Try different z-index values */
    z-index: 0; /* Changed from -1 to 0 temporarily for testing */
    pointer-events: none;
    /* Add outline for debugging */
    outline: 2px solid red;
  }
</style>