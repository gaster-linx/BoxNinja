class SpringBoard {
    constructor(x, y, p) {
        this.pos = {
            x: x,
            y: y
        };

        this.vel = {
            x: 0,
            y: 0
        };

        this.size = 30;
        this.name = `platform`;
        this.type = `spring board`;
        this.power = p;
    }

    render() {
        ctx.fillStyle = `rgb(44, 44, 44)`;
        ctx.fillRect(this.pos.x,this.pos.y, this.size, this.size);

        ctx.fillStyle = `rgb(100, 100, 100)`;
        ctx.fillRect(this.pos.x + 3, this.pos.y + 3, this.size - 6, this.size - 6);

        ctx.drawImage(arrows[1], this.pos.x + 1, this.pos.y, 28, 28);
    }
}