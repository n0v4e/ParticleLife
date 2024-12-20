import { Attraction } from "./attraction.js";
import { Config } from "./config.js";
import { Random } from "./random.js";
import { Vector2 } from "./vector2.js";

class Particle {
    constructor(position, scene) {
        this.position = position;
        this.velocity = new Vector2(0, 0);
        this.color = this.getRandomColor();
        this.scene = scene;
        const colors = Config.simulation.particles.colors;
        this.attractions = Attraction.matrix[colors.indexOf(this.color)];
        this.partitionRange = this.getPartitionRange();
    }

    getRandomColor() {
        const colors = Config.simulation.particles.colors;
        const index = Random.rangeInt(0, colors.length);
        return colors[index];
    }

    update() {
        this.velocity = new Vector2(0, 0);
        const range = Config.simulation.particles.range;
        for (let object of this.scene.getNearbyParticles(this.position, this.partitionRange)) {
            if (object != this) {
                const offset = object.position.substract(this.position);
                const dist = offset.length()
                if (offset.length() <= range) {
                    const direction = offset.normalized();
                    const factor = Config.simulation.physics.dt;
                    const attraction = this.attractions[Config.simulation.particles.colors.indexOf(object.color)];
                    const acceleration = direction.multiply(factor).multiply(this.getAttraction(dist, attraction));
                    this.velocity = this.velocity.add(acceleration);
                }
            }
        }
    }

    getPartitionRange() {
        const avgDivider = (this.scene.divider.x + this.scene.divider.y) / 2;
        const avgSceneSize = (this.scene.size.x + this.scene.size.y) / 2;
        const range = Config.simulation.particles.range;
        const partitionSize = avgSceneSize / avgDivider;
        const partitionRange = Math.floor(range / partitionSize) + 1;
        return partitionRange;
    }

    getAttraction(distance, scale) {
        const range = Config.simulation.particles.range;
        const ratio = distance / range;
        const beta = Config.simulation.particles.beta;
        if (distance > 0 && distance < range) {
            if (ratio < beta) {
                return ratio / beta - 1;
            }
            else {
                return scale * (1 - Math.abs(2 * ratio - 1 - beta) / (1 - beta));
            }
        }
        return 0;
    }
}

export { Particle }