import {
  BoxGeometry,
  CanvasTexture,
  Mesh,
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  RepeatWrapping,
  Vector2,
} from "three";
import { Cords3D } from "./cube";
import { FlakesTexture } from "three/examples/jsm/Addons.js";

type MetalBaseProps = {
  geometry?: ConstructorParameters<typeof BoxGeometry>;
  material?: MeshPhysicalMaterialParameters;
  position?: Cords3D;
};

export class MetalBase extends Mesh {
  constructor({ material = {}, geometry = [], position }: MetalBaseProps) {
    const texture = new CanvasTexture(new FlakesTexture());
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.x = 10;
    texture.repeat.y = 6;
    super(
      new BoxGeometry(...geometry),
      new MeshPhysicalMaterial({
        ...material,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        color: 0x8418ca,
        metalness: 1,
        roughness: 0.5,
        normalMap: texture,
        normalScale: new Vector2(0.15, 0.15),
      }),
    );

    this.position.x = position?.x ?? this.position.x;
    // Invert the y-coordinate to align Three.js axis system with the canvas system
    this.position.y = (position?.y ?? this.position.y) * -1;
    this.position.z = position?.z ?? this.position.z;
  }

  dispose() {
    this.geometry.dispose();
  }
}
