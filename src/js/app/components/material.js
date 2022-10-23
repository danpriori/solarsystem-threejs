import * as THREE from 'three';

// Create the Material based on the material Config
export default class Material {
  constructor(materialConfig, textures) {

    this.material;
    this.map;
    this.roughnessMap;
    this.roughnessLevel = materialConfig.roughnessLevel;
    this.emissiveMap;
    this.emissive =  materialConfig.emissive;
    this.emissiveIntensity = materialConfig.emissiveIntensity;
    this.materialConfig = materialConfig;
    this.textures = textures;


    return this.generateMaterial();

  }

  generateMaterial() {
    this.textures.forEach((texture) => {
      if (texture.userData.type == "map") {
        this.map = texture;
      } else if (texture.userData.type == "roughness") {
        this.roughnessMap = texture;
      } else if (texture.userData.type == "emissive") {
        this.emissiveMap = texture;
      }

    })
    this.material = new THREE[this.materialConfig.type]({
      side: THREE.FrontSide,
      map: this.map ? this.map : null ,
      roughnessMap: this.roughnessMap ? this.roughnessMap : null ,
      roughness: this.roughnessLevel ? this.roughnessLevel : 1,
      emissiveMap: this.emissiveMap ? this.emissiveMap : null ,
      emissive: this.emissive ? this.emissive : new THREE.Color( "rgb(0, 0, 0)" ),
      emissiveIntensity: this.emissiveIntensity ? this.emissiveIntensity : 1,
      metalness: 0
    });

    return this.material;
  }

  getMaterial() {
    return this.material;
  }
}

