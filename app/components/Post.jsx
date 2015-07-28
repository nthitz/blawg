import React from 'react'

export default class Post extends React.Component {
  render() {
    var title = this.props.data.key;

    return (
      <div>
        <h2>
          <a href={this.props.data.path}>{title}</a>
        </h2>
        {this.props.children}
      </div>
    )
  }
}
Post.defaultProps = {
  data: {
    key: 'untitled',
  },
}