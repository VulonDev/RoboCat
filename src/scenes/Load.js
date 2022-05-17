class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';

        // load image assets
        // level 1 image assets
        this.load.image('platform_tile', 'lvl1/platform_tile.png');
        this.load.image('spikes', 'lvl1/spikes.png');
        this.load.image('lvl1_background', 'lvl1/background_lvl1.png');
        // level 2 image assets

        // load spritesheets
        // RoboCat spritesheet
        this.load.atlas('robo_atlas', 'robocat spritesheet.png', 'robocat map.json');

        // load sound assets
        // level 1 music
        this.load.audio('lvl1_music', 'sound/lvl1_music.mp3');
        // level 2 music

    }

    create() {
        // go straight to the next Scene after loading
        this.scene.start('playScene');
    }
}