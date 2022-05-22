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
        this.isDoubJumping = false;
        this.isSlowFalling = false;
        this.isExploding = false;

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

        // right wall cling animation
        this.anims.create({
            key: 'robo_cling_r',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_cling_r_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // left wall cling animation
        this.anims.create({
            key: 'robo_cling_l',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_cling_l_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
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
        this.anims.create({
            key: 'robo_jump_r',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_jump_r_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

        // left jumping animation
        this.anims.create({
            key: 'robo_jump_l',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'robo_jump_l_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1,
        });

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

        // explosion animation
        this.anims.create({
            key: 'robo_explosion',
            frames: this.anims.generateFrameNames('robo_atlas', {
                prefix: 'explosion_',
                start: 1,
                end: 6,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15
        });

        this.anims.play('robo_idle_r');
        
        //allows for pressing space right before you land
        scene.input.keyboard.on('keydown-UP', () => {
            pressedJump = true;
            jumpEvent = new Phaser.Time.TimerEvent({ delay: 110, callback: this.togglePressedJump});
            scene.time.addEvent(jumpEvent);
        }, this);

        pressedJump = false;
     }

    update() {

        //player jumping (made it so that the player cant jump when stuck to the side of the wall)
        if (pressedJump && !this.isExploding) {
            //normal jump
            if (this.body.blocked.down && !this.body.blocked.left && !this.body.blocked.right) {
                this.setGravityY(0);
                pressedJump = false;
                isJumping = true;
                jumpEvent.remove();
                this.setVelocityY(-300);
                this.canDubJump = true;
                this.isDoubJumping = false;
            //double jump
            } else if (hasPropeller && !(this.body.blocked.down) && this.canDubJump) {
                this.setGravityY(0);
                pressedJump = false;
                this.setVelocityY(-300);
                this.canDubJump = false;
                jumpEvent.remove();
                isJumping = true;
                this.isDoubJumping = true;
            }
        }
           
        //slow down jump velocity once player lets go of jump
        if (isJumping && !(keyUP.isDown) && !this.isExploding) {
            this.isSlowFalling = false;
            this.setGravityY(0);
            if (this.body.velocity.y > 0 ) {
                isJumping = false;
                this.isDoubJumping = false;
                
            } else {
                this.setVelocityY(this.body.velocity.y + 8);
            }
        } 

        //slow fall effect after double jumping if jump is held
        if (!(this.isSlowFalling) && !(this.body.blocked.down) && keyUP.isDown && !(this.canDubJump) && this.body.velocity.y > 0) {
            this.body.velocity.y = this.body.velocity.y / 2;
            this.isSlowFalling = true;
            this.isDoubJumping = true;
            isJumping = true; 
            this.setGravityY(-500);
        }

        //player movement, player doesnt move if both left and right are held down   
        if (keyRIGHT.isDown && !keyLEFT.isDown && !this.isExploding) {
            this.lastDirection = 'r';
            //this helps make the player feel less icy when changing direction
            if (this.body.velocity.x < 0) {
                this.setVelocityX(this.body.velocity.x + 15);
            }
            this.setAccelerationX(400);
            if (this.body.blocked.down && !this.body.blocked.right) {
                this.anims.play('robo_run_r', true);
            }
            else if (!this.body.blocked.down && this.body.blocked.right) {
                // play (right) wall cling animation
                this.anims.play('robo_cling_r', true);
                this.texture = 'robo_cling_r';
            }
            else if (!this.body.blocked.down && !this.body.blocked.right){
                // jump animation
                if (!this.isDoubJumping) {
                    this.anims.play('robo_jump_r', true);
                }
                else {
                    this.anims.play('robo_prop_r', true);
                }
            }
        }else if (keyLEFT.isDown && !keyRIGHT.isDown && !this.isExploding) {  
            this.lastDirection = 'l';
            if (this.body.velocity.x > 0) {
                this.setVelocityX(this.body.velocity.x - 15);
            }  
            this.setAccelerationX(-400);
            if (this.body.blocked.down && !this.body.blocked.left) {
                this.anims.play('robo_run_l', true);
            }
            else if (!this.body.blocked.down && this.body.blocked.left) {
                // play (right) wall cling animation
                this.anims.play('robo_cling_l', true);
            }
            else if (!this.body.blocked.down && !this.body.blocked.left){
                if (!this.isDoubJumping) {
                    this.anims.play('robo_jump_l', true);
                }
                else {
                    this.anims.play('robo_prop_l', true);
                }
            }
        } else if (!this.isExploding) {
            this.setAccelerationX(0);
            if (this.lastDirection == 'r') {
                if (this.body.blocked.down) {
                    this.anims.play('robo_idle_r', true);
                }
                else if (!this.body.blocked.down) {
                    if (!this.isDoubJumping) {
                        this.anims.play('robo_jump_r', true);
                    }
                    else {
                        this.anims.play('robo_prop_r', true);
                    }
                }
            }
            if (this.lastDirection == 'l') {
                if (this.body.blocked.down) {
                    this.anims.play('robo_idle_l', true);
                }
                else if (!this.body.blocked.down){
                    if (!this.isDoubJumping) {
                        this.anims.play('robo_jump_l', true);
                    }
                    else {
                        this.anims.play('robo_prop_l', true);
                    }
                }
            }
        }
        
    }

    resetPosition(x, y, fall) {
        this.isExploding = true;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        if (fall) {
            this.y = (this.y - this.height - 30);
        }
        this.body.setAllowGravity(false);
        this.anims.play('robo_explosion', true);
        this.on('animationcomplete', () => { 
            this.x = x;
            this.y = y;
            this.isExploding = false;
            this.body.setAllowGravity(true);
        });
    }

    togglePressedJump() {
        pressedJump = false;
    }

}