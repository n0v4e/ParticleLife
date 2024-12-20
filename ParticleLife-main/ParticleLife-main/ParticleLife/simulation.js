import { Config } from "./config.js";
import { Vector2 } from "./vector2.js";

class Simulation {
    constructor(scene, render) {
        this.scene = scene;
        this.enabled = false;
        this.timer;
        this.render = render;
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

    process() {
        this.setTimer();
        if (this.enabled) {
            this.scene.partition();
            // console.log(this.scene.getNearbyParticles(new Vector2(100, 100), 1));
            this.solve(this.scene);
        }
        this.render();
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
        this.timer = setTimeout(function () { that.process() }, Config.solver.delta);
    }
}

export { Simulation }