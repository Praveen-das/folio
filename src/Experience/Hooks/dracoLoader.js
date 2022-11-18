import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

export default function loadDraco(loader) {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    loader.setDRACOLoader(dracoLoader)
}