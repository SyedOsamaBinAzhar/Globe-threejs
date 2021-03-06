import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { TextureLoader } from 'three';

// Debug
const gui = new dat.GUI()

//LOADER
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/textures/NormalMap.png")

// fetching canvas
const canvas = document.querySelector('canvas.webgl')

// creating a scene
const scene = new THREE.Scene()

// creating torus object ->  torus(donut) is a surface of revolution generated by revolving a circle in three-dimensional space.
//Torus Geometry takes (radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)

// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

//using geometry we can create cubes/circles and a lot of other shapes.

//getting simple sphere
const geometry = new THREE.SphereBufferGeometry( .5, 64,64 );


// Materials -> used for styling of objects
// an object with one or more properties defining the material's appearance.
// const material = new THREE.MeshBasicMaterial()
// material.color = new THREE.Color(0xff0000)

const material = new THREE.MeshStandardMaterial();//for realistic effect
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929);




// Mesh -> Class representing triangular polygon mesh based objects
// a polygon mesh is a collection of vertices, edges and faces that defines the shape of a polyhedral object. 
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights -> A light that gets emitted from a single point in all directions.
//  Ex: light from a bulb
//PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )

//LIGHT 1
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//LIGHT 2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.x = -1.86
pointLight2.position.y = 1;
pointLight2.position.z = -1.65;
pointLight2.intensity = 10;
scene.add(pointLight2)

//categorizing into folders in gui for adjustment of values
const light1 = gui.addFolder('Light 1');

//gui helps us to adjust value via UI
//min max is the range of values
//step is the increment each time we increase the value from min to max
light1.add(pointLight2.position , 'y' ).min(-3).max(3).step(0.01)
light1.add(pointLight2.position , 'x' ).min(-36).max(3).step(0.01)
light1.add(pointLight2.position , 'z' ).min(-3).max(3).step(0.01)
light1.add(pointLight2 , 'intensity' ).min(0).max(10).step(0.01)

//This displays a helper object consisting of a spherical Mesh for visualizing a PointLight.
//point light helper
// const pointLightHelper = new THREE.PointLightHelper(pointLight2,1)
// scene.add(pointLightHelper)


//LIGHT 3
const pointLight3 = new THREE.PointLight(0xe1ff, 2)
pointLight3.position.x = 2.13
pointLight3.position.y = -1.58;
pointLight3.position.z = -1.98;
pointLight3.intensity = 6.8;
scene.add(pointLight3)

//categorizing into folders in gui for adjustment of values
const light2 = gui.addFolder('Light 2');

//gui helps us to adjust value via UI
//min max is the range of values
//step is the increment each time we increase the value from min to max
// light2.add(pointLight3.position , 'y' ).min(-3).max(3).step(0.01)
// light2.add(pointLight3.position , 'x' ).min(-36).max(3).step(0.01)
// light2.add(pointLight3.position , 'z' ).min(-3).max(3).step(0.01)
// light2.add(pointLight3 , 'intensity' ).min(0).max(10).step(0.01)

// const light2Color = {
//     color : 0xff1234
// }

// light2.addColor(light2Color,'color').onChange(()=>{
//     pointLight3.color.set(light2Color.color)
// })
//This displays a helper object consisting of a spherical Mesh for visualizing a PointLight.
//point light helper
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3,1)
// scene.add(pointLightHelper2)


//sizes initialized
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//on responsiveness
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', () => {
        // tracking mouse movement
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
});



//Setting up the camera
//There are different types of cameras.
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
//setting up camera's position.
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true


//RENDERER
//WebGLRenderer is used to render the scene on screen.
//The WebGL renderer displays your beautifully crafted scenes using WebGL.
//takes an object as an arg
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//  Object for keeping track of time
//provides methods to stop, start, getTime methods.
const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;


// .getElapsedTime () : Float
// Get the seconds passed since the clock started and sets oldTime to the current time.
    const elapsedTime = clock.getElapsedTime()

    // rotate objects -> y-axis -> default rotation
    sphere.rotation.y = .5 * elapsedTime

    //on rotation of mouse globe rotates on x y and z axis
    sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x)
    sphere.rotation.z += 0.5 * (targetY - sphere.rotation.x)




    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()