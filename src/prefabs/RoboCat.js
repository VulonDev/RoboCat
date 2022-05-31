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
        //0 = not clinging, 1 = clinging left, 2 = clinging right
        this.clingingDir = 0;
        this.anims.play('robo_idle_r');
        wasClinging = false;
        this.lastClingDir = 'r';
        
        //allows for pressing space right before you land
        scene.input.keyboard.on('keydown-UP', () => {
            pressedJump = true;
            jumpEvent = new Phaser.Time.TimerEvent({ delay: 110, callback: this.togglePressedJump});
            scene.time.addEvent(jumpEvent);
        }, this);

        //these two keydown events create timers to allow players to wall jump a tiny bit after leaving wall
        scene.input.keyboard.on('keydown-RIGHT', () => {
            if (this.clingingDir == 1) {
                wasClinging = true;
                this.clingEvent = new Phaser.Time.TimerEvent({ delay: 90, callback: this.toggleWasClinging});
                scene.time.addEvent(this.clingEvent);
            }
        }, this);

        scene.input.keyboard.on('keydown-LEFT', () => {
            if (this.clingingDir == 2) {
                wasClinging = true;
                this.clingEvent = new Phaser.Time.TimerEvent({ delay: 90, callback: this.toggleWasClinging});
                scene.time.addEvent(this.clingEvent);
            }
        }, this);
        pressedJump = false;
     }

    update() {

        // this offsets the cat's hitbox depending upon which direction it is currently facing so that
        // the hitbox is always more centered towards the cat's face, rather than its tail
        if (this.lastDirection == 'r' && this.anims.currentAnim.key != 'robo_prop_r') {
            this.body.setOffset(13, 0);
        }
        else {
            this.body.setOffset(0, 0);
        }


        if (this.body.blocked.down) {
            propellerSFX.stop();
            this.canDubJump = true;
            this.isClinging = false;
            this.clingingDir = 0;
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
            } else if (hasWallJump && ((this.body.blocked.right || this.body.blocked.left) || wasClinging) && !this.body.blocked.down) {
                this.wasClinging = false;
                this.setGravityY(0);
                this.clingingDir = 0;
                jumpEvent.remove();
                //left right movement after wall jumping
                if(this.body.blocked.right) {
                    this.setVelocityX(-150);
                } else if (this.body.blocked.left) {
                    this.setVelocityX(150);
                } else {
                    if (this.lastClingDir == 'l') {
                        this.setVelocityX(150);
                    } else {
                        this.setVelocityX(-150);
                    }
                }   
                pressedJump = false;
                this.setVelocityY(-300);
                runSFX.stop();
            }
        }
           
        // slow down jump velocity once player lets go of jump
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
        
        //makes character always move towards wall when clinging so they dont have to hold the button
        if (this.clingingDir == 2) {
            this.anims.play('robo_cling_r', true);
            this.setVelocityX(50);
        } else if (this.clingingDir == 1) {
            this.anims.play('robo_cling_l', true);
            this.setVelocityX(-50);
        }

        //wall clinging stuffs
        if (hasWallJump && !keyLEFT.isDown && !this.isExploding && !this.body.blocked.down && this.body.blocked.right) {
            if (!this.isClinging) {
                this.lastClingDir = 'r'
                propellerSFX.stop();
                this.isClinging = true;
                this.body.velocity.y = 0;
                this.setGravityY(-600);
                this.clingingDir = 2;
            }
        } else if (hasWallJump && !keyRIGHT.isDown && !this.isExploding && !this.body.blocked.down && this.body.blocked.left) {
            if (!this.isClinging) {
                this.lastClingDir = 'l';
                propellerSFX.stop();
                this.isClinging = true;
                this.body.velocity.y = 0;
                this.clingingDir = 1;
                this.setGravityY(-600);
            }
        } else {
            if (this.isClinging) {
                this.isClinging = false;
                this.clingingDir = 0;
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
                // plays running animation
                if (hasPropeller) {
                    this.anims.play('robo_run_r', true);
                }
                else {
                    this.anims.play('robo_run_r_notail', true);
                }
            }
            else if (this.clingingDir == 2) {
                // plays (right) wall cling animation
                if (hasPropeller) {
                    this.anims.play('robo_cling_r', true);
                }
                else {
                    this.anims.play('robo_cling_r_notail', true);
                }
            }
            else if (!this.body.blocked.down && !this.body.blocked.right){
                // plays jump animation
                if (!this.isDoubJumping && !this.isClinging) {
                    if (hasPropeller) {
                        this.anims.play('robo_jump_r', true);
                    }
                    else {
                        this.anims.play('robo_jump_r_notail', true);
                    }
                }
                // plays propeller animation if double jumping
                else {
                    //propeller tail audio
                    if (!propellerSFX.isPlaying) {
                        propellerSFX.play();
                    }
                    this.anims.play('robo_prop_r', true);
                }
            }
        } else if (keyLEFT.isDown && !keyRIGHT.isDown && !this.isExploding) {  
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
                // plays running animation
                if (hasPropeller) {
                    this.anims.play('robo_run_l', true);
                }
                else {
                    this.anims.play('robo_run_l_notail', true);
                }
            }
            else if (this.clingingDir == 1) {
                // play (right) wall cling animation
                if (hasPropeller) {
                    this.anims.play('robo_cling_l', true);
                }
                else {
                    this.anims.play('robo_cling_l_notail', true);
                }
            }
            else if (!this.body.blocked.down && !this.body.blocked.left){
                // plays jumping animation
                if (!this.isDoubJumping  && !this.isClinging) {
                    if (hasPropeller) {
                        this.anims.play('robo_jump_l', true);
                    }
                    else {
                        this.anims.play('robo_jump_l_notail', true);
                    }
                }
                // plays propeller animation if double jumping
                else {
                    //propeller tail audio
                    if (!propellerSFX.isPlaying) {
                        propellerSFX.play();
                    }
                    this.anims.play('robo_prop_l', true);
                }
            }
        } else if (!this.isExploding && !this.isClinging) {
            //run SFX
            if (runSFX.isPlaying) {
                runSFX.stop();
            }
            this.setAccelerationX(0);
            if (this.lastDirection == 'r') {
                if (this.body.blocked.down) {
                    // plays the idle animation if player is not moving or jumping
                    if (hasPropeller) {
                        this.anims.play('robo_idle_r', true);
                    }
                    else {
                        this.anims.play('robo_idle_r_notail', true);
                    }
                }
                else if (!this.body.blocked.down) {
                    if (!this.isDoubJumping && !this.isClinging) {
                        // plays the jump animation if player is jumping (this deals with the case if the
                        // player is not moving left or right with jumping)
                        if (hasPropeller) {
                            this.anims.play('robo_jump_r', true);
                        }
                        else {
                            this.anims.play('robo_jump_r_notail', true);
                        }
                    }
                    // plays the propeller animation if double jumping
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
                    // plays the idle animation if player is not moving or jumping
                    if (hasPropeller) {
                        this.anims.play('robo_idle_l', true);
                    }
                    else {
                        this.anims.play('robo_idle_l_notail', true);
                    }
                }
                else if (!this.body.blocked.down){
                    // plays the jump animation if player is jumping (this deals with the case if the
                    // player is not moving left or right while jumping)
                    if (!this.isDoubJumping) {
                        if (hasPropeller) {
                            this.anims.play('robo_jump_l', true);
                        }
                        else {
                            this.anims.play('robo_jump_l_notail', true);
                        }
                    }
                    // plays the propeller animation if double jumping
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

    // this plays the cat's explosion animation and sound effect, then resets the cat
    // back to the indicated x, y position in the particular level
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

    toggleWasClinging() {
        wasClinging = false;
    }

    

}