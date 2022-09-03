import { Environment, ScrollControls } from '@react-three/drei'
import Building from './Building'
import Helicopter from './Helicopter'
import Tags from './Tags/Tags'

export default function World() {

    return (
        <>
            <Environment preset='forest' />
            <ScrollControls pages={5}>
                <Building />
                <Helicopter />
                <Tags />
            </ScrollControls>
        </>
    )
}
