import { BackSide, Color, Data3DTexture, GLSL3, LinearFilter, RawShaderMaterial, RedFormat, Vector3 } from "three";
import { ImprovedNoise } from 'three/src/';

const size = 128;
const data = new Uint8Array(size * size * size);

let i = 0;
const scale = 0.05;
const perlin = new ImprovedNoise();
const vector = new Vector3();

for (let z = 0; z < size; z++) {

    for (let y = 0; y < size; y++) {

        for (let x = 0; x < size; x++) {

            const d = 1.0 - vector.set(x, y, z).subScalar(size / 2).divideScalar(size).length();
            data[i] = (128 + 128 * perlin.noise(x * scale / 1.5, y * scale, z * scale / 1.5)) * d * d;
            i++;

        }

    }

}

const texture = new Data3DTexture(data, size, size, size);
texture.format = RedFormat;
texture.minFilter = LinearFilter;
texture.magFilter = LinearFilter;
texture.unpackAlignment = 1;
texture.needsUpdate = true;

export const CloudMaterial = new RawShaderMaterial({
    glslVersion: GLSL3,
    uniforms: {
        base: { value: new Color(0x798aa0) },
        map: { value: texture },
        cameraPos: { value: new Vector3() },
        threshold: { value: 0.25 },
        opacity: { value: 0.25 },
        range: { value: 0.1 },
        steps: { value: 100 },
        frame: { value: 0 }
    },
    vertexShader,
    fragmentShader,
    side: BackSide,
    transparent: true
});