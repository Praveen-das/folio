import { Color, DoubleSide, MeshBasicMaterial } from "three"

export const BuildingMaterial = (props) => new MeshBasicMaterial({ ...props, toneMapped: false, side: DoubleSide })
export const CityMaterial = (props) => new MeshBasicMaterial({ ...props, toneMapped: false })
const OtherMaterial = (props) => new MeshBasicMaterial({ ...props, toneMapped: false })
const Emission = (color) => new Color(color)

export const materials = [
    {
        name: 'clouds',
        texture: OtherMaterial
    }
]