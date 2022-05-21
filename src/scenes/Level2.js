class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2Scene");
    }

    preload() {
    }

    create() {
        console.log("it lvl 2");
        // set world and camera bounds
        this.physics.world.setBounds(0, 0, game.config.width*2, game.config.height*5);
        this.cameras.main.setBounds(0, 0, game.config.width*2, game.config.height*5);

        // level 2 music
        // this.music = this.sound.add('lvl1_music', { loop: true, volume: 0.5 });
        // this.music.play();

        // setting the background color
        this.cameras.main.setBackgroundColor('#808080');
    }

    update() {
    }
}