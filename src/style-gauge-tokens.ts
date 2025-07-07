// Style Gauge Tokens - Abstract design decisions
export const styleGauge = {
  "depth": {
    "none": 0,
    "subtle": 0.25,
    "medium": 0.5,
    "prominent": 0.75,
    "extreme": 1
  },
  "motion": {
    "none": 0,
    "subtle": 0.25,
    "smooth": 0.5,
    "dynamic": 0.75,
    "energetic": 1
  },
  "intensity": {
    "minimal": 0,
    "gentle": 0.25,
    "moderate": 0.5,
    "strong": 0.75,
    "maximum": 1
  },
  "typography": {
    "marketing": {
      name: "Marketing Landing Page",
      description: "High-impact, expressive typography for brand storytelling and engagement",
      // 1. Size-ratio: Dramatic scaling for visual impact
      sizeRatio: 1.667, // Major sixth - creates bold, dramatic size differentiation
      // 2. Weight distribution: High contrast weight variation for hierarchy
      weightDistribution: {
        display: 900,    // Maximum weight for hero text
        heading1: 800,   // Very heavy for main headings
        heading2: 700,   // Heavy for secondary headings
        heading3: 600,   // Medium-heavy for tertiary headings
        body: 400,       // Normal weight for readability
        caption: 300,    // Light for subtle captions
        label: 500       // Medium for interactive elements
      },
      // 3. Line-flow: Generous spacing for readability and breathing room
      lineFlow: {
        display: 1.1,    // Tight for dramatic display text
        heading1: 1.2,   // Slightly tight for impact
        heading2: 1.3,   // Balanced for headings
        heading3: 1.4,   // Comfortable for sub-headings
        body: 1.6,       // Generous for long-form content
        caption: 1.4,    // Balanced for captions
        label: 1.2       // Tight for labels
      },
      // 4. Structural depth: Many hierarchical levels for complex content
      structuralDepth: 6, // Display, H1, H2, H3, Body, Caption
      // 5. Responsiveness: Use vMin for headings, clamp for body
      responsiveness: {
        useVMinForHeadings: true,
        useClampForBody: true,
        vMinThreshold: 768, // Switch to vMin below this width
        clampBodyMin: 16,   // Minimum 16px
        clampBodyMax: 24    // Maximum 24px
      },
      // 6. Base unit: Standard 16px = 1rem
      baseUnit: {
        remValue: 16, // 1rem = 16px
        unit: "px"
      },
      // 7. Condensity: Low density for spacious, premium feel
      condensity: {
        letterSpacing: {
          display: "0.02em",   // Slightly tight for impact
          headings: "0.01em",  // Normal for headings
          body: "0em",         // Normal for body
          captions: "0.01em"   // Slightly tight for captions
        },
        wordSpacing: "0.05em", // Slightly increased word spacing
        paragraphSpacing: "2em" // Generous paragraph spacing
      },
      // Additional properties for system generation
      functionalEmphasis: {
        labels: "prominent",
        tooltips: "subtle",
        placeholders: "minimal",
        errors: "strong",
        success: "moderate"
      },
      structureComplexity: "high",
      accessibility: {
        level: "AA",
        minContrastRatio: 4.5,
        minFontSize: 16,
        scaleWithZoom: true
      }
    },
    "dashboard": {
      name: "SaaS Dashboard",
      description: "Clean, structured typography for data-heavy interfaces with flexibility and clarity",
      // 1. Size-ratio: Balanced scaling for information hierarchy
      sizeRatio: 1.189, // Minor third - creates balanced, professional scaling
      // 2. Weight distribution: Moderate contrast for clarity without distraction
      weightDistribution: {
        display: 700,    // Strong but not overwhelming
        heading1: 600,   // Clear hierarchy
        heading2: 600,   // Consistent secondary level
        heading3: 500,   // Medium for tertiary
        body: 400,       // Standard for readability
        caption: 400,    // Same as body for consistency
        label: 500       // Medium for interactive elements
      },
      // 3. Line-flow: Balanced spacing for dense information
      lineFlow: {
        display: 1.2,    // Comfortable for display
        heading1: 1.3,   // Good for headings
        heading2: 1.4,   // Balanced for sub-headings
        heading3: 1.5,   // Generous for tertiary
        body: 1.5,       // Standard for data
        caption: 1.4,    // Balanced for captions
        label: 1.3       // Comfortable for labels
      },
      // 4. Structural depth: Moderate levels for organized information
      structuralDepth: 5, // H1, H2, H3, Body, Caption
      // 5. Responsiveness: Fixed sizes for consistent data display
      responsiveness: {
        useVMinForHeadings: false,
        useClampForBody: false,
        vMinThreshold: null,
        clampBodyMin: 14,
        clampBodyMax: 18
      },
      // 6. Base unit: Standard 16px = 1rem
      baseUnit: {
        remValue: 16, // 1rem = 16px
        unit: "px"
      },
      // 7. Condensity: Medium density for efficient information display
      condensity: {
        letterSpacing: {
          display: "0em",      // Normal for display
          headings: "0em",     // Normal for headings
          body: "0em",         // Normal for body
          captions: "0em"      // Normal for captions
        },
        wordSpacing: "0em",    // Normal word spacing
        paragraphSpacing: "1.5em" // Efficient paragraph spacing
      },
      // Additional properties
      functionalEmphasis: {
        labels: "moderate",
        tooltips: "subtle",
        placeholders: "minimal",
        errors: "strong",
        success: "moderate"
      },
      structureComplexity: "medium",
      accessibility: {
        level: "AA",
        minContrastRatio: 4.5,
        minFontSize: 14,
        scaleWithZoom: true
      }
    },
    "mobile": {
      name: "Mobile App",
      description: "Touch-friendly, accessible typography for mobile interfaces with minimalist efficiency",
      // 1. Size-ratio: Mobile-friendly scaling for touch targets
      sizeRatio: 1.25, // Major third - creates clear but not overwhelming hierarchy
      // 2. Weight distribution: Clear contrast for mobile readability
      weightDistribution: {
        display: 800,    // Strong for limited space
        heading1: 700,   // Clear hierarchy
        heading2: 600,   // Good secondary level
        heading3: 500,   // Medium for tertiary
        body: 400,       // Standard for mobile
        caption: 400,    // Same as body for consistency
        label: 500       // Medium for touch targets
      },
      // 3. Line-flow: Optimized for mobile screens
      lineFlow: {
        display: 1.1,    // Tight for limited space
        heading1: 1.2,   // Comfortable for mobile headings
        heading2: 1.3,   // Good for sub-headings
        heading3: 1.4,   // Generous for tertiary
        body: 1.5,       // Standard for mobile reading
        caption: 1.4,    // Balanced for captions
        label: 1.3       // Comfortable for labels
      },
      // 4. Structural depth: Fewer levels for mobile simplicity
      structuralDepth: 4, // H1, H2, Body, Caption
      // 5. Responsiveness: vMin for all text on mobile
      responsiveness: {
        useVMinForHeadings: true,
        useClampForBody: true,
        vMinThreshold: 480, // Use vMin below this width
        clampBodyMin: 16,   // Minimum 16px for touch
        clampBodyMax: 20    // Maximum 20px for mobile
      },
      // 6. Base unit: Mobile-optimized 17px = 1rem
      baseUnit: {
        remValue: 17, // 1rem = 17px (iOS standard)
        unit: "px"
      },
      // 7. Condensity: High density for mobile efficiency
      condensity: {
        letterSpacing: {
          display: "0em",      // Normal for display
          headings: "0em",     // Normal for headings
          body: "0em",         // Normal for body
          captions: "0em"      // Normal for captions
        },
        wordSpacing: "0em",    // Normal word spacing
        paragraphSpacing: "1em" // Compact paragraph spacing
      },
      // Additional properties
      functionalEmphasis: {
        labels: "moderate",
        tooltips: "subtle",
        placeholders: "minimal",
        errors: "strong",
        success: "moderate"
      },
      structureComplexity: "low",
      accessibility: {
        level: "AAA",
        minContrastRatio: 7.0,
        minFontSize: 16,
        scaleWithZoom: true
      }
    }
  }
};

// Mapping functions for style gauge to concrete values
export const styleGaugeMapping = {
  depth: {
    boxShadow: (depth: number) => ({
      spread: depth * 20,
      distance: depth * 8,
      opacity: depth * 0.3
    }),
    textShadow: (depth: number) => ({
      spread: depth * 2,
      distance: depth * 1,
      opacity: depth * 0.2
    }),
    zIndex: (depth: number) => Math.floor(depth * 10),
    parallax: (depth: number) => depth * 0.1,
    shader: (depth: number) => ({
      vertexAmplitude: depth * 0.1, // Full amplitude at depth 1.0
      lightingIntensity: depth, // 0 = no 3D lighting, 1 = full 3D lighting
      preserveOriginalColors: 1.0 - depth // 1 = pure colors, 0 = full lighting
    })
  },
  motion: {
    shader: (motion: number) => ({
      waveFrequency: motion * 2.0,
      waveSpeed: motion * 1.5,
      twirlIntensity: motion * 0.3 // Reduced to not interfere with ripples
    }),
    css: (motion: number) => ({
      transitionDuration: (1 - motion) * 0.3 + 0.1,
      animationSpeed: motion * 2.0
    })
  },
  intensity: {
    shader: (intensity: number) => ({
      colorSaturation: intensity * 0.8 + 0.2, // Preserve some saturation even at minimum
      contrastMultiplier: intensity * 0.5 + 1.0, // Start at 1.0, go up to 1.5
      noiseAmount: intensity * 0.2
    }),
    css: (intensity: number) => ({
      filterContrast: intensity * 0.5 + 1,
      filterSaturate: intensity * 0.3 + 1
    })
  },
  typography: {
    // Generate font sizes based on size ratio and structural depth
    fontSizes: (system: keyof typeof styleGauge.typography) => {
      const config = styleGauge.typography[system];
      const sizes: Record<string, string> = {};
      
      // Generate sizes for each structural level
      const levels = ['display', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'body', 'caption'];
      const maxLevels = Math.min(config.structuralDepth, levels.length);
      
      // Custom distribution for better typographic hierarchy
      const customScales: Record<string, number> = {
        'display': 10.0,    // Large display text (10vmin ≈ 100px on large screens)
        'heading1': 7.0,    // Main heading (7vmin ≈ 70px on large screens)
        'heading2': 5.0,    // Secondary heading (5vmin ≈ 50px on large screens)
        'heading3': 3.8,    // Tertiary heading (3.8vmin ≈ 38px on large screens)
        'heading4': 3.0,    // Quaternary heading (3vmin ≈ 30px on large screens)
        'heading5': 2.4,    // Quinary heading (2.4vmin ≈ 24px on large screens)
        'body': 1.2,        // Body text (1.2vmin ≈ 12px on large screens, will be clamped to 16-24px)
        'caption': 0.9      // Caption text (0.9vmin ≈ 9px on large screens, will be clamped to 12-16px)
      };
      
      for (let i = 0; i < maxLevels; i++) {
        const level = levels[i];
        const customScale = customScales[level] || 1.0;
        
        if (level === 'body') {
          // Body text uses clamp with vmin for responsive sizing
          const minSize = config.responsiveness.clampBodyMin;
          const maxSize = config.responsiveness.clampBodyMax;
          const vminSize = customScale; // Use the custom scale directly
          
          sizes[level] = `clamp(${minSize}px, ${vminSize}vmin, ${maxSize}px)`;
        } else {
          // Other text elements use custom vmin scales
          if (config.responsiveness.useVMinForHeadings) {
            sizes[level] = `${customScale}vmin`;
          } else {
            // Fallback to pixel sizes for smaller text
            const size = config.baseUnit.remValue * (customScale / 2.0); // Adjust for base size
            sizes[level] = `${size}px`;
          }
        }
      }
      
      return sizes;
    },
    
    // Generate line heights based on line flow
    lineHeights: (system: keyof typeof styleGauge.typography) => {
      const config = styleGauge.typography[system];
      return config.lineFlow;
    },
    
    // Generate font weights
    fontWeights: (system: keyof typeof styleGauge.typography) => {
      const config = styleGauge.typography[system];
      return config.weightDistribution;
    },
    
    // Generate spacing based on structure complexity
    spacing: (system: keyof typeof styleGauge.typography) => {
      const config = styleGauge.typography[system];
      const baseSpacing = 8;
      
      const complexityMultipliers: Record<string, number> = {
        low: 1.0,
        medium: 1.2,
        high: 1.5
      };
      
      const multiplier = complexityMultipliers[config.structureComplexity];
      
      return {
        paragraph: `${baseSpacing * 2 * multiplier}px`,
        section: `${baseSpacing * 4 * multiplier}px`,
        component: `${baseSpacing * 3 * multiplier}px`,
        element: `${baseSpacing * multiplier}px`
      };
    },
    
    // Generate condensity properties
    condensity: (system: keyof typeof styleGauge.typography) => {
      const config = styleGauge.typography[system];
      return config.condensity;
    },
    
    // Generate CSS custom properties for the entire system
    cssVariables: (system: keyof typeof styleGauge.typography) => {
      const config = styleGauge.typography[system];
      const sizes = styleGaugeMapping.typography.fontSizes(system);
      const lineHeights = styleGaugeMapping.typography.lineHeights(system);
      const weights = styleGaugeMapping.typography.fontWeights(system);
      const spacing = styleGaugeMapping.typography.spacing(system);
      const condensity = styleGaugeMapping.typography.condensity(system);
      
      const variables: Record<string, string> = {};
      
      // Font sizes
      Object.entries(sizes).forEach(([level, size]) => {
        variables[`--font-size-${level}`] = size;
      });
      
      // Line heights
      Object.entries(lineHeights).forEach(([level, height]) => {
        variables[`--line-height-${level}`] = height.toString();
      });
      
      // Font weights
      Object.entries(weights).forEach(([level, weight]) => {
        variables[`--font-weight-${level}`] = weight.toString();
      });
      
      // Spacing
      Object.entries(spacing).forEach(([type, space]) => {
        variables[`--spacing-${type}`] = space;
      });
      
      // Condensity
      Object.entries(condensity.letterSpacing).forEach(([level, spacing]) => {
        variables[`--letter-spacing-${level}`] = spacing;
      });
      variables['--word-spacing'] = condensity.wordSpacing;
      variables['--paragraph-spacing'] = condensity.paragraphSpacing;
      
      // System properties
      variables['--size-ratio'] = config.sizeRatio.toString();
      variables['--structural-depth'] = config.structuralDepth.toString();
      variables['--base-unit'] = `${config.baseUnit.remValue}px`;
      variables['--accessibility-level'] = config.accessibility.level;
      variables['--min-contrast-ratio'] = config.accessibility.minContrastRatio.toString();
      
      return variables;
    }
  }
}; 