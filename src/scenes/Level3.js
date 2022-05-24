class Level3 extends Phaser.Scene {
    constructor() {
        super("Level3Scene");
    }

    preload() {
        // level 3 music
        this.load.audio('lvl3_music', 'assets/sound/lvl3_music.mp3');
    }

    create() {
        // Level 3 music
        this.music = this.sound.add('lvl3_music', { loop: true, volume: 0.5 });
        this.music.play();
    }

    update() {
    }
}