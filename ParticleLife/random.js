class Random {
    static range(min, max) {
        return Math.random() * (max - min) + min;
    }

    static rangeInt(min, max) {
        return Math.floor(this.range(min, max));
    }
}

export { Random }