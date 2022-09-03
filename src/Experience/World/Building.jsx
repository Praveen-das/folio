import React, { useEffect } from 'react'
import { useAnimations, useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Color, MathUtils, MeshBasicMaterial, NearestFilter } from 'three'
import { useTexture } from '../Utilz/useTexture'
import { CloudMaterial } from './CloudMaterial/CloudMaterial'

export default function Building() {
    const scroll = useScroll()
    const { scene, animations } = useGLTF('/models/model.glb', true)
    const { actions } = useAnimations(animations, scene)

    const [buildingTexture, rest, DPCAlphaMap] = useTexture([
        '/textures/buildingTexture.webp',
        '/textures/rest.webp',
        '/textures/DPC.jpg'
    ])

    useEffect(() => { actions['CameraAction'].play().paused = true }, [actions])

    useEffect(() => {
        DPCAlphaMap.minFilter = NearestFilter

        const buildingMaterial = new MeshBasicMaterial({ map: buildingTexture, toneMapped: false })
        const otherMaterial = new MeshBasicMaterial({ map: rest, toneMapped: false })
        const DPCMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0 })
        const windowEmission = new Color('#fff16f')
        

        scene.traverse(child => {
            if (child.material?.name === 'concret') return child.material = buildingMaterial
            if (child.material?.name === 'window') child.material = buildingMaterial
            if (child.material?.name === 'window_open') {
                child.material.emissive = windowEmission
                child.material.emissiveIntensity = 1.5
                child.material.toneMapped = false
            }
            if (child.material?.name === 'cd_a' ||
                child.material?.name === 'cd_d' ||
                child.material?.name === 'cd_rest') {
                child.material.emissive = windowEmission
                child.material.emissiveIntensity = 2
                child.material.toneMapped = false
            }
            if (child.name === 'rest') child.traverse(elm => { if (elm.isMesh) elm.material = otherMaterial })
            if (child.name === 'Tags') child.traverse(elm => {
                if (elm.material?.name !== 'DPC') return
                elm.material = DPCMaterial
            })
            if (child.name === 'contactMe') child.traverse(elm => {
                if (!elm.isMesh) return
                elm.material.toneMapped = false
                elm.material.emissiveIntensity = 1.5
            })
        })
    }, [scene, rest, buildingTexture, DPCAlphaMap])

    useFrame((state, delta) => {
        // let tick = (Math.random() * 1000)

        // state.scene.traverse(child => {
        //     if (child.material?.name === 'creativeDev') {
        //         if (tick > 950)
        //             return child.material.emissiveIntensity = 0.1
        //         child.material.emissiveIntensity = 50
        //     }
        // })

        const action = actions['CameraAction']
        const offset = scroll.offset
        action.time = MathUtils.damp(action.time, action.getClip().duration * offset, 10, delta)
    })

    return <primitive object={scene} />
}