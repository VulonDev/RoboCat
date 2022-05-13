class RoboCat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setMaxVelocity(300);
        this.body.setDragX(2000); 
     }

    update() {
        //player jumping
        if (keyUP.isDown && this.body.touching.down) {
            this.setVelocityY(-300);
        }

        //player movement, player doesnt move if both left and right are held down   
        if (keyRIGHT.isDown && !keyLEFT.isDown) {
            this.setAccelerationX(600);
            //changes sprite direction
            this.flipX = false;
        }else if (keyLEFT.isDown && !keyRIGHT.isDown) {
            this.setAccelerationX(-600);
            this.flipX = true;
        } else {
            this.setAccelerationX(0);
        }
        
    }
}