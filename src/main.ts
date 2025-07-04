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

  // Initialize text shadow with current depth value
  updateTextShadow(styleGauge.depth.medium);
  
  // Initialize button shadow with current depth value
  updateButtonShadow(styleGauge.depth.medium);
  
  // Initialize typography settings
  updateTypographySettings('headingFont', typographySettings.headingFont);
  updateTypographySettings('bodyFont', typographySettings.bodyFont);
  updateTypographySettings('fontWeight', typographySettings.fontWeight);
  updateTypographySettings('lineHeight', typographySettings.lineHeight);
  updateTypographySettings('baseFontSize', typographySettings.baseFontSize);
  updateTypographySettings('scaleRatio', typographySettings.scaleRatio);
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
  title.textContent = 'Design System Controls';
  title.style.margin = '0 0 15px 0';
  controlsContainer.appendChild(title);

  // Create controls for each style gauge
  const gauges = [
    { name: 'depth', label: 'Depth', value: styleGauge.depth.medium },
    { name: 'intensity', label: 'Intensity', value: styleGauge.intensity.moderate }
  ];

  // Helper function to create collapsible sections
  function createCollapsibleSection(title: string, isExpanded: boolean = true): { container: HTMLDivElement, content: HTMLDivElement } {
    const section = document.createElement('div');
    section.style.marginBottom = '15px';
    section.style.border = '1px solid #333';
    section.style.borderRadius = '4px';
    section.style.overflow = 'hidden';

    const header = document.createElement('div');
    header.style.cssText = `
      background: rgba(255, 255, 255, 0.1);
      padding: 10px 15px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
    `;

    const headerTitle = document.createElement('h4');
    headerTitle.textContent = title;
    headerTitle.style.margin = '0';
    headerTitle.style.fontSize = '14px';
    headerTitle.style.color = '#fff';

    const toggleIcon = document.createElement('span');
    toggleIcon.textContent = isExpanded ? '▼' : '▶';
    toggleIcon.style.fontSize = '12px';
    toggleIcon.style.color = '#ccc';

    header.appendChild(headerTitle);
    header.appendChild(toggleIcon);

    const content = document.createElement('div');
    content.style.cssText = `
      padding: 15px;
      display: ${isExpanded ? 'block' : 'none'};
    `;

    section.appendChild(header);
    section.appendChild(content);

    // Toggle functionality
    header.addEventListener('click', () => {
      const isVisible = content.style.display !== 'none';
      content.style.display = isVisible ? 'none' : 'block';
      toggleIcon.textContent = isVisible ? '▶' : '▼';
    });

    return { container: section, content };
  }

  // Create General Controls Section
  const generalSection = createCollapsibleSection('General Controls', true);
  const generalContent = generalSection.content;

  // Add primary color controller
  const primaryColorContainer = document.createElement('div');
  primaryColorContainer.style.marginBottom = '15px';

  const primaryColorLabel = document.createElement('label');
  primaryColorLabel.textContent = 'Primary Color: ';
  primaryColorLabel.style.display = 'block';
  primaryColorLabel.style.marginBottom = '5px';

  const primaryColorInput = document.createElement('input');
  primaryColorInput.type = 'color';
  primaryColorInput.value = tokens.three.shaders.colors.primary;
  primaryColorInput.style.width = '100%';
  primaryColorInput.style.height = '30px';
  primaryColorInput.style.border = 'none';
  primaryColorInput.style.borderRadius = '4px';

  const primaryColorValueDisplay = document.createElement('span');
  primaryColorValueDisplay.textContent = tokens.three.shaders.colors.primary;
  primaryColorValueDisplay.style.marginLeft = '10px';
  primaryColorValueDisplay.style.fontSize = '10px';

  primaryColorInput.addEventListener('input', (e) => {
    const newColor = (e.target as HTMLInputElement).value;
    primaryColorValueDisplay.textContent = newColor;
    updatePrimaryColor(newColor);
  });

  primaryColorContainer.appendChild(primaryColorLabel);
  primaryColorContainer.appendChild(primaryColorInput);
  primaryColorContainer.appendChild(primaryColorValueDisplay);
  generalContent.appendChild(primaryColorContainer);

  // Add neutral color selector
  const neutralColorContainer = document.createElement('div');
  neutralColorContainer.style.marginBottom = '15px';

  const neutralColorLabel = document.createElement('label');
  neutralColorLabel.textContent = 'Neutral Color: ';
  neutralColorLabel.style.display = 'block';
  neutralColorLabel.style.marginBottom = '5px';

  const neutralColorSelect = document.createElement('select');
  neutralColorSelect.style.width = '100%';
  neutralColorSelect.style.padding = '5px';
  neutralColorSelect.style.borderRadius = '4px';
  neutralColorSelect.style.border = '1px solid #ccc';

  // Define neutral color options from design tokens
  const neutralColors = [
    { value: '#171717', label: 'Neutral 50 (Darkest)' },
    { value: '#262626', label: 'Neutral 100' },
    { value: '#404040', label: 'Neutral 200 (Current)' },
    { value: '#525252', label: 'Neutral 300' },
    { value: '#737373', label: 'Neutral 400' },
    { value: '#a3a3a3', label: 'Neutral 500' },
    { value: '#d4d4d4', label: 'Neutral 600' },
    { value: '#e5e5e5', label: 'Neutral 700' },
    { value: '#f5f5f5', label: 'Neutral 800' },
    { value: '#fafafa', label: 'Neutral 900 (Lightest)' }
  ];

  neutralColors.forEach(neutral => {
    const option = document.createElement('option');
    option.value = neutral.value;
    option.textContent = neutral.label;
    option.style.backgroundColor = neutral.value;
    option.style.color = neutral.value === '#fafafa' || neutral.value === '#f5f5f5' ? '#000000' : '#ffffff';
    if (neutral.value === tokens.three.shaders.colors.neutral) {
      option.selected = true;
    }
    neutralColorSelect.appendChild(option);
  });

  neutralColorSelect.addEventListener('change', (e) => {
    const newNeutralColor = (e.target as HTMLSelectElement).value;
    updateNeutralColor(newNeutralColor);
  });

  neutralColorContainer.appendChild(neutralColorLabel);
  neutralColorContainer.appendChild(neutralColorSelect);
  generalContent.appendChild(neutralColorContainer);

  // Add text color selection
  const textColorContainer = document.createElement('div');
  textColorContainer.style.marginBottom = '15px';

  const textColorLabel = document.createElement('label');
  textColorLabel.textContent = 'Text Color: ';
  textColorLabel.style.display = 'block';
  textColorLabel.style.marginBottom = '5px';

  const textColorSelect = document.createElement('select');
  textColorSelect.style.width = '100%';
  textColorSelect.style.padding = '5px';
  textColorSelect.style.borderRadius = '4px';
  textColorSelect.style.border = '1px solid #ccc';

  const textColorOptions = [
    { value: 'primary', label: 'Primary Color' },
    { value: 'opposite-neutral', label: 'Opposite Neutral' }
  ];

  textColorOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    textColorSelect.appendChild(optionElement);
  });

  // Default to opposite neutral
  textColorSelect.value = 'opposite-neutral';

  textColorSelect.addEventListener('change', (e) => {
    const textColorMode = (e.target as HTMLSelectElement).value as 'primary' | 'opposite-neutral';
    updateTextColorMode(textColorMode);
  });

  textColorContainer.appendChild(textColorLabel);
  textColorContainer.appendChild(textColorSelect);
  generalContent.appendChild(textColorContainer);

  // Add button color selection
  const buttonColorContainer = document.createElement('div');
  buttonColorContainer.style.marginBottom = '15px';

  const buttonColorLabel = document.createElement('label');
  buttonColorLabel.textContent = 'Button Color: ';
  buttonColorLabel.style.display = 'block';
  buttonColorLabel.style.marginBottom = '5px';

  const buttonColorSelect = document.createElement('select');
  buttonColorSelect.style.width = '100%';
  buttonColorSelect.style.padding = '5px';
  buttonColorSelect.style.borderRadius = '4px';
  buttonColorSelect.style.border = '1px solid #ccc';

  const buttonColorOptions = [
    { value: 'primary', label: 'Primary Color' },
    { value: 'opposite-neutral', label: 'Opposite Neutral' }
  ];

  buttonColorOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    buttonColorSelect.appendChild(optionElement);
  });

  // Default to primary
  buttonColorSelect.value = 'primary';

  buttonColorSelect.addEventListener('change', (e) => {
    const buttonColorMode = (e.target as HTMLSelectElement).value as 'primary' | 'opposite-neutral';
    updateButtonColorMode(buttonColorMode);
  });

  buttonColorContainer.appendChild(buttonColorLabel);
  buttonColorContainer.appendChild(buttonColorSelect);
  generalContent.appendChild(buttonColorContainer);

  // Create Typography Controls Section
  const typographySection = createCollapsibleSection('Typography Controls', false);
  const typographyContent = typographySection.content;

  // Font family selection
  const fontFamilyContainer = document.createElement('div');
  fontFamilyContainer.style.marginBottom = '15px';

  const fontFamilyLabel = document.createElement('label');
  fontFamilyLabel.textContent = 'Heading Font: ';
  fontFamilyLabel.style.display = 'block';
  fontFamilyLabel.style.marginBottom = '5px';

  const headingFontSelect = document.createElement('select');
  headingFontSelect.style.width = '100%';
  headingFontSelect.style.padding = '5px';
  headingFontSelect.style.borderRadius = '4px';
  headingFontSelect.style.border = '1px solid #ccc';

  const bodyFontLabel = document.createElement('label');
  bodyFontLabel.textContent = 'Body Font: ';
  bodyFontLabel.style.display = 'block';
  bodyFontLabel.style.marginBottom = '5px';

  const bodyFontSelect = document.createElement('select');
  bodyFontSelect.style.width = '100%';
  bodyFontSelect.style.padding = '5px';
  bodyFontSelect.style.borderRadius = '4px';
  bodyFontSelect.style.border = '1px solid #ccc';

  // Populate font options (Google Fonts - variable fonts only)
  const googleFonts = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Source Sans Pro', label: 'Source Sans Pro' },
    { value: 'Nunito', label: 'Nunito' },
    { value: 'Ubuntu', label: 'Ubuntu' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Raleway', label: 'Raleway' }
  ];

  googleFonts.forEach(font => {
    const headingOption = document.createElement('option');
    headingOption.value = font.value;
    headingOption.textContent = font.label;
    headingFontSelect.appendChild(headingOption);

    const bodyOption = document.createElement('option');
    bodyOption.value = font.value;
    bodyOption.textContent = font.label;
    bodyFontSelect.appendChild(bodyOption);
  });

  // Set defaults
  headingFontSelect.value = 'Inter';
  bodyFontSelect.value = 'Inter';

  headingFontSelect.addEventListener('change', (e) => {
    const fontFamily = (e.target as HTMLSelectElement).value;
    updateTypographySettings('headingFont', fontFamily);
  });

  bodyFontSelect.addEventListener('change', (e) => {
    const fontFamily = (e.target as HTMLSelectElement).value;
    updateTypographySettings('bodyFont', fontFamily);
  });

  fontFamilyContainer.appendChild(fontFamilyLabel);
  fontFamilyContainer.appendChild(headingFontSelect);
  fontFamilyContainer.appendChild(bodyFontLabel);
  fontFamilyContainer.appendChild(bodyFontSelect);
  typographyContent.appendChild(fontFamilyContainer);

  // Font weight selection
  const fontWeightContainer = document.createElement('div');
  fontWeightContainer.style.marginBottom = '15px';

  const fontWeightLabel = document.createElement('label');
  fontWeightLabel.textContent = 'Font Weight: ';
  fontWeightLabel.style.display = 'block';
  fontWeightLabel.style.marginBottom = '5px';

  const fontWeightSelect = document.createElement('select');
  fontWeightSelect.style.width = '100%';
  fontWeightSelect.style.padding = '5px';
  fontWeightSelect.style.borderRadius = '4px';
  fontWeightSelect.style.border = '1px solid #ccc';

  const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  weights.forEach(weight => {
    const option = document.createElement('option');
    option.value = weight.toString();
    option.textContent = `${weight} (${getWeightName(weight)})`;
    fontWeightSelect.appendChild(option);
  });

  fontWeightSelect.value = '400';

  fontWeightSelect.addEventListener('change', (e) => {
    const weight = parseInt((e.target as HTMLSelectElement).value);
    updateTypographySettings('fontWeight', weight);
  });

  fontWeightContainer.appendChild(fontWeightLabel);
  fontWeightContainer.appendChild(fontWeightSelect);
  typographyContent.appendChild(fontWeightContainer);

  // Line height selection
  const lineHeightContainer = document.createElement('div');
  lineHeightContainer.style.marginBottom = '15px';

  const lineHeightLabel = document.createElement('label');
  lineHeightLabel.textContent = 'Line Height: ';
  lineHeightLabel.style.display = 'block';
  lineHeightLabel.style.marginBottom = '5px';

  const lineHeightSelect = document.createElement('select');
  lineHeightSelect.style.width = '100%';
  lineHeightSelect.style.padding = '5px';
  lineHeightSelect.style.borderRadius = '4px';
  lineHeightSelect.style.border = '1px solid #ccc';

  const lineHeights = [
    { value: 1.0, label: '1.0 (Tight)' },
    { value: 1.2, label: '1.2' },
    { value: 1.4, label: '1.4' },
    { value: 1.5, label: '1.5 (Normal)' },
    { value: 1.6, label: '1.6' },
    { value: 1.8, label: '1.8' },
    { value: 2.0, label: '2.0 (Loose)' }
  ];

  lineHeights.forEach(lh => {
    const option = document.createElement('option');
    option.value = lh.value.toString();
    option.textContent = lh.label;
    lineHeightSelect.appendChild(option);
  });

  lineHeightSelect.value = '1.5';

  lineHeightSelect.addEventListener('change', (e) => {
    const lineHeight = parseFloat((e.target as HTMLSelectElement).value);
    updateTypographySettings('lineHeight', lineHeight);
  });

  lineHeightContainer.appendChild(lineHeightLabel);
  lineHeightContainer.appendChild(lineHeightSelect);
  typographyContent.appendChild(lineHeightContainer);

  // Base font size
  const baseFontSizeContainer = document.createElement('div');
  baseFontSizeContainer.style.marginBottom = '15px';

  const baseFontSizeLabel = document.createElement('label');
  baseFontSizeLabel.textContent = 'Base Font Size (rem): ';
  baseFontSizeLabel.style.display = 'block';
  baseFontSizeLabel.style.marginBottom = '5px';

  const baseFontSizeSlider = document.createElement('input');
  baseFontSizeSlider.type = 'range';
  baseFontSizeSlider.min = '0.75';
  baseFontSizeSlider.max = '1.25';
  baseFontSizeSlider.step = '0.05';
  baseFontSizeSlider.value = '1.0';
  baseFontSizeSlider.style.width = '100%';

  const baseFontSizeValue = document.createElement('span');
  baseFontSizeValue.textContent = '1.00rem';
  baseFontSizeValue.style.marginLeft = '10px';
  baseFontSizeValue.style.fontSize = '10px';

  baseFontSizeSlider.addEventListener('input', (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    baseFontSizeValue.textContent = `${value.toFixed(2)}rem`;
    updateTypographySettings('baseFontSize', value);
  });

  baseFontSizeContainer.appendChild(baseFontSizeLabel);
  baseFontSizeContainer.appendChild(baseFontSizeSlider);
  baseFontSizeContainer.appendChild(baseFontSizeValue);
  typographyContent.appendChild(baseFontSizeContainer);

  // Scale ratio
  const scaleRatioContainer = document.createElement('div');
  scaleRatioContainer.style.marginBottom = '15px';

  const scaleRatioLabel = document.createElement('label');
  scaleRatioLabel.textContent = 'Scale Ratio: ';
  scaleRatioLabel.style.display = 'block';
  scaleRatioLabel.style.marginBottom = '5px';

  const scaleRatioSlider = document.createElement('input');
  scaleRatioSlider.type = 'range';
  scaleRatioSlider.min = '1.075';
  scaleRatioSlider.max = '2.0';
  scaleRatioSlider.step = '0.025';
  scaleRatioSlider.value = '1.25';
  scaleRatioSlider.style.width = '100%';

  const scaleRatioValue = document.createElement('span');
  scaleRatioValue.textContent = '1.25 (Major Third)';
  scaleRatioValue.style.marginLeft = '10px';
  scaleRatioValue.style.fontSize = '10px';

  scaleRatioSlider.addEventListener('input', (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    scaleRatioValue.textContent = `${value.toFixed(3)} (${getScaleName(value)})`;
    updateTypographySettings('scaleRatio', value);
  });

  scaleRatioContainer.appendChild(scaleRatioLabel);
  scaleRatioContainer.appendChild(scaleRatioSlider);
  scaleRatioContainer.appendChild(scaleRatioValue);
  typographyContent.appendChild(scaleRatioContainer);

  // Create Shader Controls Section
  const shaderSection = createCollapsibleSection('Shader Controls', true);
  const shaderContent = shaderSection.content;

  // Add line ratio controller
  const lineRatioContainer = document.createElement('div');
  lineRatioContainer.style.marginBottom = '15px';

  const lineRatioLabel = document.createElement('label');
  lineRatioLabel.textContent = 'Line Ratio: ';
  lineRatioLabel.style.display = 'block';
  lineRatioLabel.style.marginBottom = '5px';

  const lineRatioSlider = document.createElement('input');
  lineRatioSlider.type = 'range';
  lineRatioSlider.min = '0';
  lineRatioSlider.max = '1';
  lineRatioSlider.step = '0.01';
  lineRatioSlider.value = '0.5'; // Default to equal
  lineRatioSlider.style.width = '100%';

  const lineRatioValueDisplay = document.createElement('span');
  lineRatioValueDisplay.textContent = '0.50 (Equal)';
  lineRatioValueDisplay.style.marginLeft = '10px';
  lineRatioValueDisplay.style.fontSize = '10px';

  lineRatioSlider.addEventListener('input', (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    lineRatioValueDisplay.textContent = value.toFixed(2) + getLineRatioDescription(value);
    updateLineRatio(value);
  });

  lineRatioContainer.appendChild(lineRatioLabel);
  lineRatioContainer.appendChild(lineRatioSlider);
  lineRatioContainer.appendChild(lineRatioValueDisplay);
  shaderContent.appendChild(lineRatioContainer);

  // Add style gauge controls
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
    shaderContent.appendChild(container);
  });

  // Add all sections to main container
  controlsContainer.appendChild(generalSection.container);
  controlsContainer.appendChild(typographySection.container);
  controlsContainer.appendChild(shaderSection.container);

  document.body.appendChild(controlsContainer);
}

// Update primary color and apply to shader and UI
function updatePrimaryColor(newColor: string): void {
  if (!heroScene) return;

  // Update the token
  tokens.three.shaders.colors.primary = newColor;

  // Update the shader uniform using the HeroScene method
  heroScene.updatePrimaryColor(newColor);

  // Update UI elements that use the primary color
  updateUIWithPrimaryColor(newColor);

  // Update debug panel
  const primaryColorEl = document.getElementById('primary-color');
  if (primaryColorEl) {
    primaryColorEl.textContent = newColor;
  }

  console.log(`Updated primary color to ${newColor}`);
}

// Update neutral color and apply to shader
function updateNeutralColor(newColor: string): void {
  if (!heroScene) return;

  // Update the token
  tokens.three.shaders.colors.neutral = newColor;

  // Update the shader uniform using the HeroScene method
  heroScene.updateNeutralColor(newColor);

  // Update debug panel
  const neutralColorEl = document.getElementById('neutral-color');
  if (neutralColorEl) {
    neutralColorEl.textContent = newColor;
  }

  // Re-apply text colors if using opposite neutral mode
  if (currentTextColorMode === 'opposite-neutral') {
    updateUIWithPrimaryColor(tokens.three.shaders.colors.primary);
  }

  console.log(`Updated neutral color to ${newColor}`);
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number, g: number, b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

// Calculate relative luminance for contrast ratio
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const lum1 = getRelativeLuminance(rgb1.r * 255, rgb1.g * 255, rgb1.b * 255);
  const lum2 = getRelativeLuminance(rgb2.r * 255, rgb2.g * 255, rgb2.b * 255);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

// Get best contrasting neutral color for a background
function getBestContrastingNeutral(backgroundColor: string): string {
  const neutralColors = [
    '#171717', // Darkest
    '#262626',
    '#404040',
    '#525252',
    '#737373',
    '#a3a3a3',
    '#d4d4d4',
    '#e5e5e5',
    '#f5f5f5',
    '#fafafa'  // Lightest
  ];
  
  let bestContrast = 0;
  let bestColor = '#171717'; // Default to darkest
  
  neutralColors.forEach(neutralColor => {
    const contrast = getContrastRatio(backgroundColor, neutralColor);
    if (contrast > bestContrast) {
      bestContrast = contrast;
      bestColor = neutralColor;
    }
  });
  
  console.log(`Best neutral for background ${backgroundColor}: ${bestColor} (contrast: ${bestContrast.toFixed(2)})`);
  return bestColor;
}

// Get best contrasting color from all available colors (primary + neutrals)
function getBestContrastingColor(backgroundColor: string): string {
  const primaryColor = tokens.three.shaders.colors.primary;
  const neutralColors = [
    '#171717', // Darkest
    '#262626',
    '#404040',
    '#525252',
    '#737373',
    '#a3a3a3',
    '#d4d4d4',
    '#e5e5e5',
    '#f5f5f5',
    '#fafafa'  // Lightest
  ];
  
  // All available colors: primary + neutrals
  const allColors = [primaryColor, ...neutralColors];
  
  let bestContrast = 0;
  let bestColor = primaryColor; // Default to primary
  
  allColors.forEach(color => {
    const contrast = getContrastRatio(backgroundColor, color);
    if (contrast > bestContrast) {
      bestContrast = contrast;
      bestColor = color;
    }
  });
  
  console.log(`Best color for background ${backgroundColor}: ${bestColor} (contrast: ${bestContrast.toFixed(2)})`);
  return bestColor;
}

// Get best contrasting neutral color against the dominant background
function getBestContrastingNeutralForDominantBackground(): string {
  const dominantBackground = getDominantBackgroundColor();
  return getBestContrastingNeutral(dominantBackground);
}

// Get the best text color based on color mode and dominant background
function getBestTextColor(): string {
  const primaryColor = tokens.three.shaders.colors.primary;
  const neutralColor = tokens.three.shaders.colors.neutral;
  const dominantBackground = getDominantBackgroundColor();
  
  console.log(`=== getBestTextColor() DEBUG ===`);
  console.log(`Primary color: ${primaryColor}`);
  console.log(`Neutral color: ${neutralColor}`);
  console.log(`Dominant background: ${dominantBackground}`);
  console.log(`Current text color mode: ${currentTextColorMode}`);
  console.log(`Line ratio: ${currentLineRatio}`);
  
  // Case 1: Primary mode + Neutral dominant → Use Primary color
  if (currentTextColorMode === 'primary' && dominantBackground === neutralColor) {
    console.log(`✅ Case 1 MATCHED: Primary mode + Neutral dominant → Using primary color: ${primaryColor}`);
    return primaryColor;
  } else {
    console.log(`❌ Case 1 NOT MATCHED: mode=${currentTextColorMode} (expected 'primary'), dominant=${dominantBackground} (expected ${neutralColor})`);
  }
  
  // Case 2: Primary mode + Primary dominant → Use shader's neutral color
  if (currentTextColorMode === 'primary' && dominantBackground === primaryColor) {
    console.log(`✅ Case 2 MATCHED: Primary mode + Primary dominant → Using shader's neutral color: ${neutralColor}`);
    return neutralColor;
  } else {
    console.log(`❌ Case 2 NOT MATCHED: mode=${currentTextColorMode} (expected 'primary'), dominant=${dominantBackground} (expected ${primaryColor})`);
  }
  
  // Case 3: Neutral contrast mode + Neutral dominant → Use Best contrasting color to neutral
  if (currentTextColorMode === 'opposite-neutral' && dominantBackground === neutralColor) {
    const bestContrastingColor = getBestContrastingColor(neutralColor);
    console.log(`✅ Case 3 MATCHED: Neutral contrast mode + Neutral dominant → Using best contrasting color: ${bestContrastingColor}`);
    return bestContrastingColor;
  } else {
    console.log(`❌ Case 3 NOT MATCHED: mode=${currentTextColorMode} (expected 'opposite-neutral'), dominant=${dominantBackground} (expected ${neutralColor})`);
  }
  
  // Case 4: Neutral contrast mode + Primary dominant → Use Best contrasting neutral to primary
  if (currentTextColorMode === 'opposite-neutral' && dominantBackground === primaryColor) {
    const bestContrastingNeutral = getBestContrastingNeutral(primaryColor);
    console.log(`✅ Case 4 MATCHED: Neutral contrast mode + Primary dominant → Using best contrasting neutral: ${bestContrastingNeutral}`);
    return bestContrastingNeutral;
  } else {
    console.log(`❌ Case 4 NOT MATCHED: mode=${currentTextColorMode} (expected 'opposite-neutral'), dominant=${dominantBackground} (expected ${primaryColor})`);
  }
  
  // Fallback
  console.log(`⚠️ FALLBACK: No cases matched, using primary color: ${primaryColor}`);
  return primaryColor;
}

// Get the best button text color based on button color mode and button background
function getBestButtonTextColor(buttonBackgroundColor: string): string {
  const primaryColor = tokens.three.shaders.colors.primary;
  const neutralColor = tokens.three.shaders.colors.neutral;
  
  // If button background is primary color
  if (buttonBackgroundColor === primaryColor) {
    // Use best contrasting neutral to primary
    const bestContrastingNeutral = getBestContrastingNeutral(primaryColor);
    console.log(`Button primary background → Using best contrasting neutral: ${bestContrastingNeutral}`);
    return bestContrastingNeutral;
  }
  
  // If button background is neutral color
  if (buttonBackgroundColor === neutralColor) {
    // Use primary color for text
    console.log(`Button neutral background → Using primary color: ${primaryColor}`);
    return primaryColor;
  }
  
  // For any other neutral color background, use primary color
  console.log(`Button other neutral background → Using primary color: ${primaryColor}`);
  return primaryColor;
}

// Typography helper functions
function getWeightName(weight: number): string {
  const weightNames: { [key: number]: string } = {
    100: 'Thin',
    200: 'Extra Light',
    300: 'Light',
    400: 'Normal',
    500: 'Medium',
    600: 'Semi Bold',
    700: 'Bold',
    800: 'Extra Bold',
    900: 'Black'
  };
  return weightNames[weight] || 'Normal';
}

function getScaleName(ratio: number): string {
  const scaleNames: { [key: number]: string } = {
    1.067: 'Minor Second',
    1.125: 'Major Second',
    1.2: 'Minor Third',
    1.25: 'Major Third',
    1.333: 'Perfect Fourth',
    1.414: 'Augmented Fourth',
    1.5: 'Perfect Fifth',
    1.618: 'Golden Ratio',
    1.667: 'Minor Sixth',
    1.778: 'Major Sixth',
    1.875: 'Minor Seventh',
    2.0: 'Octave'
  };
  
  // Find closest match
  const ratios = Object.keys(scaleNames).map(Number).sort((a, b) => a - b);
  const closest = ratios.reduce((prev, curr) => 
    Math.abs(curr - ratio) < Math.abs(prev - ratio) ? curr : prev
  );
  
  return scaleNames[closest] || 'Custom';
}

// Typography settings interface
interface TypographySettings {
  headingFont: string;
  bodyFont: string;
  fontWeight: number;
  lineHeight: number;
  baseFontSize: number;
  scaleRatio: number;
}

// Global typography settings
let typographySettings: TypographySettings = {
  headingFont: 'Inter',
  bodyFont: 'Inter',
  fontWeight: 400,
  lineHeight: 1.5,
  baseFontSize: 1.0,
  scaleRatio: 1.25
};

// Calculate font sizes based on modular scale
function calculateFontSizes(baseSize: number, ratio: number): { [key: string]: string } {
  const sizes: { [key: string]: string } = {};
  
  // Body and small text (negative scale)
  sizes.small = `${(baseSize / Math.pow(ratio, 1)).toFixed(3)}rem`;
  sizes.body = `${baseSize}rem`;
  sizes.large = `${(baseSize * ratio).toFixed(3)}rem`;
  
  // Headings (positive scale)
  sizes.h6 = `${(baseSize * ratio).toFixed(3)}rem`;
  sizes.h5 = `${(baseSize * Math.pow(ratio, 2)).toFixed(3)}rem`;
  sizes.h4 = `${(baseSize * Math.pow(ratio, 3)).toFixed(3)}rem`;
  sizes.h3 = `${(baseSize * Math.pow(ratio, 4)).toFixed(3)}rem`;
  sizes.h2 = `${(baseSize * Math.pow(ratio, 5)).toFixed(3)}rem`;
  sizes.h1 = `${(baseSize * Math.pow(ratio, 6)).toFixed(3)}rem`;
  sizes.display = `${(baseSize * Math.pow(ratio, 7)).toFixed(3)}rem`;
  
  return sizes;
}

// Update typography settings
function updateTypographySettings(setting: keyof TypographySettings, value: string | number): void {
  (typographySettings as any)[setting] = value;
  
  // Load Google Fonts if needed
  loadGoogleFonts(typographySettings.headingFont, typographySettings.bodyFont);
  
  // Calculate new font sizes
  const fontSizes = calculateFontSizes(typographySettings.baseFontSize, typographySettings.scaleRatio);
  
  // Update CSS custom properties
  document.documentElement.style.setProperty('--sys-typography-font-family-heading', `"${typographySettings.headingFont}", system-ui, sans-serif`);
  document.documentElement.style.setProperty('--sys-typography-font-family-body', `"${typographySettings.bodyFont}", system-ui, sans-serif`);
  document.documentElement.style.setProperty('--sys-typography-font-weight-body', typographySettings.fontWeight.toString());
  document.documentElement.style.setProperty('--sys-typography-line-height-body', typographySettings.lineHeight.toString());
  
  // Update font sizes
  Object.entries(fontSizes).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--sys-typography-font-size-${key}`, value);
  });
  
  console.log(`Updated typography: ${setting} = ${value}`);
}

// Load Google Fonts
function loadGoogleFonts(headingFont: string, bodyFont: string): void {
  const fonts = [...new Set([headingFont, bodyFont])]; // Remove duplicates
  const fontLinks = fonts.map(font => 
    `https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}:wght@100;200;300;400;500;600;700;800;900&display=swap`
  );
  
  // Remove existing font links
  const existingLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
  existingLinks.forEach(link => link.remove());
  
  // Add new font links
  fontLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
}

// Global variables to track color modes and line ratio
let currentTextColorMode: 'primary' | 'opposite-neutral' = 'opposite-neutral';
let currentButtonColorMode: 'primary' | 'opposite-neutral' = 'primary';
let currentLineRatio: number = 0.5; // Default to equal

// Update text color mode
function updateTextColorMode(mode: 'primary' | 'opposite-neutral'): void {
  currentTextColorMode = mode;
  
  // Re-apply colors based on current mode
  if (heroScene) {
    updateUIWithPrimaryColor(tokens.three.shaders.colors.primary);
  }
}

// Update button color mode
function updateButtonColorMode(mode: 'primary' | 'opposite-neutral'): void {
  currentButtonColorMode = mode;
  
  // Re-apply colors based on current mode
  if (heroScene) {
    updateUIWithPrimaryColor(tokens.three.shaders.colors.primary);
  }
}

// Get the dominant background color based on line ratio
function getDominantBackgroundColor(): string {
  // Based on user requirement:
  // Line ratio < 0.5: Primary color is dominant (text should be neutral when mode is primary)
  // Line ratio >= 0.5: Neutral color is dominant (text should be primary when mode is primary)
  const dominantColor = currentLineRatio < 0.5 ? tokens.three.shaders.colors.primary : tokens.three.shaders.colors.neutral;
  
  console.log(`=== getDominantBackgroundColor() DEBUG ===`);
  console.log(`Line ratio: ${currentLineRatio}`);
  console.log(`Primary color: ${tokens.three.shaders.colors.primary}`);
  console.log(`Neutral color: ${tokens.three.shaders.colors.neutral}`);
  console.log(`Is line ratio < 0.5? ${currentLineRatio < 0.5}`);
  console.log(`Dominant color determined: ${dominantColor}`);
  console.log(`Expected behavior: ${currentLineRatio < 0.5 ? 'Primary dominant (text should be neutral)' : 'Neutral dominant (text should be primary)'}`);
  
  return dominantColor;
}

// Get the opposite neutral color based on current shader neutral
function getOppositeNeutralColor(): string {
  const currentNeutral = tokens.three.shaders.colors.neutral;
  
  // If current neutral is dark, use lightest neutral
  if (['#171717', '#262626', '#404040', '#525252', '#737373'].includes(currentNeutral)) {
    return '#fafafa'; // Lightest neutral
  } else {
    return '#171717'; // Darkest neutral
  }
}

// Get description for line ratio value
function getLineRatioDescription(value: number): string {
  if (value === 0) return ' (Primary Thin)';
  if (value === 0.5) return ' (Equal)';
  if (value === 1) return ' (Neutral Thin)';
  if (value < 0.5) return ' (Primary Dominant)';
  return ' (Neutral Dominant)';
}

// Update line ratio in shader
function updateLineRatio(value: number): void {
  if (!heroScene) return;

  // Store the current line ratio value
  currentLineRatio = value;

  // Update the shader uniform using the HeroScene method
  heroScene.updateLineRatio(value);

  // Update debug panel
  const lineRatioEl = document.getElementById('line-ratio');
  if (lineRatioEl) {
    lineRatioEl.textContent = value.toFixed(2);
  }

  // Log current state for debugging
  console.log(`=== Line Ratio Update ===`);
  console.log(`Line ratio: ${value}`);
  console.log(`Primary color: ${tokens.three.shaders.colors.primary}`);
  console.log(`Neutral color: ${tokens.three.shaders.colors.neutral}`);
  console.log(`Dominant background: ${getDominantBackgroundColor()}`);
  console.log(`Text color mode: ${currentTextColorMode}`);
  console.log(`Button color mode: ${currentButtonColorMode}`);

  // Re-apply colors to ensure contrast is calculated against the dominant color
  updateUIWithPrimaryColor(tokens.three.shaders.colors.primary);

  console.log(`Updated line ratio to ${value}`);
}

// Update text shadow based on depth value
function updateTextShadow(depthValue: number): void {
  // Calculate text shadow properties based on depth
  // 0.0 = no shadow (transparent), 1.0 = 8px spread with 33% opacity
  const shadowSpread = depthValue * 8; // 0px to 8px
  const shadowOpacity = depthValue * 0.33; // 0% to 33%
  
  // Create text shadow CSS value
  const textShadow = depthValue > 0 
    ? `0 2px ${shadowSpread}px rgba(0, 0, 0, ${shadowOpacity})`
    : 'none';
  
  // Apply to hero title and subtitle
  const heroTitle = document.querySelector('.hero__title');
  const heroSubtitle = document.querySelector('.hero__subtitle');
  
  if (heroTitle instanceof HTMLElement) {
    heroTitle.style.textShadow = textShadow;
  }
  
  if (heroSubtitle instanceof HTMLElement) {
    heroSubtitle.style.textShadow = textShadow;
  }
  
  console.log(`Updated text shadow: spread=${shadowSpread}px, opacity=${shadowOpacity}`);
}

// Update button box shadow based on depth value
function updateButtonShadow(depthValue: number): void {
  // Calculate box shadow properties based on depth
  // 0.0 = no shadow, 1.0 = 0.33 opacity, 4px blur, 2px right and bottom offset
  const shadowBlur = depthValue * 4; // 0px to 4px
  const shadowOffsetX = depthValue * 2; // 0px to 2px (right)
  const shadowOffsetY = depthValue * 2; // 0px to 2px (bottom)
  const shadowOpacity = depthValue * 0.33; // 0% to 33%
  
  // Create box shadow CSS value
  const boxShadow = depthValue > 0 
    ? `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`
    : 'none';
  
  // Apply to hero CTA button
  const heroCta = document.querySelector('.hero__cta');
  
  if (heroCta instanceof HTMLElement) {
    heroCta.style.boxShadow = boxShadow;
  }
  
  console.log(`Updated button shadow: offsetX=${shadowOffsetX}px, offsetY=${shadowOffsetY}px, blur=${shadowBlur}px, opacity=${shadowOpacity}`);
}

// Update UI elements with new primary color
function updateUIWithPrimaryColor(color: string): void {
  // Update CSS custom properties
  document.documentElement.style.setProperty('--color-primary', color);
  
  // Update specific elements that use primary color
  const primaryElements = document.querySelectorAll('[data-color="primary"]');
  primaryElements.forEach(element => {
    if (element instanceof HTMLElement) {
      element.style.color = color;
    }
  });

  // Update background elements
  const primaryBgElements = document.querySelectorAll('[data-bg-color="primary"]');
  primaryBgElements.forEach(element => {
    if (element instanceof HTMLElement) {
      element.style.backgroundColor = color;
    }
  });

  // Apply color to all hero content on top of the shader
  const heroContentElements = document.querySelectorAll('.hero__title, .hero__subtitle, .hero__cta');
  heroContentElements.forEach(element => {
    if (element instanceof HTMLElement) {
      if (element.classList.contains('hero__cta')) {
        // For the CTA button, use selected button color mode
        const buttonBackgroundColor = currentButtonColorMode === 'primary' ? color : getOppositeNeutralColor();
        element.style.setProperty('background-color', buttonBackgroundColor, 'important');
        element.style.setProperty('border-color', buttonBackgroundColor, 'important');
        
        // Determine button text color using independent contrast calculation
        const buttonTextColor = getBestButtonTextColor(buttonBackgroundColor);
        element.style.setProperty('color', buttonTextColor, 'important');
      } else {
        // For text elements, use independent contrast calculation
        const textColor = getBestTextColor();
        console.log(`=== updateUIWithPrimaryColor() DEBUG ===`);
        console.log(`Element: ${element.className}`);
        console.log(`Text color mode: ${currentTextColorMode}`);
        console.log(`Primary color: ${color}`);
        console.log(`Calculated text color: ${textColor}`);
        element.style.setProperty('color', textColor, 'important');
      }
    }
  });

  // Apply color to header elements (logo and navigation)
  const headerElements = document.querySelectorAll('.nav__logo h1, .nav__menu a');
  headerElements.forEach(element => {
    if (element instanceof HTMLElement) {
      const textColor = getBestTextColor();
      element.style.setProperty('color', textColor, 'important');
    }
  });

  // Update debug panel colors to match the theme
  const debugPanel = document.querySelector('.debug__panel');
  if (debugPanel instanceof HTMLElement) {
    debugPanel.style.borderColor = color;
  }

  const debugTitle = document.querySelector('.debug__panel h3');
  if (debugTitle instanceof HTMLElement) {
    debugTitle.style.color = color;
  }
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
      material.uniforms.u_lighting_intensity.value = depthParams.lightingIntensity;
      material.uniforms.u_preserve_original_colors.value = depthParams.preserveOriginalColors;
      
      // Update text shadow based on depth
      updateTextShadow(value);
      
      // Update button shadow based on depth
      updateButtonShadow(value);
      break;
    
    case 'intensity':
      const intensityParams = styleGaugeMapping.intensity.shader(value);
      material.uniforms.u_color_saturation.value = intensityParams.colorSaturation;
      material.uniforms.u_contrast_multiplier.value = intensityParams.contrastMultiplier;
      material.uniforms.u_noise_amount.value = intensityParams.noiseAmount;
      break;
  }
  
  // Always set motion to 1.0 (full motion)
  const motionParams = styleGaugeMapping.motion.shader(1.0);
  material.uniforms.u_wave_frequency.value = motionParams.waveFrequency;
  material.uniforms.u_wave_speed.value = motionParams.waveSpeed;
  material.uniforms.u_twirl_intensity.value = motionParams.twirlIntensity;

  console.log(`Updated ${gaugeName} to ${value}`);
}

// Expose debug function globally
(window as any).updateMouseDebug = updateMouseDebug;

// Export tokens for potential external use
export { tokens }; 