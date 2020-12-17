let can = document.getElementById(`gameBoard`),
    ctx = can.getContext(`2d`),
    fps = 60,
    frc = 0,
    width,
    height,
    player,
    platforms,
    gravity = .3,
    ldown = false,
    rdown = false,
    udown = false,
    ddown = false,
    currentLevel = 1,
    currentKeyAmount = 1,
    sparksys,
    loop,
    blasts,
    twinkles,
    friction,
    start = true,
    restart = false,
    lightradius = 50,
    lightpos = { x: null, y: null },
    lightrot = 0,
    passed = [false, false, false, false, false],
    finish = false;

let arrows = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image()
];

let fakeKeyAngle = 0,
    inst = false;

arrows[0].src = `assets/arrow-left.png`;
arrows[1].src = `assets/arrow-up.png`;
arrows[2].src = `assets/arrow-right.png`;
arrows[3].src = `assets/arrow-down.png`;
arrows[4].src = `assets/up-jump-arrow.png`;

window.addEventListener(`load`, e => {
    can.width = width = 600;
    can.height = height = 600;

    player = new Player();
    platforms = [];
    changeLevel(currentLevel);

    sparksys = new SparkSystem(width / 2, height / 2);
    blasts = [];
    twinkles = [];
    friction = new FrictionSystem(-100, -100, 0);

    render();

    document.addEventListener(`keydown`, e => {
        if (e.key == `ArrowLeft` || e.key == `a` || e.key == `A`) {
            player.vel.x = -3;
            ldown = true;
        }

        if (e.key == `ArrowUp` || e.key == `w` || e.key == `W`) {
            player.jump = true;
            udown = true;
        }

        if (e.key == `ArrowRight` || e.key == `d` || e.key == `D`) {
            player.vel.x = 3;
            rdown = true;
        }

        if (e.key == `ArrowDown` || e.key == `s` || e.key == `S`) {
            ddown = true;
        }
        
        if (e.key == `r`)
            gameOver();

        if (e.key == ` `) {
            if (start) {
                document.getElementById(`start-btn`).click();
            }
        }
    });

    document.addEventListener(`keyup`, e => {
        if (e.key == `ArrowLeft` || e.key == `a` || e.key == `A`) {
            if (player.vel.x < 0) player.vel.x = 0;
            ldown = false;
        }

        if (e.key == `ArrowUp` || e.key == `w` || e.key == `W`) {
            player.jump = false;
            udown = false;
        }

        if (e.key == `ArrowRight` || e.key == `d` || e.key == `D`) {
            if (player.vel.x > 0) player.vel.x = 0;
            rdown = false;
        }

        if (e.key == `ArrowDown` || e.key == `s` || e.key == `S`) {
            ddown = false;
        }

        if (e.key == `l`) {
            currentLevel = 8;
            changeLevel(currentLevel);
        }
    });
});

document.getElementById(`start-btn`).addEventListener(`click`, e => {
    // document.getElementById(`start-screen`).style.display = `none`;
    fadeOut(document.getElementById(`start-screen`));
    start = false;

    loop = setInterval(gameLoop, 1000 / fps);
});

function gameLoop() {
    frc++;

    update();
    render();
}

function update() {
    for (let p of platforms) {
        if (p.type == `moving platform`) {
            p.update();
        }
    }

    player.update();

    sparksys.update();
    friction.update();
    for (let b of blasts) b.update();
    for (let t of twinkles) t.update();

    document.getElementById(`key`).style.transform = `rotateZ(${fakeKeyAngle}deg)`;
    fakeKeyAngle += 2;

    if (currentLevel == 8) {
        if (Math.random() >= .5) {
            blasts.push(new BlastSystem(Math.random() * width, Math.random() * height));
        } else {
            twinkles.push(new TwinkleSystem(Math.random() * width, Math.random() * height));
        }
    }
}

function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = `rgba(255, 255, 255, .3)`;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = `rgb(0, 0, 0)`;
    ctx.font = `20px coc`;
    if (currentLevel < 5) ctx.fillText(`Level ${currentLevel}`, 260, 100);
    else if (currentLevel == 5 || currentLevel == 7) ctx.fillText(`Final Level`, 225, 100);
    else if (currentLevel == 6) ctx.fillText(`Bonus Level`, 220, 100);

    if (currentLevel == 1) {
        // ctx.fillStyle = `rgb(0, 0, 0)`;
        // ctx.font = `25px coc`;
        // ctx.fillText(String.fromCharCode(0x2190), 210, 565);
        // ctx.fillText(String.fromCharCode(0x2191), 248, 535);
        // ctx.fillText(String.fromCharCode(0x2192), 275, 565);
        // ctx.fillText(String.fromCharCode(0x2193), 37, 55);

        ctx.drawImage(arrows[0], 205, 541, 28, 28);
        ctx.drawImage(arrows[1], 241, 505, 28, 28);
        ctx.drawImage(arrows[2], 277, 541, 28, 28);
        ctx.drawImage(arrows[3], 31, 31, 28, 28);
    } else if (currentLevel == 8) {
        ctx.fillStyle = `rgb(0, 0, 0)`;
        ctx.font = `25px coc`;
        ctx.fillText(`1`, 40, 500);
        ctx.fillText(`2`, 160, 500);
        ctx.fillText(`3`, 275, 500);
        ctx.fillText(`4`, 395, 500);
        ctx.fillText(`5`, 515, 500);
    }

    for (let p of platforms) p.render();

    player.render();
    sparksys.render();
    friction.render();
    for (let b of blasts) b.render();
    for (let t of twinkles) t.render();

    if (currentLevel == 6) {
        if (currentKeyAmount <= player.keys) {
            if (lightradius == 50) {
                lightpos.x = player.pos.x + 7.5;
                lightpos.y = player.pos.y + 7.5;
            }

            if (lightradius < 1000) lightradius += 10;
        }

        lightrot += 2;

        // can.style.backgroundColor = `rgb(0, 0, 0)`;
        ctx.globalCompositeOperation = 'destination-in';

        ctx.fillStyle = `black`;
        ctx.fillRect(0, 0, width, height);

        // ctx.globalCompositeOperation = 'destination-in';

        ctx.beginPath();
        ctx.save();
        ctx.translate(player.pos.x + 7.5, player.pos.y + 7.5);
        ctx.rotate(lightrot * Math.PI / 180);
        ctx.rect(-lightradius, -lightradius, lightradius * 2, lightradius * 2);
        ctx.restore();
        ctx.closePath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgb(0, 0, 0)";
        ctx.fillStyle = `rgb(0, 0, 0)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.globalCompositeOperation = 'source-over';

        ctx.fillStyle = `rgba(0, 0, 0, .4)`;
        ctx.fillRect(0, 0, width, height);
    } else {
        // can.style.backgroundColor = `rgba(0, 0, 0, 0)`;
    }
}

function nextLevel() {
    console.log(`passed level ${currentLevel}`);
    currentLevel++;
    changeLevel(currentLevel);
}

function gameOver() {
    if (currentLevel < 5) {
        // console.log(`Game Over!`);
        // clearInterval(loop);
        // document.getElementById(`gameover-screen`).style.display = `block`;
        // fadeIn(document.getElementById(`gameover-screen`));
        // restart = true;

        player.vel = {
            x: 0,
            y: 0
        };
        player.keys = 0;
        changeLevel(currentLevel);
        restart = false;
        blasts = [];
        twinkles = [];
    } else {
        changeLevel(currentLevel);
        player.keys = 0;
        player.vel = {
            x: 0,
            y: 0
        };
    }

    ldown = false;
    rdown = false;
    udown = false;
    ddown = false;
}

// document.getElementById(`restart-btn`).addEventListener(`click`, e => {
//     // document.getElementById(`gameover-screen`).style.display = `none`;
//     fadeOut(document.getElementById(`gameover-screen`));
//     player.vel = {
//         x: 0,
//         y: 0
//     };
//     player.keys = 0;
//     currentLevel = 1;
//     changeLevel(currentLevel);
//     restart = false;
//     blasts = [];
//     twinkles = [];
// });

function fadeIn(el) {
    el.style.display = `block`;
    for (let o = 0; o < 1; o += .01) {
        window.setTimeout(() => {
            el.style.opacity = o;
        }, 100 * o);
    }
}

function fadeOut(el) {
    let o = 1;
    for (let i = 0; i < 100; i++) {
        window.setTimeout(() => {
            el.style.opacity = o;
            o -= .01;
        }, 1 * i);
    }

    window.setTimeout(() => {
        el.style.display = `none`;
    }, 500);
}

document.getElementById(`open-inst`).addEventListener(`click`, e => {
    if (inst) {
        document.getElementById(`instruction`).style.left = `-440px`;
        document.getElementById(`open-inst`).style.left = `0`;
        inst = false;
    } else {
        document.getElementById(`instruction`).style.left = `0`;
        document.getElementById(`open-inst`).style.left = `440px`;
        inst = true;
    }

    document.getElementById(`open-inst`).blur();
});

document.getElementById(`all-levels`).addEventListener(`click`, e => {
    currentLevel = 8;
    changeLevel(8);
});
