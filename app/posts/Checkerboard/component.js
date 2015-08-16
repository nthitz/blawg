import React from 'react'
import _ from 'lodash'
import THREE from 'threejs'
import d3 from 'd3'

import ThreeScene from '../../components/ThreeScene.jsx'

var gridSize = 18;
var tileSize = 13;

export default class CheckerboardScene extends React.Component {
  constructor(props) {
    super(props)

    this.tiles = []

    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)
    this.mouseover = this.mouseover.bind(this)
    this.mouseout = this.mouseout.bind(this)

    this.over = false;
    this.cameraTweenStepCount = 100;
    this.cameraTween = 0;
  }
  componentDidMount() {
    this.refs.scene.init()
  }
  init() {
    var materials = {
      white: new THREE.MeshLambertMaterial({
        color: 0xf1f1f1,
        emissive: 0xf1f1f1,
        side: THREE.DoubleSide,
      }),
      black: new THREE.MeshLambertMaterial({
        color: 0x111111,
        emissive: 0x11111,
        side: THREE.DoubleSide,
      }),
    }

    var plane = new THREE.PlaneGeometry(tileSize, tileSize);

    _.each(_.range(gridSize), function(gridX) {
      _.each(_.range(gridSize), function(gridY) {
        var materialName = (gridX + gridY) % 2 === 0 ? 'white' : 'black';
        if(materialName === 'black') {
          return; // please no one take this the wrong way.
        }
        var material = materials[materialName]
        var tile = new THREE.Mesh(plane, material);
        tile.userData.x = gridX;
        tile.userData.y = gridY;

        this.positionForGrid(gridX, gridY,tile.position);
        this.tiles.push(tile);
        this.add(tile);
      }, this)
    }, this)


    var ambientLight = new THREE.AmbientLight(0x222222);
    this.add(ambientLight);

    var directionalLight = new THREE.SpotLight(0xffffff);
    directionalLight.position.set(100, 40, 200)
    this.add(directionalLight);

  }
  positionForGrid(gridX, gridY, vector, offsetX, offsetY) {
    var x = (gridX - gridSize / 2 + 0.5) * tileSize;
    var y = (gridY - gridSize / 2 + 0.5) * tileSize;
    var z = 0;

    if(arguments.length === 2) {
      return new THREE.Vector3(x,y,z);
    }
    if(arguments.length > 3) {
      x += offsetX;
    }
    if(arguments.length > 4) {
      y += offsetY;
    }
    vector.set(x, y, z);
  }
  add(object) {
    this.refs.scene.scene.add(object);
  }
  animate(time) {
    var timeLength = 5000;
    var timeLooped = time % timeLength;
    var timeNormal = timeLooped / timeLength;
    _.each(this.tiles, function(tile) {
      var offsetY = clamp01(timeNormal * 2) * tileSize;
      var offsetX = clamp01(timeNormal * 2 - 1) * tileSize;
      if(tile.userData.y % 2 !== 0) {
        offsetY = - offsetY;
        offsetX = - offsetX;
      }

      tile.rotation.x = timeNormal * this.props.rotation.x * Math.PI;
      tile.rotation.y = timeNormal * this.props.rotation.y * Math.PI;
      tile.rotation.z = timeNormal * this.props.rotation.z * Math.PI;

      if(this.props.swapPositions) {
        this.positionForGrid(
          tile.userData.x,
          tile.userData.y,
          tile.position,
          offsetX,
          offsetY
        );
      }



    }, this);

    this.cameraTween += (this.over ? 1 : -1) * 1/this.cameraTweenStepCount;
    this.cameraTween = clamp01(this.cameraTween);
    var eased = d3.ease('cubic-in-out')(this.cameraTween)
    this.refs.scene.camera.position.z = 300 - eased * 280;
    this.refs.scene.camera.position.y = -eased* 160;
    this.refs.scene.camera.lookAt(new THREE.Vector3(0,0,0))

  }

  mouseover(event) {
    this.over = true;
  }

  mouseout(event) {
    this.over = false;
  }

  render() {
    return <div onMouseOver={this.mouseover} onMouseOut={this.mouseout}>
      <ThreeScene ref="scene" init={this.init} animate={this.animate} scrollOrbitControls={false} {...this.props} />
    </div>
  }
}
function clamp01(value) {
  return Math.max(Math.min(1,value),0);
}
CheckerboardScene.propTypes = {
  rotation: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    z: React.PropTypes.number,
  }),
  swapPositions: React.PropTypes.bool,
}
CheckerboardScene.defaultProps = {
  rotation: {
    x: 0,
    y: 0,
    z: 2,
  },
  swapPositions: true,
};