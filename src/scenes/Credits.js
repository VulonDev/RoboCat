class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
    }

    create() {
        
        //main camera fade-in
        this.cameras.main.fadeIn(1000);

        let creditsConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '20px',
            color: '#888888',
            backgroundColor: '#DDDDDD',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
        }

        this.add.text(game.config.width/2, 40, 'THE END', creditsConfig).setOrigin(0.5);
        
        this.title = this.add.text(game.config.width/2, 80, 'THE ROBOCAT DEVELOPMENT TEAM', creditsConfig).setOrigin(0.5);
        this.title.stroke = '#888888';
        this.title.strokeThickness = 6;
        this.title.fontSize = '18px';
        creditsConfig.fontSize = '12px';
        this.add.text(game.config.width/2, 120, 'Elizabeth Arnold - Sprite Artist, Cutscene Director, Game Programmer', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 150, 'Ryan Hueckel -  Lead Game Programmer, Sound Effects Designer', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 180, 'Ziyang Li  - Background Artist', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 210, 'Autumn Plaxco  - Game Programmer, Level Designer, Music Composer', creditsConfig).setOrigin(0.5);

        creditsConfig.fontSize = '14px';
        this.add.text(game.config.width/2, 254, 'Press SPACE to return to Main Menu\n', creditsConfig).setOrigin(0.5);

        //key inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        

    }

    update() {
        //go to menu when spacebar pressed
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.stop();
            this.scene.start("menuScene");
        }
    }
}