var THREE = require('threejs')
var {ease, scale} = require('d3');

var material = new THREE.MeshLambertMaterial({
  color: 0x00aa00,
  emissive: 0x006063,
});
var fadingMaterial = material.clone();
fadingMaterial.transparent = true;
fadingMaterial.opacity = 1;
var cubeSize = 10
var cubeGeom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, 10, 10 ,10);

var nonMovingSpinTween = {
  x: scale.linear().domain([0,1]).range([0, Math.PI]).clamp(true),
  y: scale.linear().domain([0,1]).range([0, Math.PI]).clamp(true),
  z: scale.linear().domain([0,1]).range([0, Math.PI]).clamp(true)
}
var normal = d3.random.normal(0, 0.2);
var easing = ease('cubic-out');

class Cube extends THREE.Object3D {

  constructor(grid, movement) {
    super();
    this.grid = grid;
    this.movement = movement;
    this.cube = new THREE.Mesh(
        cubeGeom,
        this.movement ? fadingMaterial : material
    );
    this.velocity = new THREE.Vector3();
    this.rotationVelocity = new THREE.Vector3();
    this.add(this.cube);


  }
  reset() {
    var multiplier = cubeSize;
    this.position.set(
      this.grid.x * multiplier,
      this.grid.y * multiplier,
      this.grid.z * multiplier
    );

    if(this.movement) {
      this.randomVector(this.velocity, 8, 0.2);
      this.randomVector(this.rotationVelocity,0.3, 0.05);
    } else {
      nonMovingSpinTween.x.range([0, Math.PI * ~~(2 + Math.random() * 6) / 2])
      nonMovingSpinTween.y.range([0, Math.PI * ~~(2 + Math.random() * 6) / 2])
      nonMovingSpinTween.z.range([0, Math.PI * ~~(2 + Math.random() * 6) / 2])
      this.velocity.set(0, 0, 0);
      this.rotationVelocity.set(0, 0, 0);
    }
 }
 randomVector(vector, _magnitude, _base) {
    var magnitude = 0,
      base = 0;
    if (arguments.length > 1) {
      magnitude = _magnitude;
    }
    if (arguments.length > 2) {
      base = _base;
    }
    var x = normal();
    var y = normal();
    var z = normal();
    function sign(v) {
      if(v < 0) { return -1 }
      return 1;
    }
    vector.set(
      x * magnitude + sign(x) * base,
      y * magnitude + sign(y) * base,
      z * magnitude + sign(z) * base
    );
 }
 update(time) {

    this.position.add(this.velocity);
    // this.rotation.add(this.rotationVelocity);
    this.rotation.x += this.rotationVelocity.x;
    this.rotation.y += this.rotationVelocity.y;
    this.rotation.z += this.rotationVelocity.z;
    this.rotationVelocity.multiplyScalar(0.99);
    if (!this.movement) {
      this.rotation.x = nonMovingSpinTween.x(easing(time));
      this.rotation.y = nonMovingSpinTween.y(easing(time));
      this.rotation.z = nonMovingSpinTween.z(easing(time));
    }
 }
}

export {
  Cube,
  fadingMaterial
}