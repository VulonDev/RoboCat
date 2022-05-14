class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';

        // load image assets
        this.load.image('platform_tile', 'platform_tile.png');
        this.load.image('cat', 'cat.png');
        this.load.image('spikes', 'spikes.png');
        this.load.image('lvl1_background', 'background_lvl1.png');

        // load sound assets (commented out to avoid long load times)
        // this.load.audio('lvl1_music', 'sound/lvl1_music.mp3');
    }

    create() {
        // go straight to the next Scene after loading
        this.scene.start('playScene');
    }
}