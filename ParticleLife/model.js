import { Config } from "./config.js";
import { Scene } from "./scene.js";
import { Simulation } from "./simulation.js";
import { Renderer } from "./renderer.js";
import { Attraction } from "./attraction.js";

class Model {
    constructor() {
        this.scene = new Scene(Config.scene.size, Config.scene.partition.divider);
        this.simulation = new Simulation(this.scene);
        this.renderer = new Renderer();
    }

    initialize() {
        Attraction.initialize(Config.simulation.attraction.randomize, Config.simulation.attraction.matrix);
        this.scene.spawn(Config.simulation.particles.number);
        this.simulation.start();
    }

    update() {
        this.simulation.update();
    }

    render(context) {
        this.renderer.clear(context);
        this.renderer.renderScene(context, this.scene);
        if (Config.display.debug.partitions.enabled) {
            this.renderer.renderPartitions(context, this.scene);
        }
        if (Config.display.border.enabled) {
            this.renderer.drawBorder(context);
        }
    }
}

export { Model }