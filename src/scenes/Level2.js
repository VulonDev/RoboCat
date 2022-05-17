class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2Scene");
    }

    preload() {
    }

    create() {
        // set world and camera bounds
        this.physics.world.setBounds(0, 0, game.config.width*2, game.config.height*5);
        this.cameras.main.setBounds(0, 0, game.config.width*2, game.config.height*5);

        // setting the background color
        this.cameras.main.setBackgroundColor('#808080');
    }

    update() {
    }
}