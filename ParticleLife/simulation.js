import { Config } from "./config.js";

class Simulation {
    constructor(scene) {
        this.scene = scene;
        this.enabled = false;
        this.timer;
        this.setTimer();
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
        this.setTimer();
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
        }
    }

    setTimer() {
        const that = this;
        this.timer = setTimeout(function () { that.update() }, Config.solver.delta);
    }
}

export { Simulation }