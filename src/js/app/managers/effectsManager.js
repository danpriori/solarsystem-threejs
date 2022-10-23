// import { BloomEffect, EffectComposer, RenderPass, EffectPass } from "postprocessing";
import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Effects Manager
export default class EffectsManager {
  constructor(scene, cameraManager, rendererManager, settings) {
    this.scene = scene;
    this.rendererManager = rendererManager;
    this.cameraManager = cameraManager;
    this.settings = settings;

    this.init();
  }

  init() {

    const camera = this.cameraManager.getCamera();
    const renderer = this.rendererManager.getRenderer();

    const renderScene = new RenderPass(this.scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.rendererManager.getContainer().offsetWidth, this.rendererManager.getContainer().offsetHeight),
      this.settings.effects.bloom.strength,
      this.settings.effects.bloom.radius,
      this.settings.effects.bloom.threshold
    );

    this.composer = new EffectComposer(renderer);
    this.composer.setSize(this.rendererManager.getContainer().offsetWidth, this.rendererManager.getContainer().offsetHeight);
    this.composer.renderToScreen = true;
    this.composer.addPass(renderScene);
    this.composer.addPass(bloomPass);

    this.rendererManager.setGlobalEffectComposer(this.composer);
    
  }

  getEffectComposer() {
    return this.composer;
  }

  unload() {
    this.scene.remove(this.starfield);
  }
}
