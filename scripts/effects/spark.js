class Spark {
    constructor(x, y) {
        this.pos = {
            x: x,
            y: y
        };

        this.vel = {
            x: Math.random() * (.1 - -.1) + -.1,
            y: Math.random() * -.5
        };

        this.lifeSpan = 1;
        this.size = Math.random() * 5;
        this.color = [
            `50, 50, 50`,
            `100, 100, 100`,
            `255, 255, 255`
        ][Math.floor(Math.random() * 3)];
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        this.lifeSpan -= .05;
    }

    render() {
        ctx.fillStyle = `rgba(${ this.color }, ${ this.lifeSpan })`;
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }

    get dead() {
        return this.lifeSpan <= 0;
    }
}