
//space image http://www.capella-observatory.com/images/Galaxies/NGC678Big.jpg
//dinasour from turbosquid 
//could not find star model as glb so used a dino sorry :/

import * as THREE from "three";
import { DirectionalLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PointLight, SphereGeometry, TorusGeometry, Vector3 } from "three";
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

const sunLight = new PointLight({color:0xffbf00}, 1, 1000);
scene.add(sunLight);
sunLight.position = new Vector3(0,0,0);

const sunGeo = new SphereGeometry(10, 50, 50);
const sunMat = new MeshBasicMaterial({color:0xffbf00});
const sun = new Mesh(sunGeo, sunMat);
sun.position = new Vector3(0,0,0);
scene.add(sun);
sun.material.wireframe = false;

const lastZPos = sun.geometry.attributes.position.array.length-1;

//#region mercury
const mercObj = new Object3D();
const mercuryGeo = new SphereGeometry(.5, 10, 10);
const mercuryMat = new MeshStandardMaterial({color:0x7c757e});
const mercury = new Mesh(mercuryGeo, mercuryMat);
mercObj.add(mercury);
mercury.position.set(20, 0,0);
const mercSpeed = .2;
scene.add(mercObj);

//#endregion

//#region venus
const venObj = new Object3D();
const venusGeo = new SphereGeometry(2.3, 10, 10);
const venusMat = new MeshStandardMaterial({color:0xdeb887});
const venus = new Mesh(venusGeo, venusMat);
venObj.add(venus);
venus.position.set(40, 0,0);
const venusSpeed = .4;
scene.add(venObj);
//#endregion

//#region earth
const earthObj = new Object3D();
const earthGeo = new SphereGeometry(2, 10, 10);
const earthMat = new MeshStandardMaterial({color:0x9ab762});
const earth = new Mesh(earthGeo, earthMat);

earth.position.set(60, 0,0);
const earthSpeed = .33;

const moonObj = new Object3D();
//moonObj.position.set(60, 0,0);
const moonGeo = new SphereGeometry(.8, 10, 10);
const moonMat = new MeshStandardMaterial({color:0xffffff});
const moon = new Mesh(moonGeo, moonMat);

const moonLight = new PointLight({color:0xffbf00}, .6, 10);
moon.add(moonLight);

moon.position.set(5, 0, 0);
const moonSpeed = 2;

earthObj.add(earth);
earth.add(moonObj);
moonObj.add(moon);
scene.add(earthObj);
//#endregion

//#region mars
const marsObj = new Object3D();
const marsGeo = new SphereGeometry(1.8, 10, 10);
const marsMat = new MeshStandardMaterial({color:0xff852b});
const mars = new Mesh(marsGeo, marsMat);
marsObj.add(mars);
mars.position.set(80, 0,0);
const marsSpeed = .45;
scene.add(marsObj);
//#endregion

//#region jupiter
const jupiterObj = new Object3D();
const jupiterGeo = new SphereGeometry(6, 10, 10);
const jupiterMat = new MeshStandardMaterial({color:0xff852b});
const jupiter = new Mesh(jupiterGeo, jupiterMat);
jupiterObj.add(jupiter);
jupiter.position.set(100, 0,0);
const jupiterSpeed = .26;
scene.add(jupiterObj);
//#endregion

//#region saturn
const saturnObj = new Object3D();
const saturnGeo = new SphereGeometry(5, 40, 40);
const saturnMat = new MeshStandardMaterial({color:0xe5d0b1});
const saturn = new Mesh(saturnGeo, saturnMat);
saturnObj.add(saturn);
saturn.position.set(120, 0,0);
const saturnSpeed = .13;


const ring1Geo = new TorusGeometry(6, .2, 40, 40);
const ring2Geo = new TorusGeometry(7, .2, 40, 40);
const ring3Geo = new TorusGeometry(8, .2, 40, 40);
const ringMat = new MeshStandardMaterial({color:0xb0e0e6});
const ring1 = new Mesh(ring1Geo, ringMat);
const ring2 = new Mesh(ring2Geo, ringMat);
const ring3 = new Mesh(ring3Geo, ringMat);


saturn.add(ring1);
saturn.add(ring2);
saturn.add(ring3);
scene.add(saturnObj);
//#endregion

//#region uranus
const uranusObj = new Object3D();
const uranusGeo = new SphereGeometry(3.5, 10, 10);
const uranusMat = new MeshStandardMaterial({color:0x87b3d6});
const uranus = new Mesh(uranusGeo, uranusMat);
uranusObj.add(uranus);
uranus.position.set(140, 0,0);
const uranusSpeed = .17;
scene.add(uranusObj);
//#endregion

//#region neptune
const neptuneObj = new Object3D();
const neptuneGeo = new SphereGeometry(3, 10, 10);
const neptuneMat = new MeshStandardMaterial({color:0x9fb6cd});
const neptune = new Mesh(neptuneGeo, neptuneMat);
neptuneObj.add(neptune);
neptune.position.set(160, 0,0);
const neptuneSpeed = .14;
scene.add(neptuneObj);
//#endregion

//#region pluto
const plutoObj = new Object3D();
const plutoGeo = new SphereGeometry(.9, 10, 10);
const plutoMat = new MeshStandardMaterial({color:0x9fb6cd});
const pluto = new Mesh(plutoGeo, plutoMat);
plutoObj.add(pluto);
pluto.position.set(180, 0,0);
const plutoSpeed = .1;
scene.add(plutoObj);
//#endregion

function animate(time){

    sun.rotation.x = time/1000;
    mercObj.rotation.y = (mercSpeed * time/1000);
    venObj.rotation.y = (venusSpeed * time/1000);
    earthObj.rotation.y = (earthSpeed * time/1000);
    moonObj.rotation.y = (moonSpeed * time/1000);
    moonObj.rotation.x = (moonSpeed/2.5 * time/1000);
    marsObj.rotation.y = (marsSpeed * time/1000);
    jupiterObj.rotation.y = (jupiterSpeed * time/1000);
    saturnObj.rotation.y =(saturnSpeed * time/1000);
    uranusObj.rotation.y = (uranusSpeed * time/1000);
    neptuneObj.rotation.y = (neptuneSpeed * time/1000);
    plutoObj.rotation.y = (plutoSpeed * time/1000);

    saturn.rotation.x = (saturnSpeed * time/1000);
    ring2.rotation.x = (saturnSpeed/.3 * time/1000);
    ring1.rotation.y = (saturnSpeed/.25 * time/1000);

    mercury.rotation.y = (mercSpeed * time/1000);
    venus.rotation.z = (venusSpeed * time/1000);
    earth.rotation.y = (earthSpeed * time/1000);
    mars.rotation.y = (marsSpeed * time/1000);
    jupiter.rotation.y = (jupiterSpeed * time/1000);
    saturn.rotation.z = (saturnSpeed * time/1000);
    neptune.rotation.x = (neptuneSpeed * time/1000);
    uranus.rotation.x = (uranusSpeed * time/1000);
    pluto.rotation.z = (plutoSpeed * time/1000);

    for(var j = 0; j < sun.geometry.attributes.position.array.length; j+=4){
        
            sun.geometry.attributes.position.array[j+0] = 2 * Math.random();
            //sun.geometry.attributes.position.array[j+1] += 5 * Math.random();
            //sun.geometry.attributes.position.array[j+2] += 5 * Math.random();
        
            sun.geometry.attributes.position.array[lastZPos] = 5 * Math.random();
        
            sun.geometry.attributes.position.needsUpdate = true;
        
    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
