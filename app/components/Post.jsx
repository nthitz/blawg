import React from 'react'

export default class Post extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.props.children}
      </div>
    )
  }
}
Post.defaultProps = {
  title: 'untitled',
}