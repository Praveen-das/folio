import { Environment, ScrollControls } from '@react-three/drei'
import Tags from './Tags/Tags'
import Building from '../World/Model/Building'

export default function World(props) {
    // useResources()

    // const props = {
    //     text: 'BLACKHOLE',
    //     amount: 10000,
    //     particleSize: 0.05,
    //     particleColor: 0xffffff,
    //     textSize: 1,
    //     area: 1,
    //     ease: 0.05,
    // }

    return (
        <group {...props}>
            <Environment preset='forest' />
            <ambientLight intensity={5}  />
            <ScrollControls pages={5}>
                <Building />
                <Tags />
            </ScrollControls>
        </group>
    )
}
