
## Description

Small project of our solar system with the Sun, Earth and Moon made with ThreeJS with webpack and ES6

## Live Demo

https://SolarSystem-Sun-Earth-Moon-ThreeJS.danpriori.repl.co

## Project Structure
```
build - Directory for built and compressed files from the npm build script
src - Directory for all dev files
├── css - Contains all SCSS files, that are compiled to `src/public/css`
├── js - All the Three.js app files, with `app.js` as entry point. Compiled to `src/public/js` with webpack
│   ├── app
│   │   ├── components - Three.js components that are used by managers and main
│   │   ├── loaders - The loader classes to be used. For now it has the GLTF Loader to load the astros
│   │   └── managers - Manage complex tasks such as Camera, Controls, Effects, Light, Model, Renderer, StarField and Texture
│   ├── data - Any data to be imported into app
│   └── utils - Various helpers and vendor classes
└── public - Used by webpack-dev-server to serve content. Webpack builds local dev files here. 
    └── assets - Is copied over to build folder with build command.
```

## Getting started
Install dependencies:

```
npm install
```

Then run dev script:

```
npm run dev
```

Spins up a webpack dev server at localhost:8080 and keeps track of all js and sass changes to files.

## Build
```
npm run build
```

Cleans existing build folder while linting js folder and copies over the public assets folder from src. Then sets environment to production and compiles js and css into build.

## Other NPM Scripts
You can run any of these individually if you'd like with the `npm run` command:
* `prebuild` - Cleans up build folder and lints `src/js`
* `clean` - Cleans build folder
* `lint` - Runs lint on the `src/js` folder and uses the `.eslintrc` file in root for linting rules
* `webpack-server` - Start up a  webpack-dev-server with hot-module-replacement
* `webpack-watch` - Run webpack in dev environment with watch
* `dev:js` - Run webpack in dev environment without watch
* `build:dir` - Copy files and folders from `src/public` to `build`
* `build:js` - Run webpack in production environment

## Input Controls
* Mouse left click will rotate/right click will pan
* Scroll wheel zooms in and out
