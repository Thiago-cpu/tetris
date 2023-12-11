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
  constructor({
    position = {},
    mesh,
    geometry: [width = 1, height = 1, depth = 1, ...restGeometry] = [],
  }: CubeProps) {
    super(
      new BoxGeometry(width, height, depth, ...restGeometry),
      new MeshStandardMaterial(mesh),
    );

    // Invert the y-coordinate to align Three.js axis system with the canvas system
    this.position.y = (position.y ?? this.position.y) * -1;
    this.position.x =
      typeof position.x === "number" ? position.x + width / 2 : this.position.x;
    this.position.z = position.z ?? this.position.z;
  }

  dispose() {
    this.geometry.dispose();
  }
}
