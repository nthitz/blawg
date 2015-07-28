import React from 'react'

var THREE = require('threejs')
var _ = require('lodash')
import ThreePost from '../components/ThreePost.jsx'

export default class CubeGrid extends React.Component {
  constructor(props) {
    super(props)

    this.sceneObjects = []

    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)
  }
  componentDidMount() {
    this.refs.scene.init()
  }

  add(obj) {
    this.refs.scene.scene.add(obj);
  }

  init() {
    var material = new THREE.MeshLambertMaterial({
      color: 0x00aa00,
      emissive: 0x006063,
    });

    // add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0x222222);
    this.add(ambientLight);

    // directional lighting
    var directionalLight = new THREE.SpotLight(0xffffff);
    directionalLight.position.set(100, 40, 200)
    this.add(directionalLight);

    this.refs.scene.camera.position.z = 200;

    var cubeSize = 10
    var cubeGeom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, 10, 10 ,10);


    var cubes = [];
    _.each(_.range(-3,4), function(xGrid) {
      _.each(_.range(-3,4), function(yGrid) {
        _.each(_.range(-8,4), function(zGrid) {
          var cube = new THREE.Mesh(cubeGeom, material);
          cubes.push(cube);
          var multiplier = 20;
          var x = xGrid * multiplier;
          var y = yGrid * multiplier;
          var z = zGrid * multiplier;

          cube.position.x = x;
          cube.position.y = y;
          cube.position.z = z;
          this.refs.scene.scene.add(cube);
        }, this)
      }, this)
    }, this)
    this.cubes = cubes;
  }

  animate() {
    _.each(this.cubes, function(cube) {
      cube.rotation.z += 0.02;
      cube.rotation.y += 0.01;
      // cube.position.x += Math.random() - 0.5;
      // cube.position.y += (Math.random() - 0.5) * 0.01;
    })
  }
  render() {
    return <div>
      <ThreePost ref="scene" init={this.init} animate={this.animate} {...this.props}
        title="Cube Grid" />
    </div>
  }
}
CubeGrid.propTypes = {
}
CubeGrid.defaultProps = {
};