import React from 'react'
var animationManager = require('../utils/animationManager.js')

export default class ZoomControls extends React.Component {
  constructor() {
    super();
    this.controls = null;
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
  }
  setControls(controls) {
    this.setState({controls: controls })
  }
  activate(type) {
    if(!this.state.controls) {
      return;
    }
    console.log('activate');
    this.setState({active: true})
    var forceActive = true;
    var zoom = () => {
      this.state.controls['dolly' + type](1.01);
      this.state.controls.update();
      if(this.state.active || forceActive) {
        forceActive = false;
        requestAnimationFrame(zoom);
      }
    }
    requestAnimationFrame(zoom);
  }
  deactivate() {
    console.log('deactivate')
    this.setState({active: false})
  }


  render() {
    return (
      <div className="zoomControls">


        <div
          onMouseLeave={this.deactivate}

          onMouseEnter={() => this.activate('In')}>
          +
        </div>
        <div
          onMouseLeave={this.deactivate}

          onMouseEnter={() => this.activate('Out')}>
          –
        </div>
      </div>
    )
  }
}
