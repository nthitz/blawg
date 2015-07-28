import React from 'react'

var THREE = require('threejs')

import ThreePost from '../../components/ThreePost.jsx'

export default class PyramidWireframe extends React.Component {
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
    var wireframeMaterial = new THREE.MeshNormalMaterial({
      wireframe: true
    });
    var normalMaterial = new THREE.MeshNormalMaterial({
    });


    this.sceneObjects.pyramid = new THREE.Mesh(
      new THREE.TetrahedronGeometry(100, 0),
      wireframeMaterial
    );
   this.sceneObjects.pyramidInner = new THREE.Mesh(
      new THREE.TetrahedronGeometry(70, 0),
      normalMaterial
    );
    this.sceneObjects.pyramidInner.rotation.y += Math.PI / 2
    this.refs.scene.scene.add(this.sceneObjects.pyramid);
    this.refs.scene.scene.add(this.sceneObjects.pyramidInner);


  }

  animate() {
    _.each(['pyramid','pyramidInner'], (key) => {
      var object = this.sceneObjects[key];
      object.rotation.x += 0.01 * this.props.spinSpeedX;
      object.rotation.y += 0.01 * this.props.spinSpeedY;
    })
  }
  render() {
    return <div>
      <ThreePost ref="scene" init={this.init} animate={this.animate} {...this.props} />
    </div>
  }
}
PyramidWireframe.propTypes = {
  spinSpeedX: React.PropTypes.number,
  spinSpeedY: React.PropTypes.number
}
PyramidWireframe.defaultProps = {
  spinSpeedX: 0,
  spinSpeedY: 1
};