import React from 'react'
import _ from 'lodash'
var THREE = require('threejs')

import ThreeScene from '../../components/ThreeScene.jsx'

var gridSize = 18;
var tileSize = 13;

export default class CheckerboardScene extends React.Component {
  constructor(props) {
    super(props)

    this.tiles = []

    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)
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

      tile.rotation.z = timeNormal * 2 * Math.PI;

      this.positionForGrid(
        tile.userData.x,
        tile.userData.y,
        tile.position,
        offsetX,
        offsetY
      );



    }, this);
  }
  render() {
    return <div>
      <ThreeScene ref="scene" init={this.init} animate={this.animate} {...this.props} />
    </div>
  }
}
function clamp01(value) {
  return Math.max(Math.min(1,value),0);
}
CheckerboardScene.propTypes = {
}
CheckerboardScene.defaultProps = {
};