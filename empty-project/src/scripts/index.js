import "the-new-css-reset/css/reset.css";
import "../styles/style.css";

import {
    AmbientLight,
    BoxGeometry,
    DirectionalLight,
    Group,
    Mesh,
    MeshLambertMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer,
} from "three";

import { record } from "./recorder";
import { mapRange } from "./util";

const camera = new PerspectiveCamera(75, 600 / 400, 0.1, 1000);
const renderer = new WebGLRenderer({ alpha: true });
const scene = new Scene();

const domSetup = () => {
    document.body.insertAdjacentHTML(
        "afterbegin",
        `<a id="download" class="hidden" download="recordingVideo">Download video</a>`
    );
    document.body.insertAdjacentElement("afterbegin", renderer.domElement);
};

const placeLights = () => {
    const lightGroup = new Group();
    scene.add(lightGroup);

    const ambientLight = new AmbientLight(0x2e386b, 0.5);
    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    const pointLight = new PointLight(0xffdd88, 1);

    directionalLight.position.set(-2, 2, 1);

    lightGroup.add(ambientLight);
    lightGroup.add(directionalLight);
    lightGroup.add(pointLight);
};

const placeCamera = () => {
    camera.position.set(0, 0, 3);
    camera.lookAt(0, 0, 0);
};

const mesh = new Mesh(
    new BoxGeometry(2, 1, 1),
    new MeshLambertMaterial({
        color: 0xffffff,
    })
);

const render = (delta) => {
    const x = mapRange(delta, 0, 10000, 0, Math.PI * 2);
    const y = mapRange(delta, 0, 10000, 0, Math.PI * 4);

    mesh.rotation.x = Math.cos(x);
    mesh.rotation.y = Math.sin(y);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

const start = () => {
    domSetup();
    placeLights();
    placeCamera();

    scene.add(mesh);

    render();

    record(renderer.domElement, 10000).then((url) => {
        const downloadLink = document.querySelector("#download");
        downloadLink.classList.remove("hidden");
        downloadLink.setAttribute("href", url);
    });
};

start();
