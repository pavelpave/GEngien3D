import { Interaction } from "three.interaction";
import AbstractObject from "../../AbstractObject";

class Raycaster extends AbstractObject {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { requiredPropertys, camera } = this.props;
    const { renderer, scene } = requiredPropertys;
    /**
     * @param {WebGLRenderer} renderer - A reference to the current renderer
     * @param {Scene} scene - A reference to the current scene
     * @param {Camera} camera - A reference to the current camera
     * @param {Object} [options] - The options for the manager.
     * @param {Boolean} [options.autoPreventDefault=false] - Should the manager automatically prevent default browser actions.
     * @param {Boolean} [options.autoAttach=false] - Should the manager automatically attach target element.
     * @param {Number} [options.interactionFrequency=10] - Frequency increases the interaction events will be checked.
     */
    new Interaction(renderer, scene, camera, false, false, 10);
  }

  render() {
    return null;
  }
}

export default Raycaster;
