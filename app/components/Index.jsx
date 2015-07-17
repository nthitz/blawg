
import React from 'react'
import PyramidWireframe from '../posts/PyramidWireframe.js'
import HelloWorldScene from '../posts/HelloWorldScene.js'
export default class Index extends React.Component {
  render () {
    return (
      <main>
        <span>Index component</span>
        <PyramidWireframe />
        <HelloWorldScene dimensions={300} spinSpeedY={1} />
        <HelloWorldScene spinSpeedY={2} spinSpeedX={1.5} />
      </main>
    )
  }
}
