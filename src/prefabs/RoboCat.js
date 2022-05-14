class RoboCat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setMaxVelocity(300);
        this.body.setDragX(2000); 
        isJumping = false;

        // RoboCat animations
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
            frameRate: 15,
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
            frameRate: 15,
            repeat: -1,
        });

        // right jumping animation

        // left jumping animation

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
                prefix: 'robo_run_l_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1,
        });

        this.anims.play('robo_idle_r');

     }

    update() {
        //player jumping (made it so that the player cant jump when stuck to the side of the wall)
        if (keyUP.isDown && this.body.touching.down && !this.body.touching.left && !this.body.touching.right) {
            isJumping = true;
            this.setVelocityY(-300);
        }
        if (isJumping && !(keyUP.isDown)) {
            this.setVelocityY(this.body.velocity.y + 8);
            if (this.body.velocity.y > 0 ) {
                isJumping = false;
            }
        }

        //player movement, player doesnt move if both left and right are held down   
        if (keyRIGHT.isDown && !keyLEFT.isDown) {
            //this helps make the player feel less icy when changing direction
            if (this.body.velocity.x < 0) {
                this.setVelocityX(this.body.velocity.x + 15);
            }
            this.setAccelerationX(400);
            this.anims.play('robo_run_r', true);
        }else if (keyLEFT.isDown && !keyRIGHT.isDown) {  
            if (this.body.velocity.x > 0) {
                this.setVelocityX(this.body.velocity.x - 15);
            }  
            this.setAccelerationX(-400);
            this.anims.play('robo_run_l', true);
        } else {
            this.setAccelerationX(0);
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'robo_run_r') {
                this.anims.play('robo_idle_r');
            }
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'robo_run_l') {
                this.anims.play('robo_idle_l');
            }
        }
        
    }

}