
import React  from 'react'
import Router from 'react-router'

let Link = Router.Link

export default class Header extends React.Component {

  constructor(props) {
      super(props)
      title: props.string
  }

  render () {

    return (
      <header>
        <h1><a href="/">{this.props.title}</a></h1>
        <h2>This is my website. There are many like it, but this one is mine.</h2>
      </header>
    )
  }
}
