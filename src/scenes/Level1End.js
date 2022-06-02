class Level1End extends Phaser.Scene {
    constructor() {
        super('Level1End');
    }

    create() {
        this.cameras.main.setBackgroundColor('#2d2d2d');
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
        this.add.text(game.config.width/2, game.config.height / 2
        , 'Working together with the cat he saved,\n'+
        'the damaged RoboCat escaped the junkyard\n' +
        'Even now, RoboCat still had a purpose!\n'+
        'RoboCat returned to the city,\n' +
        'in search of repairs and more cats to save...\n'+
        '[SPACE] to continue or [1] for MENU', menuConfig).setOrigin(0.5);

        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.cameras.main.fadeOut(1000);
            this.time.delayedCall(1000, () => {
                this.scene.stop();
                this.scene.start('Level2Scene');
            },[], this);
        }
        else if(Phaser.Input.Keyboard.JustDown(key1)) {
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => {
                this.scene.stop();
                this.scene.start('menuScene');
            },[], this);
        }
    }
}