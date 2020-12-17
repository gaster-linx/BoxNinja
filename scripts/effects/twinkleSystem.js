class TwinkleSystem {
    constructor(x, y) {
        this.center = {
            x: x,
            y: y
        };

        this.sparks = Array(Math.floor(Math.random() * (15 - 5) + 5))
            .fill()
            .map(b => new Twinkle(this.center.x, this.center.y));
    }

    update() {
        for (let i = this.sparks.length - 1; i >= 0; i--) {
            this.sparks[i].update();
        }

        this.sparks = this.sparks.filter(s => !s.dead);
    }

    render() {
        for (let i = this.sparks.length - 1; i >= 0; i--) {
            this.sparks[i].render();
        }
    }
}