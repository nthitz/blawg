
import React from 'react'

import PyramidWireframe from '../posts/PyramidWireframe.js'
import HelloWorldScene from '../posts/HelloWorldScene.js'
import CubeGrid from '../posts/CubeGrid.js'
export default class Index extends React.Component {
  render () {
    return (
      <main>
        <span>Index component</span>
        <CubeGrid />
        <PyramidWireframe />
        <HelloWorldScene spinSpeedY={2} spinSpeedX={1.5} />
      </main>
    )
  }
}
