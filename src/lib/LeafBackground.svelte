<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let intensity = 1;
  let canvasEl;
  let animationFrame;
  
  onMount(() => {

    
    if (canvasEl) {
      // Directly debug to the DOM to help troubleshoot
      const testDiv = document.createElement('div');
      testDiv.style.position = 'fixed';
      testDiv.style.bottom = '10px';
      testDiv.style.right = '10px';
      testDiv.style.background = 'rgba(0,0,0,0.5)';
      testDiv.style.color = 'white';
      testDiv.style.padding = '5px';
      testDiv.style.zIndex = '9999';
      document.body.appendChild(testDiv);
      
      initCanvas();
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  });
  
  function initCanvas() {
    const canvas = canvasEl;
    const ctx = canvas.getContext('2d');
    
    // Make canvas full screen
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Simple leaf class
    class Leaf {
      constructor() {
        this.reset();
      }
      
      reset() {
        // Find the container edges
        const container = document.querySelector('.page-container');
        let leftEdge = 100;
        let rightEdge = window.innerWidth - 100;
        
        if (container) {
          const rect = container.getBoundingClientRect();
          leftEdge = rect.left;
          rightEdge = rect.right;
        }
        
        // Position on either left or right side
        this.onLeft = Math.random() > 0.5;
        
        if (this.onLeft) {
          this.x = Math.random() * leftEdge;
        } else {
          this.x = rightEdge + Math.random() * (window.innerWidth - rightEdge);
        }
        
        this.y = -20 - Math.random() * 100;
        this.size = 5 + Math.random() * 10;
        this.speed = 1 + Math.random() * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.rotation = Math.random() * Math.PI * 2;
        this.opacity = 0.3 + Math.random() * 0.4;
        this.sway = 0.5 + Math.random() * 1;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.leafShape = Math.floor(Math.random() * 3);
      }
      
      update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.01 + this.swayOffset) * this.sway;
        this.rotation += this.rotationSpeed;
        
        // Reset when out of view
        if (this.y > window.innerHeight + 50) {
          this.reset();
        }
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        
        // Draw leaf
        ctx.fillStyle = '#2ecc71';
        ctx.strokeStyle = '#27ae60';
        
        if (this.leafShape === 0) {
          // Oval leaf
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Stem
          ctx.lineWidth = this.size * 0.1;
          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.lineTo(0, this.size);
          ctx.stroke();
        } 
        else if (this.leafShape === 1) {
          // Round leaf
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
        else {
          // Simple leaf shape
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.5, this.size, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
    }
    
    // Create leaves
    const leaves = [];
    const numLeaves = Math.floor(30 * intensity);
    
    for (let i = 0; i < numLeaves; i++) {
      leaves.push(new Leaf());
    }
    
    // Animation loop
    function animate() {
      ctx.fillStyle = 'rgba(18, 18, 18, 0.1)'; // Transparent black for trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
      });
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Cleanup
    onDestroy(() => {
      window.removeEventListener('resize', resizeCanvas);
    });
  }
</script>

<div class="leaf-background">
  <canvas bind:this={canvasEl}></canvas>
  <!-- Debug element to see if component renders -->
</div>

<style>
  .leaf-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0; /* Increased from -1 to 0 - might be needed if z-index stacking is an issue */
    pointer-events: none;
  }

</style>