class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.spritesheet('menu', './assets/menu spritesheet.png', {frameWidth: 420, frameHeight: 294, startFrame: 0, endFrame: 4});
    }

    create() {

        this.anims.create({
            key: 'menu_anim',
            frames: this.anims.generateFrameNumbers('menu', {start: 0, end: 4, first: 0}),
            frameRate: 8,
            repeat: -1,
        });

        this.menu_screen_anim = this.add.sprite(0, 0, 'menu_anim').setOrigin(0, 0);
        this.menu_screen_anim.play('menu_anim');

        let menuConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '30px',
            color: '#000000',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.add.text(game.config.width/2, (game.config.height/4)+6, 'RoboCat', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '16px';
        this.add.text(game.config.width/2, (game.config.height/2 - 25), 'Press SPACE to Play\n(from the beginning)', menuConfig).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.add.text(game.config.width/2, (game.config.height/2 + 5), '--- Level Select (Grader Mode) ---', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, (game.config.height/2 + 25), 'Press [1] to for Level 1', menuConfig).setOrigin(0.5);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        this.add.text(game.config.width/2, (game.config.height/2 + 45), 'Press [2] to for Level 2', menuConfig).setOrigin(0.5);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        this.add.text(game.config.width/2, (game.config.height/2 + 65), 'Press [3] to for Level 3', menuConfig).setOrigin(0.5);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        menuConfig.fontSize = '12px';
        this.add.text(game.config.width/2, (game.config.height/2 + 85), 'Press [1] while playing to return to Menu', menuConfig).setOrigin(0.5);

        
    }

    update() {
        //start game when spacebar pressed
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.stop();
            this.scene.start("openingScene");
        }
        else if(Phaser.Input.Keyboard.JustDown(key1)) {
            this.scene.stop();
            if (!openingPlayed) {
                this.scene.start("openingScene");
            }
            else {
                this.scene.start("Level1Scene");
            }
        }
        else if(Phaser.Input.Keyboard.JustDown(key2)) {
            this.scene.stop();
            this.scene.start("Level2Scene");
        }
        else if(Phaser.Input.Keyboard.JustDown(key3)) {
            this.scene.stop();
            this.scene.start("Level3Scene");
        }
    }
    
}