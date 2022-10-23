// Global imports -
import * as THREE from 'three';

// Local imports
// Managers
import RendererManager from './managers/rendererManager';
import CameraManager from './managers/cameraManager';
import LightManager from './managers/lightManager';
import ControlsManager from './managers/controlsManager';
import TextureManager from './managers/textureManager';
import ModelManager from './managers/modelManager';
import StarfieldManager from './managers/starfieldManager';
import EffectsManager from './managers/effectsManager';

// data
import Settings from '../data/settings';
// -- End of imports

// This class instantiates and ties all of the components together, 
// starts the loading process and renders the main loop
export default class Main {
  constructor(container) {
    // Set container property to container element
    this.container = container;

    // Main scene creation
    this.scene = new THREE.Scene();

    this.astros = {};

    // Get Device Pixel Ratio first for retina
    if(window.devicePixelRatio) {
      Settings.dpr = window.devicePixelRatio;
    }

    // Main renderer constructor
    this.rendererManager = new RendererManager(this.scene, container, Settings);

    // managers instantiations
    this.cameraManager   = new CameraManager(this.rendererManager.getRenderer(), Settings);
    this.controlsManager = new ControlsManager(this.cameraManager.getCamera(), this.container, Settings);
    this.lightManager    = new LightManager(this.scene, Settings);
    this.effectsManager  = new EffectsManager(this.scene, this.cameraManager, this.rendererManager, Settings)

    // variables for raycasting in order to picking up the object by clicking
    this.intersectedObject;
    this.raycaster = new THREE.Raycaster();
    this.intersects;


    // Instantiate texture
    this.texturesManager = new TextureManager(Settings);

    // Start loading the textures and then go on to load the model after the texture Promises have resolved
    this.texturesManager.load().then(() => {

      this.loadManager = new THREE.LoadingManager();

      // Textures loaded, load model
      this.model = new ModelManager(this.scene, this.loadManager, this.texturesManager, Settings);
      
      // create the star field
      this.startFieldManager = new StarfieldManager(this.scene, this.texturesManager, Settings);

      // load the model from GLTF file
      if (Settings.models[Settings.model.selected].type == "gltf") {
        this.model.load(Settings.models[Settings.model.selected].type);
      }

      // All loaders done now
      this.loadManager.onLoad = () => {
        
        // Everything is now fully loaded
        Settings.isLoaded = true;
        this.container.querySelector('#loading').style.display = 'none';

        this.setAstros();

        document.addEventListener('click', this.onDocumentMouseClick.bind(this), false)

      };
    });

    // Start render which does not wait for model fully loaded
    this.render();
  }

  onDocumentMouseClick(event) {
    this.checkObjectIntersections(event);
  }

  checkObjectIntersections(event) {

    const container = this.rendererManager.getContainer();
    this.raycaster.setFromCamera(
      {
        x: (event.clientX / container.clientWidth) * 2 - 1,
        y: -(event.clientY / container.clientHeight) * 2 + 1
      },
      this.cameraManager.getCamera()
    );

    const astros = Object.values(this.astros);
    if (astros) {
      this.intersects = this.raycaster.intersectObjects(astros, false)
    }

    if (this.intersects.length > 0) {
      // get the first object from the top of the raycasting intersections list
      this.intersectedObject = this.intersects[0].object;
    } else {
      this.intersectedObject = null;
    }

    if (this.intersectedObject) {

      Settings.models[Settings.model.selected].astros.forEach((node) => {
        if (this.intersectedObject.name === node.name) {
          // toggle object rotations
          this.toggleObjectRotations(this.intersectedObject);
        }
      })
    }
    
  }

  // Toogle rotations of the astros
  toggleObjectRotations(object) {

    // if the rotation is enabled, then disabled it. Otherwise enable it again
    if (object.userData.settings.rotatingtOnItsOwnAxis !== null) {
      object.userData.settings.rotatingtOnItsOwnAxis = !object.userData.settings.rotatingtOnItsOwnAxis;  
    }
    if (object.userData.settings.rotatingOnItsOrbit !== null) {
      object.userData.settings.rotatingOnItsOrbit = !object.userData.settings.rotatingOnItsOrbit;

    }
  }

  // Set the astros object from the Model Manager based on what we have in the settings
  setAstros() {

    Settings.models[Settings.model.selected].astros.forEach((astro) => {
      this.astros[astro.name] = this.model.getAstroByName(astro.name);
    })
  }

  // animate the astros with their rotations based on the settings
  animateAstros() {
    Settings.models[Settings.model.selected].astros.forEach((node) => {
      const astro = this.astros[node.name];
      const settings = astro.userData.settings;

      if (settings.rotatingtOnItsOwnAxis) {
        astro.rotation.y += settings.axiRotationSpeed;
      }

      if (settings.rotatingOnItsOrbit) {
        settings.theta -= settings.deltaTheta;
      } 
      
      let orbitingX = 0; 
      let orbitingZ = 0;

      if (settings.orbiting) {
        const parentAstro = this.model.getAstroByName(settings.orbiting);
        if (parentAstro) {
          orbitingX = parentAstro.position.x;
          orbitingZ = parentAstro.position.z;
        }
      }
      astro.position.x = orbitingX + settings.radius * Math.cos(settings.theta);
      astro.position.z = orbitingZ + settings.radius * Math.sin(settings.theta);
    });
  }

  // main render method
  render() {

    // the astros will be animated once everything is loaded (textures and model)
    if (Settings.isLoaded) {

      this.animateAstros();
          
    }

    // Call render function and pass in created scene and camera
    this.rendererManager.render(this.scene, this.cameraManager.getCamera());

    this.controlsManager.getControls().update();

    // RAF
    requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object

    // if the effect manager is ready, then render it as well
    if (this.effectsManager) {
      this.effectsManager.getEffectComposer().render();
    }

  }
}
