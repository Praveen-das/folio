import {
    Html,
    Loader,
    OrbitControls, Stats
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import World from './World/World'

function Experience() {

    return (
        <>
            <Stats showPanel={0} className="stats" />
            <Canvas
                dpr={[devicePixelRatio, 1.5]}
            >
                <Suspense fallback={null}>
                    <World />
                </Suspense>
                {/* <OrbitControls /> */}
            </Canvas>
            <Loader
                innerStyles={{ width: '50vw' }}
                barStyles={{ height: '100%' }}
                initialState={active => active}
            />
        </>
    )
}

export default Experience

function Asd() {
    return (
        <Html>
            <p htmlFor="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ratione quam doloribus quas sunt tempora praesentium, soluta obcaecati, eligendi recusandae, quo maiores unde excepturi? Nemo sit ad corporis maiores debitis?</p>
        </Html>
    )
}