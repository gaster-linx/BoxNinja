class Door {
    constructor(x, y, n = 0) {
        this.pos = {
            x: x,
            y: y
        };

        this.size = 30;
        this.name = `door`;
        this.type = `door`;
        this.open = false;
        this.n = n;
    }

    render() {
        if (player.keys == currentKeyAmount) {
            this.open = true;
        } else {
            this.open = false;
        }

        if (this.n !== 0 && this.n != 1) {
            if (passed[this.n - 2]) this.open = true;
            else this.open = false;
        }

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