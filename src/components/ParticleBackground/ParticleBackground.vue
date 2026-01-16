<template>
  <canvas
    ref="canvasRef"
    class="particle-background"
    :class="{ 'particle-background--fixed': fixed }"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";

const props = defineProps({
  // Number of particles
  particleCount: {
    type: Number,
    default: 200,
  },
  // Particle color (CSS color string)
  particleColor: {
    type: String,
    default: "rgba(255, 255, 255, 0.8)",
  },
  // Minimum particle size in pixels
  minSize: {
    type: Number,
    default: 0.5,
  },
  // Maximum particle size in pixels
  maxSize: {
    type: Number,
    default: 2,
  },
  // Particle movement speed multiplier
  speed: {
    type: Number,
    default: 0.2,
  },
  // Enable twinkling effect
  twinkle: {
    type: Boolean,
    default: true,
  },
  // Enable parallax on mouse move
  parallax: {
    type: Boolean,
    default: false,
  },
  // Fixed position (covers viewport)
  fixed: {
    type: Boolean,
    default: false,
  },
});

const canvasRef = ref(null);
let ctx = null;
let particles = [];
let animationId = null;
let mouseX = 0;
let mouseY = 0;

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = props.minSize + Math.random() * (props.maxSize - props.minSize);
    this.speedX = (Math.random() - 0.5) * props.speed;
    this.speedY = (Math.random() - 0.5) * props.speed;
    this.opacity = 0.3 + Math.random() * 0.7;
    this.twinkleSpeed = 0.005 + Math.random() * 0.01;
    this.twinklePhase = Math.random() * Math.PI * 2;
    // Depth for parallax (0 = far, 1 = close)
    this.depth = Math.random();
  }

  update(deltaTime) {
    // Movement
    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;

    // Wrap around edges
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;

    // Twinkle effect
    if (props.twinkle) {
      this.twinklePhase += this.twinkleSpeed * deltaTime;
      this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.twinklePhase));
    } else {
      this.currentOpacity = this.opacity;
    }
  }

  draw(ctx, offsetX = 0, offsetY = 0) {
    const parallaxMultiplier = props.parallax ? this.depth * 0.02 : 0;
    const drawX = this.x + offsetX * parallaxMultiplier;
    const drawY = this.y + offsetY * parallaxMultiplier;

    ctx.beginPath();
    ctx.arc(drawX, drawY, this.size, 0, Math.PI * 2);
    ctx.fillStyle = props.particleColor.replace(
      /[\d.]+\)$/,
      `${this.currentOpacity})`
    );
    ctx.fill();

    // Add subtle glow for larger particles
    if (this.size > 1.2) {
      ctx.beginPath();
      ctx.arc(drawX, drawY, this.size * 2, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        drawX, drawY, 0,
        drawX, drawY, this.size * 2
      );
      gradient.addColorStop(0, props.particleColor.replace(/[\d.]+\)$/, `${this.currentOpacity * 0.3})`));
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
}

function initParticles() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  particles = [];
  for (let i = 0; i < props.particleCount; i++) {
    particles.push(new Particle(canvas));
  }
}

function resizeCanvas() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();

  // If canvas has no dimensions yet, retry after a frame
  if (rect.width === 0 || rect.height === 0) {
    requestAnimationFrame(resizeCanvas);
    return;
  }

  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  // Reinitialize particles with new dimensions
  initParticles();
}

let lastTime = 0;
function animate(currentTime) {
  const deltaTime = lastTime ? (currentTime - lastTime) / 16.67 : 1; // Normalize to ~60fps
  lastTime = currentTime;

  const canvas = canvasRef.value;
  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();

  // Clear canvas
  ctx.clearRect(0, 0, rect.width, rect.height);

  // Calculate parallax offset
  const offsetX = props.parallax ? (mouseX - rect.width / 2) : 0;
  const offsetY = props.parallax ? (mouseY - rect.height / 2) : 0;

  // Update and draw particles
  for (const particle of particles) {
    particle.update(deltaTime);
    particle.draw(ctx, offsetX, offsetY);
  }

  animationId = requestAnimationFrame(animate);
}

function handleMouseMove(e) {
  if (!props.parallax) return;
  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
}

function handleResize() {
  resizeCanvas();
}

onMounted(async () => {
  // Wait for layout to complete before measuring canvas
  await nextTick();

  // Additional delay to ensure CSS has been applied
  requestAnimationFrame(() => {
    resizeCanvas();
    animationId = requestAnimationFrame(animate);
  });

  window.addEventListener("resize", handleResize);
  if (props.parallax) {
    window.addEventListener("mousemove", handleMouseMove);
  }
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("mousemove", handleMouseMove);
});

// Watch for prop changes
watch(() => props.particleCount, initParticles);
watch(() => props.parallax, (newVal) => {
  if (newVal) {
    window.addEventListener("mousemove", handleMouseMove);
  } else {
    window.removeEventListener("mousemove", handleMouseMove);
  }
});
</script>

<style>
.particle-background {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle-background--fixed {
  position: fixed;
  inset: 0;
  z-index: 0;
}
</style>
