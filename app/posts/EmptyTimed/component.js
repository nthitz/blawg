import React from 'react'
import _ from 'lodash'
import THREE from 'threejs'
import d3 from 'd3'

import ThreeScene from '../../components/ThreeScene.jsx'

var gridSize = 18;
var tileSize = 13;

export default class EmptyTimedScene extends React.Component {
  constructor(props) {
    super(props)

    this.tiles = []

    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)
    this.mouseover = this.mouseover.bind(this)
    this.mouseout = this.mouseout.bind(this)

    this.over = false;
  }
  componentDidMount() {
    this.refs.scene.init()
  }
  init() {

  }
  add(object) {
    this.refs.scene.scene.add(object);
  }
  animate(time) {
    var timeLength = 5000;
    var timeLooped = time % timeLength;
    var timeNormal = timeLooped / timeLength;
  }

  mouseover(event) {
    this.over = true;
  }

  mouseout(event) {
    this.over = false;
  }

  render() {
    return <div onMouseOver={this.mouseover} onMouseOut={this.mouseout}>
      <ThreeScene ref="scene"
        init={this.init}
        animate={this.animate}
        scrollOrbitControls={false}
        clearColor={0x001100}
        {...this.props} />
    </div>
  }
}
EmptyTimedScene.propTypes = {
}
EmptyTimedScene.defaultProps = {
};