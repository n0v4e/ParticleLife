import { Config } from "./config.js";
import { Random } from "./random.js";

class Attraction {

    static matrix = [];

    static initialize() {
        this.randomizeMatrix();
    }

    static randomizeMatrix() {
        this.matrix = [];
        const colors = Config.simulation.particles.colors;
        for (let color of colors) {
            this.matrix.push([]);
        }
        for (let i of this.matrix) {
            for (let color of colors) {
                i.push([Random.range(-1, 1).toFixed(2)]);
            }
        }
    }
}

export { Attraction }