let level;

function setLevel() {
    let x = 0,
        y = 0,
        startPoint = [0, 0];

    platforms = [];
    player.keys = 0;

    for (let row = 0; row < level.length; row++) {
        for (let col = 0; col < level[row].length; col++) {
            let l = level[row][col];
            if (l == `P`) {
                platforms.push(new Platform(x, y));
            } else if (l == `K`) {
                platforms.push(new Key(x, y));
            } else if (l == `D`) {
                platforms.push(new Door(x, y));
            } else if (l == `M`) {
                if (currentLevel == 2) platforms.push(new MovingPlat(x, y, 1, 0, 300));
                else if (currentLevel == 3) platforms.push(new MovingPlat(x, y, -1, 0, 300));
                else if (currentLevel == 5 || currentLevel == 7) platforms.push(new MovingPlat(x, y, -1, 0, 380));
            } else if (l == `C`) {
                if (currentLevel == 5 || currentLevel == 7) platforms.push(new MovingPlat(x, y, 1, 0, 260));
            } else if (l == `G`) {
                if (currentLevel == 5 || currentLevel == 7) platforms.push(new MovingPlat(x, y, 1, 0, 380));
            } else if (l == `S`) {
                if (currentLevel == 2) platforms.push(new SpringBoard(x, y, -15));
                else if (currentLevel == 3) platforms.push(new SpringBoard(x, y, -9));
                else if (currentLevel == 4) platforms.push(new SpringBoard(x, y, -9));
            } else if (l == `T`) {
                platforms.push(new TrapDoor(x, y));
            } else if (l == `L`) {
                platforms.push(new Laser(x, y, -1, 0));
            } else if (l == `R`) {
                platforms.push(new Laser(x, y, 1, 0));
            } else if (l == `N`) {
                platforms.push(new Laser(x, y, 0, 1));
            } else if (l == `E`) {
                platforms.push(new DeathBlock(x, y, 0, 0));
            } else if (l == `Q`) {
                platforms.push(new DeathBlock(x, y, 1, 260));
            } else if (l == `O`) {
                platforms.push(new DeathBlock(x, y, -1, 380));
            } else if (l == `W`) {
                platforms.push(new DeathBlock(x, y, 1, 380));
            } else if (l == `F`) {
                if (currentLevel == 4) platforms.push(new FakeDoor(x, y, true));
                else platforms.push(new FakeDoor(x, y));
            } else if (l == `1`) {
                platforms.push(new Door(x, y, 1));  
            } else if (l == `2`) {
                platforms.push(new Door(x, y, 2));
            } else if (l == `3`) {
                platforms.push(new Door(x, y, 3));
            } else if (l == `4`) {
                platforms.push(new Door(x, y, 4));
            } else if (l == `5`) {
                platforms.push(new Door(x, y, 5));
            } else if (l == `B`) {
                startPoint = [x + 5, y];
            }

            x += 30;
        }

        y += 30;
        x = 0;
    }

    player.pos.x = startPoint[0];
    player.pos.y = startPoint[1];
}

function changeLevel(n) {
    if (n != 1) passed[n - 2] = true;

    if (n == 1) {
        level = [
            `PPPPPPPPPPPPPPPPPPPP`,
            `P                  P`,
            `P                  P`,
            `PD                 P`,
            `PPPPPPP            P`,
            `P                  P`,
            `P      P           P`,
            `P                PPP`,
            `P                 KP`,
            `P                  P`,
            `P         PPPPPP   P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P   PPPP           P`,
            `P                  P`,
            `P                  P`,
            `PP                 P`,
            `PP      B          P`,
            `PPPPPPPPPPPPPPPPPPPP`
        ];
        currentKeyAmount = 1;
    } else if (n == 2) {
        level = [
            `PPPPPPPPPPPPPPPPPPPP`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P             K    P`,
            `P                  P`,
            `PPPP MMMM          P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P             PP  PP`,
            `P            LP    P`,
            `P           PP     P`,
            `P   K       P      P`,
            `P          PP   K  P`,
            `P          P       P`,
            `P          PPPPTPSPP`,
            `P            P     P`,
            `P   S   B    P    DP`,
            `PPPPPPPPPPPPPPPPPPPP`
        ];
        currentKeyAmount = 3;
    } else if (n == 3) {
        level = [
            `PPPPPPPPPPPPPPPPPPPP`,
            `P         N        P`,
            `P                  P`,
            `P                 DP`,
            `P            MMMMPPP`,
            `P                  P`,
            `PR                 P`,
            `P       K         LP`,
            `P       S          P`,
            `PR                 P`,
            `P                 LP`,
            `P           K      P`,
            `PR          S      P`,
            `P                 LP`,
            `P                  P`,
            `PR      K          P`,
            `P       S         LP`,
            `P                  P`,
            `P         B        P`,
            `PPPPPPPPPPPPPPPPPPPP`
        ];
        currentKeyAmount = 3;
    } else if (n == 4) {
        level = [
            `PPPPPPPPPPPPPPPPPPPP`,
            `P        NN        P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P F F F F  F F F F P`,
            `PSPEPEPEP  PEPEPEPSP`,
            `P                  P`,
            `P                  P`,
            `P F F F F  F F D F P`,
            `P PEPEPEPSSPEPEPEP P`,
            `P        NN        P`,
            `P                  P`,
            `P F F F F  F F F F P`,
            `PSPEPEPEP  PEPEPEPSP`,
            `P                  P`,
            `P            B     P`,
            `P F F F F  F F F F P`,
            `PEPEPEPEPSSPEPEPEPEP`
        ];
        currentKeyAmount = 0;
    } else if (n == 5) {
        level = [
            `PPPPPPPPPPPPPPPPPPPP`,
            `P    PNNNNNNNNP    P`,
            `P    P        P    P`,
            `P F  P        P  D P`,
            `PPPPPP        PPTPPP`,
            `PNNN          N  P P`,
            `P                  P`,
            `P              MOMKP`,
            `P  K               P`,
            `P                  P`,
            `P GWG              P`,
            `P               K  P`,
            `P                  P`,
            `P              MOM P`,
            `P  K               P`,
            `P              PPPPP`,
            `P CQC          P   P`,
            `P              P   P`,
            `P        B     P  FP`,
            `PEEEEEEEPPEEEEEPPPPP`
        ];
        currentKeyAmount = 4;
    } else if (n == 6) {
        level = [
            `                    `,
            `                    `,
            `                    `,
            `                    `,
            `PPPPPPPPPPPPPPPPPPPP`,
            `P      P KP      BPP`,
            `P  PPP P PP    P  PP`,
            `PP P P P  P PPPP  PP`,
            `PK P P PP P    PP PP`,
            `PPPP P    PPPP KP PP`,
            `P    PPP       PP  P`,
            `PD     PPPPPPPPPPP P`,
            `PPPPPP PK P      P P`,
            `PK     P  P P PPKP P`,
            `PPP PPPPP   P  PPP P`,
            `P         PPPP     P`,
            `PPPPPPPPPPPPPPPPPPPP`,
            `                    `,
            `                    `,
            `                    `
        ];
        currentKeyAmount = 6;
    } else if (n == 7) {
        level = [
            `PPPPPPPPPPPPPPPPPPPP`,
            `P    PNNNNNNNNP    P`,
            `P B  P        P    P`,
            `P F  P        P  F P`,
            `PPPPTP        PPPPPP`,
            `PNNN          N  P P`,
            `P              K   P`,
            `P              MOM P`,
            `P                  P`,
            `P          K       P`,
            `P GWG              P`,
            `P                  P`,
            `P                  P`,
            `P  K           MOM P`,
            `P                  P`,
            `P              PPTPP`,
            `P CQC          P   P`,
            `P              P   P`,
            `P        K     P  DP`,
            `PEEEEEEEPPEEEEEPPPPP`
        ];
        currentKeyAmount = 4;
    } else if (n == 8) {
        let fi = true;
        for (let p of passed) {
            if (!p) fi = false;
        }
        if (fi && !finish) {
            fadeIn(document.getElementById(`gameover-screen`));
            window.setTimeout(() => fadeOut(document.getElementById(`gameover-screen`)), 2000);
            finish = true;
        }
        level = [
            `PPPPPPPPPPPPPPPPPPPP`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P     B            P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P                  P`,
            `P1   2   3   4   5 P`,
            `PPPPPPPPPPPPPPPPPPPP`
        ];
        currentKeyAmount = 0;
    }

    setLevel();
}