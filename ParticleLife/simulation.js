import { Config } from "./config.js";

class Simulation {
    constructor(scene) {
        this.scene = scene;
        this.enabled = false;
    }

    toggle() {
        this.enabled = !this.enabled;
    }

    start() {
        this.enabled = true;
    }

    stop() {
        this.enabled = false;
    }

    update() {
        if (this.enabled) {
            this.scene.partition();
            this.solve(this.scene);
        }
    }

    solve(scene) {
        for (var object of scene.objects) {
            object.update();
            const friction = Config.simulation.physics.friction;
            object.position = object.position.add(object.velocity.multiply(1 - friction));

            while (object.position.x < 0 || object.position.x > this.scene.size.x) {
                object.position.x -= Math.sign(object.position.x) * this.scene.size.x;
            }
            while (object.position.y < 0 || object.position.y > this.scene.size.y) {
                object.position.y -= Math.sign(object.position.y) * this.scene.size.y;
            }
        }
    }
}

export { Simulation }