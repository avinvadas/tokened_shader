// Design Tokens - Layered Structure

// Reference Tokens - Raw values
export const ref = {
  color: {
    primary: {
      50: '#0c4a6e',   // Darkest
      100: '#075985',
      200: '#0369a1',
      300: '#0284c7',
      400: '#0ea5e9',
      500: '#38bdf8',
      600: '#7dd3fc',
      700: '#bae6fd',
      800: '#e0f2fe',
      900: '#f0f9ff'   // Lightest
    },
    secondary: {
      50: '#701a75',   // Darkest
      100: '#86198f',
      200: '#a21caf',
      300: '#c026d3',
      400: '#d946ef',
      500: '#e879f9',
      600: '#f0abfc',
      700: '#f5d0fe',
      800: '#fae8ff',
      900: '#fdf4ff'   // Lightest
    },
    neutral: {
      50: '#171717',   // Darkest
      100: '#262626',
      200: '#404040',
      300: '#525252',
      400: '#737373',
      500: '#a3a3a3',
      600: '#d4d4d4',
      700: '#e5e5e5',
      800: '#f5f5f5',
      900: '#fafafa'   // Lightest
    },
    success: {
      50: '#14532d',
      100: '#166534',
      200: '#15803d',
      300: '#16a34a',
      400: '#22c55e',
      500: '#4ade80',
      600: '#86efac',
      700: '#bbf7d0',
      800: '#dcfce7',
      900: '#f0fdf4'
    },
    warning: {
      50: '#78350f',
      100: '#92400e',
      200: '#b45309',
      300: '#d97706',
      400: '#f59e0b',
      500: '#fbbf24',
      600: '#fcd34d',
      700: '#fde68a',
      800: '#fef3c7',
      900: '#fffbeb'
    },
    error: {
      50: '#7f1d1d',
      100: '#991b1b',
      200: '#b91c1c',
      300: '#dc2626',
      400: '#ef4444',
      500: '#f87171',
      600: '#fca5a5',
      700: '#fecaca',
      800: '#fee2e2',
      900: '#fef2f2'
    }
  },
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
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  },
  spacing: {
    0: '0',
    px: '1px',
    '0.5': '0.125rem',
    1: '0.25rem',
    '1.5': '0.375rem',
    2: '0.5rem',
    '2.5': '0.625rem',
    3: '0.75rem',
    '3.5': '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
    auto: 'auto'
  }
};

// System Tokens - Design decisions
export const sys = {
  color: {
    background: {
      primary: ref.color.neutral[900],
      secondary: ref.color.neutral[800],
      tertiary: ref.color.neutral[700],
      inverse: ref.color.neutral[50]
    },
    surface: {
      primary: ref.color.neutral[800],
      secondary: ref.color.neutral[700],
      tertiary: ref.color.neutral[600],
      elevated: ref.color.neutral[50]
    },
    text: {
      primary: ref.color.neutral[50],
      secondary: ref.color.neutral[400],
      tertiary: ref.color.neutral[500],
      inverse: ref.color.neutral[900],
      disabled: ref.color.neutral[600]
    },
    accent: {
      primary: ref.color.primary[500],
      secondary: ref.color.secondary[500],
      success: ref.color.success[500],
      warning: ref.color.warning[500],
      error: ref.color.error[500]
    },
    border: {
      primary: ref.color.neutral[600],
      secondary: ref.color.neutral[700],
      focus: ref.color.primary[500],
      error: ref.color.error[500]
    },
    interactive: {
      hover: ref.color.primary[400],
      active: ref.color.primary[600],
      disabled: ref.color.neutral[600]
    }
  },
  typography: {
    fontFamily: {
      body: ref.fontFamily.primary,
      heading: ref.fontFamily.primary,
      mono: ref.fontFamily.mono,
      display: ref.fontFamily.secondary
    },
    fontSize: {
      body: ref.fontSize.base,
      bodySmall: ref.fontSize.sm,
      bodyLarge: ref.fontSize.lg,
      heading1: ref.fontSize['5xl'],
      heading2: ref.fontSize['4xl'],
      heading3: ref.fontSize['3xl'],
      heading4: ref.fontSize['2xl'],
      heading5: ref.fontSize.xl,
      heading6: ref.fontSize.lg,
      caption: ref.fontSize.xs,
      display: ref.fontSize['8xl']
    },
      fontWeight: {
    body: ref.fontWeight.normal,
    heading: ref.fontWeight.semibold,
    bold: ref.fontWeight.bold,
    light: ref.fontWeight.light,
    medium: ref.fontWeight.medium,
    normal: ref.fontWeight.normal
  },
    lineHeight: {
      body: ref.lineHeight.relaxed,
      heading: ref.lineHeight.tight,
      tight: ref.lineHeight.tight,
      normal: ref.lineHeight.normal
    },
    letterSpacing: {
      body: ref.letterSpacing.normal,
      heading: ref.letterSpacing.tight,
      display: ref.letterSpacing.tighter
    }
  },
  spacing: {
    xs: ref.spacing[1],
    sm: ref.spacing[2],
    md: ref.spacing[4],
    lg: ref.spacing[6],
    xl: ref.spacing[8],
    '2xl': ref.spacing[12],
    '3xl': ref.spacing[16],
    '4xl': ref.spacing[24],
    '5xl': ref.spacing[32],
    '6xl': ref.spacing[48]
  },
  layout: {
    container: {
      padding: ref.spacing[4],
      maxWidth: '1200px'
    },
    section: {
      padding: ref.spacing[16]
    },
    grid: {
      gap: ref.spacing[6]
    }
  }
};

// Component Tokens - Component-specific decisions
export const comp = {
  button: {
    primary: {
      backgroundColor: sys.color.accent.primary,
      color: sys.color.text.inverse,
      fontSize: sys.typography.fontSize.body,
      fontWeight: sys.typography.fontWeight.bold,
      padding: sys.spacing.md,
      borderRadius: '8px',
      hover: {
        backgroundColor: sys.color.interactive.hover
      },
      active: {
        backgroundColor: sys.color.interactive.active
      },
      disabled: {
        backgroundColor: sys.color.interactive.disabled,
        color: sys.color.text.disabled
      }
    },
    secondary: {
      backgroundColor: 'transparent',
      color: sys.color.accent.primary,
      fontSize: sys.typography.fontSize.body,
      fontWeight: sys.typography.fontWeight.medium,
      padding: sys.spacing.md,
      borderRadius: '8px',
      border: `2px solid ${sys.color.accent.primary}`,
      hover: {
        backgroundColor: sys.color.accent.primary,
        color: sys.color.text.inverse
      }
    }
  },
  hero: {
    title: {
      fontSize: sys.typography.fontSize.display,
      fontWeight: sys.typography.fontWeight.bold,
      color: sys.color.text.primary,
      lineHeight: sys.typography.lineHeight.heading,
      letterSpacing: sys.typography.letterSpacing.display
    },
    subtitle: {
      fontSize: sys.typography.fontSize.heading3,
      fontWeight: sys.typography.fontWeight.light,
      color: sys.color.text.secondary,
      lineHeight: sys.typography.lineHeight.body
    },
    description: {
      fontSize: sys.typography.fontSize.bodyLarge,
      fontWeight: sys.typography.fontWeight.normal,
      color: sys.color.text.secondary,
      lineHeight: sys.typography.lineHeight.body
    },
    background: {
      backgroundColor: sys.color.background.primary,
      padding: sys.layout.section.padding
    }
  },
  section: {
    title: {
      fontSize: sys.typography.fontSize.heading2,
      fontWeight: sys.typography.fontWeight.bold,
      color: sys.color.text.primary,
      lineHeight: sys.typography.lineHeight.heading
    },
    subtitle: {
      fontSize: sys.typography.fontSize.heading4,
      fontWeight: sys.typography.fontWeight.medium,
      color: sys.color.text.secondary,
      lineHeight: sys.typography.lineHeight.body
    },
    content: {
      fontSize: sys.typography.fontSize.body,
      fontWeight: sys.typography.fontWeight.normal,
      color: sys.color.text.primary,
      lineHeight: sys.typography.lineHeight.body
    },
    background: {
      backgroundColor: sys.color.background.secondary,
      padding: sys.layout.section.padding
    }
  }
};

// 3D Tokens
export const three = {
  materials: {
    primary: {
      color: ref.color.primary[500],
      metalness: 0.1,
      roughness: 0.8,
      emissive: ref.color.primary[200],
      emissiveIntensity: 0.1
    },
    secondary: {
      color: ref.color.secondary[500],
      metalness: 0.2,
      roughness: 0.6,
      emissive: ref.color.secondary[200],
      emissiveIntensity: 0.15
    },
    neutral: {
      color: ref.color.neutral[500],
      metalness: 0.0,
      roughness: 0.9,
      emissive: ref.color.neutral[200],
      emissiveIntensity: 0.05
    },
    glass: {
      color: '#ffffff',
      metalness: 0.0,
      roughness: 0.0,
      transparent: true,
      opacity: 0.3
    },
    metal: {
      color: ref.color.neutral[300],
      metalness: 1.0,
      roughness: 0.1,
      emissive: ref.color.neutral[100],
      emissiveIntensity: 0.05
    }
  },
  lighting: {
    ambient: {
      intensity: 0.4,
      color: ref.color.neutral[100]
    },
    directional: {
      intensity: 1.0,
      color: '#ffffff',
      position: { x: 10, y: 10, z: 5 }
    },
    point: {
      intensity: 0.8,
      color: ref.color.primary[300],
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
      width: 0.02, // Reduced from 0.1 to 0.02 for thinner, crispier edges (1px)
      transitionSharpness: 2.0, // Increased from 1.0 to 2.0 for sharper transitions
      distanceVariation: 20.0,
      distanceVariationSpeed: 0.5,
      distanceVariationIntensity: 0.1
    },
    vertex: {
      waveAmplitude: 0.1,
      waveFrequency: 7.0,
      waveSpeed: 0.5,
      segments: 64
    },
    colors: {
      primary: ref.color.primary[200], // Darker primary color
      neutral: ref.color.neutral[200]  // Darker neutral color
    }
  }
};

// Combined tokens object for backward compatibility
export const tokens = { ref, sys, comp, three }; 