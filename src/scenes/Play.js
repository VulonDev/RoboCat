class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
    }

    create() {
        let textConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '36px',
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