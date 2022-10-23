import * as THREE from 'three';

import OrbitControls from '../../utils/orbitControls';

// Controls based on orbit controls
export default class ControlsManager {
  constructor(camera, container, settings) {
    // Orbit controls first needs to pass in THREE to constructor
    const orbitControls = new OrbitControls(THREE);
    this.threeControls = new orbitControls(camera, container);
    this.settings = settings;

    this.init();
  }

  init() {
    this.threeControls.target.set(this.settings.controls.target.x, this.settings.controls.target.y, this.settings.controls.target.z);
    this.threeControls.autoRotate = this.settings.controls.autoRotate;
    this.threeControls.autoRotateSpeed = this.settings.controls.autoRotateSpeed;
    this.threeControls.rotateSpeed = this.settings.controls.rotateSpeed;
    this.threeControls.zoomSpeed = this.settings.controls.zoomSpeed;
    this.threeControls.minDistance = this.settings.controls.minDistance;
    this.threeControls.maxDistance = this.settings.controls.maxDistance;
    this.threeControls.minPolarAngle = this.settings.controls.minPolarAngle;
    this.threeControls.maxPolarAngle = this.settings.controls.maxPolarAngle;
    this.threeControls.enableDamping = this.settings.controls.enableDamping;
    this.threeControls.enableZoom = this.settings.controls.enableZoom;
    this.threeControls.dampingFactor = this.settings.controls.dampingFactor;
  }

  getControls() {
    return this.threeControls;
  }
}
