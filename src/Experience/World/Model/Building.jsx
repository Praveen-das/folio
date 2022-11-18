import React, { useEffect, useRef } from 'react'
import { PerspectiveCamera, useAnimations, useGLTF, useScroll, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MathUtils, sRGBEncoding } from 'three'
import { LoopOnce } from 'three'
import { sources } from '../../Hooks/sources'
import { MeshBasicMaterial } from 'three'

export default function Building(props) {
    const scroll = useScroll()
    const group = useRef()

    const { nodes, materials, animations } = useGLTF('/models/model.glb')
    const { actions } = useAnimations(animations, group)

    const [buildingTexture, rest, cityMap] = useTexture(sources.textures, (textures) => {
        textures.forEach(t => {
            t.flipY = false
            t.encoding = sRGBEncoding
        })
    })

    const BuildingMaterial = new MeshBasicMaterial({ map: buildingTexture, toneMapped: false })
    const CityMaterial = new MeshBasicMaterial({ map: cityMap, toneMapped: false })
    const OtherMaterial = new MeshBasicMaterial({ map: rest, toneMapped: false })


    useEffect(() => {
        actions['CameraAction'].play().paused = true
        setTimeout(() => {
            actions['cityAction'].play().clampWhenFinished = true
            actions['cityAction'].loop = LoopOnce
        }, 100)
    }, [actions])

    const smallCloud = useRef()
    const largeCloud = useRef()

    useFrame((s, delta) => {
        const action = actions['CameraAction']
        const offset = scroll.offset
        action.time = MathUtils.damp(action.time, action.getClip().duration * offset, 10, delta)

        const time = s.clock.elapsedTime
        // smallCloud.current.position.y += Math.sin(time * 2) * 0.0005
        smallCloud.current.scale.x += Math.min(Math.sin(time), 1.1) * 0.0002
        smallCloud.current.scale.x += Math.min(Math.sin(time), 1.1) * 0.0002
        smallCloud.current.scale.y += Math.min(Math.sin(time), 1.1) * 0.0002
        largeCloud.current.scale.y += Math.min(Math.sin(time), 1.1) * 0.0002
        largeCloud.current.scale.z += Math.min(Math.sin(time), 1.1) * 0.0002
        largeCloud.current.scale.z += Math.min(Math.sin(time), 1.1) * 0.0002

    })

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <PerspectiveCamera name="Camera" makeDefault={true} far={100} near={0.1} fov={22.9} position={[2.68, 3.08, 2.93]} rotation={[-0.03, 0.56, 0.02]} />
                <mesh name="grills" geometry={nodes.grills.geometry} material={OtherMaterial} position={[0.17, 2.39, -0.01]} />
                <group name="Works" position={[0.03, 1.53, 0.03]} rotation={[0, -Math.PI / 2, 0]}>
                    <mesh name="works" geometry={nodes.works.geometry} material={materials.Banner} />
                    <mesh name="works_1" geometry={nodes.works_1.geometry} material={materials.screen} />
                    <mesh name="works_2" geometry={nodes.works_2.geometry} material={materials['screen.001']} />
                    <mesh name="works_3" geometry={nodes.works_3.geometry} material={materials['screen.002']} />
                </group>
                <mesh name="city" geometry={nodes.city.geometry} material={CityMaterial} scale={[1, 0, 1]} />
                <mesh name="cloud" ref={largeCloud} geometry={nodes.cloud.geometry} material={OtherMaterial} scale={[1.05, 1.05, 1.05]} position={[0.29, 2.65, 0.22]} />
                <mesh name="cloud2" ref={smallCloud} geometry={nodes.cloud2.geometry} material={OtherMaterial} position={[0.85, 2.73, -0.3]} />
                <group name="building">
                    <mesh name="building_1" geometry={nodes.building_1.geometry} material={BuildingMaterial} />
                    <mesh name="building_2" geometry={nodes.building_2.geometry} material={BuildingMaterial} />
                    <mesh name="building_3" geometry={nodes.building_3.geometry} material={materials.window_glass} />
                    <mesh name="building_4" geometry={nodes.building_4.geometry} material={materials.window_open} />
                    <mesh name="building_5" geometry={nodes.building_5.geometry} material={OtherMaterial} />
                </group>
                <mesh name="creativeDev" geometry={nodes.creativeDev.geometry} material={materials.cd_d} position={[0.17, 2.39, -0.01]} />
                <mesh name="vents" geometry={nodes.vents.geometry} material={OtherMaterial} position={[0.17, 2.39, -0.01]} />
                <group name="tower" position={[0.17, 2.39, -0.01]}>
                    <mesh name="tower_1" geometry={nodes.tower_1.geometry} material={OtherMaterial} />
                    <mesh name="tower_2" geometry={nodes.tower_2.geometry} material={OtherMaterial} />
                    <mesh name="tower_3" geometry={nodes.tower_3.geometry} material={materials.ir} />
                </group>
                <group name="mail" position={[0.29, 2.65, 0.21]}>
                    <mesh name="mail_1" geometry={nodes.mail_1.geometry} material={materials['Material.025']} />
                    <mesh name="mail_2" geometry={nodes.mail_2.geometry} material={materials['Material.026']} />
                    <mesh name="mail_3" geometry={nodes.mail_3.geometry} material={materials['Material.027']} />
                    <mesh name="mail_4" geometry={nodes.mail_4.geometry} material={materials['Material.024']} />
                </group>
                <group name="linkedin" position={[0.29, 2.65, 0.21]}>
                    <mesh name="Mesh004" geometry={nodes.Mesh004.geometry} material={materials['Material.026']} />
                    <mesh name="Mesh004_1" geometry={nodes.Mesh004_1.geometry} material={materials['Material.027']} />
                    <mesh name="Mesh004_2" geometry={nodes.Mesh004_2.geometry} material={materials['Material.022']} />
                    <mesh name="Mesh004_3" geometry={nodes.Mesh004_3.geometry} material={materials['Material.024']} />
                </group>
                <group name="github" position={[0.29, 2.65, 0.21]}>
                    <mesh name="Mesh008" geometry={nodes.Mesh008.geometry} material={materials['Material.026']} />
                    <mesh name="Mesh008_1" geometry={nodes.Mesh008_1.geometry} material={materials['Material.027']} />
                    <mesh name="Mesh008_2" geometry={nodes.Mesh008_2.geometry} material={materials['Material.021']} />
                    <mesh name="Mesh008_3" geometry={nodes.Mesh008_3.geometry} material={materials['Material.004']} />
                </group>
            </group>
        </group>
    )
}