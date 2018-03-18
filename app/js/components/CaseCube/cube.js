import * as THREE from 'three';
require('./OrbitControls');

const cube = (parentEl, history) => {

  // ----> GLOBAL VARIABLES <----
  var cubeGroup;
  var cases = [
    { id: 1, faceIndexes: [8, 9] },
    { id: 2, faceIndexes: [10, 11] },
    { id: 3, faceIndexes: [0, 1] },
    { id: 4, faceIndexes: [2, 3] },
    { id: 5, faceIndexes: [6, 7] },
    { id: 6, faceIndexes: [4, 5] }
  ];
  var texts = [];
  var cubeGroup = new THREE.Group();

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(-1, 1, 3);

  // ----> ADD DIRECTIONAL LIGHT 1 <----
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight.castShadow = true;
  directionalLight.position.set(-1.7, 2, 2);
  scene.add(directionalLight);

  var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
  // scene.add(directionalLightHelper);

  // ----> ADD DIRECTIONAL LIGHT 2 <----
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight.castShadow = true;
  directionalLight.position.set(1.7, 2, -2);
  scene.add(directionalLight);

  var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
  // scene.add(directionalLightHelper);

  // ----> ADD SPOTLIGHT <----
  var spotLight = new THREE.SpotLight(0xffffff, 0.5);
  spotLight.position.set(-1, 1, 3);
  spotLight.angle = 0.7;
  spotLight.distance = 5;
  spotLight.intensity = 2;
  spotLight.castShadow = true;
  // scene.add(spotLight);

  var spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);

  //<---- ADD AMBIENT LIGHT <----

  var light = new THREE.AmbientLight(0x737d75); // soft white light
  scene.add(light);

  //<---- ADD RENDERER <----

  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xd9e3db);
  parentEl.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapType = THREE.PCFSoftShadowMap;

  //<---- ADD ORBIT CONTROLS ---->

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // <---- ADD CUBE ---->

  var geometry = new THREE.BoxGeometry(1, 1, 1);

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    vertexColors: THREE.FaceColors
  });
  material.vertexColors = THREE.FaceColors;
  var cube = new THREE.Mesh(geometry, material);
  cube.receiveShadow = true;
  cube.castShadow = true;
  cube.geometry.computeBoundingBox();
  console.log(cube);
  cubeGroup.add(cube);

  // ----> ADD RAY CASTER <----

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  function onMouseDown(event) {
    // event.preventDefault();
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0) {
      var index = Math.floor(intersects[0].faceIndex / 2);
      switch (index) {
        case 0:
          console.log('0');
          break;
        case 1:
          console.log('1');
          break;
        case 2:
          console.log('2');
          break;
        case 3:
          console.log('3');
          break;
        case 4:
          console.log('4');
          texts[0].position.z = 0;
          history.push('/cases/1');
          break;
        case 5:
          console.log('5');
          break;
      }
    } else {
      cube.geometry.faces[intersects[0].faceIndex].color.set(0x000000);
      geometry.colorsNeedUpdate = true;
    }
  }

  function onMouseMove() {
    // event.preventDefault();
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObject(cube);

    texts.forEach(text => {
      if (intersects.length > 0) {
        if (text.faceIndexes.includes(intersects[0].faceIndex)) {
          text.material.color.setHex(0xff00ff);
          text.material.needsUpdate = true;
        } else {
          text.material.color.setHex(0xffffff);
          text.material.needsUpdate = true;
        }
      } else {
        text.material.color.setHex(0xffffff);
        text.material.needsUpdate = true;
      }
    });
  }

  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mousemove', onMouseMove, false);

  // ----> ADD TEXT <----

  var loader = new THREE.FontLoader();

  loader.load('fonts/helvetiker_regular.typeface.json', createText);

  function pushed(element) {
    element.position.z = -1;
  }

  function createText(font) {
    console.log('create Text');
    cases.forEach((item, index) => {
      var textGeo = new THREE.TextGeometry('#' + (index + 1), {
        font: font,
        size: 0.35,
        height: 0.05
      });

      var textMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

      var textMesh = new THREE.Mesh(textGeo, textMaterial);

      textMesh.castShadow = true;
      item.textId = index;
      texts.push(textMesh);
      texts[index].faceIndexes = item.faceIndexes;
      cubeGroup.add(textMesh);

      switch (index) {
        case 0:
          textMesh.position.x = -0.31;
          textMesh.position.y = -0.15;
          textMesh.position.z = 0.5;
          break;
        case 1:
          textMesh.position.x = 0.31;
          textMesh.position.y = -0.15;
          textMesh.position.z = -0.5;
          textMesh.rotation.y = 180 * Math.PI / 180;
          break;
        case 2:
          textMesh.position.x = 0.5;
          textMesh.position.y = -0.15;
          textMesh.position.z = 0.31;
          textMesh.rotation.y = 90 * Math.PI / 180;
          break;
        case 3:
          textMesh.position.x = -0.5;
          textMesh.position.y = -0.15;
          textMesh.position.z = -0.31;
          textMesh.rotation.y = 270 * Math.PI / 180;
          break;
        case 4:
          textMesh.position.x = -0.31;
          textMesh.position.y = -0.5;
          textMesh.position.z = -0.15;
          textMesh.rotation.x = 90 * Math.PI / 180;
          break;
        case 5:
          textMesh.position.x = -0.31;
          textMesh.position.y = 0.5;
          textMesh.position.z = 0.15;
          textMesh.rotation.x = 270 * Math.PI / 180;
          break;
      }
    });
  }

  // <---- ADD CUBE GROUP TO SCENE ---->
  scene.add(cubeGroup);

  // <---- ADD PLANE ---->
  var planeGeometry = new THREE.PlaneGeometry(100, 100);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  });
  var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

  planeMesh.position.y = -1;
  planeMesh.rotation.x = 90 * Math.PI / 180;
  planeMesh.receiveShadow = true;
  // scene.add(planeMesh);
  console.log(texts);
  function animate() {
    window.requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }

  animate();
}

export default cube;
