import * as THREE from 'three';

import Material from '../components/material';
import Helpers from '../../utils/helpers';
import { GLTFLoader } from '../loaders/GLTFLoader';

// Loads in a single object from the config file
export default class ModelManager {
  constructor(scene, loadManager, texturesManager, settings) {
    this.scene = scene;
    this.texturesManager = texturesManager;
    this.loadManager = loadManager;
    this.settings = settings;

    this.solarSystem = null;
  }

  load() {
    // LoadManager is passed in to loader to determine when loading done in main
    // Load the model as a GLTF content
    new GLTFLoader(this.loadManager).load(
      this.settings.models[this.settings.model.selected].path,
      (gltf) => {
        const gltfScene = gltf.scene;
        const rootGroup = new THREE.Group();

        rootGroup.scale.multiplyScalar(1);

        gltfScene.traverse((node) => {

          if (node.isMesh || node.isLight) node.castShadow = true;

          if (node.isMesh) {
            node.receiveShadow = true;
            const materialSettings = this.settings.materials.find((material) => material.meshTarget == node.name);
                            
            const texturesForCurrentMaterial = [];
            materialSettings.maps.forEach((map) => {
              const texture = this.texturesManager.getTextureByName(map.name);
              if (texture) {
                texturesForCurrentMaterial.push(texture);
              }
            });
            
            node.material = new Material(materialSettings, texturesForCurrentMaterial);
            
            const newAstro = node.clone();

            this.settings.models[this.settings.model.selected].astros.forEach((astroSettings) => {
              if (astroSettings.name == newAstro.name) {
                if (!newAstro.userData) {
                  newAstro.userData = {};
                }

                // initial angle tilt;
                newAstro.rotation.x = astroSettings.angleTilt[0];
                newAstro.rotation.y = astroSettings.angleTilt[1];
                newAstro.rotation.z = astroSettings.angleTilt[2];

                newAstro.castShadow = astroSettings.castShadow;
                newAstro.receiveShadow = astroSettings.receiveShadow;

                newAstro.userData.settings = astroSettings;

              }
        
            })
            rootGroup.add(newAstro);
          } else if (node.isLight) {

            const newLight = node.clone();
            rootGroup.add(newLight);

          }
        });

        rootGroup.updateMatrixWorld(true);
        this.solarSystem = rootGroup;

        // Add solar system to scene
        this.scene.add(this.solarSystem);
      },
      Helpers.logProgress(),
      Helpers.logError()
    );
  }

  getAstroByName(name) {
    return this.scene.getObjectByName(name);
  }

  getSolarSystem() {
    return this.solarSystem;
  }

  unload() {
    this.scene.remove(this.solarSystem);
  }
}
