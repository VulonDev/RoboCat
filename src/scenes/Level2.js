class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2Scene");
    }

    preload() {
        // level 2 music
        this.load.audio('lvl2_music', 'assets/sound/lvl2_music.mp3');
    }

    create() {

        // set world and camera bounds (the world bounds are greater than the camera so that the player can move off to
        // the right end of the screen to progress to level 3)
        this.physics.world.setBounds(0, 0, game.config.width*3, game.config.height*5);
        this.cameras.main.setBounds(0, 0, game.config.width*2, game.config.height*5);
        // setting the background color
        this.cameras.main.setBackgroundColor('#808080');

        // define level 2 music
        this.music = this.sound.add('lvl2_music', { loop: true, volume: 0.5 });
        this.music.play();

        // setting level background image
        this.background = this.add.sprite(0, 0, 'lvl2_background').setOrigin(0, 0);

        // addin RoboCat to the scene and make it so they can't go OoB
        this.cat = new RoboCat(this, 10, game.config.height*5 - 44, 'robo_atlas', 'robo_idle_r_0001').setOrigin(0,0);
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
        this.physics.add.collider(this.cat, this.spikesLayer, function(player) {
            player.setVelocity(0);
            player.resetPosition(10, game.config.height*5 - 60, false);
        });

        // add propellor to level 2 map
        this.cat_tail = this.physics.add.staticSprite((game.config.width*2)-(game.config.width/2), game.config.height*5 - 25, 'cat_tail');
        this.cat_tail.setDepth(1);
        // add collision between cat and tail sprite
        this.physics.add.collider(this.cat, this.cat_tail, function(player, tail) {
            hasPropeller = true;
            tail.destroy();
        });

        let textConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#AAAAAA',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        
        // tutorial text for propellor
        this.controlsText = this.add.text((game.config.width*2)-(game.config.width/2)-25, (game.config.height*5)-(game.config.height/2), 'up to double jump\nhold up to slow fall', textConfig).setOrigin(0.5);
        this.controlsText.setVisible(false);

        //key inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    update() {
        // check if player walks through to the end of the scene, moves them on to level 2 if so
        if (this.cat.x > game.config.width*2 + this.cat.width) {
            propellerSFX.stop();
            explosionSFX.stop();
            this.music.stop();
            this.scene.switch('Level3Scene');
        }

        // displays tutorial text if player has the tail
        if (hasPropeller) {
            this.controlsText.setVisible(true);
        }

        this.cat.update();
    }
}