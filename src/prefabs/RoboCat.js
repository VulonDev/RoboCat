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
        this.isClinging = false;
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

        if (this.body.blocked.down) {
            propellerSFX.stop();
            this.canDubJump = true;
        }

        //player jumping (player cant jump when stuck to the side of the wall)
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
                runSFX.stop();
            //double jump
            } else if (hasPropeller && !(this.body.blocked.down) && !this.body.blocked.left && !this.body.blocked.right && this.canDubJump) {
                this.setGravityY(0);
                pressedJump = false;
                this.setVelocityY(-300);
                this.canDubJump = false;
                jumpEvent.remove();
                isJumping = true;
                this.isDoubJumping = true;
                runSFX.stop();
            } else if (hasWallJump && (this.body.blocked.right || this.body.blocked.left) && !this.body.blocked.down) {
                this.setGravityY(0);
                jumpEvent.remove();
                pressedJump = false;
                if(this.body.blocked.right) {
                    this.setVelocityX(-300);
                } else if (this.body.blocked.left) {
                    this.setVelocityX(300);
                }
                this.setVelocityY(-300);
                runSFX.stop();
            }
        }
           
        //slow down jump velocity once player lets go of jump
        if (!this.isClinging && isJumping && !(keyUP.isDown) && !this.isExploding) {
            propellerSFX.stop();
            this.isSlowFalling = false;
            this.isDoubJumping = false;
            this.setGravityY(0);
            if (this.body.velocity.y > 0 ) {
                isJumping = false;
                
            } else {
                this.setVelocityY(this.body.velocity.y + 8);
            }
        } 

        //slow fall effect after double jumping if jump is held
        if (!this.isClinging && !(this.isSlowFalling) && !(this.body.blocked.down) && keyUP.isDown && !(this.canDubJump) && this.body.velocity.y > 0) {
            this.body.velocity.y = this.body.velocity.y / 2;
            this.isSlowFalling = true;
            this.isDoubJumping = true;
            isJumping = true; 
            this.setGravityY(-500);
        }

        //clinging stuff
        if (hasWallJump && keyRIGHT.isDown && !keyLEFT.isDown && !this.isExploding && !this.body.blocked.down && this.body.blocked.right) {
            if (!this.isClinging) {
                propellerSFX.stop();
                this.isClinging = true;
                this.body.velocity.y = 0;
                this.setGravityY(-600);
            }
        } else if (hasWallJump && keyLEFT.isDown && !keyRIGHT.isDown && !this.isExploding && !this.body.blocked.down && this.body.blocked.left) {
            if (!this.isClinging) {
                propellerSFX.stop();
                this.isClinging = true;
                this.body.velocity.y = 0;
                this.setGravityY(-600);
            }
        } else {
            if (this.isClinging) {
                this.isClinging = false;
                this.setGravityY(0);
            }
        }

        //player movement, player doesnt move if both left and right are held down   
        if (keyRIGHT.isDown && !keyLEFT.isDown && !this.isExploding) {
            this.lastDirection = 'r';
            //run SFX
            if (!runSFX.isPlaying && this.body.blocked.down) {
                runSFX.play();
            }
            if (runSFX.isPlaying && !this.body.blocked.down) {
                runSFX.stop();
            }
            //this helps make the player feel less icy when changing direction
            if (this.body.velocity.x < 0) {
                this.setVelocityX(this.body.velocity.x + 15);
            }
            this.setAccelerationX(400);
            if (this.body.blocked.down && !this.body.blocked.right) {
                if (hasPropeller) {
                    this.anims.play('robo_run_r', true);
                }
                else {
                    this.anims.play('robo_run_r_notail', true);
                }
            }
            else if (!this.body.blocked.down && this.body.blocked.right) {
                // play (right) wall cling animation
                if (hasPropeller) {
                    this.anims.play('robo_cling_r', true);
                }
                else {
                    this.anims.play('robo_cling_r_notail', true);
                }
            }
            else if (!this.body.blocked.down && !this.body.blocked.right){
                // jump animation
                if (!this.isDoubJumping) {
                    if (hasPropeller) {
                        this.anims.play('robo_jump_r', true);
                    }
                    else {
                        this.anims.play('robo_jump_r_notail', true);
                    }
                }
                else {
                    //propeller tail audio
                    if (!propellerSFX.isPlaying) {
                        propellerSFX.play();
                    }
                    this.anims.play('robo_prop_r', true);
                }
            }
        }else if (keyLEFT.isDown && !keyRIGHT.isDown && !this.isExploding) {  
            this.lastDirection = 'l';
            //run SFX
            if (!runSFX.isPlaying && this.body.blocked.down) {
                runSFX.play();
            }
            if (runSFX.isPlaying && !this.body.blocked.down) {
                runSFX.stop();
            }
            //easing
            if (this.body.velocity.x > 0) {
                this.setVelocityX(this.body.velocity.x - 15);
            }  
            this.setAccelerationX(-400);
            if (this.body.blocked.down && !this.body.blocked.left) {
                if (hasPropeller) {
                    this.anims.play('robo_run_l', true);
                }
                else {
                    this.anims.play('robo_run_l_notail', true);
                }
            }
            else if (!this.body.blocked.down && this.body.blocked.left) {
                // play (right) wall cling animation
                if (hasPropeller) {
                    this.anims.play('robo_cling_l', true);
                }
                else {
                    this.anims.play('robo_cling_l_notail', true);
                }
            }
            else if (!this.body.blocked.down && !this.body.blocked.left){
                if (!this.isDoubJumping) {
                    if (hasPropeller) {
                        this.anims.play('robo_jump_l', true);
                    }
                    else {
                        this.anims.play('robo_jump_l_notail', true);
                    }
                }
                else {
                    //propeller tail audio
                    if (!propellerSFX.isPlaying) {
                        propellerSFX.play();
                    }
                    this.anims.play('robo_prop_l', true);
                }
            }
        } else if (!this.isExploding) {
            //run SFX
            if (runSFX.isPlaying) {
                runSFX.stop();
            }
            this.setAccelerationX(0);
            if (this.lastDirection == 'r') {
                if (this.body.blocked.down) {
                    if (hasPropeller) {
                        this.anims.play('robo_idle_r', true);
                    }
                    else {
                        this.anims.play('robo_idle_r_notail', true);
                    }
                }
                else if (!this.body.blocked.down) {
                    if (!this.isDoubJumping) {
                        if (hasPropeller) {
                            this.anims.play('robo_jump_r', true);
                        }
                        else {
                            this.anims.play('robo_jump_r_notail', true);
                        }
                    }
                    else {
                        //propeller tail audio
                        if (!propellerSFX.isPlaying) {
                            propellerSFX.play();
                        }
                        this.anims.play('robo_prop_r', true);
                    }
                }
            }
            if (this.lastDirection == 'l') {
                if (this.body.blocked.down) {
                    if (hasPropeller) {
                        this.anims.play('robo_idle_l', true);
                    }
                    else {
                        this.anims.play('robo_idle_l_notail', true);
                    }
                }
                else if (!this.body.blocked.down){
                    if (!this.isDoubJumping) {
                        if (hasPropeller) {
                            this.anims.play('robo_jump_l', true);
                        }
                        else {
                            this.anims.play('robo_jump_l_notail', true);
                        }
                    }
                    else {
                        //propeller tail audio
                        if (!propellerSFX.isPlaying) {
                            propellerSFX.play();
                        }
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
        this.body.setAccelerationX(0);
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
        if (!explosionSFX.isPlaying) {
            explosionSFX.play();
        }
    }

    togglePressedJump() {
        pressedJump = false;
    }

}