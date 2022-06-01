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
    height: 294,
    scene: [Menu, Load, Level1, Level2, Level3, Credits, OpeningCutscene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
}

let game = new Phaser.Game(config);

// global variables
let isJumping, pressedJump;
let hasPropeller, hasWallJump;
let keySPACE, keyLEFT, keyRIGHT, keyUP;
var jumpEvent;
var explosionSFX, propellerSFX, runSFX;
let respawnX, respawnY;
let wasClinging;

// global variable to deal with lost cat dialouge 
let cat1Speaking, cat1Found, cat2Speaking, cat2Found, cat3Speaking, cat3Found;

//checks if the player has already seen the opening cutscene
let openingPlayed = false;

// checks if game has already loaded in
let gameLoaded = false;