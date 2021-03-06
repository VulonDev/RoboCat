class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';

        // load image assets
        this.load.image('arrow', 'arrow.png');
        // level 1 image assets and tilemap
        this.load.image('lvl1_tiles', 'lvl1/lvl1_tiles.png');
        this.load.tilemapTiledJSON('lvl1_tilemap', 'lvl1/lvl1_map.json');
        this.load.image('lvl1_background', 'lvl1/background_lvl1.png');
        this.load.image('missing_cat_1', 'missing white.png');
        // level 2 image assets and tilemap
        this.load.image('lvl2_tiles', 'lvl2/lvl2_tiles.png');
        this.load.tilemapTiledJSON('lvl2_tilemap', 'lvl2/lvl2_map.json');
        this.load.image('lvl2_background', 'lvl2/background_lvl2.png');
        this.load.image('cat_tail', 'robocat_tail.png');
        this.load.image('missing_cat_2', 'missing orange.png')
        // level 3 image assets and tilemap
        this.load.image('lvl3_tiles', 'lvl3/lvl3_tiles.png');
        this.load.tilemapTiledJSON('lvl3_tilemap', 'lvl3/lvl3_map.json');
        this.load.image('balcony', 'lvl3/balcony.png');
        this.load.image('lvl3_background', 'lvl3/background_lvl3.png')
        this.load.image('missing_cat_3', 'missing black.png');
        this.load.image('cat_claws', 'robocat_claws.png');
        // level 4 image assets and tilemap
        //level 4 got cut haha!!!


        // load spritesheets
        // RoboCat spritesheet
        this.load.atlas('robo_atlas', 'robocat spritesheet.png', 'robocat map.json');
        this.load.atlas('robo_atlas_notail', 'robocat spritesheet notail.png', 'robocat map.json');
        this.load.image('robo_hitbox', 'robocat_hitbox.png');

        // load sound assets (sfx here, but music in the level itself)
        this.load.audio('death_explosion', 'sound/death_explosion.mp3');
        this.load.audio('propeller', 'sound/propeller.mp3');
        this.load.audio('runSFX', 'sound/run.mp3');
        this.load.audio('itemSFX', 'sound/item_pickup.mp3');
        this.load.audio('menuSFX', 'sound/menu_select_sfx.mp3');

    }

    create() {

        // define sound effects
        explosionSFX = this.sound.add('death_explosion', {volume: 0.5});
        propellerSFX = this.sound.add('propeller',  {volume: 0.6});
        runSFX = this.sound.add('runSFX',{volume: 1.8});
        itemSFX = this.sound.add('itemSFX',{volume: 0.6});
        menuSFX = this.sound.add('menuSFX',{volume: 1.0});

        // initialize hasPropellor and hasWallJump to false for the first level
        hasPropeller = false;
        hasWallJump = false;

        //RoboCat Animations
        // RoboCat animation without tail
        // right idle
        this.anims.create({
            key: 'robo_idle_r_notail',
            frames: this.anims.generateFrameNames('robo_atlas_notail', {
                prefix: 'robo_idle_r_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
            repeatDelay: 3000
        });

        // left idle
        this.anims.create({
            key: 'robo_idle_l_notail',
            frames: this.anims.generateFrameNames('robo_atlas_notail', {
                prefix: 'robo_idle_l_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
            repeatDelay: 3000
        });

        // right wall cling 
        this.anims.create({
            key: 'robo_cling_r_notail',
            frames: this.anims.generateFrameNames('robo_atlas_notail', {
                prefix: 'robo_cling_r_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // left wall cling 
        this.anims.create({
            key: 'robo_cling_l_notail',
            frames: this.anims.generateFrameNames('robo_atlas_notail', {
                prefix: 'robo_cling_l_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // right running
        this.anims.create({
            key: 'robo_run_r_notail',
            frames: this.anims.generateFrameNames('robo_atlas_notail', {
                prefix: 'robo_run_r_',
                start: 1,
                end: 6,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // left running 
        this.anims.create({
            key: 'robo_run_l_notail',
            frames: this.anims.generateFrameNames('robo_atlas_notail', {
                prefix: 'robo_run_l_',
                start: 1,
                end: 6,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // right jumping
        this.anims.create({
            key: 'robo_jump_r_notail',
            frames: this.anims.generateFrameNames('robo_atlas_notail', {
                prefix: 'robo_jump_r_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // left jumping 
        this.anims.create({
            key: 'robo_jump_l_notail',
            frames: this.anims.generateFrameNames('robo_atlas_notail', {
                prefix: 'robo_jump_l_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });



        // RoboCat animations (with tail)
        // right idle animation
        this.anims.create({
            key: 'robo_idle_r',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_idle_r_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
            repeatDelay: 5000
        });

        // left idle animation
        this.anims.create({
            key: 'robo_idle_l',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_idle_l_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
            repeatDelay: 5000
        });

        // right wall cling animation
        this.anims.create({
            key: 'robo_cling_r',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_cling_r_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // left wall cling animation
        this.anims.create({
            key: 'robo_cling_l',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_cling_l_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // right running animation
        this.anims.create({
            key: 'robo_run_r',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_run_r_',
                start: 1,
                end: 6,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // left running animation
        this.anims.create({
            key: 'robo_run_l',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_run_l_',
                start: 1,
                end: 6,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // right jumping animation
        this.anims.create({
            key: 'robo_jump_r',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_jump_r_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // left jumping animation
        this.anims.create({
            key: 'robo_jump_l',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_jump_l_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // right propellor jumping animation
        this.anims.create({
            key: 'robo_prop_r',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_prop_r_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1,
        });

        // left propellor jumping animation
        this.anims.create({
            key: 'robo_prop_l',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_prop_l_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1,
        });

        // explosion animation
        this.anims.create({
            key: 'robo_explosion',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'explosion_',
                start: 1,
                end: 6,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15
        });

        this.scene.stop();

        this.scene.start('menuScene');
    }
}