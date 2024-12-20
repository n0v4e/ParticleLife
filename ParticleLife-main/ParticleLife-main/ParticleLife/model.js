import { Config } from "./config.js";
import { Scene } from "./scene.js";
import { Simulation } from "./simulation.js";
import { Renderer } from "./renderer.js";
import { Attraction } from "./attraction.js";

class Model {
    constructor(context) {
        this.scene = new Scene(Config.scene.size, Config.scene.partition.divider);
        this.simulation = new Simulation(this.scene, () => { this.render(); });
        this.context = context;
        this.renderer = new Renderer();
    }

    initialize() {
        Attraction.initialize(Config.simulation.attraction.randomize, Config.simulation.attraction.matrix);
        this.scene.randomize(Config.simulation.particles.number);
        this.simulation.start();
    }

    update() {

    }

    render() {
        this.renderer.clear(this.context);
        this.renderer.renderScene(this.context, this.scene);
        if (Config.display.debug.partitions.enabled) {
            this.renderer.renderPartitions(this.context, this.scene);
        }
        if (Config.display.border.enabled) {
            this.renderer.drawBorder(this.context);
        }
    }

}

export { Model }