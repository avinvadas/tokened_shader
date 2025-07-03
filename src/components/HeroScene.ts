import * as THREE from 'three';
import { tokens } from '../tokens';
import { styleGauge, styleGaugeMapping } from '../style-gauge-tokens';

export class HeroScene {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private canvas: HTMLCanvasElement;
  private animationId: number | null = null;
  private plane!: THREE.Mesh;
  private time: number = 0;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private shaderUniforms: any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    
    // Use orthographic camera for full viewport coverage
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    this.camera.position.z = 1;
    
    // Set initial camera aspect ratio
    this.updateCameraAspect();
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });

    this.init();
  }

  private init(): void {
    // Set initial renderer size
    this.updateRendererSize();

    // Setup 3-point lighting
    this.setupLighting();

    // Create plane geometry with moderate resolution for smooth vertex animation
    // We'll update this geometry size dynamically based on aspect ratio
    const segments = tokens.three.shaders.vertex.segments;
    const geometry = new THREE.PlaneGeometry(2, 2, segments, segments);
    
    // Enable smooth shading for better visual quality
    geometry.computeVertexNormals();

    // Convert design token colors to GLSL format (0-1 range)
    const primaryColor = this.hexToRgb(tokens.three.shaders.colors.primary);
    const neutralColor = this.hexToRgb(tokens.three.shaders.colors.neutral);

    // Get style gauge values for shader parameters
    const depthValue = styleGauge.depth.medium; // 0.5
    const motionValue = 1.0; // Always full motion
    const intensityValue = styleGauge.intensity.moderate; // 0.5

    // Map style gauge values to concrete shader parameters
    const depthParams = styleGaugeMapping.depth.shader(depthValue);
    const motionParams = styleGaugeMapping.motion.shader(motionValue);
    const intensityParams = styleGaugeMapping.intensity.shader(intensityValue);

    // Create shader material with vertex displacement and color stripes
    const material = new THREE.ShaderMaterial({
      vertexShader: this.getVertexShader(),
      fragmentShader: this.getFragmentShader(),
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(this.canvas.clientWidth, this.canvas.clientHeight) },
        u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
        u_primary_color: { value: new THREE.Vector3(primaryColor.r, primaryColor.g, primaryColor.b) },
        u_neutral_color: { value: new THREE.Vector3(neutralColor.r, neutralColor.g, neutralColor.b) },
        // Fragment shader parameters
        u_ripple_count: { value: tokens.three.shaders.ripple.count },
        u_ripple_speed: { value: tokens.three.shaders.ripple.speed },
        u_ripple_width: { value: tokens.three.shaders.ripple.width },
        u_transition_sharpness: { value: tokens.three.shaders.ripple.transitionSharpness },
        u_distance_variation: { value: tokens.three.shaders.ripple.distanceVariation },
        u_distance_variation_speed: { value: tokens.three.shaders.ripple.distanceVariationSpeed },
        u_distance_variation_intensity: { value: tokens.three.shaders.ripple.distanceVariationIntensity },
        // Vertex shader parameters (now controlled by style gauge)
        u_wave_amplitude: { value: depthParams.vertexAmplitude },
        u_wave_frequency: { value: motionParams.waveFrequency },
        u_wave_speed: { value: motionParams.waveSpeed },
        // New style gauge controlled parameters
        u_twirl_intensity: { value: motionParams.twirlIntensity },
        u_lighting_intensity: { value: depthParams.lightingIntensity },
        u_preserve_original_colors: { value: depthParams.preserveOriginalColors },
        u_color_saturation: { value: intensityParams.colorSaturation },
        u_contrast_multiplier: { value: intensityParams.contrastMultiplier },
        u_noise_amount: { value: intensityParams.noiseAmount }
      },
      transparent: true
    });

    // Add error handling for shader compilation
    material.onBeforeCompile = (shader) => {
      console.log('Shader compilation started');
    };

    // Store shader uniforms for potential use later
    this.shaderUniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(this.canvas.clientWidth, this.canvas.clientHeight) },
      u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
      u_primary_color: { value: new THREE.Vector3(primaryColor.r, primaryColor.g, primaryColor.b) },
      u_neutral_color: { value: new THREE.Vector3(neutralColor.r, neutralColor.g, neutralColor.b) },
      // Fragment shader parameters
      u_ripple_count: { value: tokens.three.shaders.ripple.count },
      u_ripple_speed: { value: tokens.three.shaders.ripple.speed },
      u_ripple_width: { value: tokens.three.shaders.ripple.width },
      u_transition_sharpness: { value: tokens.three.shaders.ripple.transitionSharpness },
      u_distance_variation: { value: tokens.three.shaders.ripple.distanceVariation },
      u_distance_variation_speed: { value: tokens.three.shaders.ripple.distanceVariationSpeed },
      u_distance_variation_intensity: { value: tokens.three.shaders.ripple.distanceVariationIntensity },
      // Vertex shader parameters (now controlled by style gauge)
      u_wave_amplitude: { value: depthParams.vertexAmplitude },
      u_wave_frequency: { value: motionParams.waveFrequency },
      u_wave_speed: { value: motionParams.waveSpeed },
      // New style gauge controlled parameters
      u_twirl_intensity: { value: motionParams.twirlIntensity },
      u_lighting_intensity: { value: depthParams.lightingIntensity },
      u_preserve_original_colors: { value: depthParams.preserveOriginalColors },
      u_color_saturation: { value: intensityParams.colorSaturation },
      u_contrast_multiplier: { value: intensityParams.contrastMultiplier },
      u_noise_amount: { value: intensityParams.noiseAmount }
    };

    this.plane = new THREE.Mesh(geometry, material);
    this.scene.add(this.plane);

    // Debug shader compilation
    console.log('Shader material created with depth-controlled rendering');
    console.log('Style gauge values:', { depthValue, motionValue, intensityValue });



    // Set initial plane geometry size
    this.updatePlaneGeometry();

    // Setup mouse tracking
    this.setupMouseTracking();

    // Start animation
    this.animate();

    // Setup resize handling with ResizeObserver for better performance
    this.setupResizeHandling();
  }

  private setupMouseTracking(): void {
    // Track mouse movement on window level to detect through DOM elements
    window.addEventListener('mousemove', (event) => {
      // Get canvas bounds
      const rect = this.canvas.getBoundingClientRect();
      
      // Calculate mouse position relative to canvas
      const canvasX = event.clientX - rect.left;
      const canvasY = event.clientY - rect.top;
      
      // Check if mouse is within canvas bounds
      if (canvasX >= 0 && canvasX <= rect.width && canvasY >= 0 && canvasY <= rect.height) {
        // Calculate normalized mouse position (-1 to 1)
        this.mouseX = (canvasX / rect.width) * 2 - 1;
        this.mouseY = (canvasY / rect.height) * 2 - 1;
        
        // Invert the mouse position (opposite movement)
        this.mouseX = -this.mouseX;
        this.mouseY = -this.mouseY;
        
        // Debug logging
        console.log(`Mouse: (${event.clientX}, ${event.clientY}), Canvas: (${canvasX}, ${canvasY}), Normalized: (${this.mouseX.toFixed(2)}, ${this.mouseY.toFixed(2)})`);
        
        // Update debug panel
        if (typeof window !== 'undefined' && (window as any).updateMouseDebug) {
          (window as any).updateMouseDebug(this.mouseX, this.mouseY);
        }
      }
    });

    // Handle mouse leave window (reset to center)
    window.addEventListener('mouseleave', () => {
      this.mouseX = 0;
      this.mouseY = 0;
    });

    // Handle touch events for mobile
    window.addEventListener('touchmove', (event) => {
      event.preventDefault();
      const touch = event.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      
      const canvasX = touch.clientX - rect.left;
      const canvasY = touch.clientY - rect.top;
      
      if (canvasX >= 0 && canvasX <= rect.width && canvasY >= 0 && canvasY <= rect.height) {
        this.mouseX = (canvasX / rect.width) * 2 - 1;
        this.mouseY = (canvasY / rect.height) * 2 - 1;
        
        // Invert the touch position
        this.mouseX = -this.mouseX;
        this.mouseY = -this.mouseY;
      }
    });

    window.addEventListener('touchend', () => {
      this.mouseX = 0;
      this.mouseY = 0;
    });
  }

  private hexToRgb(hex: string): { r: number, g: number, b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0, g: 0, b: 0 };
  }

  private getVertexShader(): string {
    return `
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_wave_amplitude;
      uniform float u_ripple_count;
      uniform float u_ripple_speed;
      uniform float u_twirl_intensity;
      uniform float u_lighting_intensity;
      
      varying vec2 vUv;
      varying float vWaveHeight;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        
        // Calculate center with mouse offset for ripples
        vec2 mouse_offset = vec2(u_mouse.x, -u_mouse.y);
        vec2 center = vec2(0.5, 0.5) + mouse_offset * 0.3;
        
        // Calculate mouse position in UV space for twirling
        vec2 mouse_uv = (u_mouse + vec2(1.0)) * 0.5;
        
        // Calculate twirling effect around mouse position (now controlled by style gauge)
        vec2 to_mouse = uv - mouse_uv;
        float mouse_dist = length(to_mouse);
        float twirl_strength = u_twirl_intensity; // Now controlled by style gauge
        float twirl_falloff = 3.0; // How quickly twirling diminishes with distance
        
        // Calculate twirling angle based on distance from mouse
        float twirl_amount = twirl_strength * exp(-mouse_dist * twirl_falloff);
        float twirl_angle = twirl_amount * 3.14159; // Full rotation potential
        
        // Apply twirling transformation to UV coordinates
        float cos_twirl = cos(twirl_angle);
        float sin_twirl = sin(twirl_angle);
        vec2 twirled_uv = mouse_uv + vec2(
          cos_twirl * to_mouse.x - sin_twirl * to_mouse.y,
          sin_twirl * to_mouse.x + cos_twirl * to_mouse.y
        );
        
        // Calculate distance from center using twirled coordinates
        vec2 uv_centered = twirled_uv - center;
        float dist = length(uv_centered);
        
        // Create wave effect synchronized with fragment shader ripples (7 rings)
        float wave = sin(dist * u_ripple_count * 6.28318 - u_time * u_ripple_speed);
        
        // Calculate wave height (positive for primary color areas, negative for neutral)
        // This creates peaks at ripple centers and valleys at neutral areas
        float wave_height = wave * u_wave_amplitude;
        
        // Apply wave displacement to vertex position (controlled by depth)
        vec3 pos = position;
        pos.z += wave_height * u_lighting_intensity; // Smooth transition from 0 to full displacement
        
        // Advanced normal calculation with better mathematical precision
        float wave_derivative = cos(dist * u_ripple_count * 6.28318 - u_time * u_ripple_speed) * u_ripple_count * 6.28318 * u_wave_amplitude;
        
        // Improved normal calculation with better falloff and precision
        float dist_safe = max(dist, 0.001);
        float falloff = exp(-dist * 2.0); // Exponential falloff for smoother transitions
        
        vec3 normal = normalize(vec3(
          -wave_derivative * uv_centered.x / dist_safe * falloff,
          -wave_derivative * uv_centered.y / dist_safe * falloff,
          1.0
        ));
        
        // Advanced blending with distance-based interpolation
        vec3 original_normal = vec3(0.0, 0.0, 1.0);
        float blend_factor = smoothstep(0.0, 0.3, dist) * smoothstep(1.0, 0.7, dist);
        normal = mix(original_normal, normal, blend_factor);
        
        // Apply depth control to normal calculation - smooth transition
        normal = mix(original_normal, normal, u_lighting_intensity);
        
        // Pass data to fragment shader
        vWaveHeight = wave_height;
        vNormal = normalMatrix * normal;
        vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;
  }

  private getFragmentShader(): string {
    return `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec3 u_primary_color;
      uniform vec3 u_neutral_color;
      uniform float u_ripple_count;
      uniform float u_ripple_speed;
      uniform float u_ripple_width;
      uniform float u_transition_sharpness;
      uniform float u_distance_variation;
      uniform float u_distance_variation_speed;
      uniform float u_distance_variation_intensity;
      uniform float u_wave_frequency;
      uniform float u_wave_speed;
      uniform float u_twirl_intensity;
      uniform float u_lighting_intensity;
      uniform float u_preserve_original_colors;
      uniform float u_color_saturation;
      uniform float u_contrast_multiplier;
      uniform float u_noise_amount;
      
      varying vec2 vUv;
      varying float vWaveHeight;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        // Center coordinates with mouse offset
        // Flip Y-axis for proper coordinate system alignment
        vec2 mouse_offset = vec2(u_mouse.x, -u_mouse.y);
        vec2 center = vec2(0.5, 0.5) + mouse_offset * 0.3; // Scale mouse movement
        
        // Calculate mouse position in UV space for twirling
        vec2 mouse_uv = (u_mouse + vec2(1.0)) * 0.5;
        
        // Calculate twirling effect around mouse position (now controlled by style gauge)
        vec2 to_mouse = vUv - mouse_uv;
        float mouse_dist = length(to_mouse);
        float twirl_strength = u_twirl_intensity; // Now controlled by style gauge
        float twirl_falloff = 3.0; // How quickly twirling diminishes with distance
        
        // Calculate twirling angle based on distance from mouse
        float twirl_amount = twirl_strength * exp(-mouse_dist * twirl_falloff);
        float twirl_angle = twirl_amount * 3.14159; // Full rotation potential
        
        // Apply twirling transformation to UV coordinates
        float cos_twirl = cos(twirl_angle);
        float sin_twirl = sin(twirl_angle);
        vec2 twirled_uv = mouse_uv + vec2(
          cos_twirl * to_mouse.x - sin_twirl * to_mouse.y,
          sin_twirl * to_mouse.x + cos_twirl * to_mouse.y
        );
        
        // Calculate distance from center using twirled coordinates
        vec2 uv = twirled_uv - center;
        float dist = length(uv);
        
        // Create ripple effect with proper count (7 rings)
        float ripple = sin(dist * u_ripple_count * 6.28318 - u_time * u_ripple_speed);
        
        // Advanced color transitions with multiple techniques
        float threshold = 0.0;
        float transition_width = u_ripple_width; // Use token-controlled width
        
        // Multi-level smoothstep for better anti-aliasing
        float color_mix = smoothstep(threshold - transition_width, threshold + transition_width, ripple);
        
        // Add subtle noise to break up banding (now controlled by style gauge)
        float noise = fract(sin(dot(vUv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
        color_mix += (noise - 0.5) * u_noise_amount;
        color_mix = clamp(color_mix, 0.0, 1.0);
        
        // Mix colors with smooth transition
        vec3 color = mix(u_neutral_color, u_primary_color, color_mix);
        
        // Apply style gauge controlled color saturation with smooth transition
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        vec3 saturated_color = mix(vec3(luminance), color, u_color_saturation);
        // Blend between original and saturated color to preserve lightness
        vec3 saturated_result = mix(color, saturated_color, 0.7);
        color = mix(color, saturated_result, u_lighting_intensity);
        
        // Add subtle distance-based variation for visual interest with smooth transition
        float distance_factor = sin(dist * u_distance_variation + u_time * u_distance_variation_speed) * u_distance_variation_intensity;
        color += distance_factor * u_lighting_intensity;
        
        // Advanced lighting calculation with multiple techniques (now controlled by depth)
        vec3 light_dir = normalize(vec3(1.0, 1.0, 1.0));
        vec3 normal = normalize(vNormal);
        
        // Multiple light sources with distance-based attenuation
        vec3 light_dir2 = normalize(vec3(-0.5, 0.8, 0.3));
        vec3 light_dir3 = normalize(vec3(0.0, -0.5, 0.8));
        
        // Enhanced diffuse lighting with soft shadows
        float diffuse1 = max(dot(normal, light_dir), 0.0);
        float diffuse2 = max(dot(normal, light_dir2), 0.0) * 0.4;
        float diffuse3 = max(dot(normal, light_dir3), 0.0) * 0.3;
        
        // Improved specular lighting with fresnel effect
        vec3 view_dir = normalize(-vPosition);
        vec3 half_dir = normalize(light_dir + view_dir);
        float specular = pow(max(dot(normal, half_dir), 0.0), 64.0) * 0.6;
        
        // Fresnel effect for realistic edge lighting
        float fresnel = pow(1.0 - max(dot(normal, view_dir), 0.0), 3.0) * 0.3;
        
        // Distance-based ambient occlusion
        float ao = 1.0 - smoothstep(0.0, 0.5, dist) * 0.2;
        
        // Advanced lighting composition
        float ambient = 0.35;
        float lighting = ambient * ao + diffuse1 * 0.5 + diffuse2 + diffuse3 + specular + fresnel;
        
        // Interpolate between flat colors and 3D lighting based on depth
        vec3 flat_color = color; // Original color without lighting
        vec3 lit_color = color * lighting; // Color with full 3D lighting
        
        // Mix between flat and lit colors based on depth - smooth transition
        color = mix(flat_color, lit_color, u_lighting_intensity);
        
        // Apply style gauge controlled contrast with smooth transition
        vec3 contrasted_color = (color - 0.5) * u_contrast_multiplier + 0.5;
        color = mix(color, contrasted_color, u_lighting_intensity);
        
        // Final color refinement and gamma correction
        color = pow(color, vec3(0.95)); // Slight gamma correction for better contrast
        color = clamp(color, 0.0, 1.0); // Ensure colors stay in valid range
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    this.time += 0.016; // Approximately 60fps

    // Update shader uniforms for animation
    if (this.plane.material instanceof THREE.ShaderMaterial) {
      this.plane.material.uniforms.u_time.value = this.time;
      this.plane.material.uniforms.u_mouse.value.set(this.mouseX, this.mouseY);
      
      // Debug first few frames
      if (this.time < 0.1) {
        console.log('Animation frame:', this.time);
        console.log('Mouse position:', this.mouseX, this.mouseY);
        console.log('Scene children count:', this.scene.children.length);
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  private updateRendererSize(): void {
    // Get the actual display size of the canvas
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Set the canvas size to match the display size
    this.canvas.width = width;
    this.canvas.height = height;
    
    // Update renderer size and pixel ratio
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    console.log(`Renderer size updated: ${width}x${height}`);
  }

  private updateCameraAspect(): void {
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const aspect = width / height;
    
    if (aspect > 1) {
      // Landscape: wider than tall
      this.camera.left = -aspect;
      this.camera.right = aspect;
      this.camera.top = 1;
      this.camera.bottom = -1;
    } else {
      // Portrait: taller than wide
      this.camera.left = -1;
      this.camera.right = 1;
      this.camera.top = 1 / aspect;
      this.camera.bottom = -1 / aspect;
    }
    
    this.camera.updateProjectionMatrix();
  }

  private setupLighting(): void {
    // Key Light (main light) - positioned at 45 degrees front-right
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(2, 2, 2);
    keyLight.castShadow = true;
    this.scene.add(keyLight);

    // Fill Light (softer light) - positioned at 45 degrees front-left
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-2, 1, 2);
    this.scene.add(fillLight);

    // Back Light (rim light) - positioned behind the plane
    const backLight = new THREE.DirectionalLight(0xffffff, 0.6);
    backLight.position.set(0, -2, -1);
    this.scene.add(backLight);

    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);

    console.log('3-point lighting setup complete');
  }

  private updateVertexDisplacement(geometry: THREE.PlaneGeometry): void {
    const positions = geometry.attributes.position;
    const uvs = geometry.attributes.uv;
    
    // Calculate center with mouse offset
    const mouseOffset = new THREE.Vector2(this.mouseX, -this.mouseY);
    const center = new THREE.Vector2(0.5, 0.5).add(mouseOffset.clone().multiplyScalar(0.3));
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const u = uvs.getX(i);
      const v = uvs.getY(i);
      
      // Calculate distance from center in UV space
      const uvCentered = new THREE.Vector2(u, v).sub(center);
      const dist = uvCentered.length();
      
      // Create wave effect synchronized with fragment shader
      const wave = Math.sin(dist * tokens.three.shaders.vertex.waveFrequency * 2 * Math.PI - this.time * tokens.three.shaders.vertex.waveSpeed);
      const waveHeight = wave * tokens.three.shaders.vertex.waveAmplitude;
      
      // Apply wave displacement to Z position
      positions.setZ(i, waveHeight);
    }
    
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  private updatePlaneGeometry(): void {
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const aspect = width / height;
    
    // Calculate the scale to fill the viewport
    let scaleX = 1;
    let scaleY = 1;
    
    if (aspect > 1) {
      // Landscape: scale horizontally
      scaleX = aspect;
      scaleY = 1;
    } else {
      // Portrait: scale vertically
      scaleX = 1;
      scaleY = 1 / aspect;
    }
    
    // Update the plane scale to fill the viewport
    this.plane.scale.set(scaleX, scaleY, 1);
    
    console.log(`Plane scale updated: ${scaleX.toFixed(2)}x${scaleY.toFixed(2)}`);
  }

  private setupResizeHandling(): void {
    // Use ResizeObserver for better performance and accuracy
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.canvas) {
          this.handleResize();
        }
      }
    });
    
    // Observe the canvas element
    resizeObserver.observe(this.canvas);
    
    // Also listen for window resize as fallback
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private handleResize(): void {
    // Update renderer size
    this.updateRendererSize();
    
    // Update camera aspect ratio
    this.updateCameraAspect();
    
    // Update plane geometry to fill viewport
    this.updatePlaneGeometry();
    
    // Update shader resolution uniform
    if (this.plane.material instanceof THREE.ShaderMaterial) {
      const rect = this.canvas.getBoundingClientRect();
      this.plane.material.uniforms.u_resolution.value.set(rect.width, rect.height);
    }
    
    const rect = this.canvas.getBoundingClientRect();
    console.log(`Resized to: ${rect.width}x${rect.height}, aspect: ${(rect.width/rect.height).toFixed(2)}`);
  }

  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.renderer.dispose();
  }
} 