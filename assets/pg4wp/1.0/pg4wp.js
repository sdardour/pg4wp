
var path,
    game,
    platforms,
    player,
    cursors;

jQuery(document).ready(function () {

    var w = jQuery("#pg4wp").width(),
        h = w * 3 / 4;

    jQuery("#pg4wp").height(h);

    path = jQuery("#pg4wp").attr("data-path");

    game = new Phaser.Game({
        width: w,
        height: h,
        backgroundColor: "#f9f9f9",
        scene: mainScene,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        parent: "pg4wp"
    });

});

class mainScene {

    preload() {

        // This method is called once at the beginning
        // It will load all the assets, like sprites and sounds

        this.load.image("sky", path + "media/sky.png");
        this.load.image("ground", path + "media/platform.png");
        this.load.spritesheet("sprite",
            path + "media/sprite.png",
            { frameWidth: 32, frameHeight: 48 }
        );

    }

    create() {

        // This method is called once, just after preload()
        // It will initialize our scene, like the positions of the sprites

        this.add.image(320, 240, "sky");

        platforms = this.physics.add.staticGroup();

        platforms.create(320, 460, "ground");

        platforms.create(320 + (640 - 300), 300, "ground");
        platforms.create(320 - (640 - 200), 220, "ground");
        platforms.create(320 + (640 - 100), 140, "ground");

        player = this.physics.add.sprite(48, 480 - 40 - 24 - 48, "sprite");

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("sprite", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "sprite", frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("sprite", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(player, platforms);

        cursors = this.input.keyboard.createCursorKeys();

    }

    update() {

        // This method is called 60 times per second after create() 
        // It will handle all the game"s logic, like movements

        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play("left", true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play("right", true);
        }
        else {
            player.setVelocityX(0);
            player.anims.play("turn");
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }

    }

}
