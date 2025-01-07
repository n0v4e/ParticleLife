import { Random } from "./random.js";
import { Particle } from "./particle.js";
import { Vector2 } from "./vector2.js";

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

    spawn(number) {
        this.objects = [];
        for (let n = 0; n < number; ++n) {
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
                const posX = center.x + x;
                const posY = center.y + y;
                if (center.substract(new Vector2(posX, posY)).length() <= range) {
                    if (posX >= 0 && posY >= 0 && posX < this.partitions.length && posY < this.partitions[posX].length) {
                        partitions.push(this.partitions[posX][posY]);
                    }
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