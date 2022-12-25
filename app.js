let acceleration = 0.1;
let jumping = false;
let vy = 0;
let bunnyDirection = "right";

const app = new PIXI.Application({
    width: window.innerWidth - 25,
    height: window.innerHeight - 25,
    backgroundColor: 0x1099bb,
    scaleMode: PIXI.SCALE_MODES.NEAREST,

});

document.body.appendChild(app.view);

PIXI.Loader.shared.add('bg', 'bg.png').load((loader, resources) => {
    const bg = new PIXI.Sprite(resources.bg.texture);

    bg.x = 0;
    bg.y = 0;
    bg.width = app.screen.width;
    bg.height = app.screen.height;

    //dont stretch, cut off
    bg.scaleMode = PIXI.SCALE_MODES.NEAREST;

    app.stage.addChild(bg);

        PIXI.Loader.shared.add('skylt', 'skylt.png').load((loader, resources) => {
            const skylt = new PIXI.Sprite(resources.skylt.texture);

            skylt.anchor.set(0.5);
            skylt.x = app.screen.width * 0.18;
            skylt.y = app.screen.height * 1.8 / 3;
            skylt.width = window.innerWidth * 0.15;
            skylt.height = window.innerHeight * 0.3;

            skylt.interactive = true;
            skylt.buttonMode = true;

            app.stage.addChild(skylt);

            skylt.on('pointerdown', function() {
                //redirect to linkedin.com/in/aronfr
                window.location.href = "https://www.linkedin.com/in/aronfr/";
            });



    PIXI.Loader.shared.add('bunny', 'bunny.png').load((loader, resources) => {
        const bunny = new PIXI.Sprite(resources.bunny.texture);

        bunny.anchor.set(0.5);
        bunny.x = app.screen.width / 2;
        bunny.y = 2*app.screen.height/3 - 25;
        bunny.width = window.innerWidth * 0.1;
        bunny.height = window.innerHeight * 0.22

        app.stage.addChild(bunny);

        window.addEventListener('resize', () => {
            // Update the app's dimensions to match the window's dimensions
            app.renderer.resize(window.innerWidth -25 , window.innerHeight-25);
            bunny.x = window.innerWidth/2;
        });
        PIXI.Loader.shared.add('ground', 'ground.png').load((loader, resources) => {
            const ground = new PIXI.Sprite(resources.ground.texture);

            ground.x = 0;
            ground.y = 0;
            ground.width = app.screen.width;
            ground.height = app.screen.height;

            app.stage.addChild(ground);

            app.ticker.add((delta) => {
                applyGravity(delta, bunny, bunnyDirection);

                if (Math.random() > 0.95) {
                    jump(bunny)
                }

                if (bunny.x < 0) {
                    changeDirection(bunny, "right");
                }
                if (bunny.x > app.screen.width) {
                    changeDirection(bunny, "left");
                }
            });
        });
    });
});
});


function jump(bunny) {
    if (!jumping) {
        if (Math.random() > 0.7) {
            changeDirection(bunny, bunnyDirection === "right" ? "left" : "right");
        }
        vy = -3;
        jumping = true;
    }
}

function applyGravity(delta, bunny, direction) {
    vy += acceleration * delta;

    bunny.y += vy;

    if (bunny.y > 2*app.screen.height/3 - 25) {
        vy = 0;
        bunny.y = 2*app.screen.height/3 - 25;
        jumping = false;
    }

    if (direction === "left" && jumping) {
        bunny.x -= 1;
    } else if (direction === "right" && jumping) {
        bunny.x += 1;
    }

}

function changeDirection(bunny, direction) {
    const timer = setTimeout(() => {
       if (!jumping) {
           bunnyDirection = direction;
           bunny.scale.x *= -1;
       }

    }, 1000);
}