import { HeroScene } from './components/HeroScene';
import { AboutScene } from './components/AboutScene';
import { tokens } from './tokens';

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

  console.log('Design Tokens + Three.js application initialized');
  console.log('Available tokens:', tokens);

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

// Expose debug function globally
(window as any).updateMouseDebug = updateMouseDebug;

// Export tokens for potential external use
export { tokens }; 