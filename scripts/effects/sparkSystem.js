class SparkSystem {
    constructor(x, y) {
        this.center = {
            x: x,
            y: y
        };

        this.sparks = [];
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
    
    add(x = 0, y = 0) {
        this.sparks.push(new Spark(this.center.x + x, this.center.y + y));
    }
}