var React = require('react')
var THREE = require('threejs')
var OrbitControls = require('three-orbit-controls')(THREE);
var _ = require('lodash');

var animationManager = require('../utils/animationManager.js')

var VIEW_ANGLE = 45, NEAR = 0.1, FAR = 10000;
export default class ThreeScene extends React.Component {
  constructor(props) {
    super(props)

    this.width = this.props.dimensions
    this.height = this.props.dimensions

    this.aspect = this.width / this.height

    this.renderer = null;
    this.camera = null;
    this.scene = null;
    this.sceneObjects = {}

    //mouse event variables
    // this.projectorprojector = new THREE.Projector(),
    this.mouse_vector = new THREE.Vector3(),
    this.mouse = { x: 0, y: 0, z: 1 },
    this.ray = new THREE.Raycaster( new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0) ),
    this.intersects = [];

    //camera
    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, this.aspect, NEAR, FAR);

    this.camera.position.z = 300;

    //create the scene and add the objects that we created
    this.scene = new THREE.Scene();
    this.scene.add(this.camera);

    this.scene.fog = new THREE.FogExp2( 0xaaaaaa, 0.0025 );

    this._animate = this._animate.bind(this)
  }
  componentDidMount() {
    this.container = React.findDOMNode(this)
    //renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  init() {
    this.props.init();
    animationManager.add(this._animate, this.container);
    // TODO maybe move to didMount() and then make sure to remove in unmount() !!!
  }

  _animate() {
    this.renderer.render(this.scene, this.camera);

    this.props.animate();
  }
  render() {
    return <div></div>
  }
}
ThreeScene.propTypes = {
  dimensions: React.PropTypes.number,
  init: React.PropTypes.func,
  animate: React.PropTypes.func
};

ThreeScene.defaultProps = {
  dimensions: 400,
  // TODO rename init, animate. names are confusing because they are callbacks really.
  init: function() {},
  animate: function() {}
};