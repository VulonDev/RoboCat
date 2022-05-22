class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2Scene");
    }

    preload() {
    }

    create() {

        console.log("it lvl 2");
        // set world and camera bounds (the world bounds are greater than the camera so that the player can move off to
        // the right end of the screen to progress to level 3)
        this.physics.world.setBounds(0, 0, game.config.width*3, game.config.height*5);
        this.cameras.main.setBounds(0, 0, game.config.width*2, game.config.height*5);
        // setting the background color
        this.cameras.main.setBackgroundColor('#808080');

        // level 2 music
        // this.music = this.sound.add('lvl1_music', { loop: true, volume: 0.5 });
        // this.music.play();

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
        this.groundLayer = map.createStaticLayer('Ground', tileset, 0, 0);
        this.spikesLayer = map.createStaticLayer('Spikes', tileset, 0, 0);
        this.leavesLayer = map.createStaticLayer('Leaves', tileset, 0, 0);
        // enabling collisons on tilemap layers
        this.groundLayer.setCollisionByExclusion([-1]);
        this.spikesLayer.setCollisionByExclusion([-1]);
        // enabling collisions with player
        this.physics.add.collider(this.cat, this.groundLayer);
        this.physics.add.collider(this.cat, this.spikesLayer, function(player) {
            player.setVelocity(0);
            player.resetPosition(10, game.config.height*5 - 60, false);
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