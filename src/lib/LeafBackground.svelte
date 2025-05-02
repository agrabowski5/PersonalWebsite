<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let intensity = 1;
  let canvasEl;
  let animationFrame;
  
  onMount(() => {
    if (canvasEl) {
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
    
    // Leaf colors with adjusted probabilities
    const leafColors = [
      { fill: '#2ecc71', stroke: '#27ae60', weight: 0.92 },  // Green - 98% probability
      { fill: '#e74c3c', stroke: '#c0392b', weight: 0.04 },  // Red - 1% probability
      { fill: '#f1c40f', stroke: '#f39c12', weight: 0.04 }   // Yellow/Orange - 1% probability
    ];
    
    // Calculate cumulative weights for weighted random selection
    const cumulativeWeights = [];
    let cumulativeWeight = 0;
    
    for (const color of leafColors) {
      cumulativeWeight += color.weight;
      cumulativeWeights.push(cumulativeWeight);
    }
    
    // Function to select a random color based on weights
    function getRandomColor() {
      const random = Math.random();
      for (let i = 0; i < cumulativeWeights.length; i++) {
        if (random < cumulativeWeights[i]) {
          return leafColors[i];
        }
      }
      return leafColors[0]; // Default to green in case of rounding errors
    }
    
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
        this.opacity = 0.4 + Math.random() * 0.5;
        this.sway = 0.5 + Math.random() * 1;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.leafShape = Math.floor(Math.random() * 4); // 4 leaf types
        
        // Select color based on weighted probability
        const colorInfo = getRandomColor();
        this.fillColor = colorInfo.fill;
        this.strokeColor = colorInfo.stroke;
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
        
        // Set colors based on leaf type
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;
        
        if (this.leafShape === 0) {
          // Maple-inspired leaf
          ctx.beginPath();
          
          // Draw maple-like shape
          for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const innerRadius = this.size * 0.3;
            const outerRadius = this.size;
            
            const innerX = Math.cos(angle) * innerRadius;
            const innerY = Math.sin(angle) * innerRadius;
            
            const outerX = Math.cos(angle) * outerRadius;
            const outerY = Math.sin(angle) * outerRadius;
            
            const midAngle1 = angle + Math.PI / 10;
            const midAngle2 = angle - Math.PI / 10;
            
            const midX1 = Math.cos(midAngle1) * (outerRadius * 0.8);
            const midY1 = Math.sin(midAngle1) * (outerRadius * 0.8);
            
            const midX2 = Math.cos(midAngle2) * (outerRadius * 0.8);
            const midY2 = Math.sin(midAngle2) * (outerRadius * 0.8);
            
            if (i === 0) {
              ctx.moveTo(innerX, innerY);
            } else {
              ctx.lineTo(innerX, innerY);
            }
            
            ctx.lineTo(midX1, midY1);
            ctx.lineTo(outerX, outerY);
            ctx.lineTo(midX2, midY2);
          }
          
          ctx.closePath();
          ctx.fill();
          ctx.lineWidth = this.size * 0.05;
          ctx.stroke(); // outline for the leaf
          
          // Draw the stem
          ctx.beginPath();
          ctx.lineWidth = this.size * 0.1;
          ctx.moveTo(0, 0);
          ctx.lineTo(0, this.size * 1.2);
          ctx.stroke();
          
          // Draw leaf veins
          ctx.beginPath();
          ctx.lineWidth = this.size * 0.03;
          for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            ctx.moveTo(0, 0);
            const veinX = Math.cos(angle) * (this.size * 0.7);
            const veinY = Math.sin(angle) * (this.size * 0.7);
            ctx.lineTo(veinX, veinY);
          }
          ctx.stroke();
        } 
        else if (this.leafShape === 1) {
          // Oval leaf with stem and vein
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.lineWidth = this.size * 0.03;
          ctx.stroke(); // Outline for the leaf
          
          // Main stem/vein
          ctx.beginPath();
          ctx.lineWidth = this.size * 0.08;
          ctx.moveTo(0, -this.size);
          ctx.lineTo(0, this.size);
          ctx.stroke();
          
          // Side veins
          ctx.beginPath();
          ctx.lineWidth = this.size * 0.05;
          for (let i = 1; i < 4; i++) {
            const y = -this.size + (i * this.size * 0.5);
            const angle = Math.PI / 5;
            
            // Left vein
            ctx.moveTo(0, y);
            ctx.lineTo(-this.size * 0.5 * Math.cos(angle), y + this.size * 0.2 * Math.sin(angle));
            
            // Right vein
            ctx.moveTo(0, y);
            ctx.lineTo(this.size * 0.5 * Math.cos(angle), y + this.size * 0.2 * Math.sin(angle));
          }
          ctx.stroke();
        }
        else if (this.leafShape === 2) {
          // Heart-shaped leaf
          const r = this.size * 0.7;
          
          ctx.beginPath();
          ctx.moveTo(0, r * 0.3);
          
          // Left half of heart
          ctx.bezierCurveTo(
            -r * 0.8, -r * 0.4,
            -r * 1.2, -r * 0.7,
            0, -r * 1.2
          );
          
          // Right half of heart
          ctx.bezierCurveTo(
            r * 1.2, -r * 0.7,
            r * 0.8, -r * 0.4,
            0, r * 0.3
          );
          
          ctx.fill();
          ctx.lineWidth = this.size * 0.03;
          ctx.stroke(); // Outline
          
          // Stem
          ctx.beginPath();
          ctx.lineWidth = this.size * 0.08;
          ctx.moveTo(0, r * 0.3);
          ctx.lineTo(0, r * 1.3);
          ctx.stroke();
          
          // Center vein
          ctx.beginPath();
          ctx.lineWidth = this.size * 0.05;
          ctx.moveTo(0, r * 0.3);
          ctx.lineTo(0, -r * 0.8);
          ctx.stroke();
        }
        else {
          // Round leaf with detailed veins
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.lineWidth = this.size * 0.03;
          ctx.stroke(); // Outline
          
          // Stem
          ctx.beginPath(); 
          ctx.lineWidth = this.size * 0.08;
          ctx.moveTo(0, -this.size * 0.2);
          ctx.lineTo(0, this.size * 1.1);
          ctx.stroke();
          
          // Veins - spoke pattern
          ctx.beginPath();
          ctx.lineWidth = this.size * 0.04;
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            ctx.moveTo(0, 0);
            const veinLength = this.size * 0.6;
            ctx.lineTo(
              Math.cos(angle) * veinLength,
              Math.sin(angle) * veinLength
            );
          }
          ctx.stroke();
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
</div>

<style>
  .leaf-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
</style>