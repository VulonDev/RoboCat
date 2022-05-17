class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1Scene");
    }

    preload() {
    }

    create() {

        // set bounds of world and camera (this will be changed)
        this.physics.world.setBounds(0, 0, game.config.width*7, game.config.height+100);
        this.cameras.main.setBounds(0, 0, game.config.width*7, game.config.height);

        // Level 1 music (commented out for now)
        this.music = this.sound.add('lvl1_music', { loop: true, volume: 0.5 });
        this.music.play();

        // setting the background color (this wont be necessary when we have an actual background image)
        this.cameras.main.setBackgroundColor('#808080');

        this.background = this.add.sprite(0, 0, 'lvl1_background').setOrigin(0, 0);
        this.background.setScrollFactor(0);

        // addin RoboCat to the scene and make it so they can't go OoB
        this.cat = new RoboCat(this, 10, game.config.height - 44, 'robo_atlas', 'robo_idle_r_0001').setOrigin(0,0);
        this.cat.setCollideWorldBounds(true);
        //makes it so the cat goes in front of controls text
        this.cat.setDepth(1);
        

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
        for (let i = (game.config.width*3 - (game.config.width/3)); i < (game.config.width*4); i += this.tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - this.tileSize, 'platform_tile', 0).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for (let i = game.config.width*4 + (game.config.width*(1/4)); i < (game.config.width*4 + (game.config.width*(3/4))); i += this.tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - this.tileSize, 'platform_tile', 0).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for (let i = game.config.width*5; i < game.config.width*5.25; i += this.tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - this.tileSize, 'platform_tile', 0).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        for (let i = game.config.width*6; i < game.config.width*7; i += this.tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - this.tileSize, 'platform_tile', 0).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // obstacle set 1
        // creates 3 platforms (i just put them in same group as ground which i think is fine)
        for(let i = game.config.width / 4; i < (game.config.width); i += game.config.width / 4) {
            for (let j = 2; j < 4; j++) {
                let groundTile = this.physics.add.sprite(i, game.config.height - (this.tileSize*j), 'platform_tile', 0).setOrigin(0);
                groundTile.body.immovable = true;
                groundTile.body.allowGravity = false;
                this.ground.add(groundTile);
            }
        }

        // obstacle set 2
        // three obstacles or varying height
        let jh = 4;
        for(let i = game.config.width + (game.config.width / 4); i < (game.config.width*2); i += game.config.width / 4) {
            if (i == game.config.width + ((game.config.width / 4)*2)) {
                jh = 6;
            }
            else {
                jh = 4;
            }
            for (let j = 2; j < jh; j++) {
                let groundTile = this.physics.add.sprite(i, game.config.height - (this.tileSize*j), 'platform_tile', 0).setOrigin(0);
                groundTile.body.immovable = true;
                groundTile.body.allowGravity = false;
                this.ground.add(groundTile);
            }
        }

        // obstacle set three is that initial gap between platforms

        // obstacle set 4
        // creates some spikes
        this.spikeGroup = this.add.group();
        for(let i = (game.config.width / 4) + game.config.width*3; i < game.config.width * 4; i += game.config.width / 4) {
            // spike before obstacle
            let spikeTile = this.physics.add.sprite(i, game.config.height - (this.tileSize), 'spikes', 0).setOrigin(1);
            spikeTile.body.immovable = true;
            spikeTile.body.allowGravity = false;
            this.spikeGroup.add(spikeTile);    
            // spike after obstacle
            let spikeTile2 = this.physics.add.sprite(i + this.tileSize*2, game.config.height - (this.tileSize), 'spikes', 0).setOrigin(1);
            spikeTile2.body.immovable = true;
            spikeTile2.body.allowGravity = false;
            this.spikeGroup.add(spikeTile2);    
        }
        // three obstacles of varying height
        jh = 4;
        for(let i = (game.config.width*3 + (game.config.width / 4)); i < (game.config.width*4); i += game.config.width / 4) {
            for (let j = 2; j < jh; j++) {
                let groundTile = this.physics.add.sprite(i, game.config.height - (this.tileSize*j), 'platform_tile', 0).setOrigin(0);
                groundTile.body.immovable = true;
                groundTile.body.allowGravity = false;
                this.ground.add(groundTile);
            }
            jh += 2;
        }

        // obstacle set 5
        for (let i = game.config.width*4 + (game.config.width*(1/4)); i < (game.config.width*4 + (game.config.width*(3/4))); i += this.tileSize) {
            let spikeTile = this.physics.add.sprite(i, game.config.height - (this.tileSize), 'spikes', 0).setOrigin(0, 1);
            spikeTile.body.immovable = true;
            spikeTile.body.allowGravity = false;
            this.spikeGroup.add(spikeTile);
        }

        for (let i = game.config.width*4 + (game.config.width*(3/8)); i < game.config.width*4 + (game.config.width*(5/8)); i += this.tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - (this.tileSize*4), 'platform_tile', 0).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // obstacle set 6
        let placeSpikes = true; 
        jh = 4;
        for(let i = (game.config.width*5.1 + (game.config.width / 4)); i < (game.config.width*5.8); i += game.config.width / 6) {
            for (let j = 1; j < jh; j++) {
                let groundTile = this.physics.add.sprite(i, game.config.height - (this.tileSize*(j-1)), 'platform_tile', 0).setOrigin(0);
                groundTile.body.immovable = true;
                groundTile.body.allowGravity = false;
                this.ground.add(groundTile);
                //places the spikes on top of every other obstacle
                if (j == jh - 1) {
                    if (placeSpikes) {
                        let spikeTile = this.physics.add.sprite(i, game.config.height - (this.tileSize*(j-1)), 'spikes', 0).setOrigin(0, 1);
                        spikeTile.body.immovable = true;
                        spikeTile.body.allowGravity = false;
                        this.spikeGroup.add(spikeTile);
                        placeSpikes = false;
                    } else {
                        placeSpikes = true;
                    }
                }
            }
            jh += 1;
        }
        
    
        // sets collider between RoboCat and the ground
        this.physics.add.collider(this.cat, this.ground);

        //checks if player touches spikes, teleports them back to beginning if they do
        this.physics.add.collider(this.cat, this.spikeGroup, function(player) {
            this.cat.setVelocity(0);
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
        console.log(this.cat.y);
        console.log("(game.config.height + this.cat.height): "+(game.config.height + this.cat.height));
        if (this.cat.y > (game.config.height + this.cat.height)) {
            this.cat.setVelocity(0);
            this.cat.x = 10;
            this.cat.y = game.config.height - 60;
        } 

        // update cat sprite
        this.cat.update();
    }
}