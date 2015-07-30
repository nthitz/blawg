import React from 'react'
import _ from 'lodash'
import Component from './component.js'
import Post from '../../components/Post.jsx'
import routeData from '../../generatedRoutes/_routes.json'

var postData = _.find(routeData.posts, function(post) {
  return post.key === 'Checkerboard';
})

export default class detail extends React.Component {

  render() {
    var oneRange = [0,1]
    return (
      <Post data={postData}>
        <Component />
        <Component rotation={{x: 2, y: 0, z: 0}} />
        <Component rotation={{x: 0, y: 2, z: 0}} />
        <Component rotation={{x: 0, y: 0, z: 0}} />
        <Component swapPositions={false} />
        <Component swapPositions={false} rotation={{x: 2, y: 0, z: 0}} />
        <Component swapPositions={false} rotation={{x: 0, y: 2, z: 0}} />
        <Component swapPositions={false} rotation={{x: 0, y: 0, z: 0}} />

      </Post>
    )
  }
}