import * as THREE from 'three';
// Promise polyfill for IE
import { Promise } from 'es6-promise';

import Helpers from '../../utils/helpers';

// This class preloads all textures in the imageFiles array in the Config via ES6 Promises.
// Once all textures are done loading the model itself will be loaded after the Promise .then() callback.
// Using promises to preload textures prevents issues when applying textures to materials before the textures have loaded.
export default class TextureManager {
  constructor(settings) {
    // Prop that will contain all loaded textures
    this.textures = {};
    this.settings = settings;
  }

  load() {
    const loader = new THREE.TextureLoader();
    const maxAnisotropy = this.settings.maxAnisotropy;
    const imageFiles = this.settings.texture.imageFiles;
    const promiseArray = [];

    loader.setPath(this.settings.texture.path);

    imageFiles.forEach(imageFile => {
      // Add an individual Promise for each image in array
      promiseArray.push(new Promise((resolve, reject) => {
        // Each Promise will attempt to load the image file
        loader.load(imageFile.image,
          // This gets called on load with the loaded texture
          texture => {
            texture.anisotropy = maxAnisotropy;

            // fill the userData object with the image file name info to be used outside
            texture.userData = {
              name: imageFile.name,
              type: imageFile.type,
              materialTarget: imageFile.materialTarget
            }
            // Resolve Promise with object of texture if it is instance of THREE.Texture
            const textureObject = {};
            textureObject[imageFile.name] = texture;
            if(textureObject[imageFile.name] instanceof THREE.Texture)
              resolve(textureObject);
          },
          Helpers.logProgress(),
          xhr => reject(new Error(xhr + 'An error occurred loading while loading ' + imageFile.image))
        )
      }));
    });

    // Iterate through all Promises in array and return another Promise when all have resolved or 
    // console log reason when any reject
    return Promise.all(promiseArray).then(textures => {
      // Set the textures prop object to have name be the resolved texture
      for(let i = 0; i < textures.length; i++) {
        this.textures[Object.keys(textures[i])[0]] = textures[i][Object.keys(textures[i])[0]];
      }
    }, reason => console.log(reason));
  }

  getAllTextures() {
    return this.textures;
  }

  getTextureByName(textureName) {
    return this.textures[textureName];
  }
}
