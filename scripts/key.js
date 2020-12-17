class Key {
    constructor(x, y) {
        this.pos = {
            x: x,
            y: y
        };

        this.size = 13;
        this.name = `key`;
        this.type = `key`;
        this.angle = 0;
    }

    render() {
        ctx.save();
        ctx.translate(this.pos.x + 15, this.pos.y + 15);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = `rgb(199, 199, 0)`;
        ctx.fillRect(-7.5, -7.5, this.size, this.size);

        ctx.fillStyle = `rgb(255, 255, 0)`;
        ctx.fillRect(-5, -5, this.size - 5, this.size - 5);
        ctx.restore();

        this.angle += 2;
    }
}