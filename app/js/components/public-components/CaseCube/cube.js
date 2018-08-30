import * as THREE from 'three';
import store from '../../../../entry';
require('./OrbitControls');

const colors = {
  bg: 0xffffff,
  plane: 0xffffff,
  cube: 0xffffff,
  text: 0xffffff,
  onHover: 0xff00ff
}

var cases = [
  { id: 1, faceIndexes: [8, 9] },
  { id: 2, faceIndexes: [10, 11] },
  { id: 3, faceIndexes: [0, 1] },
  { id: 4, faceIndexes: [2, 3] },
  { id: 5, faceIndexes: [6, 7] },
  { id: 6, faceIndexes: [4, 5] }
];

const cube = (parentEl, history) => {
  var cubeGroup;
  var texts = [];
  
  // ----> ADD RAY CASTER <----
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  
  // ----> ADD CAMERA <----
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  
  camera.position.set(-1, 1, 1.5);
  
  // ----> ADD CUBE GROUP <----
  var cubeGroup = new THREE.Group();
  cubeGroup.rotation.set(0.1,0.15,0.1);
  
  // <---- ADD CUBE ---->

  var geometry = new THREE.BoxGeometry(1, 1, 1);

  var material = new THREE.MeshPhongMaterial({
    color: colors.cube,
    vertexColors: THREE.FaceColors
  });
  material.vertexColors = THREE.FaceColors;
  var cube = new THREE.Mesh(geometry, material);
  cube.receiveShadow = true;
  cube.castShadow = true;
  cube.geometry.computeBoundingBox();
  cubeGroup.add(cube);
  
  function init() {
    // ----> ADD SCENE <----
    var scene = new THREE.Scene();

    // ----> ADD DIRECTIONAL LIGHT 1 <----
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
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
    var spotLight = new THREE.SpotLight(0xffffff, 0.05);
    spotLight.position.set(-1, 1, 3);
    spotLight.angle = 0.7;
    spotLight.distance = 5;
    spotLight.intensity = 2;
    spotLight.castShadow = true;
    // scene.add(spotLight);

    var spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);

    //<---- ADD AMBIENT LIGHT <----

    var light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(light);

    //<---- ADD RENDERER <----

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(colors.bg);
    parentEl.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    
    window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

    //<---- ADD ORBIT CONTROLS ---->

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    // ----> ADD TEXT <----

    var loader = new THREE.FontLoader();

    loader.load('fonts/helvetiker_regular.typeface.json', createText);

    function pushed(element) {
      element.position.z = -1;
    }

    function createText(font) {
      cases.forEach((item, index) => {
        let textGeo;
        if(index === 4) {
          textGeo = new THREE.TextGeometry('TBA', {
            font: font,
            size: 0.25,
            height: 0.05
          });
        } else {
          textGeo = new THREE.TextGeometry('#' + (index + 1), {
            font: font,
            size: 0.35,
            height: 0.05
          });
        }

        var textMaterial = new THREE.MeshLambertMaterial({ color: colors.text });

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
      color: colors.plane,
      side: THREE.DoubleSide
    });
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    planeMesh.position.y = -1;
    planeMesh.rotation.x = 90 * Math.PI / 180;
    planeMesh.receiveShadow = true;
    // scene.add(planeMesh);
    function animate() {
      window.requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    animate();
  }

  function onMouseDown(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObject(cube);

    const casesFromStore = store.getState().cases.cases;
    
    const cases = Object.keys(casesFromStore).map(item => {
      return casesFromStore[item];
    }).sort((a, b) => {return a.order - b.order});

    if (intersects.length > 0) {
      var index = Math.floor(intersects[0].faceIndex / 2);
      switch (index) {
        case 0:
          history.push(`/cases/${cases[2].slug}`);
          break;
        case 1:
          history.push(`/cases/${cases[3].slug}`);
          break;
        case 2:
          history.push(`/cases/${cases[4].slug}`);
          break;
        case 3:
          // history.push(`/cases/${cases[4].slug}`);
          break;
        case 4:
          texts[0].position.z = 0;
          history.push(`/cases/${cases[0].slug}`);
          break;
        case 5:
          history.push(`/cases/${cases[1].slug}`);
          break;
      }
    } else {
      if(!cube.geometry.faces[intersects[0]]) {
        return;
      }
      cube.geometry.faces[intersects[0].faceIndex].color.set(colors.onHover);
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
          text.material.color.setHex(colors.text);
          text.material.needsUpdate = true;
        }
      } else {
        text.material.color.setHex(colors.text);
        text.material.needsUpdate = true;
      }
    });
  }
  
  function addListeners() {
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
  }
  
  function removeListeners() {
    window.removeEventListener('mousedown', onMouseDown, false);
    window.removeEventListener('mousemove', onMouseMove, false);
  }
  
  return Object.freeze({
    init,
    addListeners,
    removeListeners
  })
}

export default cube;
