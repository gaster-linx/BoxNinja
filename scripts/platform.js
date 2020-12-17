class Platform {
    constructor(x, y) {
        this.tlx = x;
        this.tly = y;

        this.pos = {
            x: this.tlx,
            y: this.tly
        };

        this.vel = {
            x: 0,
            y: 0
        };

        this.size = 30;
        this.name = `platform`;
        this.type = `normal`;
    }

    render() {
        ctx.fillStyle = `rgb(44, 44, 44)`;
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);

        ctx.fillStyle = `rgb(100, 100, 100)`;
        ctx.fillRect(this.pos.x + 3, this.pos.y + 3, this.size - 6, this.size - 6);
    }
}