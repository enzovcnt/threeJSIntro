import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { DeviceOrientationControls } from 'three/addons/controls/DeviceOrientationControls.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100)
const renderer = new THREE.WebGLRenderer()
const controls = new OrbitControls(camera, renderer.domElement)

const radius = 30
controls.enablePan = false
controls.enableZoom = false


let spherical = new THREE.Spherical(1, Math.PI / 2, 0)
spherical.makeSafe()
camera.position.setFromSpherical(spherical)

//
let src = 'https://s.bepro11.com/vr-video-sample.mp4'
const video = document.createElement('video')
video.src = src
video.loop = true
video.muted = true
video.playsInline = true
video.crossOrigin = 'anonymous'
video.play()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const texture = new THREE.VideoTexture(video)
const geometry = new THREE.SphereGeometry(radius, 48, 32)
const material = new THREE.MeshBasicMaterial({ map: texture })
material.side = THREE.BackSide

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

function changeVideo(src) {
    const newVideo = document.createElement('video')
    newVideo.loop = true;
    newVideo.muted = true;
    newVideo.play();

    const newVideoTexture = new THREE.VideoTexture(newVideo);
    sphere.material.map = newVideoTexture;
    sphere.material.needsUpdate = true;
}

const btn = document.createElement('btn');
btn.textContent = 'Change Video';
document.body.appendChild(btn);

btn.addEventListener('click', () => {
    changeVideo('video/video2.mp4')
})


function animate() {
    requestAnimationFrame(animate)


    renderer.render(scene, camera)
}

animate()



window.addEventListener('resize', onWindowResize)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}


