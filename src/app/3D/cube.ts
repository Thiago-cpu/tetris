import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshStandardMaterialParameters,
} from "three";

export interface Cords3D {
  x: number;
  y: number;
  z: number;
}

type Geometry = ConstructorParameters<typeof BoxGeometry>;

export type CubeProps = {
  position?: Partial<Cords3D>;
  geometry?: Geometry;
  mesh?: MeshStandardMaterialParameters;
};

export class Cube extends Mesh {
  constructor({ position = {}, mesh, geometry = [] }: CubeProps) {
    super();
    this.geometry = new BoxGeometry(...geometry);
    this.material = new MeshStandardMaterial(mesh);
    this.position.x = position.x ?? this.position.x;
    // Invert the y-coordinate to align Three.js axis system with the canvas system
    this.position.y = (position.y ?? this.position.y) * -1;
    this.position.z = position.z ?? this.position.z;
  }

  dispose() {
    this.geometry.dispose();
  }
}
