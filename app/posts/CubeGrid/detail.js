import React from 'react'
import _ from 'lodash'
import Component from './component.js'
import Post from '../../components/Post.jsx'
import routeData from '../../generatedRoutes/_routes.json'

var postData = _.find(routeData.posts, function(post) {
  return post.key === 'CubeGrid';
})

export default class detail extends React.Component {

  render() {
    var oneRange = [0,1]
    return (
      <Post data={postData}>
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