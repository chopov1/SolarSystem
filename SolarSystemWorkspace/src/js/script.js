
//space image http://www.capella-observatory.com/images/Galaxies/NGC678Big.jpg
//dinasour from turbosquid 

import * as THREE from "three";
import { DirectionalLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PointLight, SphereGeometry, Vector3 } from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import myImage from '../img/NGC678Big.jpg'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

//use ctrl c to stop the program running and gain control of the console
//ThreeJS is a Y-up platform
//use f12 on website to debug
//to run type "parcel ./src/index.html"

//#region setup
var height = window.innerHeight;
var width = window.innerWidth;

const mousePos = new THREE.Vector2();

window.addEventListener('mousemove', function(e){
    mousePos.x = (e.clientX / width) * 2 -1;
    mousePos.y = (e.clientY / height) * 2 +1;
})

const starURL = new URL('../assets/stegosaurs_SStenops.glb', import.meta.url);

const assetLoader = new GLTFLoader();
assetLoader.load(starURL.href,function(gltf){
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12,4,10);
},
undefined,
function(error){
    console.error(error);
}
)

const raycaster = new THREE.Raycaster();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1,1000);
camera.position.set(-10,30,30);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
//scene.background = textureLoader.load(myImage,myImage,myImage,myImage,myImage,myImage);

const cubeLoader = new THREE.CubeTextureLoader();
scene.background = cubeLoader.load([myImage,myImage,myImage,myImage,myImage,myImage]);

//#endregion

const sunLight = new PointLight({color:0xffbf00}, 100, 100);
scene.add(sunLight);
sunLight.position = new Vector3(0,0,0);

const sunGeo = new SphereGeometry(10, 20, 20);
const sunMat = new MeshBasicMaterial({color:0xffbf00});
const sun = new Mesh(sunGeo, sunMat);
sun.position = new Vector3(0,0,0);
scene.add(sun);

//#region mercury
const mercObj = new Object3D();
const mercuryGeo = new SphereGeometry(.5, 20, 20);
const mercuryMat = new MeshStandardMaterial({color:0x7c757e});
const mercury = new Mesh(mercuryGeo, mercuryMat);
mercObj.add(mercury);
mercury.position.set(20, 0,0);
const mercSpeed = .2;
scene.add(mercObj);

//#endregion

//#region venus
const venObj = new Object3D();
const venusGeo = new SphereGeometry(2.3, 40, 40);
const venusMat = new MeshStandardMaterial({color:0x7c757e});
const venus = new Mesh(venusGeo, venusMat);
venObj.add(venus);
venus.position.set(40, 0,0);
const venusSpeed = .4;
scene.add(venObj);
//#endregion

//#region earth
const earthObj = new Object3D();
const earthGeo = new SphereGeometry(2, 40, 40);
const earthMat = new MeshStandardMaterial({color:0x9ab762});
const earth = new Mesh(earthGeo, earthMat);

earth.position.set(60, 0,0);
const earthSpeed = .33;

const moonObj = new Object3D();
//moonObj.position.set(60, 0,0);
const moonGeo = new SphereGeometry(.8, 20, 20);
const moonMat = new MeshStandardMaterial({color:0xffffff});
const moon = new Mesh(moonGeo, moonMat);

moon.position.set(5, 0, 0);
const moonSpeed = 2;

earthObj.add(earth);
earth.add(moonObj);
moonObj.add(moon);
scene.add(earthObj);
//#endregion

//#region mars
const marsObj = new Object3D();
const marsGeo = new SphereGeometry(1.8, 40, 40);
const marsMat = new MeshStandardMaterial({color:0xff852b});
const mars = new Mesh(marsGeo, marsMat);
marsObj.add(mars);
mars.position.set(80, 0,0);
const marsSpeed = .45;
scene.add(marsObj);
//#endregion


function animate(time){

    sun.rotation.x = time/1000;
    mercObj.rotation.y = (mercSpeed * time/1000);
    venObj.rotation.y = (venusSpeed * time/1000);
    earthObj.rotation.y = (earthSpeed * time/1000);
    moonObj.rotation.y = (moonSpeed * time/1000);
    moonObj.rotation.x = (moonSpeed/2.5 * time/1000);
    marsObj.rotation.y = (marsSpeed * time/1000);
    
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
