
import React from 'react'

export default class About extends React.Component {
  constructor(props) {
    super(props)

    this.state = {clicked: false};

    this._clickButton = this._clickButton.bind(this)
  }
  _clickButton() {
    console.log('click');
    this.setState({clicked: true})
  }
  render () {
    return (
      <main>
        <span>
          About components wtf
        </span>
        <div>
          {this.state.clicked ? "true" : "false"}
        </div>
        <button onClick={this._clickButton}>
          oh
        </button>
      </main>
    )
  }
}
