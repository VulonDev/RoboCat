// main.js for RoboCat Game

let config = {
    type: Phaser.AUTO,
    //makes it so textures dont do the fuzzy
    antialias: false ,
    scale: {
        // scales the game up to the max width/height (or to the size of the window if its smaller)
        mode: Phaser.Scale.FIT,
        max: {
            width: 800,
            height: 600
        },
        // Centers the game vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    width: 420,
    height: 280,
    scene: [Menu, Load, Level1, Level2],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
}

let game = new Phaser.Game(config);

let isJumping;
let hasPropeller;
let keySPACE, keyLEFT, keyRIGHT, keyUP;