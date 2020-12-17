class Twinkle {
    constructor(x, y) {
        this.pos = {
            x: x,
            y: y
        };

        this.vel = {
            x: Math.random() * (1 - -1) + -1,
            y: Math.random() * (1 - -1) + -1
        };

        this.lifeSpan = 1;
        this.size = Math.random() * 5;
        this.color = [
            `155, 155, 0`,
            `205, 205, 0`,
            `255, 255, 0`
        ][Math.floor(Math.random() * 3)];
        this.angle = 0;
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        this.lifeSpan -= .03;
        this.angle += 1;
    }

    render() {
        ctx.save();
        ctx.translate(this.pos.x + this.size / 2, this.pos.y + this.size / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = `rgba(${ this.color }, ${ this.lifeSpan })`;
        ctx.fillRect(0, 0, this.size, this.size);
        ctx.restore();
    }

    get dead() {
        return this.lifeSpan <= 0;
    }
}