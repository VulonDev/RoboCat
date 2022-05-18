class RoboCat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setMaxVelocityX(230);
        this.body.setDragX(2000); 
        isJumping = false;
        this.lastDirection = 'r';
        this.canDubJump = false;

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
            frameRate: 10,
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
            frameRate: 10,
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
                prefix: 'robo_prop_l_',
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
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.setGravityY(0);
            //normal jump
            if (this.body.touching.down && !this.body.touching.left && !this.body.touching.right) {
                isJumping = true;
                this.setVelocityY(-300);
                this.canDubJump = true;
            //double jump
            } else if (!(this.body.touching.down) && this.canDubJump) {
                this.setVelocityY(-300);
                this.canDubJump = false;
                isJumping = true;
            }
        }
           
        //slow down jump velocity once player lets go of jump
        if (isJumping && !(keyUP.isDown)) {
            this.setGravityY(0);
            if (this.body.velocity.y > 0 ) {
                isJumping = false;
                
            } else {
                this.setVelocityY(this.body.velocity.y + 8);
            }
        } 

        //slow fall effect after double jumping if jump is held
        if (isJumping && !(this.body.touching.down) && keyUP.isDown && !(this.canDubJump) && this.body.velocity.y > 0) {
            console.log(1); 
            this.setGravityY(-500);
        }

        //player movement, player doesnt move if both left and right are held down   
        if (keyRIGHT.isDown && !keyLEFT.isDown) {
            this.lastDirection = 'r';
            //this helps make the player feel less icy when changing direction
            if (this.body.velocity.x < 0) {
                this.setVelocityX(this.body.velocity.x + 15);
            }
            this.setAccelerationX(400);
            if (this.body.touching.down && !this.body.touching.right) {
                this.anims.play('robo_run_r', true);
            }
            else if (!this.body.touching.down && this.body.touching.right) {
                // play (right) wall cling animation
                this.anims.play('robo_idle_r', true);
            }
            else if (!this.body.touching.down && !this.body.touching.right){
                // replace with regular jump animation
                this.anims.play('robo_prop_r', true);
            }
        }else if (keyLEFT.isDown && !keyRIGHT.isDown) {  
            this.lastDirection = 'l';
            if (this.body.velocity.x > 0) {
                this.setVelocityX(this.body.velocity.x - 15);
            }  
            this.setAccelerationX(-400);
            if (this.body.touching.down && !this.body.touching.left) {
                this.anims.play('robo_run_l', true);
            }
            else if (!this.body.touching.down && this.body.touching.left) {
                // play (right) wall cling animation
                this.anims.play('robo_idle_l', true);
            }
            else if (!this.body.touching.down && !this.body.touching.left){
                // replace with regular jump animation
                this.anims.play('robo_prop_l', true);
            }
        } else {
            this.setAccelerationX(0);
            if (this.lastDirection == 'r') {
                if (this.body.touching.down) {
                    this.anims.play('robo_idle_r', true);
                }
                else if (!this.body.touching.down) {
                    // replace with regular jump animation
                    this.anims.play('robo_prop_r', true);
                }
            }
            if (this.lastDirection == 'l') {
                if (this.body.touching.down) {
                    this.anims.play('robo_idle_l', true);
                }
                else if (!this.body.touching.down){
                    // replace with regular jump animation
                    this.anims.play('robo_prop_l', true);
                }
            }
        }
        
    }

}