import { Vector2 } from "./vector2.js";

class Config {
    static program = {
        delta: 16
    };
    static display = {
        size: new Vector2(948, 948),
        clear: {
            color: "rgb(20,20,20)",
            blur: 0.5,
        },
        border: {
            enabled: true,
            color: "rgba(150,150,150,1)",
            thickness: 5
        },
        debug: {
            partitions: {
                enabled: false,
                grid: true,
                numbers: true,
                opacity: 0.3,
            },
        },
        particles: { radius: 1 }
    };
    static simulation = {
        particles: {
            number: 5000,
            colors: ["red", "green", "lightblue"],
            range: 56,
            beta: 0.3,
        },
        attraction: {
            randomize: true,
            matrix: [
                // [[0], [0], [0],],
                // [[0], [0], [0],],
                // [[0], [0], [0],],
            ],
        },
        physics: {
            dt: 0.5,
            friction: 0.1,
        },
    };
    static scene = {
        size: new Vector2(948, 948),
        partition: {
            divider: new Vector2(64, 64),
        }
    }
    static solver = {
        delta: 16,
    };
}

export { Config };