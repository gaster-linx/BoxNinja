class MovingPlat {
    constructor(x, y, vx, vy, max) {
        this.orgpos = {
            x: x,
            y: y
        };

        this.pos = {
            x: x,
            y: y
        };

        this.orgvel = {
            x: vx,
            y: vy
        };

        this.vel = {
            x: vx,
            y: vy
        };

        this.size = 30;
        this.name = `platform`;
        this.type = `moving platform`;
        this.max = max;
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (this.orgvel.x < 0) {
            if (this.pos.x < this.orgpos.x - this.max || this.pos.x > this.orgpos.x)
                this.vel.x *= -1;
        } else {
            if (this.pos.x > this.orgpos.x + this.max || this.pos.x < this.orgpos.x)
                this.vel.x *= -1;
        }

        if (this.pos.y > this.orgpos.y + this.max || this.pos.y < this.orgpos.y) this.vel.y *= -1;
    }

    render() {
        ctx.fillStyle = `rgb(44, 44, 44)`;
        ctx.fillRect(this.pos.x,this.pos.y, this.size, this.size);

        ctx.fillStyle = `rgb(100, 100, 100)`;
        ctx.fillRect(this.pos.x + 3, this.pos.y + 3, this.size - 6, this.size - 6);

        if (this.vel.x < 0) {
            ctx.drawImage(arrows[0], this.pos.x, this.pos.y + 2, 28, 28);
        } else if (this.vel.x > 0) {
            ctx.drawImage(arrows[2], this.pos.x + 2, this.pos.y + 2, 28, 28);
        } else if (this.vel.y < 0) {
            ctx.drawImage(arrows[1], this.pos.x + 1, this.pos.y + 2, 28, 28);
        } else if (this.vel.y > 0) {
            ctx.drawImage(arrows[3], this.pos.x + 1, this.pos.y + 2, 28, 28);
        }
    }
}