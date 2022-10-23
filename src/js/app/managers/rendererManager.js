import * as THREE from 'three';

// Main webGL renderer class
export default class RendererManager {
  constructor(scene, container, settings) {
    // Properties
    this.scene = scene;
    this.container = container;

    this.settings = settings;

    // Create WebGL renderer and set its antialias
    this.threeRenderer = new THREE.WebGLRenderer({antialias: true});

    this.threeRenderer.setPixelRatio(window.devicePixelRatio); // For retina

    // Appends canvas
    container.appendChild(this.threeRenderer.domElement);

    // Shadow map options
    this.threeRenderer.shadowMap.enabled = true;
    this.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Get anisotropy for textures
    this.settings.maxAnisotropy = this.threeRenderer.capabilities.getMaxAnisotropy();

    // Initial size update set to canvas container
    this.updateSize();

    // Listeners
    document.addEventListener('DOMContentLoaded', () => this.updateSize(), false);
    window.addEventListener('resize', () => this.updateSize(), false);
  }

  updateSize() {
    this.threeRenderer.setSize(this.container.offsetWidth, this.container.offsetHeight);

    if (this.effectComposer) {
      this.effectComposer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    }
  }

  render(scene, camera) {
    // Renders scene to canvas target
    this.threeRenderer.render(scene, camera);
  }

  getRenderer() {
    return this.threeRenderer;
  }

  getContainer() {
    return this.container;
  }

  setGlobalEffectComposer(effectComposer) {
    this.effectComposer = effectComposer;
  }

}
