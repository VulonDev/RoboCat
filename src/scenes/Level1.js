class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1Scene");
    }

    preload() {
    }

    create() {

        // set bounds of world and camera
        this.physics.world.setBounds(0, 0, game.config.width*7, game.config.height+100);
        this.cameras.main.setBounds(0, 0, game.config.width*7, game.config.height);

        // Level 1 music (commented out for now)
        this.music = this.sound.add('lvl1_music', { loop: true, volume: 0.5 });
        this.music.play();

        // setting the background color
        this.cameras.main.setBackgroundColor('#808080');

        this.background = this.add.sprite(0, 0, 'lvl1_background').setOrigin(0, 0);
        this.background.setScrollFactor(0);

        // addin RoboCat to the scene and make it so they can't go OoB
        this.cat = new RoboCat(this, 10, game.config.height - 44, 'robo_atlas', 'robo_idle_r_0001').setOrigin(0,0);
        this.cat.setCollideWorldBounds(true);
        //makes it so the cat goes in front of controls text
        this.cat.setDepth(1);

        //cat doesn't have propeller for lvl 1 SO CHANGE LATER!!!
        //
        //!!!!!!!!!!!!!!!!!!!
        hasPropeller = true;
        

        // this SHOULD make it so that the camera follows RoboCat as the player moves (this wont do the whole room switching thing, but
        // we can add that later, this is just temporary)
        this.cameras.main.startFollow(this.cat);

        // adding tilemap to game
        const map = this.make.tilemap({ key: 'lvl1_tilemap' });
        const tileset = map.addTilesetImage('lvl1_tiles', 'lvl1_tiles');
        // creating tilemap layers
        this.groundLayer = map.createStaticLayer('Ground', tileset, 0, 0);
        this.spikesLayer = map.createStaticLayer('Spikes', tileset, 0, 0);
        // enabling collisons on tilemap layers
        this.groundLayer.setCollisionByExclusion([-1]);
        this.spikesLayer.setCollisionByExclusion([-1]);
        // enabling collisions with player
        this.physics.add.collider(this.cat, this.groundLayer);
        this.physics.add.collider(this.cat, this.spikesLayer, function(player) {
            player.setVelocity(0);
            player.x = 10;
            player.y = game.config.height - 60;
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
        this.controlsText = this.add.text(game.config.width/2, game.config.height / 2, 'left/right to move\nup to jump', textConfig).setOrigin(0.5);
        this.catText = this.add.text(game.config.width * 6.5, game.config.height - 40, 'missing cat ;3 *meow*', textConfig).setOrigin(0.5);
        this.prototypeText = this.add.text(game.config.width * 6.5, game.config.height / 2, 'END OF PROTOTYPE', textConfig).setOrigin(0.5);

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