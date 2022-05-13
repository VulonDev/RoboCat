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

        // Level 1 music (commented out for now)
        // this.music = this.sound.add('lvl1_music', { loop: true, volume: 0.5 });
        // this.music.play();

        // setting the background color (this wont be necessary when we have an actual background image)
        this.cameras.main.setBackgroundColor('#808080');

        // addin RoboCat to the scene and make it so they can't go OoB
        this.cat = new RoboCat(this, 10, game.config.height - 44, 'cat', 0).setOrigin(0,0);
        this.cat.setCollideWorldBounds(true);
        //makes it so the cat goes in front of controls text
        this.cat.setDepth(1);
        

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

        //creates 4 platforms (i just put them in same group as ground which i think is fine)
        for(let i = game.config.width / 4; i < (game.config.width); i += game.config.width / 4) {
            for (let j = 2; j < 4; j++) {
                let groundTile = this.physics.add.sprite(i, game.config.height - (this.tileSize*j), 'platform_tile', 0).setOrigin(0);
                groundTile.body.immovable = true;
                groundTile.body.allowGravity = false;
                this.ground.add(groundTile);
            }
        }

        //creates some spikes
        this.spikeGroup = this.add.group();
        for(let i = (game.config.width / 4) + game.config.width; i < game.config.width * 2; i += game.config.width / 4) {
            let spikeTile = this.physics.add.sprite(i, game.config.height - (this.tileSize), 'spikes', 0).setOrigin(1);
            spikeTile.body.immovable = true;
            spikeTile.body.allowGravity = false;
            this.spikeGroup.add(spikeTile);    
        }

        //four more platforms to keep the spikes company
        for(let i = game.config.width + (game.config.width / 4); i < (game.config.width*2); i += game.config.width / 4) {
            for (let j = 2; j < 4; j++) {
                let groundTile = this.physics.add.sprite(i, game.config.height - (this.tileSize*j), 'platform_tile', 0).setOrigin(0);
                groundTile.body.immovable = true;
                groundTile.body.allowGravity = false;
                this.ground.add(groundTile);
            }
        }


        // sets collider between RoboCat and the ground
        this.physics.add.collider(this.cat, this.ground);

        //checks if player touches spikes, teleports them back to beginning if they do
        this.physics.add.collider(this.cat, this.spikeGroup, function(player) {
            player.x = 10;
            player.y = game.config.height - 44;
        });

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
        this.controlsText = this.add.text(game.config.width/2, game.config.height / 2, 'left/right to move\nup to jump', textConfig).setOrigin(0.5);

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