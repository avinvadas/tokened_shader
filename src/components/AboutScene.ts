import * as THREE from 'three';

export class AboutScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private canvas: HTMLCanvasElement;
  private animationId: number | null = null;
  private particles!: THREE.Points;
  private time: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });

    this.init();
  }

  private init(): void {
    // Set renderer properties
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Set camera position
    this.camera.position.z = 5;

    // Add lighting
    this.setupLighting();

    // Create particle system
    this.createParticles();

    // Start animation
    this.animate();

    // Handle resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight('#f5f5f5', 0.4);
    this.scene.add(ambientLight);

    // Point light
    const pointLight = new THREE.PointLight('#0ea5e9', 0.8, 100, 2);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);
  }

  private createParticles(): void {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Color - mix of primary and secondary colors
      const colorMix = Math.random();
      if (colorMix < 0.5) {
        // Primary color
        colors[i * 3] = 0.055; // #0ea5e9
        colors[i * 3 + 1] = 0.647;
        colors[i * 3 + 2] = 0.914;
      } else {
        // Secondary color
        colors[i * 3] = 0.851; // #d946ef
        colors[i * 3 + 1] = 0.275;
        colors[i * 3 + 2] = 0.937;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    this.time += 0.01;

    // Rotate particles
    if (this.particles) {
      this.particles.rotation.x = Math.sin(this.time * 0.5) * 0.1;
      this.particles.rotation.y += 0.005;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.renderer.dispose();
  }
} 