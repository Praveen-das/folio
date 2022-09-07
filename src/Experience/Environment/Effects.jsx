import React from 'react'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

export default function _Effects() {

    return (
        <EffectComposer disableGamma>
            <Bloom mipmapBlur radius={0.5} intensity={0.05} />
        </EffectComposer>
    )
}
