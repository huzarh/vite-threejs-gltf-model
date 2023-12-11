function createBox(THREE, gui, scene, name, w, h, d, x, y, z, texture) {
  const cubeGeometry = new THREE.BoxGeometry(w, h, d, 100, 100, 600);
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const loader = new THREE.TextureLoader();
  cubeMaterial.map = loader.load("./textures/" + texture + "diff_4k.jpg");
  cubeMaterial.displacementMap = loader.load(
    "./textures/" + texture + "disp_4k.jpg"
  );
  // cubeMaterial.displacementMap = loader.load("../textures/rence/" + texture + "Displacement.jpg");
  //   cubeMaterial.aoMap = loader.load(
  //     "./textures/rence/" + texture + "rough_4k.jpg"
  //   );
  cubeMaterial.normalMap = loader.load(
    "./textures/" + texture + "nor_dx_4k.jpg"
  );
  cubeMaterial.normalMap = loader.load(
    "./textures/" + texture + "nor_gl_4k.jpg"
  );

  //   cubeMaterial.alphaMap = loader.load(
  //     "../textures/rence/" + texture + "Opacity.jpg"
  //   );
  cubeMaterial.roughness = loader.load(
    "./textures/" + texture + "rough_4k.jpg"
  );
  // cubeMaterial.metalness  = loader.load("../textures/rence/" + texture + "Metalness.jpg");
  cubeMaterial.displacementScale = 0.05;
  cubeMaterial.displacementBias = -0.02;

  // cubeMaterial.emissive = new THREE.Color(0x00f0ff);
  // gui.add(cubeMaterial, "emissiveIntensity", 0, 1).step(0.01);

  if (name !== "cube1") {
    cubeMaterial.map.wrapS = THREE.RepeatWrapping;
    cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    cubeMaterial.map.repeat = new THREE.Vector2(5, 5);

    cubeMaterial.displacementMap.wrapS = THREE.RepeatWrapping;
    cubeMaterial.displacementMap.wrapT = THREE.RepeatWrapping;
    cubeMaterial.displacementMap.repeat = new THREE.Vector2(5, 5);

    cubeMaterial.normalMap.wrapS = THREE.RepeatWrapping;
    cubeMaterial.normalMap.wrapT = THREE.RepeatWrapping;
    cubeMaterial.normalMap.repeat = new THREE.Vector2(5, 5);

    cubeMaterial.roughness.wrapS = THREE.RepeatWrapping;
    cubeMaterial.roughness.wrapT = THREE.RepeatWrapping;
    cubeMaterial.roughness.repeat = new THREE.Vector2(5, 5);
  } else {
    let o = 2;
    cubeMaterial.map.wrapS = THREE.RepeatWrapping;
    cubeMaterial.map.wrapT = THREE.RepeatWrapping;
    cubeMaterial.map.repeat = new THREE.Vector2(o, o);

    cubeMaterial.displacementMap.wrapS = THREE.RepeatWrapping;
    cubeMaterial.displacementMap.wrapT = THREE.RepeatWrapping;
    cubeMaterial.displacementMap.repeat = new THREE.Vector2(o, o);

    cubeMaterial.normalMap.wrapS = THREE.RepeatWrapping;
    cubeMaterial.normalMap.wrapT = THREE.RepeatWrapping;
    cubeMaterial.normalMap.repeat = new THREE.Vector2(o, o);

    cubeMaterial.roughness.wrapS = THREE.RepeatWrapping;
    cubeMaterial.roughness.wrapT = THREE.RepeatWrapping;
    cubeMaterial.roughness.repeat = new THREE.Vector2(o, o);
  }

  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh.position.set(x, y, z);
  cubeMesh.castShadow = true;
  const cf = gui.addFolder(name);
  cf.add(cubeMaterial, "opacity", 0, 1).step(0.01);
  cf.add(cubeMaterial, "displacementScale", 0, 1).step(0.01);
  cf.add(cubeMaterial, "displacementBias", -10, 10).step(0.00001);
  cubeMaterial.transparent = true;
  cubeMesh.receiveShadow = true;
  cubeMesh.name = name;
  scene.add(cubeMesh);
}
export default createBox;
