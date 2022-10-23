import * as THREE from 'three';

// Starfield Manager
export default class StarfieldManager {
  constructor(scene, texturesManager, settings) {
    this.scene = scene;
    this.texturesManager = texturesManager;
    this.settings = settings;

    this.init();
  }

  init() {

    const startfieldTexture = this.texturesManager.getTextureByName("StarField");

    const starGeometry = new THREE.SphereGeometry(10000, 50, 50);
    const starMaterial = new THREE.MeshPhongMaterial({
      map: startfieldTexture,
      side: THREE.DoubleSide,
      shininess: 1,
      emissive: new THREE.Color(1, 1, 1),
      emissiveMap: startfieldTexture
    });
    const starField = new THREE.Mesh(starGeometry, starMaterial);
    this.scene.add(starField);

  }

  getStarfield() {
    return this.starfield;
  }

  unload() {
    this.scene.remove(this.starfield);
  }
}
