class Level3 extends Phaser.Scene {
    constructor() {
        super("Level3Scene");
    }

    preload() {
        // level 3 music
        this.load.audio('lvl3_music', 'assets/sound/lvl3_music.mp3');
    }

    create() {

        // variables to determine if lost cat has been found and/or are being spoken to
        cat3Found = false;
        cat3Speaking = false;
        this.dialougeCount = 0;

        // initial respawn position
        respawnX = 60;
        respawnY = game.config.height*3 - 44;

        hasPropeller = true; // this is set for debugging purposes (make sure to remove)

        // set world and camera bounds (the world bounds are greater than the camera so that the player can move off to
        // the right end of the screen to progress to level 3)
        this.physics.world.setBounds(0, 0, game.config.width*7, game.config.height*3);
        this.cameras.main.setBounds(0, 0, game.config.width*7, game.config.height*3);
        // setting the background color
        this.cameras.main.setBackgroundColor('#808080');

        // Level 3 music
        this.music = this.sound.add('lvl3_music', { loop: true, volume: 0.5 });
        this.music.play();

        // addin RoboCat to the scene and make it so they can't go OoB
        this.cat = new RoboCat(this, 60, game.config.height*3 - 44, 'robo_hitbox').setOrigin(0,0);
        this.cat.setCollideWorldBounds(true);
        //makes it so the cat goes in front of controls text
        this.cat.setDepth(1);

        // makes it so that the camera follows RoboCat as the player moves
        this.cameras.main.startFollow(this.cat);

        this.platformGroup = this.physics.add.staticGroup();

        const map = this.make.tilemap({ key: 'lvl3_tilemap' });
        const tileset = map.addTilesetImage('lvl3_tiles', 'lvl3_tiles');
        // creating tilemap layers
        this.backLayer = map.createLayer('Decorative (Back)', tileset, 0, 0);
        this.collisionLayer = map.createLayer('Collision', tileset, 0, 0);
        this.spikesLayer = map.createLayer('Spikes', tileset, 0, 0);
        this.windowsLayer = map.createLayer('Windows', tileset, 0, 0);
        this.frontLayer = map.createLayer('Decorative (Front)', tileset, 0, 0);
        this.frontLayer.setDepth(2);

        this.collisionLayer.forEachTile(tile => {
            console.log(tile.index)
            if (tile.index == 37) {
                var x = tile.getCenterX();
                var y = tile.getCenterY();
                const platform = this.platformGroup.create(x, y-9, 'balcony');
                this.collisionLayer.removeTileAt(tile.x, tile.y);
            }
        });


        // enabling collisons on tilemap layers
        this.collisionLayer.setCollisionByExclusion([-1]);
        this.spikesLayer.setCollisionByExclusion([-1]);
        // enabling collisions with player
        this.physics.add.collider(this.cat, this.platformGroup);
        this.physics.add.collider(this.cat, this.collisionLayer);
        this.physics.add.collider(this.cat, this.spikesLayer, () =>  {
            this.cat.setVelocity(0);
            this.cameras.main.shake(40);
            this.cat.resetPosition(respawnX, respawnY, false);
        });

        // add propellor to level 2 map
        this.cat_claws = this.physics.add.staticSprite((game.config.width)-250, game.config.height*3 - 25, 'cat_claws');
        this.cat_claws.setDepth(1);
        // add collision between cat and tail sprite
        this.physics.add.collider(this.cat, this.cat_claws, function(player, claws) {
            hasWallJump = true;
            claws.destroy();
        });

        this.lost_cat = this.physics.add.staticSprite(2800, 728, 'missing_cat_3');
        this.lost_cat.setDepth(1);
        // update this later to display text before making the cat disappear
        this.physics.add.collider(this.cat, this.lost_cat, function(player, cat) {
            cat3Speaking = true;
        });

        let textConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '16px',
            color: '#ffffff',
            backgroundColor: '#AAAAAA',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        
        // tutorial text for wall jump
        this.controlsText = this.add.text((game.config.width)-(game.config.width/2), (game.config.height*2)+50, 'Hold ← or → to wall cling.\nPress ↑ while clinging to wall jump.\nRelease ← or → after wall jump to \nmore easily switch directions.', textConfig).setOrigin(0.5);
        this.controlsText.setVisible(false);

        // add and hide cat dialouge text
        textConfig.fontSize = '10px';
        this.dialougePrompt = this.add.text((game.config.width*7)-(game.config.width/2), (game.config.height*2)+20, "Press SPACE to Continue...", textConfig).setOrigin(0.5);
        this.dialougePrompt.setDepth(3);
        this.dialougePrompt.setVisible(false);
        textConfig.fontSize = '15px';
        this.dialougeText = this.add.text((game.config.width*7)-(game.config.width/2), this.lost_cat.y-50, "Oh my gosh! Its RoboCat!", textConfig).setOrigin(0.5);
        this.dialougeText.setVisible(false);
        this.dialougeText.setDepth(2);

        //key inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        
    }

    update() {

        // update world bounds when lost cat is found
        if (cat3Found) {
            this.physics.world.setBounds(0, 0, game.config.width*8, game.config.height*3);
        }

        // check if player walks through to the end of the scene, moves them on to level 4 if so
        if (this.cat.x > game.config.width*7 + this.cat.width) {
            propellerSFX.stop();
            explosionSFX.stop();
            this.music.stop();
            this.scene.switch('Level4Scene');
        }

        if (hasWallJump) {
            this.controlsText.setVisible(true);
        }

        // update cat sprite (only while not speaking to cat)
        if (!cat3Speaking) {
            this.cat.update();
        }
        else {
            // set cat position relative to lost cat sprite
            this.cat.setAccelerationX(0);
            if (this.cat.lastDirection == 'r') {
                if (this.cat.y < (this.lost_cat.y + this.lost_cat.height/2)) {
                    this.cat.y = 714;
                    this.cat.x = this.lost_cat.x - this.lost_cat.width*2;
                }
                this.cat.anims.play('robo_idle_r');
            }
            else if (this.cat.lastDirection == 'l') {
                if (this.cat.y < (this.lost_cat.y + this.lost_cat.height/2)) {
                    this.cat.y = 714;
                    this.cat.x = this.lost_cat.x + this.lost_cat.width/2;
                }
                this.cat.anims.play('robo_idle_l');
            }

            // check for user input to advance dialouge
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.dialougeCount += 1;
            }
            this.dialougePrompt.setVisible(true);
            this.dialougeText.setVisible(true);

            // display/change dialouge
            if (this.dialougeCount == 1) {
                this.dialougeText.text = "I'm impressed you were able to find me in here!";
            }
            if (this.dialougeCount == 2) {
                this.dialougeText.text = "I got so lost in here and I couldn't figure out how to leave!";
            }
            if (this.dialougeCount == 3) {
                this.dialougeText.text = "And you were able to find me! Thats our RoboCat for you!";
            }
            if (this.dialougeCount == 4) {
                this.dialougeText.text = "Thanks so much for saving me! Now I can go home!";
            }
            if (this.dialougeCount == 5) {
                this.dialougeText.text = "I hope I can meet you again soon! Bye now!";
            }
            if (this.dialougeCount == 6) {
                cat3Found = true;
                cat3Speaking = false;
                this.lost_cat.destroy();
                this.dialougePrompt.setVisible(false);
                this.dialougeText.setVisible(false);
            }
        }

        // change spawn position
        if (this.cat.x > 775) {
            if (respawnX <= 720) {
                respawnX = 720;
                respawnY = 740;
            }
        }
        if (this.cat.x > 1610) {
            if (respawnX <= 1650) {
                respawnX = 1650;
                respawnY = game.config.height*3 - 44;
            }
        }
        if (this.cat.x > 2225) {
            if (respawnX <= 2300) {
                respawnX = 2300;
                respawnY = 420;
            }
        }
    }
}