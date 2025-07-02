# Design Tokens + Three.js

A unified design system that demonstrates how design tokens can control both UI design and 3D content through semantic naming and consistent values.

## 🎯 Overview

This project showcases the integration of design tokens with Three.js, creating a seamless design system that spans traditional UI elements and 3D content. The system uses semantic naming conventions and consistent values to maintain visual harmony across all touchpoints.

## ✨ Features

- **Design Tokens**: Centralized design system with semantic naming
- **3D Integration**: Seamless integration between UI and Three.js materials, lighting, and geometry
- **Modern Stack**: Built with Vite, TypeScript, and Three.js
- **Responsive Design**: Mobile-first approach with design token-driven styling
- **Interactive Elements**: Smooth scrolling, hover effects, and animated 3D scenes

## 🏗️ Architecture

### Design Token Structure

```
tokens/
├── colors.json          # Color palette with semantic naming
├── typography.json      # Font families, sizes, weights, line heights
├── spacing.json         # Consistent spacing scale
└── 3d.json             # Three.js specific tokens (materials, lighting, geometry)
```

### Application Structure

```
src/
├── components/
│   ├── HeroScene.ts     # Three.js hero section with floating geometries
│   └── AboutScene.ts    # Three.js about section with particle system
├── styles/
│   ├── tokens.css       # CSS custom properties from design tokens
│   └── main.css         # Main application styles using design tokens
├── tokens.ts            # TypeScript design token definitions
└── main.ts              # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ (Note: Some dependencies require Node.js 20+ for full functionality)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tokens_shader
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run tokens` - Build design tokens (requires Node.js 20+)

## 🎨 Design System

### Color Palette

The color system includes:
- **Primary**: Blue scale for main actions and branding
- **Secondary**: Purple scale for accents and highlights
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Success, warning, and error states

### Typography

- **Font Families**: Inter (primary), Georgia (secondary), JetBrains Mono (mono)
- **Font Sizes**: Comprehensive scale from xs (0.75rem) to 9xl (8rem)
- **Font Weights**: Full range from thin (100) to black (900)
- **Line Heights**: Optimized for readability

### 3D Tokens

The 3D design tokens control:
- **Materials**: Colors, metalness, roughness, emissive properties
- **Lighting**: Ambient, directional, point, and spot lights
- **Geometry**: Standard shapes with configurable parameters
- **Animation**: Rotation speeds and timing functions
- **Camera**: Field of view, near/far planes, positioning
- **Renderer**: Antialiasing, alpha, shadow mapping

## 🔧 Usage

### Using Design Tokens in CSS

```css
.my-component {
  background-color: var(--color-primary-500);
  font-family: var(--typography-font-family-primary);
  font-size: var(--typography-font-size-lg);
  padding: var(--spacing-md);
}
```

### Using Design Tokens in TypeScript

```typescript
import { tokens } from './tokens';

// Access color tokens
const primaryColor = tokens.color.primary[500];

// Access typography tokens
const fontSize = tokens.typography.fontSize.lg;

// Access 3D tokens
const materialColor = tokens.three.materials.primary.color;
```

### Using Design Tokens in Three.js

```typescript
import { tokens } from './tokens';

const material = new THREE.MeshStandardMaterial({
  color: tokens.three.materials.primary.color,
  metalness: tokens.three.materials.primary.metalness,
  roughness: tokens.three.materials.primary.roughness,
  emissive: tokens.three.materials.primary.emissive,
  emissiveIntensity: tokens.three.materials.primary.emissiveIntensity
});
```

## 🎭 Three.js Scenes

### Hero Scene
- Floating geometric shapes (cubes, spheres, cylinders)
- Multiple materials using design token colors
- Ambient, directional, and point lighting
- Continuous rotation and floating animations
- Background sphere for depth

### About Scene
- Particle system with 1000+ particles
- Color mixing between primary and secondary tokens
- Smooth rotation and wave animations
- Optimized for performance

## 📱 Responsive Design

The application is built with a mobile-first approach:
- Responsive typography using design token scales
- Flexible grid layouts
- Adaptive spacing using design token values
- Touch-friendly interactive elements

## 🔮 Future Enhancements

- [ ] Storybook integration for component documentation
- [ ] Advanced 3D shader materials using design tokens
- [ ] Animation system with design token timing
- [ ] Theme switching capabilities
- [ ] Export design tokens to various formats (Figma, Sketch, etc.)
- [ ] Performance optimizations for complex 3D scenes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for 3D graphics
- [Vite](https://vitejs.dev/) for build tooling
- [Inter](https://rsms.me/inter/) for typography
- [Design Tokens](https://www.designtokens.org/) community 
