import React from 'react'
import _ from 'lodash'
import Component from './component.js'
import Post from '../../components/Post.jsx'
import routeData from '../../generatedRoutes/_routes.json'

var postData = _.find(routeData.posts, function(post) {
  return post.key === 'CubeExplode';
})

export default class detail extends React.Component {

  render() {
    return (
      <Post data={postData}>
        <Component />
      </Post>
    )
  }
}