class Level4 extends Phaser.Scene {
    constructor() {
        super("Level4Scene");
    }

    preload() {
        // level 4 music
        this.load.audio('lvl4_music', 'assets/sound/lvl4_music.mp3');
    }

    create() {
        // set world and camera bounds (the world bounds are greater than the camera so that the player can move off to
        // the right end of the screen to progress to level 3)
        this.physics.world.setBounds(0, 0, game.config.width*2, game.config.height*7);
        this.cameras.main.setBounds(0, 0, game.config.width*2, game.config.height*7);
        // setting the background color
        this.cameras.main.setBackgroundColor('#808080');

        // Level 4 music
        this.music = this.sound.add('lvl4_music', { loop: true, volume: 0.5 });
        this.music.play();
    }

    update() {
    }

}