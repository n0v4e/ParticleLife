import { Random } from "./random.js";
import { Particle } from "./particle.js";
import { Vector2 } from "./vector2.js";
import { Config } from "./config.js";

class Scene {
    constructor(size, divider) {
        this.initialize(size);
        this.objects = [];
        this.partitions = [];
        this.divider = divider;
    }

    initialize(size) {
        this.size = size;
    }

    spawn() {
        this.objects = [];
        for (let n = 0; n < Config.simulation.particles.number; ++n) {
            const x = Random.range(0, this.size.x);
            const y = Random.range(0, this.size.y);
            const particle = new Particle(new Vector2(x, y), this);
            this.objects.push(particle);
        }
    }

    partition() {
        this.partitions = [];
        for (let x = 0; x < this.divider.x; ++x) {
            this.partitions.push([]);
            for (let y = 0; y < this.divider.y; ++y) {
                this.partitions[x].push([]);
            }
        }

        for (let object of this.objects) {
            const position = this.getPartition(object.position, this.divider);
            if (position.x < this.divider.x && position.x >= 0 && position.y < this.divider.y && position.y >= 0) {
                this.partitions[position.x][position.y].push(object);
            }
        }
    }

    getPartition(position) {
        const partitionSize = new Vector2(this.size.x / this.divider.x, this.size.y / this.divider.y);
        const x = Math.floor(position.x / partitionSize.x);
        const y = Math.floor(position.y / partitionSize.y);
        return new Vector2(x, y);
    }

    getNearbyPartitions(position, range) {
        const partitions = [];
        const center = this.getPartition(position);

        for (let x = -range; x <= range; ++x) {
            for (let y = -range; y <= range; ++y) {
                let posX = center.x + x;
                let posY = center.y + y;
                let offset = new Vector2(0, 0);
                if (center.substract(new Vector2(posX, posY)).length() <= range + 1) {
                    while (posX < 0 || posX >= this.divider.x) {
                        const direction = Math.sign(posX);
                        posX -= direction * this.divider.x;
                        offset.x -= direction;
                    }
                    while (posY < 0 || posY >= this.divider.y) {
                        const direction = Math.sign(posY);
                        posY -= direction * this.divider.y;
                        offset.y -= direction;
                    }

                    const particles = this.partitions[posX][posY];
                    const partition = [...particles];

                    // const partition = JSON.parse(JSON.stringify(particles));

                    // for (const particle of partition) {
                    //     particle.position.x += this.size.x * offset.x;
                    //     particle.position.y += this.size.y * offset.y;
                    // }

                    partitions.push(partition);

                }
            }
        }
        return partitions;
    }

    getNearbyParticles(position, range) {
        const particles = [];
        const nearbyPartitions = this.getNearbyPartitions(position, range);
        for (let partition of nearbyPartitions) {
            particles.push(...partition);
        }
        return particles;
    }
}

export { Scene }