// main.js for RoboCat Game

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    scene: [Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
}

let game = new Phaser.Game(config);

let keySPACE;