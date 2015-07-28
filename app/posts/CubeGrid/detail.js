import React from 'react'
import Component from './component.js'
import Post from '../../components/Post.jsx'

export default class detail extends React.Component {

  render() {
    var oneRange = [0,1]
    return (
      <Post title="CubeGrid">
        <Component />
        <Component x={oneRange} y={oneRange} z={oneRange} spinY={0} spinZ={0} />
        <Component y={oneRange} z={oneRange} spinY={0} spinZ={0} />
        <Component z={oneRange} spinY={0} spinZ={0} />
        <Component spinY={0} spinZ={0} />
        <Component x={oneRange} y={oneRange} z={oneRange} />
        <Component />
      </Post>
    )
  }
}