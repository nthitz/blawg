
import React from 'react'
import _ from 'lodash'

import Post from './Post.jsx'
import routeData from '../generatedRoutes/_routes.json'

import Pyramid from '../posts/Pyramid/component.js'
import WireBall from '../posts/WireBall/component.js'
import CubeGrid from '../posts/CubeGrid/component.js'
import Checkerboard from '../posts/Checkerboard/component.js'

var postDataMap = {};
_.each(routeData.posts, function(post) {
  return postDataMap[post.key] = post;
})
console.log(routeData);

export default class Index extends React.Component {
  render () {
    return (
      <main>
        <Post data={postDataMap['Checkerboard']}>
          <Checkerboard data={postDataMap['Checkerboard']} />
        </Post>
        <Post data={postDataMap['CubeGrid']}>
          <CubeGrid />
        </Post>
        <Post data={postDataMap['Pyramid']}>
          <Pyramid />
        </Post>
        <Post data={postDataMap['WireBall']}>
          <WireBall spinSpeedY={2} spinSpeedX={1.5} />
        </Post>
      </main>
    )
  }
}
