class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
    }

    create() {

        // set bounds of world and camera (this will be changed)
        this.physics.world.setBounds(0, 0, game.config.width*2, game.config.height);
        this.cameras.main.setBounds(0, 0, game.config.width*2, game.config.height);

        // setting the background color (this wont be necessary when we have an actual background image)
        this.cameras.main.setBackgroundColor('#808080');

        // addin RoboCat to the scene
        this.cat = new RoboCat(this, 10, game.config.height - 41, 'cat', 0).setOrigin(0,0);

        // this SHOULD make it so that the camera follows RoboCat as the player moves (this wont do the whole room switching thing, but
        // we can add that later, this is just temporary)
        this.cameras.main.startFollow(this.cat);

        // this sets up the ground (again, this will change when the obstacles are implimented and we have an actual tile
        // sheet to pull these from)
        this.ground = this.add.group();
        this.tileSize = 21;
        for(let i = 0; i < (game.config.width*2); i += this.tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - this.tileSize, 'platform_tile', 0).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // sets collider between RoboCat and the ground
        this.physics.add.collider(this.cat, this.ground);

        let textConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '18px',
            color: '#888888',
            backgroundColor: '#DDDDDD',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.add.text(game.config.width/2, game.config.height / 2, 'PLAY SCENE', textConfig).setOrigin(0.5);
    }

    update() {
    }
    
}