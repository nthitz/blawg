var React = require('react')
var _ = require('lodash');

var animationManager = require('../utils/animationManager.js')
var ThreeScene = require('./ThreeScene.jsx')

var VIEW_ANGLE = 45, NEAR = 0.1, FAR = 10000;
export default class ThreePost extends React.Component {
  componentDidMount() {
    this.scene = this.refs.scene.scene;
    this.camera = this.refs.scene.camera;
  }
  init() {
    this.refs.scene.init();
  }
  constructor(props) {
    super(props)

  }

  render() {
    return <div>
      <h2>{this.props.title}</h2>
      <ThreeScene ref="scene" {...this.props} />
    </div>
  }
}
ThreePost.propTypes = {
  dimensions: React.PropTypes.number,
  title: React.PropTypes.string,
  init: React.PropTypes.func,
  animate: React.PropTypes.func
};

ThreePost.defaultProps = {
  dimensions: 400,
  title: '',
  // TODO rename init, animate. names are confusing because they are callbacks really.
  init: function() {},
  animate: function() {}
};