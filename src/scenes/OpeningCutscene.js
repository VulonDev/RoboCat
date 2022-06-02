class OpeningCutscene extends Phaser.Scene {
    constructor() {
        super("openingScene");
        //total length of the scene
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('cat', 'cutscene/cat.png' );
        this.load.image('fallbg', 'cutscene/cutscene roof.png');
        this.load.image('lightning', 'cutscene/cutscene lightning.png');
        this.load.image('endbg', 'cutscene/cutscene end.png');
        //load spritesheet
        this.load.spritesheet('rain', 'cutscene/cutscene rain.png', {frameWidth: 420, frameHeight: 294, startFrame: 0, endFrame: 1});
        //load audio
        this.load.audio('rainnoise', 'sound/rain noise.mp3');
        this.load.audio('music', 'sound/cutscene music.mp3');
        this.load.audio('lightningnoise', 'sound/lightning strike.mp3');
    }
    
    create() {
        this.cameras.main.setBackgroundColor('#2d2d2d');
        this.rainNoise = this.sound.add('rainnoise', {loop: true, volume: 0.4});
        this.music = this.sound.add('music', {loop:true, volume:1});
        this.lightningNoise = this.sound.add('lightningnoise', {volume:0.5});
        this.music.play();


        let menuConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '18px',
            color: '#888888',
            backgroundColor: '#DDDDDD',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.add.text(game.config.width/2, game.config.height / 2
        , 'Cats get lost in the city all the time...\n'+
        'To save them the city created a hero:\n' +
        'ROBOCAT!!!\n'+
        'A high tech cat-shaped cat-finding AI!\n' +
        'ROBOCAT served faithfully for many months.\n'+
        'But one day, the unthinkable occured...', menuConfig).setOrigin(0.5);
        this.time.delayedCall(8500, () => {
            this.cameras.main.fadeOut(1500);
        },[], this);

        //cat running scene
        this.time.delayedCall(10000, () => {
            this.cameras.main.fadeIn(250);
            this.rainNoise.play();
            runSFX.play();
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
                duration: 3000,
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
                        runSFX.stop();
                    }
                    if(this.cat.x >=265 && this.cat.x < 280 && !this.lightningplayed) {
                        this.lightningplayed = true;
                        this.cameras.main.flash(175);
                        this.lightningNoise.play();
                    }
                    if(this.cat.x >= 283 && this.lightningplayed) {
                        this.lightningplayed = false;
                    }
                    if(this.lightningplayed) {
                        this.lightning.setAlpha(1);
                    }
                    else {
                        this.lightning.setAlpha(0);
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

            //transition to cat dumpster image
            this.time.delayedCall(4500, () => {
                this.rainNoise.stop();
                this.background.destroy();
                this.lightning.destroy();
                this.rain.destroy();
                this.endbackground = this.add.sprite(0,0, 'endbg').setOrigin(0,0);
                this.cameras.main.zoomTo(3,100000);
                this.time.delayedCall(6750, () => {
                    this.tweens.add({
                        targets: this.music,
                        volume: 0,
                        duration: 1000
                    });
                    this.cameras.main.fadeOut(1000);
                }, [], this);
    
                this.time.delayedCall(7750, () => {
                    this.music.stop();
                    this.scene.stop();
                    openingPlayed = true;
                    this.scene.start('Level1Scene');
                }, [], this);
            }, [], this);
        }, [], this);
    }
}