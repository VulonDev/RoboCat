class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2Scene");
    }

    preload() {
    }

    create() {
        // set world and camera bounds
        this.physics.world.setBounds(0, 0, game.config.width*2, game.config.height*5);
        this.cameras.main.setBounds(0, 0, game.config.width*2, game.config.height*5);

        // level 2 music
        // this.music = this.sound.add('lvl1_music', { loop: true, volume: 0.5 });
        // this.music.play();

        // setting the background color
        this.cameras.main.setBackgroundColor('#808080');

        //this.background = this.add.sprite(0, 0, 'lvl1_background').setOrigin(0, 0);
        //this.background.setScrollFactor(0);

        // addin RoboCat to the scene and make it so they can't go OoB
        this.cat = new RoboCat(this, 10, game.config.height - 44, 'robo_atlas', 'robo_idle_r_0001').setOrigin(0,0);
        this.cat.setCollideWorldBounds(true);
        //makes it so the cat goes in front of controls text
        this.cat.setDepth(1);

        //cat has propeller for lvl 2
        hasPropeller = true;

        // this SHOULD make it so that the camera follows RoboCat as the player moves (this wont do the whole room switching thing, but
        // we can add that later, this is just temporary)
        this.cameras.main.startFollow(this.cat);

        // this sets up the ground (again, this will change when the obstacles are implemented and we have an actual tile
        // sheet to pull these from)
        this.ground = this.add.group();
        this.tileSize = 21;
        for(let i = 0; i < (game.config.width*2 + game.config.width/4); i += this.tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - this.tileSize, 'platform_tile', 0).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // sets collider between RoboCat and the ground
        this.physics.add.collider(this.cat, this.ground);

        //key inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }


    update() {
         // check if player falls through floor, telports them back to begining if they do
         if (this.cat.y > (game.config.height + this.cat.height)) {
            this.cat.setVelocity(0);
            this.cat.x = 10;
            this.cat.y = game.config.height - 60;
        } 

        // update cat sprite
        this.cat.update();
    }
}