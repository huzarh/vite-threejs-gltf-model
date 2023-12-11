import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import { GUI } from "dat.gui";
import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader";
import createBox from "./createBox";

import { v4 as uuidv4 } from "uuid";
import { Vector2 } from "three";

uuidv4();
// ----- three globalstates ----- //
var scene;
var camera;
var renderer;
var controls;
// const params = { color: 0x00f00 };
const gui = new GUI();
var mixer;
var clock = new THREE.Clock();
const loader = new GLTFLoader();
const act = {};

function createScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("grey");
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  renderer = new THREE.WebGLRenderer({
    physicallyCorrectLights: true,
    antialias: true,
    powerPreference: "high-performance",
  });

  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  //   createBox(
  //     THREE,
  //     gui,
  //     scene,
  //     "cube1",
  //     3,
  //     3,
  //     0.5,
  //     0,
  //     1.5,
  //     0,
  //     "stone/cobblestone_01_"
  //   );
  createBox(
    THREE,
    gui,
    scene,
    "cube2",
    10,
    0.2,
    10,
    0,
    -0.1,
    0,
    "brick_moss/brick_moss_001_"
  );
  // customObj();

  // loader.load("./models/LeePerrySmith.glb", function (gltf) {
  //   // mesh = gltf.scene;
  //   // mesh.scale.set(100, 100, 100);
  //   scene.add(gltf.scene);
  // });
  loader.load("./models/Walking character.glb", function (gltf) {
    console.log(gltf);
    scene.add(gltf.scene);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.scale.set(7, 7, 7);
    mixer = new THREE.AnimationMixer(gltf.scene);
    mixer.clipAction(gltf.animations[1]).play();
    mixer.clipAction(gltf.scene.position.set(1, 0, 0)).play();
  });

  createPostLight();

  camera.position.set(-3, 1, 3);
  // camera.rotation.set(2)

  const ambietLight = new THREE.AmbientLight("grey", 1);
  gui.add(ambietLight, "intensity", 0, 10);
  scene.add(ambietLight);

  const cf = gui.addFolder("Camera");
  // cf.add(camera.position, "x", -10, 10).onChange(function(){camera.lookAt(new THREE.Vector3(0, 0, 0))});
  // cf.add(camera.position, "y", -10, 10);
  // cf.add(camera.position, "z", -10, 10);
  // cf.add(camera.rotation, "x", -1, 1);
  // cf.add(camera.rotation, "y", -1, 1);
  // cf.add(camera.rotation, "z", -1, 1);
  cf.add(camera, "fov", 0, 100).onChange(function () {
    camera.updateProjectionMatrix();
  });
  cf.add(camera, "far", 0, 100).onChange(function () {
    camera.updateProjectionMatrix();
  });
  cf.add(camera, "near", 0, 100).onChange(function () {
    camera.updateProjectionMatrix();
  });
  cf.add(camera, "aspect", 0, 3).onChange(function () {
    camera.updateProjectionMatrix();
  });
  cf.add(camera, "zoom", 1, 5).onChange(function () {
    camera.updateProjectionMatrix();
  });

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // mouse controller
  controls = new OrbitControls(camera, renderer.domElement);

  // const loader = new THREE.CubeTextureLoader();
  // const cubeMap = loader.load([img,img,img,img,img,img]);
  // scene.background = cubeMap;
  // controls.minPolarAngle = 0;
  // controls.maxPolarAngle = (80 /180) * Math.PI;
  // controls.autoRotate = false;
  // controls.autoRotateSpeet = 3;

  // ----- gui controller ----- //

  // const fp = gui.addFolder('position');
  // const fc = gui.addFolder('color');
  // fp.add(scene.getObjectByName("cube1").position,'x',-5,5);
  // fc.addColor(params,'color').onChange(function() {scene.getObjectByName("cube1").material.color.set(params.color)});

  // ----- Helpers ----- //

  // around
  // const gridHelper = new THREE.GridHelper(5,10,'orange','grey');
  // scene.add(gridHelper);

  // arrow --->
  // const direction = new THREE.Vector3(0,5,5);
  // direction.normalize()
  // const origin = new THREE.Vector3(0,0,0);

  // const arrowHelper = new THREE.ArrowHelper(direction,origin,1,'red');
  // scene.add(arrowHelper);

  // x,y,z line
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // camera
  // const camera2 = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 1, 20 );
  // camera2.position.x = 1;
  // camera2.position.y = 1;
  // camera2.position.z = 2;
  // camera2.lookAt(new THREE.Vector3(0,0,0));
  // const cameraHelper = new THREE.CameraHelper(camera2);

  // scene.add(cameraHelper);

  // keyboard controlller
  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 37:
        (scene.getObjectByName("cube1").position.x += -1),
          (scene.getObjectByName("cube1").rotation.y += -1);
        break;
      case 38:
        scene.getObjectByName("cube1").position.x += 1;
        break;
      default:
        break;
    }
  });
  loader.load(
    "./models/Soldier.glb",
    function (gltf) {
      console.log(gltf);
      // scene.add(gltf.scene);
      gltf.scene.position.set(0, 0.01, 0);
      mixer = new THREE.AnimationMixer(gltf.scene);

      for (let i = 0; i < gltf.animations.length; i++) {
        act[gltf.animations[i].name] = gltf.animations[i];
      }
      mixer.clipAction(act["Idle"]).play();
      console.log(mixer.clipAction(act["Walk"]).isRunning());
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.log("An error happened", error);
    }
  );
  document.addEventListener("keydown", _onKeyDown, false);
  document.addEventListener("keyup", _onKeyUp, false);
  render();
}
function _onKeyDown(event) {
  switch (event.keyCode) {
    case 87:
      mixer.clipAction(act["Idle"]).stop();
      mixer.clipAction(act["Run"]).play();
      break;
    case 38:
      act = 3;
      break;
    default:
      break;
  }
}
function _onKeyUp(event) {
  switch (event.keyCode) {
    case 87:
      mixer.clipAction(act["Run"]).stop();
      mixer.clipAction(act["Idle"]).play();
      break;
    case 38:
      act = 3;
      break;
    default:
      break;
  }
}

function render() {
  renderer.render(scene, camera);

  controls.update();
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  // cube animation
  // scene.getObjectByName("cube1").rotation.x += 0.01;
  // scene.getObjectByName("cube1").rotation.z += 0.01;
  requestAnimationFrame(render);
}

function customObj() {
  var img =
    "data:image/jpeg;base64,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";

  const geometry = new THREE.BufferGeometry();

  const vertices = [
    { position: [5, 0, 0], normal: [0, 0, 1], uv: [0, 0] },
    { position: [5, 5, 0], normal: [0, 0, 1], uv: [0, 1] },
    { position: [0, 0, 0], normal: [0, 0, 1], uv: [1, 0] },
    { position: [0, 5, 0], normal: [0, 0, 1], uv: [1, 1] },

    // { position:[5,0,0],normal:[0,0,-1],uv: [0,0]},
    // { position:[5,5,0],normal:[0,0,-1],uv: [0,1]},
    // { position:[0,0,0],normal:[0,0,-1],uv: [1,0]},
    // { position:[0,5,0],normal:[0,0,-1],uv: [1,1]},

    // { position:[5,0,0],normal:[0,0,-1],uv: [0,0]},
    // { position:[5,5,0],normal:[0,0,-1],uv: [0,1]},
    // { position:[0,0,0],normal:[0,0,-1],uv: [1,0]},
    // { position:[0,5,0],normal:[0,0,-1],uv: [1,1]},
  ];

  const indices = [0, 2, 1, 1, 2, 3, 4, 6, 5, 5, 6, 7];
  const positions = [];
  const normals = [];
  const uvs = [];

  for (const vertex of vertices) {
    positions.push(vertex.position[0], vertex.position[1], vertex.position[2]);
    normals.push(...vertex.normal);
    uvs.push(...vertex.uv);
  }

  geometry.setIndex(indices);
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

  const material = new THREE.MeshStandardMaterial({
    color: 0xfff,
    side: THREE.DoubleSide,
  });
  const loader = new THREE.TextureLoader();
  material.map = loader.load(img);

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
// function createBox(name, w, h, d, x, y, z, texture) {
//   const cubeGeometry = new THREE.BoxGeometry(w, h, d,100,100,600);
//   const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
//   const loader = new THREE.TextureLoader();
//   cubeMaterial.map = loader.load("./textures/" + texture + "_disp.jpg");
//   cubeMaterial.displacementMap = loader.load("./textures/" + texture + "_disp.jpg");
//   cubeMaterial.aoMap = loader.load("./textures/" + texture + "_ao.jpg");
//   cubeMaterial.normalMap = loader.load("./textures/" + texture + "_normal.jpg");

//   cubeMaterial.displacementScale =0.09;
//   cubeMaterial.displacementBias = -0.04;

//   // cubeMaterial.emissive = new THREE.Color(0x00f0ff);
//   // gui.add(cubeMaterial, "emissiveIntensity", 0, 1).step(0.01);
//   const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
//   cubeMesh.position.set(x, y, z);
//   cubeMesh.castShadow = true;
//   const cf = gui.addFolder(name);
//   cf.add(cubeMaterial, "opacity", 0, 1).step(0.01);
//   cf.add(cubeMaterial, "displacementScale", 0, 1).step(0.01);
//   cf.add(cubeMaterial, "displacementBias", -10, 10).step(0.00001);
//   cubeMaterial.transparent = true;
//   cubeMesh.receiveShadow = true;
//   cubeMesh.name = name;
//   scene.add(cubeMesh);
// }
function createPostLight() {
  const spotLight = new THREE.SpotLight("white");
  spotLight.position.set(-6, 1, 6);
  spotLight.castShadow = true;
  spotLight.intensity = 1;
  spotLight.shadow.mapSize.width = 4096;
  spotLight.shadow.mapSize.height = 4096;
  spotLight.penumbra = 1;

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
  // --
  const cf = gui.addFolder("light");
  cf.add(spotLight.position, "x", -5, 15).step(0.01);
  cf.add(spotLight.position, "y", -5, 15);
  cf.add(spotLight.position, "z", -5, 15);
  cf.add(spotLight, "penumbra", 0, 1).step(0.01);

  scene.add(spotLight);
}

createScene();
