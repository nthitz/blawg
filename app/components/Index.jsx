
import React from 'react'

import Post from './Post.jsx'

import PyramidWireframe from '../posts/Pyramid/component.js'
import HelloWorldScene from '../posts/WireBall/component.js'
import CubeGrid from '../posts/CubeGrid/component.js'

export default class Index extends React.Component {
  render () {
    return (
      <main>
        <span>Index component</span>
        <Post title="CubeGrid">
          <CubeGrid />
        </Post>
        <Post title="Pyramid">
          <PyramidWireframe />
        </Post>
        <Post title="WireBall">
          <HelloWorldScene spinSpeedY={2} spinSpeedX={1.5} />
        </Post>
      </main>
    )
  }
}
