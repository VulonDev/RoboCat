class OpeningCutscene extends Phaser.Scene {
    constructor() {
        super("openingScene");
        this.duration = 2000;
    }

    preload() {

    }
    
    create() {
        this.cameras.main.setBackgroundColor('#808080');
        this.time.delayedCall(this.duration, () => {
            this.scene.start('Level1Scene');
        });
    }

    update() {

    }
}