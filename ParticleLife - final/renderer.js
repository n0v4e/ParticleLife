import { Config } from "./config.js";

class Renderer {
    renderScene(context, scene) {
        for (var object of scene.objects) {
            context.fillStyle = object.color;
            context.strokeStyle = object.color;
            const radius = Config.display.particles.radius;
            context.beginPath();
            context.arc(object.position.x, object.position.y, radius, 0, Math.PI * 2);
            context.fill()
            context.stroke();
        }
    }

    renderPartitions(context, scene) {
        const divider = Config.scene.partition.divider;
        const numbers = Config.display.debug.partitions.numbers;
        const grid = Config.display.debug.partitions.grid;
        const opacity = Config.display.debug.partitions.opacity;

        const avgDivider = (divider.x + divider.y) / 2;
        const avgSceneSize = (scene.size.x + scene.size.y) / 2;
        const textSize = avgSceneSize / avgDivider * 0.5;

        context.fillStyle = "white";
        context.strokeStyle = "white";
        context.font = textSize + "px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";

        for (let x = 0; x < divider.x; ++x) {
            for (let y = 0; y < divider.y; ++y) {
                const width = scene.size.x / divider.x;
                const height = scene.size.y / divider.y;
                const number = scene.partitions[x][y].length;
                context.globalAlpha = opacity;
                context.beginPath();
                if (grid) {
                    context.rect(x * width, y * height, width, height);
                }
                if (numbers) {
                    context.fillText(number, x * width + width / 2, y * height + height / 2);
                }
                const partitionAlpha = number / scene.objects.length * divider.x * divider.y;
                context.globalAlpha = partitionAlpha * 0.2 * opacity;
                context.fillRect(x * width, y * height, width, height);
                context.stroke();
            }
        }
        context.globalAlpha = 1;
    }

    clear(context) {
        context.fillStyle = Config.display.clear.color;
        context.globalAlpha = Config.display.clear.blur;
        const size = Config.display.size;
        context.fillRect(0, 0, size.x, size.y);
        context.globalAlpha = 1;
    }

    drawBorder(context) {
        const size = Config.display.size;
        context.strokeStyle = Config.display.border.color;
        context.lineWidth = Config.display.border.thickness;
        context.beginPath();
        context.rect(0, 0, size.x, size.y);
        context.stroke();
        context.lineWidth = 1;
    }
}

export { Renderer }