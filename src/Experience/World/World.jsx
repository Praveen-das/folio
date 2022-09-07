import { Environment, ScrollControls } from '@react-three/drei'
import Particles from './Particles/Particles'
// import Building from './Building'
// import Helicopter from './Helicopter'
// import Tags from './Tags/Tags'

export default function World() {
    const props = {
        text: 'HI,\nI\'M PRAVEEN',
        amount: 10000,
        particleSize: 0.02,
        particleColor: 0xffffff,
        textSize: 1,
        area: 1,
        ease: 0.05,
    }

    return (
        <>
            <Environment preset='forest' />
            <ScrollControls pages={5}>
                {/* <Building /> */}
                {/* <Helicopter /> */}
                {/* <Tags /> */}
                <Particles {...props} />
            </ScrollControls>
        </>
    )
}
