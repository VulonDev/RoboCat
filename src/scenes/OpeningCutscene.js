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
        this.cat = this.add.follower(this.catFallPath, 100, 100, 'robo_atlas', 'robo_idle_r_0001');
        this.cat.anims.play('robo_run_r');
        this.cat.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 2000,
            ease: 'linear',
            hold: 0,
            yoyo: false,
            rotateToPath: true,
            onCompleteScope: this,
            onComplete: this.explode
        }); 


        //transition to level 1 at the end of the cutscene
      /*  this.time.delayedCall(this.duration, () => {
            this.scene.start('Level1Scene');
        });*/
    }

    update() {

    }
    explode() {
        this.cat.anims.play('robo_explosion');
        this.cat.on('animationcomplete', () => {
            this.cat.destroy();
        })
    }
}