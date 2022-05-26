class Level3 extends Phaser.Scene {
    constructor() {
        super("Level3Scene");
    }

    preload() {
        // level 3 music
        this.load.audio('lvl3_music', 'assets/sound/lvl3_music.mp3');
    }

    create() {

        hasPropeller = true; // this is set for debugging purposes (make sure to remove)

        // set world and camera bounds (the world bounds are greater than the camera so that the player can move off to
        // the right end of the screen to progress to level 3)
        this.physics.world.setBounds(0, 0, game.config.width*8, game.config.height*3);
        this.cameras.main.setBounds(0, 0, game.config.width*7, game.config.height*3);
        // setting the background color
        this.cameras.main.setBackgroundColor('#808080');

        // Level 3 music
        this.music = this.sound.add('lvl3_music', { loop: true, volume: 0.5 });
        this.music.play();

        // addin RoboCat to the scene and make it so they can't go OoB
        this.cat = new RoboCat(this, 10, game.config.height*3 - 44, 'robo_atlas', 'robo_idle_r_0001').setOrigin(0,0);
        this.cat.setCollideWorldBounds(true);
        //makes it so the cat goes in front of controls text
        this.cat.setDepth(1);

        // makes it so that the camera follows RoboCat as the player moves
        this.cameras.main.startFollow(this.cat);

        const map = this.make.tilemap({ key: 'lvl3_tilemap' });
        const tileset = map.addTilesetImage('lvl3_tiles', 'lvl3_tiles');
        // creating tilemap layers
        this.backLayer = map.createLayer('Decorative (Back)', tileset, 0, 0);
        this.collisionLayer = map.createLayer('Collision', tileset, 0, 0);
        this.spikesLayer = map.createLayer('Spikes', tileset, 0, 0);
        this.frontLayer = map.createLayer('Decorative (Front)', tileset, 0, 0);
        this.frontLayer.setDepth(2);
        // enabling collisons on tilemap layers
        this.collisionLayer.setCollisionByExclusion([-1]);
        this.spikesLayer.setCollisionByExclusion([-1]);
        // enabling collisions with player
        this.physics.add.collider(this.cat, this.collisionLayer);
        this.physics.add.collider(this.cat, this.spikesLayer, () =>  {
            this.cat.setVelocity(0);
            this.cameras.main.shake(40);
            this.cat.resetPosition(10, game.config.height*3 - 60, false);
        });

        //key inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        
    }

    update() {
        this.cat.update();
    }
}