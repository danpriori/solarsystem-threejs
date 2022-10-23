import * as THREE from 'three';

// Class that creates and updates the main camera
export default class CameraManager {
  constructor(renderer, settings) {
    const width = renderer.domElement.width;
    const height = renderer.domElement.height;

    this.renderer = renderer;
    this.settings = settings;
    // Create and position a Perspective Camera
    this.threeCamera = new THREE.PerspectiveCamera(this.settings.camera.fov, width / height, this.settings.camera.near, this.settings.camera.far);
    this.threeCamera.position.set(this.settings.camera.posX, this.settings.camera.posY, this.settings.camera.posZ);

    this.init();

  }

  init() {
    // Initial sizing
    this.updateSize(this.renderer);
    
    // Listeners
    window.addEventListener('resize', () => this.updateSize(this.renderer), false);
  }

  updateSize(renderer) {
    // Update camera aspect ratio with window aspect ratio
    this.threeCamera.aspect = renderer.domElement.width / renderer.domElement.height;

    // Always call updateProjectionMatrix on camera change
    this.threeCamera.updateProjectionMatrix();
  }

  getCamera() {
    return this.threeCamera;
  }
}
