import { Random } from "./random.js";
import { Particle } from "./particle.js";
import { Vector2 } from "./vector2.js";

class Scene {
    constructor(size, divider) {
        this.size = size;
        this.objects = [];
        this.partitions = [];
        this.divider = divider;
    }

    randomize(number) {
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
            object.position = this.fitIntoGrid(object.position, this.size).position;
            const position = this.getPartition(object.position, this.divider);
            this.partitions[position.x][position.y].push(object);
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
                // if (center.substract(new Vector2(posX, posY)).length() <= range) {
                const translated = this.fitIntoGrid(new Vector2(posX, posY), new Vector2(this.partitions.length, this.partitions[0].length));
                if (translated.position.x >= 0 && translated.position.y >= 0
                    && translated.position.x < this.partitions.length
                    && translated.position.y < this.partitions[translated.position.x].length) {
                    if (translated.offset.x != 0 || translated.offset.y != 0) {
                        // console.log(translated.offset);
                    }
                    const copy = [...this.partitions[translated.position.x][translated.position.y]];
                    // for (let particle of copy) {
                    //     particle.position = particle.position.add(translated.offset);
                    // }
                    partitions.push(this.partitions[translated.position.x][translated.position.y]);
                }
                // }
            }
        }

        return partitions;
    }

    fitIntoGrid(position, size) {
        const newPosition = new Vector2(position.x, position.y);
        const finalOffset = new Vector2(0, 0);

        while (!(newPosition.x >= 0 && newPosition.x < size.x)) {
            const offset = Math.sign(newPosition.x) * size.x;
            finalOffset.x += offset;
            newPosition.x -= offset;
        }

        while (!(newPosition.y >= 0 && newPosition.y < size.y)) {
            const offset = Math.sign(newPosition.y) * size.y;
            finalOffset.y += offset;
            newPosition.y -= offset;
        }

        return { position: newPosition, offset: finalOffset };
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