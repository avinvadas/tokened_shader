# Design Token Data Flow Architecture

## Brand Values → Style Gauge → Contextual Design Intent

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                           DESIGN TOKEN ECOSYSTEM                                              │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                    LEVEL 1: ABSTRACT BRAND VALUES                                       │ │
│  │                                                                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │ Trustworthy │  │ Innovative  │  │ Professional│  │ Accessible  │  │ Premium     │  │ Dynamic     │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │ │
│  │                                                                                                         │ │
│  │  These are the core brand values that define the company's identity and personality                      │ │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                    │                                                         │
│                                                    ▼                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                    MEDIATOR: STYLE GAUGE SYSTEM                                         │ │
│  │                                                                                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐ │ │
│  │  │                           CONTEXTUAL DESIGN INTENT MAPPING                                          │ │ │
│  │  │                                                                                                     │ │ │
│  │  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │ │ │
│  │  │  │   Dashboard     │  │ Marketing Site  │  │ Mobile App      │  │ Admin Panel     │                 │ │ │ │
│  │  │  │                 │  │                 │  │                 │  │                 │                 │ │ │ │
│  │  │  │ Priority:       │  │ Priority:       │  │ Priority:       │  │ Priority:       │                 │ │ │ │
│  │  │  │ • Trustworthy   │  │ • Innovative    │  │ • Accessible    │  │ • Professional  │                 │ │ │ │
│  │  │  │ • Professional  │  │ • Dynamic       │  │ • Premium       │  │ • Trustworthy   │                 │ │ │ │
│  │  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │ │ │
│  │  │                                                                                                     │ │ │
│  │  │  ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐ │ │ │
│  │  │  │                           STYLE GAUGE PARAMETERS                                                 │ │ │ │
│  │  │  │                                                                                                 │ │ │ │
│  │  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │ │ │ │
│  │  │  │  │   Depth     │  │  Motion     │  │  Contrast   │  │  Scale      │  │  Harmony    │           │ │ │ │
│  │  │  │  │             │  │             │  │             │  │             │  │             │           │ │ │ │
│  │  │  │  │ • Elevation │  │ • Speed     │  │ • Ratio     │  │ • Size      │  │ • Balance   │           │ │ │ │
│  │  │  │  │ • Shadow    │  │ • Easing    │  │ • Contrast  │  │ • Spacing   │  │ • Rhythm    │           │ │ │ │
│  │  │  │  │ • Z-index   │  │ • Direction │  │ • Hierarchy │  │ • Proport.  │  │ • Unity     │           │ │ │ │
│  │  │  │  │ • Parallax  │  │ • Intensity │  │ • Emphasis  │  │ • Modular   │  │ • Cohesion  │           │ │ │ │
│  │  │  │  │ • Shader    │  │ • Pattern   │  │ • Focus     │  │ • Grid      │  │ • Flow      │           │ │ │ │
│  │  │  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘           │ │ │ │
│  │  │  │                                                                                                 │ │ │ │
│  │  │  │  Example: "Depth" can be expressed through:                                                      │ │ │ │
│  │  │  │  • Box-shadow (UI) • Z-index layering • Parallax scrolling • GLSL vertex displacement           │ │ │ │
│  │  │  │  • 3D transforms • Atmospheric perspective • Depth of field • Layered animations               │ │ │ │
│  │  │  │                                                                                                 │ │ │ │
│  │  │  │  Context Decision: Dashboard uses subtle shadows + z-index for "Trustworthy" depth              │ │ │ │
│  │  │  │  Context Decision: Marketing uses parallax + shaders for "Innovative" depth                    │ │ │ │
│  │  │  └─────────────────────────────────────────────────────────────────────────────────────────────────┘ │ │ │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                                         │ │
│  │  The Style Gauge mediates between brand values and design decisions by:                                │ │
│  │  • Translating abstract values into contextual design intent                                           │ │
│  │  • Providing parameters for different expressions of the same concept                                  │ │
│  │  • Enabling art direction decisions across product contexts                                            │ │
│  │  • Maintaining brand consistency while allowing contextual adaptation                                  │ │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                    │                                                         │
│                                                    ▼                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                    LEVEL 2: REFERENCE TOKENS (ref)                                       │ │
│  │                                                                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │   Colors    │  │ Typography  │  │  Spacing    │  │  Shadows    │  │  Geometry   │  │   Motion    │   │ │
│  │  │             │  │             │  │             │  │             │  │             │  │             │   │ │
│  │  │ • Primary   │  │ • Fonts     │  │ • Base      │  │ • Elevation │  │ • Border    │  │ • Duration  │   │ │
│  │  │ • Neutral   │  │ • Weights   │  │ • Scale     │  │ • Ambient   │  │ • Radius    │  │ • Easing    │   │ │
│  │  │ • Semantic  │  │ • Sizes     │  │ • Grid      │  │ • Focus     │  │ • Aspect    │  │ • Patterns  │   │ │
│  │  │ • Palette   │  │ • Line H.   │  │ • Layout    │  │ • Depth     │  │ • Proport.  │  │ • Sequences │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │ │
│  │                                                                                                         │ │
│  │  Raw design values that serve as the foundation for all design decisions                                │ │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                    │                                                         │
│                                                    ▼                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                    LEVEL 3: SYSTEM TOKENS (sys)                                         │ │
│  │                                                                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │   Colors    │  │ Typography  │  │  Spacing    │  │  Shadows    │  │  Geometry   │  │   Motion    │   │ │
│  │  │             │  │             │  │             │  │             │  │             │  │             │   │ │
│  │  │ • Primary   │  │ • Heading   │  │ • Compact   │  │ • Subtle    │  │ • Rounded   │  │ • Smooth    │   │ │
│  │  │ • Surface   │  │ • Body      │  │ • Comfort   │  │ • Prominent │  │ • Sharp     │  │ • Snappy    │   │ │
│  │  │ • Accent    │  │ • Caption   │  │ • Loose     │  │ • Dramatic  │  │ • Organic   │  │ • Bouncy    │   │ │
│  │  │ • Semantic  │  │ • Display   │  │ • Section   │  │ • Layered   │  │ • Geometric │  │ • Elastic   │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │ │
│  │                                                                                                         │ │
│  │  Semantic design decisions that apply the style gauge parameters to reference tokens                    │ │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                    │                                                         │
│                                                    ▼                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                    LEVEL 4: COMPONENT TOKENS (comp)                                      │ │
│  │                                                                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │   Button    │  │   Card      │  │  Input      │  │  Navigation │  │   Modal     │  │   Hero      │   │ │
│  │  │             │  │             │  │             │  │             │  │             │  │             │   │ │
│  │  │ • Primary   │  │ • Surface   │  │ • Field     │  │ • Menu      │  │ • Overlay   │  │ • Title     │   │ │
│  │  │ • Secondary │  │ • Elevated  │  │ • Focus     │  │ • Dropdown  │  │ • Content   │  │ • Subtitle  │   │ │
│  │  │ • Ghost     │  │ • Interactive│ │ • Error     │  │ • Breadcrumb│  │ • Actions   │  │ • Background│   │ │
│  │  │ • Danger    │  │ • Compact   │  │ • Success   │  │ • Pagination│  │ • Close     │  │ • CTA       │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │ │
│  │                                                                                                         │ │
│  │  Component-specific configurations that inherit from system tokens                                      │ │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                    │                                                         │
│                                                    ▼                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                    LEVEL 5: 3D TOKENS (three)                                           │ │
│  │                                                                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │   Colors    │  │  Shaders    │  │  Geometry   │  │   Motion    │  │  Lighting   │  │  Materials  │   │ │
│  │  │             │  │             │  │             │  │             │  │             │  │             │   │ │
│  │  │ • Primary   │  │ • Fragment  │  │ • Vertices  │  │ • Animation │  │ • Ambient   │  │ • Surface   │   │ │
│  │  │ • Neutral   │  │ • Vertex    │  │ • Faces     │  │ • Transition│  │ • Directional│  │ • Texture   │   │ │
│  │  │ • Semantic  │  │ • Compute   │  │ • Normals   │  │ • Easing    │  │ • Point     │  │ • Normal    │   │ │
│  │  │ • Palette   │  │ • Post-proc │  │ • UVs       │  │ • Timeline  │  │ • Spot      │  │ • Roughness │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │ │
│  │                                                                                                         │ │
│  │  Three.js specific parameters that translate design tokens into 3D rendering                            │ │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                    │                                                         │
│                                                    ▼                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                    LEVEL 6: CONCRETE IMPLEMENTATION                                      │ │
│  │                                                                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │     CSS     │  │  Three.js   │  │   React     │  │    Vue      │  │   Native    │  │   Figma     │   │ │
│  │  │             │  │             │  │             │  │             │  │             │  │             │   │ │
│  │  │ • Variables │  │ • Shaders   │  │ • Components│  │ • Components│  │ • Styles    │  │ • Styles    │   │ │
│  │  │ • Properties│  │ • Materials │  │ • Hooks     │  │ • Composables│  │ • Components│  │ • Components│   │ │
│  │  │ • Classes   │  │ • Geometry  │  │ • Context   │  │ • Plugins   │  │ • Themes    │  │ • Libraries │   │ │
│  │  │ • Animations│  │ • Lighting  │  │ • Providers │  │ • Directives│  │ • Assets    │  │ • Tokens    │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │ │
│  │                                                                                                         │ │
│  │  Platform-specific implementations that consume design tokens                                           │ │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                    │                                                         │
│                                                    ▼                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                    LEVEL 7: USER EXPERIENCE                                             │ │
│  │                                                                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │  Visual     │  │  Interaction│  │  Performance │  │ Accessibility│  │  Brand      │  │  Context   │   │ │
│  │  │  Design     │  │  Design     │  │              │  │              │  │  Identity   │  │  Awareness  │   │ │
│  │  │             │  │             │  │              │  │              │  │             │  │             │   │ │
│  │  │ • Aesthetics│  │ • Feedback  │  │ • Loading   │  │ • Contrast   │  │ • Recognition│  │ • Platform  │   │ │
│  │  │ • Hierarchy │  │ • States    │  │ • Animation │  │ • Navigation │  │ • Trust     │  │ • Device    │   │ │
│  │  │ • Balance   │  │ • Transitions│  │ • Responsive│  │ • Screen     │  │ • Emotion   │  │ • Environment│  │ │
│  │  │ • Harmony   │  │ • Micro-int.│  │ • Optimized │  │ • Assistive  │  │ • Memory    │  │ • Situation │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │ │
│  │                                                                                                         │ │
│  │  The final user experience that emerges from the complete token system                                  │ │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

## Data Flow Examples

### Example 1: Dashboard Context
```
Brand Values: [Trustworthy, Professional]
    ↓
Style Gauge: Depth = "Subtle, Layered, Structured"
    ↓
Reference Tokens: Shadows = "0px 1px 3px rgba(0,0,0,0.1)"
    ↓
System Tokens: Elevation = "Subtle shadow with z-index layering"
    ↓
Component Tokens: Card = "Surface with subtle elevation"
    ↓
3D Tokens: Shader = "Minimal displacement, structured geometry"
    ↓
Implementation: CSS box-shadow + Three.js subtle vertex displacement
    ↓
User Experience: Clean, organized, trustworthy interface
```

### Example 2: Marketing Context
```
Brand Values: [Innovative, Dynamic]
    ↓
Style Gauge: Depth = "Dramatic, Fluid, Expressive"
    ↓
Reference Tokens: Motion = "Fast, elastic, continuous"
    ↓
System Tokens: Animation = "Bouncy, fluid transitions"
    ↓
Component Tokens: Hero = "Dynamic background with parallax"
    ↓
3D Tokens: Shader = "Complex displacement, fluid geometry"
    ↓
Implementation: CSS animations + Three.js complex vertex shaders
    ↓
User Experience: Engaging, innovative, dynamic experience
```

## Key Insights

1. **Style Gauge as Mediator**: The style gauge doesn't just translate values—it contextualizes them for specific product goals and user experiences.

2. **Contextual Adaptation**: The same brand value (e.g., "Trustworthy") can manifest differently across contexts while maintaining brand consistency.

3. **Art Direction Control**: The style gauge gives art directors precise control over how abstract concepts materialize in different contexts.

4. **Unified Expression**: Multiple technical approaches (CSS, shaders, animations) can express the same design concept consistently.

5. **Scalable Consistency**: This system maintains brand consistency while allowing contextual adaptation across products. 