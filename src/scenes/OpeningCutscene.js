class OpeningCutscene extends Phaser.Scene {
    constructor() {
        super("openingScene");
        //total length of the scene
        this.duration = 3000;
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('cat', 'cutscene/cat.png' );
        this.load.image('fallbg', 'cutscene/cutscene roof.png');
        this.load.image('lightning', 'cutscene/cutscene lightning.png');
        //load spritesheet
        this.load.spritesheet('rain', 'cutscene/cutscene rain.png', {frameWidth: 420, frameHeight: 294, startFrame: 0, endFrame: 1});
    }
    
    create() {
        this.cameras.main.setBackgroundColor('#2d2d2d');

        // setting level background image
        this.background = this.add.sprite(0, 0, 'fallbg').setOrigin(0, 0);
        this.background.setScrollFactor(0);
        //rain
        this.anims.create({
            key: 'rainanim',
            frames: this.anims.generateFrameNumbers('rain', {start: 0, end: 1, first:0}),
            frameRate: 15,
            repeat: -1
        });
        this.rain = this.add.sprite(0,0, 'rain').setOrigin(0,0);
        this.rain.anims.play('rainanim');

        //lightning
        this.lightning = this.add.sprite(0,0, 'lightning').setOrigin(0,0);
        this.lightning.setAlpha(0);


        this.catFallPath = new Phaser.Curves.Path(0,40);
        this.catFallPath.lineTo(230, 40);
        this.catFallPath.splineTo([290, 180]);
        this.catFallPath.lineTo(290, 275);
        this.cat = this.add.follower(this.catFallPath, 50, 40, 'robo_atlas', 'robo_idle_r_0001');
        this.lightningplayed = false;

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
                if(this.cat.x >= 190 && this.cat.anims.currentAnim.key == 'robo_run_r') {
                    this.cat.anims.play('robo_jump_r');
                }
                if(this.cat.x >=265 && this.cat.x < 280 && !this.lightningplayed) {
                    this.lightningplayed = true;
                    this.cameras.main.flash(175);
                }
                if(this.cat.x >= 283 && this.lightningplayed) {
                    this.lightningplayed = false;
                }
            },
            onComplete: function() {
                this.cat.anims.play('robo_explosion');
                explosionSFX.play();
                this.cat.on('animationcomplete', () => {
                    this.cat.destroy();
                });
            }
        } 

        this.cat.startFollow(this.catTweenConfig);
        


        //transition to level 1 at the end of the cutscene
       /* this.time.delayedCall(this.duration + 1000, () => {
            this.scene.stop();
            this.scene.start('Level1Scene');
        });*/
    }

    update() {
        if(this.lightningplayed) {
            this.lightning.setAlpha(1);
        }
        else{
            this.lightning.setAlpha(0);
        }
    }
}