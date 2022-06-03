class Level3End extends Phaser.Scene {
    constructor() {
        super('Level3End');
    }

    create() {
        this.cameras.main.setBackgroundColor('#2d2d2d');
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '19px',
            color: '#676767',
            backgroundColor: '#DDDDDD',
            align: 'center',
            stroke: '#FFFFFF',
            strokeThickness: 1,
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.add.text(game.config.width/2, game.config.height / 2
        , 'With the power of perseverance (and grippy claws)\n'+
        'RoboCat at last triumphed over downtown!\n' +
        'The missing cat was so grateful to be found!\n'+
        'Now there was no cat RoboCat couldn\'t find.\n' +
        'RoboCat continued his work\n'+
        'and he lived happily ever after\n'+
        '[SPACE] to continue', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.cameras.main.fadeOut(1000);
            this.time.delayedCall(1000, () => {
                this.scene.stop();
                this.scene.start('creditsScene');
            },[], this);
        }
    }
}