class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2Scene");
    }

    preload() {
        // level 2 music
        this.load.audio('lvl2_music', 'assets/sound/lvl2_music.mp3');
    }

    create() {
        // set global variables
        hasPropeller = false;
        hasWallJump = false;

        // variables to determine if lost cat has been found and/or are being spoken to
        cat2Found = false;
        cat2Speaking = false;
        this.dialougeCount = 0;

        // set world and camera bounds
        this.physics.world.setBounds(0, 0, game.config.width*2, game.config.height*5);
        this.cameras.main.setBounds(0, 0, game.config.width*2, game.config.height*5);

        // setting the background color
        this.cameras.main.setBackgroundColor('#808080');

        //main camera fade-in
        this.cameras.main.fadeIn(1000);

        // define level 2 music
        this.music = this.sound.add('lvl2_music', { loop: true, volume: 0.5 });
        this.music.play();

        // setting level background image
        this.background = this.add.sprite(0, 0, 'lvl2_background').setOrigin(0, 0);

        // addin RoboCat to the scene and make it so they can't go OoB
        this.cat = new RoboCat(this, 10, (game.config.height*5)-44, 'robo_hitbox').setOrigin(0,0);
        this.cat.setCollideWorldBounds(true);
        //makes it so the cat goes in front of controls text
        this.cat.setDepth(1);

        // makes it so that the camera follows RoboCat as the player moves
        this.cameras.main.startFollow(this.cat);

        const map = this.make.tilemap({ key: 'lvl2_tilemap' });
        const tileset = map.addTilesetImage('lvl2_tiles', 'lvl2_tiles');
        // creating tilemap layers
        this.groundLayer = map.createLayer('Ground', tileset, 0, 0);
        this.spikesLayer = map.createLayer('Spikes', tileset, 0, 0);
        this.leavesLayer = map.createLayer('Leaves', tileset, 0, 0);
        this.leavesLayer.setDepth(2);
        // enabling collisons on tilemap layers
        this.groundLayer.setCollisionByExclusion([-1]);
        this.spikesLayer.setCollisionByExclusion([-1]);
        // enabling collisions with player
        this.physics.add.collider(this.cat, this.groundLayer);
        this.physics.add.collider(this.cat, this.spikesLayer, () => {
            this.cat.setVelocity(0);
            this.cameras.main.shake(40);
            this.cat.resetPosition(10, game.config.height*5 - 60, false);
        });

        // add propellor to level 2 map
        this.cat_tail = this.physics.add.staticSprite((game.config.width*2)-(game.config.width/2), game.config.height*5 - 25, 'cat_tail');
        this.cat_tail.setDepth(1);
        // add collision between cat and tail sprite
        this.physics.add.collider(this.cat, this.cat_tail, function(player, tail) {
            hasPropeller = true;
            tail.destroy();
        });

        this.lost_cat = this.physics.add.staticSprite(770, 118, 'missing_cat_2');
        this.lost_cat.setDepth(1);

        this.sign = this.physics.add.staticSprite(770, 65, 'arrow');
        this.sign.setDepth(1);
        // update this later to display text before making the cat disappear
        this.physics.add.collider(this.cat, this.lost_cat, function(player, cat) {
            cat2Speaking = true;
        });

        let textConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '16px',
            color: '#ffffff',
            stroke: 'AAAAAA',
            strokeThickness: 5,
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        
        // tutorial text for propellor
        this.controlsText = this.add.text((game.config.width*2)-(game.config.width/2)-25, (game.config.height*5)-(game.config.height/2), 'Press ↑ while jumping to double jump.\nContinue holding ↑ to slow fall.', textConfig).setOrigin(0.5);
        this.controlsText.setVisible(false);

        // add and hide cat dialouge text
        textConfig.fontSize = '10px';
        this.dialougePrompt = this.add.text((game.config.width*2)-(game.config.width/2), 20, "Press SPACE to Continue...", textConfig).setOrigin(0.5);
        this.dialougePrompt.setDepth(3);
        this.dialougePrompt.setVisible(false);
        textConfig.fontSize = '15px';
        this.dialougeText = this.add.text((game.config.width*2)-(game.config.width/2), this.lost_cat.y-50, "Wait, is that...?", textConfig).setOrigin(0.5);
        this.dialougeText.setVisible(false);
        this.dialougeText.setDepth(2);

        //key inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

    }

    update() {

        // update world bounds when lost cat is found
        if (cat2Found) {
            this.physics.world.setBounds(0, 0, game.config.width*3, game.config.height*5);
        }

        // check if player walks through to the end of the scene, moves them on to level 3 if so
        if (this.cat.x > game.config.width*2 + this.cat.width) {
            propellerSFX.stop();
            explosionSFX.stop();
            this.music.stop();
            this.scene.stop();
            this.cameras.main.fadeOut(1000);
            this.scene.start('Level2End');
        }

        // returns player to menu if 1 is pressed
        if (Phaser.Input.Keyboard.JustDown(key1)) {
            propellerSFX.stop();
            explosionSFX.stop();
            this.music.stop();
            this.scene.stop();
            this.cameras.main.fadeOut(1000);
            this.scene.start('menuScene');
        }

        // displays tutorial text if player has the tail
        if (hasPropeller) {
            this.controlsText.setVisible(true);
        }

        // update cat sprite (only while not speaking to cat)
        if (!cat2Speaking) {
            this.cat.update();
        }
        else {
            // set cat position relative to lost cat sprite
            this.cat.setAccelerationX(0);
            if (this.cat.lastDirection == 'r') {
                if (this.cat.y < (this.lost_cat.y + this.lost_cat.height/2)) {
                    this.cat.y = 105;
                    this.cat.x = this.lost_cat.x - this.lost_cat.width*2;
                }
                this.cat.anims.play('robo_idle_r');
            }
            else if (this.cat.lastDirection == 'l') {
                if (this.cat.y < (this.lost_cat.y + this.lost_cat.height/2)) {
                    this.cat.y = 105;
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
                this.dialougeText.text = "RoboCat! Thank goodness you're here!";
            }
            if (this.dialougeCount == 2) {
                this.dialougeText.text = "I got stuck up here and couldn't get down!";
            }
            if (this.dialougeCount == 3) {
                this.dialougeText.text = "I'm glad you were able to find me!";
            }
            if (this.dialougeCount == 4) {
                this.dialougeText.text = "I guess I can head on home now. See you later!";
            }
            if (this.dialougeCount == 5) {
                cat2Found = true;
                cat2Speaking = false;
                this.lost_cat.destroy();
                this.dialougePrompt.setVisible(false);
                this.dialougeText.setVisible(false);
            }
        }
    }
}