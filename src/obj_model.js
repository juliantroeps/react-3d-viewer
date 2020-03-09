import * as THREE from 'three';
import {OrbitControls, MTLLoader, OBJLoader, ColladaLoader, GLTFLoader} from './loader';

import Model from './model'

// Model
// debugger
class ObjModel extends Model {
    static defaultProps = Object.assign({}, Model.defaultProps, {
        loader: 'obj'
    });

    constructor(props) {
        super(props)
    }

    load3dModel() {
        const {src, texPath} = this.props;

        if (!src) return false;

        // instantiate a loader &  load a resource
        let obj_loader = new THREE.OBJLoader();

        obj_loader.load(src,  obj3d => {
            let bound_box = this.computeBoundingBox(obj3d);
            let front = bound_box.max;
            let cz = bound_box.max.z - bound_box.min.z;

            this.camera.position.set(0, 0, front.z + cz * 1.5);

            this.initControl();
            this.obj3d = obj3d;
            //this.scene.add(obj3d);
            this.props.onLoad && this.props.onLoad()
        }, xhr => {
            this.props.onProgress && this.props.onProgress(xhr)
        });
    }
}

export default ObjModel
