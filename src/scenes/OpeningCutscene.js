class OpeningCutscene extends Phaser.Scene {
    constructor() {
        super("openingScene");
        //total length of the scene
        this.duration = 5000;
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('cat', 'cutscene/cat.png' );
        this.load.image('fallbg', 'cutscene/cutscene roof.png');
    }
    
    create() {
        this.cameras.main.setBackgroundColor('#2d2d2d');

        // setting level background image
        this.background = this.add.sprite(0, 0, 'fallbg').setOrigin(0, 0);
        this.background.setScrollFactor(0);

        this.catFallPath = new Phaser.Curves.Path(0,50);
        this.catFallPath.lineTo(165, 50);
        this.catFallPath.lineTo(165, 275);
        this.cat = this.add.follower(this.catFallPath, 50, 50, 'robo_atlas', 'robo_idle_r_0001');

        this.catTweenConfig = {
            targets: 'catFallPath',
            props: {},
            from: 0,
            to: 1,
            delay: 0,
            duration: this.duration,
            ease: "linear",
            hold: 0,
            yoyo: false,
            rotateToPath: true,
            callbackScope: this,
           onStart: function() {
                this.cat.anims.play('robo_run_r');
            },
            onUpdate: function() {
                console.log(this.cat.angle);
                if(this.cat.angle == 90 && this.cat.anims.isPlaying 
                    && this.cat.anims.currentAnim.key == 'robo_run_r') {
                    this.cat.anims.play('robo_jump_r');
                }
            },
            onComplete: function() {
                this.cat.anims.play('robo_explosion');
                this.cat.on('animationcomplete', () => {
                    this.cat.destroy();
                });
            }
        } 

        this.cat.startFollow(this.catTweenConfig);
        


       /* //transition to level 1 at the end of the cutscene
        this.time.delayedCall(this.duration + 1000, () => {
            this.scene.start('Level1Scene');
        });*/
    }

    update() {

    }
}