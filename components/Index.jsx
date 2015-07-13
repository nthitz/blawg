
import React from 'react'
import HelloWorldScene from './HelloWorldScene.js'
export default class Index extends React.Component {
  render () {
    return (
      <main>
        <span>Index component</span>
        <HelloWorldScene dimensions="300" />
      </main>
    )
  }
}
