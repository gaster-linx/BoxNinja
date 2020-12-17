class Player {
    constructor() {
        this.pos = {
            x: 245,
            y: 450
        };

        this.vel = {
            x: 0,
            y: 0
        };

        this.size = 20;
        this.jump = false;
        this.top = false;
        this.sliding = false;
        this.slideSide = 0;
        this.bandside = `left`;

        this.keys = 0;
    }

    update() {
        this.vel.y += gravity;
        if (this.vel.y > 10) this.vel.y = 10;

        if (this.jump && !this.top && this.vel.y == gravity) {
            if (currentLevel == 4) this.vel.y = -4;
            else this.vel.y = -8;
        }

        this.sliding = false;
        this.top = false;

        this.pos.x += this.vel.x;
        this.collide(this.vel.x, 0);

        this.pos.y += this.vel.y;
        this.collide(0, this.vel.y);

        if (this.vel.x < 0) this.bandside = `left`;
        else if (this.vel.x > 0) this.bandside = `right`;
    }

    render() {
        ctx.fillStyle = `rgb(255, 255, 255)`;
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(10 * Math.PI / 180);
        if (this.vel.x < 0) ctx.fillRect(this.size, 2, 7, 3);
        else if (this.vel.x > 0) ctx.fillRect(-6, 2, 7, 3);
        else if (this.bandside == `left`) ctx.fillRect(this.size, 2, 7, 3);
        else if (this.bandside == `right`) ctx.fillRect(-6, 2, 7, 3);
        ctx.restore();
        
        ctx.save();
        ctx.translate(this.pos.x - 2, this.pos.y + 3);
        ctx.rotate(-10 * Math.PI / 180);
        if (this.vel.x < 0) ctx.fillRect(this.size, 2, 7, 3);
        else if (this.vel.x > 0) ctx.fillRect(-6, 2, 7, 3);
        else if (this.bandside == `left`) ctx.fillRect(this.size, 2, 7, 3);
        else if (this.bandside == `right`) ctx.fillRect(-6, 2, 7, 3);
        ctx.restore();

        ctx.fillStyle = `rgb(199, 0, 0)`;
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);

        ctx.fillStyle = `rgb(255, 0, 0)`;
        ctx.fillRect(this.pos.x + 3, this.pos.y + 3, this.size - 6, this.size - 6);

        ctx.fillStyle = `rgb(255, 255, 255)`;
        ctx.fillRect(this.pos.x, this.pos.y + 2, this.size, 3);
    }

    collide(vx, vy) {
        for (let p of platforms) {
            if (this.pos.x < p.pos.x + p.size &&
                this.pos.x + this.size > p.pos.x &&
                this.pos.y < p.pos.y + p.size &&
                this.pos.y + this.size > p.pos.y) {
                if (p.name == `platform`) {
                    if (vx < 0) {
                        this.pos.x = p.pos.x + p.size;

                        if (ldown && this.vel.y >= 2) {
                            if (this.jump) {
                                this.vel.y = -6;
                                this.vel.x = 1;

                                window.setTimeout(() => {
                                    if (ldown) player.vel.x = -2.5;
                                }, 250);
                            } else {
                                this.vel.y = 2;
                                sparksys.center = this.pos;
                                if (frc % 2 === 0)
                                    sparksys.add(-2.5, this.size - 2.5);
                                this.sliding = true;
                                this.slideSide = 1;
                            }
                        }
                    } else if (vx > 0) {
                        this.pos.x = p.pos.x - this.size;
                        
                        if (rdown && this.vel.y >= 2) {
                            if (this.jump) {
                                this.vel.y = -6;
                                this.vel.x = -1;

                                window.setTimeout(() => {
                                    if (rdown) player.vel.x = 2.5;
                                }, 250);
                            } else {
                                this.vel.y = 2;
                                sparksys.center = this.pos;
                                if (frc % 2 === 0)
                                    sparksys.add(this.size - 2.5, this.size - 2.5);
                                this.sliding = true;
                            }
                        }
                    }

                    if (vy < 0) {
                        if (!(
                            p.type == `moving platform` &&
                            this.vel.x == 0 &&
                            this.pos.y + this.size - this.vel.y > p.pos.y &&
                            this.pos.y - this.vel.y < p.pos.y + p.size
                        )) {
                            this.pos.y = p.pos.y + p.size;
                            this.vel.y *= -.1;
                            this.top = true;
                        }

                        if (p.type == `moving platform`) {
                            this.pos.x += p.vel.x;
                            this.pos.y += p.vel.y;
                        }
                    } else if (vy > 0) {
                        if (!(
                            p.type == `moving platform` &&
                            this.vel.x == 0 &&
                            this.pos.y + this.size - this.vel.y > p.pos.y
                        )) {
                            this.pos.y = p.pos.y - this.size;
                            this.vel.y = 0;
                        }

                        if (ldown && this.vel.x == -2) this.vel.x = -3;
                        if (rdown && this.vel.x ==  2) this.vel.x =  3;
                        if (!ldown && this.vel.x ==  1) this.vel.x = 0;
                        if (!rdown && this.vel.x == -1) this.vel.x = 0;

                        if (p.type == `spring board`) {
                            this.vel.y = p.power;
                            blasts.push(new BlastSystem(p.pos.x + p.size / 2, p.pos.y));
                        } else if (p.type == `moving platform`) {
                            this.pos.x += p.vel.x;
                            this.pos.y += p.vel.y;
                        }

                        if (this.vel.x < 0) {
                            friction.center = this.pos;
                            if (frc % 2 === 0)
                                friction.add(0, this.size - 2.5);
                        } else if (this.vel.x > 0) {
                            friction.center = this.pos;
                            if (frc % 2 === 0)
                                friction.add(this.size - 2.5, this.size - 2.5);
                        }
                    }

                    if (p.type == `elimination`) {
                        gameOver();
                        return;
                    }
                } else if (p.name == `door`) {
                    if (ddown && p.open) {
                        if (p.n != 0) {
                            currentLevel = p.n;
                            changeLevel(currentLevel);
                            if (restart) fadeOut(document.getElementById(`gameover-screen`));
                        } else nextLevel();
                    }
                }
            }

            if (p.type == `laser`) {
                if (p.beams[0] !== undefined) {
                    let b = p.beams[0]

                    if (this.pos.x < b.pos.x + b.width &&
                        this.pos.x + this.size > b.pos.x &&
                        this.pos.y < b.pos.y + b.height &&
                        this.pos.y + this.size > b.pos.y) gameOver();
                }
            }
            
            if (p.name == `key`) {
                if (
                    this.pos.x < p.pos.x + p.size + 7.5 &&
                    this.pos.x + this.size > p.pos.x + 7.5 &&
                    this.pos.y < p.pos.y + p.size + 7.5 &&
                    this.pos.y + this.size > p.pos.y + 7.5
                ) {
                    this.keys++;
                    for (let i = platforms.length - 1; i >= 0; i--) {
                        if (platforms[i] === p) platforms.splice(i, 1);
                    }
                    twinkles.push(new TwinkleSystem(p.pos.x + 7.5, p.pos.y + 7.5));
                }
            }
        }
    }
}