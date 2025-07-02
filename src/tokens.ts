// Design Tokens
export const tokens = {
  // Colors
  color: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e'
    },
    secondary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75'
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717'
    },
    background: {
      primary: '#fafafa',
      secondary: '#f5f5f5',
      tertiary: '#e5e5e5'
    },
    text: {
      primary: '#171717',
      secondary: '#525252',
      tertiary: '#737373',
      inverse: '#fafafa'
    }
  },

  // Typography
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, -apple-system, sans-serif',
      secondary: 'Georgia, serif',
      mono: 'JetBrains Mono, Consolas, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem'
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    }
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
    '6xl': '12rem'
  },

  // 3D Tokens
  three: {
    materials: {
      primary: {
        color: '#0ea5e9',
        metalness: 0.1,
        roughness: 0.8,
        emissive: '#bae6fd',
        emissiveIntensity: 0.1
      },
      secondary: {
        color: '#d946ef',
        metalness: 0.2,
        roughness: 0.6,
        emissive: '#f5d0fe',
        emissiveIntensity: 0.15
      },
      neutral: {
        color: '#737373',
        metalness: 0.0,
        roughness: 0.9,
        emissive: '#e5e5e5',
        emissiveIntensity: 0.05
      }
    },
    lighting: {
      ambient: {
        intensity: 0.4,
        color: '#f5f5f5'
      },
      directional: {
        intensity: 1.0,
        color: '#ffffff',
        position: { x: 10, y: 10, z: 5 }
      },
      point: {
        intensity: 0.8,
        color: '#7dd3fc',
        distance: 100,
        decay: 2
      }
    },
    geometry: {
      cube: { size: 1, segments: 1 },
      sphere: { radius: 0.5, segments: 32 },
      cylinder: { radius: 0.5, height: 1, segments: 32 }
    },
    animation: {
      rotationSpeed: {
        slow: 0.001,
        normal: 0.005,
        fast: 0.01
      }
    },
    camera: {
      fov: 75,
      near: 0.1,
      far: 1000,
      position: { x: 0, y: 0, z: 5 }
    },
    renderer: {
      antialias: true,
      alpha: true,
      shadowMap: { enabled: true }
    },
    // Shader-specific tokens
    shaders: {
      ripple: {
        count: 7.0,
        speed: 0.5,
        width: 0.1,
        transitionSharpness: 1.0,
        distanceVariation: 20.0,
        distanceVariationSpeed: 0.5,
        distanceVariationIntensity: 0.1
      },
      vertex: {
        waveAmplitude: 0.1,
        waveFrequency: 7.0,
        waveSpeed: 0.5,
        segments: 64 // Increased for better visual quality
      },
      colors: {
        primary: '#0ea5e9',
        neutral: '#737373'
      }
    }
  }
}; 