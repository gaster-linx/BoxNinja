class DeathBlock {
    constructor(x, y, vx, max) {
        this.tlx = x;
        this.tly = y;

        this.orgpos = {
            x: x,
            y: y
        };

        this.pos = {
            x: this.tlx,
            y: this.tly
        };

        this.orgvel = {
            x: vx,
            y: 0
        };

        this.vel = {
            x: vx,
            y: 0
        };

        this.size = 30;
        this.name = `platform`;
        this.type = `elimination`;
        this.max = max;
    }

    render() {
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

        ctx.fillStyle = `rgb(199, 3, 0)`;
        ctx.fillRect(this.pos.x,this.pos.y, this.size, this.size);

        ctx.fillStyle = `rgb(255, 102, 0)`;
        ctx.fillRect(this.pos.x + 3, this.pos.y + 3, this.size - 6, this.size - 6);
    }
}