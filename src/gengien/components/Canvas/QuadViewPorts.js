/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author arodic / http://aleksandarrodic.com/
 * @author fonserbc / http://fonserbc.github.io/
 * @author samsy / http://samsy.ninja/
 * @author ivee-tech / http://editor.ivee.tech
 *
 * Off-axis stereoscopic effect based on http://paulbourke.net/stereographics/stereorender/
 */

let THREE = require("three");

function QuadViewPorts(renderer, canvasDomElement, quadData) {
  let {
    leftUpCamera,
    rightUpCamera,
    leftLowerCamera,
    rightLowerCamera,
  } = quadData;
  let scope = this;
  this.eyeSeparation = 3;
  this.focalLength = 15; // Distance to the non-parallax or projection plane
  Object.defineProperties(this, {
    separation: {
      get: function () {
        return scope.eyeSeparation;
      },
      set: function (value) {
        console.warn("THREE.QuadViewPorts: .separation is now .eyeSeparation.");
        scope.eyeSeparation = value;
      },
    },
    targetDistance: {
      get: function () {
        return scope.focalLength;
      },
      set: function (value) {
        console.warn(
          "THREE.QuadViewPorts: .targetDistance is now .focalLength."
        );
        scope.focalLength = value;
      },
    },
  });
  // internals
  let _width, _height;
  let _position = new THREE.Vector3();
  let _quaternion = new THREE.Quaternion();
  // let _rotation = null;
  let _scale = new THREE.Vector3();
  let _cameraL = new THREE.PerspectiveCamera();
  let _cameraR = new THREE.PerspectiveCamera();
  let _cameraLowerSideL = new THREE.PerspectiveCamera();
  let _cameraLowerSideR = new THREE.PerspectiveCamera();
  let _fov;
  let _outer, _inner, _top, _bottom;
  let _ndfl, _halfFocalWidth, _halfFocalHeight;
  let _innerFactor, _outerFactor;

  // initialization

  renderer.autoClear = false;

  this.setSize = function (width, height) {
    _width = width / 2;
    _height = height / 2;
    renderer.setSize(width, height);
  };

  this.render = function (scene, camera) {
    scene.updateMatrixWorld();
    if (camera.parent === null) camera.updateMatrixWorld();
    camera.matrixWorld.decompose(_position, _quaternion, _scale);
    // Effective fov of the camera
    _fov = THREE.Math.radToDeg(
      2 *
        Math.atan(Math.tan(THREE.Math.degToRad(camera.fov) * 0.5) / camera.zoom)
    );
    _ndfl = camera.near / this.focalLength;
    _halfFocalHeight =
      Math.tan(THREE.Math.degToRad(_fov) * 0.5) * this.focalLength;
    _halfFocalWidth = _halfFocalHeight * 0.5 * camera.aspect;
    _top = _halfFocalHeight * _ndfl;
    _bottom = -_top;
    _innerFactor =
      (_halfFocalWidth + this.eyeSeparation / 2.0) / (_halfFocalWidth * 2.0);
    _outerFactor = 1.0 - _innerFactor;
    _outer = _halfFocalWidth * 2.0 * _ndfl * _outerFactor;
    _inner = _halfFocalWidth * 2.0 * _ndfl * _innerFactor;

    // left
    _cameraLowerSideL.projectionMatrix.makePerspective(
      -_outer,
      _inner,
      _top,
      _bottom,
      camera.near,
      camera.far
    );
    _cameraLowerSideL.children = camera.children;
    _cameraLowerSideL.name = "_cameraLowerSideL";
    _cameraLowerSideL.position.copy(
      new THREE.Vector3(
        leftUpCamera.position[0],
        leftUpCamera.position[1],
        leftUpCamera.position[2]
      )
    );
    _cameraLowerSideL.rotation.setFromVector3(
      new THREE.Vector3(
        leftUpCamera.rotation[0],
        leftUpCamera.rotation[1],
        leftUpCamera.rotation[2]
      ),
      "XYZ"
    );

    _cameraL.projectionMatrix.makePerspective(
      -_outer,
      _inner,
      _top,
      _bottom,
      camera.near,
      camera.far
    );
    _cameraL.children = camera.children;
    _cameraL.name = "cameraL";
    _cameraL.position.copy(
      new THREE.Vector3(
        leftLowerCamera.position[0],
        leftLowerCamera.position[1],
        leftLowerCamera.position[2]
      )
    );
    _cameraL.rotation.setFromVector3(
      new THREE.Vector3(
        leftLowerCamera.rotation[0],
        leftLowerCamera.rotation[1],
        leftLowerCamera.rotation[2]
      ),
      "XYZ"
    );

    // right

    _cameraR.projectionMatrix.makePerspective(
      -_inner,
      _outer,
      _top,
      _bottom,
      camera.near,
      camera.far
    );
    _cameraR.children = camera.children;
    _cameraR.name = "cameraR";
    _cameraR.position.copy(
      new THREE.Vector3(
        rightUpCamera.position[0],
        rightUpCamera.position[1],
        rightUpCamera.position[2]
      )
    );
    _cameraR.rotation.setFromVector3(
      new THREE.Vector3(
        rightUpCamera.rotation[0],
        rightUpCamera.rotation[1],
        rightUpCamera.rotation[2]
      ),
      "XYZ"
    );

    _cameraLowerSideR.projectionMatrix.makePerspective(
      -_outer,
      _inner,
      _top,
      _bottom,
      camera.near,
      camera.far
    );
    _cameraLowerSideR.children = camera.children;
    _cameraLowerSideR.name = "_cameraLowerSideR";
    _cameraLowerSideR.position.copy(
      new THREE.Vector3(
        rightLowerCamera.position[0],
        rightLowerCamera.position[1],
        rightLowerCamera.position[2]
      )
    );
    _cameraLowerSideR.rotation.setFromVector3(
      new THREE.Vector3(
        rightLowerCamera.rotation[0],
        rightLowerCamera.rotation[1],
        rightLowerCamera.rotation[2]
      ),
      "XYZ"
    );

    scene.add(_cameraR);
    scene.add(_cameraLowerSideR);
    scene.add(_cameraLowerSideL);
    scene.add(_cameraL);

    renderer.clear();
    renderer.setScissorTest(true);
    //l
    renderer.setScissor(0, 0, _width, _height - 1);
    renderer.setViewport(0, 0, _width, _height);
    renderer.render(scene, _cameraL);
    //r
    renderer.setScissor(_width, _height, _width, _height);
    renderer.setViewport(_width, _height, _width, _height);
    renderer.render(scene, _cameraR);
    //dl
    renderer.setScissor(0, _height, _width - 1, _height);
    renderer.setViewport(0, _height, _width, _height);
    renderer.render(scene, _cameraLowerSideL);
    //dr
    renderer.setScissor(_width + 1, 0, _width + 1, _height - 1);
    renderer.setViewport(_width, 0, _width, _height);
    renderer.render(scene, _cameraLowerSideR);

    renderer.cameraR = _cameraR;
    renderer.cameraL = _cameraL;
    renderer._cameraLowerSideR = _cameraLowerSideR; //_cameraLowerSideL
    renderer._cameraLowerSideL = _cameraLowerSideL; //_cameraLowerSideL
    renderer.setClearColor(0x000000, 1);
    renderer.setScissorTest(false);
    renderer.setClearAlpha(1);
  };
}

QuadViewPorts.prototype = Object.create(THREE.EventDispatcher.prototype);
QuadViewPorts.prototype.constructor = QuadViewPorts;
export { QuadViewPorts };
