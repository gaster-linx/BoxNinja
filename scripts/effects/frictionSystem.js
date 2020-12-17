class FrictionSystem {
    constructor(x, y, s) {
        this.center = {
            x: x,
            y: y
        };

        this.sparks = [];
        this.side = s;
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
        this.sparks.push(new Friction(this.center.x + x, this.center.y + y, this.side));
    }
}