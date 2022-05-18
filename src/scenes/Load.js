class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';

        // load image assets
        // level 1 image assets and tilemap
        this.load.image('lvl1_tiles', 'lvl1/lvl1_tiles.png');
        this.load.tilemapTiledJSON('lvl1_tilemap', 'lvl1/lvl1_map.json');
        this.load.image('lvl1_background', 'lvl1/background_lvl1.png');
        // level 2 image assets and tilemap
        this.load.image('tree_tile_v', 'lvl2/tree_tile_v.png');
        this.load.image('tree_tile_h', 'lvl2/tree_tile_h.png');

        // load spritesheets
        // RoboCat spritesheet
        this.load.atlas('robo_atlas', 'robocat spritesheet.png', 'robocat map.json');

        // load sound assets
        // level 1 music
        this.load.audio('lvl1_music', 'sound/lvl1_music.mp3');
        // level 2 music
        // this.load.audio('lvl2_music', 'sound/lvl2_music.mp3');

    }

    create() {
        // go straight to the next Scene after loading
        this.scene.start('Level1Scene');
    }
}