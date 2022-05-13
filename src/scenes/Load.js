class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';

        // Load all assets here.
        this.load.image('platform_tile', 'platform_tile.png');
        this.load.image('cat', 'cat.png');
    }

    create() {
        // go straight to the next Scene after loading
        this.scene.start('playScene');
    }
}