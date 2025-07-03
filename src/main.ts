import { HeroScene } from './components/HeroScene';
import { AboutScene } from './components/AboutScene';
import { tokens } from './tokens';
import { styleGauge, styleGaugeMapping } from './style-gauge-tokens';

// Initialize Three.js scenes
let heroScene: HeroScene | null = null;
let aboutScene: AboutScene | null = null;

// Initialize scenes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize hero scene
  const heroCanvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
  if (heroCanvas) {
    heroScene = new HeroScene(heroCanvas);
  }

  // Initialize about scene
  const aboutCanvas = document.getElementById('about-canvas') as HTMLCanvasElement;
  if (aboutCanvas) {
    aboutScene = new AboutScene(aboutCanvas);
  }

  // Add smooth scrolling for navigation
  setupSmoothScrolling();

  // Add interactive elements
  setupInteractions();

  // Add style gauge controls
  setupStyleGaugeControls();

  console.log('Design Tokens + Three.js application initialized');
  console.log('Available tokens:', tokens);
  console.log('Style gauge tokens:', styleGauge);

  // Update debug panel with token values
  updateDebugPanel();
});

// Setup smooth scrolling for navigation links
function setupSmoothScrolling(): void {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = (link as HTMLAnchorElement).getAttribute('href');
      if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Setup interactive elements
function setupInteractions(): void {
  // Hero CTA button
  const heroCta = document.querySelector('.hero__cta');
  if (heroCta) {
    heroCta.addEventListener('click', () => {
      const featuresSection = document.querySelector('#features');
      if (featuresSection) {
        featuresSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // Contact CTA button
  const contactCta = document.querySelector('.contact__cta');
  if (contactCta) {
    contactCta.addEventListener('click', () => {
      alert('Contact functionality would be implemented here!');
    });
  }

  // Add hover effects to feature cards
  const featureCards = document.querySelectorAll('.feature__card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover');
    });
  });
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (heroScene) {
    heroScene.destroy();
  }
  if (aboutScene) {
    aboutScene.destroy();
  }
});

// Update debug panel with current token values
function updateDebugPanel(): void {
  const primaryColorEl = document.getElementById('primary-color');
  const neutralColorEl = document.getElementById('neutral-color');
  const rippleCountEl = document.getElementById('ripple-count');
  const rippleSpeedEl = document.getElementById('ripple-speed');

  if (primaryColorEl) {
    primaryColorEl.textContent = tokens.three.shaders.colors.primary;
  }
  if (neutralColorEl) {
    neutralColorEl.textContent = tokens.three.shaders.colors.neutral;
  }
  if (rippleCountEl) {
    rippleCountEl.textContent = tokens.three.shaders.ripple.count.toString();
  }
  if (rippleSpeedEl) {
    rippleSpeedEl.textContent = tokens.three.shaders.ripple.speed.toString();
  }
}

// Update mouse debug info
function updateMouseDebug(mouseX: number, mouseY: number): void {
  const mouseXEl = document.getElementById('mouse-x');
  const mouseYEl = document.getElementById('mouse-y');
  const rippleCenterXEl = document.getElementById('ripple-center-x');
  const rippleCenterYEl = document.getElementById('ripple-center-y');

  if (mouseXEl) {
    mouseXEl.textContent = mouseX.toFixed(2);
  }
  if (mouseYEl) {
    mouseYEl.textContent = mouseY.toFixed(2);
  }
  if (rippleCenterXEl) {
    rippleCenterXEl.textContent = (0.5 + mouseX * 0.3).toFixed(2);
  }
  if (rippleCenterYEl) {
    rippleCenterYEl.textContent = (0.5 - mouseY * 0.3).toFixed(2);
  }
}

// Setup style gauge controls
function setupStyleGaugeControls(): void {
  // Create controls container
  const controlsContainer = document.createElement('div');
  controlsContainer.id = 'style-gauge-controls';
  controlsContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 8px;
    font-family: monospace;
    font-size: 12px;
    z-index: 1000;
    min-width: 200px;
  `;

  // Add title
  const title = document.createElement('h3');
  title.textContent = 'Style Gauge Controls';
  title.style.margin = '0 0 15px 0';
  controlsContainer.appendChild(title);

  // Create controls for each style gauge
  const gauges = [
    { name: 'depth', label: 'Depth', value: styleGauge.depth.medium },
    { name: 'motion', label: 'Motion', value: styleGauge.motion.smooth },
    { name: 'intensity', label: 'Intensity', value: styleGauge.intensity.moderate }
  ];

  gauges.forEach(gauge => {
    const container = document.createElement('div');
    container.style.marginBottom = '15px';

    const label = document.createElement('label');
    label.textContent = `${gauge.label}: `;
    label.style.display = 'block';
    label.style.marginBottom = '5px';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.01';
    slider.value = gauge.value.toString();
    slider.style.width = '100%';

    const valueDisplay = document.createElement('span');
    valueDisplay.textContent = gauge.value.toFixed(2);
    valueDisplay.style.marginLeft = '10px';

    slider.addEventListener('input', (e) => {
      const value = parseFloat((e.target as HTMLInputElement).value);
      valueDisplay.textContent = value.toFixed(2);
      updateStyleGauge(gauge.name, value);
    });

    container.appendChild(label);
    container.appendChild(slider);
    container.appendChild(valueDisplay);
    controlsContainer.appendChild(container);
  });

  document.body.appendChild(controlsContainer);
}

// Update style gauge values and apply to shader
function updateStyleGauge(gaugeName: string, value: number): void {
  if (!heroScene) return;

  // Get the material from the hero scene
  const material = (heroScene as any).plane?.material;
  if (!material || !material.uniforms) return;

  // Update the appropriate style gauge value
  switch (gaugeName) {
    case 'depth':
      const depthParams = styleGaugeMapping.depth.shader(value);
      material.uniforms.u_wave_amplitude.value = depthParams.vertexAmplitude;
      material.uniforms.u_highlight_power.value = depthParams.fragmentHighlight;
      material.uniforms.u_shadow_power.value = depthParams.fragmentShadow;
      break;
    
    case 'motion':
      const motionParams = styleGaugeMapping.motion.shader(value);
      material.uniforms.u_wave_frequency.value = motionParams.waveFrequency;
      material.uniforms.u_wave_speed.value = motionParams.waveSpeed;
      material.uniforms.u_twirl_intensity.value = motionParams.twirlIntensity;
      break;
    
    case 'intensity':
      const intensityParams = styleGaugeMapping.intensity.shader(value);
      material.uniforms.u_color_saturation.value = intensityParams.colorSaturation;
      material.uniforms.u_contrast_multiplier.value = intensityParams.contrastMultiplier;
      material.uniforms.u_noise_amount.value = intensityParams.noiseAmount;
      break;
  }

  console.log(`Updated ${gaugeName} to ${value}`);
}

// Expose debug function globally
(window as any).updateMouseDebug = updateMouseDebug;

// Export tokens for potential external use
export { tokens }; 