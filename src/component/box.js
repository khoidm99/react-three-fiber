import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';

function Box() {
	// This reference will give us direct access to the mesh
	const mesh = useRef();

	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	const props = useSpring({
		scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
		color: hovered ? 'hotpink' : 'orange',
	});

	// Rotate mesh every frame, this is outside of React without overhead
	useFrame(() => (mesh.current.rotation.y += 0.01));

	return (
		<a.mesh
			ref={mesh}
			scale={props.scale}
			onClick={(e) => setActive(!active)}
			onPointerOver={(e) => setHover(true)}
			onPointerOut={(e) => setHover(false)}
			castShadow
		>
			<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
			<a.meshPhysicalMaterial attach="material" color={props.color} />
		</a.mesh>
	);
}

export default Box;
