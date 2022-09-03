import { Effects, Loader, OrbitControls, Stats, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import World from './World/World'

function Experience() {
    const { cameras } = useGLTF('/models/model.glb', true)
    const camera = cameras[0]

    return (
        <>
            <Stats showPanel={0} className="stats" />
            <Canvas
                dpr={[1,1.5]}
                gl={{ antialias: false }}
                camera={camera}
            >
                <Suspense fallback={null}>
                    <World />
                </Suspense>
                <Effects />
                {/* <OrbitControls/> */}
            </Canvas>
            <Loader />
        </>
    )
}

export default Experience