class Level2End extends Phaser.Scene {
    constructor() {
        super('Level2End');
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
        , 'With his propellor tail restored,\n'+
        'RoboCat quickly reached the heights of the tree!\n' +
        'He showed the lost cat the way down.\n'+
        'RoboCat\'s success gave him new confidence!\n' +
        'He returned again to the dangerous downtown\n'+
        'where once he had fallen before...2\n'+
        '[SPACE] to continue or [1] for MENU', menuConfig).setOrigin(0.5);

        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.cameras.main.fadeOut(1000);
            this.time.delayedCall(1000, () => {
                this.scene.stop();
                this.scene.start('Level3Scene');
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