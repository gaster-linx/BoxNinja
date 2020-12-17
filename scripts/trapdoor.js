class TrapDoor {
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
        this.type = `trap door`;
        this.open = false;
        this.timing = 2;
    }

    render() {
        ctx.fillStyle = `rgb(44, 44, 44)`;
        ctx.fillRect(this.pos.x,this.pos.y, this.size, this.size);

        ctx.fillStyle = `rgb(100, 100, 100)`;
        ctx.fillRect(this.pos.x + 3, this.pos.y + 3, this.size - 6, this.size - 6);

        ctx.drawImage(arrows[3], this.pos.x + 1, this.pos.y + 2, 28, 28);

        if (frc % (this.timing * 60) === 0) {
            if (!(
                this.pos.x < player.pos.x + player.size &&
                this.pos.x + this.size > player.pos.x &&
                this.pos.y < player.pos.y + player.size &&
                this.pos.y + this.size > player.pos.y
            )) {
                this.open = !this.open;
                this.timing = 2;
            } else {
                this.timing = .5;
            }
        }

        if (this.open) this.name = `open`;
        else this.name = `platform`;

        if (this.open) {
            ctx.fillStyle = `rgba(255, 255, 255, .5)`;
            ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
        }
    }
}