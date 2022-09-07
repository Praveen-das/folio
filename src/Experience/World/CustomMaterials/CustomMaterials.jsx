import { Color, DoubleSide, MeshBasicMaterial } from "three"

export const BuildingMaterial = (props) => new MeshBasicMaterial({ ...props, toneMapped: false, side: DoubleSide })
export const CityMaterial = (props) => new MeshBasicMaterial({ ...props, toneMapped: false })
export const OtherMaterial = (props) => new MeshBasicMaterial({ ...props, toneMapped: false })
export const Emission = (color) => new Color(color)