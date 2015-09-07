import React from 'react'

var THREE = require('threejs')
var _ = require('lodash')
var {ease, scale} = require('d3');
var easing = ease('cubic-in-out');
import ThreeScene from '../../components/ThreeScene.jsx'
import {fadingMaterial,Cube} from './Cube.js';

var lastLoopCount = -1;
var cameraTween = scale.linear().domain([0,1]).range([200, 30]);
var opacityTween = scale.linear().domain([0.3, 0.95]).range([1,0]).clamp(true);

export default class CubeExplode extends React.Component {
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
    var ambientLight = new THREE.AmbientLight(0x222222);
    this.add(ambientLight);

    var directionalLight = new THREE.SpotLight(0xffffff);
    directionalLight.position.set(100, 40, 200)
    this.add(directionalLight);

    var cubes = [];
    var midX = ~~((this.props.x[0] + this.props.x[1]) / 2)
    var midY = ~~((this.props.y[0] + this.props.y[1]) / 2)
    var midZ = ~~((this.props.z[0] + this.props.z[1]) / 2)

    _.each(_.range(this.props.x[0], this.props.x[1]), function(xGrid) {
      _.each(_.range(this.props.y[0], this.props.y[1]), function(yGrid) {
        _.each(_.range(this.props.z[0], this.props.z[1]), function(zGrid) {

          var cube = new Cube(
            new THREE.Vector3(xGrid, yGrid, zGrid),
            xGrid !== midX || yGrid !== midY || zGrid != midZ
          );

          cubes.push(cube);
          this.refs.scene.scene.add(cube);

        }, this)
      }, this)
    }, this)
    this.cubes = cubes;
  }

  animate(time) {

    var timeLength = 5000;
    var loopCount = ~~(time / timeLength);
    var timeLooped = time % timeLength;
    var timeNormal = timeLooped / timeLength;

    if(loopCount !== lastLoopCount) {
      lastLoopCount = loopCount;
      _.each(this.cubes, function(cube) { cube.reset(); });
    }

    _.each(this.cubes, function(cube) {
      cube.update(timeNormal);
    }, this)

    this.refs.scene.camera.position.z = cameraTween(easing(timeNormal));
    fadingMaterial.opacity = opacityTween(timeNormal);

  }

  render() {
    return <div>
      <ThreeScene fog ref="scene" init={this.init} scrollOrbitControls={false} animate={this.animate} {...this.props} />
    </div>
  }
}
CubeExplode.propTypes = {
}
CubeExplode.defaultProps = {
  x: [-3, 4],
  y: [-3, 4],
  z: [-3, 4],
  spinZ: 0.02,
  spinY: 0.01,
};