import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTexture } from '../../Hooks/useTexture'
import { useLoader, useThree, extend, useFrame } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, Points, ShaderMaterial, ShapeGeometry, Vector3 } from 'three';
import { vertexShader } from './Shaders/Vertex';
import { fragmentShader } from './Shaders/Fragment';
import { Raycaster } from 'three';
import { PlaneGeometry } from 'three';
import { MeshBasicMaterial } from 'three';
import { Mesh } from 'three';

function Particles(props) {
  const particles = useRef()
  const planeArea = useRef()
  const [particleGeometry] = useState(new BufferGeometry())

  const colorChange = useMemo(() => new Color(), [])
  const geometryCopy = useMemo(() => new BufferGeometry(), [])

  const font = useLoader(FontLoader, 'https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json')
  const particleImg = useTexture('https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png')
  const { scene, camera } = useThree()

  const material = new ShaderMaterial({
    uniforms: {
      color: { value: new Color(0xffffff) },
      pointTexture: { value: particleImg }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,

    blending: AdditiveBlending,
    depthTest: false,
    transparent: true,
  })

  useEffect(() => {
    let thePoints = []
    const shapes = font.generateShapes(props.text, props.textSize)
    const geometry = new ShapeGeometry(shapes)
    geometry.computeBoundingBox()

    const xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    const yMid = (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 2.85;

    geometry.center();

    let holeShapes = [];

    for (let q = 0; q < shapes.length; q++) {
      let shape = shapes[q];

      if (shape.holes && shape.holes.length > 0) {
        for (let j = 0; j < shape.holes.length; j++) {
          let hole = shape.holes[j];
          holeShapes.push(hole);
        }
      }
    }

    shapes.push.apply(shapes, holeShapes);

    let colors = [];
    let sizes = [];

    for (let x = 0; x < shapes.length; x++) {
      let shape = shapes[x];
      const amountPoints = (shape.type === 'Path') ? props.amount / 2 : props.amount;
      let points = shape.getSpacedPoints(amountPoints);

      points.forEach((element, z) => {
        const a = new Vector3(element.x, element.y, element.z);
        thePoints.push(a);
        colors.push(colorChange.r, colorChange.g, colorChange.b);
        sizes.push(props.particleSize)
      });
    }

    particleGeometry.translate(xMid, yMid, 0);
    particleGeometry.setAttribute('customColor', new Float32BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new Float32BufferAttribute(sizes, 1));
    particleGeometry.setFromPoints(thePoints)

    geometryCopy.copy(particles.current.geometry);

    planeArea.current = setup(camera)
  }, [props, font, scene, particleImg, colorChange, geometryCopy, camera, particleGeometry])
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  const raycaster = new Raycaster()

  useFrame(({ camera, mouse }) => {
    // const time = ((.0001 * performance.now()) % 12) / 12;
    // const zigzagTime = (1 + (Math.sin(time * 2 * Math.PI))) / 6;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(planeArea.current);

    if (intersects.length > 0) {
      const pos = particles.current.geometry.attributes.position;
      const copy = geometryCopy.attributes.position;
      const coulors = particles.current.geometry.attributes.customColor;
      const size = particles.current.geometry.attributes.size;

      const mx = intersects[0].point.x;
      const my = intersects[0].point.y;
      const mz = intersects[0].point.z;

      for (let i = 0; i < pos.count; i++) {
        const initX = copy.getX(i);
        const initY = copy.getY(i);
        const initZ = copy.getZ(i);

        let px = pos.getX(i);
        let py = pos.getY(i);
        let pz = pos.getZ(i);

        // colorChange.setHSL(.5, 1, 1)
        // coulors.setXYZ(i, colorChange.r, colorChange.g, colorChange.b)
        // coulors.needsUpdate = true;

        size.array[i] = props.particleSize;
        size.needsUpdate = true;

        let dx = mx - px;
        let dy = my - py;
        const dz = mz - pz;

        const mouseDistance = distance(mx, my, px, py)

        if (mouseDistance < props.area) {
          if (i % 5 === 0) {
            const t = Math.atan2(dy, dx) + Math.random()
            px -= 0.08 * Math.cos(t);
            py -= 0.08 * Math.sin(t);
            pz -= 0.02 * Math.sin(t)

            colorChange.setHSL(.03, 1.0, .5)
            coulors.setXYZ(i, colorChange.r, colorChange.g, colorChange.b)
            coulors.needsUpdate = true;

            size.array[i] = props.particleSize * 5;
            size.needsUpdate = true;
          }else{
            const t = Math.atan2(dy, dx) + Math.random()
            px -= 0.08 * Math.cos(t);
            py -= 0.08 * Math.sin(t);
            pz += 0.1 * Math.sin(t);

            size.array[i] = props.particleSize * 0.05;
            size.needsUpdate = true;
          }
        }
        px += (initX - px) * props.ease;
        py += (initY - py) * props.ease;
        pz += (initZ - pz) * props.ease;

        pos.setXYZ(i, px, py, pz);
        pos.needsUpdate = true;
      }
    }
  })

  return (
    <>
      <points ref={particles} geometry={particleGeometry} material={material} />
    </>
  )
}

export default Particles

function setup(camera) {
  const geometry = new PlaneGeometry(visibleWidthAtZDepth(100, camera), visibleHeightAtZDepth(100, camera));
  const material = new MeshBasicMaterial({ color: 0x00ff00, transparent: true });
  const planeArea = new Mesh(geometry, material);
  planeArea.visible = false;
  return planeArea
}

function visibleWidthAtZDepth(depth, camera) {
  const height = visibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
}

function visibleHeightAtZDepth(depth, camera) {
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  const vFOV = camera.fov * Math.PI / 180;

  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}