import React, { Component } from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";

class ThreeScene extends Component {
  componentDidUpdate() {
    const data = this.props.dataFromFile;
    this.loadModel(data);
  }

  componentDidMount() {
    this.setScene();
    window.addEventListener("resize", this.handleResize, false);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
    window.removeEventListener("resize", this.handleResize, false);
  }

  render() {
    return (
      <div
        className="fill-window"
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }

  //Handle Resize
  handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  //Handle Model
  removeModel = () => {
    this.scene.children.forEach((o) => {
      if (o.name === "imported") {
        this.scene.remove(o);

        o.children.forEach((c) => {
          c.material.dispose();
        });
      }
    });
  };

  loadModel = (data) => {
    this.removeModel();
    let objLoader = new OBJLoader();

    const material2 = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    let objGroup = objLoader.parse(data);
    objGroup.children.forEach((o) => {
      o.material = material2;
    });
    objGroup.name = "imported";
    this.scene.add(objGroup);
    this.fitCameraToObjects(objGroup.children);
  };

  //Set three.js scene
  addRenderer = (width, height) => {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      autoClear: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x333333, 1);
    this.mount.appendChild(this.renderer.domElement);
  };

  addCamera = (width, height) => {
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 8;
    this.camera.position.y = 5;
    this.camera.aspect = width / height;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.5;
    this.controls.rotateSpeed = 0.4;
    this.controls.panSpeed = 0.4;
  };

  fitCameraToObjects = (objects, fitOffset = 1.2) => {
    const box = new THREE.Box3();
    for (const object of objects) box.expandByObject(object);

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxSize = Math.max(size.x, size.y, size.z);
    const fitHeightDistance =
      maxSize / (2 * Math.atan((Math.PI * this.camera.fov) / 360));
    const fitWidthDistance = fitHeightDistance / this.camera.aspect;
    const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

    const direction = this.controls.target
      .clone()
      .sub(this.camera.position)
      .normalize()
      .multiplyScalar(distance);

    this.controls.maxDistance = distance * 10;
    this.controls.target.copy(center);

    this.camera.near = distance / 100;
    this.camera.far = distance * 100;
    this.camera.updateProjectionMatrix();

    this.camera.position.copy(this.controls.target).sub(direction);

    this.controls.update();
  };

  addLights = () => {
    this.ambientLight = new THREE.AmbientLight(0x101010);
    this.ambientLight.intensity = 4.0;
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0x101010);
    this.directionalLight.intensity = 12.0;
    this.directionalLight.position.y = 10;
    //this.directionalLight1.position.set(-100, -50, 100);

    var targetObj = new THREE.Object3D();
    targetObj.position.x = 5;
    this.scene.add(targetObj);
    this.directionalLight.target = targetObj;

    this.scene.add(this.directionalLight);
    // var helper = new THREE.DirectionalLightHelper(this.directionalLight, 5);
    // this.scene.add(helper);
  };

  setScene = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    this.addRenderer(width, height);
    this.addCamera(width, height);
    this.addLights();

    this.renderScene();
    this.start();
    console.log("Scene Loaded!");
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };
}

export default ThreeScene;
