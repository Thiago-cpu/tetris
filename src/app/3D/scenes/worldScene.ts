import { Game } from "@/app/core/game";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  SRGBColorSpace,
  Scene,
  WebGLRenderer,
} from "three";
import { ColorSystem } from "./boardScene";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class WorldScene extends Scene {
  game: Game;
  colorSystem: ColorSystem;
  ambientLight = new AmbientLight(0xffffff, 1);
  light = new DirectionalLight(0xffffff, 20);
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  renderer = new WebGLRenderer({ alpha: true, antialias: true });
  orbitControls = new OrbitControls(this.camera, this.renderer.domElement);

  constructor(game: Game, colorSystem: ColorSystem) {
    super();
    this.game = game;
    this.colorSystem = colorSystem;
    this.translateX((this.game.width / 2) * -1);
    this.translateY(this.game.height / 2);
    this.camera.position.set(0, 0, 25);
    this.setupLights();
  }

  setupLights() {
    this.add(this.ambientLight);
    this.light.position.set(0, 25, 4);
    this.add(this.light);
    this.add(this.light.shadow.camera);
  }

  update() {
    this.orbitControls.update();
  }

  render() {
    this.renderer.render(this, this.camera);
  }

  setup(container: HTMLElement) {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(this.renderer.domElement);
  }

  cleanup(container: HTMLElement) {
    container.removeChild(this.renderer.domElement);
  }
}
