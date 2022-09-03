import { useAnimations, useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { MathUtils, MeshBasicMaterial } from 'three'
import { useTexture } from '../Utilz/useTexture'

export default function Helicopter() {
    const scroll = useScroll()
    const { scene, animations } = useGLTF('/models/helicopter.glb')
    const { actions } = useAnimations(animations, scene)
    const texture = useTexture('/textures/chopper.jpg')

    useEffect(() => {
        actions['fly'].play()
    }, [actions, scroll])

    useEffect(() => {
        const material = new MeshBasicMaterial({ map: texture, toneMapped: false })
        scene.traverse(children => {
            if (!children.isMesh) return
            if (children.material.name === 'chopper_glass') return
            children.material = material
        })
    }, [scene, texture])

    useFrame((state, delta) => {
        if (scroll.offset >= 0.1 && !actions['fly'].paused) actions['fly'].paused = true
        if (scroll.offset < 0.1 && actions['fly'].paused) actions['fly'].paused = false

        const mouse = state.mouse
        scene.position.x = MathUtils.damp(scene.position.x, mouse.x * 0.4, 1, delta)
        scene.position.y = MathUtils.damp(scene.position.y, mouse.y * 0.1, 2, delta)
    })

    return <primitive object={scene} />
}
