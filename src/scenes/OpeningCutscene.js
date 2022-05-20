class OpeningCutscene extends Phaser.Scene {
    constructor() {
        super("openingScene");
        //total length of the scene
        this.duration = 2000;
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('cat', 'cutscene/cat.png' );
    }
    
    create() {
        this.cameras.main.setBackgroundColor('#2d2d2d');

        this.catFallPath = new Phaser.Curves.Path(100,100);
        this.catFallPath.lineTo(200,100);
        this.catFallPath.lineTo(200, 250);
        this.cat = this.add.follower(this.catFallPath, 100, 100, 'cat');

        this.cat.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 2000,
            ease: 'Power0',
            hold: 0,
            yoyo: false,
            rotateToPath: false
        });


        //transition to level 1 at the end of the cutscene
      /*  this.time.delayedCall(this.duration, () => {
            this.scene.start('Level1Scene');
        });*/
    }

    update() {

    }
}