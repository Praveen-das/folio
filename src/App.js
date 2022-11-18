import './App.css';
import Experience from './Experience/Experience';
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function App() {
  const a = useLoader.preload(GLTFLoader, '/models/model1.glb')

  return (
    <div id="wrapper">
      <Experience />
    </div>
  );
}

export default App;
