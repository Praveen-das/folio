import { Html, Loader, useGLTF, useProgress } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import { sources } from './sources'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import loadDraco from './dracoLoader'
import { sRGBEncoding, TextureLoader } from 'three'
import { BuildingMaterial } from '../World/Model/CustomMaterials/CustomMaterials'

function useModel() {
  const modelsURL = sources.models
  const textureURL = sources.textures
  const [model, setModel] = useState()

  const textures = useLoader(TextureLoader, textureURL)
  const models = useGLTF(modelsURL)


  useEffect(() => {
    for (const child of textures) {
      child.flipY = false
      child.encoding = sRGBEncoding
    }

    const [buildingTexture, rest, cityMap] = textures

    models.forEach(gltf => {
      gltf.scene.traverse(child => {
        if (child.material?.name === 'concret') return child.material = BuildingMaterial({ map: buildingTexture })
      })
    })

  }, [textures])

  return model
}

export default useModel