import React from 'react'

var THREE = require('threejs')

import ThreeScene from './ThreeScene.jsx'

export default class HelloWorldScene extends React.Component {
  constructor(props) {
    super(props)

    this.sceneObjects = []

    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)
  }
  componentDidMount() {
    this.refs.scene.init()
  }
  init() {
    var sphereMaterial = new THREE.MeshNormalMaterial({
    });

    this.sceneObjects.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(50, 4, 4),
      sphereMaterial
    );

    this.refs.scene.scene.add(this.sceneObjects.sphere);


  }

  animate() {
    this.sceneObjects.sphere.rotation.y += 0.01;
  }
  render() {
    return <div>
      <ThreeScene ref="scene" init={this.init} animate={this.animate} {...this.props} />
    </div>
  }
}