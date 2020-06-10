import React, { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, useThree, useFrame } from 'react-three-fiber';

extend({ OrbitControls });

export default function Controls() {
	const controls = useRef();
	const { camera, gl } = useThree();
	useFrame(() => {
		controls.current.update();
	});
	return (
		<mesh>
			<orbitControls
				autoRotate
				args={[camera, gl.domElement]}
				ref={controls}
				maxPolarAngle={Math.PI / 2}
				minPolarAngle={Math.PI / 3}
			/>
		</mesh>
	);
}
