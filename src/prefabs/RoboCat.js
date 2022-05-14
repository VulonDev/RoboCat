class RoboCat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setMaxVelocity(300);
        this.body.setDragX(2000); 
        isJumping = false;
     }

    update() {
        //player jumping
        if (keyUP.isDown && this.body.touching.down) {
            isJumping = true;
            this.setVelocityY(-300);
        }
        //slow down jump velocity once player lets go of jump
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
            //changes sprite direction
            this.flipX = false;
        }else if (keyLEFT.isDown && !keyRIGHT.isDown) {  
            if (this.body.velocity.x > 0) {
                this.setVelocityX(this.body.velocity.x - 15);
            }  
            this.setAccelerationX(-400);
            this.flipX = true;
        } else {
            this.setAccelerationX(0);
        }
        
    }

}