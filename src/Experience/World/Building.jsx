import React, { useEffect } from 'react'
import { useAnimations, useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { LinearEncoding, MathUtils, Vector3 } from 'three'
import { useTexture } from '../Hooks/useTexture'
import { BuildingMaterial, CityMaterial, Emission, OtherMaterial } from './CustomMaterials/CustomMaterials'

export default function Building() {
    const scroll = useScroll()
    const { scene, animations } = useGLTF('/models/model.glb', true)
    const { actions } = useAnimations(animations, scene)

    const [buildingTexture, rest, cityMap] = useTexture([
        '/textures/buildingTexture.webp',
        '/textures/rest.webp',
        '/textures/city.png',
    ])

    useEffect(() => { actions['CameraAction'].play().paused = true }, [actions])

    useEffect(() => {
        scene.traverse(child => {
            if (child.material?.name === 'concret') return child.material = BuildingMaterial({ map: buildingTexture })
            if (child.material?.name === 'window') child.material = BuildingMaterial({ map: buildingTexture })
            if (child.material?.name === 'city') child.material = CityMaterial({ map: cityMap })
            if (child.material?.name === 'window_open') {
                child.material.emissive = Emission('#fff16f')
                child.material.emissiveIntensity = 1.5
                child.material.toneMapped = false
            }
            if (child.material?.name === 'cd_a' ||
                child.material?.name === 'cd_d' ||
                child.material?.name === 'cd_rest') {
                child.material.emissive = Emission('#fff16f')
                child.material.emissiveIntensity = 2
                child.material.toneMapped = false
            }
            if (child.name === 'rest') child.traverse(elm => {
                if (elm.isMesh) elm.material = OtherMaterial({ map: rest })
            })
            if (child.name === 'contactMe') child.traverse(elm => {
                if (!elm.isMesh) return
                elm.material.toneMapped = false
                elm.material.emissiveIntensity = 1.5
            })
            child.traverse(elm => {
                if (elm.material?.name === 'clouds') {
                    // elm.scale.multiply(new Vector3(1.1, 1.2, 1.1))
                }
            })
        })
    }, [scene, rest, buildingTexture])

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


    return (
        <>
            <primitive object={scene} />
        </>
    )
}