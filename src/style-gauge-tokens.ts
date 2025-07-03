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
      vertexAmplitude: depth * 0.05, // Reduced for subtler waves
      fragmentHighlight: depth * 0.4 + 0.6, // Preserve base lighting
      fragmentShadow: depth * 0.3 + 0.1 // Preserve base shadows
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
  }
}; 