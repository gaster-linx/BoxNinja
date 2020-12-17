class LaserBeam {
    constructor(x, y, vx, vy, s) {
        this.pos = {
            x: x,
            y: y
        };

        this.vel = {
            x: vx,
            y: vy
        };

        this.name = `beam`;
        this.type = `obstacle`;
        if (s == `left` || s == `right`) {
            this.width = 20;
            this.height = 3;
        } else {
            this.width = 3;
            this.height = 20;
        }
        this.side = s;
    }

    render() {
        ctx.fillStyle = `rgb(100, 0, 0)`;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    collide() {
        for (let p of platforms) {
            if (
                this.pos.x < p.pos.x + p.size &&
                this.pos.x + this.width > p.pos.x &&
                this.pos.y < p.pos.y + p.size &&
                this.pos.y + this.height > p.pos.y
            ) {
                return true;
            }
        }

        return false;
    }

    get dead() {
        for (let p of platforms) {
            if (
                this.pos.x < p.pos.x + p.size &&
                this.pos.x + this.width > p.pos.x &&
                this.pos.y < p.pos.y + p.size &&
                this.pos.y + this.height > p.pos.y &&
                p.type != `laser`
            ) {
                return true;
            }
        }

        return false;
    }
}
