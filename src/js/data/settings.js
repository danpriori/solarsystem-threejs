
// This object contains the state of the app
// It uses also dynamic calculus to return the parameters as a result
// and generate the object like JS Object notations
export default {
  isDev: false,
  isLoaded: false,
  maxAnisotropy: 1,
  dpr: 1,
  model: {
    selected: 0,
    initialTypes: ['gltf'],
    type: 'gltf'
  },
  models: [
    {
      path: './assets/models/astros.gltf',
      scale: 100,
      type: 'gltf',
      astros: [
        {
          name: "Sun",
          position: [0, 0, 0],
          angleTilt: [0,0,0],
          axisRotationSpeed: 0.003,
          radius: 0,
          theta: 0,
          deltaTheta: 0,
          orbiting: null,          
          rotatingtOnItsOwnAxis: true,
          rotatingOnItsOrbit: null,
          castShadow: false,
          receiveShadow: false
        },
        {
          name: "Earth",
          position: [0, 0, 0],
          angleTilt: [0,0,0.3],
          axisRotationSpeed: 0.015,
          radius: 25,
          theta: 0,
          deltaTheta: 1 * Math.PI / 1000,
          orbiting: "Sun",
          rotatingtOnItsOwnAxis: true,
          rotatingOnItsOrbit: true,
          castShadow: true,
          receiveShadow: true
        },
        {
          name: "Moon",
          position: [0, 0, 0],
          angleTilt: [0,0,0],
          axisRotationSpeed: 0,
          radius: 8,
          theta: 0,
          deltaTheta: 5.3 * Math.PI / 1000,
          orbiting: "Earth",
          rotatingtOnItsOwnAxis: true,
          rotatingOnItsOrbit: true,
          castShadow: true,
          receiveShadow: true
        }
      ]
    }
  ],
  texture: {
    path: './assets/textures/',
    imageFiles: [
      { name: 'Earth', materialTarget: "Earth", type: "map", image: '2k_earth_daymap.jpg' },
      { name: 'EarthSpecular', materialTarget: "Earth", type: "roughness", image: '2k_earth_specular_map.jpg' },
      { name: 'Sun', materialTarget: "Sun", type: "map", image: '2k_sun.jpg' },
      { name: 'SunEmissive', materialTarget: "Sun", type: "emissive", image: '2k_sun.jpg' },
      { name: 'Moon', materialTarget: "Moon", type: "map", image: '2k_moon.jpg' },
      { name: 'StarField', materialTarget: "StarField", type: "map", image: '8k_stars_milky_way.jpg' }
    ]
  },
  materials: [
    { name: "Earth", type: "MeshStandardMaterial", meshTarget: "Earth", roughnessLevel: 1,
      maps: [ 
        { name: "Earth", type: "map" },
        { name: "EarthSpecular", type: "roughnessMap" }
      ]
    },
    { name: "Sun", type: "MeshStandardMaterial", meshTarget: "Sun", emissive: "rgb(255, 255, 255)", emissiveIntensity: 1,
      maps: [ 
        { name: "Sun", type: "map" },
        { name: "SunEmissive", type: "emissiveMap" }
      ]
    },
    { name: "Moon", type: "MeshStandardMaterial", meshTarget: "Moon", 
      maps: [ 
        { name: "Moon", type: "map" }
      ]
    }
  ],
  camera: {
    fov: 50,
    near: 0.1,
    far: 90000,
    aspect: 1,
    posX: 0,
    posY: 30,
    posZ: 40
  },
  controls: {
    autoRotate: false,
    autoRotateSpeed: -0.5,
    rotateSpeed: 0.5,
    zoomSpeed: 0.8,
    minDistance: 1,
    maxDistance: 600,
    minPolarAngle: Math.PI / 10,
    maxPolarAngle: Math.PI,
    minAzimuthAngle: -Infinity,
    maxAzimuthAngle: Infinity,
    enableDamping: true,
    dampingFactor: 0.5,
    enableZoom: true,
    target: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  ambientLight: {
    enabled: true,
    color: 0x141414,
    intensity: 0.4
  },
  pointLight: {
    enabled: true,
    color: 0xffffff,
    intensity: 0.9,
    distance: 1115,
    x: 0,
    y: 0,
    z: 0,
    shadow: {
      mapSizeWidth: 2048,
      mapSizeHeight: 2048,
      cameraNear: 0.001,
      cameraFar: 1000,
      bias: 0.000001,
      cameraLeft: -10,
      cameraRight: 10,
      cameraTop: 10,
      cameraBottom: -10,
      radius: 5,
      blurSamples: 25
    }
  },
  effects: {
    bloom: {
      threshold: 0.73,
      strength: 1.3,
      radius: 0.5
    }
  }
};
