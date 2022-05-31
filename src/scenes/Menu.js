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
            fontSize: '18px',
            color: '#888888',
            backgroundColor: '#DDDDDD',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.add.text(game.config.width/2, game.config.height / 2, 'CAT GAME LETS GOO WOOOOO \n PRESS SPACE TO PLAY!!!', menuConfig).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        //start game when spacebar pressed
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.stop();
            this.scene.start("loadScene");
        }
    }
    
}