import React from 'react';
import { Canvas } from 'react-three-fiber';
import Box from './component/box';
import Controls from './component/controls';
import Plane from './component/plane';
// import Model from './component/model';
import './App.css';

function App() {
	return (
		<div className="App">
			<Canvas>
				{/* <Model /> */}
				<fog attach="fog" args={['white', 10, 25]} />
				<ambientLight />
				<spotLight position={[15, 20, 5]} penumbra={1} castShadow />
				<Box />
				<Controls />
				<Plane />
			</Canvas>
		</div>
	);
}

export default App;
