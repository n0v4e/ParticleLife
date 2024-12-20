class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    substract(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    multiply(number) {
        return new Vector2(this.x * number, this.y * number);
    }

    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    normalized() {
        const length = this.length();
        return new Vector2(this.x / length, this.y / length);
    }
}

export { Vector2 }