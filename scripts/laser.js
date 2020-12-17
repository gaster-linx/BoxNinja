class Laser {
    constructor(x, y, vx, vy) {
        this.tlx = x;
        this.tly = y;

        this.pos = {
            x: this.tlx,
            y: this.tly
        };

        this.beamvel = {
            x: vx,
            y: vy
        };

        this.vel = {
            x: 0,
            y: 0
        };

        this.size = 30;
        this.name = `platform`;
        this.type = `laser`;

        this.beams = [];

        if (this.beamvel.x < 0) {
            this.side = `left`;
        } else if (this.beamvel.x > 0) {
            this.side = `right`;
        } else if (this.beamvel.y < 0) {
            this.side = `up`;
        } else if (this.beamvel.y > 0) {
            this.side = `down`;
        }
    }

    render() {
        ctx.fillStyle = `rgb(44, 44, 44)`;
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);

        ctx.fillStyle = `rgb(100, 100, 100)`;
        ctx.fillRect(this.pos.x + 3, this.pos.y + 3, this.size - 6, this.size - 6);

        if (this.beams.length == 0) {
            if (Math.random() > .95) {
                if (this.side == `left`) {
                    this.beams.push(
                        new LaserBeam(
                            this.pos.x + this.size / 2 - 20,
                            this.pos.y + this.size / 2 - 1.5,
                            this.beamvel.x * 5,
                            this.beamvel.y * 5,
                            this.side
                        )
                    );
                } else if (this.side == `right`) {
                    this.beams.push(
                        new LaserBeam(
                            this.pos.x + this.size / 2 + 20,
                            this.pos.y + this.size / 2 - 1.5,
                            this.beamvel.x * 5,
                            this.beamvel.y * 5,
                            this.side
                        )
                    );
                } else if (this.side == `down`) {
                    this.beams.push(
                        new LaserBeam(
                            this.pos.x + this.size / 2 - 1.5,
                            this.pos.y + this.size / 2,
                            this.beamvel.x * 5,
                            this.beamvel.y * 5,
                            this.side
                        )
                    );
                }
            }
        } else {
            this.beams[0].render();
            if (this.beams[0].dead) {
                blasts.push(new BlastSystem(this.beams[0].pos.x, this.beams[0].pos.y));
                this.beams = [];
            }
        }

        if (this.side == `left`) {
            ctx.fillStyle = `rgb(101, 0, 0)`;
            ctx.fillRect(this.pos.x - 3, this.pos.y + 10, 20, 10);

            ctx.fillStyle = `rgb(200, 0, 0)`;
            ctx.fillRect(this.pos.x, this.pos.y + 13, 20 - 6, 10 - 6);
        } else if (this.side == `right`) {
            ctx.fillStyle = `rgb(101, 0, 0)`;
            ctx.fillRect(this.pos.x + this.size - 15, this.pos.y + 10, 20, 10);

            ctx.fillStyle = `rgb(200, 0, 0)`;
            ctx.fillRect(this.pos.x + this.size - 12, this.pos.y + 13, 20 - 6, 10 - 6);
        } else if (this.side == `down`) {
            ctx.fillStyle = `rgb(101, 0, 0)`;
            ctx.fillRect(this.pos.x + this.size / 2 - 5, this.pos.y + 15, 10, 20);

            ctx.fillStyle = `rgb(200, 0, 0)`;
            ctx.fillRect(this.pos.x + this.size / 2 - 2, this.pos.y + 18, 10 - 6, 20 - 6);
        }
    }
}