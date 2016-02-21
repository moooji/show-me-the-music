'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
  Mesh,
  Scene,
  Color,
  Texture,
  PerspectiveCamera,
  DirectionalLight,
  MeshPhongMaterial,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  IcosahedronGeometry,
  FlatShading,
  VertexColors,
  SceneUtils,
  WebGLRenderer
} from 'three';

const SongVisualizer = React.createClass({

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.number),
  },

  componentDidMount: function () {
    const { width, height } = this.props;
    const container = ReactDOM.findDOMNode(this.refs.container);

    this.mouseX = 0;
    this.mouseY = 0;

    this.camera = new PerspectiveCamera(20, width / height, 1, 10000);
    this.camera.position.z = 1800;
    this.scene = new Scene();

    const light = new DirectionalLight(0xffffff);
    light.position.set(0, 0, 1);
    this.scene.add(light);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const shadowTexture = new Texture(canvas);
    shadowTexture.needsUpdate = true;
    const shadowMaterial = new MeshBasicMaterial({ map: shadowTexture });
    const shadowGeo = new PlaneBufferGeometry(300, 300, 1, 1);

    const mesh = new Mesh(shadowGeo, shadowMaterial);
    mesh.position.y = 100;
    mesh.position.x = 200;
    mesh.rotation.x = -Math.PI / 2;
    this.scene.add(mesh);

    const faceIndices = ['a', 'b', 'c'];

    let color;
    let f;
    let p;
    let vertexIndex;
    const radius = 200;

    const geometry  = new IcosahedronGeometry(radius, 1);

    for (let i = 0; i < geometry.faces.length; i++) {
      f  = geometry.faces[i];

      for (let j = 0; j < 3; j++) {
        vertexIndex = f[faceIndices[j]];
        p = geometry.vertices[vertexIndex];

        color = new Color(0xffffff);
        color.setHSL((p.y / radius + 1) / 2, 1.0, 0.5);

        f.vertexColors[j] = color;
        color = new Color(0xffffff);
        color.setHSL(0.0, (p.y / radius + 1) / 2, 0.5);
      }
    }

    const materials = [
      new MeshPhongMaterial({ color: 0xffffff, shading: FlatShading, vertexColors: VertexColors, shininess: 0 }),
      new MeshBasicMaterial({ color: 0x000000, shading: FlatShading, wireframe: true, transparent: true }),
		];

    const group1 = SceneUtils.createMultiMaterialObject(geometry, materials);
    group1.position.x = 0;
    group1.rotation.x = -1.87;
    this.scene.add(group1);

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    container.appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);

    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    this.animate();

    // Draw Chart first time
    if (this.props.data) {
      //this.draw(this.props.data);
    }
  },

  componentWillReceiveProps: function (nextProps) {
    //this.hidePreviousChart(nextProps.data);
    //
  },

  componentWillUnmount: function () {
    console.log('Unmount');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mouseX = null;
    this.mouseY = null;
  },

  onDocumentMouseMove(e) {
    this.mouseX = (e.clientX - this.props.width);
    this.mouseY = (e.clientY - this.props.height);
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
    console.log('Render');
    return (
        <div ref="container"
          width={this.props.width}
          height={this.props.height}></div>
    );
  },
});

export default SongVisualizer;
