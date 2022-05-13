// main.js for RoboCat Game

let config = {
    type: Phaser.AUTO,
    width: 420,
    height: 280,
    scene: [Menu, Load, Play],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
}

let game = new Phaser.Game(config);

let keySPACE, keyLEFT, keyRIGHT, keyUP;