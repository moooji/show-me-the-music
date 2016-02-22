'use strict';

import React from 'react';
import THREE from 'three';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const TrackVisualizer = React.createClass({

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    data: React.PropTypes.object,
  },

  componentDidMount: function () {
    const { width, height } = this.props;
    const container = ReactDOM.findDOMNode(this.refs.container);

    this.mouseX = 0;
    this.mouseY = 0;

    this.camera = new THREE.PerspectiveCamera(20, width / height, 1, 10000);
    this.camera.position.z = 1800;
    this.scene = new THREE.Scene();

    this.light = new THREE.DirectionalLight(0xffffff);
    this.light.position.set(0, 0, 1);
    this.scene.add(this.light);

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    container.appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);

    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    this.animate();
    this.drawSections(this.props.data);
  },

  componentWillReceiveProps: function (nextProps) {
    this.drawSections(nextProps.data);
  },

  componentWillUnmount: function () {
    console.log('Unmount');
    this.scene = null;
    this.camera = null;
    this.canvas = null;
    this.light = null;
    this.renderer = null;
    this.mouseX = null;
    this.mouseY = null;
  },

  onDocumentMouseMove(e) {
    this.mouseX = (e.clientX - this.props.width);
    this.mouseY = (e.clientY - this.props.height);
  },

  drawSections(data) {
    if (!data || !data.sections) {
      return;
    }

    const offset = { x: 450, y: 0, y: 0 };

    data.sections.forEach((section) => {
      const size = section.duration * 2;
      const position = { x: section.start * 4 + size / 2, y: 0, y: 0 };
      const rotation = { x: -1.87, y: 0, y: 0 };
      //const size = -300 / section.loudness;
      //const size = { x: section.duration * 4, y: -300 / section.loudness, z: 100 };
      this.addMesh(position, rotation, size, offset);
    });
  },

  addMesh(position, rotation, size, offset) {
    //const shadowTexture = new THREE.Texture(this.canvas);
    //shadowTexture.needsUpdate = true;
    //const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture });
    //const shadowGeo = new THREE.PlaneBufferGeometry(size, size, 1, 1);
    // const mesh = new THREE.Mesh(shadowGeo, shadowMaterial);

    const mesh = new THREE.Mesh();
    //mesh.position.y = position.y;
    //mesh.position.x = position.x;
    //mesh.rotation.x = rotation.x;
    this.scene.add(mesh);

    const faceIndices = ['a', 'b', 'c'];

    let color;
    let f;
    let p;
    let vertexIndex;

    const geometry  = new THREE.IcosahedronGeometry(size, 1);
    //const geometry  = new THREE.BoxGeometry(size.x, size.y, size.z);

    for (let i = 0; i < geometry.faces.length; i++) {
      f  = geometry.faces[i];

      for (let j = 0; j < 3; j++) {
        vertexIndex = f[faceIndices[j]];
        p = geometry.vertices[vertexIndex];

        color = new THREE.Color(0xffffff);
        color.setHSL((p.y / size + 1) / 2, 1.0, 0.5);

        f.vertexColors[j] = color;
        color = new THREE.Color(0xffffff);
        color.setHSL(0.0, (p.y / size + 1) / 2, 0.5);
      }
    }

    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, shininess: 50 }),
      //new THREE.MeshBasicMaterial({ color: 0xffffff, shading: THREE.FlatShading, wireframe: true, transparent: true }),
		];

    const group1 = THREE.SceneUtils.createMultiMaterialObject(geometry, materials);
    group1.position.x = position.x - offset.x;
    group1.rotation.x = rotation.x;
    this.scene.add(group1);
  },

  animate() {
    if (!this.camera || !this.scene || !this.renderer) {
      return;
    }

    requestAnimationFrame(this.animate);
    this.draw();
  },

  draw() {
    this.camera.lookAt(this.scene.position);
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.1;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.1;
    this.renderer.render(this.scene, this.camera);
  },

  render: function () {
    return (
      <div className="three-container"
        ref="container"
        width={this.props.width}
        height={this.props.height}></div>
    );
  },
});

export default TrackVisualizer;
