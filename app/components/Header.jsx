
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
        <h1>{this.props.title}</h1>
      </header>
    )
  }
}
