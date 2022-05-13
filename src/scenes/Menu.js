class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
    }

    create() {

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
            this.scene.start("loadScene");
        }
    }
    
}