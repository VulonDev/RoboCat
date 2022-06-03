class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.spritesheet('menu', './assets/menu spritesheet.png', {frameWidth: 420, frameHeight: 294, startFrame: 0, endFrame: 4});
        this.load.image('title', './assets/RoboCat_Title.png');
        // menu music
        this.load.audio('menu_music', 'assets/sound/menu_music.mp3');
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

        // menu music
        this.music = this.sound.add('menu_music', { loop: true, volume: 0.5 });
        this.music.play();

        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#213442',
            align: 'center',
            resolution: 2,
            stroke: '#213442',
            strokeThickness: 1,
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.add.image((game.config.width/2)-5, (game.config.height/4)+6, 'title').setOrigin(0.5);
        this.add.text(game.config.width/2, (game.config.height/2 - 25), 'Press SPACE to Play\n(from the beginning)', menuConfig).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.add.text(game.config.width/2, (game.config.height/2 + 5), '--- Level Select (Grader Mode) ---', menuConfig).setOrigin(0.5);

        menuConfig.fontSize = '12px';

        this.add.text(game.config.width/2, (game.config.height/2 + 20), 'Press [1] to for Level 1', menuConfig).setOrigin(0.5);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        this.add.text(game.config.width/2, (game.config.height/2 + 35), 'Press [2] to for Level 2', menuConfig).setOrigin(0.5);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        this.add.text(game.config.width/2, (game.config.height/2 + 50), 'Press [3] to for Level 3', menuConfig).setOrigin(0.5);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        this.add.text(game.config.width/2, (game.config.height/2 + 65), 'Press [4] to view Credits', menuConfig).setOrigin(0.5);
        key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);

        this.add.text(game.config.width/2, (game.config.height/2 + 80), 'Press [1] while playing to return to Menu', menuConfig).setOrigin(0.5);

        
    }

    update() {
        //start game when spacebar pressed
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            menuSFX.play();
            this.music.stop();
            this.scene.stop();
            this.scene.start("openingScene");
        }
        else if(Phaser.Input.Keyboard.JustDown(key1)) {
            this.music.stop();
            this.scene.stop();
            if (!openingPlayed) {
                menuSFX.play();
                this.scene.start("openingScene");
            }
            else {
                menuSFX.play();
                this.scene.start("Level1Scene");
            }
        }
        else if(Phaser.Input.Keyboard.JustDown(key2)) {
            menuSFX.play();
            this.music.stop();
            this.scene.stop();
            this.scene.start("Level2Scene");
        }
        else if(Phaser.Input.Keyboard.JustDown(key3)) {
            menuSFX.play();
            this.music.stop();
            this.scene.stop();
            this.scene.start("Level3Scene");
        }
        else if (Phaser.Input.Keyboard.JustDown(key4)) {
            menuSFX.play();
            this.music.stop();
            this.scene.stop();
            this.scene.start("creditsScene");
        }
    }
    
}