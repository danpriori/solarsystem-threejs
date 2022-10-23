import * as THREE from 'three';

// Light Manager
// Sets up and places all lights in scene
export default class LightManager {
  constructor(scene, settings) {
    this.scene = scene;
    this.settings = settings;

    this.init();
  }

  init() {
    // Ambient
    this.ambientLight = new THREE.AmbientLight(this.settings.ambientLight.color);
    this.ambientLight.visible = this.settings.ambientLight.enabled;
    this.ambientLight.intensity = this.settings.ambientLight.intensity;

    // Point light
    this.pointLight = new THREE.PointLight(this.settings.pointLight.color, this.settings.pointLight.intensity, this.settings.pointLight.distance);
    this.pointLight.position.set(this.settings.pointLight.x, this.settings.pointLight.y, this.settings.pointLight.z);
    this.pointLight.visible = this.settings.pointLight.enabled;
    this.pointLight.castShadow = true;

    // shadow props
    this.pointLight.shadow.mapSize.width  = this.settings.pointLight.shadow.mapSizeWidth;
    this.pointLight.shadow.mapSize.height = this.settings.pointLight.shadow.mapSizeHeight;
    this.pointLight.shadow.camera.near    = this.settings.pointLight.shadow.cameraNear;
    this.pointLight.shadow.camera.far     = this.settings.pointLight.shadow.cameraFar;
    this.pointLight.shadow.bias           = this.settings.pointLight.shadow.bias;

    this.pointLight.shadow.camera.left    = this.settings.pointLight.shadow.cameraLeft;
    this.pointLight.shadow.camera.right   = this.settings.pointLight.shadow.cameraRight;
    this.pointLight.shadow.camera.top     = this.settings.pointLight.shadow.cameraTop;
    this.pointLight.shadow.camera.bottom  = this.settings.pointLight.shadow.cameraBottom
    this.pointLight.shadow.radius         = this.settings.pointLight.shadow.radius;
    this.pointLight.shadow.blurSamples    = this.settings.pointLight.shadow.blurSamples;

    this.scene.add(this.ambientLight);
    this.scene.add(this.pointLight);     
  }

  getLight() {
    return this.pointLight;
  }
}
