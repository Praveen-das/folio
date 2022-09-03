import { useLoader } from "@react-three/fiber"
import { sRGBEncoding, TextureLoader } from "three"

export function useTexture(path) {
    const texture = useLoader(TextureLoader, path)
    if (Array.isArray(texture)) {
        for (const child of texture) {
            child.flipY = false
            child.encoding = sRGBEncoding
        }
        return texture
    }
    // texture.magFilter
    texture.flipY = false
    texture.encoding = sRGBEncoding
    return texture
}