import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import React, { useRef, useMemo } from 'react';
const DEFAULT_LAYER = 0;
const OCCLUSION_LAYER = 1;

export default function Model({ layer = DEFAULT_LAYER }) {
	const modelRef = useRef();
	const model = useLoader(GLTFLoader, '/scene.gltf', (loader) => {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('/draco-gltf');
		loader.setDRACOLoader(dracoLoader);
	});

	const material = useMemo(() => {
		if (layer === DEFAULT_LAYER) {
			return new THREE.MeshPhysicalMaterial({
				color: 0x000333,
				metalness: 1.0,
				roughness: 0.5,
				clearcoat: 0.02,
				clearcoatRoughness: 0.01,
			});
		} else if (layer === OCCLUSION_LAYER) {
			return new THREE.MeshPhysicalMaterial({
				color: 0xffffff,
				metalness: 0,
				roughness: 0,
				transparency: 0.8,
				transparent: true,
			});
		} else {
			return new THREE.MeshStandardMaterial({
				color: 0xffffff,
				metalness: 1.0,
				roughness: 0.5,
			});
		}
	}, [layer]);

	useFrame(() => {
		modelRef.current.transfrom += 0.01;
	});

	return (
		<group ref={modelRef}>
			<mesh material={material} layers={layer}>
				<bufferGeometry attach="geometry" {...model.geometry} />
				<meshBasicMaterial attach="material" opacity={0.4} />
			</mesh>
		</group>
	);
}
