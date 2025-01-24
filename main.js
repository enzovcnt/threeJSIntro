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


let src = ['https://s.bepro11.com/vr-video-sample.mp4', 'https://enzovcnt.github.io/threeJSIntro/video/video2.mp4']
let currentIndex = 0;

const video = document.createElement('video')
video.src = src[0]
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

function changeVideo() {
    currentIndex = (currentIndex + 1) % src.length; // Increment index and wrap around > permet de boucler entre les vidéos sans dépasser les limites du tableau.
    video.src = src[currentIndex]; // Update video source
    video.play(); // Start playing the new video
}

// Create a button and position it over the video
const btn = document.createElement('button');
btn.textContent = 'Change Video';
btn.style.position = 'absolute';
btn.style.top = '900px';
btn.style.left = '900px';
btn.style.cursor = 'pointer';
btn.style.zIndex = '10'; // Ensure it appears on top of everything
document.body.appendChild(btn);

// Handle button click
btn.addEventListener('click', () => {
    changeVideo(); // Update with the path to your new video
});


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


let testVideo = document.createElement('video');
testVideo.style.width = document.width + 'px';
testVideo.style.height = document.height + 'px';
testVideo.autoplay = true;
testVideo.muted = true;
testVideo.playsInline = true;

let facingMode = "user";
let constraints = {
    audio: false,
    video: {
        facingMode: facingMode
    }
}

navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
    video.srcObject = stream;
});

document.body.appendChild(testVideo);

video.addEventListener('click', function() {
    if (facingMode === "user") {
        facingMode = "environment";
    } else {
        facingMode = "user";
    }

    constraints = {
        audio: false,
        video: {
            facingMode: facingMode
        }
    }

    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
        video.srcObject = stream;
    });
});