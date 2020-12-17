class FakeDoor {
    constructor(x, y, o = false) {
        this.pos = {
            x: x,
            y: y
        };

        this.size = 30;
        this.name = `fake door`;
        this.type = `fake door`;
        this.open = o;
    }

    render() {
        ctx.fillStyle = `rgb(54, 0, 0)`;
        ctx.fillRect(this.pos.x, this.pos.y - this.size, this.size, this.size * 2);

        ctx.fillStyle = `rgb(153, 77, 0)`;
        ctx.fillRect(this.pos.x + 3, this.pos.y - this.size + 3, this.size - 6, this.size * 2 - 6);

        ctx.fillStyle = `rgb(199, 199, 0)`;
        ctx.fillRect(this.pos.x + this.size - 10, this.pos.y + 5, 5, 5);

        if (this.open) {
            ctx.fillStyle = `rgb(0, 199, 0)`;
        } else {
            ctx.fillStyle = `rgb(199, 0, 0)`;
        }
        ctx.fillRect(this.pos.x + this.size / 2 - 5, this.pos.y - this.size / 2 - 8, 10, 10);

        if (this.open) {
            ctx.fillStyle = `rgb(0, 255, 0)`;
        } else {
            ctx.fillStyle = `rgb(255, 0, 0)`;
        }
        ctx.fillRect(this.pos.x + this.size / 2 - 3, this.pos.y - this.size / 2 - 6, 6, 6);
    }
}